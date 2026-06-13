const CACHE_NAME = "ticketsoccers-static-v2";

const STATIC_ASSETS = [
  "/",
  "/logo.png",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

const EXTERNAL_BLOCKLIST = [
  "tpwidg.com",
  "ticketnetwork.com",
];

function isExternalWidgetRequest(url) {
  return EXTERNAL_BLOCKLIST.some((domain) => url.hostname.includes(domain));
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Do not cache external ticket widgets.
  // Let tpwidg / TicketNetwork always load fresh CSS, JS, iframe, and assets.
  if (isExternalWidgetRequest(url)) {
    event.respondWith(fetch(request));
    return;
  }

  // Network-first for HTML pages.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, copy);
          });

          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match("/")))
    );

    return;
  }

  // Cache-first for local static assets only.
  if (
    url.origin === self.location.origin &&
    (
      url.pathname.startsWith("/_next/static/") ||
      request.destination === "style" ||
      request.destination === "script" ||
      request.destination === "image" ||
      request.destination === "font"
    )
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;

        return fetch(request).then((response) => {
          const copy = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, copy);
          });

          return response;
        });
      })
    );
  }
});