"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/public/events/EventCard";
import type { UiEvent } from "@/lib/tevo/types";

export default function RecommendedCarousel() {
  const [events, setEvents] = useState<UiEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    // TODO: replace with a real "top viewed / best selling" source.
    // TEvo has no public popularity metric; using a generic event list for now.
    fetch(`/api/tevo/geo-events?per_page=12`)
      .then((r) => r.json())
      .then((d) => { if (!cancelled) setEvents(Array.isArray(d.events) ? d.events : []); })
      .catch(() => { if (!cancelled) setEvents([]); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="uiCarousel tslnGeoCarousel">
      <div className="uiCarouselHead"><h2>You may also like</h2></div>
      <div className="uiCarouselTrack">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="tslnEventCard tslnTicketCardSkeleton" aria-hidden="true">
                <div className="tslnEventCardMedia tslnSkeletonMedia" />
                <div className="tslnEventCardBody">
                  <span className="tslnSkeletonLine wide" />
                  <span className="tslnSkeletonLine medium" />
                </div>
              </div>
            ))
          : events.map((e) => <EventCard key={e.id} event={e} />)}
      </div>
    </section>
  );
}
