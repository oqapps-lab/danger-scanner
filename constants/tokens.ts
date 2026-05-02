import { Platform } from 'react-native';
import type { TextStyle } from 'react-native';

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

export const Colors = {
  // Surfaces
  canvas: '#071325',
  surface: '#1F2A3D',
  surfaceAlt: '#2A3548',

  // Brand
  primary: '#3ADFAB',
  primaryDim: '#60FCC6',

  // Text
  text: '#D7E3FC',
  textMuted: '#8496B8',

  // Danger system
  warning: '#FFB86B',
  danger: '#E53935',
  dangerSurface: '#2D0000',
  warningSurface: '#2C1700',

  // Utility
  border: 'rgba(255, 255, 255, 0.08)',
  overlay: 'rgba(7, 19, 37, 0.85)',
  white: '#FFFFFF',
} as const;

export type ColorKey = keyof typeof Colors;
export type ColorValue = (typeof Colors)[ColorKey];

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

// TODO: Replace with @expo-google-fonts/inter and @expo-google-fonts/manrope
// once those packages are installed and fonts are loaded via useFonts().
export const FontFamily = {
  body: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  display: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  mono: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
} as const;

export const FontSize = {
  display: 32,
  h1: 28,
  h2: 20,
  h3: 17,
  body: 16,
  bodySmall: 14,
  caption: 12,
  badge: 13,
} as const;

export const FontWeight = {
  regular: '400' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extraBold: '800' as const,
} as const;

// Pre-built typography objects — use inside StyleSheet.create or as inline style.
export const TextPresets = {
  display: {
    fontFamily: FontFamily.display,
    fontSize: FontSize.display,
    fontWeight: FontWeight.extraBold,
    color: Colors.text,
  } satisfies TextStyle,
  h1: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.h1,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  } satisfies TextStyle,
  h2: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.h2,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  } satisfies TextStyle,
  h3: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.h3,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  } satisfies TextStyle,
  body: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.body,
    fontWeight: FontWeight.regular,
    color: Colors.text,
  } satisfies TextStyle,
  bodySmall: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.bodySmall,
    fontWeight: FontWeight.regular,
    color: Colors.text,
  } satisfies TextStyle,
  caption: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.caption,
    fontWeight: FontWeight.regular,
    color: Colors.textMuted,
  } satisfies TextStyle,
  badge: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.badge,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  } satisfies TextStyle,
} as const;

export type TextVariant = keyof typeof TextPresets;

// ---------------------------------------------------------------------------
// Spacing
// ---------------------------------------------------------------------------

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

// ---------------------------------------------------------------------------
// Border radius
// ---------------------------------------------------------------------------

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 100,
} as const;

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Size = {
  tapTarget: 48,   // minimum touch target — Apple HIG / Material
  iconSm: 20,
  iconMd: 24,
  iconLg: 32,
  cardWidthSm: 140,
  bottomNavHeight: 64,
  topBarHeight: 56,
} as const;

// ---------------------------------------------------------------------------
// Shadows (elevation for Android, shadow* for iOS)
// On dark backgrounds shadows are rarely visible — prefer surface color lift.
// ---------------------------------------------------------------------------

export const Shadows = {
  card: {
    shadowColor: Colors.canvas,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  modal: {
    shadowColor: Colors.canvas,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 24,
    elevation: 12,
  },
} as const;
