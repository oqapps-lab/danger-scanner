# Primitives

Base UI components for Danger Scanner. All values come from `constants/tokens.ts` — no hardcoded colors, sizes, or fonts.

## Components

| Component | Description |
|-----------|-------------|
| `Screen` | Root screen wrapper: canvas background + safe area padding. `scroll` prop toggles ScrollView. |
| `Card` | Surface card with border and optional shadow. Variants: `default` / `alt`. |
| `Txt` | Typography. `variant` maps to `TextPresets` (display, h1–h3, body, bodySmall, caption, badge). |
| `PillCTA` | Primary pill button. Triggers `Haptics.Medium`. Variants: `primary` / `danger`. |
| `GhostButton` | Outline button with configurable border/text color. Triggers `Haptics.Light`. |
| `IconButton` | Icon-only tap target (min 48pt). Variants: `ghost` / `surface`. |
| `HeroNumber` | Large numeric display with optional muted label (scan counter, stats). |
| `Eyebrow` | Small all-caps label rendered above headings, 1.5pt letter-spacing. |
| `Stat` | Label + value pair (Eyebrow + h2 Txt). |
| `Divider` | 1px horizontal separator using `Colors.border`. |
| `TopBar` | Fixed top bar with left/center/right slots. Reads `insets.top`. |
| `BottomNav` | Bottom tab bar for 4 tabs (Home / Scan / History / Profile). Reads `insets.bottom`. |
| `DangerBadge` | Colored badge for `safe` / `warning` / `danger` levels. |
| `ProgressBar` | Horizontal progress fill, configurable height and colors. |

## Usage

```tsx
import { Screen, Card, Txt, PillCTA, DangerBadge } from '@/components/primitives';

export default function ExampleScreen() {
  return (
    <Screen>
      <Card>
        <DangerBadge level="danger" />
        <Txt variant="h2">Eastern Copperhead</Txt>
        <Txt variant="body">Venomous — seek medical attention immediately.</Txt>
      </Card>
      <PillCTA label="CALL 911" variant="danger" onPress={() => {}} />
    </Screen>
  );
}
```

## Rules

- Import from `@/components/primitives`, not individual files.
- Never pass hardcoded color strings — use `Colors.*` from tokens.
- Every button must call `Haptics.impactAsync()` on press.
- Use `Screen` as the outermost wrapper on every screen (handles safe areas).
