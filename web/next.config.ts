import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Cabeçalhos HTTP de segurança (anti-MIME sniff, clickjacking, referrer). */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  /**
   * Serve o HTML estático completo (sem iframe). Sem isto, /tours/* ficava só no iframe e podia aparecer em branco.
   */
  /**
   * beforeFiles: corre antes da resolução de rotas App Router (necessário para /tours/* → HTML em public).
   */
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/tours/sintra-cascais",
          destination: "/tour-sintra-cascais.html",
        },
        {
          source: "/tours/3-destinos",
          destination: "/tour-3-destinos.html",
        },
        { source: "/tours/lisboa", destination: "/tour-lisboa.html" },
        { source: "/tours/porto", destination: "/tour-porto.html" },
        { source: "/tours/arraabida", destination: "/tour-arraabida.html" },
        { source: "/tours/aveiro", destination: "/tour-aveiro.html" },
        {
          source: "/tours/monsanto",
          destination: "/tour-monsanto.html",
        },
        { source: "/tours/alentejo", destination: "/tour-alentejo.html" },
        { source: "/tours/algarve", destination: "/tour-algarve.html" },
      ],
    };
  },
  async redirects() {
    return [
      {
        source: "/tour-sintra-cascais.html",
        destination: "/tours/sintra-cascais",
        permanent: true,
      },
      {
        source: "/tour-3-destinos.html",
        destination: "/tours/3-destinos",
        permanent: true,
      },
      {
        source: "/tour-lisboa.html",
        destination: "/tours/lisboa",
        permanent: true,
      },
      {
        source: "/tour-porto.html",
        destination: "/tours/porto",
        permanent: true,
      },
      {
        source: "/tour-arraabida.html",
        destination: "/tours/arraabida",
        permanent: true,
      },
      {
        source: "/tour-aveiro.html",
        destination: "/tours/aveiro",
        permanent: true,
      },
      {
        source: "/tour-monsanto.html",
        destination: "/tours/monsanto",
        permanent: true,
      },
      {
        source: "/tours/fatima-tomar",
        destination: "/tours/monsanto",
        permanent: true,
      },
      {
        source: "/tour-fatima-tomar.html",
        destination: "/tours/monsanto",
        permanent: true,
      },
      {
        source: "/tour-alentejo.html",
        destination: "/tours/alentejo",
        permanent: true,
      },
      {
        source: "/tour-algarve.html",
        destination: "/tours/algarve",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
