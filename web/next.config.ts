import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Serve o HTML estático completo (sem iframe). Sem isto, /tours/* ficava só no iframe e podia aparecer em branco.
   */
  /**
   * beforeFiles: corre antes da resolução de rotas App Router. Na Netlify, rewrites só em
   * "afterFiles" (array simples) não bastavam — /tours/* devolvia 404 do runtime Next.
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
