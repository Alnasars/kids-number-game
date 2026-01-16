const cacheName = 'math-v17'; 
const assets = [
  '/kids-number-game/',
  '/kids-number-game/index.html',
  '/kids-number-game/manifest.json',
  '/kids-number-game/icon.png',
  'https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => {
    return Promise.all(keys.filter(key => key !== cacheName).map(key => caches.delete(key)));
  }));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});

