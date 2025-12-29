export function registerServiceWorker() {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
      caches.keys().then((cacheNames) => {
        cacheNames.forEach((cacheName) => {
          if (cacheName.startsWith('msadeqsirjani-') || cacheName.startsWith('runtime-cache-')) {
            caches.delete(cacheName).then(() => {
              if (import.meta.env.DEV) {
                console.log('Cleared old cache:', cacheName);
              }
            });
          }
        });
      });

      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          if (import.meta.env.DEV) {
            console.log('SW registered:', registration);
          }

          registration.update();

          setInterval(() => {
            registration.update();
          }, 60 * 60 * 1000);

          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  if (import.meta.env.DEV) {
                    console.log('New version available! Updating...');
                  }
                  newWorker.postMessage({ type: 'SKIP_WAITING' });
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('SW registration failed:', error);
        });

      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          if (import.meta.env.DEV) {
            console.log('New service worker activated, reloading...');
          }
          window.location.reload();
        }
      });
    });
  }
}
