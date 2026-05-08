self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('cuisine-store').then((cache) => cache.addAll([
      './',
      './index.html',
      './styles.css',
      './scratcher.js',
      './manifest.json',
      './icon-192.png',
      './icon-512.png'
    ]))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});