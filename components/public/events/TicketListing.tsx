"use client";

import { useMemo, useState } from "react";
import type { UiTicket } from "@/lib/tevo/types";
import TicketListItem from "./TicketListItem";

const PER_PAGE = 15;

export default function TicketListing({
  tickets, slug, eventName, venue, when,
}: { tickets: UiTicket[]; slug: string; eventName: string; venue: string; when: { day: string; mon: string; line: string } }) {
  const [page, setPage] = useState(1);
  const sorted = useMemo(() => [...tickets].sort((a, b) => a.price - b.price), [tickets]);
  const pages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const slice = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  if (sorted.length === 0) return <p className="tslnTicketEmpty">No tickets available right now.</p>;

  return (
    <>
      <div className="tslnListGrid">
        {slice.map((t) => (
          <TicketListItem key={t.id} ticket={t} slug={slug} eventName={eventName} venue={venue} when={when} />
        ))}
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
