import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

/** Pasta `web/` — evita Turbopack/PostCSS resolver a partir do package.json do monorepo. */
const webRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: webRoot,
    resolveAlias: {
      tailwindcss: path.join(webRoot, "node_modules/tailwindcss"),
      "@tailwindcss/postcss": path.join(
        webRoot,
        "node_modules/@tailwindcss/postcss",
      ),
    },
  },
  images: {
    qualities: [75, 90, 92, 100],
    localPatterns: [
      {
        pathname: "/assets/images/**",
      },
      {
        pathname: "/assets/images/**",
        search: "*",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/wikipedia/commons/**",
      },
      {
        protocol: "https",
        hostname: "thumb.wikimedia.org",
        pathname: "/wikipedia/commons/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/photos/**",
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
