"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import type { FaqItem } from "@/lib/faqs";

type FaqAccordionProps = {
  items: FaqItem[];
  grid?: boolean;
};

export default function FaqAccordion({
  items,
  grid = false,
}: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  function renderFaq(item: FaqItem) {
    const isOpen = openId === item.id;

    return (
      <article
        className={`tslnFaqItem ${isOpen ? "open" : ""}`}
        key={item.id}
      >
        <button
          type="button"
          className="tslnFaqQuestion"
          onClick={() => setOpenId(isOpen ? null : item.id)}
          aria-expanded={isOpen}
        >
          <span className="tslnFaqQuestionText">{item.question}</span>

          <span className="tslnFaqIcon" aria-hidden="true">
            <FontAwesomeIcon icon={faChevronDown} />
          </span>
        </button>

        {isOpen ? (
          <div className="tslnFaqAnswer">
            <p>{item.answer}</p>
          </div>
        ) : null}
      </article>
    );
  }

  if (!grid) {
    return (
      <div className="tslnFaqList">
        {items.map(renderFaq)}
      </div>
    );
  }

  const middle = Math.ceil(items.length / 2);
  const leftColumn = items.slice(0, middle);
  const rightColumn = items.slice(middle);

  return (
    <div className="tslnFaqColumns">
      <div className="tslnFaqColumn">
        {leftColumn.map(renderFaq)}
      </div>

      <div className="tslnFaqColumn">
        {rightColumn.map(renderFaq)}
      </div>
    </div>
  );
}