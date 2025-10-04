// Service Worker for caching and offline support
const CACHE_NAME = 'msadeqsirjani-v1.0.0';
const RUNTIME_CACHE = 'runtime-cache';

// Assets to cache on install
const STATIC_CACHE_URLS = [
    '/',
    '/index.html',
    '/assets/css/styles.css',
    '/assets/js/script.js',
    '/assets/img/profile.jpg',
    '/assets/img/profile.webp',
    '/assets/icons/iran.png',
    '/assets/docs/cv/msadeqsirjani-cv.pdf',
    '/sitemap.xml',
    '/robots.txt',
    '/config/manifest.json'
];

// External resources to cache (fonts, libraries)
const EXTERNAL_CACHE_URLS = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css',
    'https://cdn.jsdelivr.net/npm/toastify-js'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching static assets');
            return cache.addAll(STATIC_CACHE_URLS);
        }).then(() => {
            return caches.open(RUNTIME_CACHE);
        }).then((cache) => {
            console.log('Caching external resources');
            return cache.addAll(EXTERNAL_CACHE_URLS.map(url => new Request(url, { mode: 'no-cors' })));
        }).then(() => {
            return self.skipWaiting();
        })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            return self.clients.claim();
        })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip Chrome extensions and external requests we don't want to cache
    if (url.protocol === 'chrome-extension:' ||
        url.hostname === 'www.googletagmanager.com' ||
        url.hostname === 'www.google-analytics.com' ||
        url.hostname === 'formspree.io') {
        return;
    }

    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
                // Return cached response and update cache in background
                event.waitUntil(updateCache(request));
                return cachedResponse;
            }

            // Not in cache, fetch from network
            return fetch(request).then((response) => {
                // Don't cache non-successful responses
                if (!response || response.status !== 200 || response.type === 'error') {
                    return response;
                }

                // Clone the response
                const responseToCache = response.clone();

                // Cache the fetched response
                caches.open(RUNTIME_CACHE).then((cache) => {
                    cache.put(request, responseToCache);
                });

                return response;
            }).catch(() => {
                // Network failed, try to serve offline page if available
                if (request.destination === 'document') {
                    return caches.match('/index.html');
                }
            });
        })
    );
});

// Helper function to update cache in background
async function updateCache(request) {
    try {
        const response = await fetch(request);
        if (response && response.status === 200) {
            const cache = await caches.open(CACHE_NAME);
            await cache.put(request, response);
        }
    } catch (error) {
        // Network request failed, ignore
    }
}

// Message event - handle cache updates from client
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => caches.delete(cacheName))
                );
            })
        );
    }
});
