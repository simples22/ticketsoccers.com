"use client";

import { useState } from "react";
import { SeatMapEmbed } from "@/components/public/events/SeatMapEmbed";
import type { UiEvent, UiTicket } from "@/lib/tevo/types";

export default function SeatMapPanel({
  event, tickets,
}: { event: UiEvent; tickets: UiTicket[] }) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const ready = event.configurationId != null && event.venueId != null;

  if (!ready) {
    return (
      <div className="tslnSeatMapWrap">
        <div className="tslnSeatMapPlaceholder">
          Interactive seat map needs a TEvo venue configuration (not available in mock mode).
        </div>
      </div>
    );
  }

  const config = {
    venueId: event.venueId!,
    configurationId: event.configurationId!,
    availableTicketGroups: tickets.map((t) => ({ section: t.section, price: t.price })),
  };

  return (
    <div className="tslnSeatMapWrap">
      <SeatMapEmbed config={config as any} onSectionClick={(id) => setActiveSection(id)} />
      {activeSection && (
        <p className="tslnSeatMapHint">Selected section: <strong>{activeSection}</strong></p>
      )}
    </div>
  );
}
