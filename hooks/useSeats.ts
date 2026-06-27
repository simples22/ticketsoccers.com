"use client";
import { useEffect, useState } from "react";
import type { SeatMapConfig } from "@/lib/tevo/seats";

export function useSeats(eventId: number) {
  const [config, setConfig] = useState<SeatMapConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(`/api/tevo/seats?event_id=${eventId}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => active && setConfig(d))
      .catch(() => active && setError("seatmap_unavailable"))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [eventId]);

  return { config, loading, error };
}