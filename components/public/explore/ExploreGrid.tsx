"use client";

import { useEffect, useMemo, useState } from "react";
import EventCard from "@/components/public/events/EventCard";
import type { UiEvent } from "@/lib/tevo/types";

const PER_PAGE = 20;

export default function ExploreGrid({ categoryId }: { categoryId: number }) {
  const [events, setEvents] = useState<UiEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const p = new URLSearchParams();
    if (categoryId > 0) p.set("category_id", String(categoryId));
    p.set("per_page", "100");
    fetch(`/api/tevo/geo-events?${p.toString()}`)
      .then((r) => r.json())
      .then((d) => { if (!cancelled) { setEvents(Array.isArray(d.events) ? d.events : []); setPage(1); } })
      .catch(() => { if (!cancelled) setEvents([]); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [categoryId]);

  const pages = Math.max(1, Math.ceil(events.length / PER_PAGE));
  const slice = useMemo(() => events.slice((page - 1) * PER_PAGE, page * PER_PAGE), [events, page]);

  if (loading) {
    return (
      <div className="tslnExploreGrid">
        {Array.from({ length: PER_PAGE }).map((_, i) => (
          <div key={i} className="tslnEventCard tslnTicketCardSkeleton" aria-hidden="true">
            <div className="tslnEventCardMedia tslnSkeletonMedia" />
            <div className="tslnEventCardBody"><span className="tslnSkeletonLine wide" /><span className="tslnSkeletonLine medium" /></div>
          </div>
        ))}
      </div>
    );
  }

  if (events.length === 0) return <p className="tslnTicketEmpty">No events found.</p>;

  return (
    <>
      <div className="tslnExploreGrid">
        {slice.map((e) => <EventCard key={e.id} event={e} />)}
      </div>

      {pages > 1 && (
        <div className="tslnPager">
          <button type="button" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
          {Array.from({ length: pages }).map((_, i) => (
            <button key={i} type="button" className={page === i + 1 ? "active" : ""} onClick={() => setPage(i + 1)}>{i + 1}</button>
          ))}
          <button type="button" disabled={page === pages} onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>
      )}
    </>
  );
}
