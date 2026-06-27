"use client";

import { useEffect, useRef, useState } from "react";
import type { SeatMapConfig } from "@/lib/tevo/seats";

type SeatmapInstance = { build: (el: HTMLElement) => void; destroy?: () => void };

export function SeatMapEmbed({
  config,
  onSectionClick,
}: {
  config: SeatMapConfig;
  onSectionClick?: (sectionId: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let map: SeatmapInstance | null = null;
    let active = true;

    (async () => {
      try {
        const mod: any = await import("@ticketevolution/seatmaps-client");
        // Find a constructor among the common export shapes.
        const Ctor =
          (typeof mod.default === "function" && mod.default) ||
          (typeof mod.Seatmap === "function" && mod.Seatmap) ||
          (typeof mod.SeatmapFactory === "function" && mod.SeatmapFactory) ||
          (mod.default && typeof mod.default.Seatmap === "function" && mod.default.Seatmap) ||
          null;

        if (!Ctor) {
          console.warn("[SeatMapEmbed] no constructor found. Exports:", Object.keys(mod), mod.default ? Object.keys(mod.default) : "");
          if (active) setFailed(true);
          return;
        }

        map = new Ctor({
          venueId: String(config.venueId),
          configurationId: String(config.configurationId),
          onSelection: (ids: string[]) => onSectionClick?.(ids?.[0]),
          ticketGroups: config.availableTicketGroups.map((t) => ({
            tevoSectionName: t.section,
            retailPrice: t.price,
          })),
        });

        if (active && ref.current && map) map.build(ref.current);
      } catch (err) {
        console.warn("[SeatMapEmbed] failed to mount:", err);
        if (active) setFailed(true);
      }
    })();

    return () => {
      active = false;
      try { map?.destroy?.(); } catch {}
    };
  }, [config, onSectionClick]);

  if (failed) {
    return (
      <div className="tslnSeatMapPlaceholder">
        Seat map unavailable for this event (no valid venue configuration).
      </div>
    );
  }

  return <div ref={ref} className="tsln-seatmap" />;
}
