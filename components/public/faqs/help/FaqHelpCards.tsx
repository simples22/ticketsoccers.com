"use client";

import { useState } from "react";
import PBImage from "@/components/ui/PBImage";
import UiTitle from "@/components/ui/UiTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const cards = [
  {
    span: "Search Events",
    title: "Discover live events.",
    text: "Search sports, concerts, festivals, family events, theatre, comedy, and more.",
    image: "/images/help/search-events-available.jpg",
    alt: "Search events",
  },
  {
    span: "Choose Tickets",
    title: "Review event details.",
    text: "Compare ticket options, locations, availability, pricing information, and event details.",
    image: "/images/help/select-seats.jpg",
    alt: "Choose tickets",
  },
  {
    span: "Checkout",
    title: "Complete your order.",
    text: "Follow checkout instructions provided by the ticket provider and receive your ticket information.",
    image: "/images/help/secure-checkout.jpg",
    alt: "Checkout",
  },
];

export default function FaqHelpCards() {
  const [open, setOpen] = useState(false);

  return (
    <aside className="tslnFaqHelpAd" aria-label="Ticketsoccers information">
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
          <div className="tslnFaqHelpCards">
            {cards.map((card) => (
              <article className="tslnFaqHelpCard" key={card.title}>
                <div className="tslnFaqHelpAdMedia">
                  <PBImage
                    src={card.image}
                    alt={card.alt}
                    fill
                    className="tslnFaqHelpAdImg"
                    sizes="(max-width:768px) 100vw, 360px"
                  />
                </div>

                <div className="tslnFaqHelpAdBody">
                  <span>{card.span}</span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </aside>
  );
}