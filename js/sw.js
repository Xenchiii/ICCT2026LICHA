
const APP_CACHE  = 'caraga-app-v1';
const TILE_CACHE = 'caraga-tiles-v1';

/* Pages & assets to cache on install */
const APP_SHELL = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js',
  '/pages/directions.html',
  '/pages/tourist-spots.html',
  '/pages/culture-events.html',
  '/pages/delicacies.html',
  '/pages/notable-personalities.html',
  '/pages/contact.html',
  '/provinces/agusan-norte.html',
  '/provinces/agusan-sur.html',
  '/provinces/surigao-norte.html',
  '/provinces/surigao-sur.html',
  '/provinces/dinagat.html',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet-routing-machine/3.2.12/leaflet-routing-machine.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet-routing-machine/3.2.12/leaflet-routing-machine.min.js',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap',
];

/* ── INSTALL: cache app shell ── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(APP_CACHE).then(cache => {
      return Promise.allSettled(
        APP_SHELL.map(url =>
          cache.add(url).catch(() => { /* skip failed assets */ })
        )
      );
    })
  );
  self.skipWaiting();
});

/* ── ACTIVATE: clean old caches ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== APP_CACHE && k !== TILE_CACHE)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

/* ── FETCH: intercept all requests ── */
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  /* Map tiles — cache-first, auto-cache on network hit */
  if (
    url.hostname.includes('tile.openstreetmap.org') ||
    url.hostname.includes('router.project-osrm.org')
  ) {
    event.respondWith(
      caches.open(TILE_CACHE).then(async cache => {
        const cached = await cache.match(event.request);
        if (cached) return cached;
        try {
          const response = await fetch(event.request);
          if (response.ok) cache.put(event.request, response.clone());
          return response;
        } catch {
          /* Offline & not cached — return blank tile */
          return new Response(
            '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><rect width="256" height="256" fill="#e8f4f3"/><text x="50%" y="50%" font-size="12" fill="#9dc4c0" text-anchor="middle" dy=".3em" font-family="sans-serif">Offline</text></svg>',
            { headers: { 'Content-Type': 'image/svg+xml' } }
          );
        }
      })
    );
    return;
  }

  /* App shell — cache-first, fallback to network */
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        /* Auto-cache same-origin responses */
        if (
          response.ok &&
          event.request.method === 'GET' &&
          url.origin === self.location.origin
        ) {
          const clone = response.clone();
          caches.open(APP_CACHE).then(c => c.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        /* Offline fallback for navigation */
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});

/* ── MESSAGE: pre-cache tile batch from directions page ── */
self.addEventListener('message', async event => {
  if (event.data.type !== 'PRECACHE_TILES') return;

  const { urls } = event.data;
  const cache = await caches.open(TILE_CACHE);
  let done = 0;
  const total = urls.length;

  for (const url of urls) {
    try {
      const already = await cache.match(url);
      if (!already) {
        const response = await fetch(url, { mode: 'cors' });
        if (response.ok) await cache.put(url, response);
      }
      done++;
    } catch { done++; }

    /* Report progress back to page */
    if (event.source) {
      event.source.postMessage({ type: 'PRECACHE_PROGRESS', done, total });
    }

    /* Throttle requests — respect OSM rate limits */
    await new Promise(r => setTimeout(r, 40));
  }

  if (event.source) {
    event.source.postMessage({ type: 'PRECACHE_DONE', total });
  }
});