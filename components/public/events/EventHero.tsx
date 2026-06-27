import PBImage from "@/components/ui/PBImage";
import type { UiEvent } from "@/lib/tevo/types";

export default function EventHero({ event }: { event: UiEvent }) {
  const d = new Date(event.date);
  const when = d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  return (
    <section className="tslnEventHero">
      <PBImage src={`/events/${event.id}.jpg`} alt={event.name} fill priority className="tslnEventHeroImg" sizes="100vw" />
      <div className="tslnEventHeroOverlay" />
      <div className="tslnEventHeroContent">
        <h1>{event.name}</h1>
        <div className="tslnEventHeroMeta">
          <span>{when} · {time}</span>
          <span>{event.venueName}{event.city ? `, ${event.city}` : ""}</span>
        </div>
      </div>
    </section>
  );
}
