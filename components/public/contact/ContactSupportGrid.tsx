"use client";

import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import UiTitle from "@/components/ui/UiTitle";

const regions = [
  {
    label: "North America",
    email: "northamerica@ticketsoccers.com",
  },
  {
    label: "Caribbean",
    email: "caribbean@ticketsoccers.com",
  },
  {
    label: "Latin Area",
    email: "latinarea@ticketsoccers.com",
  },
  {
    label: "South America",
    email: "southamerica@ticketsoccers.com",
  },
  {
    label: "European Area",
    email: "europeanarea@ticketsoccers.com",
  },
];

export default function ContactSupportGrid() {
  const [open, setOpen] = useState(false);

  return (
    <section className="tslnContactSupport">
      <div className="tslnContactSupportInner">
        <header className="tslnContactSupportHeader">
          <UiTitle>
            Find our Contact Support
          </UiTitle>

          <p>
            Choose the right support option for help, ticket guidance,
            regional inquiries, or general questions.
          </p>
        </header>

        <div className="tslnContactSupportGrid">
          <Link
            href="/help-and-faqs"
            className="tslnContactSupportCard"
            aria-label="How to Tickets"
          >
            <span className="tslnContactSupportText">
              How to Tickets
            </span>

            <span className="tslnContactSupportIcon" aria-hidden="true">
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
          </Link>

          <div className={`tslnContactSupportItem ${open ? "open" : ""}`}>
            <button
              type="button"
              className="tslnContactSupportCard"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="tslnContactRegionPanel"
            >
              <span className="tslnContactSupportText">
                Enquiry Reports
              </span>

              <span className="tslnContactSupportIcon" aria-hidden="true">
                <FontAwesomeIcon icon={faChevronDown} />
              </span>
            </button>

            {open ? (
              <div
                id="tslnContactRegionPanel"
                className="tslnContactRegionPanel"
              >
                {regions.map((region) => (
                  <a
                    key={region.email}
                    href={`mailto:${region.email}`}
                    className="tslnContactRegionLink"
                  >
                    <span>{region.label}</span>
                    <small>{region.email}</small>
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}