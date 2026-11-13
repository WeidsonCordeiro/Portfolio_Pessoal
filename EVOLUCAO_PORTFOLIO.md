# Evolução do portfólio — relatório de implementação

**Data:** 12 Nov 2026  
**Repositório:** `Portfolio_Pessoal`  
**Site:** https://portifolio-green-seven-45.vercel.app/

## 1. Estado inicial

- Branch local `main` com melhorias da auditoria (não commitadas).
- Remoto com **2 commits** à frente: `15db230` (CV) e `9e796f1` (CV EN).
- Conflitos esperados em `Contact.jsx` e `Perfil.jpg` após integração.

## 2. Sincronização Git

| Passo | Resultado |
|-------|-----------|
| `git stash push -u` | OK — trabalho local guardado |
| `git pull origin main` | OK — fast-forward até `9e796f1` |
| `git stash pop` | Conflitos em `Contact.jsx` e `Perfil.jpg` |

**Resoluções aplicadas (sem reset/clean):**

- **Perfil.jpg:** mantida versão **comprimida** do stash (~132 KB no build).
- **Contact.jsx:** fundidas melhorias de a11y/loading com suporte a **CV EN + CV BR**.
- **CV_BR_Weidson_Cordeiro.pdf:** restaurado a partir de `2c41fbb` (remoto tinha removido).
- **CV_EN_Weidson_Cordeiro.pdf:** mantido do remoto.

**Commits recebidos:**

- `15db230` — Atualizando CV  
- `9e796f1` — CV Atualizado com a versão ingles  

## 3. Alterações implementadas

### Internacionalização (EN default + pt-PT)

- `i18next`, `react-i18next`, `i18next-browser-languagedetector`
- Ficheiros: `client/src/locales/en.json`, `client/src/locales/pt-PT.json`
- Seletor **EN | PT** no header com persistência em `localStorage` (`portfolio-lang`)
- Secções, projetos, modal, formulário, erros e footer traduzidos
- SEO dinâmico via `SiteHelmet.jsx` (sem `react-helmet-async` — incompatível peer com React 19; meta atualizadas com `useEffect`)

### Navegação

- Menu compacto (padding/gap reduzidos)
- `useActiveSection` + `nav-link-active` + `aria-current="page"`
- Labels: Home, Quem sou / About me, Experiência, Skills, Projetos, Contactos

### SchedulerPro (flagship)

- Screenshots em `client/src/assets/img/schedulerpro/`
- Spotlight `SchedulerProSpotlight.jsx`
- Projeto `slug: schedulerpro` com stack **verificada** no repo SchedulerPro
- Links GitHub/Demo: **placeholders** (`#`, `linksPending: true`) até URLs serem fornecidos

### Posicionamento profissional

- Hero e About com foco frontend + backend + SaaS + testes (factos comprovados)
- Experiência em 3 blocos: SchedulerPro SaaS, apps full stack, sites institucionais
- Skills com grupo “Qualidade e ferramentas” (Vitest)

### Identidade futurista preservada

- Galaxy WebGL mantida; partículas reduzidas; lazy chunk
- `prefers-reduced-motion` → gradiente espacial
- **Page Visibility API** — pausa animação com tab inativa

### SEO / a11y / performance (extensão da auditoria)

- Metadados bilíngues dinâmicos + JSON-LD por idioma
- `robots.txt`, `sitemap.xml`, lazy load, imagens otimizadas
- Modal acessível; CV por idioma no contacto

## 4. Ficheiros principais criados/alterados

**Novos:**  
`EVOLUCAO_PORTFOLIO.md`, `client/src/i18n/index.js`, `client/src/locales/*.json`, `client/src/hooks/useActiveSection.js`, `client/src/components/SiteHelmet.jsx`, `client/src/components/SchedulerProSpotlight.jsx`, `client/src/utils/localizeProject.js`, `client/src/assets/img/schedulerpro/*`

**Alterados:** Header, Home, About, Experience, Skills, Projects, ProjectCard, ProjectModal, Contact, Footer, App, GalaxyBackground, `projects.js`, `experience.js`, `skills.js`, `index.css`, `package.json`, `index.html`

