import { tevo } from "@/lib/tevo/client";
import { normalizeEvent, minPriceOf } from "@/lib/tevo/normalize";
import EventCard from "@/components/public/events/EventCard";
import UiTitle from "@/components/ui/UiTitle";

export default async function PopularEvents() {
  let list: ReturnType<typeof normalizeEvent>[] = [];

  try {
    const { events } = await tevo.listEvents({ per_page: 12 });
    list = await Promise.all(
      events.map(async (e) => {
        try {
          const g = await tevo.listTicketGroups(e.id);
          return normalizeEvent(e, minPriceOf(g.ticket_groups));
        } catch {
          return normalizeEvent(e);
        }
      })
    );
  } catch {
    // TEvo unavailable (e.g. missing token in production) -> render empty, no crash
    list = [];
  }

  return (
    <section className="tslnEventSection">
      <div className="tslnEventSectionHead">
        <UiTitle>Popular events</UiTitle>
      </div>
      {list.length === 0 ? (
        <p className="tslnTicketEmpty">No events available right now.</p>
      ) : (
        <div className="tslnEventGrid">
          {list.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}
