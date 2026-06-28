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

// Dedup tracker — prevents showing same notification twice
const shown = new Set();

messaging.onBackgroundMessage((payload) => {
  const id = payload.messageId || payload.notification?.title || Date.now();
  if(shown.has(id)) return; // already shown, skip
  shown.add(id);
  setTimeout(()=>shown.delete(id), 5000); // cleanup after 5s

  self.registration.showNotification(payload.notification?.title || 'CleanStreak', {
    body: payload.notification?.body || '',
    icon: '/icon-192.png',
    badge: '/icon-72.png',
    vibrate: [200, 100, 200],
    tag: id // tag also prevents browser from showing duplicates with same tag
  });
});