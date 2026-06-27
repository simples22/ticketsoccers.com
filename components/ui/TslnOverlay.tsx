"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function TslnOverlay({
  open, title, onClose, children,
}: { open: boolean; title: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <>
      <button type="button" className="tslnEventFilterBackdrop" onClick={onClose} aria-label="Close" />
      <div className="tslnEventFilterPanel" role="dialog" aria-modal="true" aria-label={title}>
        <button type="button" className="tslnEventFilterPanelClose" onClick={onClose} aria-label="Close">
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h3>{title}</h3>
        {children}
      </div>
    </>,
    document.body
  );
}
