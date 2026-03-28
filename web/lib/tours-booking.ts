/** Tours disponíveis no formulário de reserva (IDs alinhados com STRIPE_PRICE_MAP). */
export type TourBookingOption = {
  id: string;
  label: string;
  /** Ícone curto no select (emoji). */
  icon: string;
};

export const toursBooking: TourBookingOption[] = [
  { id: "sintra-cascais", icon: "🏰", label: "Sintra & Cascais" },
  { id: "3-destinos", icon: "⛪", label: "Tour 3 Destinos (Fátima, Nazaré, Óbidos)" },
  { id: "lisboa", icon: "🌉", label: "Lisboa" },
  { id: "porto", icon: "🌆", label: "Porto" },
  { id: "arraabida", icon: "🌊", label: "Arrábida, Setúbal & Sesimbra" },
  { id: "alentejo", icon: "🌾", label: "Alentejo" },
  { id: "algarve", icon: "🏖️", label: "Algarve" },
];
