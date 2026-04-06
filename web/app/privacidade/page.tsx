import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY, DATA_PROCESSORS } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Política de Privacidade | DiscoverLixboaTours",
  description:
    "Informação sobre tratamento de dados pessoais, finalidades, base legal, prazos de retenção e direitos dos titulares (SGPD/GDPR).",
};

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-black/10 bg-white px-5 py-4 shadow-sm">
      <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">{k}</div>
      <div className="text-[15px] font-semibold text-[#1d1d1f]">{v}</div>
    </div>
  );
}

export default function PrivacidadePage() {
  return (
    <main className="mx-auto w-full max-w-[980px] px-[clamp(1.25rem,4vw,3rem)] py-[clamp(2rem,5vw,3.5rem)]">
      <header className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#ff6600]">
          SGPD · GDPR
        </p>
        <h1 className="font-(family-name:--font-outfit) text-[clamp(1.6rem,4vw,2.35rem)] font-bold leading-tight tracking-tight text-[#1d1d1f]">
          Política de Privacidade
        </h1>
        <p className="max-w-[70ch] text-[15px] leading-relaxed text-neutral-600 sm:text-base">
          Esta página explica como tratamos dados pessoais no âmbito das reservas e do apoio ao
          cliente, e como exercer os seus direitos.
        </p>
      </header>

      <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Row k="Responsável pelo tratamento" v={COMPANY.legalName} />
        <Row k="NIF" v={COMPANY.vatNumber} />
        <Row k="Morada" v={COMPANY.address} />
        <Row k="Email (privacidade)" v={COMPANY.privacyEmail} />
        <Row k="Âmbito" v={COMPANY.operatingCountries} />
      </section>

      <section className="mt-10 space-y-8">
        <div className="rounded-[22px] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-(family-name:--font-outfit) text-lg font-bold text-[#1d1d1f]">
            1) Que dados recolhemos
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-neutral-700 sm:text-base">
            <li>Nome, email e telefone.</li>
            <li>Tour escolhido, nº de pessoas e data preferida.</li>
            <li>Notas do cliente (ex.: pickup, preferências, restrições).</li>
            <li>
              Dados técnicos essenciais de navegação (cookies essenciais e logs de segurança).
            </li>
          </ul>
        </div>

        <div className="rounded-[22px] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-(family-name:--font-outfit) text-lg font-bold text-[#1d1d1f]">
            2) Finalidades e bases legais
          </h2>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-neutral-700 sm:text-base">
            <p>
              Tratamos os dados para <strong>gestão de reservas</strong>,{" "}
              <strong>comunicação com o cliente</strong> e{" "}
              <strong>cumprimento de obrigações legais</strong> (ex.: fiscais/contabilísticas, quando
              aplicável).
            </p>
            <p>
              A base legal pode incluir: execução de contrato (reserva), diligências pré-contratuais,
              cumprimento de obrigação legal e interesse legítimo (segurança e prevenção de fraude).
            </p>
          </div>
        </div>

        <div className="rounded-[22px] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-(family-name:--font-outfit) text-lg font-bold text-[#1d1d1f]">
            3) Subcontratantes (terceiros)
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-neutral-700 sm:text-base">
            Usamos prestadores de serviços para operar o website e processar pagamentos:
          </p>
          <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-neutral-700 sm:text-base">
            {DATA_PROCESSORS.map((p) => (
              <li key={p.name} className="flex flex-col gap-0.5 rounded-2xl bg-neutral-50 px-5 py-4">
                <span className="font-semibold text-[#1d1d1f]">{p.name}</span>
                <span className="text-neutral-600">{p.purpose}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[22px] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-(family-name:--font-outfit) text-lg font-bold text-[#1d1d1f]">
            4) Retenção
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-neutral-700 sm:text-base">
            {COMPANY.retentionBookings}
          </p>
        </div>

        <div className="rounded-[22px] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-(family-name:--font-outfit) text-lg font-bold text-[#1d1d1f]">
            5) Direitos do titular
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-neutral-700 sm:text-base">
            Pode exercer direitos de acesso, retificação, apagamento, limitação, oposição e portabilidade,
            quando aplicável. Para pedidos SGPD, contacte-nos por email.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              className="inline-flex min-h-11 items-center rounded-full bg-[#1d1d1f] px-5 py-2.5 text-[15px] font-semibold text-white"
              href={`mailto:${COMPANY.privacyEmail}?subject=${encodeURIComponent("Pedido SGPD (Privacidade)")}`}
            >
              Enviar pedido por email
            </a>
            <Link
              className="inline-flex min-h-11 items-center rounded-full border border-black/10 bg-white px-5 py-2.5 text-[15px] font-semibold text-[#1d1d1f] hover:bg-neutral-50"
              href="/cookies"
            >
              Ver Política de Cookies
            </Link>
          </div>
        </div>
      </section>

      <footer className="mt-10 text-sm text-neutral-500">
        Última atualização: {new Date().toISOString().slice(0, 10)}
      </footer>
    </main>
  );
}

