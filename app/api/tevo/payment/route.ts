import { NextResponse } from "next/server";
import { createPaymentSession } from "@/lib/tevo/payment";

export async function POST(req: Request) {
  const body = (await req.json()) as { orderRef: string; amount: number; email: string };
  if (!body?.orderRef || !body?.amount) return NextResponse.json({ error: "bad_request" }, { status: 400 });
  const session = await createPaymentSession(body);
  return NextResponse.json(session);
}

// Placeholder hosted form (replace with the real TEvo / VictoryLive hosted page).
export async function GET() {
  return NextResponse.json({ note: "Wire this to the TEvo / VictoryLive hosted payment page." });
}