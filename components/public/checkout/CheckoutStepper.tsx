"use client";
import { useCheckout, type Step } from "@/context/CheckoutContext";
const steps: { id: Step; label: string }[] = [
  { id: "details", label: "Details" }, { id: "payment", label: "Payment" }, { id: "confirmation", label: "Confirmation" },
];
export function CheckoutStepper() {
  const { step } = useCheckout();
  const idx = steps.findIndex((s) => s.id === step);
  return (
    <ol className="tsln-stepper">
      {steps.map((s, i) => (
        <li key={s.id} className={`tsln-stepper__item${i <= idx ? " tsln-stepper__item--done" : ""}`}>
          <span className="tsln-stepper__num">{i + 1}</span>
          <span className={i <= idx ? "" : "tsln-stepper__label--muted"}>{s.label}</span>
          {i < steps.length - 1 && <span className="tsln-stepper__bar" />}
        </li>
      ))}
    </ol>
  );
}