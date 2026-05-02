import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Colors, Radius, Size } from '@/constants/tokens';

type Props = {
  icon: React.ReactNode;
  onPress: () => void;
  variant?: 'ghost' | 'surface';
  size?: number;
  style?: ViewStyle;
};

export function IconButton({
  icon,
  onPress,
  variant = 'ghost',
  size = Size.tapTarget,
  style,
}: Props) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <TouchableOpacity
      style={[
        styles.base,
        { width: size, height: size, borderRadius: size / 2 },
        variant === 'surface' && styles.surface,
        style,
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  surface: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
});
