# Checklist de auditoria i18n / reserva

Usar após deploy. Não altera código — só verificação em produção ou `localhost`.

## Idioma imediato (sem flash)

| URL | Esperado |
|-----|----------|
| `/` | PT |
| `/en` | EN |
| `/tours/lisboa` | PT |
| `/en/tours/lisboa` | EN |
| `/reservar` | PT |
| `/en/reservar` | EN |
| `/executive` | PT |
| `/en/executive` | EN |
| `/privacidade` · `/en/privacidade` | PT / EN |
| `/cookies` · `/termos` · `/sgpd` (+ `/en/...`) | PT / EN |

Em cada página: navbar, footer, headings e CTA no mesmo idioma; sem mistura.

## Language switcher

- Em `/tours/lisboa` → EN → `/en/tours/lisboa`
- Em `/en/tours/fatima-tomar` → PT → `/tours/fatima-tomar`
- Links internos mantêm o locale

## Preços / capacidade

- Lisboa 1–2: €250 total; 8: €550
- Monsanto mín. 2; 2: €600; 8: €900
- Selectores até **8** passageiros
- `/reservar` e página do tour mostram o mesmo total para o mesmo nº de pessoas

## Reserva

- Abrir checkout Stripe (test) com 1 tour PT e 1 EN
- Página obrigado no locale correcto

## Mobile

- Sticky “Reservar / Book Now” fora de `/reservar`
- Layout tour + home sem overflow óbvio

## SEO rápido

- View-source em `/en/tours/lisboa`: `<html lang="en">`, title EN
- Canonical / hreflang coerentes (não EN → PT)
