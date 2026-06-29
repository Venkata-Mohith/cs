importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDOHydBHLiz5FIEzwlaWXLkEwHva_f51vI",
  authDomain: "cleanstreak-107b4.firebaseapp.com",
  projectId: "cleanstreak-107b4",
  storageBucket: "cleanstreak-107b4.firebasestorage.app",
  messagingSenderId: "126724532219",
  appId: "1:126724532219:web:3a5f98af4f3778f82e8d5e"
});

const messaging = firebase.messaging();
const shown = new Set();

messaging.onBackgroundMessage((payload) => {
  const id = payload.messageId || payload.notification?.title || Date.now();
  if(shown.has(id)) return;
  shown.add(id);
  setTimeout(()=>shown.delete(id), 5000);
  self.registration.showNotification(payload.notification?.title || 'CleanStreak', {
    body: payload.notification?.body || '',
    icon: '/icon-192.png',
    badge: '/icon-72.png',
    vibrate: [200, 100, 200],
    tag: id
  });
});

// ── Offline cache ──
const CACHE = 'cs-v4';
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(['/', '/index.html', '/icon-192.png'])));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if(e.request.method!=='GET') return;
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>l.length>0?l[0].focus():clients.openWindow('/')));
});