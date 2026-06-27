"use client";

import { useEffect, useState, useCallback } from "react";
import type { UiEvent } from "@/lib/tevo/types";
import EventCard from "@/components/public/events/EventCard";

type GeoState =
  | { status: "idle" }
  | { status: "locating" }
  | { status: "ready"; lat?: number; lng?: number; city?: string }
  | { status: "denied" };

const SKELETON_COUNT = 16;

export default function SoccerCarousel() {
  const [geo, setGeo] = useState<GeoState>({ status: "idle" });
  const [events, setEvents] = useState<UiEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [cityInput, setCityInput] = useState("");

  const fetchSoccer = useCallback(async (params: { lat?: number; lng?: number; city?: string }) => {
    setLoading(true);
    try {
      const qs = new URLSearchParams();
      if (params.lat != null) qs.set("lat", String(params.lat));
      if (params.lng != null) qs.set("lng", String(params.lng));
      if (params.city) qs.set("city", params.city);
      qs.set("limit", String(SKELETON_COUNT));

      const res = await fetch(`/api/tevo/soccer?${qs.toString()}`);
      const data = await res.json();
      setEvents(Array.isArray(data.events) ? data.events : []);
    } catch {
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const useMyLocation = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setGeo({ status: "denied" });
      return;
    }
    setGeo({ status: "locating" });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setGeo({ status: "ready", lat: latitude, lng: longitude });
        fetchSoccer({ lat: latitude, lng: longitude });
      },
      () => setGeo({ status: "denied" }),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 600000 }
    );
  }, [fetchSoccer]);

  const useCity = useCallback(() => {
    const city = cityInput.trim();
    if (!city) return;
    setGeo({ status: "ready", city });
    fetchSoccer({ city });
  }, [cityInput, fetchSoccer]);

  useEffect(() => {
    useMyLocation();
  }, [useMyLocation]);

  return (
    <section className="uiCarousel" aria-label="Soccer events near you">
      <div className="uiCarouselHead">
        <h2>Soccer near you</h2>
        <p>
          {geo.status === "locating" && "Finding events in your area..."}
          {geo.status === "ready" && geo.city && `Showing soccer events near ${geo.city}`}
          {geo.status === "ready" && !geo.city && "Showing soccer events near you"}
          {geo.status === "denied" && "Enter your city to see soccer events nearby"}
          {geo.status === "idle" && "Locating..."}
        </p>

        <div className="tslnCityPicker" style={{ marginTop: ".75rem", maxWidth: "26rem" }}>
          <input
            type="text"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            placeholder="Change city (e.g. Miami, Paris...)"
            onKeyDown={(e) => e.key === "Enter" && useCity()}
          />
          <button type="button" onClick={useCity}>Search this city</button>
          <button type="button" onClick={useMyLocation} className="tslnFilterClear">
            Use my location
          </button>
        </div>
      </div>

      <div className="uiCarouselTrack">
        {loading
          ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <div className="uiCarouselSkeletonCard tslnTicketCardSkeleton" key={i} aria-hidden="true">
                <div className="tslnSkeletonLine" style={{ height: "8.5rem", marginBottom: ".75rem" }} />
                <div className="tslnSkeletonLine wide" />
                <div className="tslnSkeletonLine medium" />
                <div className="tslnSkeletonPrice" style={{ marginTop: ".5rem" }} />
              </div>
            ))
          : events.length > 0
          ? events.map((event) => (
              <div className="uiCarouselSkeletonCard" key={event.id} style={{ minHeight: "auto" }}>
                <EventCard event={event} />
              </div>
            ))
          : (
            <div className="tslnEmptyState" style={{ flex: "0 0 100%" }}>
              No soccer events found in this area. Try another city.
            </div>
          )}
      </div>
    </section>
  );
}
