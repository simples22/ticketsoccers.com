import type { MetadataRoute } from "next";

const baseUrl = "https://ticketsoccers.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/contact",
    "/help-and-faqs",
    "/privacy-policy",
    "/terms-of-use",
    "/help-and-faqs",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}