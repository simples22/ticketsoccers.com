import { NextResponse } from "next/server";
import { placeOrder, type CartItem } from "@/lib/tevo/checkout";
import { getSession } from "@/lib/auth/session";

export async function POST(req: Request) {
  const session = await getSession();
  const buyerId = session?.userId ?? process.env.TEVO_OFFICE_ID ?? "guest";
  const { items } = (await req.json()) as { items: CartItem[] };
  if (!items?.length) return NextResponse.json({ error: "empty_cart" }, { status: 400 });
  try {
    const order = await placeOrder(items, buyerId);
    return NextResponse.json({ orderId: order.id, state: order.state });
  } catch {
    return NextResponse.json({ error: "order_failed" }, { status: 502 });
  }
}