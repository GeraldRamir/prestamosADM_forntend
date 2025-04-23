export function register() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then(reg => {
            console.log('SW registrado:', reg);
          })
          .catch(err => {
            console.log('SW no registrado:', err);
          });
      });
    }
  }
  