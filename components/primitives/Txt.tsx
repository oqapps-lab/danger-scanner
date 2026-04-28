import React from 'react';
import { Text, TextStyle, StyleProp } from 'react-native';
import { TextPresets, TextVariant } from '@/constants/tokens';

type Props = {
  variant?: TextVariant;
  color?: string;
  align?: TextStyle['textAlign'];
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  children: React.ReactNode;
};

export function Txt({
  variant = 'body',
  color,
  align,
  style,
  numberOfLines,
  children,
}: Props) {
  return (
    <Text
      style={[
        TextPresets[variant],
        color !== undefined && { color },
        align !== undefined && { textAlign: align },
        style,
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
}
