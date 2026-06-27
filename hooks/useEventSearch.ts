"use client";
import { useEffect, useRef, useState } from "react";
import type { UiEvent } from "@/lib/tevo/types";

export function useEventSearch(query: string, delay = 300) {
  const [results, setResults] = useState<UiEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const cache = useRef<Map<string, UiEvent[]>>(new Map());

  useEffect(() => {
    const q = query.trim();
    if (!q) { setResults([]); return; }
    if (cache.current.has(q)) { setResults(cache.current.get(q)!); return; }

    setLoading(true);
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal: ctrl.signal });
        const data = await res.json();
        cache.current.set(q, data.results ?? []);
        setResults(data.results ?? []);
      } catch { /* aborted */ } finally { setLoading(false); }
    }, delay);

    return () => { clearTimeout(t); ctrl.abort(); };
  }, [query, delay]);

  return { results, loading };
}