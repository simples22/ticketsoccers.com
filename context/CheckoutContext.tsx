"use client";
import { createContext, useContext, useState, type ReactNode } from "react";

export type Step = "details" | "payment" | "confirmation";
export interface Contact { firstName: string; lastName: string; email: string; phone: string }

const Ctx = createContext<{
  step: Step; setStep: (s: Step) => void;
  contact: Contact; setContact: (c: Partial<Contact>) => void;
  orderId: number | null; setOrderId: (id: number) => void;
} | null>(null);

const empty: Contact = { firstName: "", lastName: "", email: "", phone: "" };

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<Step>("details");
  const [contact, setContactState] = useState<Contact>(empty);
  const [orderId, setOrderId] = useState<number | null>(null);
  return (
    <Ctx.Provider value={{
      step, setStep,
      contact, setContact: (c) => setContactState((prev) => ({ ...prev, ...c })),
      orderId, setOrderId,
    }}>
      {children}
    </Ctx.Provider>
  );
}
export function useCheckout() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCheckout must be used within CheckoutProvider");
  return c;
}