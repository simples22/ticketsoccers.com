"use client";

import PBImage from "@/components/ui/PBImage";
import SearchOverlay from "@/components/public/search/SearchOverlay";
import SearchCategoryGrid from "./search/SearchCategoryGrid";
import EventFilterBar from "@/components/public/search/EventFilterBar";

const slides = [
   {
    title: "NBA Playoffs Live",
    image: "/hero/nba-hero.jpg",
  },
  {
    title: "Greatest Moments On MLS Live",
    image: "/hero/mls-hero.jpg",
  },
  {
    title: "MLB Season Live",
    image: "/hero/mlb-hero.jpg",
  },
  {
    title: "NCAA Sports On Live",
    image: "/hero/ncaa-hero.jpg",
  },
];

export default function HeroPage() {
  return (
    <>
        <div className="tslnHeroSearchTop">
          <div className="tslnHeroSearchBg">
            <PBImage
              src="/hero/search-banner.jpg"
              alt="Search Events"
              fill
              priority
              className="tslnHeroSearchBgImg"
              sizes="100vw"
            />
          </div>

              <div className="tslnHeroSearchOverlay" />
                <div className="tslnHeroSearchContent">
                  <h2>
                    Find Your Next Live Entertaiment
                  </h2>
                <p>
                Discover tickets for any live entertainment events across North America and beyond.
              </p>
              <SearchOverlay />
            <SearchCategoryGrid />
          </div>
        </div>

      <section className="tslnHeroCarousel">
        <div className="tslnHeroCarouselTrack">
          {slides.map((slide) => (
            <article
              key={slide.title}
              className="tslnHeroCarouselCard"
            >
              <PBImage
                src={slide.image}
                alt={slide.title}
                fill
                priority={slide.title.includes("MLS")}
                className="tslnHeroCarouselImg"
                sizes="(max-width:768px) 80vw, 48vw"
              />
                <div className="tslnHeroCarouselOverlay" />
              <div className="tslnHeroCarouselContent">
                <h1>{slide.title}</h1>
                <span className="tslnHeroCarouselBadge">
                  Live Events
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
      <EventFilterBar />
    </>
  );
}