const CACHE = 'cleanstreak-v2';
const FILES = ['/', '/index.html'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

// Message from app to set notification schedule
let notifSettings = { morning: false, evening: false };

self.addEventListener('message', e => {
  if (e.data?.type === 'SET_NOTIFS') {
    notifSettings = e.data.notifs || {};
  }
});

// Daily notification check — runs when SW starts
function scheduleDailyCheck() {
  const now = new Date();
  const morningTime = new Date(now);
  morningTime.setHours(7, 0, 0, 0);
  const eveningTime = new Date(now);
  eveningTime.setHours(22, 0, 0, 0);

  // Check if we should fire morning notif
  if (notifSettings.morning) {
    const msUntilMorning = morningTime > now
      ? morningTime - now
      : (morningTime.setDate(morningTime.getDate() + 1)) - now;
    setTimeout(() => {
      self.registration.showNotification('Good morning 🌅', {
        body: 'Start strong today. Your streak is waiting.',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: 'morning',
        data: { url: '/' },
      });
    }, msUntilMorning);
  }

  if (notifSettings.evening) {
    const msUntilEvening = eveningTime > now
      ? eveningTime - now
      : (eveningTime.setDate(eveningTime.getDate() + 1)) - now;
    setTimeout(() => {
      self.registration.showNotification('Evening check-in 🌙', {
        body: 'How did today go? Log your day and protect your streak.',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: 'evening',
        data: { url: '/' },
        actions: [
          { action: 'clean', title: '✓ Stayed clean' },
          { action: 'slip', title: '↺ Slipped' },
        ],
      });
    }, msUntilEvening);
  }
}

scheduleDailyCheck();

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      for (const c of clientList) {
        if (c.url && 'focus' in c) return c.focus();
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});
