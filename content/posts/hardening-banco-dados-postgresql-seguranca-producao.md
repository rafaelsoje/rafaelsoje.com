---
title: "Hardening de Bancos de Dados: Melhores Práticas de Segurança para PostgreSQL em Produção"
date: "2026-09-17"
excerpt: "Diretrizes práticas de segurança para instâncias PostgreSQL corporativas: autenticação moderna scram-sha-256, restrição estrita no pg_hba.conf, conexões criptografadas com TLS e auditoria de consultas."
category: "Segurança Ofensiva & Defensiva"
tags: ["PostgreSQL", "Banco de Dados", "Hardening", "Segurança", "Linux", "Sysadmin"]
author: "Rafael Soje"
readTime: "9 min de leitura"
references:
  - "PostgreSQL Global Development Group: PostgreSQL 16 Security and Authentication Documentation"
  - "CIS Benchmark: Center for Internet Security PostgreSQL Benchmark v3.0"
  - "RFC 5802: Salted Challenge Response Authentication Mechanism (SCRAM) SASL Mechanism"
  - "OWASP: Database Security Cheat Sheet"
---

O banco de dados é o coração das operações de qualquer empresa e, por consequência, o alvo mais visado em tentativas de exfiltração de dados e ataques de ransomware. Muitas instalações de PostgreSQL em produção ainda operam com configurações de autenticação legadas (como `md5` ou até `trust`) e ouvindo em interfaces públicas sem criptografia em trânsito.

Este guia estabelece os passos essenciais para aplicar um hardening rigoroso em instâncias PostgreSQL no Linux, garantindo conformidade com padrões CIS Benchmark e requisitos de proteção de dados (como LGPD).

---

## 1. Migração para Autenticação Segura: SCRAM-SHA-256

O algoritmo de hashing MD5 no PostgreSQL é considerado criptograficamente fraco e suscetível a ataques de colisão e quebra offline. O padrão moderno obrigatório para produção é o **SCRAM-SHA-256** (RFC 5802).

No arquivo `/etc/postgresql/<versao>/main/postgresql.conf`:

```ini
# Forçar o uso de scram-sha-256 para novos hashes de senha
password_encryption = scram-sha-256

# Restringir o bind de rede (nunca escutar em 0.0.0.0 em servidores sem necessidade direta)
# Se a aplicação estiver no mesmo host, ouça apenas em localhost:
listen_addresses = 'localhost, 10.10.0.20'
port = 5432
```

Para atualizar as senhas dos usuários existentes para o novo padrão criptográfico seguro:

```sql
SET password_encryption = 'scram-sha-256';
ALTER USER app_user WITH PASSWORD 'NovaSenhaForteGeradaAleatoriamente';
```

---

## 2. Controle de Acesso Restritivo via `pg_hba.conf`

O arquivo `pg_hba.conf` (*Host-Based Authentication*) é a primeira linha de defesa perimetral do banco de dados. Ele define quais usuários, a partir de quais IPs e com qual método de criptografia podem se autenticar.

Uma configuração corporativa rigorosa elimina métodos inseguros e restringe hosts:

```ini
# TYPE  DATABASE        USER            ADDRESS                 METHOD

# Acesso administrativo local exclusivo via socket Unix e usuário do SO
local   all             postgres                                peer

# Conexões locais da aplicação via socket
local   sistema_prod    app_user                                scram-sha-256

# Conexões IPv4 originadas EXCLUSIVAMENTE da sub-rede segura interna/VPN
hostssl sistema_prod    app_user        10.10.0.0/24            scram-sha-256

# Conexões IPv6 locais (loopback)
host    all             all             ::1/128                 scram-sha-256

# Qualquer outra tentativa de conexão é rejeitada implicitamente
```

### Regras de Ouro:
- Substitua `host` por `hostssl` para tráfego de rede: obriga a comunicação criptografada por TLS.
- Nunca utilize `trust` em ambientes conectados à rede, pois dispensa qualquer senha.
- Nunca utilize `0.0.0.0/0` com o usuário `postgres` habilitado para login remoto.

---

## 3. Criptografia em Trânsito (TLS/SSL)

Para tráfego entre servidores de aplicação e o banco através de redes locais ou nuvens, o tráfego deve trafegar cifrado para evitar interceptação (*man-in-the-middle*):

No `postgresql.conf`:

```ini
ssl = on
ssl_cert_file = '/etc/ssl/certs/pg_server.crt'
ssl_key_file = '/etc/ssl/private/pg_server.key'
ssl_min_protocol_version = 'TLSv1.3'
ssl_ciphers = 'HIGH:!aNULL:!MD5'
```

Certifique-se de que o arquivo da chave privada tenha permissões restritas exclusivas para o usuário do sistema operacional:

```bash
sudo chown postgres:postgres /etc/ssl/private/pg_server.key
sudo chmod 600 /etc/ssl/private/pg_server.key
```

---

## 4. Princípio do Menor Privilégio e Auditoria

Por padrão, no PostgreSQL antigo, os usuários recebiam privilégios excessivos no schema `public`. Em ambientes de produção:

1. **Revogar privilégios públicos padrão:**
```sql
REVOKE CREATE ON SCHEMA public FROM PUBLIC;
```

2. **Criar roles específicas com permissões pontuais:**
```sql
-- Criar role sem permissão de criar novos bancos ou superusuário
CREATE ROLE app_role WITH LOGIN PASSWORD 'SenhaForte' NOSUPERUSER NOCREATEDB NOCREATEROLE;

-- Conceder apenas os comandos necessários nas tabelas da aplicação
GRANT CONNECT ON DATABASE sistema_prod TO app_role;
GRANT USAGE ON SCHEMA app_schema TO app_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA app_schema TO app_role;
```

3. **Ativação de Logs de Conexão e Erros:**
No `postgresql.conf`:
```ini
log_connections = on
log_disconnections = on
log_duration = off
log_line_prefix = '%m [%p] %u@%d from %h '
log_statement = 'ddl'  # Registra alterações de esquema (CREATE, ALTER, DROP)
```

O registro de operações DDL permite que o time de segurança e infraestrutura audite em segundos quem removeu ou alterou estruturas de tabelas críticas.

---

## Conclusão

O hardening do PostgreSQL transforma o banco de dados em uma fortaleza resiliente: conexões criptografadas de ponta a ponta, senhas protegidas com SCRAM-SHA-256 e acesso restrito a redes controladas evitam vazamentos catastróficos e garantem conformidade técnica internacional.
