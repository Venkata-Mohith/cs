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

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification?.title || 'CleanStreak', {
    body: payload.notification?.body || '',
    icon: '/icon-192.png',
    badge: '/icon-72.png',
    vibrate: [200, 100, 200]
  });
});