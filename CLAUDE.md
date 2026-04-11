# Danger Scanner

## Stack
- Expo SDK 55, React Native, TypeScript strict
- expo-router (file-based routing)
- Supabase (auth, database, storage)
- Adapty (subscriptions)
- OpenAI Vision / Claude API (photo-based danger identification)

## About
AI-powered danger identification app. Photo → instant safety assessment. Scans: bug bites, spiders, snakes, mold, wall cracks, ticks, caterpillars, poisonous plants. Community geo-map of dangers. One-tap referral to specialists (pest control, mold remediation, structural engineers).

## Target Audience
- Homeowners worried about safety (mold, cracks, pests) — primary
- Parents of young kids (bites, plants, caterpillars)
- Hikers and outdoors people (snakes, spiders, ticks)

## Current Stage
Research (Stage 3)

## Rules
- useWindowDimensions() for responsive
- useSafeAreaInsets() for safe areas
- Haptics.impactAsync() on buttons
- aspectRatio for images
- Mock data from /mock/ (NO real API until Stage 6)
- Functional components + TypeScript strict
- StyleSheet.create (no inline styles)
- No class components
- No any types

## 3-Layer Layout System
1. Background (absolute)
2. Content (flex/scroll)
3. Floating UI (absolute)

## File Structure
- /app/ — screens (expo-router)
- /components/ui/ — shared UI components
- /components/[feature]/ — feature-specific components
- /constants/ — colors, fonts, layout
- /docs/ — all documentation
- /docs/01-research/ — full research (8 danger categories)
