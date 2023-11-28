// TODO: Create a service worker that caches static assets:
const cacheName = 'static-assets-v1';

const staticAssets = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/images/logo.png',
  ];

  self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(cacheName)
        .then((cache) => {

          return cache.addAll(staticAssets);
        })
    );
  });

  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
        
          if (response) {
            return response;
          }

          return fetch(event.request);
        })
    );
  });

