/**
 * Avaliações Google Business — DiscoverLixboaTours.
 * Score/contagem verificados no painel Google (atualizado Nov 2026).
 */
export const GOOGLE_BUSINESS_RATING = {
  score: "4.9",
  scoreOutOf: 5,
  reviews: 54,
  source: "Google",
} as const;

/** Link estável para o painel de críticas no Google. */
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=DiscoverLixboaTours&si=AE1YtOqiKPb2pdLXAi8quZ9vbH4aVq_aX8-3H9iFBLpRNK95c657l4g4Hxv9eg2BPICCOU5TuFQMjJTdAVbJcn7kAfz-hyDSw8WQ9omclapgvW2Y9hrXMsQ%3D";

export type FeaturedReview = {
  author: string;
  stars: 5;
  text: { pt: string; en: string; es: string };
};

/** Trechos reais usados no site (mesma voz das avaliações públicas). */
export const FEATURED_REVIEWS: FeaturedReview[] = [
  {
    author: "Lorenzo M",
    stars: 5,
    text: {
      pt: "100% recomendado! Mike é um ótimo guia que nos fez aproveitar ao máximo essa experiência. As explicações foram muito claras e ele cuidou de nós do início ao fim.",
      en: "100% recommended! Mike is a great guide who made us make the most of this experience. The explanations were very clear and he took care of us from start to finish.",
      es: "¡100% recomendado! Mike es un gran guía que nos hizo aprovechar al máximo esta experiencia. Las explicaciones fueron muy claras y nos cuidó de principio a fin.",
    },
  },
  {
    author: "Carmen C",
    stars: 5,
    text: {
      pt: "Tour lindo e adaptável às nossas necessidades. Mike foi simpático e profissional, levou-nos a lugares incríveis e com paisagens de tirar o fôlego. Altamente recomendado!",
      en: "Beautiful tour and adaptable to our needs. Mike was friendly and professional, took us to incredible places with breathtaking views. Highly recommended!",
      es: "Tour precioso y adaptable a nuestras necesidades. Mike fue amable y profesional, nos llevó a lugares increíbles con vistas de ensueño. ¡Muy recomendable!",
    },
  },
  {
    author: "Hannah J",
    stars: 5,
    text: {
      pt: "Mike é um guia super alegre! No seu carro aberto único, levou-nos a vários lugares e ainda proporcionou muita diversão. Experiência 5 estrelas!",
      en: "Mike is such a cheerful guide! In his unique open-top car he took us to several places and made it so much fun. A 5-star experience!",
      es: "¡Mike es un guía súper alegre! En su coche abierto único nos llevó a varios sitios y además lo hizo muy divertido. ¡Experiencia 5 estrellas!",
    },
  },
];

/** Compat: home e JSON-LD usam o rating Google real da empresa. */
export function getTourRating(_slug?: string) {
  return {
    score: `${GOOGLE_BUSINESS_RATING.score}/5`,
    reviews: GOOGLE_BUSINESS_RATING.reviews,
  };
}
