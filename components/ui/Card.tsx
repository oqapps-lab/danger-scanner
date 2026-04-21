import { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors, radius, shadows, spacing } from '../../constants/tokens';

/**
 * Card — subtle surface with ample internal padding + gentle shadow.
 * Default `tone="surface"` for neutral cards; `tone="danger"` / `tone="safe"`
 * for state-coloured variants.
 */
type Tone = 'surface' | 'danger' | 'safe' | 'warning';

export function Card({
  children,
  tone = 'surface',
  style,
}: {
  children: ReactNode;
  tone?: Tone;
  style?: ViewStyle;
}) {
  return <View style={[styles.base, toneStyle[tone], style]}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.sm,
    ...shadows.card,
  },
});

const toneStyle: Record<Tone, ViewStyle> = {
  surface: { backgroundColor: colors.surface },
  danger: { backgroundColor: colors.primaryContainer },
  safe: { backgroundColor: colors.secondaryContainer },
  warning: { backgroundColor: colors.tertiaryContainer },
};