## 5. Dependências

**Adicionadas:** `i18next`, `react-i18next`, `i18next-browser-languagedetector`  

**Não usada:** `react-helmet-async` (peer React 18); substituída por `SiteHelmet` custom

## 6. Testes executados

| Teste | Resultado |
|-------|-----------|
| `npm run build` (client) | **OK** — 31,47 s (log 12 Nov 2026) |
| Vitest (client) | N/A — sem script de testes no portfólio |
| `npm test` (server) | Não executado (script placeholder) |
| Lighthouse (build inicial) | Ver secção 9 — validação |

## 9. Validação final pós-implementação

**Data:** 12 Nov 2026  
**Ambiente:** `vite preview` → `http://127.0.0.1:4173/` (build de produção local; produção Vercel ainda na versão anterior).

### 9.1 Git (pré-commit)

| Verificação | Resultado |
|-------------|-----------|
| Conflitos | Nenhum |
| Stash residual | Removido após normalização (`stash drop` quando aplicável) |
| Índice | Unificado com `git add` (sem incluir `*.stackdump`) |
| Commit / push | **Não executados** — aguardam autorização |

### 9.2 Testes funcionais

**Aprovados**

- Navegação entre secções (âncoras + `aria-current`)
- Menu desktop e mobile (toggler Bootstrap)
- Seletor EN \| PT e traduções das secções
- Modal SchedulerPro (abrir/fechar/Escape) sem links `href="#"` funcionais
- SchedulerPro Spotlight (screenshots + copy verificável)
- PDFs EN e BR presentes no build `dist/assets/`

**Parciais / não testados**

- Envio do formulário de contacto (API Mailjet não disponível em `preview`)
- Download efectivo dos PDFs (não clicado na sessão de validação)
- Links GitHub/Demo de projetos com URLs reais (não todos clicados)

**Correcção e re-teste:** removido `lng: "en"` fixo em `i18n/index.js`; após escolher PT, reload no `vite preview` mantém **pt-PT** (título, nav e conteúdo).

### 9.3 Testes visuais

| Viewport | Overflow horizontal |
|----------|---------------------|
| 360px | Não detectado |
| 390 / 768 / 1024 / 1440 | Não medidos em batch nesta sessão |

Tema espacial, menu compacto e spotlight visíveis no preview.

### 9.4 SEO

| Camada | Estado |
|--------|--------|
| HTML estático (`index.html`) | title, description, OG, Twitter, canonical, **hreflang** (en, pt-PT, x-default), **JSON-LD Person** (EN) |
| Com JavaScript (`SiteHelmet`) | Atualiza `lang`, title, description, OG, JSON-LD por idioma |
| `robots.txt` / `sitemap.xml` | OK no `dist/` (requer deploy + rotas `vercel.json`) |

**Nota:** hreflang aponta para a mesma URL (SPA); crawlers sem JS ficam com metadados EN estáticos; utilizadores com JS obtêm PT/EN dinâmico.

### 9.5 Lighthouse 12.6.0 (mobile, preview local — uma execução)

| Métrica | Valor |
|---------|--------|
| Performance | 56 |
| Accessibility | 97 |
| Best Practices | 100 |
| SEO (Lighthouse) | 100 |
| LCP | 5.6 s |
| CLS | 0 |
| INP | n/a |

Desktop: não obteve JSON válido nesta sessão.

### 9.6 SchedulerPro

- Screenshots e descrição: OK  
- Stack e funcionalidades: alinhadas ao repositório SchedulerPro (não inventadas)  
- GitHub/Demo: placeholders (“coming soon”) — **pendência de URLs reais**

### 9.7 Resumo

| | |
|---|---|
| **Aprovados para desenvolvimento** | Build, i18n UI, a11y modal, robots/sitemap no build, SchedulerPro sem links falsos |
| **Bloqueadores relativos** | LCP 5.6s; SEO estático só EN; URLs SchedulerPro; deploy pendente |
| **Melhorias pós-validação aplicadas** | SEO estático reforçado, persistência i18n, `.gitignore` stackdump, staging normalizado |

