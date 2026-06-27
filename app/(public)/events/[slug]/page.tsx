import { notFound } from "next/navigation";
import { tevo } from "@/lib/tevo/client";
import { eventIdFromSlug } from "@/lib/tevo/mapper";
import { normalizeEvent, normalizeTicketGroups, normalizeParkingGroups } from "@/lib/tevo/normalize";
import EventHero from "@/components/public/events/EventHero";
import TicketListing from "@/components/public/events/TicketListing";
import RecommendedCarousel from "@/components/public/events/RecommendedCarousel";

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const id = eventIdFromSlug(slug);
  if (id == null) notFound();

  let event = null;
  let tickets = [] as ReturnType<typeof normalizeTicketGroups>;
  try {
    event = normalizeEvent(await tevo.getEvent(id));
    const g = await tevo.listTicketGroups(id);
    tickets = [...normalizeTicketGroups(g.ticket_groups), ...normalizeParkingGroups(g.ticket_groups)];
  } catch {
    notFound();
  }
  if (!event) notFound();

  const d = new Date(event.date);
  const when = {
    day: String(d.getDate()).padStart(2, "0"),
    mon: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    line: `${d.toLocaleDateString("en-US", { weekday: "short", hour: "numeric", minute: "2-digit" })} · ${event.city}`,
  };

  return (
    <div className="tslnEventPage">
      <EventHero event={event} />

      <div className="tslnEventLayout">
        <h2>Available tickets</h2>

        <div>
          <TicketListing tickets={tickets} slug={slug} eventName={event.name} venue={event.venueName} when={when} />
        </div>

        <aside className="tslnEventAboutCol">
          <h2>About this event</h2>
          <p>
            {event.name} takes place at {event.venueName}
            {event.city ? `, ${event.city}` : ""}. Tickets and parking are listed on the left — pick a listing to choose your exact seats.
          </p>
        </aside>
      </div>

      <RecommendedCarousel />
    </div>
  );
}

