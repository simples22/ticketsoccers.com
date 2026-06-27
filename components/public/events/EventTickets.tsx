"use client";

import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders, faTag, faLocationDot, faSquareParking } from "@fortawesome/free-solid-svg-icons";
import { formatPrice } from "@/lib/tevo/mapper";
import type { UiTicket } from "@/lib/tevo/types";
import TslnOverlay from "@/components/ui/TslnOverlay";
import QuantityOverlay from "@/components/public/events/QuantityOverlay";

type Panel = null | "price" | "location" | "packing" | "all";

export default function EventTickets({
  tickets, parking, slug,
}: { tickets: UiTicket[]; parking: UiTicket[]; slug: string }) {
  const [panel, setPanel] = useState<Panel>(null);
  const [maxPrice, setMaxPrice] = useState("");
  const [section, setSection] = useState("");
  const [minTogether, setMinTogether] = useState(1);
  const [showParking, setShowParking] = useState(false);
  const [picked, setPicked] = useState<UiTicket | null>(null);

  const source = showParking ? parking : tickets;

  const filtered = useMemo(() => source
    .filter((t) => (maxPrice === "" ? true : t.price <= Number(maxPrice)))
    .filter((t) => (section ? (t.section || "").toLowerCase().includes(section.toLowerCase()) : true))
    .filter((t) => Math.max(...(t.splits.length ? t.splits : [1])) >= minTogether || t.available >= minTogether)
    .sort((a, b) => a.price - b.price)
    .slice(0, 12),
  [source, maxPrice, section, minTogether]);

  const close = () => setPanel(null);

  const priceField = (
    <div className="tslnCityPicker" style={{ marginBottom: "1rem" }}>
      <input type="number" inputMode="numeric" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max price (e.g. 150)" />
    </div>
  );
  const sectionField = (
    <div className="tslnCityPicker" style={{ marginBottom: "1rem" }}>
      <input type="text" value={section} onChange={(e) => setSection(e.target.value)} placeholder="Section (e.g. Lower, 112, VIP)" />
    </div>
  );
  const packingField = (
    <div className="tslnCityPicker" style={{ marginBottom: "1rem" }}>
      <input type="number" inputMode="numeric" min={1} value={minTogether}
        onChange={(e) => setMinTogether(Math.max(1, Number(e.target.value) || 1))} placeholder="Seats together (min)" />
    </div>
  );
  const parkingToggle = (
    <button type="button" className={showParking ? "tslnFilterApply" : "tslnFilterClear"}
      style={{ width: "100%", minHeight: "3rem", marginBottom: "1rem" }}
      onClick={() => setShowParking((v) => !v)}>
      {showParking ? `Showing parking (${parking.length})` : `Show parking instead (${parking.length})`}
    </button>
  );
  const actions = (
    <div className="tslnFilterActions">
      <button type="button" className="tslnFilterClear" onClick={() => { setMaxPrice(""); setSection(""); setMinTogether(1); }}>Clear</button>
      <button type="button" className="tslnFilterApply" onClick={close}>Apply</button>
    </div>
  );

  return (
    <>
      <div className="tslnTicketFilterBar">
        <button type="button" className="tslnEventFilterBtn" onClick={() => setPanel("price")}><FontAwesomeIcon icon={faTag} /><span>Price</span></button>
        <button type="button" className="tslnEventFilterBtn" onClick={() => setPanel("location")}><FontAwesomeIcon icon={faLocationDot} /><span>Location</span></button>
        <button type="button" className="tslnEventFilterBtn" onClick={() => setPanel("packing")}><FontAwesomeIcon icon={faSquareParking} /><span>Parking</span></button>
        <button type="button" className="tslnEventFilterBtn tslnTicketFilterMobile" onClick={() => setPanel("all")}><FontAwesomeIcon icon={faSliders} /><span>Filters</span></button>
      </div>

      <TslnOverlay open={panel === "price"} title="Max price" onClose={close}>{priceField}{actions}</TslnOverlay>
      <TslnOverlay open={panel === "location"} title="Section" onClose={close}>{sectionField}{actions}</TslnOverlay>
      <TslnOverlay open={panel === "packing"} title="Parking & seats together" onClose={close}>{parkingToggle}{packingField}{actions}</TslnOverlay>
      <TslnOverlay open={panel === "all"} title="Filters" onClose={close}>{parkingToggle}{priceField}{sectionField}{packingField}{actions}</TslnOverlay>

      {filtered.length === 0 ? (
        <p className="tslnTicketEmpty">{showParking ? "No parking available for this event." : "No tickets match these filters."}</p>
      ) : filtered.map((t) => (
        <div key={t.id} className="tslnTicketRow" role="button" tabIndex={0} onClick={() => setPicked(t)} onKeyDown={(e) => { if (e.key === "Enter") setPicked(t); }}>
          <div className="tslnTicketInfo">
            <h4>{t.section || (showParking ? "Parking" : "General")}{t.row ? ` · Row ${t.row}` : ""}</h4>
            <p>{t.available} available{t.splits?.length ? ` · sold in ${t.splits.join(", ")}` : ""}</p>
          </div>
          <div className="tslnTicketRight">
            <span className="tslnTicketPrice">{formatPrice(t.price)}</span>
            <button type="button" className="tslnTicketBuy" onClick={() => setPicked(t)}>Select</button>
          </div>
        </div>
      ))}
          <QuantityOverlay ticket={picked} slug={slug} isParking={showParking} open={picked !== null} onClose={() => setPicked(null)} />
</>
  );
}



