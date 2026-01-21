const CACHE_NAME = "peakora-cache-v2";
const OFFLINE_URL = "/peakora-site/offline.html";

const FILES_TO_CACHE = [
  "/peakora-site/",
  "/peakora-site/index.html",
  "/peakora-site/assistant.html",
  "/peakora-site/assistant.css",
  "/peakora-site/manifest.json",
  "/peakora-site/assets/peakora-icon-192.png",
  "/peakora-site/assets/peakora-icon-512.png",
  OFFLINE_URL
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request).then(response => {
        return response || caches.match(OFFLINE_URL);
      })
    )
  );
});
