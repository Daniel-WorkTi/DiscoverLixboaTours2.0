/** Estado operacional da reserva no painel (guardado em Google Calendar, extendedProperties.private). */
export type BookingApprovalStatus = "pending" | "accepted" | "rejected";

export function parseApprovalStatus(raw: unknown): BookingApprovalStatus {
  const s = String(raw ?? "")
    .trim()
    .toLowerCase();
  if (s === "accepted" || s === "rejected" || s === "pending") return s;
  /** Eventos antigos (antes do painel): sem campo = já tratados operacionalmente. */
  return "accepted";
}
