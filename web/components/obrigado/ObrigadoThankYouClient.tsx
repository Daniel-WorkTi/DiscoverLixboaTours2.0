"use client";

import Link from "next/link";
import {
  OBRIGADO_SECURITY_BADGES,
  formatCheckoutSessionRefForDisplay,
} from "@/lib/obrigado-display";
import { ObrigadoConfetti } from "./ObrigadoConfetti";

type Props = {
  sessionId?: string;
  waHref: string;
};

function BadgeIcon({ id }: { id: string }) {
  if (id === "stripe") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden fill="none">
        <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 10h20" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="6" cy="15" r="1.5" fill="currentColor" />
      </svg>
    );
  }
  if (id === "https") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden fill="none">
        <path
          d="M12 2a5 5 0 00-5 5v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V7a5 5 0 00-5-5z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="15" r="1.5" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden fill="none">
      <path
        d="M12 2l8 4v6c0 5-3.4 9.7-8 11-4.6-1.3-8-6-8-11V6l8-4z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M9 12l2 2 4-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ObrigadoThankYouClient({ sessionId, waHref }: Props) {
  const refDisplay = sessionId
    ? formatCheckoutSessionRefForDisplay(sessionId)
    : "";

  return (
    <>
      <ObrigadoConfetti />

      <div className="obrigado-ticket-wrap">
        <article className="obrigado-ticket" aria-labelledby="obrigado-ticket-title">
          <header className="obrigado-ticket__header">
            <div className="obrigado-ticket__stub">
              <span className="obrigado-ticket__stub-mark" aria-hidden>
                ✓
              </span>
              <span className="obrigado-ticket__stub-text">DLT</span>
            </div>
            <div className="obrigado-ticket__head-main">
              <p className="obrigado-ticket__eyebrow">Bilhete digital</p>
              <h1 id="obrigado-ticket-title" className="obrigado-ticket__title">
                Reserva paga com sucesso
              </h1>
            </div>
          </header>

          <div className="obrigado-ticket__tear" aria-hidden />

          <div className="obrigado-ticket__body">
            <p className="obrigado-ticket__lead">
              Obrigado por escolheres a Discover Lixboa Tours. O pagamento foi processado de forma
              segura. A data que indicaste no formulário é a tua preferência — confirmamos os
              detalhes finais contigo.
            </p>
            <p className="obrigado-ticket__note">
              O recibo por email depende das definições da conta Stripe (em testes ou valores muito
              baixos pode não ser enviado).
            </p>

            {refDisplay ? (
              <div className="obrigado-ticket__ref-block">
                <span className="obrigado-ticket__ref-label">Referência do pagamento</span>
                <code className="obrigado-ticket__ref-code" title={sessionId}>
                  {refDisplay}
                </code>
              </div>
            ) : null}

            <div className="obrigado-card__actions obrigado-ticket__actions">
              <a
                className="obrigado-btn obrigado-btn--whatsapp"
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="obrigado-btn__wa-icon" aria-hidden>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.123 1.035 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </span>
                Falar no WhatsApp
              </a>
              <Link className="obrigado-btn obrigado-btn--home" href="/">
                Voltar ao início
              </Link>
            </div>
          </div>
        </article>

        <section className="obrigado-badges" aria-label="Segurança do pagamento">
          <h2 className="obrigado-badges__title">Pagamento protegido</h2>
          <ul className="obrigado-badges__list">
            {OBRIGADO_SECURITY_BADGES.map((b) => (
              <li key={b.id} className="obrigado-badge">
                <span className="obrigado-badge__icon">
                  <BadgeIcon id={b.id} />
                </span>
                <span className="obrigado-badge__text">
                  <span className="obrigado-badge__label">{b.label}</span>
                  <span className="obrigado-badge__sub">{b.sub}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
