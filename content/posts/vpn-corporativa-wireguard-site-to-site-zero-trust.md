---
title: "VPN Corporativa com WireGuard: Túneis Site-to-Site Criptografados e Acesso Remoto Seguro"
date: "2026-10-17"
excerpt: "Arquitetura e implementação de VPN de alta performance com WireGuard no Linux: autenticação via chaves assimétricas Curve25519, roteamento restritivo AllowedIPs e regras de firewall."
category: "Segurança Ofensiva & Defensiva"
tags: ["WireGuard", "VPN", "Criptografia", "Linux", "Redes", "Segurança"]
author: "Rafael Soje"
readTime: "8 min de leitura"
references:
  - "WireGuard: Fast, Modern, Secure VPN Tunnel (Jason A. Donenfeld Whitepaper)"
  - "IETF RFC 7539: ChaCha20 and Poly1305 for IETF Protocols"
  - "Linux Kernel Cryptography API Documentation: WireGuard module integration"
  - "National Cyber Security Centre (NCSC): Using WireGuard for Enterprise Communications"
---

Durante décadas, as redes privadas corporativas (VPNs) foram dominadas por protocolos legados e pesados como IPsec e OpenVPN. Embora amplamente suportados, esses protocolos carregam milhões de linhas de código histórico, processos lentos de negociação TLS e handshakes que adicionam latência perceptível.

O **WireGuard** revolucionou a conectividade segura ao operar diretamente como um módulo no kernel Linux, implementando criptografia moderna de ponta a ponta em menos de 4.000 linhas de código auditável.

Neste artigo, demonstro a arquitetura e configuração prática de um túnel corporativo seguro unindo servidores em nuvem (ex.: Hetzner) a uma infraestrutura local ou equipes remotas.

---

## 1. Por que WireGuard? Criptografia de Estado da Arte

O WireGuard abandonou algoritmos legados sujeitos a ataques de downgrade criptográfico. Ele adota um conjunto fixo e moderno de primitivas de segurança:

* **Troca de Chaves:** Curve25519 (ECDH)
* **Criptografia Simétrica:** ChaCha20 autenticada com Poly1305 (AEAD)
* **Função Hash:** BLAKE2s
* **Gerenciamento de Identidade:** O conceito de **Cryptokey Routing**, onde cada endereço IP privado é associado matematicamente à chave pública do cliente.

Se um pacote chegar com um IP de origem que não corresponde à chave pública autorizada, o kernel Linux descarta o pacote imediatamente sem emitir resposta, tornando o servidor **invisível a varreduras de porta (port scanning)**.

---

## 2. Configuração do Servidor Hub (Gateway Linux)

Em um servidor Linux (ex.: Debian / Ubuntu), ative o encaminhamento de pacotes no kernel e configure a interface `wg0`:

### Habilitar IP Forwarding
```bash
# /etc/sysctl.d/99-wireguard.conf
net.ipv4.ip_forward = 1
net.ipv6.conf.all.forwarding = 1
```
Aplique imediatamente: `sudo sysctl -p /etc/sysctl.d/99-wireguard.conf`.

### Arquivo de Configuração `/etc/wireguard/wg0.conf`:
```ini
[Interface]
# Endereço IP do Gateway dentro da VPN
Address = 10.10.0.1/24
ListenPort = 51820
PrivateKey = <CHAVE_PRIVADA_DO_SERVIDOR>

# Regras de Firewall e Roteamento via iptables
PostUp   = iptables -A FORWARD -i wg0 -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = iptables -D FORWARD -i wg0 -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE

# Peer 1: Servidor Local On-Premises (Site-to-Site)
[Peer]
PublicKey = <CHAVE_PUBLICA_DO_PEER_FILIAL>
# Apenas o IP 10.10.0.2 e a sub-rede local da filial podem trafegar por esta chave
AllowedIPs = 10.10.0.2/32, 192.168.10.0/24

# Peer 2: Administrador Remoto (Bastion / Suporte)
[Peer]
PublicKey = <CHAVE_PUBLICA_DO_NOTEBOOK_RAFAEL>
AllowedIPs = 10.10.0.10/32
```

---

## 3. Configuração do Cliente / Filial Remota

No host cliente ou roteador da filial, o arquivo `wg0.conf` aponta para o endereço público do Hub:

```ini
[Interface]
Address = 10.10.0.2/24
PrivateKey = <CHAVE_PRIVADA_DA_FILIAL>

[Peer]
PublicKey = <CHAVE_PUBLICA_DO_SERVIDOR>
Endpoint = vpn.suaempresa.com.br:51820
# Tráfego destinado à rede da matriz e à nuvem privada
AllowedIPs = 10.10.0.0/24, 10.20.0.0/16
# Keepalive para manter a conexão aberta mesmo através de CGNAT e roteadores domésticos
PersistentKeepalive = 25
```

> **Dica de Produção:** O parâmetro `PersistentKeepalive = 25` envia um pacote leve a cada 25 segundos para manter os mapeamentos de portas em firewalls intermediários e operadoras que usam CGNAT.

---

## 4. Inicialização e Monitoramento em Tempo Real

Inicie e habilite o serviço para persistir entre reinicializações do sistema:

```bash
sudo systemctl enable --now wg-quick@wg0
```

Para verificar o status das conexões, volume de dados transferidos e último handshake em tempo real:

```bash
sudo wg show
```

A saída exibe exatamente o tráfego transferido e o tempo decorrido desde a última renegociação criptográfica:

```text
interface: wg0
  public key: Fx92...=
  private key: (hidden)
  listening port: 51820

peer: bM41...=
  endpoint: 200.180.45.10:49152
  allowed ips: 10.10.0.2/32, 192.168.10.0/24
  latest handshake: 1 minute, 12 seconds ago
  transfer: 142.50 MiB received, 89.20 MiB sent
```

Com essa arquitetura, eliminamos a complexidade de daemons legados e garantimos uma malha segura, auditável e extremamente veloz com consumo mínimo de recursos de CPU.
