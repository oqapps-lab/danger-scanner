import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Colors, Spacing } from '@/constants/tokens';
import { Txt } from './Txt';
import { Eyebrow } from './Eyebrow';

type Props = {
  label: string;
  value: string | number;
  valueColor?: string; // any CSS color string
  style?: ViewStyle;
};

export function Stat({ label, value, valueColor = Colors.text, style }: Props) {
  return (
    <View style={[styles.container, style]}>
      <Eyebrow>{label}</Eyebrow>
      <Txt variant="h2" color={valueColor} style={styles.value}>
        {String(value)}
      </Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.xs,
  },
  value: {
    marginTop: Spacing.xs,
  },
});
