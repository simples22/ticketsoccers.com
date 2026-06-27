"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

type SearchOverlayProps = {
  className?: string;
  onOpen?: () => void;
  variant?: "bar" | "icon";
  icon?: ReactNode;
  label?: string;
  defaultKeyword?: string;
};

function buildTicketNetworkUrl(query: string) {
  const cleanQuery = query.trim();

  const ticketNetworkUrl = `https://www.ticketnetwork.com/search?q=${encodeURIComponent(
    cleanQuery
  )}&utm_source=CJ+Affiliate&utm_medium=Widget`;

  return `https://www.tkqlhce.com/click-8873531-10796449?sid=72bd3ba93dc54c89a93365ea2-664478&url=${encodeURIComponent(
    ticketNetworkUrl
  )}`;
}

export default function SearchOverlay({
  className = "",
  onOpen,
  variant = "bar",
  icon,
  label = "Search by artist, team, event, venue...",
  defaultKeyword = "",
}: SearchOverlayProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(defaultKeyword);
  const [mounted, setMounted] = useState(false);
  const scrollYRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setSearchValue(defaultKeyword);
  }, [defaultKeyword]);

  useEffect(() => {
    if (!open) return;

    scrollYRef.current = window.scrollY;

    document.documentElement.classList.add("tslnNoScroll");
    document.body.classList.add("tslnNoScroll");
    document.body.classList.add("tslnSearchOpen");

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);

      document.documentElement.classList.remove("tslnNoScroll");
      document.body.classList.remove("tslnNoScroll");
      document.body.classList.remove("tslnSearchOpen");

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";

      window.scrollTo(0, scrollYRef.current);
    };
  }, [open]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanQuery = searchValue.trim();

    if (!cleanQuery) return;

    window.open(buildTicketNetworkUrl(cleanQuery), "_blank", "noopener,noreferrer");
  }

  const handleOpen = () => {
    onOpen?.();

    window.setTimeout(() => {
      setOpen(true);
    }, 120);
  };

  const overlay = open ? (
    <div
      className="tslnSearchOverlay"
      role="dialog"
      aria-modal="true"
      aria-label="Search events"
    >
      <button
        type="button"
        className="tslnSearchBackdrop"
        onClick={() => setOpen(false)}
        aria-label="Close search"
      />

      <div className="tslnSearchModal">
        <div className="tslnSearchTop">
          <div>
            <h2>Find your next event</h2>

            {defaultKeyword ? (
              <p>
                Searching for: <strong>{defaultKeyword}</strong>
              </p>
            ) : null}
          </div>

          <button
            type="button"
            className="tslnSearchClose"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className="tslnSearchBody">
          <section className="tslnSearchBlock" aria-label="Search form">
            <form className="tslnTNWidget" onSubmit={handleSubmit}>
              <h3>Find my next Event</h3>

              <div className="tslnTNWidgetSearch">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder="Search by artist, team, event, and more..."
                  autoFocus
                />

                <button type="submit" aria-label="Search TicketNetwork">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </div>

              <p className="tslnTNWidgetPowered">
                Powered by <strong>TicketNetwork</strong>
              </p>
            </form>
          </section>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      {variant === "icon" ? (
        <button
          type="button"
          className={`tslnSearchIconBtn ${className}`}
          onClick={handleOpen}
          aria-label="Search events"
        >
          {icon ?? <FontAwesomeIcon icon={faMagnifyingGlass} />}
        </button>
      ) : (
        <button
          type="button"
          className={`tslnSearchBarBtn ${className}`}
          onClick={handleOpen}
          aria-label="Search events"
        >
          <span className="tslnSearchBarIcon" aria-hidden="true">
            {icon ?? <FontAwesomeIcon icon={faMagnifyingGlass} />}
          </span>

          <span className="tslnSearchBarText">{label}</span>
        </button>
      )}

      {mounted && overlay ? createPortal(overlay, document.body) : null}
    </>
  );
}