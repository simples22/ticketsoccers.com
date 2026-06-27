"use client";
import { useEffect, useState } from "react";
import EventCard from "@/components/public/events/EventCard";
import type { UiEvent } from "@/lib/tevo/types";
import type { GeoPoint } from "@/lib/geo/cities";
import UiTitle from "@/components/ui/UiTitle";

const SKELETON_COUNT = 6;

export default function GeoEventCarousel({
  title, categoryIds, coords, from, to,
}: {
  title: string;
  categoryIds: number[];
  coords: GeoPoint | null;
  from?: string;
  to?: string;
}) 
  {
  const [events, setEvents] = useState<UiEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const p = new URLSearchParams();
    const ids = categoryIds.filter((n) => n > 0);
    if (ids.length) p.set("category_id", ids.join(","));
    if (coords) { p.set("lat", String(coords.lat)); p.set("lon", String(coords.lon)); p.set("within", "150"); }
    if (from) p.set("occurs_at.gte", from);
    if (to) p.set("occurs_at.lt", to);
    p.set("per_page", "16");
    fetch(`/api/tevo/geo-events?${p.toString()}`)
      .then((r) => r.json())
      .then((d) => { if (!cancelled) setEvents(Array.isArray(d.events) ? d.events : []); })
      .catch(() => { if (!cancelled) setEvents([]); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [categoryIds, coords, from, to]);

  return (
    <section className="uiCarousel tslnGeoCarousel">
      <div className="uiCarouselHead">
        <UiTitle>{title}</UiTitle>
      </div>
      <div className="uiCarouselTrack">
        {loading ? (
          Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <div key={i} className="tslnEventCard tslnTicketCardSkeleton" aria-hidden="true">
              <div className="tslnEventCardMedia tslnSkeletonMedia" />
              <div className="tslnEventCardBody">
                <span className="tslnSkeletonLine wide" />
                <span className="tslnSkeletonLine medium" />
                <span className="tslnSkeletonPrice" />
              </div>
            </div>
          ))
        ) : events.length === 0 ? (
          <p className="tslnGeoEmpty">No events available in this area yet.</p>
        ) : (
          events.map((e) => <EventCard key={e.id} event={e} />)
        )}
      </div>
    </section>
  );
}
