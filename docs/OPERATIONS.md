# Documentação Operacional e Infraestrutura — rafaelsoje.com

Este documento descreve a arquitetura de produção, a esteira de deploy, os procedimentos operacionais de manutenção, a gestão de segredos e os protocolos de segurança do projeto **rafaelsoje.com**.

---

## 1. Arquitetura de Produção

A aplicação opera sob uma topologia em camadas com proxy reverso e isolamento estrito de portas:

```text
                  Internet (Visitantes / Clientes)
                                ↓
                      Cloudflare (Edge CDN)
            [Proxy DNS, SSL Edge, WAF, Proteção DDoS]
                                ↓
                      Nginx :443 (VPS Host)
       [SSL Cloudflare Origin CA, Rate Limiting, HTTP/2,
        Headers de Segurança, Bloqueio de Scanners/Bots]
                                ↓
                     Loopback HTTP (127.0.0.1)
                                ↓
                     Next.js App Router :3000
           [Processo Node.js gerenciado via systemd:
                      rafaelsoje.service]
```

### Fluxo de Requisição:
1. **Cloudflare**: Termina a conexão pública HTTPS do usuário, aplicando regras de borda (DDoS, CDN e caching de assets estáticos).
2. **Nginx (:443)**: Atua como ponto único de entrada seguro no servidor VPS com certificado Cloudflare Origin CA (`/etc/cloudflare/certificate/rafaelsoje.com/`), aplicando filtros de segurança, limites de concorrência e encaminhamento de headers de IP real (`CF-Connecting-IP`).
3. **Loopback Interno (`127.0.0.1:3000`)**: O Nginx faz o proxy reverso via HTTP/1.1 para a instância local do Next.js.
4. **Next.js (`rafaelsoje.service`)**: Servidor de produção Node.js atendendo as rotas SSR/SSG e as rotas de API (`/api/contact`).

---

## 2. Estratégia de Deploy

O repositório do projeto adota uma estratégia de múltiplos remotes Git. O servidor VPS **não** possui credenciais de acesso ao GitHub (sem Deploy Keys ou tokens pessoais no servidor):

```text
           Máquina de Desenvolvimento / Antigravity
                               |
         +---------------------+---------------------+
         |                                           |
         ↓                                           ↓
   git push origin main                        git push vps main
         ↓                                           ↓
   GitHub Privado                            Servidor VPS (Bare)
(Repositório Oficial)                       /srv/git/rafaelsoje.git
                                                     ↓
                                             Deploy / Releases
                                                     ↓
                                             /var/www/rafaelsoje
```

### Remotes Configurados:
- **`origin`**: `git@github.com:rafaelsoje/rafaelsoje.com.git` (Repositório remoto principal).
- **`vps`**: `ssh://rafael@vps/srv/git/rafaelsoje.git` (Repositório bare no VPS acessado via SSH sobre WireGuard `10.10.0.1`).

### Fluxo de Publicação de Código:
```bash
git push origin main
git push vps main
```

---

## 3. Estrutura de Diretórios no Servidor

O ambiente no VPS segue o padrão de releases imutáveis com troca atômica via link simbólico:

```text
/srv/git/
└── rafaelsoje.git                 # Repositório Git Bare (recebe git push vps)

/var/www/rafaelsoje/
├── releases/
│   ├── ed5ded5-20260919-182825/   # Release compilada (imutável)
│   │   ├── .next/
│   │   ├── node_modules/
│   │   ├── public/
│   │   ├── package.json
│   │   └── .env.production -> /var/www/rafaelsoje/shared/.env.production
│   └── <novas-releases>/
├── shared/
│   └── .env.production            # Variáveis de ambiente e segredos centralizados
└── current -> /var/www/rafaelsoje/releases/ed5ded5-20260919-182825
```

- **`releases/`**: Diretórios de código versionados por hash de commit e timestamp. **Nunca editar arquivos dentro de releases existentes.**
- **`shared/`**: Arquivos persistentes compartilhados entre releases (ex.: `.env.production`).
- **`current`**: Link simbólico apontando para a release ativa no momento.

---

## 4. Serviço do Sistema (`rafaelsoje.service`)

A aplicação é executada como serviço `systemd` dedicado em modo não-root:

* **Arquivo de Unidade**: `/etc/systemd/system/rafaelsoje.service`
* **Usuário / Grupo**: `rafael` : `rafael`
* **Working Directory**: `/var/www/rafaelsoje/current`
* **Comando de Execução**:
  ```bash
  /usr/bin/npm start -- -p 3000 -H 127.0.0.1
  ```
