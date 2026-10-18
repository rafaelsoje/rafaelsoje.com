---
title: "Automação Idempotente com Ansible: Padronização e Deploy em Servidores Linux"
date: "2026-09-15"
excerpt: "Como utilizar o Ansible para eliminar configurações manuais e garantir a reprodutibilidade de servidores: conceitos de idempotência, organização de playbooks, templates Jinja2 e práticas de segurança sem agentes adicionais."
category: "Ferramentas & Automação"
tags: ["Ansible", "Automação", "DevOps", "Linux", "Sysadmin", "IaC"]
author: "Rafael Soje"
readTime: "8 min de leitura"
references:
  - "Red Hat Ansible Documentation: Best Practices and Idempotency (https://docs.ansible.com)"
  - "Ansible Community: Security and Hardening Collection Guides"
  - "CIS Security Automation: Center for Internet Security Ansible Benchmarks"
  - "YAML Ain't Markup Language: Standard 1.2 Specification"
---

A administração de servidores baseada em intervenções manuais via SSH direto gera o que o setor de engenharia chama de *drift de configuração* (desvios não documentados entre ambientes). Dois servidores provisionados para serem idênticos acabam com pacotes, permissões e parâmetros diferentes com o passar dos meses.

O **Ansible** se destaca como a ferramenta ideal de automação de infraestrutura por ser *agentless* (não exige a instalação de daemons pesados nos alvos, operando exclusivamente via protocolo SSH nativo e Python) e orientado ao princípio da **idempotência**.

---

## 1. O que é Idempotência e por que ela é Vital?

Uma operação idempotente é aquela que pode ser executada centenas de vezes consecutivas resultando sempre no mesmo estado final, sem efeitos colaterais indesejados.

No Ansible:
- Se um pacote já estiver instalado na versão correta, ele não é reinstalado.
- Se uma linha já existir no arquivo de configuração, ela não é duplicada.
- Se um serviço já estiver ativo e o arquivo não mudou, o serviço não é reiniciado desnecessariamente.

Isso permite rodar a automação periodicamente em rotinas de conformidade para auditar e corrigir desvios silenciosos.

---

## 2. Estrutura de Inventário Seguro (`inventory.ini`)

Em vez de expor dados de login no código, o inventário deve referenciar hosts de forma declarativa e utilizar chaves SSH já distribuídas:

```ini
[webservers]
web-prod-01 ansible_host=10.10.0.10 ansible_user=deployer ansible_port=22
web-prod-02 ansible_host=10.10.0.11 ansible_user=deployer ansible_port=22

[databases]
db-prod-01 ansible_host=10.10.0.20 ansible_user=deployer ansible_port=22

[all:vars]
ansible_python_interpreter=/usr/bin/python3
ansible_ssh_private_key_file=~/.ssh/id_rsa_infra
ansible_ssh_common_args='-o StrictHostKeyChecking=accept-new'
```

---

## 3. Playbook de Hardening e Padronização (`site.yml`)

Abaixo está um playbook prático para padronização de servidores Linux Debian/Ubuntu, configurando atualizações de segurança, timezone e hardening de parâmetros do SSH:

```yaml
---
- name: Padronização e Hardening de Servidores Linux
  hosts: all
  become: true
  gather_facts: true

  vars:
    timezone_config: "America/Sao_Paulo"
    ssh_allowed_groups: "deployer sudo"

  tasks:
    - name: Garantir fuso horário correto
      community.general.timezone:
        name: "{{ timezone_config }}"

    - name: Atualizar cache de pacotes e instalar ferramentas fundamentais
      ansible.builtin.apt:
        update_cache: true
        cache_valid_time: 3600
        pkg:
          - htop
          - curl
          - git
          - ufw
          - fail2ban
          - unattended-upgrades
        state: present

    - name: Configurar atualizações automáticas de segurança do sistema
      ansible.builtin.copy:
        dest: /etc/apt/apt.conf.d/20auto-upgrades
        content: |
          APT::Periodic::Update-Package-Lists "1";
          APT::Periodic::Unattended-Upgrade "1";
        owner: root
        group: root
        mode: '0644'

    - name: Aplicar diretivas seguras no sshd
      ansible.builtin.lineinfile:
        path: /etc/ssh/sshd_config
        regexp: "{{ item.regexp }}"
        line: "{{ item.line }}"
        state: present
        validate: '/usr/sbin/sshd -t -f %s'
      loop:
        - { regexp: '^#?PermitRootLogin', line: 'PermitRootLogin no' }
        - { regexp: '^#?PasswordAuthentication', line: 'PasswordAuthentication no' }
        - { regexp: '^#?X11Forwarding', line: 'X11Forwarding no' }
        - { regexp: '^#?MaxAuthTries', line: 'MaxAuthTries 3' }
      notify: Reiniciar SSH

    - name: Garantir que o serviço Fail2ban esteja ativo e habilitado
      ansible.builtin.systemd:
        name: fail2ban
        state: started
        enabled: true

  handlers:
    - name: Reiniciar SSH
      ansible.builtin.systemd:
        name: ssh
        state: restarted
```

### Destaque de Engenharia: A diretiva `validate`
Observe a linha:
```yaml
validate: '/usr/sbin/sshd -t -f %s'
```
O Ansible gera o arquivo modificado em um arquivo temporário e executa o binário do daemon com a flag de teste (`-t`). Se houver qualquer erro de digitação, a alteração é abortada e o arquivo original não é corrompido, evitando perda de acesso remoto ao host.

---

## 4. Execução Controlada e Modo Dry-Run (`--check`)

Antes de aplicar qualquer modificação em ambientes de produção, o Ansible permite rodar em modo de simulação (*dry-run*):

```bash
# Simula a execução e exibe o que seria alterado sem tocar no servidor
ansible-playbook -i inventory.ini site.yml --check --diff

# Executa as alterações de forma definitiva
ansible-playbook -i inventory.ini site.yml
```

A flag `--diff` exibe as diferenças exatas linha a linha no formato de patch unificado, oferecendo total visibilidade e segurança para o time de operações.

---

## Conclusão

Ao adotar playbooks declarativos e idempotentes no Ansible, a gestão de dezenas ou centenas de servidores passa a ser tratada como código (Infrastructure as Code), com histórico auditável via Git e garantia de conformidade contínua.
