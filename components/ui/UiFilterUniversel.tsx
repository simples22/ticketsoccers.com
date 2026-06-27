"use client";

import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders, faTag, faChair, faTableCells, faStar, faCheck } from "@fortawesome/free-solid-svg-icons";
import type { UiTicket } from "@/lib/tevo/types";
import TslnOverlay from "@/components/ui/TslnOverlay";

export type SeatFilters = {
  minPrice: string;
  maxPrice: string;
  qty: number | null;
  sections: string[];
  perks: string[];
};

const PERKS = ["Aisle seats", "Front row", "Covered seats", "Club access", "East side", "West side"];
type Panel = null | "price" | "qty" | "section" | "perks" | "all";

export default function UiFilterUniversel({
  tickets, value, onChange,
}: { tickets: UiTicket[]; value: SeatFilters; onChange: (f: SeatFilters) => void }) {
  const [panel, setPanel] = useState<Panel>(null);
  const [showMore, setShowMore] = useState(false);
  const close = () => setPanel(null);

  const sections = useMemo(
    () => Array.from(new Set(tickets.map((t) => t.section).filter(Boolean))).sort(),
    [tickets]
  );

  const histo = useMemo(() => {
    const prices = tickets.map((t) => t.price).filter((p) => p > 0);
    if (prices.length === 0) return { bars: [] as number[], min: 0, max: 0 };
    const min = Math.min(...prices), max = Math.max(...prices);
    const BUCKETS = 24;
    const bars = new Array(BUCKETS).fill(0);
    const span = max - min || 1;
    for (const p of prices) {
      const i = Math.min(BUCKETS - 1, Math.floor(((p - min) / span) * BUCKETS));
      bars[i]++;
    }
    const peak = Math.max(...bars, 1);
    return { bars: bars.map((b) => b / peak), min, max };
  }, [tickets]);

  const set = (patch: Partial<SeatFilters>) => onChange({ ...value, ...patch });
  const toggle = (arr: string[], v: string) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const priceField = (
    <div className="tslnFilterField">
      <label>Price range</label>
      <div className="tslnPriceHisto" aria-hidden="true">
        {histo.bars.map((h, i) => (
          <span key={i} className="tslnPriceBar" style={{ height: `${Math.max(8, h * 100)}%` }} />
        ))}
      </div>
      <div className="tslnPriceInputs">
        <div className="tslnPriceInput">
          <span>Min</span>
          <input type="number" inputMode="numeric" value={value.minPrice}
            onChange={(e) => set({ minPrice: e.target.value })} placeholder={`$${Math.floor(histo.min) || 0}`} />
        </div>
        <div className="tslnPriceInput">
          <span>Max</span>
          <input type="number" inputMode="numeric" value={value.maxPrice}
            onChange={(e) => set({ maxPrice: e.target.value })} placeholder={`$${Math.ceil(histo.max) || 0}`} />
        </div>
      </div>
    </div>
  );

  const baseQty = [1, 2, 3, 4];
  const moreQty = [6, 7, 8, 9, 10];
  const qtyField = (
    <div className="tslnFilterField">
      <label>Quantity</label>
      <div className="tslnQtyMatrix">
        {baseQty.map((n) => (
          <button key={n} type="button" className={`tslnQtyChip${value.qty === n ? " active" : ""}`}
            onClick={() => set({ qty: value.qty === n ? null : n })}>{n}</button>
        ))}
        <button type="button" className={`tslnQtyChip${showMore ? " active" : ""}`}
          onClick={() => { setShowMore((v) => !v); if (!showMore) set({ qty: 5 }); }}>5+</button>
        {showMore && (
          <button type="button" className={`tslnQtyChip${value.qty === 5 ? " active" : ""}`} onClick={() => set({ qty: 5 })}>5</button>
        )}
        {showMore && moreQty.map((n) => (
          <button key={n} type="button" className={`tslnQtyChip${value.qty === n ? " active" : ""}`}
            onClick={() => set({ qty: n })}>{n}</button>
        ))}
      </div>
    </div>
  );

  const rowList = (items: string[], key: "sections" | "perks", empty: string) => (
    <div className="tslnFilterRows">
      {items.length === 0 ? <span className="tslnFilterMuted">{empty}</span> :
        items.map((it) => {
          const on = value[key].includes(it);
          return (
            <button key={it} type="button" className={`tslnFilterRowItem${on ? " active" : ""}`}
              onClick={() => set({ [key]: toggle(value[key], it) } as Partial<SeatFilters>)}>
              <span>{it}</span>
              <span className="tslnFilterCheck" aria-hidden="true">{on ? <FontAwesomeIcon icon={faCheck} /> : null}</span>
            </button>
          );
        })}
    </div>
  );
  const sectionField = (<div className="tslnFilterField"><label>Section</label>{rowList(sections, "sections", "No sections available")}</div>);
  const perksField = (<div className="tslnFilterField"><label>Perks</label>{rowList(PERKS, "perks", "")}</div>);

  const actions = (
    <div className="tslnFilterActions">
      <button type="button" className="tslnFilterClear" onClick={() => { onChange({ minPrice: "", maxPrice: "", qty: null, sections: [], perks: [] }); setShowMore(false); }}>Clear</button>
      <button type="button" className="tslnFilterApply" onClick={close}>Apply</button>
    </div>
  );

  return (
    <>
      <div className="tslnUniFilterBar">
        <button type="button" className="tslnEventFilterBtn" onClick={() => setPanel("price")}><FontAwesomeIcon icon={faTag} /><span>Price</span></button>
        <button type="button" className="tslnEventFilterBtn" onClick={() => setPanel("qty")}><FontAwesomeIcon icon={faChair} /><span>Quantity</span></button>
        <button type="button" className="tslnEventFilterBtn" onClick={() => setPanel("section")}><FontAwesomeIcon icon={faTableCells} /><span>Section</span></button>
        <button type="button" className="tslnEventFilterBtn" onClick={() => setPanel("perks")}><FontAwesomeIcon icon={faStar} /><span>Perks</span></button>
        <button type="button" className="tslnEventFilterBtn tslnUniFilterMain" onClick={() => setPanel("all")}><FontAwesomeIcon icon={faSliders} /><span>Filters</span></button>
      </div>

      <TslnOverlay open={panel === "price"} title="Price" onClose={close}>{priceField}{actions}</TslnOverlay>
      <TslnOverlay open={panel === "qty"} title="Quantity" onClose={close}>{qtyField}{actions}</TslnOverlay>
      <TslnOverlay open={panel === "section"} title="Section" onClose={close}>{sectionField}{actions}</TslnOverlay>
      <TslnOverlay open={panel === "perks"} title="Perks" onClose={close}>{perksField}{actions}</TslnOverlay>
      <TslnOverlay open={panel === "all"} title="Filters" onClose={close}>{priceField}{qtyField}{sectionField}{perksField}{actions}</TslnOverlay>
    </>
  );
}

