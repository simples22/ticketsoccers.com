"use client";

import { useEffect, useState } from "react";

function formatDateTime() {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date());
}

export default function HeaderScrollSeparator() {
  const [dateTime, setDateTime] = useState("");
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    setDateTime(formatDateTime());

    const timer = window.setInterval(() => {
      setDateTime(formatDateTime());
    }, 60000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = 1400;
      const target = Math.max(0, 1 - window.scrollY / max);

      setProgress((prev) => prev + (target - prev) * 0.08);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="tslnHeaderSeparator"
      style={
        {
          "--tsln-separator-progress": progress,
        } as React.CSSProperties
      }
    >
      <div className="tslnHeaderSeparatorLine" />

      <time className="tslnHeaderSeparatorDate">
        {dateTime}
      </time>
    </div>
  );
}