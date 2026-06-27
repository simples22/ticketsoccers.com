"use client";

import { useState } from "react";
import PBImage from "@/components/ui/PBImage";
import type { UiEvent } from "@/lib/tevo/types";

export default function SeatHero({ event }: { event: UiEvent }) {
  const [fav, setFav] = useState(false);
  const d = new Date(event.date);
  const when = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  function share() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) navigator.share({ title: event.name, url }).catch(() => {});
    else if (navigator.clipboard) navigator.clipboard.writeText(url);
  }

  return (
    <div className="tslnSeatHero">
      <div className="tslnSeatHeroMedia">
        <PBImage src={`/events/${event.id}.jpg`} alt={event.name} fill className="tslnEventCardImg" sizes="4rem" />
      </div>

      <div className="tslnSeatHeroInfo">
        <div className="tslnSeatHeroTitleRow">
          <h1>{event.name}</h1>
          <div className="tslnSeatHeroActions">
            <button type="button" className={`tslnSeatIconBtn${fav ? " is-active" : ""}`} onClick={() => setFav((v) => !v)} aria-pressed={fav} aria-label="Add to favorites">
              <svg width="18" height="18" viewBox="0 0 24 24" fill={fav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l9 8.6 9-8.6a5.5 5.5 0 0 0 0-7.8z"/></svg>
              <span>Save</span>
            </button>
            <button type="button" className="tslnSeatIconBtn" onClick={share} aria-label="Share event">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>
              <span>Share</span>
            </button>
          </div>
        </div>

        <p className="tslnSeatHeroWhen">{when} · {time}</p>
        <p className="tslnSeatHeroVenue">{event.venueName}{event.city ? `, ${event.city}` : ""}</p>
      </div>
    </div>
  );
}
