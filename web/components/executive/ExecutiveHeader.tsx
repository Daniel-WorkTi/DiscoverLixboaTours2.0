"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const WA_HREF =
  "https://api.whatsapp.com/send/?phone=351934483853&text=Ol%C3%A1%21%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20tours%20executivos.&type=phone_number&app_absent=0";
const TEL_HREF = "tel:+351934483853";

const NAV = [
  { href: "#beneficios", label: "Porquê nós" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "/reservar", label: "Reservar" },
];

export function ExecutiveHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="exec-header">
      <div className="exec-header__inner">
        <Link href="/executive" className="exec-logo">
          <Image
            src="/assets/images/hero/logo.png.webp"
            alt="Discover Portugal Tours"
            width={200}
            height={80}
            priority
          />
        </Link>

        <nav className={cn("exec-nav-desktop", "hidden min-[900px]:flex")} aria-label="Navegação">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/">Site principal</Link>
        </nav>

        <div className="exec-header__actions">
          <a className="exec-icon-btn" href={TEL_HREF} aria-label="Ligar">
            <Phone className="h-5 w-5" strokeWidth={2} />
          </a>
          <a className="exec-btn-dark hidden sm:inline-flex" href={WA_HREF} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <button
            type="button"
            className="exec-burger min-[900px]:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <Menu className="h-6 w-6" strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="exec-mobile-panel min-[900px]:hidden" data-open={open ? "true" : "false"} id="exec-mobile-nav">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
        <Link href="/" onClick={() => setOpen(false)}>
          Site principal
        </Link>
        <a
          className="exec-btn-dark mt-2 justify-center"
          href={WA_HREF}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
        >
          WhatsApp
        </a>
      </div>
    </header>
  );
}
