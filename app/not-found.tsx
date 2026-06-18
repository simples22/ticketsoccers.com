"use client";

import { useState } from "react";
import Link from "next/link";
import SearchOverlay from "@/components/public/search/SearchOverlay";
import UiHeroMark from "@/components/ui/UiHeroMark";

export default function NotFound() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <main className="tsln404Page">
      <section className="tsln404Inner">
                <header className="tslnLegalSectionContentheader">
                        <div className="tslnPageMark">
                            <UiHeroMark />
                        </div>
                </header>
       

        <h1>Page not found.</h1>

        <p>
          The page you are looking for may have been moved, deleted, or is not
          available yet on ticketsoccers.com.
        </p>

        <div className="tsln404Tools">
          <SearchOverlay className="tsln404SearchBtn" />
        </div>

        <div className="tslnActions">
          <Link href="/" className="tslnBtn">
            Return Home
          </Link>

          <Link href="/#categories" className="tslnBtn ghost">
            View Categories
          </Link>
        </div>

        <div className="tsln404Help">
          <button
            type="button"
            className="tsln404DetailsBtn"
            onClick={() => setShowDetails((value) => !value)}
            aria-expanded={showDetails}
          >
            {showDetails ? "Hide Details" : "View Details"}
          </button>

          {showDetails ? (
            <div className="tsln404Details">
              <h2>Connection or page access details</h2>

              <p className="tsln404ErrorTitle">
                This site can’t be reached.
              </p>

              <p>
                The page or server refused to connect, or the address may not be
                available right now.
              </p>

              <code>ERR_CONNECTION_REFUSED</code>

              <h3>Recommended solutions</h3>

              <ul>
                <li>Check your internet connection.</li>
                <li>Verify the page URL is written correctly.</li>
                <li>Return to the homepage and continue from a working section.</li>
                <li>Check your firewall, antivirus, or browser network permissions.</li>
                <li>
                  If you use a proxy or VPN, disable it temporarily and try again.
                </li>
                <li>
                  Restart your router, modem, or browser if the connection is
                  unstable.
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}