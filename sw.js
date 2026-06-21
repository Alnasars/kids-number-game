const cacheName = 'math-v5'; // Bumped to v5 — added Google Analytics tracking to index.html
const assets = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.min.js'
];

// Install: Saves the files to the phone's memory
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Brain: Saving new game files...');
      return cache.addAll(assets);
    })
  );
  self.skipWaiting(); // Forces the new version to start immediately
});

// Activate: Deletes old versions of the game
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName).map(key => caches.delete(key))
      );
    })
  );
});

// Fetch: Allows the game to work without internet
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
