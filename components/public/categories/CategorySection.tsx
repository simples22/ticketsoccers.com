"use client";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import PBImage from "@/components/ui/PBImage";
import UiTitle from "@/components/ui/UiTitle";
import SearchOverlay from "@/components/public/search/SearchOverlay";
import { eventCategories } from "@/lib/eventCategories";

export default function CategorySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setSelectedCategory("");
        }
      },
      {
        threshold: 0.08,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  function handleCategorySelect(label: string) {
  setSelectedCategory(label);

  setTimeout(() => {
    const target =
      window.innerWidth <= 768
        ? document.getElementById("category-search-mobile")
        : document.getElementById("category-search");

    target?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, 100);
}

  function scrollCategories(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector<HTMLElement>(".tslnCategoryCard");
    const step = (card?.offsetWidth ?? 280) + 16;

    track.scrollBy({
      left: direction * step,
      behavior: "smooth",
    });
  }

  return (
    <section
      ref={sectionRef}
      id="categories"
      className="tslnCategoryRail"
      aria-label="Event categories"
    >
      <div className="tslnCategoryHead">
        <div className="tslnSectionHeader">
          <UiTitle>
            Explore Categories
          </UiTitle>

          <p>
            Ticketsoccers will provide access to thousands of events across
            multiple categories.
          </p>
        </div>

        {selectedCategory ? (
            <div 
            id="category-search"
            className="tslnCategorySearch tslnCategorySearchDesktop">
                <SearchOverlay
                className="tslnCategorySearchBtn"
                defaultKeyword={selectedCategory}
                label={`Search ${selectedCategory}`}
                />
            </div>
            ) : null}

        <div className="tslnCategoryControls">
          <button
            type="button"
            className="tslnCategoryScrollBtn"
            onClick={() => scrollCategories(-1)}
            aria-label="Scroll categories left"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <button
            type="button"
            className="tslnCategoryScrollBtn"
            onClick={() => scrollCategories(1)}
            aria-label="Scroll categories right"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>

      <div ref={trackRef} className="tslnCategoryTrack">
        {eventCategories.map((cat) => (
          <article
            className="tslnCategoryCard"
            key={cat.title}
          >
            <button
              type="button"
              className="tslnCategoryLink"
              aria-label={`Search ${cat.title}`}
              onClick={() => handleCategorySelect(cat.searchLabel)}
            >
              <div className="tslnCategoryMedia">
                <PBImage
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="tslnCategoryImg"
                  sizes="(max-width:768px) 80vw, 33vw"
                />

                <div className="tslnCategoryOverlay" />
              </div>

              <div className="tslnCategoryContent">
                <h3 className="tslnCategoryLabel">
                  {cat.title}
                </h3>

                <p className="tslnCategoryText">
                  Discover upcoming events and tickets.
                </p>
              </div>
            </button>
          </article>
        ))}
      </div>

        {selectedCategory ? (
        <div 
            id="category-search-mobile"
            className="tslnCategorySearch tslnCategorySearchMobile">
            
            <SearchOverlay
            className="tslnCategorySearchBtn"
            defaultKeyword={selectedCategory}
            label={`Search ${selectedCategory}`}
            />
        </div>
        ) : null}
    </section>
  );
}