"use client";

import { useState } from "react";
import EventFilterBar from "@/components/public/search/EventFilterBar";
import UiFilterUniversel, { type SeatFilters } from "@/components/ui/UiFilterUniversel";
import SportsPicker from "@/components/public/explore/SportsPicker";
import ExploreGrid from "@/components/public/explore/ExploreGrid";
import UiTitle from "@/components/ui/UiTitle";
import type { UiTicket } from "@/lib/tevo/types";

export default function ExploreBar() {
  const [sport, setSport] = useState("all");
  const [categoryId, setCategoryId] = useState(0);
  const [filters, setFilters] = useState<SeatFilters>({ minPrice: "", maxPrice: "", qty: null, sections: [], perks: [] });

  return (
    <>
      <div className="tslnExploreBar">
        <button type="button" className={`tslnEventFilterBtn tslnExploreAll${sport === "all" ? " active" : ""}`} onClick={() => { setSport("all"); setCategoryId(0); }}>All Events</button>
        <SportsPicker value={sport} onChange={(k, c) => { setSport(k); setCategoryId(c); }} />
        <EventFilterBar />
        <UiFilterUniversel tickets={[] as UiTicket[]} value={filters} onChange={setFilters} />
      </div>

      {/* carousels go here later (tell me which ones) */}

      <UiTitle as="h1">Explore Events</UiTitle>

      <ExploreGrid categoryId={categoryId} />
    </>
  );
}
