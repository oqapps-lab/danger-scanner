import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Colors, FontFamily, FontSize, FontWeight, Spacing } from '@/constants/tokens';
import { Txt } from './Txt';

type Props = {
  value: string | number;
  label?: string;
  color?: string;
  style?: ViewStyle;
};

export function HeroNumber({ value, label, color = Colors.primary, style }: Props) {
  return (
    <View style={[styles.container, style]}>
      <Txt variant="display" color={color} style={styles.value}>
        {String(value)}
      </Txt>
      {label !== undefined && (
        <Txt variant="caption" style={styles.label}>
          {label}
        </Txt>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  value: {
    fontFamily: FontFamily.display,
    fontSize: 48,
    fontWeight: FontWeight.extraBold,
    lineHeight: 52,
  },
  label: {
    marginTop: Spacing.xs,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
