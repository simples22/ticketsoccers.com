"use client";

import { useState } from "react";
import Link from "next/link";
import type { UiEvent } from "@/lib/tevo/types";

function formatWhen(iso: string) {
  const d = new Date(iso);
  const day = d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  return `${day} · ${time}`;
}

export default function EventCard({ event }: { event: UiEvent }) {
  const [fav, setFav] = useState(false);

  function toggleFav(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setFav((v) => !v);
    // TODO step 2: POST/DELETE /api/favorites with session token + event availability expiry
  }

  return (
    <Link href={`/events/${event.slug}`} className="tslnEventCard">
      <div className="tslnEventCardMedia">
        <button
          type="button"
          className={`tslnEventCardFav${fav ? " is-active" : ""}`}
          onClick={toggleFav}
          aria-label={fav ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={fav}
        >
          <svg width="18" height="18" viewBox="0 0 24 24"
               fill={fav ? "currentColor" : "none"}
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
        </button>
      </div>

      <div className="tslnEventCardBody">
        <h3 className="tslnEventCardTitle">{event.name}</h3>
        <span className="tslnEventCardWhen">{formatWhen(event.date)}</span>
        <span className="tslnEventCardMeta">
          {event.venueName}{event.city ? `, ${event.city}` : ""}
        </span>
      </div>
    </Link>
  );
}
