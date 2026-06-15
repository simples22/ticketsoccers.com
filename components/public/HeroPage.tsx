"use client";

import Link from "next/link";
import PBImage from "@/components/ui/PBImage";
import SearchOverlay from "@/components/public/search/SearchOverlay";
import SearchCategoryGrid from "./search/SearchCategoryGrid";

const slides = [
  {
    title: "Greatest Moments On MLS Live",
    image: "/hero/mls-hero.jpg",
    href: "/sport/mls",
  },
  {
    title: "MLB Season Live",
    image: "/hero/mlb-hero.jpg",
    href: "/sport/mlb",
  },
  {
    title: "NBA Playoffs Live",
    image: "/hero/nba-hero.jpg",
    href: "/sport/nba",
  },
  {
    title: "NCAA Sports On Live",
    image: "/hero/ncaa-hero.jpg",
    href: "/sport/ncaa",
  },
];

export default function HeroPage() {
  return (
    <>
      <div className="tslnHeroSearchTop">
        <SearchOverlay />
      </div>

      <SearchCategoryGrid />

      <section className="tslnHeroCarousel">
        <div className="tslnHeroCarouselTrack">
          {slides.map((slide) => (
            <Link
              key={slide.title}
              href={slide.href}
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
                <span>Browse Events</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}