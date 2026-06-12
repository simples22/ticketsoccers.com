"use client";

import { useEffect, useRef } from "react";

const SUGGESTED_WIDGET_SRC =
  "https://tpwidg.com/content?trs=481557&shmarker=664478.664478&keyword=Soccer&results=15&powered_by=false&campaign_id=72&promo_id=6086";

export default function SuggestedEvents() {
  const widgetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!widgetRef.current) return;

    widgetRef.current.innerHTML = "";

    const script = document.createElement("script");

    script.src = SUGGESTED_WIDGET_SRC;
    script.async = true;
    script.charset = "utf-8";

    widgetRef.current.appendChild(script);

    return () => {
      if (widgetRef.current) {
        widgetRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      ref={widgetRef}
      className="tslnSuggestedWidget"
    />
  );
}