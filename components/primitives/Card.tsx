import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Colors, Radius, Spacing, Shadows } from '@/constants/tokens';

type Props = {
  children: React.ReactNode;
  variant?: 'default' | 'alt';
  shadow?: boolean;
  style?: ViewStyle;
};

export function Card({ children, variant = 'default', shadow = false, style }: Props) {
  return (
    <View
      style={[
        styles.base,
        variant === 'alt' && styles.alt,
        shadow && Shadows.card,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  alt: {
    backgroundColor: Colors.surfaceAlt,
  },
});
