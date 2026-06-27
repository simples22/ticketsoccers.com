"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

const TEAMS = [
  "Inter Miami CF","LA Galaxy","LAFC","Atlanta United","Seattle Sounders","Portland Timbers","NYCFC","New York Red Bulls","Austin FC","FC Cincinnati",
  "Los Angeles Lakers","Golden State Warriors","Boston Celtics","Miami Heat","New York Knicks","Chicago Bulls","Milwaukee Bucks","Denver Nuggets","Phoenix Suns","Dallas Mavericks",
  "Kansas City Chiefs","Dallas Cowboys","San Francisco 49ers","Philadelphia Eagles","Buffalo Bills","Green Bay Packers","Miami Dolphins","New England Patriots","Detroit Lions","Baltimore Ravens",
  "New York Yankees","Los Angeles Dodgers","Boston Red Sox","Chicago Cubs","Atlanta Braves","Houston Astros","New York Mets","Philadelphia Phillies","San Francisco Giants","St. Louis Cardinals",
  "Boston Bruins","Toronto Maple Leafs","New York Rangers","Chicago Blackhawks","Detroit Red Wings","Pittsburgh Penguins","Tampa Bay Lightning","Vegas Golden Knights","Colorado Avalanche","Edmonton Oilers",
];

type Props = {
  variant?: "icon" | "bar";
  className?: string;
  defaultKeyword?: string;
  label?: string;
  onOpen?: () => void;
  onClose?: () => void;
};

export default function SearchOverlay({
  variant = "icon", className = "", defaultKeyword = "", label, onOpen, onClose,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);

  function openSearch() { setQ(defaultKeyword || ""); setOpen(true); onOpen?.(); if (variant === "bar") document.documentElement.classList.add("tslnSearchOpen"); }
  function closeSearch() { setOpen(false); onClose?.(); document.documentElement.classList.remove("tslnSearchOpen"); }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeSearch(); };
    window.addEventListener("keydown", onKey);
    // for bar variant: close on outside click; for icon variant: lock body scroll
    let prev = "";
    if (variant === "icon") { prev = document.body.style.overflow; document.body.style.overflow = "hidden"; }
    const onClick = (e: MouseEvent) => {
      if (variant === "bar" && wrapRef.current && !wrapRef.current.contains(e.target as Node)) closeSearch();
    };
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
      if (variant === "icon") document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, variant]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return TEAMS.slice(0, 50);
    return TEAMS.filter((t) => t.toLowerCase().includes(term)).slice(0, 50);
  }, [q]);

  function go(term: string) { closeSearch(); router.push(`/explore?q=${encodeURIComponent(term)}`); }

  const list = (
    <>
      <p className="tslnSearchLabel">{q ? "Results" : "Popular teams"}</p>
      {results.length === 0 ? (
        <p className="tslnSearchEmpty">No teams found.</p>
      ) : (
        <ul className="tslnSearchList">
          {results.map((t) => (
            <li key={t}>
              <button type="button" onClick={() => go(t)}>
                <span className="tslnSearchTeamIcon"><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                <span>{t}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );

  // ===== BAR variant: inline expanding dropdown, glued to the bar =====
  if (variant === "bar") {
    return (
      <div className={`tslnSearchBarWrap ${open ? "is-open" : ""} ${className}`} ref={wrapRef}>
        {!open ? (
          <button type="button" className="tslnSearchBar" onClick={openSearch} aria-label="Search">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <span>{label || "Search by team, events, cities..."}</span>
          </button>
        ) : (
          <div className="tslnSearchBarActive">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="tslnSearchInputIcon" />
            <input
              autoFocus type="text" value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={label || "Search by team, events, cities..."}
              onKeyDown={(e) => { if (e.key === "Enter" && q.trim()) go(q.trim()); }}
            />
            <button type="button" className="tslnSearchInlineClose" onClick={closeSearch} aria-label="Close">
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        )}

        {open && (
          <div className="tslnSearchDropdown">{list}</div>
        )}
      </div>
    );
  }

  // ===== ICON variant (header): full modal =====
  return (
    <>
      <button type="button" className={`tslnSearchTrigger ${className}`} onClick={openSearch} aria-label={label || "Search"}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>

      {open && typeof document !== "undefined" && createPortal(
        <div className="tslnSearchModalRoot" role="dialog" aria-modal="true">
          <button type="button" className="tslnSearchBackdrop" onClick={closeSearch} aria-label="Close" />
          <div className="tslnSearchModal">
            <div className="tslnSearchModalHead">
              <div className="tslnSearchInputWrap">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="tslnSearchInputIcon" />
                <input autoFocus type="text" value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={label || "Search by team, events, cities..."}
                  onKeyDown={(e) => { if (e.key === "Enter" && q.trim()) go(q.trim()); }} />
              </div>
              <button type="button" className="tslnSearchCancel" onClick={closeSearch} aria-label="Close">
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <div className="tslnSearchResults">{list}</div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}



