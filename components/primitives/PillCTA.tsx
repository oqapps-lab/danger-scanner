import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Colors, Radius, Spacing, Size, FontFamily, FontSize, FontWeight } from '@/constants/tokens';
import { Txt } from './Txt';

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'danger';
  disabled?: boolean;
  style?: ViewStyle;
};

export function PillCTA({ label, onPress, variant = 'primary', disabled = false, style }: Props) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  };

  return (
    <TouchableOpacity
      style={[
        styles.base,
        variant === 'danger' && styles.danger,
        disabled && styles.disabled,
        style,
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Txt variant="body" style={[styles.label, variant === 'danger' && styles.labelDanger]}>
        {label}
      </Txt>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: Size.tapTarget,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  danger: {
    backgroundColor: Colors.danger,
  },
  disabled: {
    opacity: 0.4,
  },
  label: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
    color: Colors.canvas,
  },
  labelDanger: {
    color: Colors.white,
  },
});
