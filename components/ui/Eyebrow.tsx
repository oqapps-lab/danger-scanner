import { StyleSheet, Text, TextStyle } from 'react-native';
import { colors, fonts, tracking, typeScale } from '../../constants/tokens';

/**
 * Eyebrow — small uppercase letter-spaced label for section kickers.
 * Reads as a tiny typographic "marker" above titles.
 */
export function Eyebrow({
  children,
  color = colors.primary,
  style,
}: {
  children: string;
  color?: string;
  style?: TextStyle;
}) {
  return <Text style={[styles.eyebrow, { color }, style]}>{children.toUpperCase()}</Text>;
}

const styles = StyleSheet.create({
  eyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    letterSpacing: tracking.labelWide,
  },
});
