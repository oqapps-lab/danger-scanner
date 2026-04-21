import * as Haptics from 'expo-haptics';
import { ReactNode } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, fonts, radius, shadows, spacing, tracking, typeScale } from '../../constants/tokens';

/**
 * PillCTA — primary call-to-action pill button.
 *
 * Variants:
 *  - `primary`   — filled red (danger action / scan now)
 *  - `secondary` — filled olive (confirm safe / continue)
 *  - `ghost`     — outlined neutral (tertiary action)
 *
 * Handles disabled state (lower opacity + no haptic), busy state (spinner),
 * light tap-haptic feedback.
 */
type Variant = 'primary' | 'secondary' | 'ghost';

type Props = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  busy?: boolean;
  fullWidth?: boolean;
  leading?: ReactNode;
  style?: ViewStyle;
};

export function PillCTA({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  busy = false,
  fullWidth = true,
  leading,
  style,
}: Props) {
  const handlePress = () => {
    if (disabled || busy) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const isDim = disabled || busy;

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDim}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDim, busy }}
      style={({ pressed }) => [
        styles.base,
        variantStyle[variant],
        fullWidth && styles.fullWidth,
        pressed && !isDim && styles.pressed,
        isDim && styles.dim,
        style,
      ]}
    >
      {busy ? (
        <ActivityIndicator color={variant === 'ghost' ? colors.ink : colors.onPrimary} />
      ) : (
        <>
          {leading}
          <Text style={[styles.label, variantLabelStyle[variant]]}>{label}</Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.full,
    minHeight: 54,
    ...shadows.cta,
  },
  fullWidth: { alignSelf: 'stretch' },
  pressed: { transform: [{ scale: 0.98 }], opacity: 0.94 },
  dim: { opacity: 0.45, shadowOpacity: 0 },
  label: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleMedium,
    letterSpacing: tracking.wide,
  },
});

const variantStyle: Record<Variant, ViewStyle> = {
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.secondary },
  ghost: {
    backgroundColor: colors.transparent,
    borderWidth: 1.5,
    borderColor: colors.border,
    shadowOpacity: 0,
  },
};

const variantLabelStyle = {
  primary: { color: colors.onPrimary },
  secondary: { color: colors.onSecondary },
  ghost: { color: colors.ink },
} as const;
