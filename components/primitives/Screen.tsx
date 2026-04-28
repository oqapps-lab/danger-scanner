import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/tokens';

type Props = {
  children: React.ReactNode;
  scroll?: boolean;
  noTopInset?: boolean;
  style?: object;
};

export function Screen({ children, scroll = false, noTopInset = false, style }: Props) {
  const insets = useSafeAreaInsets();

  const containerContent = [
    styles.content,
    { paddingTop: noTopInset ? 0 : insets.top, paddingBottom: insets.bottom },
  ];

  return (
    <View style={[styles.root, style]}>
      {scroll ? (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={containerContent}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={containerContent}>{children}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.canvas,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
});