## 7. Pendências

1. URLs GitHub e demo do **SchedulerPro** (substituir placeholders)
2. **Commit + push + deploy Vercel** — **pronto para comando único** quando autorizares (índice Git unificado, stash `wip-auditoria-pre-pull` eliminado, sem `*.stackdump` staged)
3. Deploy Vercel para publicar alterações
4. Lighthouse formal pós-deploy (opcional)
5. `bash.exe.stackdump` ignorado via `.gitignore`
6. Lighthouse desktop — repetir localmente se necessário

## 8. Decisões técnicas

- i18n centralizado em JSON + `slug` nos projetos para evitar duplicar componentes
- SchedulerPro destacado no spotlight + card modal; omitido da grelha “Destaques” para evitar duplicação
- SEO dinâmico sem `react-helmet-async` por compatibilidade com React 19
- Fotografia de perfil: blob **`9e796f1` (versão B)** com compressão sharp (~80 KB no build), após comparação com versão A em `client/.perfil-compare/`

## 10. Correção urgente — perfil e fundo espacial

**Data:** 12 Nov 2026  
**Ambiente:** `vite preview` → `http://127.0.0.1:4173/` (sem commit/push/deploy).

### 10.1 Causas

| Problema | Causa |
|----------|--------|
| Foto errada | Conflito `stash pop` → ficou **versão C** (~132 KB), blob **A** comprimido, em vez de **B** (`9e796f1` / `origin/main`) |
| Galáxia invisível | `z-index: -1` no backdrop WebGL + partículas/tamanhos demasiado reduzidos na auditoria; canvas por detrás do fundo do `body` |

### 10.2 Ficheiros alterados

- [`client/src/assets/img/Perfil.jpg`](client/src/assets/img/Perfil.jpg) — restaurado a partir de `9e796f1`, optimizado (1200 px máx., quality 88)
- [`client/src/App.jsx`](client/src/App.jsx) — `app-shell` + `app-shell-content` (conteúdo `z-index: 1`)
- [`client/src/components/GalaxyBackground.jsx`](client/src/components/GalaxyBackground.jsx) — stacking, partículas 1200/700/350, `dpr` até 1.75
- [`client/src/index.css`](client/src/index.css) — `.galaxy-backdrop` `z-index: 0`, `pointer-events: none`, canvas full-bleed
- [`.gitignore`](.gitignore) — `client/.perfil-compare/`

### 10.3 Fotografia

| Versão | Ficheiro de referência (comparação) | Aplicada no site |
|--------|--------------------------------------|------------------|
| A (pré-CV EN) | `client/.perfil-compare/Perfil_vA_ef490df-15db230.jpg` | Não |
| B (`9e796f1`) | `client/.perfil-compare/Perfil_vB_9e796f1_origin-main.jpg` | **Sim** → build `Perfil-*.jpg` ~80 KB |
| C (stash) | `client/.perfil-compare/Perfil_vC_working-tree.jpg` | Substituída |

**Confirmação visual:** abre a pasta `.perfil-compare` e a secção «Quem sou»; se preferires **A**, avisa antes do commit.

### 10.4 GalaxyBackground

**Primeira correcção (stacking):** ainda se via só gradiente no browser do utilizador — partículas WebGL demasiado subtis (`size` 0.002–0.003) e/ou `prefers-reduced-motion` a desligar o canvas.

**Segunda correcção (visibilidade):**

| Alteração | Detalhe |
|-----------|---------|
| WebGL | Partículas 1400 / 800 / 450; `size` 0.012 / 0.018 / 0.022; `opacity` 0.9; sem `frustumCulled` |
| DPR | `Math.min(devicePixelRatio, 2)` |
| Reduce motion | Classe `.galaxy-starfield` com estrelas **CSS** visíveis (drift lento se animações permitidas) |
| WebGL falha | `webglcontextlost` → `galaxy-backdrop--fallback` + starfield CSS |
| Layout | `.galaxy-backdrop` `inset: 0`, `isolation: isolate`; canvas `position: absolute; inset: 0` |
| Lazy load | Mantido; pausa Page Visibility API mantida |

