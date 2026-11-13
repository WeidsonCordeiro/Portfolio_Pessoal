# Evolução do portfólio — relatório de implementação

**Data:** 12 Nov 2026  
**Repositório:** `Portfolio_Pessoal`  
**Site:** https://portifolio-green-seven-45.vercel.app/

## Estado actual do projeto

**Actualizado:** 13 Nov 2026 (revisão final README — §17)  
**Fonte:** inspecção Git local + pedidos HTTP (não substitui teste funcional completo nem confirma Mailjet).

### Repositório

| Item | Estado |
|------|--------|
| Branch local | `main` (alinhada com `origin/main`) |
| Por commitar (nesta sessão) | [`README.md`](README.md), [`EVOLUCAO_PORTFOLIO.md`](EVOLUCAO_PORTFOLIO.md) |
| [`vercel.json`](vercel.json) | Igual a `HEAD` — rotas com destinos `/client/...` e `/server/app.js` |
| Routing Vercel no Git | **Integrado** — `5f3395b`, merge PR #2 `56b877c` |

### GalaxyBackground

- **Estado válido no código:** restauro §10.8, síntese §10.9 — WebGL **sempre** montado (sem `.galaxy-starfield`).
- **Histórico:** tentativas nas §§10.7–10.8 (não apagar).

### Vercel e produção

| Camada | Estado |
|--------|--------|
| Configuração versionada (`main` / `HEAD`) | Rotas [`vercel.json`](vercel.json) com prefixo interno `client/` (§12.3) — **concluído no repositório** |
| Smoke HTTP (13 Nov 2026) | `GET /` → **200**; `GET /robots.txt` → **200**; `GET /api` → **200** |
| Limitação do smoke | Respostas **200** nos cabeçalhos **não** garantem render completo da SPA, assets correctos, nem envio Mailjet |
| Não verificado nesta sessão | Corpo HTML/JS da SPA, assets concretos do deployment activo, `GET /sitemap.xml`, `GET /icon.png`, `POST /api/sendEmailContacto` |

### Integração contínua

- Workflow [`.github/workflows/ci.yml`](.github/workflows/ci.yml) **versionado em `main`** (introduzido no commit `e7c6fd9`).
- Gatilhos: `push`/`pull_request` em `main` (ver §11).
- **Execuções no GitHub Actions:** não consultadas neste ambiente (`gh` indisponível) — confirmar manualmente no painel *Actions* se necessário.

### Pendências abertas (vigentes)

1. URLs GitHub e demo do **SchedulerPro** (placeholders no spotlight).
2. **Commit + push** de [`README.md`](README.md) e [`EVOLUCAO_PORTFOLIO.md`](EVOLUCAO_PORTFOLIO.md) (e restantes alterações locais), só com autorização.
3. Validação funcional em produção: assets referenciados no `index.html`, `sitemap.xml`, `icon.png`, `POST /api/sendEmailContacto` (Mailjet).
4. Confirmar runs do CI no GitHub (sucesso/falha) — sem evidência remota nesta revisão.
5. Lighthouse formal pós-deploy (opcional).
6. Comparação foto perfil A vs B (opcional, `client/.perfil-compare/`).

### Registo histórico

As secções **1–6** e **9** descrevem o trabalho de **12 Nov 2026**. A **§7** lista pendências da mesma data — algumas já parcialmente resolvidas (ex.: routing no repo, smoke HTTP parcial); o texto mantém-se como arquivo.

---

## Índice

