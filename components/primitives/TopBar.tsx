import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Size, Spacing } from '@/constants/tokens';
import { Txt } from './Txt';

type Props = {
  title?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
};

export function TopBar({ title, left, right }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.bar}>
        <View style={styles.side}>{left}</View>
        <View style={styles.center}>
          {title !== undefined && (
            <Txt variant="badge" style={styles.title} align="center">
              {title}
            </Txt>
          )}
        </View>
        <View style={[styles.side, styles.sideRight]}>{right}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.canvas,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  bar: {
    height: Size.topBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  side: {
    width: Size.tapTarget,
    alignItems: 'flex-start',
  },
  sideRight: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 13,
    letterSpacing: 1.5,
    color: Colors.text,
  },
});
