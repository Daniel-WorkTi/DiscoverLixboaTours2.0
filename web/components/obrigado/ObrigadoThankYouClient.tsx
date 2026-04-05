"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  OBRIGADO_SECURITY_BADGES,
  formatCheckoutSessionRefForDisplay,
} from "@/lib/obrigado-display";
import type { ObrigadoBookingDetails } from "@/lib/obrigado-booking-details";
import { ObrigadoConfetti } from "./ObrigadoConfetti";

type Props = {
  sessionId?: string;
  waHref: string;
  /** First name (Stripe session) for the “Thank you, …!” heading */
  customerFirstName?: string | null;
  bookingDetails?: ObrigadoBookingDetails | null;
};

type ReceiptErr =
  | { kind: "i18n"; key: "obrigado_receipt_err_link" | "obrigado_receipt_err_unavailable" | "obrigado_receipt_err_network" }
  | { kind: "server"; message: string };

/** PT defaults — mirror obrigado_receipt_err_* in translate.js */
const RECEIPT_ERR_PT: Record<string, string> = {
  obrigado_receipt_err_link: "Não foi possível obter o link do recibo.",
  obrigado_receipt_err_unavailable: "Recibo indisponível de momento.",
  obrigado_receipt_err_network: "Erro de rede. Tenta novamente.",
};

