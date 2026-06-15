"use client";

import Link from "next/link";
import UiTitle from "@/components/ui/UiTitle";

const categories = [
  {
    title: "Sports",
    href: "https://www.ticketnetwork.com/search?cjdata=MXxOfDB8WXww&q=sports&utm_source=cj&utm_medium=aff&ref=cj&utm_campaign=8873531&cjevent=6296016a690d11f182af00510a82b82d",
  },
  {
    title: "Concerts",
    href: "https://www.ticketnetwork.com/search?cjdata=MXxOfDB8WXww&q=concerts&utm_source=cj&utm_medium=aff&ref=cj&utm_campaign=8873531&cjevent=865a03e2690d11f180c8004c0a82b838",
  },
  {
    title: "Theater",
    href: "https://www.ticketnetwork.com/search?cjdata=MXxOfDB8WXww&q=theater&utm_source=cj&utm_medium=aff&ref=cj&utm_campaign=8873531&cjevent=a1844040690d11f18012004d0a82b836",
  },
  {
    title: "NCAA League",
    href: "https://www.ticketnetwork.com/search?cjdata=MXxOfDB8WXww&q=ncaa&utm_source=cj&utm_medium=aff&ref=cj&utm_campaign=8873531&cjevent=eeec8372690d11f18206004f0a82b820",
  },
  {
    title: "NBA Tickets",
    href: "https://www.ticketnetwork.com/search?cjdata=MXxOfDB8WXww&q=nba&utm_source=cj&utm_medium=aff&ref=cj&utm_campaign=8873531&cjevent=cc380761690d11f182af00530a82b82d",
  },
  {
    title: "MLS Tickets",
    href: "https://www.ticketnetwork.com/search?cjdata=MXxOfDB8WXww&q=mls&utm_source=cj&utm_medium=aff&ref=cj&utm_campaign=8873531&cjevent=0f47d156690e11f1828c003e0a82b82a",
  },
  {
    title: "MLB Tickets",
    href: "https://www.ticketnetwork.com/search?cjdata=MXxOfDB8WXww&q=mlb&utm_source=cj&utm_medium=aff&ref=cj&utm_campaign=8873531&cjevent=244484fb690e11f1803500550a82b821",
  },
];

export default function SearchCategoryCarousel() {
  return (
    <section className="tslnSearchCategorySection">
      <div className="tslnSearchCategoryInner">

        <UiTitle className="tslntitlecategorylinks">
          Browse Popular Event Categories
        </UiTitle>

        <div className="tslnSearchCategoryCarousel">
          {categories.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="tslnSearchCategoryCard"
            >
              {item.title}
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}