/* build 2026-11-09 00:33:58 */
const V = 'pocket-ledger-20261109003358';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];
self.addEventListener('install', function (e) { e.waitUntil(caches.open(V).then(function (c) { return c.addAll(ASSETS); }).then(function () { return self.skipWaiting(); })); });
self.addEventListener('activate', function (e) { e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== V; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); })); });
self.addEventListener('fetch', function (e) {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin !== location.origin) return;
  if (/\/sw\.js$/.test(u.pathname)) return;
  e.respondWith(caches.match(r, { ignoreSearch: true }).then(function (hit) {
    const net = fetch(r).then(function (res) { if (res && res.ok) { const copy = res.clone(); caches.open(V).then(function (c) { c.put(r, copy); }); } return res; }).catch(function () { return hit; });
    return hit || net;
  }));
});
