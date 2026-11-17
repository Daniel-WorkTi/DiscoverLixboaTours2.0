type Props = {
  portugalLabel: string;
  internationalLabel: string;
};

const PORTUGAL = [
  { src: "/payments/mbway.svg?v=2", label: "MB WAY" },
  { src: "/payments/multibanco.svg?v=2", label: "Multibanco" },
] as const;

const INTERNATIONAL = [
  { src: "/payments/visa.svg?v=2", label: "Visa" },
  { src: "/payments/mastercard.svg?v=2", label: "Mastercard" },
  { src: "/payments/amex.svg?v=2", label: "American Express" },
  { src: "/payments/apple-pay.svg?v=2", label: "Apple Pay" },
  { src: "/payments/google-pay.svg?v=2", label: "Google Pay" },
  { src: "/payments/paypal.svg?v=2", label: "PayPal" },
] as const;

function Mark({ src, label }: { src: string; label: string }) {
  return (
    <span className="br-pay">
      <img src={src} alt={label} />
    </span>
  );
}

export function PaymentBadges({ portugalLabel, internationalLabel }: Props) {
  return (
    <div className="br-pay-badges">
      <div className="br-pay-badges__group">
        <span className="br-pay-badges__label">{portugalLabel}</span>
        <div className="br-pay-badges__row">
          {PORTUGAL.map((mark) => (
            <Mark key={mark.label} {...mark} />
          ))}
        </div>
      </div>
      <div className="br-pay-badges__group">
        <span className="br-pay-badges__label">{internationalLabel}</span>
        <div className="br-pay-badges__row">
          {INTERNATIONAL.map((mark) => (
            <Mark key={mark.label} {...mark} />
          ))}
        </div>
      </div>
    </div>
  );
}
