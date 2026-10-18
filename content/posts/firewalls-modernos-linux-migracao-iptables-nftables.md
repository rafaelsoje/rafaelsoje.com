---
title: "Firewalls Modernos no Linux: Migrando de iptables para nftables na Prática"
date: "2026-09-10"
excerpt: "Compreenda a evolução da filtragem de pacotes no kernel Linux: por que o nftables substitui o legado iptables, sua sintaxe unificada IPv4/IPv6, tabelas atômicas e exemplos reais de regras para servidores corporativos."
category: "Segurança Ofensiva & Defensiva"
tags: ["Firewall", "nftables", "iptables", "Linux", "Segurança", "Redes"]
author: "Rafael Soje"
readTime: "7 min de leitura"
references:
  - "Netfilter Project: nftables Documentation & Syntax Reference (https://netfilter.org/projects/nftables)"
  - "Red Hat Enterprise Linux 9: Securing Networks with nftables"
  - "Debian Wiki: nftables Configuration Framework (https://wiki.debian.org/nftables)"
  - "RFC 793: Transmission Control Protocol (TCP Specification)"
---

Durante mais de duas décadas, o `iptables` foi o padrão absoluto de firewall no ecossistema Linux. No entanto, sua arquitetura original sofria com limitações estruturais: comandos fragmentados (`iptables`, `ip6tables`, `arptables`, `ebtables`), lentidão ao carregar milhares de regras linha a linha e falta de atomicidade em alterações em lote.

O **nftables** foi desenvolvido pelo próprio projeto Netfilter para resolver essas deficiências, unificando todos os protocolos em uma única máquina virtual em espaço de kernel extremamente eficiente.

Neste artigo, veremos as diferenças práticas e como estruturar uma política restritiva de firewall corporativo utilizando nftables nativo.

---

## 1. Por que migrar para o nftables?

1. **Sintaxe Unificada:** O mesmo conjunto de regras atende tanto a endereços IPv4 quanto IPv6 sob a família de tabelas `inet`.
2. **Atualizações Atômicas:** As regras podem ser compiladas e aplicadas como uma única transação no kernel. Se houver erro de sintaxe, o conjunto anterior é preservado sem deixar o servidor desprotegido no meio do caminho.
3. **Desempenho com Conjuntos (Sets):** O nftables permite criar listas de IPs, portas e sub-redes nativas indexadas em árvore/hash no kernel, executando checagens em tempo constante $O(1)$ sem a necessidade do antigo módulo `ipset`.

---

## 2. Estrutura de Arquivo de Configuração (`/etc/nftables.conf`)

Em vez de executar scripts cheios de comandos imperativos soltos, o nftables incentiva o uso de um arquivo declarativo legível e versionável.

Abaixo está uma política padrão corporativa para um servidor de produção com suporte a SSH, HTTP/HTTPS e bloqueio total de tráfego espúrio:

```nft
#!/usr/sbin/nft -f

# Limpa todas as regras e tabelas anteriores
flush ruleset

# Tabela unificada IPv4 e IPv6
table inet filter {

    # Conjunto de portas TCP autorizadas
    set tcp_inbound_ports {
        type inet_service
        flags interval
        elements = { 22, 80, 443 }
    }

    # Conjunto dinâmico para proteção contra força bruta
    set blackhole_ips {
        type ipv4_addr
        flags timeout
    }

    chain input {
        type filter hook input priority filter; policy drop;

        # 1. Permite tráfego de loopback (localhost)
        iif "lo" accept

        # 2. Rejeita pacotes com flags TCP inválidas
        ct state invalid drop

        # 3. Permite conexões já estabelecidas e relacionadas
        ct state { established, related } accept

        # 4. Descarte imediato de IPs em lista de bloqueio temporário
        ip saddr @blackhole_ips drop

        # 5. Permite tráfego ICMP (Ping) controlado para diagnóstico de rede
        ip protocol icmp icmp type { echo-request, destination-unreachable, time-exceeded } accept
        ip6 nexthdr icmpv6 icmpv6 type { echo-request, destination-unreachable, packet-too-big, time-exceeded } accept

        # 6. Libera as portas públicas essenciais (SSH, HTTP, HTTPS)
        tcp dport @tcp_inbound_ports accept

        # 7. Contador e log de tentativas não autorizadas antes do drop final
        limit rate 5/minute burst 10 packets log prefix "[NFTABLES-DROP]: "
    }

    chain forward {
        type filter hook forward priority filter; policy drop;
    }

    chain output {
        type filter hook output priority filter; policy accept;
    }
}
```

---

## 3. Aplicação, Validação e Persistência

Para testar a sintaxe do arquivo sem aplicar alterações na memória do kernel, utilize a flag de verificação sintática:

```bash
sudo nft -c -f /etc/nftables.conf
```

Se o comando retornar sem erros, aplique o novo conjunto de regras de forma atômica:

```bash
sudo nft -f /etc/nftables.conf
```

Para inspecionar as regras ativas e os contadores de pacotes em tempo real:

```bash
sudo nft list ruleset
```

Para garantir que o serviço seja inicializado com o sistema operacional:

```bash
sudo systemctl enable nftables
sudo systemctl restart nftables
```

---

## 4. Manipulação Dinâmica de Conjuntos (Sets) em Linha de Comando

Uma das grandes vantagens operacionais do nftables é poder adicionar ou remover IPs maliciosos dinamicamente sem recarregar o firewall:

```bash
# Adiciona um IP invasor com expiração automática em 1 hora (3600 segundos)
sudo nft add element inet filter blackhole_ips { 198.51.100.45 timeout 1h }

# Lista os elementos ativos no conjunto
sudo nft list set inet filter blackhole_ips

# Remove manualmente um IP do conjunto
sudo nft delete element inet filter blackhole_ips { 198.51.100.45 }
```

Essa facilidade torna a integração com ferramentas de automação como scripts Python e daemons de resposta a incidentes muito mais robusta e rápida.

---

## Conclusão

A migração para o nftables moderniza a infraestrutura de rede no Linux, simplifica a manutenção de políticas de segurança e reduz o consumo de ciclos de CPU na filtragem de tráfego em servidores de alto volume.
