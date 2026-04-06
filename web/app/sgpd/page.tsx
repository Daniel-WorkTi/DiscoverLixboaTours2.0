import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Direitos SGPD | DiscoverLixboaTours",
  description:
    "Como exercer direitos SGPD/GDPR (acesso, retificação, apagamento, oposição, portabilidade) e como contactar.",
};

export default function SgpdPage() {
  return (
    <main className="mx-auto w-full max-w-[980px] px-[clamp(1.25rem,4vw,3rem)] py-[clamp(2rem,5vw,3.5rem)]">
      <header className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#ff6600]">
          SGPD · Portugal
        </p>
        <h1 className="font-(family-name:--font-outfit) text-[clamp(1.6rem,4vw,2.35rem)] font-bold leading-tight tracking-tight text-[#1d1d1f]">
          Direitos do Titular (SGPD/GDPR)
        </h1>
        <p className="max-w-[70ch] text-[15px] leading-relaxed text-neutral-600 sm:text-base">
          Guia simples para exercer os seus direitos e pedir cópia/alteração/eliminação de dados.
        </p>
      </header>

      <section className="mt-8 space-y-6">
        <div className="rounded-[22px] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-(family-name:--font-outfit) text-lg font-bold text-[#1d1d1f]">
            Direitos
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-neutral-700 sm:text-base">
            <li>Acesso aos dados pessoais</li>
            <li>Retificação</li>
            <li>Apagamento (quando aplicável)</li>
            <li>Limitação do tratamento</li>
            <li>Oposição</li>
            <li>Portabilidade (quando aplicável)</li>
            <li>Retirar consentimento (quando aplicável)</li>
          </ul>
        </div>

        <div className="rounded-[22px] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-(family-name:--font-outfit) text-lg font-bold text-[#1d1d1f]">
            Como pedir
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-neutral-700 sm:text-base">
            Envie um email para <strong>{COMPANY.privacyEmail}</strong> indicando:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-neutral-700 sm:text-base">
            <li>O direito que pretende exercer</li>
            <li>O email/telefone usados na reserva (para localizar os dados)</li>
            <li>Se possível, a referência do pagamento/Reserva</li>
          </ul>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              className="inline-flex min-h-11 items-center rounded-full bg-[#1d1d1f] px-5 py-2.5 text-[15px] font-semibold text-white"
              href={`mailto:${COMPANY.privacyEmail}?subject=${encodeURIComponent("Pedido SGPD")}`}
            >
              Enviar pedido SGPD
            </a>
            <Link
              className="inline-flex min-h-11 items-center rounded-full border border-black/10 bg-white px-5 py-2.5 text-[15px] font-semibold text-[#1d1d1f] hover:bg-neutral-50"
              href="/privacidade"
            >
              Política de Privacidade
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

