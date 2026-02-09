/**
 * Service Worker for JA Online Coaching
 * Provides offline support, caching strategies, and cache invalidation.
 */

const CACHE_NAME = 'ja-coaching-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/version.json',
  '/instagram-posts.json',
  '/assets/favicon/favicon.ico',
  '/assets/favicon/site.webmanifest'
];

// Install event — cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {
        // Fail gracefully if some assets are not available
        console.debug('Some assets failed to cache during install');
      });
    })
  );
  self.skipWaiting();
});

// Activate event — clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event — cache first for static assets, network first for dynamic content
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Always fetch from network for certain paths (API, instagram-posts.json, version.json)
  if (
    url.pathname.includes('/instagram-posts.json') ||
    url.pathname.includes('/version.json') ||
    url.pathname.includes('api')
  ) {
    event.respondWith(
      fetch(request).catch(() => caches.match(request))
    );
    return;
  }

  // Cache first for static assets
  if (
    url.pathname.match(/\.(js|css|woff2?|ttf|otf|eot|svg|png|jpg|jpeg|webp|ico|gif)$/i) ||
    url.pathname.includes('fonts.googleapis.com') ||
    url.pathname.includes('cdnjs.cloudflare.com')
  ) {
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request).then((response) => {
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clonedResponse);
          });
          return response;
        }).catch(() => {
          // Return a placeholder image for failed image loads
          if (request.destination === 'image') {
            return new Response(
              '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect fill="#222" width="200" height="200"/></svg>',
              { headers: { 'Content-Type': 'image/svg+xml' } }
            );
          }
        });
      })
    );
    return;
  }

  // Network first for HTML and other requests
  event.respondWith(
    fetch(request).catch(() => {
      return caches.match(request) || caches.match('/index.html');
    })
  );
});
