// Unblocked Games G+ Service Worker
// Version: 1.0.2
const CACHE_NAME = 'gplus-cache-1793153209005';

const PRECACHE_ASSETS = [
  '/',
  '/install/',
  '/manifest.webmanifest',
  '/assets/img/icon-192.png',
  '/assets/img/icon-512.png',
  '/assets/img/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME) {
              return caches.delete(key);
            }
          })
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // STRICT RULE: Do NOT intercept or cache cross-origin requests (e.g. external game iframes, CDNs)
  if (url.origin !== self.location.origin) return;

  // Navigation requests bypass the browser's 10-minute HTML cache.
  // A new deployment is therefore picked up on the next visit/refresh.
  const networkRequest =
    event.request.mode === 'navigate'
      ? new Request(event.request, { cache: 'no-store' })
      : event.request;

  event.respondWith(
    fetch(networkRequest)
      .then((response) => {
        // Only cache valid standard 200 responses
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(async () => {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) return cachedResponse;
        if (event.request.mode === 'navigate') {
          const fallback = await caches.match('/');
          if (fallback) return fallback;
        }
        return new Response('Network offline', { status: 503, statusText: 'Offline' });
      })
  );
});
