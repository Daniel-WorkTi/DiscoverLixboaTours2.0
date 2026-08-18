import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/assets/images/**",
      },
      {
        pathname: "/assets/images/**",
        search: "*",
      },
    ],
  },
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
   * beforeFiles: rewrites de tours HTML legado removidos — todos os tours estão no App Router.
   */
  async rewrites() {
    return {
      beforeFiles: [],
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
        source: "/tour-fatima-tomar.html",
        destination: "/tours/fatima-tomar",
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
