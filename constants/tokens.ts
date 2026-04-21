/**
 * Danger Scanner — Design Tokens
 *
 * Mood: "Alert Neutral" — warm paper canvas, muted red danger accent,
 * olive confirm accent, calm serif-free geometry. Photo-first scan UX.
 *
 * Single source of truth. Do NOT inline hex values anywhere else.
 */

// ─── COLORS ─────────────────────────────────────────────────────────────────

export const colors = {
  // Canvas & surface tiers (warm off-white paper)
  canvas: '#F7F7F4',
  canvasDim: '#EFEEE9',
  surface: '#FFFFFF',
  surfaceSubtle: '#FAFAF7',
  surfaceDim: '#EFEEE9',

  // Primary — muted alert red
  primary: '#D64045',
  primaryDim: '#B73338',
  primaryBright: '#E86064',
  primaryContainer: '#FBE0E0',
  onPrimary: '#FFFFFF',
  onPrimaryContainer: '#5A1014',

  // Secondary — olive confirm / safe
  secondary: '#5E8C61',
  secondaryDim: '#4B7350',
  secondaryContainer: '#DDE9DE',
  onSecondary: '#FFFFFF',

  // Tertiary — warm amber warning
  tertiary: '#E8A343',
  tertiaryDim: '#C88B2C',
  tertiaryContainer: '#F7E4C2',

  // Text
  ink: '#1F1F1B',
  inkSubtle: '#4D4E48',
  inkMuted: '#82827B',
  inkGhost: '#CAC9C2',
  onSurface: '#1F1F1B',
  onSurfaceVariant: '#4D4E48',

  // Utility
  outline: '#CAC9C2',
  divider: 'rgba(31,31,27,0.08)',
  border: 'rgba(31,31,27,0.12)',
  shadow: 'rgba(31,31,27,0.06)',
  transparent: 'transparent',
} as const;

export type ColorToken = keyof typeof colors;

// ─── SPACING ────────────────────────────────────────────────────────────────
// 4pt grid. Use tokens only — no magic paddings.

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  xxxxl: 48,
  huge: 64,
} as const;

export type SpacingToken = keyof typeof spacing;

// ─── RADIUS ─────────────────────────────────────────────────────────────────

export const radius = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  full: 999,
} as const;

export type RadiusToken = keyof typeof radius;

// ─── TYPOGRAPHY ─────────────────────────────────────────────────────────────
// Plus Jakarta Sans (display / headlines) + Manrope (body / labels).
// Generous line-heights and letter-spacing for readability.

export const fonts = {
  display: 'PlusJakartaSans_800ExtraBold',
  headlineBold: 'PlusJakartaSans_700Bold',
  headlineSemibold: 'PlusJakartaSans_600SemiBold',
  headlineMedium: 'PlusJakartaSans_500Medium',
  body: 'Manrope_400Regular',
  bodyMedium: 'Manrope_500Medium',
  bodySemibold: 'Manrope_600SemiBold',
  label: 'Manrope_600SemiBold',
} as const;

export const typeScale = {
  displayLarge: 38,
  displayMedium: 28,
  displaySmall: 22,
  titleLarge: 20,
  titleMedium: 17,
  titleSmall: 15,
  bodyLarge: 17,
  bodyMedium: 15,
  bodySmall: 13,
  labelSmall: 11,
} as const;

export const tracking = {
  tight: -0.6,
  normal: 0,
  wide: 0.5,
  labelWide: 1.4,
  labelWidest: 2.0,
} as const;

export const lineHeight = {
  displayLarge: 44,
  displayMedium: 34,
  displaySmall: 28,
  titleLarge: 26,
  titleMedium: 22,
  bodyLarge: 24,
  bodyMedium: 22,
  bodySmall: 18,
  labelSmall: 14,
} as const;

// ─── SHADOWS ────────────────────────────────────────────────────────────────
// Use sparingly. Cards = subtle depth, CTAs = slightly stronger.

export const shadows = {
  card: {
    shadowColor: '#1F1F1B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  cta: {
    shadowColor: '#1F1F1B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
} as const;