function formatPreferredDateLong(ymd: string, locale: string): string {
  const p = ymd.split("-").map(Number);
  if (p.length !== 3 || !p[0] || !p[1] || !p[2]) return ymd;
  const d = new Date(p[0], p[1] - 1, p[2]);
  return d.toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

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

export function ObrigadoThankYouClient({
  sessionId,
  waHref,
  customerFirstName,
  bookingDetails,
}: Props) {
  const [receiptErr, setReceiptErr] = useState<ReceiptErr | null>(null);
  const [receiptLoading, setReceiptLoading] = useState(false);
  const [uiLang, setUiLang] = useState<"pt" | "en">("pt");

  useEffect(() => {
    const read = () => {
      const l = localStorage.getItem("language") || "pt";
      setUiLang(l === "en" ? "en" : "pt");
    };
    read();
    const onLang = () => read();
    window.addEventListener("discoverlangchange", onLang);
    return () => window.removeEventListener("discoverlangchange", onLang);
  }, []);

  const dateLocale = uiLang === "en" ? "en-GB" : "pt-PT";

  const obrigadoAria = useMemo(() => {
    if (uiLang === "en") {
      return {
        details: "Booking details",
        badges: "Payment security",
        lottie: "Booking confirmation animation",
      };
    }
    return {
      details: "Detalhes da reserva",
      badges: "Segurança do pagamento",
      lottie: "Animação de confirmação da reserva",
    };
  }, [uiLang]);

  const refDisplay = sessionId
    ? formatCheckoutSessionRefForDisplay(sessionId)
    : "";

  const showReceiptCta = Boolean(sessionId);
  const showDetails = Boolean(
    bookingDetails &&
      (bookingDetails.customerName ||
        bookingDetails.email ||
        bookingDetails.phone ||
        bookingDetails.tourLabel ||
        bookingDetails.preferredDate ||
        bookingDetails.quantity ||
        bookingDetails.notes),
  );

  const openStripeReceipt = useCallback(async () => {
    if (!sessionId) return;
    setReceiptErr(null);
    setReceiptLoading(true);
    try {
      const u = new URL("/api/checkout/receipt", window.location.origin);
      u.searchParams.set("session_id", sessionId);
      const res = await fetch(u.toString(), {
        redirect: "manual",
        credentials: "same-origin",
      });
      if (res.status === 302 || res.status === 301) {
        const loc = res.headers.get("Location");
        if (loc) {
          window.open(loc, "_blank", "noopener,noreferrer");
        } else {
          setReceiptErr({ kind: "i18n", key: "obrigado_receipt_err_link" });
        }
      } else {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        if (typeof data.error === "string" && data.error.trim()) {
          setReceiptErr({ kind: "server", message: data.error.trim() });
        } else {
          setReceiptErr({ kind: "i18n", key: "obrigado_receipt_err_unavailable" });
        }
      }
    } catch {
      setReceiptErr({ kind: "i18n", key: "obrigado_receipt_err_network" });
    } finally {
      setReceiptLoading(false);
    }
  }, [sessionId]);

  return (
    <>
      <ObrigadoConfetti />

      <div className="obrigado-ticket-wrap">
        <article className="obrigado-ticket" aria-labelledby="obrigado-ticket-title">
          <header className="obrigado-ticket__header">
            <div className="obrigado-ticket__stub obrigado-ticket__stub--lottie">
              <iframe
                src="https://lottie.host/embed/283c56c5-cb53-4b3c-964e-ff0835b07791/eaPqweqVf0.lottie"
                title={obrigadoAria.lottie}
                className="obrigado-ticket__lottie-iframe"
                loading="lazy"
              />
            </div>
            <div className="obrigado-ticket__head-main">
              <p className="obrigado-ticket__eyebrow" data-translate="obrigado_eyebrow">
                Bilhete digital
              </p>
              <h1 id="obrigado-ticket-title" className="obrigado-ticket__title">
                {customerFirstName ? (
                  <>
                    <span data-translate="obrigado_greeting_prefix">Obrigado,</span>{" "}
                    <span className="obrigado-ticket__name-accent">
                      {customerFirstName}
                    </span>
                    <span data-translate="obrigado_greeting_suffix">!</span>
                  </>
                ) : (
                  <span data-translate="obrigado_title_paid">Reserva paga com sucesso</span>
                )}
              </h1>
              {customerFirstName ? (
                <p className="obrigado-ticket__subtitle" data-translate="obrigado_subtitle">
                  Pagamento confirmado · Discover Lixboa Tours
                </p>
              ) : null}
            </div>
          </header>

          <div className="obrigado-ticket__tear" aria-hidden />

          <div className="obrigado-ticket__body">
            <p className="obrigado-ticket__lead">
              {customerFirstName ? (
                <>
                  <strong>{customerFirstName}</strong>
                  <span data-translate="obrigado_lead_after_name">
                    , o teu lugar está garantido.{" "}
                  </span>
                </>
              ) : null}
              <span data-translate="obrigado_lead_body">
                Obrigado por escolheres a Discover Lixboa Tours. O pagamento foi processado em
                segurança. A data que indicaste no formulário é uma preferência — confirmamos
                contigo os detalhes finais.
              </span>
            </p>

            {showDetails ? (
              <section
                className="obrigado-ticket__details"
                aria-label={obrigadoAria.details}
              >
                <h2 className="obrigado-ticket__details-title" data-translate="obrigado_details_title">
                  Detalhes da reserva
                </h2>
                <dl className="obrigado-ticket__details-grid">
                  {bookingDetails?.customerName ? (
                    <>
                      <dt data-translate="obrigado_dt_name">Nome</dt>
                      <dd>{bookingDetails.customerName}</dd>
                    </>
                  ) : null}
                  {bookingDetails?.email ? (
                    <>
                      <dt data-translate="obrigado_dt_email">Email</dt>
                      <dd>{bookingDetails.email}</dd>
                    </>
                  ) : null}
                  {bookingDetails?.phone ? (
                    <>
                      <dt data-translate="obrigado_dt_phone">Telefone</dt>
                      <dd>{bookingDetails.phone}</dd>
                    </>
                  ) : null}
                  {bookingDetails?.tourLabel ? (
                    <>
                      <dt data-translate="obrigado_dt_tour">Tour</dt>
                      <dd>{bookingDetails.tourLabel}</dd>
                    </>
                  ) : null}
                  {bookingDetails?.preferredDate ? (
                    <>
                      <dt data-translate="obrigado_dt_date">Data preferida</dt>
                      <dd>
                        {formatPreferredDateLong(bookingDetails.preferredDate, dateLocale) ||
                          bookingDetails.preferredDate}
                      </dd>
                    </>
                  ) : null}
                  {bookingDetails?.quantity ? (
                    <>
                      <dt data-translate="obrigado_dt_people">Pessoas</dt>
                      <dd>{bookingDetails.quantity}</dd>
                    </>
                  ) : null}
                  {bookingDetails?.notes ? (
                    <>
                      <dt data-translate="obrigado_dt_notes">Notas</dt>
                      <dd className="obrigado-ticket__details-notes">{bookingDetails.notes}</dd>
                    </>
                  ) : null}
                </dl>
              </section>
            ) : null}

            {refDisplay ? (
              <div className="obrigado-ticket__ref-block">
                <span className="obrigado-ticket__ref-label" data-translate="obrigado_ref_label">
                  Referência de pagamento
                </span>
                <code className="obrigado-ticket__ref-code" title={sessionId}>
                  {refDisplay}
                </code>
              </div>
            ) : null}

            {showReceiptCta ? (
              <p
                className="obrigado-ticket__export-intro"
                data-translate="obrigado_receipt_intro"
                data-html
              >
                <strong>Recibo:</strong> exporta o recibo oficial da Stripe (PDF no browser).
              </p>
            ) : null}

            <div className="obrigado-card__actions obrigado-ticket__actions obrigado-ticket__actions--stack">
              {showReceiptCta ? (
                <>
                  <button
                    type="button"
                    className="obrigado-btn obrigado-btn--export"
                    onClick={openStripeReceipt}
                    disabled={receiptLoading}
                    aria-busy={receiptLoading}
                  >
                    <span className="obrigado-btn__export-icon" aria-hidden>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 3v12m0 0l4-4m-4 4l-4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {receiptLoading ? (
                      <span data-translate="obrigado_export_loading">A preparar…</span>
                    ) : (
                      <span data-translate="obrigado_export">Exportar recibo</span>
                    )}
                  </button>
                  {receiptErr ? (
                    <p className="br-error obrigado-ticket__receipt-err" role="alert">
                      {receiptErr.kind === "server" ? (
                        receiptErr.message
                      ) : (
                        <span data-translate={receiptErr.key}>
                          {RECEIPT_ERR_PT[receiptErr.key]}
                        </span>
                      )}
                    </p>
                  ) : null}
                </>
              ) : null}
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
                <span data-translate="obrigado_whatsapp">Falar no WhatsApp</span>
              </a>
              <Link className="obrigado-btn obrigado-btn--home" href="/">
                <span data-translate="obrigado_home">Voltar ao início</span>
              </Link>
            </div>
          </div>
        </article>

        <section className="obrigado-badges" aria-label={obrigadoAria.badges}>
          <h2 className="obrigado-badges__title" data-translate="obrigado_secure_title">
            Pagamento seguro
          </h2>
          <ul className="obrigado-badges__list">
            {OBRIGADO_SECURITY_BADGES.map((b) => (
              <li key={b.id} className="obrigado-badge">
                <span className="obrigado-badge__icon">
                  <BadgeIcon id={b.id} />
                </span>
                <span className="obrigado-badge__text">
                  <span
                    className="obrigado-badge__label"
                    data-translate={`obrigado_badge_${b.id}_label`}
                  >
                    {b.label}
                  </span>
                  <span
                    className="obrigado-badge__sub"
                    data-translate={`obrigado_badge_${b.id}_sub`}
                  >
                    {b.sub}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
