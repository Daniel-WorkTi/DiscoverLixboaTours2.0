# Discover Portugal — Next.js

- `npm run dev` — servidor de desenvolvimento (Turbopack)
- `npm run build` / `npm run start` — produção
- `npm run patch-tours` — regera `public/tour-*.html` a partir de `tour-sources/`

Rotas `/tours/...` usam **rewrite** para o HTML em `public/` (página completa, não iframe).

## Pagamentos (Stripe)

1. Copia `.env.example` para `.env.local`.
2. Cola a **Secret key** (`sk_...`, não `pk_...`) em `STRIPE_SECRET_KEY`.
3. Em `STRIPE_PRICE_MAP`, usa **Price IDs** (`price_...`). No dashboard isso está em cada produto → **Pricing** → ID do preço. **Não** uses Product ID (`prod_...`).
4. Cada preço deve ser **pagamento único** (one-time). Preços só em **subscrição** (ex.: por mês) não servem para o checkout atual — cria um preço “One-time” no mesmo produto.
5. `NEXT_PUBLIC_SITE_URL` em produção (URL sem `/` no fim).

Referência dos teus produtos (substitui `prod_` pelo `price_` certo em cada um):

| Tour no site (`id`) | Produto na Stripe (nome aproximado) |
|----------------------|--------------------------------------|
| `algarve` | Tour Algarve |
| `alentejo` | Tour Alentejo |
| `arraabida` | Arrábida, Setúbal & Sesimbra |
| `porto` | Tour Porto (confirma preço único, não só mensal) |
| `lisboa` | Tour Lisboa |
| `3-destinos` | Tour 3 Destinos |
| `sintra-cascais` | Sintra & Cascais (produto correspondente na Stripe) |

Documentação [Next.js](https://nextjs.org/docs).
