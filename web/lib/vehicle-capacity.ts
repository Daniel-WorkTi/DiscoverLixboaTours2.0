/** Capacidade comercial (passageiros, exclui o condutor-guia). */

/** Van Mercedes-Benz Vito — até 8 passageiros. */
export const MAX_VAN_PASSENGERS = 8;

/** Jeep UMM Alter II — só 7 passageiros. */
export const MAX_JEEP_PASSENGERS = 7;

/** Máximo geral (van). Usado em tabelas de preço e clamp global. */
export const MAX_TOUR_PASSENGERS = MAX_VAN_PASSENGERS;

/**
 * Lugares comunicados na página Executive (van).
 * Fisicamente há lugar para o condutor, mas mostramos 8 para não confundir.
 */
export const VEHICLE_TOTAL_SEATS = 8;

/** Tours onde o jeep UMM está disponível. */
export const JEEP_TOUR_IDS = [
  "lisboa",
  "sintra-cascais",
  "arraabida",
] as const;

export type JeepTourId = (typeof JEEP_TOUR_IDS)[number];

/** Tours com escolha jeep ou van no checkout. */
export const VEHICLE_CHOICE_TOUR_IDS = [
  "lisboa",
  "sintra-cascais",
  "arraabida",
] as const;

export type BookingVehicle = "jeep" | "van";

export function isJeepTour(tourId: string): boolean {
  return (JEEP_TOUR_IDS as readonly string[]).includes(tourId);
}

export function canChooseVehicle(tourId: string): boolean {
  return (VEHICLE_CHOICE_TOUR_IDS as readonly string[]).includes(tourId);
}

export function maxPassengersForVehicle(vehicle: BookingVehicle): number {
  return vehicle === "jeep" ? MAX_JEEP_PASSENGERS : MAX_VAN_PASSENGERS;
}
