import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Colors, Spacing } from '@/constants/tokens';

type Props = {
  spacing?: number;
  style?: ViewStyle;
};

export function Divider({ spacing = Spacing.lg, style }: Props) {
  return (
    <View style={[styles.divider, { marginVertical: spacing }, style]} />
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
});