**Windows (opcional):** Definições → Acessibilidade → Efeitos visuais → *Mostrar animações no Windows* **ligado** para WebGL animado; com animações do sistema desligadas, vês estrelas CSS fixas.

### 10.5 Testes (preview local)

| Teste | Resultado |
|-------|-----------|
| `npm run build` | OK |
| Canvas WebGL (pós-2.ª correcção) | 1 canvas; estrelas visíveis em 1680×844 (screenshot validação) |
| Overflow horizontal 360px | Não |
| Reduce motion | Starfield CSS; sem canvas |
| Modal SchedulerPro + Escape | OK |
| i18n PT / spotlight | OK |
| Viewports 390 / 768 / 1024 / 1440 | Não re-medidos em batch nesta passagem (replicar se necessário) |
| Erros consola WebGL | Nenhum observado na sessão |

### 10.7 Diagnóstico Galaxy — causa raiz e correcção definitiva

**Data:** 13 Nov 2026

#### Causa raiz

1. **`prefers-reduced-motion: reduce`** (comum no Windows com animações desligadas) → `useWebGL === false` → **zero canvas**; fallback CSS anterior (20 pontos fixos 1–2px em 100%×100%) era **indistinguível** do gradiente.
2. **Suspense + `lazy()`** no [`App.jsx`](client/src/App.jsx) — fallback só `galaxy-backdrop-static` **sem** `galaxy-starfield` → gradiente puro enquanto o chunk carrega (ou se falhar).
3. **Falsos positivos** em dev: `webglcontextlost` no unmount do StrictMode podia marcar `webglFailed` e forçar o mesmo fallback fraco.

#### Porque as correcções 1.ª/2.ª não resolveram

Ajustaram z-index e tamanhos WebGL, mas o browser do utilizador estava no **ramo CSS**; validações anteriores usaram `no-preference` e relataram WebGL OK.

#### Correcção aplicada

| Ficheiro | Alteração |
|----------|-----------|
| [`App.jsx`](client/src/App.jsx) | Import **estático** de `GalaxyBackground` (sem `lazy`/Suspense) |
| [`GalaxyBackground.jsx`](client/src/components/GalaxyBackground.jsx) | `WebGLContextGuard` com cleanup; `data-galaxy-mode`; camada `galaxy-starfield-dim` sob WebGL |
| [`index.css`](client/src/index.css) | Starfield **em mosaico** (120px / 180px), nebulosa `::after`, opacidade visível |
| [`package.json`](client/package.json) | Dependência directa `maath` |

#### Script de diagnóstico (consola)

```javascript
(() => ({
  reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
  backdrop: document.querySelector(".galaxy-backdrop")?.className,
  mode: document.querySelector(".galaxy-backdrop")?.dataset?.galaxyMode,
  canvasCount: document.querySelectorAll("canvas").length,
  lazyPending: !document.querySelector(".galaxy-backdrop")?.classList.contains("position-fixed"),
}))();
```

#### Resultados (sessão 13 Nov)

| Ambiente | reduced | mode | canvas | Notas |
|----------|---------|------|--------|-------|
| `5173` (pré-fix, plano) | true | — | 0 | Só gradiente / fallback fraco |
| `5173` (pós-fix, reduce) | true | **css** | 0 | Grelha de estrelas **visível** (screenshot) |
| `5173` (pós-fix, no-preference) | false | **webgl** | 1 | Partículas 3D + camada CSS dim |
| `4173` (pós-fix build) | *revalidar no teu Chrome* | webgl/css | *id.* | Build OK (~17s); `manualChunks` three/react-three mantidos |

**Build:** `npm run build` OK (13 Nov 2026).

#### Limitações

- Com **reduced motion**: estrelas **CSS** estáticas (acessibilidade); WebGL 3D animado só com animações do SO ligadas.
- Diagnóstico no **teu** Chrome com o script acima confirma `mode` = `css` ou `webgl`.

