import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Termos e Condições | DiscoverLixboaTours",
  description:
    "Termos de utilização do site, reservas, pagamentos e regras gerais do serviço.",
};

export default function TermosPage() {
  return (
    <main className="mx-auto w-full max-w-[980px] px-[clamp(1.25rem,4vw,3rem)] py-[clamp(2rem,5vw,3.5rem)]">
      <header className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#ff6600]">
          Termos
        </p>
        <h1 className="font-(family-name:--font-outfit) text-[clamp(1.6rem,4vw,2.35rem)] font-bold leading-tight tracking-tight text-[#1d1d1f]">
          Termos e Condições
        </h1>
        <p className="max-w-[70ch] text-[15px] leading-relaxed text-neutral-600 sm:text-base">
          Termos gerais aplicáveis ao uso do website e às reservas de tours/serviços.
        </p>
      </header>

      <section className="mt-8 space-y-6">
        <div className="rounded-[22px] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-(family-name:--font-outfit) text-lg font-bold text-[#1d1d1f]">
            1) Identificação
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-neutral-700 sm:text-base">
            Este website é operado por <strong>{COMPANY.legalName}</strong>, NIF{" "}
            <strong>{COMPANY.vatNumber}</strong>, com sede em <strong>{COMPANY.address}</strong>.
          </p>
        </div>

        <div className="rounded-[22px] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-(family-name:--font-outfit) text-lg font-bold text-[#1d1d1f]">
            2) Reservas e pagamentos
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-neutral-700 sm:text-base">
            <li>As reservas podem depender de disponibilidade.</li>
            <li>Os pagamentos são processados por prestador externo (ex.: Stripe).</li>
            <li>Os detalhes finais (horário/pickup) são confirmados por contacto com o cliente.</li>
          </ul>
        </div>

        <div className="rounded-[22px] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-(family-name:--font-outfit) text-lg font-bold text-[#1d1d1f]">
            3) Cancelamentos e alterações
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-neutral-700 sm:text-base">
            As condições de cancelamento podem variar por tour/serviço e serão confirmadas no momento
            da reserva. Se precisar de alterar uma reserva, contacte-nos o quanto antes.
          </p>
        </div>

        <div className="rounded-[22px] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-(family-name:--font-outfit) text-lg font-bold text-[#1d1d1f]">
            4) Limitação de responsabilidade
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-neutral-700 sm:text-base">
            Não nos responsabilizamos por atrasos decorrentes de fatores externos (trânsito, condições
            meteorológicas, encerramentos de locais, etc.). Sempre que possível, tentaremos propor
            alternativas equivalentes.
          </p>
        </div>

        <div className="rounded-[22px] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-(family-name:--font-outfit) text-lg font-bold text-[#1d1d1f]">
            5) Contactos
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-neutral-700 sm:text-base">
            Para questões:{" "}
            <a className="font-semibold underline" href={`mailto:${COMPANY.privacyEmail}`}>
              {COMPANY.privacyEmail}
            </a>
            {COMPANY.phone ? ` · ${COMPANY.phone}` : null}
          </p>
        </div>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          className="inline-flex min-h-11 items-center rounded-full border border-black/10 bg-white px-5 py-2.5 text-[15px] font-semibold text-[#1d1d1f] hover:bg-neutral-50"
          href="/privacidade"
        >
          Privacidade (SGPD)
        </Link>
        <Link
          className="inline-flex min-h-11 items-center rounded-full border border-black/10 bg-white px-5 py-2.5 text-[15px] font-semibold text-[#1d1d1f] hover:bg-neutral-50"
          href="/cookies"
        >
          Cookies
        </Link>
      </div>
    </main>
  );
}

