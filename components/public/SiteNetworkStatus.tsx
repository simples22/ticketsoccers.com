"use client";

import { useEffect, useState } from "react";
import UiSkeleton from "@/components/ui/UiSkeleton";

export default function SiteNetworkStatus() {
  const [offline, setOffline] = useState(false);
  const [weak, setWeak] = useState(false);

  useEffect(() => {
    const update = () => {
      setOffline(!navigator.onLine);

      const connection =
        (navigator as Navigator & {
          connection?: { effectiveType?: string; saveData?: boolean };
        }).connection;

      setWeak(
        connection?.saveData === true ||
          connection?.effectiveType === "slow-2g" ||
          connection?.effectiveType === "2g"
      );
    };

    update();

    window.addEventListener("online", update);
    window.addEventListener("offline", update);

    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  if (!offline && !weak) return null;

  return (
    <div className="tslnNetworkOverlay">
      <div className="tslnNetworkCard">
        <h2>{offline ? "Connection lost" : "Weak connection detected"}</h2>

        <p>
          {offline
            ? "Please check your internet connection. Ticketsoccers will continue when the connection is restored."
            : "Some content may take longer to load. We are keeping the page stable while your connection improves."}
        </p>

        <UiSkeleton type="accordion" count={3} />
      </div>
    </div>
  );
}