* **Isolamento de Rede**:
  * O Next.js escuta **estritamente em `127.0.0.1:3000`** (loopback).
  * A porta `3000/tcp` **nunca** deve ser aberta no firewall (UFW) e jamais deve aceitar conexões externas diretamente. O acesso externo ocorre exclusivamente via Nginx na porta `443`.

### Comandos de Gerenciamento:
```bash
sudo systemctl status rafaelsoje.service
sudo systemctl restart rafaelsoje.service
sudo journalctl -u rafaelsoje.service -f --no-pager
```

---

## 5. Regra Crítica de Nginx: `location ^~ /_next/`

No VirtualHost do Nginx (`/etc/nginx/sites-available/rafaelsoje`), é **mandatório** manter o bloco de proxy com o modificador de prefixo prioritário `^~`:

```nginx
# Assets estáticos e chunks do Next.js
# O modificador ^~ garante que requisições iniciadas com /_next/ não sejam interceptadas por regexes (ex: /app/)
location ^~ /_next/ {
    proxy_pass http://nextjs_rafaelsoje;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header CF-Connecting-IP $http_cf_connecting_ip;
    proxy_cache_bypass $http_upgrade;
    proxy_read_timeout 60s;
    proxy_connect_timeout 60s;
}
```

### Por que esta regra é crítica?
1. O servidor possui um snippet compartilhado de segurança (`/etc/nginx/snippets/security-restrictions.conf`) utilizado por múltiplos sites que contém uma expressão regular para bloquear pastas internas de frameworks PHP (como CodeIgniter):
   ```nginx
   location ~* /(?:app|tests|vendor|writable|system|config|logs|actuator|_environment)/ {
       deny all;
       return 444;
   }
   ```
2. O **Next.js App Router** utiliza caminhos legítimos e essenciais contendo `/app/`, tais como:
   `/_next/static/chunks/app/page-*.js` e `/_next/static/chunks/app/layout-*.js`.
3. Pela regra de precedência do Nginx, expressões regulares (`location ~*`) têm prioridade sobre prefixos genéricos normais (`location /`).
4. **Sem o modificador `^~`**, qualquer chunk do Next.js sob `/app/` é interceptado pela regex de segurança e recebe `HTTP 444` (encerramento da conexão TCP).
5. A Cloudflare detecta o encerramento da conexão e exibe `HTTP 520` para o cliente.
6. O navegador acusa `ChunkLoadError` e o Next.js quebra a renderização client-side com tela de erro de exceção.

> **ATENÇÃO**: **NUNCA** remover nem alterar o bloco `location ^~ /_next/` sem revisar simultaneamente o impacto sobre as regras do `security-restrictions.conf`.

---

## 6. Registro de Incidente (19/09/2026)

* **Sintoma Observado**: No navegador Chrome, a página apresentava erro visual:
  `"Application error: a client-side exception has occurred while loading rafaelsoje.com (see the browser console for more information)."`
* **Diagnóstico Técnico**: O console acusava `ChunkLoadError: Loading chunk 974 failed` ao tentar carregar `/_next/static/chunks/app/page-c7e363b36fd72662.js`, cuja requisição recebia `HTTP 520` via Cloudflare.
* **Causa Raiz**: O Nginx interceptava requisições que continham `/app/` por meio da regra regex nº 3 do snippet `security-restrictions.conf`, aplicando `return 444;` antes que chegassem ao Next.js.
* **Correção Aplicada**: Inclusão de `location ^~ /_next/` com `proxy_pass` direto ao upstream no VirtualHost do Nginx, assegurando que prefixos `/_next/` interrompam a busca de expressões regulares.
* **Resultado**: 100% dos chunks e assets passaram a responder `HTTP 200 OK`, com zero erros de JavaScript no console e hidratação perfeita em modo normal e janela anônima.

---

## 7. Procedimento de Rollback

Se um deploy introduzir regressões ou instabilidade em produção, o retorno para a versão anterior deve ser feito **sempre** de forma atômica, sem alterar os arquivos das releases:

1. **Listar as releases disponíveis**:
   ```bash
   ssh vps "ls -l /var/www/rafaelsoje/releases"
   ```
2. **Identificar a release anterior estável** (ex.: `ed5ded5-20260919-182825`).
3. **Alternar atomicamente o link simbólico `current`**:
   ```bash
   ssh vps "ln -sfn /var/www/rafaelsoje/releases/<release-anterior> /var/www/rafaelsoje/current"
   ```
4. **Reiniciar o serviço Next.js**:
   ```bash
   ssh vps "sudo systemctl restart rafaelsoje.service"
   ```
5. **Verificar a saúde do serviço e o BUILD_ID ativo**:
   ```bash
   ssh vps "systemctl is-active rafaelsoje.service && cat /var/www/rafaelsoje/current/.next/BUILD_ID"
   ```

