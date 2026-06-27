import { NextResponse } from "next/server";
import { tevo } from "@/lib/tevo/client";
import { normalizeEvent, minPriceOf } from "@/lib/tevo/normalize";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  try {
    if (id) {
      const [event, groups] = await Promise.all([tevo.getEvent(Number(id)), tevo.listTicketGroups(Number(id))]);
      return NextResponse.json({ event: normalizeEvent(event, minPriceOf(groups.ticket_groups)) });
    }
    const data = await tevo.listEvents({
      per_page: Number(searchParams.get("per_page") ?? 24),
      page: Number(searchParams.get("page") ?? 1),
      category_id: searchParams.get("category") ?? undefined,
    });
    return NextResponse.json({ events: data.events.map((e) => normalizeEvent(e)), total: data.total_entries });
  } catch {
    return NextResponse.json({ error: "events_failed" }, { status: 502 });
  }
}