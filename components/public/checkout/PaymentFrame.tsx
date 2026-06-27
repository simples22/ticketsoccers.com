"use client";
import { useEffect, useState } from "react";
export function PaymentFrame({ orderRef, amount, email, onResult }: {
  orderRef: string; amount: number; email: string; onResult: (ok: boolean) => void;
}) {
  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => {
    fetch("/api/tevo/payment", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderRef, amount, email }),
    }).then((r) => r.json()).then((d) => setSrc(d.hostedUrl));
  }, [orderRef, amount, email]);
  useEffect(() => {
    const handler = (e: MessageEvent) => { if (e.data?.type === "tevo:payment") onResult(Boolean(e.data.success)); };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [onResult]);
  if (!src) return <div className="tsln-frame tsln-skeleton" />;
  return <iframe src={src} title="Payment" className="tsln-frame" sandbox="allow-scripts allow-forms allow-same-origin" />;
}