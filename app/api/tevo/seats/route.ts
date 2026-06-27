import { NextResponse } from "next/server";
import { getSeatMapConfig } from "@/lib/tevo/seats";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const eventId = Number(searchParams.get("event_id"));
  if (!eventId) return NextResponse.json({ error: "event_id required" }, { status: 400 });
  const config = await getSeatMapConfig(eventId);
  if (!config) return NextResponse.json({ error: "no_seatmap" }, { status: 404 });
  return NextResponse.json(config);
}