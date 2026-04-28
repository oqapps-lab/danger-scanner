import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Colors, Radius, Spacing, FontFamily, FontSize, FontWeight } from '@/constants/tokens';
import { Txt } from './Txt';

export type DangerLevel = 'safe' | 'warning' | 'danger';

const levelConfig: Record<DangerLevel, { label: string; bg: string; text: string; border: string }> = {
  safe: {
    label: 'SAFE',
    bg: 'rgba(58, 223, 171, 0.12)',
    text: Colors.primary,
    border: Colors.primary,
  },
  warning: {
    label: 'WARNING',
    bg: Colors.warningSurface,
    text: Colors.warning,
    border: Colors.warning,
  },
  danger: {
    label: 'DANGER',
    bg: Colors.dangerSurface,
    text: Colors.danger,
    border: Colors.danger,
  },
};

type Props = {
  level: DangerLevel;
  customLabel?: string;
  style?: ViewStyle;
};

export function DangerBadge({ level, customLabel, style }: Props) {
  const config = levelConfig[level];

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: config.bg,
          borderColor: config.border,
        },
        style,
      ]}
    >
      <Txt variant="badge" color={config.text} style={styles.text}>
        {customLabel ?? config.label}
      </Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.sm,
    borderWidth: 1,
  },
  text: {
    letterSpacing: 0.8,
  },
});
