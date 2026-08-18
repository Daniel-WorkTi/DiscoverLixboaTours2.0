# Arquitetura i18n — DiscoverLixboaTours

## Como funciona o locale

- **URL = fonte de verdade** da página atual.
  - `/tours/lisboa` → português (`pt` / `pt-PT`)
  - `/en/tours/lisboa` → inglês (`en`)
- O `middleware` detecta o prefixo `/en`, define o header `x-dl-locale` e o cookie `dl_lang` (preferência).
- Páginas App Router leem o locale com `getRequestLocale()` **no servidor** e renderizam HTML já no idioma certo (sem flash PT→EN).
- `LocaleProvider` em `app/(site)/layout.tsx` disponibiliza `useLocale()` / `useMessages()` aos client components.

Cookie / `localStorage` (`language`) servem só para **lembrar preferência** no language switcher — **não** para corrigir HTML depois do load.

## Traduções globais (UI)

Ficheiro: `web/messages/index.ts`

- `getMessages(locale)` → nav, footer, home, executive, booking, obrigado, destinos, secções de tour.
- Client: `useMessages()` via `LocaleProvider`.
- Formatadores: `web/lib/i18n/format.ts`.

## Conteúdo dos tours

Pasta: `web/content/tours/` — **todos os 10 tours** estão migrados.

| Slug | Ficheiro |
|------|----------|
| lisboa | `lisboa.ts` |
| sintra-cascais | `sintra-cascais.ts` |
| fatima-tomar | `fatima-tomar.ts` |
| monsanto | `monsanto.ts` |
| porto | `porto.ts` |
| algarve | `algarve.ts` |
| arraabida | `arraabida.ts` |
| aveiro | `aveiro.ts` |
| alentejo | `alentejo.ts` |
| 3-destinos | `3-destinos.ts` |

Registry: `web/content/tours/index.ts` → `migratedTours`.

### Onde alterar preços

No ficheiro do tour, `groupTotalsCents` (cêntimos EUR).

O checkout usa `getPricingRuleFromTable` → `pricingRuleFromMigratedSlug` (fonte única).

### Capacidade / duração

`maxGuests`, `minGuests`, `durationHours` no tour — strings de UI são geradas.

## Rotas

- `web/app/(site)/tours/[slug]/page.tsx` — SSR por locale
- Home, executive, reservar, obrigado — React + `messages` (sem `data-translate`)
- Rewrites HTML de tours **removidos** do `next.config.ts`
- Redirects `tour-*.html` → `/tours/*` mantidos
- HTML em `public/tour-*.html` são **arquivo morto** (não servidos nas URLs ativas)

## Criar um novo tour

1. Copiar um ficheiro existente em `content/tours/`.
2. Registar em `index.ts`.
3. `npm test -- content/tours` + `npm run build`.

## Language switcher

`LanguageSwitcher` troca entre path PT e `/en` + mesmo path; grava cookie `dl_lang` e `localStorage.language`.

## Legado removido (fases D/E)

- ~~`translate.js`~~ — removido
- ~~`TranslateBridge`~~ — removido
- ~~`data-translate` em componentes React~~ — zero

## Validação

```bash
cd web
npm test -- content/tours/tours.integrity.test.ts
npm run lint
npm run build
```
