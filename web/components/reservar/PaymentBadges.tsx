type Props = {
  portugalLabel: string;
  internationalLabel: string;
};

const MARKS = [
  { src: "/payments/mbway.svg?v=2", label: "MB WAY" },
  { src: "/payments/multibanco.svg?v=2", label: "Multibanco" },
  { src: "/payments/visa.svg?v=2", label: "Visa" },
  { src: "/payments/mastercard.svg?v=2", label: "Mastercard" },
  { src: "/payments/amex.svg?v=2", label: "American Express" },
  { src: "/payments/apple-pay.svg?v=2", label: "Apple Pay" },
  { src: "/payments/google-pay.svg?v=2", label: "Google Pay" },
  { src: "/payments/paypal.svg?v=2", label: "PayPal" },
] as const;

export function PaymentBadges({ portugalLabel, internationalLabel }: Props) {
  const aria = `${portugalLabel}, ${internationalLabel}`;
  return (
    <div className="br-pay-badges" aria-label={aria}>
      <div className="br-pay-badges__row">
        {MARKS.map((mark) => (
          <span className="br-pay" key={mark.label}>
            {/* eslint-disable-next-line @next/next/no-img-element -- SVGs locais em /public */}
            <img src={mark.src} alt={mark.label} />
          </span>
        ))}
      </div>
    </div>
  );
}
