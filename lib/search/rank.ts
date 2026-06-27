import type { UiEvent } from "@/lib/tevo/types";

// Relevance ranking for search results. If you already have a lib/search/rank.ts,
// merge this rankEvents export into it (this file is skipped when it already exists).
export function rankEvents(events: UiEvent[], q: string): UiEvent[] {
  const query = q.toLowerCase();
  const score = (e: UiEvent) => {
    const name = e.name.toLowerCase();
    if (name === query) return 0;
    if (name.startsWith(query)) return 1;
    if (name.includes(query)) return 2;
    if (`${e.venueName} ${e.city}`.toLowerCase().includes(query)) return 3;
    return 4;
  };
  return [...events].sort((a, b) => {
    const d = score(a) - score(b);
    return d !== 0 ? d : new Date(a.date).getTime() - new Date(b.date).getTime();
  });
}