"use client";

import { useEffect, useMemo, useState } from "react";
import UiTitle from "../ui/UiTitle";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const FIRST_LAUNCH = new Date("2026-07-30T00:00:00-04:00");
const FINAL_LAUNCH = new Date("2026-09-30T00:00:00-04:00");

const EMPTY_TIME: TimeLeft = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

function getActiveLaunchDate() {
  const now = new Date();

  if (now.getTime() < FIRST_LAUNCH.getTime()) {
    return {
      label: " ",
      date: FIRST_LAUNCH,
      note: "Target launch date: July 30, 2026",
    };
  }

  return {
    label: "Final platform completion target",
    date: FINAL_LAUNCH,
    note: "Next completion target: September 30, 2026",
  };
}

function calculateTimeLeft(target: Date): TimeLeft {
  const now = new Date().getTime();
  const diff = Math.max(target.getTime() - now, 0);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownLaunch() {
  const [mounted, setMounted] = useState(false);
  const [activeLaunch, setActiveLaunch] = useState(() => ({

    date: FIRST_LAUNCH,
    note: "Launch timeline is loading.",
  }));

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(EMPTY_TIME);

  useEffect(() => {
    setMounted(true);

    const update = () => {
      const active = getActiveLaunchDate();
      setActiveLaunch(active);
      setTimeLeft(calculateTimeLeft(active.date));
    };

    update();

    const timer = window.setInterval(update, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const items = useMemo(
    () => [
      ["Days", timeLeft.days],
      ["Hours", timeLeft.hours],
      ["Minutes", timeLeft.minutes],
      ["Seconds", timeLeft.seconds],
    ],
    [timeLeft]
  );

  return (
    <section className="tslnCountdown">

      <UiTitle>Ticketsoccers launch countdown</UiTitle>

      <p>
        We are preparing the Ticketsoccers platform for live events, sports ticketing,
        concerts, festivals, shows, and theatres.
      </p>

      <div className="tslnCountdownGrid">
        {items.map(([label, value]) => (
          <div className="tslnCountdownCard" key={label}>
            <strong suppressHydrationWarning>
              {mounted ? String(value).padStart(2, "0") : "--"}
            </strong>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <p className="tslnCountdownNote">{activeLaunch.note}</p>
    </section>
  );
}