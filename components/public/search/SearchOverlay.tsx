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
  const params = new URLSearchParams({
    trs: "481557",
    shmarker: "664478.664478",
    bg_color: "#0045c5",
    title: "Find my next Event",
    title_color: "#ffffff",
    icon_color: "#0045c5",
    search_text: keyword || "Search by artist, team, event, and more...",
    footer_color: "#ffffff",
    powered_by: "false",
    campaign_id: "72",
    promo_id: "8505",
  });

  return `https://tpwidg.com/content?${params.toString()}`;
}

function getWidgetSelector() {
  return [
    'script[src*="tpwidg.com"]',
    'iframe[src*="tpwidg.com"]',
    '[id*="tpwidg"]',
    '[class*="tpwidg"]',
    '[id*="tp-widget"]',
    '[class*="tp-widget"]',
  ].join(",");
}

function removeExternalWidgetNodes(container?: HTMLDivElement | null) {
  document.querySelectorAll(getWidgetSelector()).forEach((node) => {
    if (container && container.contains(node)) return;
    node.remove();
  });
}

function injectWidget(
  container: HTMLDivElement | null,
  keyword: string
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
  const searchWidgetRef = useRef<HTMLDivElement | null>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

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

    removeExternalWidgetNodes(searchWidgetRef.current);
    injectWidget(searchWidgetRef.current, defaultKeyword);

    const observer = new MutationObserver(() => {
      removeExternalWidgetNodes(searchWidgetRef.current);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", onKey);

      if (searchWidgetRef.current) {
        searchWidgetRef.current.innerHTML = "";
      }

      removeExternalWidgetNodes(searchWidgetRef.current);

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