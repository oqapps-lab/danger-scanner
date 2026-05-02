import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Colors, Radius, Spacing, Size } from '@/constants/tokens';
import { Txt } from './Txt';

type Props = {
  label: string;
  onPress: () => void;
  color?: string;
  disabled?: boolean;
  style?: ViewStyle;
};

export function GhostButton({ label, onPress, color = Colors.primary, disabled = false, style }: Props) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <TouchableOpacity
      style={[
        styles.base,
        { borderColor: color },
        disabled && styles.disabled,
        style,
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Txt variant="body" color={color} style={styles.label}>
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
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.4,
  },
  label: {
    fontWeight: '600',
  },
});
