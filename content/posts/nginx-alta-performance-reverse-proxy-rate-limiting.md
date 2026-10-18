---
title: "Arquitetura Nginx de Alta Performance: Reverse Proxy, Rate Limiting e Buffers"
date: "2026-09-08"
excerpt: "Guia prático para transformar o Nginx em um reverse proxy corporativo resiliente: dimensionamento de worker_processes, ajuste de buffers de conexão, mitigação de sobrecarga com rate limiting e terminação SSL/TLS otimizada."
category: "DevSecOps & Linux"
tags: ["Nginx", "Reverse Proxy", "Alta Performance", "Rate Limiting", "Linux", "Sysadmin"]
author: "Rafael Soje"
readTime: "8 min de leitura"
references:
  - "NGINX Documentation: Tuning NGINX for Performance (https://docs.nginx.com)"
  - "Mozilla Foundation: SSL Configuration Generator - Intermediate Profile (https://ssl-config.mozilla.org)"
  - "RFC 7230: Hypertext Transfer Protocol (HTTP/1.1): Message Syntax and Routing"
  - "Open Web Application Security Project (OWASP): Reverse Proxy Protection Cheat Sheet"
---

O Nginx é o padrão de fato para terminação web e proxy reverso em arquiteturas modernas. No entanto, a instalação padrão fornecida pelos gerenciadores de pacotes (`apt`, `yum`, `dnf`) vem calibrada de forma conservadora para rodar em hardware modesto, deixando de aproveitar a capacidade real do servidor e expondo o backend a sobrecargas por conexões lentas ou picos de tráfego.

Este artigo consolida as diretrizes essenciais de engenharia para transformar o Nginx em uma barreira de alta performance, controlando fluxos de requisição e blindando os serviços internos de aplicação.

---

## 1. Ajuste do Núcleo: Workers e Descritores de Arquivos

No arquivo mestre `/etc/nginx/nginx.conf`, o primeiro passo é garantir que o Nginx utilize todos os núcleos de CPU disponíveis e consiga manter dezenas de milhares de conexões concorrentes sem esgotar os limites do sistema operacional:

```nginx
user www-data;
worker_processes auto;
worker_rlimit_nofile 65535;
pid /run/nginx.pid;

events {
    worker_connections 8192;
    multi_accept on;
    use epoll;
}
```

### Explicação dos parâmetros:
- `worker_processes auto`: Cria um processo filho por núcleo físico/lógico de CPU, evitando disputa de contexto.
- `worker_rlimit_nofile 65535`: Sobrescreve o limite padrão de descritores de arquivos abertos (open file limits) no Linux para o processo do Nginx.
- `multi_accept on`: Permite que o worker aceite todas as novas conexões disponíveis de uma só vez na fila de sockets.
- `use epoll`: Habilita a chamada de sistema mais eficiente do kernel Linux para manipulação de I/O assíncrono escalável.

---

## 2. Otimização de Buffers e I/O de Rede

Quando clientes com conexões lentas fazem requisições grandes ou leem respostas volumosas, conexões não otimizadas podem reter recursos do backend (como Node.js, PHP-FPM ou Python). O Nginx deve atuar como amortecedor:

```nginx
http {
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;

    # Timeouts operacionais
    keepalive_timeout 65;
    keepalive_requests 1000;
    client_body_timeout 15;
    client_header_timeout 15;
    send_timeout 15;

    # Dimensionamento de Buffers
    client_body_buffer_size 128k;
    client_max_body_size 20m;
    client_header_buffer_size 1k;
    large_client_header_buffers 4 8k;

    # Ocultar assinatura de versão
    server_tokens off;
}
```

- `sendfile on`: Copia dados diretamente do disco para o descritor de arquivo TCP via kernel, sem passar pelo espaço do usuário (zero-copy transfer).
- `tcp_nopush` e `tcp_nodelay`: Combinados, enviam os pacotes HTTP no menor tempo possível sem reter fragmentos desnecessários em buffer.

---

## 3. Rate Limiting: Controle de Fluxo e Prevenção contra Abuso

O rate limiting no Nginx utiliza o algoritmo de *leaky bucket* (balde furado), permitindo controlar tanto a frequência de requisições por segundo quanto rajadas (*bursts*) permitidas.

No bloco `http`, definimos duas zonas com base no IP do cliente (`$binary_remote_addr`):

```nginx
# 10 MB de memória suportam ~160.000 IPs de estado
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=login_limit:10m rate=2r/s;

# Código retornado ao ultrapassar a cota
limit_req_status 429;
```

No bloco `server` de cada aplicação, aplicamos as zonas com políticas de tolerância a rajadas:

```nginx
server {
    listen 443 ssl http2;
    server_name api.empresa.com.br;

    # Proteção de rotas sensíveis (login/autenticação)
    location /api/auth/ {
        limit_req zone=login_limit burst=5 nodelay;
        proxy_pass http://backend_upstream;
        include proxy_params;
    }

    # Proteção padrão para rotas gerais de API
    location /api/ {
        limit_req zone=api_limit burst=20 nodelay;
        proxy_pass http://backend_upstream;
        include proxy_params;
    }
}
```

A flag `nodelay` processa requisições dentro do teto de rajada imediatamente sem enfileiramento artificial, mas rejeita instantaneamente qualquer requisição subsequente com HTTP 429 (Too Many Requests), protegendo a CPU do banco e da aplicação.

---

## 4. Upstream com Keepalive para o Backend

Um dos erros mais comuns de arquitetura é o Nginx abrir uma nova conexão TCP para cada requisição encaminhada ao backend interno. Com a diretiva `keepalive` no upstream, mantemos um pool de conexões reutilizáveis:

```nginx
upstream backend_upstream {
    server 127.0.0.1:3000 max_fails=3 fail_timeout=10s;
    keepalive 64;
}

server {
    location / {
        proxy_pass http://backend_upstream;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

A limpeza do cabeçalho `Connection ""` combinada com `proxy_http_version 1.1` é mandatória para habilitar a reutilização de conexões TCP entre o proxy e os containers ou serviços internos.

---

## Conclusão

Com o ajuste de descritores no kernel, ativação de epoll, buffers equilibrados e políticas estritas de rate limiting, o Nginx deixa de ser um mero redirecionador e torna-se um escudo protetor para a infraestrutura, suportando altas cargas com estabilidade operacional.
