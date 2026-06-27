import crypto from "crypto";

// Payment is settled by the TEvo / VictoryLive hosted form. This module is the seam:
// (1) create a hosted-payment session, (2) verify the signed webhook. Wire the two TODO
// endpoints to the URLs in your TEvo / VictoryLive merchant agreement.

const WEBHOOK_SECRET = process.env.TEVO_WEBHOOK_SECRET ?? "";

export interface PaymentSession {
  sessionId: string;
  hostedUrl: string;
}

export async function createPaymentSession(input: {
  orderRef: string; amount: number; currency?: string; email: string;
}): Promise<PaymentSession> {
  // TODO: replace with the real TEvo / VictoryLive create-session call.
  const sessionId = crypto.randomUUID();
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const hostedUrl = `${base}/api/tevo/payment?session=${sessionId}&amount=${input.amount}&ref=${encodeURIComponent(input.orderRef)}`;
  return { sessionId, hostedUrl };
}

export function verifyWebhook(rawBody: string, signatureHeader: string | null): boolean {
  if (!signatureHeader) return false;
  const expected = crypto.createHmac("sha256", WEBHOOK_SECRET).update(rawBody, "utf8").digest("base64");
  const a = Buffer.from(expected);
  const b = Buffer.from(signatureHeader);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}