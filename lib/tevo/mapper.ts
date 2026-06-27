import type { TevoEvent } from "./types";

const FEE_RATE = 0.15; // service fee shown at checkout (adjust to your TEvo contract)

export function slugifyEvent(e: TevoEvent): string {
  return `${e.name}-${e.venue?.city ?? ""}-${e.id}`
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function eventIdFromSlug(slug: string): number | null {
  const m = slug.match(/-(\d+)$/);
  return m ? Number(m[1]) : null;
}

export function formatPrice(value: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(value);
}

export function withFees(subtotal: number) {
  const fees = Math.round(subtotal * FEE_RATE * 100) / 100;
  return { subtotal, fees, total: Math.round((subtotal + fees) * 100) / 100 };
}