const CACHE_NAME = 'wa-clone-v3';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './image_b2421865.png' // 👈 Nama file ikon bawaan komputer Anda sudah dimasukkan dengan benar di sini
];

// Menginstal Service Worker dan menyimpan aset ke cache
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Mengaktifkan Service Worker baru dan menghapus cache usang
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Strategi Cache: Mengambil data dari internet terlebih dahulu, jika offline baru ambil dari cache
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
