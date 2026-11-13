# Portfólio — Weidson Cordeiro

Site pessoal **full stack** que apresenta perfil profissional, experiência, competências e projetos, com internacionalização, SEO e formulário de contacto integrado com backend Node.js.

**Produção:** [https://portifolio-green-seven-45.vercel.app/](https://portifolio-green-seven-45.vercel.app/)

---

## Tecnologias

### Frontend

| Tecnologia | Utilização |
|------------|------------|
| **React 19** | Interface e secções do portfólio |
| **Vite 7** | Build e servidor de desenvolvimento |
| **Bootstrap 5** | Layout e componentes UI |
| **Framer Motion** | Animações de secções e transições |
| **React Three Fiber** + **Three.js** | Fundo espacial (`GalaxyBackground`) |
| **i18next** / **react-i18next** | Inglês (predefinido) e português (pt-PT) |
| **react-icons**, **react-type-animation**, **react-intersection-observer** | UI, hero e animações ao scroll |

### Backend

| Tecnologia | Utilização |
|------------|------------|
| **Node.js** | Runtime do servidor |
| **Express 5** | API REST (contacto) |
| **node-mailjet** | Envio de e-mails do formulário |
| **dotenv** / **cors** | Configuração e CORS |

### Ferramentas e recursos

- **Git** / **GitHub** — controlo de versões e CI ([`.github/workflows/ci.yml`](.github/workflows/ci.yml))
- **Vercel** — alojamento (frontend + função serverless), ver [`vercel.json`](vercel.json)
- **SEO** — `robots.txt`, `sitemap.xml` em `client/public/`; metadados dinâmicos em [`client/src/components/SiteHelmet.jsx`](client/src/components/SiteHelmet.jsx)
- **Code-splitting** — `manualChunks` para Three.js, React Three e Framer Motion ([`client/vite.config.js`](client/vite.config.js))
- **Lazy loading** — atributo `loading="lazy"` em imagens de projetos e spotlight

---

## Funcionalidades

Funcionalidades confirmadas na implementação actual:

- **Home** — hero, animação de texto e CTAs
- **Quem sou / About** — apresentação e CV em PDF (EN e PT)
- **Experiência** — cronologia (`Experience.jsx`, `data/experience.js`)
- **Skills** — competências por categorias (`data/skills.js`)
- **Projetos** — grelha, filtros, destaque **SchedulerPro** (`SchedulerProSpotlight.jsx`)
- **Modal de projeto** — detalhes, tecnologias e links (quando definidos nos dados)
- **Internacionalização** — seletor EN | PT, cópias em `client/src/locales/`
- **Contacto** — validação no cliente; `POST /api/sendEmailContacto` com Mailjet
- **Fundo animado** — WebGL (React Three Fiber)
- **Navegação** — secções por âncoras, estado activo (`useActiveSection`)
- **Layout responsivo** — Bootstrap e CSS customizado
- **SEO** — título, descrição e Open Graph actualizados consoante o idioma

---

## Estrutura do projeto

```
Portfolio_Pessoal/
├── client/                 # Aplicação React (Vite)
│   ├── public/             # robots.txt, sitemap.xml, icon.png
│   ├── scripts/            # optimize-images.mjs (opcional)
│   └── src/
│       ├── components/     # UI (Header, Projects, Contact, …)
│       ├── data/           # projects.js, skills.js, experience.js
│       ├── locales/        # en.json, pt-PT.json
│       ├── i18n/           # Configuração i18next
│       └── assets/         # Imagens, CVs
├── server/                 # API Express
│   ├── app.js
│   ├── middlewares/
│   └── .env_example        # Modelo de variáveis (Mailjet)
├── .github/workflows/      # CI (build frontend, deps backend)
├── vercel.json             # Deploy: static-build + @vercel/node
├── AUDITORIA_PORTFOLIO.md
├── EVOLUCAO_PORTFOLIO.md
└── README.md
```

---

## Executar localmente

### Pré-requisitos

- **Node.js** ≥ **20.19.0** (recomendado **22.x**, alinhado ao CI)
- Conta **Mailjet** (apenas para envio real de e-mails no contacto)

### Frontend

```bash
cd client
npm ci
# ou, em alternativa:
# npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) (porta predefinida do Vite).

### Backend (formulário de contacto)

```bash
cd server
npm ci
# ou, em alternativa:
# npm install
```

Crie `server/.env` a partir de [`server/.env_example`](server/.env_example):

| Variável | Descrição |
|----------|-----------|
| `MAILJET_API_KEY` | Chave API Mailjet |
| `MAILJET_SECRET_KEY` | Secret Mailjet |
| `MAILJET_FROM_EMAIL` | E-mail remetente autorizado |
| `PORT` | Porta local (exemplo: `8800`) |
| `NODE_ENV` | `development` em local |

Recomendado copiar o modelo completo de [`server/.env_example`](server/.env_example): sem `PORT` definido, [`server/app.js`](server/app.js) usa **5000** por defeito, enquanto o proxy do Vite em desenvolvimento aponta para **8800**.

```bash
cd server
npm run server
```

O servidor arranca com **nodemon** (por defeito em `http://localhost:8800` se `PORT=8800`).

### API em desenvolvimento vs produção

- **Dev:** o Vite faz proxy de `/api` para `http://localhost:8800` ([`client/vite.config.js`](client/vite.config.js)).
- **Produção (Vercel):** pedidos `/api/*` são encaminhados para a função `server/app.js` na mesma origem.

Para testar o contacto em local, o **frontend e o backend** devem estar a correr em **dois terminais separados**: um com `npm run dev` em `client/`, outro com `npm run server` em `server/`.

---

## Build de produção

```bash
cd client
npm run build
```

Saída em **`client/dist/`** (pasta ignorada pelo Git).

Pré-visualização local do build:

```bash
cd client
npm run preview
```

### Optimização de imagens (opcional)

```bash
cd client
npm run optimize-images
```

Executa [`client/scripts/optimize-images.mjs`](client/scripts/optimize-images.mjs) sobre imagens em `src/assets/img/`.

---

## Deploy na Vercel

Arquitectura resumida ([`vercel.json`](vercel.json)):

| Componente | Builder | Notas |
|------------|---------|--------|
| Frontend | `@vercel/static-build` em `client/package.json` | Script `vercel-build` / `build` → `dist/` |
| API | `@vercel/node` em `server/app.js` | Express exportado; sem `listen` em produção |

**Rotas** em [`vercel.json`](vercel.json) (ordem de avaliação; destinos internos após `@vercel/static-build`):

| Rota pública | Destino interno |
|--------------|-----------------|
| `^/api/(.*)` | `/server/app.js` (Express) |
| `^/robots\.txt$` | `/client/robots.txt` |
| `^/sitemap\.xml$` | `/client/sitemap.xml` |
| `^/(assets/.*)` | `/client/$1` |
| `^/icon\.png$` | `/client/icon.png` |
| `.*` (restantes, incl. `/`) | `/client/index.html` (SPA) |

API: `GET /api`, `POST /api/sendEmailContacto` ([`server/app.js`](server/app.js)).

**Variáveis de ambiente** no painel Vercel (não versionar no repositório): `MAILJET_API_KEY`, `MAILJET_SECRET_KEY`, `MAILJET_FROM_EMAIL` (e outras que o projeto já utilize).

**No repositório:** a configuração de build e rotas para a Vercel está em [`vercel.json`](vercel.json) (detalhe em [`EVOLUCAO_PORTFOLIO.md`](EVOLUCAO_PORTFOLIO.md), índice e §12).

**Integração Git ↔ Vercel** (deploy automático após push): não há ficheiro no repo que a documente — confirmar no painel Vercel do projeto. O histórico de deploys via Git e incidentes de routing está no EVOLUCAO; esta documentação **não** valida o último deployment nem o estado completo em produção.

---

## Integração contínua (GitHub Actions)

O workflow [`.github/workflows/ci.yml`](.github/workflows/ci.yml) executa, em push/PR para `main`:

- `client`: `npm ci` + `npm run build`
- `server`: `npm ci` (validação de dependências)

Não há testes automatizados configurados no servidor (`npm test` não faz parte do CI).

---

## Projetos apresentados

Os projetos são definidos em [`client/src/data/projects.js`](client/src/data/projects.js). Cada entrada inclui, quando aplicável:

- `slug` — chave para traduções nos ficheiros de locale
- `technologies` — stack declarada no card
- `github` / `demo` — URLs por projeto (consultar o ficheiro; não assumir links genéricos)

O conteúdo textual (título, descrição) é localizado via i18n e utilitários em `client/src/utils/localizeProject.js`.

---

## Documentação complementar

| Documento | Conteúdo |
|-----------|----------|
| [`AUDITORIA_PORTFOLIO.md`](AUDITORIA_PORTFOLIO.md) | Auditoria e plano de melhorias |
| [`EVOLUCAO_PORTFOLIO.md`](EVOLUCAO_PORTFOLIO.md) | Evolução técnica, deploy Vercel, CI, i18n, SEO |

---

## Licença

Não existe ficheiro `LICENSE` neste repositório. A licença de utilização **ainda não está definida** publicamente.
