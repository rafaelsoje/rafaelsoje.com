---
title: "Defesa em Camadas: Integrando Cloudflare Edge WAF, Fail2ban e ModSecurity"
date: "2026-10-18"
excerpt: "Como arquitetar uma defesa perimetral em camadas para aplicações web, combinando regras de borda na Cloudflare, filtragem de payloads no ModSecurity e bloqueio dinâmico no Fail2ban."
category: "Segurança Ofensiva & Defensiva"
tags: ["Cloudflare", "WAF", "Fail2Ban", "ModSecurity", "Segurança", "DevSecOps"]
author: "Rafael Soje"
readTime: "7 min de leitura"
---

Muitas equipes confiam exclusivamente em uma CDN ou em um firewall de servidor, criando pontos únicos de falha na segurança perimetral. A estratégia mais resiliente é a **defesa em profundidade (Defense-in-Depth)**, onde cada camada atua de forma coordenada.

Neste artigo, detalho como orquestrar a Cloudflare na borda com o Fail2ban e o ModSecurity no host Linux.

---

## A Arquitetura da Defesa em 3 Camadas

A inspeção e mitigação de tráfego ocorre em três estágios progressivos:

1. **Camada de Borda (Cloudflare WAF):** Mitigação volumétrica de DDoS (L3/L4/L7), verificação anti-bot via Turnstile, bloqueio geográfico de tráfego suspeito e terminação TLS.
2. **Camada de Proxy Reverso & WAF de Aplicação (Nginx + ModSecurity):** Inspeção profunda de payloads HTTP contra ataques OWASP Top 10 (SQL Injection, XSS, RCE, Path Traversal).
3. **Camada de Sistema & Host (Fail2ban + Iptables):** Correlação de logs de acessos anômalos e aplicação de banimentos temporários ou definitivos no nível de kernel.

---

## 1. Restringindo a Origem: Impedindo o Bypass da Cloudflare

O erro mais comum ao colocar um site atrás da Cloudflare é deixar a porta 80/443 do servidor aberta para qualquer IP na internet. Se um atacante descobrir o IP real da sua VPS (via histórico de DNS ou certificados), ele pode contornar todas as regras do WAF.

No Nginx, configure a restauração do IP real do visitante e bloqueie conexões diretas não originadas pela Cloudflare:

```nginx
# /etc/nginx/conf.d/cloudflare-real-ip.conf
# Lista de blocos CIDR oficiais da Cloudflare

set_real_ip_from 173.245.48.0/20;
set_real_ip_from 103.21.244.0/22;
set_real_ip_from 103.22.200.0/22;
set_real_ip_from 103.31.4.0/22;
set_real_ip_from 141.101.64.0/18;
set_real_ip_from 108.162.192.0/18;
set_real_ip_from 190.93.240.0/20;
set_real_ip_from 188.114.96.0/20;
set_real_ip_from 197.234.240.0/22;
set_real_ip_from 198.41.128.0/17;
set_real_ip_from 162.158.0.0/15;
set_real_ip_from 104.16.0.0/13;
set_real_ip_from 104.24.0.0/14;
set_real_ip_from 172.64.0.0/13;
set_real_ip_from 131.0.72.0/22;

# Lê o IP do visitante real a partir do cabeçalho confiável
real_ip_header CF-Connecting-IP;
```

---

## 2. Ajuste do ModSecurity com OWASP Core Rule Set (CRS)

O ModSecurity instalado como módulo dinâmico do Nginx inspeciona o corpo da requisição e os parâmetros enviados:

```apache
# /etc/modsecurity/modsecurity.conf
SecRuleEngine On
SecRequestBodyAccess On
SecResponseBodyAccess Off
SecRequestBodyLimit 13107200
SecRequestBodyNoFilesLimit 131072
SecAuditEngine RelevantOnly
SecAuditLogParts ABIJDEFHZ
SecAuditLog /var/log/nginx/modsec_audit.log
```

Ao registrar violações no `modsec_audit.log`, identificamos automaticamente tentativas de injeção de código ou exploração de rotas de teste antes mesmo de chegarem à aplicação Next.js ou ao banco de dados.

---

## 3. Integrando o Fail2ban com o WAF

Criamos uma jail personalizada no Fail2ban (`/etc/fail2ban/jail.d/nginx-waf.local`) para monitorar o log do ModSecurity e banir IPs reincidentes:

```ini
[nginx-waf]
enabled  = true
port     = http,https
filter   = nginx-waf
logpath  = /var/log/nginx/modsec_audit.log
maxretry = 3
findtime = 600
bantime  = 86400
action   = iptables-multiport[name=WAF, port="http,https"]
```

E o filtro correspondente (`/etc/fail2ban/filter.d/nginx-waf.conf`):

```ini
[Definition]
failregex = ^.+\[client <HOST>\].+Access denied with code (?:403|406).+$
ignoreregex =
```

---

## Conclusão

Essa combinação transforma a infraestrutura em um alvo muito difícil e caro para qualquer atacante:

* O tráfego sujo e volumoso morre na borda distribuída da Cloudflare.
* Tentativas sofisticadas de exploração de vulnerabilidades web são neutralizadas pelo ModSecurity.
* E clientes abusivos são bloqueados diretamente na tabela de firewall do kernel Linux via Fail2ban.

