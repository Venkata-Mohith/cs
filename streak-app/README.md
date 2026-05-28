# CleanStreak 🔥

A private, offline-capable habit streak tracker built for breaking bad habits — inspired by Atomic Habits and the "never miss twice" principle.

## Features

- ✅ Daily check-in (clean / slipped)
- 🔥 Streak counter with visual ring progress
- 📅 35-day calendar heatmap
- 📊 Best streak, clean days, success rate
- 🔔 Browser push notifications (morning + evening)
- ⚡ "Never miss twice" reminder after a slip
- 💾 All data stored locally in your browser (localStorage) — nothing sent anywhere
- 📱 Installable as a PWA on mobile and desktop

---

## Deploy to Vercel (private, free)

### Step 1 — Push to GitHub

```bash
cd streak-app
git init
git add .
git commit -m "Initial commit"
git branch -M main
# Create a PRIVATE repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/cleanstreak.git
git push -u origin main
```

Make the repo **private** on GitHub so only you can see it.

### Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New → Project**
3. Import your `cleanstreak` repo
4. Leave all settings as default (it auto-detects static)
5. Click **Deploy**

Your app is live at `https://cleanstreak-xxx.vercel.app`

### Step 3 — Make it fully private on Vercel (optional)

In Vercel project settings → **Password Protection** (Pro plan) OR just use it via the URL which is unguessable.

---

## Local data storage

All data is saved in `localStorage` under the key `cleanstreak`. It lives in your browser on your device — never sent to any server. 

- On **desktop**: data persists as long as you don't clear browser data
- On **mobile**: install as PWA (Add to Home Screen) for best persistence

To backup data: open browser DevTools → Application → Local Storage → copy the `cleanstreak` value.

---

## Notifications

Push notifications use the **Web Notifications API**:
1. Enable morning/evening toggles in the app
2. When prompted, click **Allow** in your browser
3. Notifications fire at 7 AM and 10 PM

> Note: For reliable mobile notifications, install the app as a PWA (Add to Home Screen on iOS/Android) and keep the browser running in background.

---

## Stack

- Pure HTML/CSS/JS — no framework, no dependencies
- Service Worker for offline + notifications
- localStorage for data persistence
- Vercel for static hosting
