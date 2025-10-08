export function registerServiceWorker() {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
      // Clear old caches on load to ensure fresh start
      caches.keys().then((cacheNames) => {
        cacheNames.forEach((cacheName) => {
          // Delete caches that don't match the current pattern
          if (cacheName.startsWith('msadeqsirjani-') || cacheName.startsWith('runtime-cache-')) {
            caches.delete(cacheName).then(() => {
              console.log('Cleared old cache:', cacheName);
            });
          }
        });
      });

      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered:', registration);

          // Force check for updates
          registration.update();

          // Check for updates periodically (every hour)
          setInterval(() => {
            registration.update();
          }, 60 * 60 * 1000);

          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New service worker available, auto-update
                  console.log('New version available! Updating...');
                  newWorker.postMessage({ type: 'SKIP_WAITING' });
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('SW registration failed:', error);
        });

      // Handle controller change (new SW activated)
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          console.log('New service worker activated, reloading...');
          window.location.reload();
        }
      });
    });
  }
}