### 10.8 Restauro Galaxy original (referência Vercel / `9e796f1`)

**Data:** 13 Nov 2026  
**Objectivo:** Alinhar o fundo espacial com `origin/main` (`9e796f1`), tal como em [produção Vercel](https://portifolio-green-seven-45.vercel.app/), **sem** desmontar o WebGL quando `prefers-reduced-motion: reduce` e **sem** fallback CSS `.galaxy-starfield`.

#### Referência Git

| Item | Valor |
|------|--------|
| Commit de referência | `9e796f1` = `origin/main` |
| Regressão | Alterações **locais** da auditoria (não commitadas no remoto) |

#### Diferenças revertidas (auditoria → original)

| Aspeto | Auditoria (local) | Original (`9e796f1`) |
|--------|-------------------|----------------------|
| WebGL com `reduce` | Canvas **desligado** (`useWebGL = false`) | Canvas **sempre** montado |
| Partículas | 1200–1400 / reduzidas | **2000 / 2000 / 1000** |
| `size` | 0.012–0.022 | **0.0015 / 0.0025 / 0.003** |
| Fallback | `.galaxy-starfield` em mosaico | **Nenhum** |
| CSS `index.css` | Blocos `.galaxy-*` | **Zero** regras galaxy |
| Import | lazy + guards / visibility | Import **estático** (mantido no `App.jsx` actual) |

#### Causa da regressão

A combinação `prefers-reduced-motion: reduce` + ramo CSS substituía o efeito 3D por um gradiente/grelha estática; no ambiente do utilizador (`reduced: true`) o diagnóstico mostrava `canvasCount: 0`.

#### Ficheiros tocados neste restauro

| Ficheiro | Alteração |
|----------|-----------|
| [`client/src/components/GalaxyBackground.jsx`](client/src/components/GalaxyBackground.jsx) | Conteúdo de `origin/main`; único extra: `aria-hidden="true"` no wrapper fixo |
| [`client/src/index.css`](client/src/index.css) | Removidos `.galaxy-backdrop`, `.galaxy-starfield*`, `@keyframes galaxyStarDrift`, etc.; **mantido** `.app-shell-content { z-index: 1 }` |
| [`client/src/App.jsx`](client/src/App.jsx) | **Sem alteração** neste passo: `SiteHelmet`, `Experience`, `app-shell` / import estático de `GalaxyBackground` preservados |

Stacking: mantido `style={{ zIndex: -1 }}` no galaxy; testado com `app-shell-content` — canvas visível (1170×507 em preview).

#### Script de validação (consola)

```javascript
(() => ({
  reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
  canvasCount: document.querySelectorAll("canvas").length,
  hasGalaxyStarfieldClass: !!document.querySelector(".galaxy-starfield"),
}))();
```

#### Resultados (13 Nov 2026)

| Ambiente | `reduced` | `canvasCount` | `hasGalaxyStarfieldClass` | Smoke |
|----------|-----------|---------------|---------------------------|-------|
| `http://localhost:5173/` | `true` | **1** | `false` | — |
| `http://localhost:5173/` | `false` (emulado) | **1** | `false` | — |
| `http://127.0.0.1:4173/` | `false` | **1** | `false` | — |
| `http://127.0.0.1:4173/` | `true` (emulado) | **1** | `false` | Modal projeto + PT/EN |

**Build:** `npm run build` OK (~35s). Chunks `three` / `react-three` via `manualChunks` em [`vite.config.js`](client/vite.config.js).

**Animação original recuperada:** **sim** — WebGL activo com e sem `prefers-reduced-motion`; sem classes CSS de starfield; comportamento alinhado a `9e796f1` / Vercel.

**Nota acessibilidade (fora de âmbito deste restauro):** o original ignora `reduce` para o canvas; uma desaceleração só de rotação **sem** desmontar WebGL pode ser avaliada num pedido futuro.

### 10.6 Estado actual e pendências (pós-§10.8)

As secções **10.7** e **10.8** mantêm o histórico das tentativas de correcção do galaxy; o **estado válido** do site é o descrito abaixo.

#### Estado actual (validação aprovada)

- **GalaxyBackground** restaurado ao comportamento de `9e796f1` / Vercel: WebGL **sempre** montado, com `prefers-reduced-motion: reduce` e `no-preference`.
- Canvas WebGL confirmado em `http://localhost:5173/` e `http://127.0.0.1:4173/` (`canvasCount === 1` em ambos os modos).
- Fallback artificial `.galaxy-starfield` e regras `.galaxy-*` da auditoria **removidos** de `index.css`.
- **`npm run build`** (client) aprovado após restauro.
- Fotografia de perfil **versão B** preservada (~80 KB no build).
- Preservados: internacionalização EN/pt-PT, SEO (`SiteHelmet`), secção Experience, SchedulerPro Spotlight, modais, navegação, formulário de contacto, restante auditoria (sem alteração de galaxy/foto nesta fase).

#### Pendências

- Confirmação opcional foto **A** vs **B** (comparação em `client/.perfil-compare/`).
- **Commit e push** das alterações locais (só com autorização).
- **Primeira execução** do workflow GitHub Actions após o push (ver §11).
- Deploy Vercel para publicar o estado actual (fora do âmbito de correções pontuais).
- URLs finais do SchedulerPro no spotlight, se ainda em revisão.

---

## 11. Integração contínua

### CI — GitHub Actions

**Data:** 13 Nov 2026  
**Ficheiro:** [`.github/workflows/ci.yml`](.github/workflows/ci.yml)

#### Eventos

| Gatilho | Comportamento |
|---------|----------------|
| `push` → `main` | Executa o workflow |
| `pull_request` → `main` | Executa o workflow |
| `workflow_dispatch` | Execução manual no GitHub |

**Permissões:** `contents: read` (mínimas).

#### Runtime

- **Runner:** `ubuntu-latest`
- **Node.js:** `22` (compatível com Vite 7.3.1: `^20.19.0 \|\| >=22.12.0`)
- **Cache:** `actions/setup-node@v4` com `cache: npm` por lockfile

#### Jobs e comandos

| Job | Diretório | Passos |
|-----|-----------|--------|
| `frontend` | `client/` | `npm ci` → `npm run build` |
| `backend-deps` | `server/` | `npm ci` apenas |

#### Incluído vs excluído

| Incluído | Excluído (propositadamente) |
|----------|----------------------------|
| Build de produção Vite | `npm test` no server (placeholder com `exit 1`) |
| Instalação reprodutível (`npm ci`) em ambos os pacotes | Lint / ESLint (não configurado no `client`) |
| | Arranque do Express / smoke da API (requer `MAILJET_*`) |
| | `npm run optimize-images` (alteração de assets) |
| | Deploy Vercel, secrets, MongoDB, Cloudinary, Mailjet |

#### Limitações do CI

- Não há testes automatizados no repositório; o pipeline **não** detecta regressões funcionais ou visuais.
- O job `backend-deps` valida apenas que as dependências do servidor instalam a partir do lockfile.
- O formulário de contacto não é exercitado no CI.

#### Validação local (espelho do CI)

**Data:** 13 Nov 2026

| Comando | Resultado |
|---------|-----------|
| `cd server && npm ci` | **OK** (111 pacotes) |
| `cd client && npm ci` | **Falhou** nesta máquina (`EPERM` ao desbloquear `esbuild.exe` — ficheiro em uso, típico com dev server / antivirus no Windows) |
| `cd client && npm install && npm run build` | **OK** (~25s, `vite build` sucesso) |

**Nota:** Em CI (Linux), `npm ci` no `client` não sofre o bloqueio Windows observado localmente.

**actionlint:** não executado (`npx actionlint` indisponível no ambiente); o workflow segue o esquema oficial de `actions/checkout@v4` e `actions/setup-node@v4`.

#### Pendência GitHub

O workflow **ainda não foi executado no GitHub** — depende de **commit + push** que inclua `.github/workflows/ci.yml`. Após o push, confirmar a primeira run em *Actions* do repositório.
