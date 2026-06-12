// lib/eventCategories.ts

export type EventCategory = {
  title: string;
  searchLabel: string;
  image: string;
  href: string;
  description: string;
};

export const eventCategories: EventCategory[] = [
  {
    title: "Sports",
    searchLabel: "Sports",
    image: "/categories/sports.jpg",
    href: "/category/sports",
    description:
      "Professional and collegiate sports events across multiple leagues.",
  },

  {
    title: "Festivals",
    searchLabel: "Festival",
    image: "/categories/festivals.jpg",
    href: "/festival",
    description:
      "Music, cultural, seasonal, and entertainment festivals.",
  },

  {
    title: "Music",
    searchLabel: "Concert",
    image: "/categories/music.jpg",
    href: "/music",
    description:
      "Concerts, tours, live performances, and music experiences.",
  },

  {
    title: "Comedy",
    searchLabel: "Comedy",
    image: "/categories/comedy.jpg",
    href: "/comedy",
    description:
      "Stand-up comedians, comedy tours, and live comedy shows.",
  },

  {
    title: "Shows & Theatres",
    searchLabel: "Theatre",
    image: "/categories/shows.jpg",
    href: "/shows",
    description:
      "Broadway productions, theatre performances, and live shows.",
  },

  {
    title: "Concerts",
    searchLabel: "Concerts",
    image: "/categories/concerts.jpg",
    href: "/category/concrts",
    description:
      "Concers attractions, experiences, and events.",
  },
];