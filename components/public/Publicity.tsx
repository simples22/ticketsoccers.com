"use client";

import { useEffect, useState } from "react";
import BrandLogo from "@/components/public/BrandLogo";

const words = [
  "World Cup",
  "MLS Tickets",
  "NBA Tickets",
  "NL Baseball",
  "NFL Tickets",
  "NCAA Football",
  "Comedy",
  "Shows",
  "Champions League",
  "Europa League",
  "Liga",
  "National Cup",
];

const steps = [
  "Don’t miss any events.",
  "Choose your event.",
  "Get your place.",
  "Checkout.",
  "Enjoy all great moments.",
];

export default function Publicity() {
  const [wordIndex, setWordIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const wordTimer = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % words.length);
    }, 1000);

    const stepTimer = window.setInterval(() => {
      setStepIndex((current) => (current + 1) % steps.length);
    }, 2000);

    return () => {
      window.clearInterval(wordTimer);
      window.clearInterval(stepTimer);
    };
  }, []);

  return (
    <section className="tslnPublicity">
      <div className="tslnPublicityInner">

        <div className="tslnPublicityBadge">
          Get Your Tickets For
        </div>

        <div className="tslnPublicityWords" aria-live="polite">
          <span key={words[wordIndex]}>
            {words[wordIndex]}
          </span>
        </div>

        <div className="tslnPublicityMessage" aria-live="polite">
          <p key={steps[stepIndex]}>
            {steps[stepIndex]}
          </p>
        </div>

        <div className="tslnPublicityPowered">
          <span>Powered by</span>
          <BrandLogo />
        </div>
      </div>
    </section>
  );
}