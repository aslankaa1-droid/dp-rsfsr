// Service Worker · ЦП РСФСР
// Стратегии: cache-first для shell-ассетов; network-first для HTML с offline-fallback;
// stale-while-revalidate для статики; чёрный список для API/динамики.

const VERSION = 'rsfsr-app-v2-2026.05.24';
const SHELL_CACHE = `${VERSION}-shell`;
const RUNTIME_CACHE = `${VERSION}-runtime`;
const OFFLINE_URL = './offline.html';

const SHELL_ASSETS = [
  './',
  './index.html',
  './offline.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-192-maskable.png',
  './icons/icon-512-maskable.png',
  './icons/icon-192.svg',
  './icons/icon-512.svg',
  './icons/apple-touch-icon.png',
  './icons/og-image.png',
  './screenshots/screen-01-home.png',
  './screenshots/screen-02-assets.png',
  './screenshots/screen-03-cfa.png',
  './screenshots/screen-04-profile.png',
  '../../_shared/brand.css',
  '../../_shared/i18n.js',
  '../../_shared/app.js'
];

// Сразу кэшируем shell, не блокируясь на одиночных ошибках
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL_CACHE);
    await Promise.allSettled(
      SHELL_ASSETS.map((url) => cache.add(url).catch(() => null))
    );
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

// Helper: проверка, что это запрос на навигацию (HTML-документ)
function isNavigation(request) {
  return request.mode === 'navigate' ||
         (request.method === 'GET' && request.headers.get('accept')?.includes('text/html'));
}

function isApi(url) {
  return /\/api\/|\/v1\/|\.json($|\?)/i.test(url.pathname);
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Внешние домены — пропускаем (network only)
  if (url.origin !== self.location.origin) return;

  // HTML / навигация — network-first с offline-fallback
  if (isNavigation(request)) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request);
        const cache = await caches.open(RUNTIME_CACHE);
        cache.put(request, fresh.clone());
        return fresh;
      } catch (e) {
        const cached = await caches.match(request);
        if (cached) return cached;
        return caches.match(OFFLINE_URL);
      }
    })());
    return;
  }

  // API / JSON — network-only, не кэшируем
  if (isApi(url)) {
    event.respondWith(
      fetch(request).catch(() => new Response(JSON.stringify({
        error: 'offline',
        message: 'Соединение отсутствует. Данные будут синхронизированы при подключении.'
      }), { status: 503, headers: { 'Content-Type': 'application/json; charset=utf-8' } }))
    );
    return;
  }

  // Shell / статика — stale-while-revalidate
  event.respondWith((async () => {
    const cache = await caches.open(RUNTIME_CACHE);
    const cached = await cache.match(request);
    const fetchPromise = fetch(request).then((response) => {
      if (response && response.status === 200) cache.put(request, response.clone());
      return response;
    }).catch(() => cached);
    return cached || fetchPromise;
  })());
});

// Push-уведомления (заготовка под будущий backend; FCM/HMS — позднее)
self.addEventListener('push', (event) => {
  const data = (() => {
    try { return event.data ? event.data.json() : {}; } catch (_) { return { title: 'ЦП РСФСР', body: event.data?.text() || '' }; }
  })();
  const title = data.title || 'ЦП РСФСР';
  const options = {
    body: data.body || '',
    icon: './icons/icon-192.png',
    badge: './icons/icon-192-mono.png',
    tag: data.tag || 'rsfsr',
    data: data.url ? { url: data.url } : undefined,
    requireInteraction: false
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || './index.html';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      const existing = list.find((c) => c.url.includes('rsfsr'));
      if (existing) { existing.focus(); existing.navigate(url); return; }
      return self.clients.openWindow(url);
    })
  );
});

// Sync — заглушка, для будущей фоновой отправки заявок
self.addEventListener('sync', (event) => {
  if (event.tag === 'rsfsr-sync') {
    event.waitUntil(Promise.resolve());
  }
});
