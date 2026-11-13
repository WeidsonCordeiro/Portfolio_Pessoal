# Auditoria completa — Portfólio Weidson Cordeiro

**Site:** https://portifolio-green-seven-45.vercel.app/  
**Data da auditoria:** Nov 2026  
**Estado:** Melhorias P0–P2 implementadas no repositório local (ver histórico de commits).

## Metodologia e limitações

- Análise visual do site publicado, medições `PerformanceNavigationTiming` e recursos de rede.
- Lighthouse não executado na auditoria inicial — sem pontuações oficiais Lighthouse neste documento.
- Responsividade: overflow horizontal testado em 360, 390, 768, 1024, 1440 px — sem overflow horizontal.
- Código: `client/src`, `client/index.html`, `server/app.js`, `vercel.json`.

---

## A. Diagnóstico geral (pré-melhorias)

Portfólio single-page com tema espaço, React 19, Framer Motion, fundo WebGL e 6 projetos com demo/GitHub. Impressão profissional intermédia: bom volume de projetos, mas SEO fraco, mistura PT/EN, modal desalinhado com o tema, imagens pesadas, dependências mortas e pouca narrativa de impacto.

**Stack:** React 19 + Vite 7, Bootstrap 5, Framer Motion, React Three Fiber, Express + Mailjet (Vercel).

---

## B. Pontos positivos (preservados)

- Dados de projetos em `client/src/data/projects.js`
- API de contacto com Mailjet e validação em `server/app.js`
- Formulário com labels flutuantes
- Modal de projeto estruturado (CSS Modules)
- Navegação por âncoras
- Deploy full-stack via `vercel.json`

---

## C. Problemas encontrados

Ver plano de auditoria detalhado: hero H1, idioma, modal claro, cards Bootstrap genéricos, `min-vh-100` excessivo, deps mortas (MUI, axios, router, scroll), Bootstrap duplicado CDN+npm, galaxy com ~5000 partículas, imagens multi-MB sem lazy load, SEO mínimo, robots/sitemap com fallback SPA, a11y (dialog, ícones, reduced motion), links GitHub com `.git`, README desalinhado do código do portfólio.

### Performance medida (pré-otimização)

| Recurso | Transfer aprox. |
|---------|-----------------|
| main-*.js | ~356 KB |
| Site_AgencyTravel.png | ~3,2 MB |
| Perfil.jpg | ~1,15 MB (build) |
| loadEventEnd | ~1,4 s (uma medição) |

---

## D. Melhorias recomendadas

Otimização de imagens, SEO, a11y, tema unificado, performance WebGL, limpeza de dependências, hero com CTA, secção experiência, skills agrupadas, projetos flagship, JSON-LD.

---

## E. Classificação (pré-melhorias)

| Critério | Nota |
|----------|------|
| Design | 6.5 |
| UX | 6.0 |
| Responsividade | 7.5 |
| Código | 6.5 |
| Performance | 5.0 |
| SEO | 3.0 |
| Acessibilidade | 5.5 |
| Apresentação profissional | 6.5 |
| Recrutamento Mid-Level | 6.5 |

---

## F. Plano de implementação

### P0 — Críticas

1. Imagens: lazy load, compressão/resize, decoding async  
2. SEO: lang pt-BR, meta, OG, robots.txt, sitemap.xml  
3. Modal: role dialog, focus trap, Escape, aria-labels  
4. Ícones sociais: aria-label  
5. Contact: erros array, loading no submit, aria-live  
6. ProjectCard: sem botão aninhado em div clicável  

### P1 — Importantes

7. Remover deps mortas  
8. Bootstrap apenas via npm  
9. Galaxy: menos partículas, reduced motion, lazy chunk  
10. Idioma PT unificado  
11. Hero semântico + CTAs  
12. Modal/cards tema escuro  
13. Secção Experiência  
14. Vite manualChunks (three)  
15. README alinhado  

### P2 — Evolutivas

16. Reduzir animações redundantes  
17. Skills agrupadas (data file)  
18. JSON-LD Person  
19. Filtros / destaque flagship  
20. TypeScript gradual — **fora de escopo** (alta complexidade)  
21. Lighthouse CI — **opcional**  

---

## G. Resultado esperado pós-implementação

Carregamento mais leve em mobile, SEO e partilhas sociais corretas, UI dark consistente, modais acessíveis, narrativa profissional com CTAs e projetos em destaque, stack e README honestos em relação ao código deste repositório.
