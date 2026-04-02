# Discover Portugal — site

A aplicação está na pasta **`web/`** (Next.js).

```bash
cd web
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

Para regenerar os HTML dos tours a partir de `web/tour-sources/`: `npm run patch-tours` (dentro de `web/`).

**Ambiente:** em produção usa as variáveis na **Vercel**; localmente podes copiar `web/.env.example` para `web/.env.local` (ver `web/README.md`).
