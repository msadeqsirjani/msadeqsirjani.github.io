// Service Worker with aggressive caching strategies
const CACHE_VERSION = 'v1.0.1';
const CACHE_NAME = `msadeqsirjani-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;
const IMAGE_CACHE = `images-${CACHE_VERSION}`;
const FONT_CACHE = `fonts-${CACHE_VERSION}`;
const MAX_CACHE_AGE = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

// Critical assets to cache immediately (Cache First)
const STATIC_CACHE_URLS = [
    '/',
    '/index.html',
    '/assets/css/styles.css',
    '/assets/js/script.js',
    '/assets/img/profile.jpg',
    '/assets/img/profile.webp',
    '/assets/icons/iran.png',
    '/sitemap.xml',
    '/robots.txt',
    '/config/manifest.json'
];

// External resources (Stale While Revalidate)
const EXTERNAL_CACHE_URLS = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css',
    'https://cdn.jsdelivr.net/npm/toastify-js'
];

// Install event - aggressive caching of static assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing Service Worker...');
    event.waitUntil(
        Promise.all([
            // Cache static assets
            caches.open(CACHE_NAME).then((cache) => {
                console.log('[SW] Caching static assets');
                return cache.addAll(STATIC_CACHE_URLS);
            }),
            // Cache external resources
            caches.open(RUNTIME_CACHE).then((cache) => {
                console.log('[SW] Caching external resources');
                return Promise.allSettled(
                    EXTERNAL_CACHE_URLS.map(url =>
                        cache.add(new Request(url, { mode: 'no-cors' }))
                            .catch(err => console.warn('[SW] Failed to cache:', url))
                    )
                );
            })
        ]).then(() => {
            console.log('[SW] Installation complete');
            return self.skipWaiting();
        })
    );
});

// Activate event - clean up old caches aggressively
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating Service Worker...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // Delete any cache that doesn't match current version
                    if (!cacheName.includes(CACHE_VERSION)) {
                        console.log('[SW] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('[SW] Activation complete');
            return self.clients.claim();
        })
    );
});

// Fetch event - intelligent caching strategies
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip analytics, extensions, and form submissions
    if (url.protocol === 'chrome-extension:' ||
        url.hostname === 'www.googletagmanager.com' ||
        url.hostname === 'www.google-analytics.com' ||
        url.hostname === 'formspree.io' ||
        url.pathname.includes('/gtag/')) {
        return;
    }

    // Route to appropriate caching strategy
    if (request.destination === 'image') {
        event.respondWith(cacheFirstStrategy(request, IMAGE_CACHE));
    } else if (request.destination === 'font' || url.pathname.includes('font')) {
        event.respondWith(cacheFirstStrategy(request, FONT_CACHE));
    } else if (url.hostname === self.location.hostname) {
        // Local resources: Network First with cache fallback
        event.respondWith(networkFirstStrategy(request, CACHE_NAME));
    } else {
        // External resources: Stale While Revalidate
        event.respondWith(staleWhileRevalidateStrategy(request, RUNTIME_CACHE));
    }
});

// Cache First Strategy - for images and fonts (rarely change)
async function cacheFirstStrategy(request, cacheName) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            // Check if cache is too old
            const cacheTime = await getCacheTime(cacheName, request);
            if (Date.now() - cacheTime < MAX_CACHE_AGE) {
                return cachedResponse;
            }
        }

        // Fetch from network
        const response = await fetch(request);
        if (response && response.status === 200) {
            const cache = await caches.open(cacheName);
            await cache.put(request, response.clone());
            await setCacheTime(cacheName, request);
        }
        return response;
    } catch (error) {
        // Return cached version if network fails
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        throw error;
    }
}

// Network First Strategy - for HTML, CSS, JS (local assets)
async function networkFirstStrategy(request, cacheName) {
    try {
        const response = await fetch(request);
        if (response && response.status === 200) {
            const cache = await caches.open(cacheName);
            await cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        // Network failed, try cache
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            console.log('[SW] Serving from cache (offline):', request.url);
            return cachedResponse;
        }

        // Return offline page for documents
        if (request.destination === 'document') {
            return caches.match('/index.html');
        }

        throw error;
    }
}

// Stale While Revalidate - for external resources
async function staleWhileRevalidateStrategy(request, cacheName) {
    const cachedResponse = await caches.match(request);

    const fetchPromise = fetch(request).then((response) => {
        if (response && response.status === 200) {
            const cache = caches.open(cacheName);
            cache.then(c => c.put(request, response.clone()));
        }
        return response;
    }).catch(() => cachedResponse);

    return cachedResponse || fetchPromise;
}

// Helper: Get cache timestamp
async function getCacheTime(cacheName, request) {
    const cache = await caches.open(`${cacheName}-meta`);
    const response = await cache.match(request.url);
    if (response) {
        const data = await response.json();
        return data.timestamp;
    }
    return 0;
}

// Helper: Set cache timestamp
async function setCacheTime(cacheName, request) {
    const cache = await caches.open(`${cacheName}-meta`);
    const data = { timestamp: Date.now() };
    const response = new Response(JSON.stringify(data));
    await cache.put(request.url, response);
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-data') {
        event.waitUntil(syncData());
    }
});

async function syncData() {
    console.log('[SW] Syncing data...');
    // Add your sync logic here
}

// Push notifications support
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};
    const options = {
        body: data.body || 'New update available',
        icon: '/assets/icons/iran.png',
        badge: '/assets/icons/iran.png',
        vibrate: [200, 100, 200],
        data: data
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'Notification', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url || '/')
    );
});

// Message handler for cache management
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
            }).then(() => {
                console.log('[SW] All caches cleared');
            })
        );
    }

    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({ version: CACHE_VERSION });
    }
});

// Periodic background sync
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'update-cache') {
        event.waitUntil(updateCriticalAssets());
    }
});

async function updateCriticalAssets() {
    console.log('[SW] Updating critical assets...');
    const cache = await caches.open(CACHE_NAME);
    await Promise.allSettled(
        STATIC_CACHE_URLS.map(url =>
            fetch(url).then(response => {
                if (response && response.status === 200) {
                    return cache.put(url, response);
                }
            }).catch(err => console.warn('[SW] Failed to update:', url))
        )
    );
}
