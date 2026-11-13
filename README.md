# Portfólio — Weidson Cordeiro

Site pessoal full stack (React + Vite + Express) com listagem de projetos, formulário de contacto e deploy na Vercel.

## Tecnologias deste repositório

- **Frontend:** React 19, Vite, Bootstrap 5, Framer Motion, React Three Fiber (fundo animado opcional)
- **Backend:** Node.js, Express, Mailjet (envio de e-mails do formulário)
- **Outros:** SPA com âncoras, modal de projetos, lazy loading de imagens

## Estrutura

- `client/` — aplicação React
- `server/` — API de contacto
- `AUDITORIA_PORTFOLIO.md` — relatório de auditoria e plano de melhorias

## Executar localmente

```bash
cd client && npm install && npm run dev
```

```bash
cd server && npm install && npm run server
```

Configure variáveis Mailjet em `server/.env` (ver `.env_example`).

## Build

```bash
cd client && npm run build
```

Opcional: `npm run optimize-images` para comprimir imagens em `src/assets/img`.

## Projetos apresentados

Os projetos listados no site incluem aplicações com React, Node.js, JWT, Firebase, MongoDB e Socket.io — ver `client/src/data/projects.js` e repositórios linkados em cada card.

## Licença

MIT (ajuste conforme necessário).
