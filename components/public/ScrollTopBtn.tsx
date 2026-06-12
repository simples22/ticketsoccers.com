"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowUpLong,
  faAnglesUp,
} from "@fortawesome/free-solid-svg-icons";

export default function ScrollTopBtn() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      aria-label="Back to top"
      className={`tslnScrollTopBtn ${
        visible ? "visible" : ""
      }`}
      onClick={scrollTop}
    >
      <FontAwesomeIcon icon={faArrowUpLong} />
      <span>Top</span>
    </button>
  );
}