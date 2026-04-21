import { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../constants/tokens';

/**
 * Screen — base wrapper with canvas background + safe-area awareness.
 * Pass `edges={['top']}` to manage bottom insets per-screen (e.g. tab bar).
 */
type Props = {
  children: ReactNode;
  style?: ViewStyle;
  applyTopInset?: boolean;
  applyBottomInset?: boolean;
};

export function Screen({
  children,
  style,
  applyTopInset = false,
  applyBottomInset = false,
}: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.root,
        applyTopInset && { paddingTop: insets.top },
        applyBottomInset && { paddingBottom: insets.bottom },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
});
