import { tevo } from "./client";

export interface CartItem {
  ticketGroupId: number;
  signature: string;
  price: number;
  quantity: number;
  section: string;
  row: string;
}

// Builds the POST /orders payload. Confirm exact fields against your TEvo contract.

export function buildOrderPayload(items: CartItem[], buyerId: string | number) {
  return {
    orders: [
      {
        buyer_id: buyerId,
        items: items.map((i) => ({
          ticket_group_id: i.ticketGroupId,
          price: i.price.toFixed(2),
          quantity: i.quantity,
        })),
      },
    ],
  };
}

export async function placeOrder(items: CartItem[], buyerId: string | number) {
  const res = await tevo.createOrder(buildOrderPayload(items, buyerId));
  return res.orders[0];
}