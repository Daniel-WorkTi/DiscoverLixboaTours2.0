# Checklist comercial Mike — estado actual

Última revisão após alinhamento home ↔ `content/tours`.

## Feito agora

| Item | Estado |
|------|--------|
| Capacidade 8 em todos os tours | ✅ |
| Sintra tabela 250→540 | ✅ no content + booking |
| Lisboa 250→550 | ✅ content + home deriva do content |
| Arrábida tabela Mike 2–8 (280→680) | ✅ (mín. 2; home €85/pessoa) |
| Home sem preços hardcoded | ✅ `getCardFromPrice(tour)` |
| 3 Destinos conflito €280/€85 | ✅ resolvido como **€250/grupo** 1–8 (van completa Mike + capacidade 8 sem tier novo) |

## Ainda depende do Mike

| Item | Nota |
|------|------|
| Monsanto Included | 🟡 manter lista actual até ele enviar a nova |
| Fátima & Tomar tabela completa | 🟡 content tem 310/400/490/590 — cruzar com msg original |
| 3 Destinos preço do 8.º | 🟡 usámos o mesmo €250 da van; confirmar se ok |
| Porto (€700–€800 vs antigo €800/€900) | ⚠️ confirmar mensagem mais recente |
| Algarve preço do 8.º (€800 vs antigo até 7 = €700) | ⚠️ confirmar |

## Como validar booking (QA)

No `/reservar` (ou `/en/reservar`), escolher o tour e o nº de pessoas:

- Sintra 8 → €540
- Lisboa 8 → €550
- Monsanto 8 → €900
- Arrábida 8 → €680
- 3 Destinos qualquer → €250
