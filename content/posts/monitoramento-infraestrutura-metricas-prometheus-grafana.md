---
title: "Monitoramento de Infraestrutura: Coleta de Métricas Críticas com Prometheus e Grafana"
date: "2026-09-22"
excerpt: "Como estruturar uma camada moderna de observabilidade para servidores Linux e containers: instalação do Node Exporter, coleta baseada em pull com Prometheus, dashboards analíticos no Grafana e criação de alertas preventivos."
category: "DevSecOps & Linux"
tags: ["Prometheus", "Grafana", "Monitoramento", "Observabilidade", "Linux", "DevOps"]
author: "Rafael Soje"
readTime: "8 min de leitura"
references:
  - "Prometheus Documentation: Architecture and Overview (https://prometheus.io/docs)"
  - "Grafana Labs: Production Dashboards and Best Practices (https://grafana.com/docs)"
  - "Linux Foundation: OpenTelemetry & Observability Standards"
  - "Google SRE Book: Monitoring Distributed Systems (Site Reliability Engineering)"
---

Na engenharia de sistemas moderna, esperar que um cliente reclame de lentidão ou que um servidor caia por falta de espaço em disco é um sinal claro de falta de maturidade operacional. A verdadeira estabilidade de ambientes críticos depende de **observabilidade contínua**: a capacidade de antecipar gargalos antes que eles impactem o negócio.

A combinação entre o **Prometheus** (banco de dados temporal e motor de coleta de métricas) e o **Grafana** (plataforma de visualização analítica e alertas) é o padrão da indústria para monitoramento de infraestruturas Linux, containers e serviços corporativos.

---

## 1. Arquitetura de Coleta: O Modelo Pull do Prometheus

Diferente de sistemas legados que sobrecarregam o servidor central recebendo dados empurrados (*push*), o Prometheus opera no modelo **pull**:

1. Em cada servidor Linux monitorado, instalamos um agente leve chamado **Node Exporter**.
2. O Node Exporter coleta estatísticas nativas do kernel Linux (via pseudo-sistemas `/proc` e `/sys`) e as expõe localmente em formato texto na porta `9100`.
3. O servidor central do Prometheus periodicamente faz uma requisição HTTP GET (*scrape*) e armazena os valores em séries temporais compactadas e altamente indexadas.

---

## 2. Instalação e Hardening do Node Exporter

O Node Exporter deve rodar como um serviço com o menor privilégio possível no host gerenciado:

Criar um usuário de sistema dedicado sem shell:
```bash
sudo useradd -rs /bin/false node_exporter
```

Arquivo de serviço `/etc/systemd/system/node_exporter.service`:
```ini
[Unit]
Description=Prometheus Node Exporter
Wants=network-online.target
After=network-online.target

[Service]
User=node_exporter
Group=node_exporter
Type=simple
# Escuta exclusivamente na interface interna ou VPN, nunca no IP público direto
ExecStart=/usr/local/bin/node_exporter --web.listen-address="10.10.0.10:9100"

# Hardening Systemd
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
PrivateTmp=true

Restart=always
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

Ativação:
```bash
sudo systemctl daemon-reload
sudo systemctl enable --now node_exporter
```

---

## 3. Configuração do Scrape no Prometheus (`prometheus.yml`)

No servidor de monitoramento, configuramos o intervalo de coleta e os alvos:

```yaml
global:
  scrape_interval: 15s     # Coleta a cada 15 segundos
  evaluation_interval: 15s # Avalia regras de alerta a cada 15 segundos

scrape_configs:
  - job_name: "prometheus_master"
    static_configs:
      - targets: ["localhost:9090"]

  - job_name: "servidores_linux"
    static_configs:
      - targets:
          - "10.10.0.10:9100" # Web Server 01
          - "10.10.0.11:9100" # Web Server 02
          - "10.10.0.20:9100" # Database Server
        labels:
          environment: "producao"
```

---

## 4. Consultas PromQL Essenciais para Métricas Críticas

O Prometheus utiliza uma linguagem de consulta rica chamada **PromQL**. Com ela, calculamos tendências e taxas de variação em tempo real:

### 1. Utilização Real de CPU (%):
```promql
100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)
```
*Calcula o percentual de tempo em que a CPU NÃO esteve em estado ocioso nos últimos 5 minutos.*

### 2. Memória RAM Efetivamente Disponível (%):
```promql
((node_memory_MemAvailable_bytes) / (node_memory_MemTotal_bytes)) * 100
```
*Leva em consideração buffers e cache de disco liberáveis pelo kernel, evitando falsos alarmes de memória cheia.*

### 3. Previsão de Esgotamento de Disco (Dias Restantes):
```promql
predict_linear(node_filesystem_free_bytes{mountpoint="/"}[1d], 86400 * 7) < 0
```
*Utiliza regressão linear para alertar se a taxa de consumo de disco atual fará a partição raiz esgotar nos próximos 7 dias.*

---

## 5. Visualização no Grafana e Alertas Proativos

No Grafana:
1. Adicionamos o Prometheus como **Data Source** informando a URL interna: `http://localhost:9090`.
2. Importamos o painel oficial **Node Exporter Full** (Dashboard ID: `1860`), que disponibiliza gráficos detalhados de I/O de disco, saturação de rede, interrupções de hardware e status de memória.
3. Configuramos canais de notificação (Telegram, Slack, Email) para acionar alertas quando a utilização de CPU permanecer acima de 90% por mais de 10 minutos ou quando a perda de pacotes de rede for detectada.

---

## Conclusão

Implementar uma pilha de monitoramento com Prometheus e Grafana transforma a equipe de infraestrutura de reativa para preventiva. Problemas de vazamento de memória, degradação de I/O em banco de dados e tráfego anormal são diagnosticados com precisão matemática em questão de minutos.
