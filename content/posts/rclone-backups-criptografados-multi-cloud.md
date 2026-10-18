---
title: "Backups Automatizados e Criptografados com Rclone: Do Servidor ao Cloud Storage"
date: "2026-10-15"
excerpt: "Guia completo de sincronização e contingência de dados com Rclone, aplicando criptografia client-side de ponta a ponta, controle de banda e agendamento via systemd timers no Linux."
category: "Ferramentas & Automação"
tags: ["Rclone", "Backups", "Cloud Storage", "Linux", "Criptografia", "Automação"]
author: "Rafael Soje"
readTime: "6 min de leitura"
references:
  - "Rclone Official Documentation: Crypt (Encrypted Storage) (https://rclone.org/crypt)"
  - "Rclone Official Documentation: Sync & Bandwidth Limiting (https://rclone.org/docs)"
  - "CISA / US-CERT: Data Backup and Contingency Guidelines (Alert AA21-131A)"
  - "NIST Special Publication 800-209: Security Guidelines for Storage Infrastructure"
---

A perda de dados ou o comprometimento de backups por ransomware é um dos maiores pesadelos de qualquer infraestrutura corporativa. Para garantir a regra de ouro 3-2-1 de backups, precisamos de uma cópia segura, isolada e imutável fora do datacenter principal.

O **Rclone** é a ferramenta open-source ideal para essa missão: ele atua como o "rsync dos provedores de nuvem", suportando mais de 50 destinos (AWS S3, Google Drive, Backblaze B2, Mega, SFTP e Wasabi).

---

## 1. O Diferencial da Camada de Criptografia (Rclone Crypt)

Enviar dados corporativos desprotegidos para provedores públicos de nuvem viola princípios básicos de privacidade e segurança. O Rclone resolve isso nativamente através do backend `crypt`:

* Os arquivos são criptografados no servidor de origem **antes** da transmissão pela rede.
* O provedor de nuvem armazena apenas dados indecifráveis, com nomes de arquivos e diretórios ofuscados por hash criptográfico.
* Nem mesmo os operadores da nuvem conseguem ler os seus dados.

A estrutura do `/home/usuario/.config/rclone/rclone.conf` combina o storage remoto com a camada cifrada:

```ini
[remote-s3]
type = s3
provider = AWS
access_key_id = AKIAIOSFODNN7EXAMPLE
secret_access_key = wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
region = us-east-1

[backup-seguro]
type = crypt
remote = remote-s3:empresa-backups-producao
filename_encryption = standard
directory_name_encryption = true
password = <senha_criptografada_gerada_pelo_rclone>
password2 = <salt_criptografado_gerado_pelo_rclone>
```

---

## 2. Comando de Sincronização Otimizado para Produção

Durante o backup de volumes com dezenas de gigabytes, parâmetros de concorrência, integridade e controle de banda são fundamentais para não saturar o link de internet:

```bash
rclone sync /var/backups/locais/ backup-seguro:vps-dumps/ \
  --transfers 4 \
  --checkers 8 \
  --checksum \
  --fast-list \
  --bwlimit "08:00,5M 20:00,20M" \
  --log-file /var/log/rclone-sync.log \
  --log-level INFO
```

### Explicação dos parâmetros:
* `--transfers 4`: Transfere até 4 arquivos em paralelo.
* `--checksum`: Compara os hashes MD5/SHA-256 para evitar o reenvio desnecessário de arquivos inalterados.
* `--fast-list`: Reduz o número de chamadas de API ao listar diretórios, economizando custos de requisições no S3/Backblaze.
* `--bwlimit`: Limita o consumo de upload para 5 MB/s em horário comercial (08h às 20h) e libera 20 MB/s durante a madrugada.

---

## 3. Automatização Confiável com Systemd (Sem dependência de Cron)

Embora o cron tradicional seja popular, os **Systemd Timers** oferecem observabilidade muito superior: histórico de execuções com logs estruturados no `journalctl`, controle de falhas e garantia de execução mesmo após reinicializações.

### Criação do Serviço (`/etc/systemd/system/rclone-backup.service`):

```ini
[Unit]
Description=Rotina de Sincronizacao de Backup Criptografado via Rclone
After=network-online.target
Wants=network-online.target

[Service]
Type=oneshot
User=root
ExecStart=/usr/bin/rclone sync /var/backups/ backup-seguro:snapshots/ --checksum --fast-list --log-file=/var/log/rclone.log
StandardOutput=journal
StandardError=journal
```

### Criação do Agendador (`/etc/systemd/system/rclone-backup.timer`):

```ini
[Unit]
Description=Executa backup Rclone diariamente as 03:00 da madrugada

[Timer]
OnCalendar=*-*-* 03:00:00
Persistent=true

[Install]
WantedBy=timers.target
```

Ative o agendamento no sistema:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now rclone-backup.timer
sudo systemctl list-timers --all | grep rclone
```

---

## Conclusão

Com essa esteira, seus backups são versionados, criptografados na ponta e enviados automaticamente para a nuvem sem qualquer atrito ou intervenção manual diária.

