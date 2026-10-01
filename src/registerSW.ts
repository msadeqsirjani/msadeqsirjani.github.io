export function registerServiceWorker() {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
      const hadController = Boolean(navigator.serviceWorker.controller);

      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          registration.update();

          setInterval(
            () => {
              registration.update();
            },
            60 * 60 * 1000,
          );

          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (
                  newWorker.state === 'installed' &&
                  navigator.serviceWorker.controller
                ) {
                  newWorker.postMessage({type: 'SKIP_WAITING'});
                }
              });
            }
          });
        })
        .catch(error => {
          console.error('SW registration failed:', error);
        });

      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (hadController && !refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    });
  }
}
