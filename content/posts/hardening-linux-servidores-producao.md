---
title: "Hardening de Servidores Linux em Produção: Da Camada do Kernel ao Nginx"
date: "2026-10-18"
excerpt: "Guia prático de engenharia para proteger servidores e VPS Linux em produção, cobrindo parâmetros sysctl de kernel, isolamento SSH, firewalling restritivo e terminação segura no Nginx."
category: "DevSecOps & Linux"
tags: ["Linux", "Hardening", "Nginx", "DevSecOps", "Segurança", "Sysadmin"]
author: "Rafael Soje"
readTime: "8 min de leitura"
---

Em ambientes de produção, expor um servidor Linux diretamente à internet pública sem uma rotina rigorosa de hardening é um convite a varreduras automatizadas, ataques de força bruta e exploração de superfície.

Este guia consolida as práticas defensivas que aplico em infraestruturas corporativas, desde o ajuste de parâmetros do kernel até as diretivas de proxy reverso no Nginx.

---

## 1. Isolamento Estrito do Acesso SSH

O daemon SSH (`sshd`) é o principal vetor de força bruta em servidores recém-provisionados. A configuração padrão da maioria das distribuições deve ser endurecida imediatamente no arquivo `/etc/ssh/sshd_config.d/99-hardening.conf`:

```bash
# Desativa autenticação por senha e restringe a chaves criptográficas fortes
PasswordAuthentication no
ChallengeResponseAuthentication no
PubkeyAuthentication yes

# Proíbe login direto do usuário root
PermitRootLogin no

# Limita o número de tentativas e conexões simultâneas
MaxAuthTries 3
MaxSessions 2
LoginGraceTime 30

# Cifras e algoritmos de troca de chaves modernos (evita legados vulneráveis)
KexAlgorithms curve25519-sha256@libssh.org,diffie-hellman-group16-sha512
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com
MACs hmac-sha2-512-etm@openssh.com
```

Após aplicar, valide a sintaxe do arquivo de configuração antes de reiniciar o serviço:

```bash
sudo sshd -t
sudo systemctl reload sshd
```

---

## 2. Parâmetros de Hardening do Kernel (Sysctl)

O arquivo `/etc/sysctl.d/99-security.conf` permite ajustar a pilha de rede e a segurança do kernel contra ataques de negação de serviço (DoS), spoofing e redirecionamento de rotas:

```ini
# Previne ataques de IP Spoofing
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.default.rp_filter = 1

# Ignora pacotes de broadcast ICMP (mitiga ataques Smurf)
net.ipv4.icmp_echo_ignore_broadcasts = 1

# Desativa aceitação de pacotes com roteamento de origem (Source Routing)
net.ipv4.conf.all.accept_source_route = 0
net.ipv4.conf.default.accept_source_route = 0

# Desativa aceitação de redirecionamentos ICMP (previne ataques MITM)
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.default.accept_redirects = 0
net.ipv6.conf.all.accept_redirects = 0

# Proteção contra SYN Flood
net.ipv4.tcp_syncookies = 1
net.ipv4.tcp_max_syn_backlog = 4096

# Restringe o acesso ao dmesg do kernel para usuários sem privilégios
kernel.dmesg_restrict = 1

# Oculta endereços de ponteiros do kernel em /proc/kallsyms
kernel.kptr_restrict = 2
```

Aplique os parâmetros em tempo de execução:

```bash
sudo sysctl --system
```

---

## 3. Firewalling Restritivo com UFW / Iptables

A política padrão de firewall deve ser **DROP (bloquear tudo)**, liberando explicitamente apenas as portas essenciais para a operação do negócio:

```bash
# Define a política padrão de descarte para tráfego de entrada
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Permite SSH apenas com limitação de taxa
sudo ufw limit 22/tcp comment 'SSH com rate limit'

# Permite tráfego HTTP e HTTPS
sudo ufw allow 80/tcp comment 'HTTP Nginx'
sudo ufw allow 443/tcp comment 'HTTPS Nginx'

# Habilita o firewall
sudo ufw enable
```

---

## 4. Cabeçalhos de Segurança Defensiva no Nginx

O servidor web ou proxy reverso atua como a primeira linha de contato com o usuário. Configurar cabeçalhos HTTP rigorosos mitiga ataques de Clickjacking, Cross-Site Scripting (XSS) e vazamento de referrers:

```nginx
# /etc/nginx/conf.d/security-headers.conf

# Força HTTPS por 2 anos com subdomínios e inclusão na lista de pré-carregamento
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;

# Impede incorporação do site em iframes externos (Clickjacking)
add_header X-Frame-Options "SAMEORIGIN" always;

# Bloqueia a adivinhação de MIME Types por navegadores
add_header X-Content-Type-Options "nosniff" always;

# Política de Referrer segura
add_header Referrer-Policy "strict-origin-when-cross-origin" always;

# Desativa recursos de hardware não utilizados pela aplicação
add_header Permissions-Policy "geolocation=(), microphone=(), camera=(), payment=()" always;
```

---

## 5. Auditoria Contínua e Integridade

Hardening não é uma etapa estática, mas um processo contínuo. Ferramentas recomendadas para manter a postura de segurança:

1. **Lynis:** Scanner de conformidade e auditoria de segurança para sistemas baseados em Unix.
2. **Fail2Ban:** Detecção e bloqueio de IPs maliciosos analisando logs de acesso e autenticação em tempo real.
3. **Tripwire / AIDE:** Verificação de integridade de arquivos críticos do sistema com hashes criptográficos SHA-256.

Aplicar essas diretivas logo no provisionamento reduz em mais de 95% os ruídos de varredura e vulnerabilidades comuns em ambientes corporativos.
