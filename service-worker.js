/**
 * service-worker.js – Chloé Aventure v0.9
 * Network First pour les fichiers JS — toujours la dernière version
 */

const CACHE_NAME = 'summer-adventure-v1';

// Fichiers JS : toujours depuis le réseau (network first)
const NETWORK_FIRST = ['app.js', 'api.js', 'config.js'];

// Fichiers statiques : cache first (icons, fonts)
const CACHE_FIRST = [
  './', './index.html', './style.css', './manifest.json',
  './icons/icon-192.png', './icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(c => c.addAll(CACHE_FIRST))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => {
  if (e.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Google Apps Script : toujours réseau, jamais cache
  if (url.hostname.includes('script.google.com')) {
    e.respondWith(
      fetch(e.request).catch(() =>
        new Response(JSON.stringify({ error: 'Offline' }), {
          headers: { 'Content-Type': 'application/json' }
        })
      )
    );
    return;
  }

  // Fichiers JS : Network First — toujours la dernière version
  const isNetworkFirst = NETWORK_FIRST.some(f => url.pathname.endsWith(f));
  if (isNetworkFirst) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          // Met en cache la nouvelle version
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() => caches.match(e.request)) // Fallback cache si hors-ligne
    );
    return;
  }

  // Autres fichiers : Cache First
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (!res || res.status !== 200 || res.type === 'opaque') return res;
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        return res;
      }).catch(() =>
        e.request.mode === 'navigate' ? caches.match('./index.html') : null
      );
    })
  );
});
