import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  MapPin,
  MessageCircle,
  Shield,
  Sparkles,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ExecutiveHeader } from "./ExecutiveHeader";

const WA_HREF =
  "https://api.whatsapp.com/send/?phone=351934483853&text=Ol%C3%A1%21%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20tours%20executivos.&type=phone_number&app_absent=0";

const AVATAR_IMGS = [
  "/assets/images/destinations/img-circulo-casal.webp",
  "/assets/images/destinations/img-circulo-jeep.webp",
  "/assets/images/destinations/roteiro-sintra-e-cascais.webp",
  "/assets/images/destinations/lisboa.webp",
];

const BENEFITS = [
  {
    icon: Shield,
    title: "Discrição & conforto",
    text: "Itinerários pensados para grupos reduzidos ou privados, ao teu ritmo.",
  },
  {
    icon: MapPin,
    title: "Guias locais",
    text: "Conhecimento profundo de cada região — do icónico ao autêntico.",
  },
  {
    icon: Sparkles,
    title: "Experiência premium",
    text: "Rotas e paragens selecionadas para maximizar o tempo no destino.",
  },
  {
    icon: Clock,
    title: "Flexibilidade",
    text: "Ajustamos horários e detalhes com antecedência para corresponder à tua agenda.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Primeiro contacto",
    text: "Fala connosco por WhatsApp ou telefone — respondemos com uma proposta clara.",
  },
  {
    n: "02",
    title: "Planeamento",
    text: "Confirmamos datas, pickup e preferências antes de reservares com pagamento seguro.",
  },
  {
    n: "03",
    title: "Dia do tour",
    text: "Encontras o guia no local combinado e desfrutas da experiência sem stress.",
  },
];

export function ExecutivePage() {
  return (
    <div className="executive-page">
      <ExecutiveHeader />

      <section className="exec-hero" aria-label="Destaque">
        <div className="exec-hero__media" aria-hidden>
          <Image
            src="/assets/images/destinations/roteiro-sintra-e-cascais.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="exec-hero__scrim" />
        </div>

        <div className="exec-hero__content">
          <div className="exec-avatar-row">
            <div className="flex flex-row items-center justify-center pl-2">
              {AVATAR_IMGS.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  width={40}
                  height={40}
                  className={cn(
                    "rounded-full border-2 border-white object-cover",
                    i > 0 && "-ml-2.5",
                  )}
                />
              ))}
            </div>
          </div>
          <p className="exec-badge">
            <Star className="h-3.5 w-3.5 shrink-0 text-amber-300" aria-hidden />
            Experiências sob medida em Portugal
          </p>
          <h1>
            Tours executivos
            <br />
            com padrão Discover
          </h1>
          <p className="exec-hero__lead">
            Privacidade, guias locais e rotas cuidadosamente montadas — do primeiro contacto ao dia do
            tour.
          </p>
          <div className="exec-hero__ctas">
            <Link href="/reservar" className="exec-btn-light">
              Reservar agora
            </Link>
            <Link href="/#servicos" className="exec-btn-ghost">
              Ver experiências
            </Link>
          </div>
        </div>
      </section>

      <section id="beneficios" className="exec-section">
        <div className="exec-section__head">
          <h2>Porquê escolher o formato executive</h2>
          <p>
            O mesmo espírito Discover Portugal — com foco em conforto, tempo bem usado e um serviço
            próximo.
          </p>
        </div>
        <div className="exec-benefits">
          {BENEFITS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="exec-card">
              <div className="exec-card__icon">
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="como-funciona" className="exec-section exec-steps-wrap">
        <div className="exec-section__head">
          <h2>Como funciona</h2>
          <p>Um fluxo simples, do pedido à estrada — sem surpresas.</p>
        </div>
        <div className="exec-steps">
          {STEPS.map((s) => (
            <div key={s.n} className="exec-step">
              <div className="exec-step__num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="exec-cta" aria-label="Pedido de informações">
        <div className="exec-cta__box">
          <div className="exec-cta__accent" aria-hidden />
          <div className="exec-cta__inner">
            <h2>Pedir proposta ou esclarecimento</h2>
            <p>Resposta rápida no WhatsApp — sem compromisso.</p>
            <a className="exec-btn-light text-[#171717]" href={WA_HREF} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 inline h-5 w-5" aria-hidden />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer className="exec-footer">
        <div className="exec-footer__inner">
          <div className="exec-footer__brand">
            <Image
              src="/assets/images/hero/logo.png.webp"
              alt="Discover Portugal Tours"
              width={180}
              height={72}
            />
            <p className="text-sm leading-relaxed">
              Discover Portugal Tours — viagens autênticas com guias locais.
            </p>
          </div>
          <div className="exec-footer__cols">
            <div className="exec-footer__col">
              <strong>Navegação</strong>
              <nav>
                <Link href="/">Início</Link>
                <Link href="/executive">Executive</Link>
                <Link href="/reservar">Reservar</Link>
                <Link href="/#faq">FAQ</Link>
              </nav>
            </div>
            <div className="exec-footer__col">
              <strong>Contacto</strong>
              <nav>
                <a href="tel:+351934483853">+351 934 483 853</a>
                <a href={WA_HREF} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