---

## 8. Checklist Obrigatório de Deploy Futuro

Para considerar qualquer deploy saudável e concluído, todos os itens abaixo devem ser validados na sequência:

### Pré-Deploy (Ambiente Local)
- [ ] `npm test` aprovado (100% de testes unitários passando).
- [ ] `npm run lint` aprovado (0 erros e 0 avisos).
- [ ] `npm run typecheck` aprovado (TypeScript strict mode sem falhas).
- [ ] `npm run build` gerando todas as rotas estáticas e dinâmicas com sucesso.
- [ ] Revisão do `git status` e `git diff` garantindo ausência de segredos ou arquivos temporários.

### Publicação (VPS)
- [ ] `git push origin main` e `git push vps main` executados.
- [ ] Nova pasta de release criada em `/var/www/rafaelsoje/releases/<nova-release>`.
- [ ] Link simbólico do `.env.production` criado para `/var/www/rafaelsoje/shared/.env.production`.
- [ ] `npm ci --omit=dev` e `npm run build` executados com sucesso dentro da release.
- [ ] Troca atômica do symlink `/var/www/rafaelsoje/current`.
- [ ] `sudo systemctl restart rafaelsoje.service`.
- [ ] `systemctl is-active rafaelsoje.service` confirmando status `active (running)`.
- [ ] Porta `3000` ativa exclusivamente em `127.0.0.1`.
- [ ] `sudo nginx -t` retornando syntax ok.

### Pós-Deploy e Validação em Navegador Real
> **IMPORTANTE**: Resposta `HTTP 200` no documento HTML raiz (`/`) **NÃO** significa que a aplicação está funcionando. É obrigatório validar os chunks e a execução JavaScript no navegador.

- [ ] Acessar `https://rafaelsoje.com` e `https://www.rafaelsoje.com`.
- [ ] Inspecionar o DevTools (aba **Network**): confirmar que todos os arquivos sob `/_next/static/...` retornam `HTTP 200 OK`.
- [ ] Inspecionar o DevTools (aba **Console**): garantir **zero** exceções client-side (`ChunkLoadError`, `TypeError`, erros de hidratação).
- [ ] Executar **Hard Refresh** (`Ctrl+F5` ou `Cmd+Shift+R`) e confirmar que a página recarrega limpa.
- [ ] Testar em **Janela Anônima / Perfil Limpo** para descartar interferência de cache local ou extensões.
- [ ] Validar visualmente e interativamente o formulário de contato (campos renderizados e aceitando digitação; **não** realizar envios de teste sem autorização prévia).
- [ ] Validar a integridade dos demais serviços no servidor, confirmando que `https://audiovisual.rafaelsoje.com/login` permanece `HTTP 200 OK`.

---

## 9. Gestão de Segredos e Credenciais

* **Nunca versionar no Git**:
  - Arquivos `.env`, `.env.local`, `.env.production`.
  - Credenciais de SMTP (senhas, usuários de envio).
  - Tokens e formulários da API HubSpot (`HUBSPOT_PORTAL_ID`, `HUBSPOT_FORM_GUID`).
  - Chaves privadas SSH (`id_rsa`, `*.pem`, `*.key`).
  - Certificados SSL/TLS e arquivos de infraestrutura sensíveis.
* Os segredos reais de produção residem única e exclusivamente no arquivo compartilhado do VPS:
  `/var/www/rafaelsoje/shared/.env.production`
  com permissões restritas de leitura (`chmod 600` ou `640`) para o usuário `rafael`.

---

## 10. Next.js Version Fingerprinting

* O Next.js App Router expõe por padrão no runtime do navegador a propriedade global `window.next.version` via módulo de bootstrap nativo (`app-bootstrap.js`).
* Ferramentas de análise de stack (como Wappalyzer) realizam a leitura dessa variável diretamente no DOM em tempo de execução para exibir o número exato da versão.
* **Mitigação implementada no projeto (`src/app/layout.tsx`)**:
  * Um script inline síncrono no `<head>` intercepta a criação do objeto global `window.next` utilizando um `Proxy` defensivo.
  * O interceptor remove a propriedade `version` e mascara tentativas de leitura e enumeração (`getOwnPropertyDescriptor`, `ownKeys`, `'version' in window.next`), enquanto preserva 100% intactas as funcionalidades internas legítimas do Next.js (como `window.next.router` e `window.next.appDir`).
  * Esta abordagem elimina a exposição da versão no DOM sem alterar arquivos do `node_modules` e sem aplicar patches frágeis em bundles gerados pós-build.

