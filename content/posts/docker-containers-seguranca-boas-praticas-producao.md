---
title: "Docker em Produção: Hardening de Containers, Isolamento de Recursos e Boas Práticas de Segurança"
date: "2026-10-06"
excerpt: "Práticas essenciais de DevSecOps para proteger containers Docker em produção: execução non-root, limitação de CPU/memória, sistema de arquivos somente-leitura e descarte de privilégios de kernel."
category: "DevSecOps & Linux"
tags: ["Docker", "Containers", "DevSecOps", "Linux", "Segurança", "Sysadmin"]
author: "Rafael Soje"
readTime: "7 min de leitura"
references:
  - "Docker Official Documentation: Security & Runtime Privileges (https://docs.docker.com/engine/security/)"
  - "Center for Internet Security: CIS Docker Benchmark v1.6.0"
  - "NIST Special Publication 800-190: Application Container Security Guide"
  - "Linux Capabilities Documentation: man 7 capabilities"
---

Muitos ambientes de desenvolvimento utilizam Docker com configurações permissivas que nunca deveriam chegar aos servidores de produção. Por padrão, o processo dentro de um container Docker roda como o usuário `root` (UID 0), o que significa que uma vulnerabilidade de Remote Code Execution (RCE) na aplicação web pode permitir o escape para o host hospedeiro.

Neste artigo, apresento os pilares de hardening e segurança defensiva que aplico para isolar rigorosamente containers em ambientes produtivos.

---

## 1. O Perigo do Usuário Root: Execução com Usuário sem Privilégios

A primeira regra de ouro em segurança de containers é **nunca rodar o processo da aplicação como root**. No `Dockerfile`, crie um usuário dedicado com UID/GID fixos e sem privilégios administrativos:

```dockerfile
# Exemplo de Dockerfile seguro para Node.js / Python
FROM node:22-alpine AS runner

# Criar grupo e usuário de sistema dedicado
RUN addgroup -g 10001 -S appgroup && \
    adduser -u 10001 -S appuser -G appgroup

WORKDIR /app

# Copiar apenas os arquivos estritamente necessários
COPY --chown=appuser:appgroup package*.json ./
COPY --chown=appuser:appgroup dist ./dist

# Trocar o contexto de execução para o usuário não privilegiado
USER appuser

EXPOSE 3000
CMD ["node", "dist/index.js"]
```

Ao fazer isso, mesmo que um invasor explore uma falha na camada de aplicação, ele ficará preso no espaço de permissões do usuário `appuser`, incapaz de alterar pacotes do sistema ou acessar arquivos do host.

---

## 2. Descarte de Privilégios de Kernel (`--cap-drop`)

O kernel Linux concede capacidades especiais (`capabilities`) aos processos para tarefas de baixo nível. Por padrão, o Docker concede privilégios como `CAP_CHOWN`, `CAP_SETUID` e `CAP_NET_RAW` que aplicações comuns nunca precisam.

A melhor abordagem é **remover todas as capacidades por padrão** e adicionar apenas o estritamente necessário:

```bash
docker run -d \
  --name api-producao \
  --cap-drop=ALL \
  --cap-add=NET_BIND_SERVICE \
  --security-opt=no-new-privileges:true \
  -p 3000:3000 \
  minha-imagem:prod
```

### O papel de `no-new-privileges:true`
A diretiva `--security-opt=no-new-privileges:true` impede que binários com o bit `setuid` (como `sudo` ou executáveis maliciosos criados por atacantes) consigam elevar privilégios dentro do container.

---

## 3. Sistema de Arquivos Somente-Leitura (`--read-only`)

Aplicações stateless não devem ter permissão de gravar novos arquivos binários em seus diretórios de execução. Se um invasor não puder gravar arquivos no disco, a execução de web shells, download de mineradores e persistência de malware tornam-se praticamente impossíveis.

Podemos montar a raiz do container como somente-leitura e direcionar apenas pastas temporárias para a memória RAM (`tmpfs`):

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  web:
    image: minha-aplicacao:v1
    read_only: true
    tmpfs:
      - /tmp:size=64M,mode=1777
      - /app/cache:size=128M
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    user: "10001:10001"
    restart: unless-stopped
```

---

## 4. Limitação Estrita de Recursos (CPU, Memória e PIDs)

Um container descontrolado ou sob ataque de negação de serviço (DoS) pode consumir toda a memória do host e forçar o kernel a acionar o `OOM Killer` (Out-Of-Memory Killer), derrubando outros serviços vitais do servidor.

Sempre defina limites máximos de recursos:

```yaml
deploy:
  resources:
    limits:
      cpus: '1.5'
      memory: 512M
      pids: 100
    reservations:
      memory: 128M
```

> **Atenção aos PIDs:** Limitar a quantidade de PIDs (`pids: 100`) é a proteção mais eficaz contra **fork bombs**, impedindo que scripts recursivos esgotem a tabela de processos do kernel Linux.

---

## 5. Script de Auditoria de Containers Ativos

Para auditar rapidamente quais containers em execução no host estão rodando como root ou sem limites de recursos, utilize este comando rápido via CLI:

```bash
# Auditar usuário e limites de memória de todos os containers rodando
docker ps -q | xargs docker inspect --format \
  'Container: {{.Name}} | User: "{{.Config.User}}" | Privileged: {{.HostConfig.Privileged}} | Memory Limit: {{.HostConfig.Memory}}'
```

Se o campo `User` estiver vazio (`""`), significa que o container está rodando como `root`.

A adoção dessas quatro camadas (usuário dedicado, descarte de capacidades, filesystem somente-leitura e limites de recursos) blinda o ambiente Docker e atende aos mais rígidos critérios do CIS Benchmark corporativo.

