"use client";

import SearchOverlay from "@/components/public/search/SearchOverlay";

import { useEffect, useState } from "react";
import Link from "next/link";
import PBImage from "@/components/ui/PBImage";
import EventFilterBar from "@/components/public/search/EventFilterBar";
import type { UiEvent } from "@/lib/tevo/types";

// mock images reused until real event images arrive from the API
const MOCK_SLIDES = [
  { title: "NBA Playoffs Live", image: "/hero/nba-hero.jpg" },
  { title: "Greatest Moments On MLS Live", image: "/hero/mls-hero.jpg" },
  { title: "MLB Season Live", image: "/hero/mlb-hero.jpg" },
  { title: "NCAA Sports On Live", image: "/hero/ncaa-hero.jpg" },
];

export default function HeroPage() {
  const [events, setEvents] = useState<UiEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    // trending = upcoming soccer/NFL/NBA events, soonest first (date filter)
    const p = new URLSearchParams();
    p.set("per_page", "12");
    // p.set("occurs_at.gte", new Date().toISOString()); // temporairement retire pour tester en mock
    // category_id filtering will be added once real TEvo category ids are available
    fetch(`/api/tevo/geo-events?${p.toString()}`)
      .then((r) => r.json())
      .then((d) => { if (!cancelled) setEvents(Array.isArray(d.events) ? d.events.slice(0, 12) : []); })
      .catch(() => { if (!cancelled) setEvents([]); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      <div className="tslnHeroSearchTop">
        <div className="tslnHeroSearchBg">
          <PBImage src="/hero/search-banner.jpg" alt="Search Events" fill priority className="tslnHeroSearchBgImg" sizes="100vw" />
        </div>
        <div className="tslnHeroSearchOverlay" />
        <div className="tslnHeroSearchContent">
          <SearchOverlay variant="bar" />
        </div>
      </div>

      <section className="tslnHeroCarousel">
        <div className="tslnHeroCarouselTrack">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <article key={i} className="tslnHeroCarouselCard tslnHeroCardSkeleton" aria-hidden="true" />
            ))
          ) : events.length === 0 ? (
            // fallback: keep mock slides if API returns nothing (mock mode)
            MOCK_SLIDES.map((slide, i) => (
              <article key={i} className="tslnHeroCarouselCard">
                <PBImage src={slide.image} alt={slide.title} fill className="tslnHeroCarouselImg" sizes="(max-width:768px) 80vw, 48vw" />
                <div className="tslnHeroCarouselOverlay" />
                <div className="tslnHeroCarouselContent">
                  <h1>{slide.title}</h1>
                  <span className="tslnHeroCarouselBadge">Live Events</span>
                </div>
              </article>
            ))
          ) : (
            events.map((e, i) => (
              <Link key={e.id} href={`/events/${e.slug}`} className="tslnHeroCarouselCard">
                <PBImage
                  src={`/events/${e.id}.jpg`}
                  alt={e.name}
                  fill
                  priority={i < 2}
                  className="tslnHeroCarouselImg"
                  sizes="(max-width:768px) 80vw, 48vw"
                />
                <div className="tslnHeroCarouselOverlay" />
                <div className="tslnHeroCarouselContent">
                  <h1>{e.name}</h1>
                  <span className="tslnHeroCarouselBadge">{e.category || "Trending"}</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      <EventFilterBar />
    </>
  );
}














