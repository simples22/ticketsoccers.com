import { NextRequest, NextResponse } from "next/server";
import { tevo } from "@/lib/tevo/client";
import { normalizeEvent } from "@/lib/tevo/normalize";
import type { TevoEvent } from "@/lib/tevo/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/tevo/geo-events?category_id=1,2&lat=..&lon=..&within=150&per_page=16
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const ids = (sp.get("category_id") || "").split(",").map((s) => s.trim()).filter(Boolean);
  const lat = sp.get("lat");
  const lon = sp.get("lon");
  const within = sp.get("within") || "150";
  const gte = sp.get("occurs_at.gte");
  const lt = sp.get("occurs_at.lt");
  const perPage = Number(sp.get("per_page") || "16");

  try {
    const idList = ids.length ? ids : [undefined];
    const batches = await Promise.all(
      idList.map(async (cid) => {
        const params: Record<string, string | number> = { per_page: perPage };
        if (cid) params.category_id = cid;
        if (lat && lon) { params.lat = lat; params.lon = lon; params.within = within; }
        if (gte) params["occurs_at.gte"] = gte;
        if (lt) params["occurs_at.lt"] = lt;
        const { events } = await tevo.listEvents(params);
        return events as TevoEvent[];
      })
    );

    const seen = new Set<number>();
    const merged: TevoEvent[] = [];
    for (const b of batches) for (const e of b) {
      if (seen.has(e.id)) continue;
      seen.add(e.id);
      merged.push(e);
    }
    // No per-event ticket-group call here (would be 16x4 requests). Price = "See tickets".
    const list = merged.slice(0, perPage).map((e) => normalizeEvent(e));
    return NextResponse.json({ events: list });
  } catch (err) {
    return NextResponse.json({ events: [], error: String(err) }, { status: 200 });
  }
}