1. [Estado inicial](#1-estado-inicial)
2. [Sincronização Git](#2-sincronização-git)
3. [Alterações implementadas](#3-alterações-implementadas)
4. [Ficheiros principais criados/alterados](#4-ficheiros-principais-criadosalterados)
5. [Dependências](#5-dependências)
6. [Testes executados](#6-testes-executados)
7. [Pendências](#7-pendências)
8. [Decisões técnicas](#8-decisões-técnicas)
9. [Validação final pós-implementação](#9-validação-final-pós-implementação)
10. [Correção urgente — perfil e fundo espacial](#10-correção-urgente--perfil-e-fundo-espacial)
11. [Integração contínua](#11-integração-contínua)
12. [Deploy Vercel — build automático do frontend](#12-deploy-vercel--build-automático-do-frontend)
13. [Documentação — README](#13-documentação--readme)
14. [Documentação — revisão final do README](#14-documentação--revisão-final-do-readme)
15. [Documentação — consolidação final](#15-documentação--consolidação-final)
16. [Documentação — consistência EVOLUCAO (§10–12)](#16-documentação--consistência-evolucao-1012)
17. [Documentação — revisão final README e validação](#17-documentação--revisão-final-readme-e-validação)

[Estado actual do projeto](#estado-actual-do-projeto) · [§10.7 Galaxy diagnóstico](#107-diagnóstico-galaxy--causa-raiz-e-correcção-definitiva) · [§10.8 Restauro Galaxy](#108-restauro-galaxy-original-referência-vercel--9e796f1) · [§10.9 Estado válido Galaxy](#109-estado-válido-e-pendências-pós-restauro) · [§12.1](#121-diagnóstico-404-em-produção-commit-c40b204) · [§12.2](#122-inspeção-do-output--vercelstatic-build-evidência) · [§12.3](#123-correção-do-routing-estático--branch-fixvercel-static-routing-404)

---

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

> **Nota (13 Nov 2026):** o comportamento **actual** do fundo está em **§10.8** (WebGL sempre activo). O bullet abaixo sobre `prefers-reduced-motion` reflecte a fase da auditoria de 12 Nov, antes do restauro.

- Galaxy WebGL mantida; partículas reduzidas; lazy chunk
- `prefers-reduced-motion` → gradiente espacial *(fase auditoria; ver §10.8)*
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

## 7. Pendências

*Registo de 12 Nov 2026. Para pendências **vigentes**, ver [Estado actual do projeto](#estado-actual-do-projeto).*

1. URLs GitHub e demo do **SchedulerPro** (substituir placeholders)
2. **Commit + push + deploy Vercel** — **pronto para comando único** quando autorizares (índice Git unificado, stash `wip-auditoria-pre-pull` eliminado, sem `*.stackdump` staged)
3. Deploy Vercel para publicar alterações
4. Lighthouse formal pós-deploy (opcional)
5. `bash.exe.stackdump` ignorado via `.gitignore`
6. Lighthouse desktop — repetir localmente se necessário

## 8. Decisões técnicas

*Registo de 12 Nov 2026; decisões mantidas salvo nota em secções posteriores.*

- i18n centralizado em JSON + `slug` nos projetos para evitar duplicar componentes
- SchedulerPro destacado no spotlight + card modal; omitido da grelha “Destaques” para evitar duplicação
- SEO dinâmico sem `react-helmet-async` por compatibilidade com React 19
- Fotografia de perfil: blob **`9e796f1` (versão B)** com compressão sharp (~80 KB no build), após comparação com versão A em `client/.perfil-compare/`

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

### 10.9 Estado válido e pendências (pós-restauro)

**Panorama geral:** ver [Estado actual do projeto](#estado-actual-do-projeto). As secções **10.7** e **10.8** são **cronologia**; o **estado válido** no código é o descrito abaixo (equivalente ao que estava em §10.6 antes da reordenação documental).

#### Estado válido (pós-§10.8)

- **GalaxyBackground** restaurado ao comportamento de `9e796f1` / Vercel: WebGL **sempre** montado, com `prefers-reduced-motion: reduce` e `no-preference`.
- Canvas WebGL confirmado em `http://localhost:5173/` e `http://127.0.0.1:4173/` (`canvasCount === 1` em ambos os modos).
- Fallback artificial `.galaxy-starfield` e regras `.galaxy-*` da auditoria **removidos** de `index.css`.
- **`npm run build`** (client) aprovado após restauro.
- Fotografia de perfil **versão B** preservada (~80 KB no build).
- Preservados: internacionalização EN/pt-PT, SEO (`SiteHelmet`), secção Experience, SchedulerPro Spotlight, modais, navegação, formulário de contacto, restante auditoria (sem alteração de galaxy/foto nesta fase).

#### Pendências (Galaxy / entrega — registo 12–13 Nov)

- Confirmação opcional foto **A** vs **B** (comparação em `client/.perfil-compare/`).
- **Commit e push** de alterações locais pendentes de autorização (hoje: sobretudo documentação).
- URLs finais do SchedulerPro no spotlight.

*Nota:* routing Vercel e workflow CI já estão em `origin/main` — ver Estado actual e §11 (não repetir «deploy Vercel pendente» ou «primeiro push do workflow» como vigentes).

---

## 11. Integração contínua

### CI — GitHub Actions

**Data:** 13 Nov 2026 (texto revisado 13 Nov — consistência)  
**Ficheiro:** [`.github/workflows/ci.yml`](.github/workflows/ci.yml)

**No repositório (`main` / `HEAD`):** o workflow está versionado (commit `e7c6fd9` no historial do ficheiro). **Não** depende de um push futuro para existir no Git.

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

#### Estado no GitHub Actions

| Camada | Estado |
|--------|--------|
| Ficheiro no `main` | **Presente** — verificado via `git show HEAD:.github/workflows/ci.yml` |
| Execuções remotas | **Não verificadas** nesta revisão (`gh run list` indisponível) — consultar o painel *Actions* do repositório para confirmar runs após pushes a `main` |
| CI «passou» | **Não afirmado** — sem evidência de run bem-sucedida neste ambiente |

---

## 12. Deploy Vercel — build automático do frontend

**Data:** 13 Nov 2026  
**Site:** https://portifolio-green-seven-45.vercel.app/

### Problema identificado

- O [`vercel.json`](vercel.json) anterior usava `@vercel/static` com `src: "client/dist/**/*"`.
- A pasta `client/dist` **não está no Git** (correto: [`client/.gitignore`](client/.gitignore) ignora `dist`).
- No deploy via **GitHub**, o Vercel não executava `vite build`; o deployment podia ficar *Ready* mas a home devolvia **404 NOT_FOUND**.
- Deploy manual com `vercel --prod` funcionava porque o build era feito **localmente** antes do push de artefactos.

### Causa técnica

`@vercel/static` apenas **publica** ficheiros já existentes; não corre o script `build` do Vite. Sem `dist` no repositório, as rotas apontavam para ficheiros inexistentes no ambiente remoto.

### Evolução da solução (builders + rotas)

| Fase | Build frontend | Rotas estáticas (`dest`) | Notas |
|------|----------------|--------------------------|--------|
| **Histórico** | `@vercel/static` → `client/dist/**/*` | `/client/dist/...` | Sem `vite build` no deploy GitHub |
| **Intermédia (`c40b204`)** | `@vercel/static-build` + `distDir: dist` | `/index.html`, `/$1`, `/robots.txt` na **raiz** | Regressão 404 — §12.1 |
| **Actual (`HEAD` / `main`)** | `@vercel/static-build` em [`client/package.json`](client/package.json) | `/client/index.html`, `/client/$1`, `/client/robots.txt`, etc. | `5f3395b`, merge `56b877c` — §12.3 |

| Componente | Estado actual |
|------------|----------------|
| Build backend | `@vercel/node` → `server/app.js` — inalterado |
| Script Vercel | `vercel-build`: `vite build` em `client/package.json` |
| Node | `engines.node`: `>=20.19.0` (requisito Vite 7) |

### Ficheiros modificados

- [`vercel.json`](vercel.json)
- [`client/package.json`](client/package.json) — `vercel-build`, `engines` (sem alteração de dependências)

### Configuração histórica do `vercel.json` (fase pós-`c40b204`, rotas na raiz)

> **Arquivo:** configuração intermédia que causou 404 — **não** é a actual. Substituída por §12.3 e por [`vercel.json`](vercel.json) em `HEAD`.

```json
{
  "version": 2,
  "builds": [
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    },
    {
      "src": "server/app.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    { "src": "^/api/(.*)", "dest": "/server/app.js" },
    { "src": "^/robots\\.txt$", "dest": "/robots.txt" },
    { "src": "^/sitemap\\.xml$", "dest": "/sitemap.xml" },
    { "src": "^/(assets/.*)", "dest": "/$1" },
    { "src": ".*", "dest": "/index.html" }
  ]
}
```

A rota `/api/*` ficava antes do fallback SPA; os `dest` na raiz **não** coincidiam com as chaves internas `client/` do `static-build` (§12.2).

### Configuração actual do `vercel.json` (versionada em `main`, `HEAD`)

| Rota pública | `dest` interno |
|--------------|----------------|
| `^/api/(.*)` | `/server/app.js` |
| `^/robots\.txt$` | `/client/robots.txt` |
| `^/sitemap\.xml$` | `/client/sitemap.xml` |
| `^/(assets/.*)` | `/client/$1` |
| `^/icon\.png$` | `/client/icon.png` |
| `.*` | `/client/index.html` |

Espelha [`vercel.json`](vercel.json) em `HEAD` (`56b877c`). A API mantém-se **antes** do fallback na ordem de avaliação.

### Estratégia de build (frontend)

1. Vercel instala dependências em `client/` (a partir de `package-lock.json`).
2. Executa `npm run vercel-build` (ou `build`) → gera `client/dist/`.
3. O builder regista artefactos com prefixo interno **`client/`** (não na raiz `/index.html`) — ver §12.2.

### Estratégia de publicação (backend)

- `server/app.js` exporta a app Express (`module.exports = app`).
- Em produção, `app.listen` **não** corre (`NODE_ENV === "production"`); o Vercel invoca a função serverless.
- Variáveis `MAILJET_*` devem permanecer no **painel Vercel** (não versionadas). **Não** foram alteradas nesta tarefa.

### API e formulário de contacto

- Em produção, [`Contact.jsx`](client/src/components/Contact.jsx) chama `fetch('/api/sendEmailContacto')` (mesma origem).
- O proxy `localhost:8800` do Vite aplica-se **só em dev**.
- Rota Express: `POST /api/sendEmailContacto` em [`server/app.js`](server/app.js).

### Testes executados (local)

| Teste | Resultado |
|-------|-----------|
| `cd client && npm run build` | **OK** (~2m 21s) |
| `client/dist/index.html` | **Presente** |
| `client/dist/assets/*` | **Presente** |
| `client/dist/robots.txt`, `sitemap.xml` | **Presentes** (copiados de `client/public/`) |
| `client/.gitignore` → `dist` | **Ignorado** |
| `cd server && npm ci` | **OK** |
| Testes automatizados | **Nenhum** (não aplicável) |
| `vercel build` (CLI 65) | **Não concluído** — `project_settings_required` (sem `.vercel`/`vercel pull`; executar `vercel pull --yes` ou `vercel build --yes` na máquina com projeto ligado) |

### Consolidação routing (13 Nov 2026)

| Âmbito | Estado |
|--------|--------|
| Repositório `main` | [`vercel.json`](vercel.json) versionado com destinos `/client/...` e `/server/app.js` (tabela em §12.3) |
| Contexto §12.3 | A branch `fix/vercel-static-routing-404` e notas «commit não executado» referem o **momento da correcção**; o conteúdo está integrado na `main` actual |
| Produção (smoke 13 Nov 2026) | `GET /`, `/robots.txt`, `/api` → **200** — ver [Estado actual](#estado-actual-do-projeto) |
| Ainda pendente | `POST /api/sendEmailContacto` com Mailjet; verificação de assets concretos do deployment activo |

### Pendências para validação em produção

#### Registo histórico (13 Nov, antes do merge PR #2)

- **Commit + push** de `vercel.json` e `client/package.json` na `main` — **concluído** no Git (`5f3395b`, merge `56b877c`).
- Aguardar deploy automático Vercel após merge — presumivelmente ocorrido (smoke HTTP 200 parcial); não confirmado pelo dashboard nesta revisão.

#### Pendências actuais (validação funcional)

- Confirmar **conteúdo** da SPA em `/` (não só HTTP 200).
- `GET /sitemap.xml`, `GET /icon.png`, `GET` de `/assets/*` referenciados no `index.html` activo.
- `POST /api/sendEmailContacto` com `MAILJET_*` no painel Vercel — **não testado** nesta revisão.
- Painel Vercel: **Root Directory** = raiz do repo (revisão manual se necessário).

### Comandos sugeridos para publicar

*Registo histórico — válidos antes do merge do routing; **hoje** o routing já está em `main`.*

```bash
cd client && npm run build   # validação opcional local
git add vercel.json client/package.json
git commit -m "fix(vercel): build frontend via static-build on deploy"
git push origin main
# ou, com CLI já ligada ao projeto:
vercel pull --yes --environment=production
vercel --prod
```

**Nota:** Smoke HTTP 200 não substitui verificação funcional completa (SPA, Mailjet, assets).

### 12.1 Diagnóstico 404 em produção (commit `c40b204`)

**Data:** 13 Nov 2026  
**URL:** https://portifolio-green-seven-45.vercel.app/  
**Estado Vercel:** Ready (build concluído com sucesso)  
**Sintoma:** `404 NOT_FOUND` na página principal e nos restantes paths testados.

#### Problema observado

Após o merge **`c40b204`** (`fix/vercel-frontend-build`), o build remoto passou a executar (`@vercel/static-build`), mas o site em produção devolve **404** com cabeçalho `X-Vercel-Error: NOT_FOUND` e corpo *"The page could not be found"*.

#### Causa raiz (alta evidência)

| Factor | Detalhe |
|--------|---------|
| Build frontend | **Corrigido** — `@vercel/static-build` em `client/package.json` + `vercel-build` |
| Rotas estáticas | **Regressão** — no `c40b204` os `dest` mudaram de `/client/dist/...` para `/index.html`, `/$1`, `/robots.txt` na raiz |
| Layout dos artefactos | Com `src: client/package.json` e `distDir: dist`, o output do Vite fica em **`client/dist/`** no bundle do deployment (não na raiz `/index.html` do sistema interno) |
| Efeito | Os `dest` actuais **não correspondem** a ficheiros existentes → router Vercel responde `NOT_FOUND` |

**Comparação de rotas:**

| Rota pública | Pré-`c40b204` (`dest`) | `c40b204` (`dest`) |
|--------------|------------------------|---------------------|
| SPA / fallback | `/client/dist/index.html` | `/index.html` |
| Assets | `/client/dist/$1` | `/$1` |
| robots / sitemap | `/client/dist/robots.txt` … | `/robots.txt` … |
| API | `/server/app.js` | `/server/app.js` (inalterado) |

#### Hipótese secundária (verificar no dashboard)

- **Root Directory** ≠ raiz do repositório, ou **Build/Output** no painel a conflituar com `builds` legados em `vercel.json`.
- Pode contribuir para **`/api` também em 404** (não só estáticos), não confirmável sem logs do deployment nem Project Settings.

#### Evidência HTTP (produção, 13 Nov 2026)

| URL | HTTP | Header |
|-----|------|--------|
| `/` | 404 | `X-Vercel-Error: NOT_FOUND` |
| `/robots.txt` | 404 | idem |
| `/sitemap.xml` | 404 | idem |
| `/api` | 404 | idem (não atinge Express `GET /api` → "API is working!") |
| `/assets/*.js` | 404 | idem |

**Não obtido:** inventário de ficheiros do deployment (`vercel inspect` — CLI sem token válido).

#### Ficheiros / configuração implicados

- [`vercel.json`](vercel.json) — secção `routes` (pós-`c40b204`)
- Painel Vercel — Root Directory, Node ≥ 20.19, preset/output (revisão manual)

**Não implicados neste incidente:** Galaxy, i18n, CVs, contacto, `client/dist` no Git (continua ignorado).

#### Correção mínima (§12.1 — hipótese obsoleta)

A hipótese **`/client/dist/`** como `dest` foi **refutada** na §12.2 (código do builder + simulação). Manter esta nota apenas como histórico; usar a correção de **§12.2**.

#### Testes obrigatórios após próximo deploy

1. `GET /` → 200 + HTML da SPA  
2. `GET /robots.txt`, `/sitemap.xml`  
3. `GET` um ficheiro em `/assets/*` referenciado no `index.html`  
4. `GET /api` → "API is working!"  
5. `POST /api/sendEmailContacto` (Mailjet no painel)

#### Estado do relatório

*Valores abaixo no **momento do incidente** `c40b204`; ver consolidação pós-merge no [Estado actual](#estado-actual-do-projeto).*

| Item | Estado (incidente `c40b204`) | Estado documentado posterior |
|------|-------------------------------|----------------------------|
| Diagnóstico | **Concluído** | Mantido como histórico |
| Correção de rotas no repo | **Pendente** na data §12.1 | **Concluída** — `5f3395b` / PR #2 `56b877c` |
| Produção funcional | **Não** — 404 confirmado | Smoke parcial 200 em `/`, `/robots.txt`, `/api` — não equivale a validação integral |

### 12.2 Inspeção do output — `@vercel/static-build` (evidência)

**Data:** 13 Nov 2026

#### Métodos usados

| Método | Resultado |
|--------|-----------|
| `vercel pull --yes --environment=production` | **OK** — `.vercel/project.json`, env de produção |
| `vercel build --yes --environment=production` | **Falhou** no Windows — `EPERM` ao criar symlinks na cache de builders (`.vercel/output/` **não gerado**) |
| Código `@vercel/static-build@27.0.0` | `distPath = workPath/client/dist`; `mountpoint = dirname(entrypoint)` → **`client`** |
| Código `@vercel/build-utils` (`glob`) | `finalPath = join(mountpoint, relativePath)` com `cwd = distPath` |
| Simulação local (`client/dist` pós-`vite build`) | Chaves internas = prefixo **`client/`**, não `client/dist/` nem raiz |

#### Project Settings (`.vercel/project.json` via pull)

| Campo | Valor |
|-------|--------|
| `rootDirectory` | `null` (raiz do repo) |
| `framework` | `null` |
| `buildCommand` / `outputDirectory` | `null` — CLI avisa: **`builds` em `vercel.json` prevalece** |
| `nodeVersion` | `24.x` |

#### Estrutura lógica do output (legado `builds`, comprovada)

O builder **não** expõe ficheiros em `/index.html` na raiz do bundle nem em `/client/dist/index.html`. Após `vite build`, publica o **conteúdo** de `client/dist/` com chaves:

```
client/index.html
client/robots.txt
client/sitemap.xml
client/icon.png
client/assets/main-DZOYxfnk.js
client/assets/main-BaGPX_cJ.css
… (20 ficheiros no build actual)
```

Referência: `collectStaticFiles` em `@vercel/static-build` — `glob("**", { cwd: distPath }, mountpoint)` com `mountpoint = "client"`.

**Não inspeccionado:** `.vercel/output/config.json` (build local bloqueado). Comportamento em Build Output API pode diferir; o deployment `c40b204` usa **`builds` + `routes` legados**.

#### URL pública → `dest` interno (deve coincidir)

| URL pública | Ficheiro interno (static-build) | `dest` actual `c40b204` | Estado |
|-------------|--------------------------------|-------------------------|--------|
| `/` | `client/index.html` | `/index.html` | **Incompatível** |
| `/robots.txt` | `client/robots.txt` | `/robots.txt` | **Incompatível** |
| `/sitemap.xml` | `client/sitemap.xml` | `/sitemap.xml` | **Incompatível** |
| `/assets/*` | `client/assets/*` | `/$1` → `/assets/*` | **Incompatível** |
| `/icon.png` | `client/icon.png` | fallback → `/index.html` | **Incompatível** |
| `/api/*` | função `server/app.js` | `/server/app.js` | **Deveria coincidir**; produto devolve 404 — rever logs do build Node no dashboard |

#### Correção mínima recomendada (fundamentada)

**Manter** `builds` (`static-build` + `node`). **Alterar só `routes`:**

```json
{
  "routes": [
    { "src": "^/api/(.*)", "dest": "/server/app.js" },
    { "src": "^/robots\\.txt$", "dest": "/client/robots.txt" },
    { "src": "^/sitemap\\.xml$", "dest": "/client/sitemap.xml" },
    { "src": "^/(assets/.*)", "dest": "/client/$1" },
    { "src": ".*", "dest": "/client/index.html" }
  ]
}
```

Opcional: rota explícita `^/icon\\.png$` → `/client/icon.png`.

**Nota:** O esquema **`/client/dist/...`** era correcto para `@vercel/static` com `src: client/dist/**/*`, mas **não** para `@vercel/static-build`.

#### Testes pós-correcção

1. Deploy preview → `GET /`, `/assets/*.js` do `index.html`, `/robots.txt`.  
2. `GET /api` → "API is working!" (se ainda 404, inspeccionar build `@vercel/node` nos logs).  
3. (Opcional) Repetir `vercel build` em Linux/WSL ou CI para validar `.vercel/output/`.

#### Estado

| Item | Estado |
|------|--------|
| Hipótese `/client/dist/` | **Refutada** para `static-build` |
| Chaves internas | **`client/`** — comprovado (código + simulação) |
| `.vercel/output` local | **Não disponível** (EPERM Windows) |
| Correção no repo | **Aplicada** na branch `fix/vercel-static-routing-404` — ver §12.3 |

### 12.3 Correção do routing estático — branch `fix/vercel-static-routing-404`

> **Consolidação (13 Nov 2026):** o routing descrito abaixo está **presente na `main`** ([`vercel.json`](vercel.json)). A referência à branch e a «commit não executado» abaixo é **registo histórico** do momento da correcção — não invalida o estado versionado actual.

**Data:** 13 Nov 2026  
**Branch:** `fix/vercel-static-routing-404`

#### Causa

`@vercel/static-build` regista ficheiros com prefixo interno **`client/`** (§12.2). O deployment `c40b204` encaminhava para `/index.html`, `/robots.txt`, `/$1` na raiz — **incompatível** → `404 NOT_FOUND`.

#### Alterações em [`vercel.json`](vercel.json)

**Inalterado:** bloco `builds` (`@vercel/static-build` + `@vercel/node`).

**Alterado:** apenas `routes` → destinos `/client/...`:

| `src` | `dest` |
|-------|--------|
| `^/api/(.*)` | `/server/app.js` |
| `^/robots\.txt$` | `/client/robots.txt` |
| `^/sitemap\.xml$` | `/client/sitemap.xml` |
| `^/(assets/.*)` | `/client/$1` |
| `^/icon\.png$` | `/client/icon.png` |
| `.*` | `/client/index.html` |

Sem prefixo `/client/dist/`.

#### Backend

Inspeção de [`server/app.js`](server/app.js) — **sem alterações:**

- `POST /api/sendEmailContacto`, `GET /api` (diagnóstico)
- `module.exports = app`; `app.listen` só fora de `production`
- Mailjet via variáveis de ambiente (painel Vercel)

#### Verificações locais

| Verificação | Resultado |
|-------------|-----------|
| `cd client && npm run build` | **OK** (~40s) |
| `dist/index.html` | OK |
| `dist/robots.txt`, `dist/sitemap.xml` | OK |
| `dist/icon.png` | OK |
| `dist/assets/*` | OK |
| `vercel build --yes --environment=production` | **Falhou** — `EPERM` symlinks (Windows); `.vercel/output/` não gerado |

#### Pendências

*Após merge em `main` (`56b877c`):*

- Testes funcionais ainda **não documentados** nesta revisão: `/assets/*` concretos, `sitemap.xml`, `icon.png`, `POST /api/sendEmailContacto`.
- Smoke parcial: `GET /`, `/robots.txt`, `/api` → 200 (ver Estado actual) — não comprova Mailjet nem corpo da SPA.
- Se `/api` ou assets falharem: rever logs `@vercel/node` e rotas no dashboard.

#### Git / deploy nesta tarefa

| Ação | Estado (momento branch `fix/vercel-static-routing-404`) | Estado em `main` actual |
|------|--------------------------------------------------------|-------------------------|
| Commit | **Não** executado (registo histórico da sessão) | Integrado via PR #2 |
| Push | **Não** executado (registo histórico) | `origin/main` alinhado |
| Deploy produção | Não validado na sessão da branch | Smoke HTTP parcial 200 — validação funcional pendente |

---

## 13. Documentação — README

**Data:** 13 Nov 2026  
**Ficheiro principal:** [`README.md`](README.md)  
**Alterações em código / config:** nenhuma

### Motivo

O README anterior estava desactualizado face ao estado do repositório: declarava licença **MIT** sem ficheiro `LICENSE`; omitia i18n (i18next), SEO (`SiteHelmet`, `robots.txt`/`sitemap.xml`), deploy Vercel (`vercel.json`), CI (`.github/workflows/ci.yml`), secção Experience, `SchedulerProSpotlight`, `GalaxyBackground`, requisito Node ≥ 20.19 e separação dev/prod da API (proxy Vite vs Vercel).

### Secções do novo README

1. Apresentação e link de produção (neutro, sem garantir estado live pós-deploy)
2. Tecnologias (Frontend / Backend / Ferramentas)
3. Funcionalidades (confirmadas no código)
4. Estrutura do projecto (árvore simplificada)
5. Executar localmente (client + server, `.env`, proxy `/api`)
6. Build de produção e `optimize-images`
7. Deploy Vercel (builders, rotas resumidas, env Mailjet)
8. GitHub Actions CI
9. Projetos (`projects.js` + i18n; links não inventados)
10. Documentação (`AUDITORIA_PORTFOLIO.md`, `EVOLUCAO_PORTFOLIO.md`)
11. Licença — **não definida** (ausência de `LICENSE`)

**Tom:** português de Portugal; profissional; sem emojis.

### Comandos documentados vs `package.json`

| Comando (README) | Script real | Pacote |
|------------------|-------------|--------|
| `npm run dev` | `vite` | `client/package.json` |
| `npm run build` | `vite build` | `client/package.json` |
| `npm run preview` | `vite preview` | `client/package.json` |
| `npm run optimize-images` | `node scripts/optimize-images.mjs` | `client/package.json` |
| `npm run server` | `nodemon app.js` | `server/package.json` |

**Não documentado:** `npm test` no server (falha propositada; fora do CI).

**Instalação:** `npm ci` recomendado (lockfiles); `npm install` aceitável em local.

### Tecnologias e factos confirmados na revisão

- i18n: `client/src/i18n/`, `locales/en.json`, `pt-PT.json`
- SEO: `client/public/robots.txt`, `sitemap.xml`; `SiteHelmet.jsx`
- Vercel: `vercel-build` / `build`; rotas com prefixo interno `client/` (§12.3)
- CI: Node 22; build `client`, `npm ci` em `server`
- `engines.node`: `>=20.19.0` em `client/package.json`
- Sem ficheiro `LICENSE` no repositório

### Inconsistências corrigidas na documentação (não no código)

| Antes (README antigo) | Depois |
|-----------------------|--------|
| Licença MIT | Licença não definida |
| Stack / features incompletas | Listagem alinhada ao código |
| Sem Vercel / CI / i18n / SEO | Documentados com links relativos |

### Estado Git / entrega

| Ação | Estado |
|------|--------|
| Commit | **Não** executado (por pedido) |
| Push | **Não** executado |
| Deploy | **Não** executado |

---

## 14. Documentação — revisão final do README

**Data:** 13 Nov 2026  
**Ficheiros alterados:** [`README.md`](README.md), [`EVOLUCAO_PORTFOLIO.md`](EVOLUCAO_PORTFOLIO.md)  
**Código / config:** sem alterações

### Âmbito

Revisão de precisão técnica e apresentação Markdown após a reescrita documentada na §13: links, comandos, variáveis de ambiente, rotas Vercel, capturas de ecrã.

### Validações realizadas

| Área | Método | Resultado |
|------|--------|-----------|
| Comandos frontend | Leitura de [`client/package.json`](client/package.json) | `dev`, `build`, `preview`, `optimize-images` — alinhados ao README |
| Comandos backend | Leitura de [`server/package.json`](server/package.json) | `server` → `nodemon app.js` |
| Variáveis Mailjet / porta | [`server/.env_example`](server/.env_example) + [`server/app.js`](server/app.js) | `MAILJET_API_KEY`, `MAILJET_SECRET_KEY`, `MAILJET_FROM_EMAIL`, `PORT`, `NODE_ENV`; fallback `PORT` **5000** no código se ausente |
| Proxy dev | [`client/vite.config.js`](client/vite.config.js) | `/api` → `localhost:8800` |
| Vercel | `git show main:vercel.json` + [`vercel.json`](vercel.json) working tree | **Idênticos** — rotas `client/` + `/server/app.js` |
| Screenshots | Glob `screenshot*` + inventário `client/src/assets/img/` | Sem capturas do portfólio; apenas thumbnails de projetos / perfil — **secção omitida** no README |
| Links relativos README | Verificação de paths no repositório | Corrigidos paths quebrados (`vite.config.js` na raiz); restantes confirmados |

### Correcções aplicadas ao README

1. Link de produção — URL completa como texto do link Markdown.
2. SEO — link para [`client/src/components/SiteHelmet.jsx`](client/src/components/SiteHelmet.jsx).
3. Code-splitting — link para [`client/vite.config.js`](client/vite.config.js).
4. Dois terminais — instrução explícita para `client/` + `server/` em simultâneo.
5. `PORT` — nota sobre fallback 5000 vs proxy 8800; recomendar `.env_example`.
6. Blocos `preview` e `optimize-images` — `cd client` para copy-paste seguro.
7. Deploy Vercel — tabela de rotas alinhada à ordem e destinos de `vercel.json` em `main`.

### Problemas encontrados (documentação, não código)

| Problema | Resolução |
|----------|-----------|
| Link `vite.config.js` sem prefixo `client/` | Corrigido no README |
| §12.3 descreve branch `fix/vercel-static-routing-404` e commit pendente | Em **`main`**, `vercel.json` já tem rotas `/client/...` (verificado); §12 permanece registo histórico |
| Sem imagens de ecrã do site no repo | Sem secção «Capturas de ecrã» |

### Estado Git / entrega

| Ação | Estado |
|------|--------|
| Commit | **Não** executado |
| Push | **Não** executado |
| Deploy | **Não** executado |

---

## 15. Documentação — consolidação final

**Data:** 13 Nov 2026  
**Ficheiros alterados:** [`README.md`](README.md), [`EVOLUCAO_PORTFOLIO.md`](EVOLUCAO_PORTFOLIO.md)  
**Código / config:** sem alterações

### Objetivo

Revisão final e consolidação da documentação: precisão do README, organização do relatório de evolução (índice, estado actual, ordem das secções, distinção histórico vs pendências), sem alterar a aplicação.

### Correções no README

- Referência ao [`EVOLUCAO_PORTFOLIO.md`](EVOLUCAO_PORTFOLIO.md) com **índice** e secções 11–12 (deploy/CI).
- Demais conteúdo mantido após validação (link produção, comandos, env, tabela Vercel, licença não definida, sem screenshots).

### Reorganização do EVOLUCAO

| Alteração | Detalhe |
|-----------|---------|
| Estado actual | Novo bloco após o título — Git, Galaxy, Vercel, CI, pendências vigentes |
| Índice | Links para secções 1–15 + sub-âncoras §12.x |
| Ordem | §7 e §8 **antes** de §9 (duplicados removidos) |
| §3 Galaxy | Nota de historial vs §10.8 |
| §10.9 / §12 | Ponteiros ao Estado actual; «Consolidação routing» em §12 |
| §12.3 | Nota: routing na `main`; texto da branch = arquivo |

### Validações executadas

| Área | Resultado |
|------|-----------|
| Git | `main`; `M` em README e EVOLUCAO; `vercel.json` sem diff vs `HEAD` |
| HTTP produção | `curl -sI`: `/`, `/robots.txt`, `/api` → **200** (13 Nov 2026) |
| README — comandos | `client` e `server` `package.json` — inalterados e alinhados |
| README — rotas Vercel | Tabela igual a [`vercel.json`](vercel.json) |
| Links relativos | Script de verificação na sessão (paths referenciados no README) |
| Screenshots portfólio | Inexistentes — README sem secção de capturas |

### Pendências (pós-consolidação)

- Commit/push da documentação (e restantes alterações locais) — só com autorização.
- Validação alargada produção: `POST` contacto, assets do deploy, `sitemap.xml`, `icon.png`.
- URLs SchedulerPro; Lighthouse opcional.

### Estado Git

| Ação | Estado |
|------|--------|
| Commit | **Não** executado |
| Push | **Não** executado |
| Merge | **Não** executado |

---

## 16. Documentação — consistência EVOLUCAO (§10–12)

**Data:** 13 Nov 2026  
**Ficheiros alterados:** [`EVOLUCAO_PORTFOLIO.md`](EVOLUCAO_PORTFOLIO.md) (principal); [`README.md`](README.md) — **sem alterações** nesta passagem (referências ao índice/§11–12 mantêm-se válidas).

**Código / config / deploy:** nenhuma alteração; **sem** commit, push, merge ou deploy nesta tarefa.

### Objectivo

Eliminar contradições entre o [Estado actual](#estado-actual-do-projeto), o histórico das §§10–12 e o Git/`HEAD` actual (`main` alinhada com `origin/main`), sem apagar cronologia técnica.

### Inconsistências identificadas

| Local | Problema |
|-------|----------|
| Estado actual + §11 | Afirmava que o CI «depende de push futuro» do workflow |
| §11 | Parágrafo «workflow ainda não executado no GitHub» por falta de push do ficheiro |
| §12 «Solução implementada» | Tabela sugeria rotas na raiz como solução **actual** |
| §12 JSON «configuração final» | Mostrava rotas `c40b204` (raiz) como se fossem finais |
| §12 pendências | Pedia commit/push de `vercel.json` já integrado em `main` |
| §12.1 estado | «Correção pendente» após merge `56b877c` |
| §12.3 Git | «Commit não executado» sem nota de integração em `main` |
| §10 | §10.6 após §10.8 (ordem de leitura confusa) |

### Correções realizadas

1. **Estado actual** — CI versionado (`e7c6fd9`); Vercel routing concluído no Git (`5f3395b`/`56b877c`); smoke 200 com ressalvas; pendências vigentes actualizadas.
2. **§11** — Tabela «Estado no GitHub Actions»: ficheiro presente; runs remotas não verificadas; não afirmar CI verde.
3. **§12** — Tabela de três fases (histórico / `c40b204` / `HEAD`); JSON antigo renomeado como **histórico**; tabela **configuração actual**; pendências separadas arquivo vs actuais.
4. **§12.1** — Estado do relatório com coluna posterior pós-merge.
5. **§12.3** — Pendências e tabela Git com coluna «estado em `main` actual».
6. **§10** — §10.6 renumerado e movido para **§10.9** após §10.8; índice com sub-âncoras §10.7–10.9.

### Verificações executadas

| Comando / acção | Resultado |
|-----------------|-----------|
| `git branch --show-current` | `main` |
| `git status -sb` | `M` README.md, EVOLUCAO_PORTFOLIO.md |
| `git diff HEAD -- vercel.json client/package.json .github/workflows/ci.yml` | **Sem diff** |
| `git show HEAD:vercel.json` | 6 rotas `/client/...` + `/server/app.js` |
| `git show HEAD:.github/workflows/ci.yml` | Workflow CI presente |
| `git log -1 --oneline HEAD` | `56b877c` Merge PR #2 (routing) |
| GitHub Actions (`gh run list`) | **Não executado / indisponível** |

### Pendências que permanecem

- Validação funcional produção: SPA, assets, `sitemap.xml`, `icon.png`, `POST` Mailjet.
- Consultar painel GitHub Actions para runs reais.
- Commit/push da documentação local (autorização do utilizador).
- URLs SchedulerPro; Lighthouse opcional.

### Estado Git (entrega desta tarefa)

| Ação | Estado |
|------|--------|
| Commit | **Não** executado |
| Push | **Não** executado |
| Merge | **Não** executado |
| Deploy | **Não** executado |

---

## 17. Documentação — revisão final README e validação

**Data:** 13 Nov 2026  
**Ficheiros inspecionados:** [`README.md`](README.md), [`EVOLUCAO_PORTFOLIO.md`](EVOLUCAO_PORTFOLIO.md), [`vercel.json`](vercel.json), [`client/package.json`](client/package.json), [`server/package.json`](server/package.json), [`.github/workflows/ci.yml`](.github/workflows/ci.yml), [`client/vite.config.js`](client/vite.config.js), [`server/.env_example`](server/.env_example), [`server/app.js`](server/app.js)

**Ficheiros alterados:** [`README.md`](README.md), [`EVOLUCAO_PORTFOLIO.md`](EVOLUCAO_PORTFOLIO.md) (índice, data Estado actual, §17). Código e config: **sem** alterações.

### Problemas encontrados

| Item | Detalhe |
|------|---------|
| Blocos `bash` | Comentários `npm ci # ou npm install` na mesma linha (formatação Markdown indevida em exemplos) |
| Backend | Bloco `npm run server` sem `cd server` após secção de instalação |
| Deploy Vercel | README afirmava integração Git↔Vercel «configurada» sem evidência no repositório |
| Link produção | Já no formato URL completa — sem correcção necessária |

### Correções realizadas

1. **README** — comentários shell em linhas separadas (`# ou, em alternativa:` + `# npm install`); `cd server` antes de `npm run server`.
2. **README** — texto Vercel: distinção config no repo (`vercel.json`) vs confirmação da integração Git no painel Vercel; sem afirmar último deploy validado.
3. **EVOLUCAO** — verificação de consistência §§10–16: **mantidas** (10.7–10.9, CI versionado, routing em `main`, smoke com limitações, pendências). Índice + §17.

### Validações executadas

| Verificação | Resultado |
|-------------|-----------|
| `git branch --show-current` | `main` |
| `git status -sb` | `M` README.md, EVOLUCAO_PORTFOLIO.md |
| `git diff HEAD -- vercel.json client/package.json server/package.json .github/workflows/ci.yml` | **Sem diff** |
| Links relativos no README | Todos os paths testados — **OK** |
| Comandos vs `package.json` | `dev`, `build`, `preview`, `optimize-images`, `server` — alinhados |
| Tabela rotas README vs `vercel.json` | Ordem e `dest` — alinhados |
| Mailjet / `PORT` | Nomes conforme `.env_example` e `app.js` |
| Testes HTTP / Mailjet / CI remoto | **Não** repetidos nesta tarefa (mantém registo do Estado actual) |

### Pendências que permanecem abertas

Conforme [Estado actual do projeto](#estado-actual-do-projeto): SchedulerPro URLs; commit/push da documentação local; validação funcional produção (assets, `sitemap.xml`, `icon.png`, `POST` Mailjet); runs do CI no GitHub; Lighthouse opcional; foto A vs B opcional.

### Estado Git (fim da tarefa)

| Ação | Estado |
|------|--------|
| Commit | **Não** executado |
| Push | **Não** executado |
| Merge | **Não** executado |
| Deploy | **Não** executado |
