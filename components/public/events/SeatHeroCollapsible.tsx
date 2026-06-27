"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import SeatHero from "@/components/public/events/SeatHero";
import type { UiEvent } from "@/lib/tevo/types";

export default function SeatHeroCollapsible({ event }: { event: UiEvent }) {
  const [hidden, setHidden] = useState(false);

  if (hidden) {
    return (
      <button type="button" className="tslnSeatHeroReopen" onClick={() => setHidden(false)}>
        <FontAwesomeIcon icon={faCircleInfo} />
        <span>Show event details</span>
      </button>
    );
  }

  return (
    <div className="tslnSeatHeroWrap">
      <button type="button" className="tslnSeatHeroClose" onClick={() => setHidden(true)} aria-label="Hide event details">
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <SeatHero event={event} />
    </div>
  );
}

