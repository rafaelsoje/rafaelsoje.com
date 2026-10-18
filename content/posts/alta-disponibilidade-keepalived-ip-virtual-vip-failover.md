---
title: "Alta Disponibilidade (HA): Redundância de Servidores com Keepalived e IP Virtual (VIP)"
date: "2026-09-24"
excerpt: "Como construir uma camada de alta disponibilidade e tolerância a falhas sem ponto único de falha (SPOF): protocolo VRRP, balanceamento ativo/passivo com Keepalived e scripts de verificação de integridade no Linux."
category: "DevSecOps & Linux"
tags: ["Alta Disponibilidade", "Keepalived", "VRRP", "Linux", "Redes", "Sysadmin"]
author: "Rafael Soje"
readTime: "8 min de leitura"
references:
  - "Keepalived Project: High Availability and Load Balancing Documentation (https://www.keepalived.org)"
  - "RFC 5798: Virtual Router Redundancy Protocol (VRRP) Version 3 for IPv4 and IPv6"
  - "Linux Foundation: High Availability Clustering Architecture Guide"
  - "Debian Cluster Administrator Handbook"
---

Em arquiteturas de missão crítica, a regra de ouro da engenharia de confiabilidade é clara: **qualquer componente individual pode falhar**. Se a sua aplicação depende de um único servidor de borda, proxy reverso ou roteador, você possui um *Single Point of Failure* (SPOF). Se esse nó sofrer uma falha de hardware, manutenção de emergência ou pane de kernel, todo o sistema sairá do ar.

O **Keepalived** é a solução definitiva em ambientes Linux para criar redundância automática de infraestrutura, utilizando o protocolo padronizado **VRRP** (*Virtual Router Redundancy Protocol*, RFC 5798) para gerenciar um **IP Virtual flutuante (VIP)** entre dois ou mais servidores.

---

## 1. Como Funciona o Failover com VRRP e IP Virtual

No modelo de cluster ativo/passivo com Keepalived:

1. Dois servidores compartilham um endereço IP virtual comum (exemplo: `10.10.0.100`), que é o endereço que os clientes ou o balanceador externo consultam.
2. O **Nó Master** assume a titularidade do VIP e envia sinais periódicos de *heartbeat* (multicast VRRP na rede local a cada 1 segundo) para informar que está operacional.
3. O **Nó Backup** escuta passivamente esses sinais.
4. Se o nó Master falhar (perda de energia, travamento ou queda do daemon web), os pacotes de heartbeat cessam. O nó Backup detecta o silêncio em menos de 3 segundos, eleva seu estado para Master e assume o IP virtual instantaneamente via Gratuitous ARP (GARP).
5. O tráfego dos clientes é redirecionado sem que ocorra interrupção perceptível na aplicação.

---

## 2. Ajuste do Kernel Linux: Binding de IP Não-Local

Por padrão, o Linux não permite que serviços como Nginx ou HAProxy façam *bind* (escutem) em um endereço IP que ainda não pertença a uma interface física local.

No nó Backup, o IP virtual ainda não está atribuído enquanto ele estiver em modo de espera. Para permitir que o Nginx suba e aguarde o tráfego do VIP sem erros de inicialização, habilitamos o parâmetro `net.ipv4.ip_nonlocal_bind` no `/etc/sysctl.d/99-ha.conf`:

```ini
# Habilita binding em IPs virtuais flutuantes
net.ipv4.ip_nonlocal_bind = 1

# Habilita encaminhamento de pacotes se atuar como gateway
net.ipv4.ip_forward = 1
```

Aplicação imediata:
```bash
sudo sysctl --system
```

---

## 3. Configuração do Nó Primário (Master)

No servidor principal (`10.10.0.10`), configuramos `/etc/keepalived/keepalived.conf`:

```ini
global_defs {
    router_id PROD_LB_01
    enable_script_security
    script_user root
}

# Script que monitora a saúde real do serviço Nginx
vrrp_script check_nginx {
    script "/usr/bin/killall -0 nginx"
    interval 2  # Executa a cada 2 segundos
    weight 2    # Soma 2 pontos se o serviço responder normalmente
}

vrrp_instance VI_PROD {
    state MASTER
    interface eth0
    virtual_router_id 51
    priority 101       # Prioridade mais alta que o Backup
    advert_int 1

    authentication {
        auth_type PASS
        auth_pass SegredoClusterHA2026
    }

    virtual_ipaddress {
        10.10.0.100/24 dev eth0 label eth0:vip
    }

    track_script {
        check_nginx
    }
}
```

---

## 4. Configuração do Nó Secundário (Backup)

No servidor redundante (`10.10.0.11`), configuramos o mesmo `/etc/keepalived/keepalived.conf`, alterando o `state`, `router_id` e reduzindo a `priority`:

```ini
global_defs {
    router_id PROD_LB_02
    enable_script_security
    script_user root
}

vrrp_script check_nginx {
    script "/usr/bin/killall -0 nginx"
    interval 2
    weight 2
}

vrrp_instance VI_PROD {
    state BACKUP
    interface eth0
    virtual_router_id 51
    priority 100       # Prioridade menor que o Master (101)
    advert_int 1

    authentication {
        auth_type PASS
        auth_pass SegredoClusterHA2026
    }

    virtual_ipaddress {
        10.10.0.100/24 dev eth0 label eth0:vip
    }

    track_script {
        check_nginx
    }
}
```

---

## 5. Validação e Teste Prático de Resiliência

Com os serviços ativos em ambos os nós:

```bash
sudo systemctl enable --now keepalived
```

1. **Checar se o nó Master possui o VIP:**
```bash
ip addr show dev eth0
```
*A saída exibirá o alias `inet 10.10.0.100/24 scope global secondary eth0:vip`.*

2. **Simular a falha do serviço no Master:**
```bash
sudo systemctl stop nginx
```
*Em 2 segundos, o script `check_nginx` falha, a pontuação do Master cai, e o nó Backup assume o VIP `10.10.0.100` sem nenhuma interrupção de pacotes.*

3. **Recuperação automática:**
Ao restaurar o Nginx no Master (`sudo systemctl start nginx`), o nó reassume seu papel primário suavemente graças à prioridade mais alta.

---

## Conclusão

A implementação de IP Virtual flutuante via Keepalived elimina o ponto único de falha na camada de entrada da rede. Combinando checagens de integridade por script e o padrão VRRP, a infraestrutura adquire resiliência de nível bancário contra falhas inesperadas de nós de produção.
