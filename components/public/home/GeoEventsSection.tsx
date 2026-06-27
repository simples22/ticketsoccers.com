"use client";
import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import { sportsCarousels } from "@/lib/tevo/sportsCategories";
import GeoEventCarousel from "./GeoEventCarousel";

export default function GeoEventsSection() {
  const { status, coords, cityLabel, requestLocation, setCity } = useGeoLocation();
  const sp = useSearchParams();
  const from = sp?.get("from") ?? "";
  const to = sp?.get("to") ?? "";
  const [cityInput, setCityInput] = useState("");
  const [showCity, setShowCity] = useState(false);
  const [notFound, setNotFound] = useState(false);

  function submitCity(e: FormEvent) {
    e.preventDefault();
    const ok = setCity(cityInput);
    setNotFound(!ok);
    if (ok) setShowCity(false);
  }

  const chip = cityLabel || (status === "locating" ? "Locating..." : "All locations");

  return (
    <div className="tslnGeoSection">
      <div className="tslnGeoBar">
        <div className="tslnGeoBarLeft">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 21s-7-6.4-7-11a7 7 0 1 1 14 0c0 4.6-7 11-7 11z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          <span className="tslnGeoChip">{chip}</span>
        </div>
        <div className="tslnGeoBarRight">
          <button type="button" className="tslnGeoBtn tslnGeoBtnPrimary" onClick={requestLocation}>
            Use my location
          </button>
          <button type="button" className="tslnGeoBtn" onClick={() => setShowCity((v) => !v)}>
            Change city
          </button>
        </div>
      </div>

      {showCity && (
        <form className="tslnGeoCity" onSubmit={submitCity}>
          <input
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            placeholder="Enter a US city (e.g. Tampa)"
            aria-label="City"
          />
          <button type="submit">Go</button>
          {notFound && <span className="tslnGeoCityErr">City not found in list</span>}
        </form>
      )}

      {sportsCarousels.map((c) => (
        <GeoEventCarousel key={c.key} title={c.title} categoryIds={c.categoryIds} coords={coords} from={from} to={to} />
      ))}
    </div>
  );
}
