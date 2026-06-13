"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

type SearchOverlayProps = {
  className?: string;
  onOpen?: () => void;
  variant?: "bar" | "icon";
  icon?: ReactNode;
  label?: string;
  defaultKeyword?: string;
};

function buildSearchWidgetSrc(keyword = "") {
  const cleanKeyword = keyword.trim();

  const params = new URLSearchParams({
    trs: "481557",
    shmarker: "664478.664478",
    bg_color: "#0045c5",
    title: "Find my next Event",
    title_color: "#ffffff",
    icon_color: "#0045c5",
    search_text:
      cleanKeyword || "Search by artist, team, event, and more...",
    footer_color: "#ffffff",
    powered_by: "false",
    campaign_id: "72",
    promo_id: "8505",
    ts: String(Date.now()),
  });

  return `https://tpwidg.com/content?${params.toString()}`;
}

function injectWidget(
  container: HTMLDivElement | null,
  keyword: string,
  onError: () => void
) {
  if (!container) return;

  container.innerHTML = "";

  const mount = document.createElement("div");
  mount.className = "tslnWidgetMount";
  container.appendChild(mount);

  const script = document.createElement("script");
  script.src = buildSearchWidgetSrc(keyword);
  script.async = true;
  script.charset = "utf-8";
  script.referrerPolicy = "no-referrer-when-downgrade";

  script.onerror = onError;

  mount.appendChild(script);
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
  const [mounted, setMounted] = useState(false);
  const [widgetError, setWidgetError] = useState(false);

  const searchWidgetRef = useRef<HTMLDivElement | null>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    setWidgetError(false);

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
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);

    const timeout = window.setTimeout(() => {
      const hasIframe =
        searchWidgetRef.current?.querySelector("iframe");

      if (!hasIframe) {
        setWidgetError(true);
      }
    }, 8000);

    injectWidget(searchWidgetRef.current, defaultKeyword, () => {
      setWidgetError(true);
    });

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("keydown", onKey);

      if (searchWidgetRef.current) {
        searchWidgetRef.current.innerHTML = "";
      }

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
  }, [open, defaultKeyword]);

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
            aria-label="Close search"
          >
            ×
          </button>
        </div>

        <div className="tslnSearchBody">
          <section className="tslnSearchBlock" aria-label="Search form">
            <div ref={searchWidgetRef} className="tslnSearchWidget" />

            {widgetError ? (
              <div className="tslnSearchWidgetError">
                <h3>This search could not load.</h3>
                <p>
                  Please reload the page or try again in a few moments.
                </p>

                <button
                  type="button"
                  className="tslnBtn"
                  onClick={() => {
                    setWidgetError(false);
                    injectWidget(
                      searchWidgetRef.current,
                      defaultKeyword,
                      () => setWidgetError(true)
                    );
                  }}
                >
                  Reload Search
                </button>
              </div>
            ) : null}
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

          <span className="tslnSearchBarText">
            {label}
          </span>
        </button>
      )}

      {mounted && overlay ? createPortal(overlay, document.body) : null}
    </>
  );
}