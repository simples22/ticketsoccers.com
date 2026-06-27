import { NextResponse } from "next/server";
import { tevo } from "@/lib/tevo/client";
import { normalizeEvent } from "@/lib/tevo/normalize";
import { rankEvents } from "@/lib/search/rank";

// Single source of truth for search: calls TEvo directly, no internal hop.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() ?? "";
  if (!q) return NextResponse.json({ results: [] });
  try {
    const data = await tevo.listEvents({ q, per_page: 24, order_by: "events.occurs_at" });
    const results = rankEvents(data.events.map((e) => normalizeEvent(e)), q);
    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ results: [], error: "search_failed" }, { status: 502 });
  }
}