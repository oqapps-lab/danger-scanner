# Running Locally

## Prerequisites
- Node.js 18+
- Expo Go app on your phone (iOS or Android)

## Steps

```bash
# 1. Install dependencies
npm install

# 2. Copy env file (fill in keys if you have them — not required for UI dev)
cp .env.example .env

# 3. Start Metro bundler
npm start
```

## Open on device

After `npm start` a QR code appears in the terminal.

- **Android** — open Expo Go → scan QR
- **iOS** — open Camera app → scan QR

The app reloads automatically on file save (hot reload).

## Emulator

```bash
npm run android   # Android emulator (requires Android Studio)
npm run ios       # iOS Simulator (Mac only)
```

## Notes
- Mock data is in `/mock/` — no real API needed until Stage 6
- Playground screen shows all UI primitives: navigate to `/playground` in Expo Go or open `app/playground.tsx`
