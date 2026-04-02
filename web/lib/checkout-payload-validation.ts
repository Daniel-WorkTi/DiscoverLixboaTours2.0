import { toursBooking, type TourBookingOption } from "@/lib/tours-booking";

export type ValidatedCheckoutPayload = {
  tourId: string;
  quantity: number;
  preferredDate: string;
  customerName: string;
  email: string;
  phone: string;
  notes: string;
  tourLabel: string;
};

export type CheckoutValidationFailure = {
  status: number;
  body: { error: string; code: string };
};

/**
 * Valida e normaliza o corpo POST /api/checkout (sem Stripe).
 * Protege contra tour inválido, injeção em metadados (comprimento) e email malformado.
 */
export function validateCheckoutPayload(
  body: unknown,
  tourList: readonly TourBookingOption[] = toursBooking,
):
  | { ok: true; data: ValidatedCheckoutPayload }
  | { ok: false; failure: CheckoutValidationFailure } {
  if (body === null || typeof body !== "object") {
    return {
      ok: false,
      failure: {
        status: 400,
        body: { error: "JSON inválido.", code: "INVALID_JSON" },
      },
    };
  }

  const b = body as Record<string, unknown>;

  const tourId = String(b.tourId ?? "").trim();
  const quantity = Math.min(7, Math.max(1, Number(b.quantity) || 1));
  const preferredDate = String(b.preferredDate ?? "").trim();
  const customerName = String(b.customerName ?? "")
    .trim()
    .slice(0, 120);
  const email = String(b.email ?? "").trim().toLowerCase().slice(0, 254);
  const phone = String(b.phone ?? "").trim().slice(0, 48);
  const notes = String(b.notes ?? "").trim().slice(0, 500);

  const tourLabel =
    tourList.find((t) => t.id === tourId)?.label ?? tourId;

  if (!tourId || !tourList.some((t) => t.id === tourId)) {
    return {
      ok: false,
      failure: {
        status: 400,
        body: { error: "Tour inválido.", code: "INVALID_TOUR" },
      },
    };
  }

  if (!preferredDate) {
    return {
      ok: false,
      failure: {
        status: 400,
        body: {
          error: "Indica a data preferida para o tour.",
          code: "MISSING_DATE",
        },
      },
    };
  }

  if (customerName.length < 2) {
    return {
      ok: false,
      failure: {
        status: 400,
        body: {
          error: "Indica o teu nome completo.",
          code: "INVALID_NAME",
        },
      },
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      ok: false,
      failure: {
        status: 400,
        body: { error: "Email inválido.", code: "INVALID_EMAIL" },
      },
    };
  }

  return {
    ok: true,
    data: {
      tourId,
      quantity,
      preferredDate,
      customerName,
      email,
      phone,
      notes,
      tourLabel,
    },
  };
}
