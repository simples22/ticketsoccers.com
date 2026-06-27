import { notFound } from "next/navigation";
import { tevo } from "@/lib/tevo/client";
import { eventIdFromSlug } from "@/lib/tevo/mapper";
import { normalizeEvent, normalizeTicketGroups, normalizeParkingGroups } from "@/lib/tevo/normalize";
import SeatTopAndHero from "@/components/public/events/SeatTopAndHero";
import SeatMapPanel from "@/components/public/events/SeatMapPanel";
import SeatSelection from "@/components/public/events/SeatSelection";
import HideSiteChrome from "@/components/public/events/HideSiteChrome";

export default async function SeatsPage({
  params, searchParams,
}: { params: Promise<{ slug: string }>; searchParams: Promise<{ tg?: string; qty?: string }> }) {
  const { slug } = await params;
  const { tg, qty } = await searchParams;
  const id = eventIdFromSlug(slug);
  if (id == null) notFound();

  let event = null;
  let all = [] as ReturnType<typeof normalizeTicketGroups>;
  try {
    event = normalizeEvent(await tevo.getEvent(id));
    const g = await tevo.listTicketGroups(id);
    all = [...normalizeTicketGroups(g.ticket_groups), ...normalizeParkingGroups(g.ticket_groups)];
  } catch { notFound(); }
  if (!event) notFound();

  const ticket = all.find((t) => String(t.id) === String(tg)) ?? null;
  if (!ticket) notFound();
  const requestedQty = Number(qty) || (ticket.splits?.[0] ?? 1);

  return (
    <div className="tslnSeatPage">
      <HideSiteChrome />

      <SeatTopAndHero event={event} slug={slug} />

      <div className="tslnSeatBody">
        <div className="tslnSeatMapFixed">
          <SeatMapPanel event={event} tickets={all} />
        </div>
        <SeatSelection slug={slug} ticket={ticket} tickets={all} initialQty={requestedQty} />
      </div>
    </div>
  );
}
