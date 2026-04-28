# Danger Scanner

AI-powered danger identification app. Photo → instant safety assessment for bug bites, spiders, snakes, mold, wall cracks, ticks, caterpillars, poisonous plants. Community geo-map of dangers. One-tap referral to specialists.

## Stack
- Expo SDK 55, React Native, TypeScript (strict)
- expo-router (file-based routing)
- Supabase (auth, database, storage)
- Adapty (subscriptions)
- OpenAI Vision / Claude API (photo-based danger identification)

## Getting started
```bash
npm install
cp .env.example .env  # fill in real keys
npm start
```

See [docs/07-development/RUN-LOCAL.md](docs/07-development/RUN-LOCAL.md) for full setup instructions.

## Screens

| Screen | File | Status |
|--------|------|--------|
| Home | `app/index.tsx` | ✅ Done |
| Playground (primitives) | `app/playground.tsx` | ✅ Done |

## Development

- **Run locally** → [docs/07-development/RUN-LOCAL.md](docs/07-development/RUN-LOCAL.md)
- **Design primitives** → `components/primitives/` — all base UI components
- **Mock data** → `mock/` — no real API needed until Stage 6
- **Design tokens** → `constants/tokens.ts` — colors, spacing, typography

## Project structure
See `CLAUDE.md` for the full architectural rules and the 3-layer layout system.

Documentation lives in `/docs/`:
- `01-research/` — market research, personas, domain research, product brief
- `02-product/` — features, user flows, screens
- `03-practices/` — engineering practices
- `04-ux/` — UX flows, screen designs
- `05-database/` — DB schema, auth, edge functions
- `06-design/` — design system, Stitch references
- `07-development/` — local setup, implementation notes

## Current stage
Stage 3 — Design System & First Screens
