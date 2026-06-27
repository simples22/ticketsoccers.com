"use client";
import { useCallback, useEffect, useState } from "react";
import { findCity, type GeoPoint } from "@/lib/geo/cities";

type Status = "idle" | "locating" | "ready" | "denied" | "manual";

export function useGeoLocation() {
  const [status, setStatus] = useState<Status>("idle");
  const [coords, setCoords] = useState<GeoPoint | null>(null);
  const [cityLabel, setCityLabel] = useState("");

  const requestLocation = useCallback(() => {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) { setStatus("manual"); return; }
    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setCityLabel("Your location");
        setStatus("ready");
      },
      () => setStatus("denied"),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 600000 }
    );
  }, []);

  const setCity = useCallback((name: string) => {
    const c = findCity(name);
    if (!c) return false;
    setCoords({ lat: c.lat, lon: c.lon });
    setCityLabel(c.label);
    setStatus("ready");
    return true;
  }, []);

  useEffect(() => { requestLocation(); }, [requestLocation]);

  return { status, coords, cityLabel, requestLocation, setCity };
}