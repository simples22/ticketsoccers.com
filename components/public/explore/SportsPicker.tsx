"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCheck } from "@fortawesome/free-solid-svg-icons";
import TslnOverlay from "@/components/ui/TslnOverlay";

export type Sport = { key: string; label: string; categoryId: number };

const SPORTS: Sport[] = [
  { key: "all", label: "All sports", categoryId: 0 },
  { key: "mls", label: "MLS (Soccer)", categoryId: 0 },
  { key: "nba", label: "NBA", categoryId: 0 },
  { key: "nfl", label: "NFL", categoryId: 0 },
  { key: "ncaafb", label: "NCAA Football", categoryId: 0 },
  { key: "ncaabb", label: "NCAA Basketball", categoryId: 0 },
  { key: "mlb", label: "MLB (Baseball)", categoryId: 0 },
];

export default function SportsPicker({
  value, onChange,
}: { value: string; onChange: (key: string, categoryId: number) => void }) {
  const [open, setOpen] = useState(false);
  const current = SPORTS.find((s) => s.key === value) ?? SPORTS[0];

  return (
    <>
      <button type="button" className={`tslnEventFilterBtn tslnSportsBtn${value !== "all" ? " active" : ""}`} onClick={() => setOpen(true)}>
        <span>{current.label}</span>
        <FontAwesomeIcon icon={faChevronDown} />
      </button>

      <TslnOverlay open={open} title="Choose a sport" onClose={() => setOpen(false)}>
        <div className="tslnFilterRows">
          {SPORTS.map((s) => {
            const on = s.key === value;
            return (
              <button key={s.key} type="button" className={`tslnFilterRowItem${on ? " active" : ""}`}
                onClick={() => { onChange(s.key, s.categoryId); setOpen(false); }}>
                <span>{s.label}</span>
                <span className="tslnFilterCheck" aria-hidden="true">{on ? <FontAwesomeIcon icon={faCheck} /> : null}</span>
              </button>
            );
          })}
        </div>
      </TslnOverlay>
    </>
  );
}

