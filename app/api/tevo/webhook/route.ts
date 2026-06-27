import { NextResponse } from "next/server";
import { verifyWebhook } from "@/lib/tevo/payment";

export async function POST(req: Request) {
  const raw = await req.text();
  const sig = req.headers.get("x-signature");
  if (!verifyWebhook(raw, sig)) return NextResponse.json({ error: "invalid_signature" }, { status: 401 });

  const event = JSON.parse(raw) as { type: string; orderRef: string; orderId?: number };
  // TODO: persist order state to your DB (prisma) here.
  switch (event.type) {
    case "payment.succeeded": break;
    case "payment.failed": break;
  }
  return NextResponse.json({ received: true });
}