const cacheName = 'math-kids-v32'; // Change this number to force update

self.addEventListener('install', (event) => {
    // Force the waiting service worker to become the active service worker
    self.skipWaiting();
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll([
                './',
                './index.html',
                './manifest.json'
                // Add icons here if you have them
            ]);
        })
    );
});

self.addEventListener('activate', (event) => {
    // Immediately take control of all open tabs
    event.waitUntil(clients.claim());
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (name !== cacheName) {
                        console.log('Clearing old cache:', name);
                        return caches.delete(name);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    // Network first, then cache (Best for development/updates)
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});

