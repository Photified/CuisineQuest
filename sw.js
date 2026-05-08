// Change this version number every time you update your app's code!
const CACHE_NAME = 'cuisine-store-v4'; 

const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './scratcher.js',
  './manifest.json',
  './icon_192.png',
  './icon_512.png'
];

// Install Event - Caches the new assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // Forces the waiting service worker to become the active service worker
});

// Activate Event - Clears out old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache); // Delete old versions
          }
        })
      );
    })
  );
  self.clients.claim(); // Take control of all pages immediately
});

// Fetch Event - Serve from cache, fallback to network
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});