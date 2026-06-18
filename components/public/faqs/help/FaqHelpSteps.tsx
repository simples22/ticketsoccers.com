"use client";

import { useState } from "react";
import Link from "next/link";
import PBImage from "@/components/ui/PBImage";
import UiTitle from "@/components/ui/UiTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";


export default function FaqHelpSteps() {
  const [open, setOpen] = useState(true);

  return (
    <div className="tslnFaqHelpContent">
        <button
            type="button"
            className="tslnFaqHelpAccordionBtn"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            >
            <h1>Ticket Buying Guide</h1>

            <FontAwesomeIcon
                icon={faChevronDown}
                className={`tslnFaqHelpAccordionIcon ${
                open ? "open" : ""
                }`}
            />
        </button>

      {open ? (
        <div className="tslnFaqHelpAccordionPanel">
          <div className="tslnFaqHelpIntro">
            <p>
              Ticketsoccers helps visitors discover events and access ticket
              opportunities through trusted ticket provider technology. Ticket
              purchases, payment processing, order confirmation, and delivery
              details may be completed through TicketNetwork or its provider
              network.
            </p>
          </div>

          <div className="tslnFaqHelpStep">
            <UiTitle>1. Search for an event</UiTitle>
            <p>
              Use the search button to find events by artist, team, venue,
              city, category, or event name. You can also explore event
              categories from the homepage.
            </p>

            <div className="tslnFaqHelpImage">
              <PBImage
                src="/images/help/search-events.jpg"
                alt="Search events on Ticketsoccers"
                fill
                className="tslnFaqHelpImg"
                sizes="(max-width:768px) 100vw, 720px"
              />
            </div>
          </div>

          <div className="tslnFaqHelpStep">
            <UiTitle>2. Review ticket details</UiTitle>
            <p>
              Before completing a purchase, review the event name, date, venue,
              seat information, price, delivery method, and any order details
              displayed by the ticket provider.
            </p>
          </div>

          <div className="tslnFaqHelpStep">
            <UiTitle>3. Complete the purchase</UiTitle>
            <p>
              When you proceed to checkout, the transaction may be handled by
              TicketNetwork or a connected ticket provider. Payment, order
              confirmation, ticket delivery, and support instructions are
              provided during or after checkout.
            </p>
          </div>

          <div className="tslnFaqHelpStep">
            <UiTitle>4. Purchase conditions</UiTitle>
            <p>
              Ticket prices, availability, delivery options, fees, taxes,
              refund rules, and resale terms can vary by event and provider.
              Always review the final checkout page before confirming your
              order.
            </p>
          </div>

          <div className="tslnFaqHelpNotice">
            <strong>Important notice:</strong>
            <p>
              Taxes, service fees, delivery fees, and resale pricing may apply.
              Like many recognized ticket platforms, some tickets may be listed
              by resale providers and prices can be above or below face value.
            </p>

            <div className="tslnFaqHelpActions">
              <Link href="/contact">Contact Support</Link>
              <Link href="/terms-of-use">Terms of Use</Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}