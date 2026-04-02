# Discover Portugal — Next.js

- `npm run dev` — servidor de desenvolvimento (Turbopack)
- `npm run build` / `npm run start` — produção
- `npm run patch-tours` — regera `public/tour-*.html` a partir de `tour-sources/`

Rotas `/tours/...` usam **rewrite** para o HTML em `public/` (página completa, não iframe).

## Variáveis de ambiente

- **Produção (Vercel):** define tudo em **Project → Settings → Environment Variables**. Não é preciso `.env` no repositório.
- **Local (opcional):** copia `.env.example` para `.env.local` e preenche as chaves para `npm run dev`.

## Testes sem cobrar dinheiro real

- **Stripe em modo teste:** na Vercel usa `sk_test_...` e preços de teste (`price_...` do modo Test no dashboard Stripe). No checkout usa o cartão de teste **4242 4242 4242 4242**, qualquer data futura e CVC qualquer — **não há cobrança real**. O webhook tem de ser o endpoint em **modo Test** (outro `whsec_...` que o de Live).
- **“Send test webhook” no Stripe:** o evento de exemplo **não traz** `metadata` (ex.: `preferred_date`) como no checkout real, por isso o teu `/api/webhooks/stripe` pode **ignorar** o evento e **nada aparece** no painel — é normal.
- **Painel admin:** em **Reservas** há o botão **Reserva de teste** (com sessão de admin iniciada): cria um evento no Google Calendar **sem passar pelo Stripe**, só para veres a lista e o fluxo do painel.

## Pagamentos (Stripe)

1. Na Vercel (ou em `.env.local` local), cola a **Secret key** (`sk_...`, não `pk_...`) em `STRIPE_SECRET_KEY`.
2. Em `STRIPE_PRICE_MAP`, usa **Price IDs** (`price_...`). No dashboard isso está em cada produto → **Pricing** → ID do preço. **Não** uses Product ID (`prod_...`).
3. Cada preço deve ser **pagamento único** (one-time). Preços só em **subscrição** (ex.: por mês) não servem para o checkout atual — cria um preço “One-time” no mesmo produto.
4. `NEXT_PUBLIC_SITE_URL` em produção (URL sem `/` no fim).

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
