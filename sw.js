// CleanStreak v4 — Service Worker
// Handles FCM background push + offline cache

importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// ── Firebase init (same config as index.html) ──────────────────────────────
firebase.initializeApp({
  apiKey: "AIzaSyDOHydBHLiz5FIEzwlaWXLkEwHva_f51vI",
  authDomain: "cleanstreak-107b4.firebaseapp.com",
  projectId: "cleanstreak-107b4",
  storageBucket: "cleanstreak-107b4.firebasestorage.app",
  messagingSenderId: "126724532219",
  appId: "1:126724532219:web:3a5f98af4f3778f82e8d5e"
});

// Keep this worker focused on offline cache and legacy app support.
// Firebase messaging is handled by firebase-messaging-sw.js only.

// ── Notification click ──────────────────────────────────────────────────────
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      if (list.length > 0) return list[0].focus();
      return clients.openWindow('/');
    })
  );
});

// ── Cache for offline use ───────────────────────────────────────────────────
const CACHE = 'cs-v4';
const ASSETS = ['/', '/index.html', '/icon-192.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
