import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { Colors, FontFamily, FontSize, FontWeight } from '@/constants/tokens';

type Props = {
  children: string;
  color?: string;
  style?: TextStyle;
};

export function Eyebrow({ children, color = Colors.primary, style }: Props) {
  return (
    <Text style={[styles.text, { color }, style]}>
      {children.toUpperCase()}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.caption,
    fontWeight: FontWeight.bold,
    letterSpacing: 1.5,
  },
});
