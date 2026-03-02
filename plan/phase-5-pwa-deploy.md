# Phase 5 — PWA & Deployment

## Steps: 12–13
## Status: Not started

---

## Step 12 — PWA Setup

**Concept to explain:**
- PWA (Progressive Web App): lets the app be installed on mobile like a native app
- `manifest.json`: tells the browser the app's name, icon, colors
- Service worker: caches assets for offline use
- **next-pwa is abandoned** — do NOT use it. We use the official Next.js PWA approach instead.

**No external package needed for basic PWA.**
Next.js 16 has an official PWA guide that requires no third-party library.

---

### Approach: Official Next.js PWA (no external lib)

**File to create:** `app/manifest.ts` (dynamic manifest — Next.js App Router convention)
```typescript
import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Math Match',
    short_name: 'MathMatch',
    description: 'Latihan soal matematika',
    start_url: '/',
    display: 'standalone',
    theme_color: '#...',
    background_color: '#...',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
```

> Note: In App Router, place `manifest.ts` directly inside `src/app/` (not inside `public/`)

**File to create:** `public/sw.js` (basic service worker)
- Register it in `layout.tsx` via a `<script>` that calls `navigator.serviceWorker.register('/sw.js')`

**File to modify:** `src/app/layout.tsx`
- No `<link rel="manifest">` needed — Next.js handles it automatically when `app/manifest.ts` exists

**Icons:** Place real PNG files in `public/icons/` — icon-192.png and icon-512.png

---

### Optional Upgrade: Serwist (if offline caching needed)

If you want advanced offline support, use Serwist (the actively maintained next-pwa successor):

```bash
# For Turbopack (Next.js 16 default)
npm i -D @serwist/turbopack esbuild serwist
```

Serwist handles precaching and stale-while-revalidate automatically. See [serwist.pages.dev](https://serwist.pages.dev/docs/next) for setup.

**Recommendation:** Start with the official approach. Upgrade to Serwist only if offline support is required.

**Confirmation:** `npm run build` succeeds. "Add to Home Screen" prompt appears on mobile when served over HTTPS.

---

## Step 13 — Vercel Deployment

**Concept to explain:**
- Vercel auto-detects Next.js projects — no config file needed
- GitHub integration: every push to main triggers auto-deploy
- Environment variables: not needed for this app (no secrets)
- Vercel serves over HTTPS automatically — required for PWA install prompt

**Steps:**
1. Initialize git repo: `git init`
2. Stage and commit: `git add . && git commit -m "initial commit"`
3. Create a repo on github.com and push to it
4. Go to vercel.com → "Add New Project" → import GitHub repo
5. Vercel auto-detects Next.js → click Deploy
6. App is live at a `.vercel.app` URL (HTTPS enabled automatically)

**Confirmation:** App live at Vercel URL, PWA install prompt appears on mobile

---

## Future Enhancements (Post-Launch)

These are ideas for after the app is fully deployed. Not in scope for current build.

| Feature | Notes |
|---------|-------|
| High score / leaderboard | Would need a backend or localStorage |
| User accounts | Auth.js or Supabase |
| Sound effects | Correct/wrong answer audio feedback |
| Animations | Framer Motion for transitions between questions |
| Dark mode | Tailwind `dark:` classes + localStorage preference |
| More operations | Exponents, modulo, fractions |
| Difficulty presets | Easy/Medium/Hard presets that set config automatically |
| Print result | `window.print()` or PDF export of result table |
| Advanced offline | Upgrade PWA to Serwist for full offline support |
