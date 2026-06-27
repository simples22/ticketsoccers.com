"use client";
import { useEffect, useState } from "react";

type OrderState = "pending" | "completed" | "failed";

export function useOrder(orderId: number | null, intervalMs = 2500) {
  const [state, setState] = useState<OrderState>("pending");

  useEffect(() => {
    if (!orderId) return;
    let active = true;
    const tick = async () => {
      try {
        const res = await fetch(`/api/tevo/events?order=${orderId}`); // adapt to your order-status route
        const data = await res.json();
        if (!active) return;
        if (data.state === "completed" || data.state === "failed") setState(data.state);
      } catch { /* retry */ }
    };
    const id = setInterval(tick, intervalMs);
    tick();
    return () => { active = false; clearInterval(id); };
  }, [orderId, intervalMs]);

  return state;
}