import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Política de Cookies | DiscoverLixboaTours",
  description:
    "Informação sobre cookies essenciais, armazenamento local e como gerir preferências no navegador.",
};

export default function CookiesPage() {
  return (
    <main className="mx-auto w-full max-w-[980px] px-[clamp(1.25rem,4vw,3rem)] py-[clamp(2rem,5vw,3.5rem)]">
      <header className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#ff6600]">
          Cookies
        </p>
        <h1 className="font-(family-name:--font-outfit) text-[clamp(1.6rem,4vw,2.35rem)] font-bold leading-tight tracking-tight text-[#1d1d1f]">
          Política de Cookies
        </h1>
        <p className="max-w-[70ch] text-[15px] leading-relaxed text-neutral-600 sm:text-base">
          Usamos <strong>cookies essenciais</strong> para o funcionamento do site e para segurança.
          Não usamos cookies de publicidade/remarketing sem necessidade.
        </p>
      </header>

      <section className="mt-8 space-y-6">
        <div className="rounded-[22px] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-(family-name:--font-outfit) text-lg font-bold text-[#1d1d1f]">
            1) O que são cookies?
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-neutral-700 sm:text-base">
            Cookies são pequenos ficheiros guardados no seu dispositivo que ajudam um website a
            funcionar corretamente e, nalguns casos, a melhorar a experiência.
          </p>
        </div>

        <div className="rounded-[22px] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-(family-name:--font-outfit) text-lg font-bold text-[#1d1d1f]">
            2) Cookies essenciais (ativos)
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-neutral-700 sm:text-base">
            <li>Segurança e prevenção de abuso.</li>
            <li>Preferências básicas (ex.: idioma) quando aplicável.</li>
            <li>Funcionamento de formulários e navegação.</li>
          </ul>
        </div>

        <div className="rounded-[22px] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-(family-name:--font-outfit) text-lg font-bold text-[#1d1d1f]">
            3) Como gerir cookies
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-neutral-700 sm:text-base">
            Pode apagar ou bloquear cookies nas definições do seu navegador. Note que bloquear
            cookies essenciais pode afetar o funcionamento do site.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-neutral-700 sm:text-base">
            Para questões, contacte:{" "}
            <a className="font-semibold text-[#1d1d1f] underline" href={`mailto:${COMPANY.privacyEmail}`}>
              {COMPANY.privacyEmail}
            </a>
            .
          </p>
        </div>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          className="inline-flex min-h-11 items-center rounded-full border border-black/10 bg-white px-5 py-2.5 text-[15px] font-semibold text-[#1d1d1f] hover:bg-neutral-50"
          href="/privacidade"
        >
          Ver Política de Privacidade
        </Link>
        <Link
          className="inline-flex min-h-11 items-center rounded-full border border-black/10 bg-white px-5 py-2.5 text-[15px] font-semibold text-[#1d1d1f] hover:bg-neutral-50"
          href="/termos"
        >
          Ver Termos
        </Link>
      </div>
    </main>
  );
}

