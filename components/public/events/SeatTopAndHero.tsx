"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import SeatHero from "@/components/public/events/SeatHero";
import type { UiEvent } from "@/lib/tevo/types";

export default function SeatTopAndHero({ event, slug }: { event: UiEvent; slug: string }) {
  const [hidden, setHidden] = useState(false);

  return (
    <>
      <div className="tslnSeatTopbar">
        <Link href={`/events/${slug}`} className="tslnSeatBack">‹ Back</Link>
        {hidden && (
          <button type="button" className="tslnSeatHeroReopen" onClick={() => setHidden(false)}>
            <FontAwesomeIcon icon={faCircleInfo} />
            <span>Show event details</span>
          </button>
        )}
      </div>

      {!hidden && (
        <div className="tslnSeatHeroWrap">
          <button type="button" className="tslnSeatHeroClose" onClick={() => setHidden(true)} aria-label="Hide event details">✕</button>
          <SeatHero event={event} />
        </div>
      )}
    </>
  );
}
