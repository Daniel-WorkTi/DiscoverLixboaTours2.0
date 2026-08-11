/** Tours disponíveis no formulário de reserva (IDs alinhados com STRIPE_PRICE_MAP). */
export type TourBookingOption = {
  id: string;
  label: string;
};

export const toursBooking: TourBookingOption[] = [
  { id: "sintra-cascais", label: "Sintra & Cascais" },
  { id: "3-destinos", label: "Tour 3 Destinos (Fátima, Nazaré, Óbidos)" },
  { id: "monsanto", label: "Monsanto & Centro de Portugal" },
  { id: "fatima-tomar", label: "Fátima & Tomar Private Tour" },
  { id: "lisboa", label: "Lisboa" },
  { id: "porto", label: "Porto" },
  { id: "arraabida", label: "Arrábida, Setúbal & Sesimbra" },
  { id: "aveiro", label: "Aveiro & Costa Nova" },
  { id: "alentejo", label: "Premium Alentejo Wine, Food & Culture Experience" },
  { id: "algarve", label: "Algarve" },
];
