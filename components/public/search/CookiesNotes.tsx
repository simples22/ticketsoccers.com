"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "ticketsoccers_affiliate_notice_closed";

export default function CookiesNotes() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const closed = window.sessionStorage.getItem(STORAGE_KEY);

    if (!closed) {
      setShow(true);
    }
  }, []);

  const closeNotice = () => {
    window.sessionStorage.setItem(STORAGE_KEY, "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="tslnCookiesNotice" role="dialog" aria-label="Affiliate and cookies notice">
      <div className="tslnCookiesNoticeCard">
        <button
          type="button"
          className="tslnCookiesNoticeClose"
          onClick={closeNotice}
          aria-label="Close notice"
        >
          X
        </button>

        <span className="tslnCookiesNoticeLabel">
          Notice
        </span>

        <h2>
          Affiliate Platform Information
        </h2>

        <p>
          Ticketsoccers helps visitors discover event opportunities through
          affiliated ticket provider technology. Some ticket listings,
          checkout steps, order processing, and related transactions may be
          handled by TicketNetwork or TN provider services.
        </p>

        <p className="tslnCookiesNoticeSmall">
          We may use necessary cookies and similar technologies to support site
          functionality, security, search access, and provider-related services.
          By continuing to use this platform, you acknowledge this notice.
        </p>
      </div>
    </div>
  );
}