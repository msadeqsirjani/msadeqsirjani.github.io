// Dynamic cache name with build timestamp to force cache invalidation on updates
// Fallback to timestamp if build-time replacement fails
const CACHE_VERSION = '__BUILD_TIME__' !== '__BUILD' + '_TIME__' 
  ? '__BUILD_TIME__' 
  : Date.now().toString();
const CACHE_NAME = `msadeqsirjani-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-cache-${CACHE_VERSION}`;

// Assets to cache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/assets/img/profile.webp',
  '/assets/img/profile.jpg',
  '/assets/data/bibtex.json',
  '/assets/docs/cv/msadeqsirjani-cv.pdf',
];

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.error('Failed to cache assets during install:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Network-first strategy for API calls and forms
  if (request.method !== 'GET' || url.pathname.includes('/api/')) {
    event.respondWith(fetch(request));
    return;
  }

  // Network-first strategy for HTML files to ensure fresh content
  if (request.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname === '/') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache if offline
          return caches.match(request).then((cachedResponse) => {
            return cachedResponse || caches.match('/index.html');
          });
        })
    );
    return;
  }

  // Cache-first strategy for static assets (CSS, JS, images, etc.)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return caches.open(RUNTIME_CACHE).then((cache) => {
        return fetch(request).then((response) => {
          // Cache successful responses
          if (response && response.status === 200) {
            cache.put(request, response.clone());
          }
          return response;
        }).catch((err) => {
          // Return offline fallback for navigation requests
          if (request.mode === 'navigate') {
            return caches.match('/index.html');
          }
          throw err;
        });
      });
    })
  );
});

// Handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
