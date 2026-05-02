import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Colors, Size, Spacing, FontSize, FontFamily, FontWeight } from '@/constants/tokens';

export type NavTab = {
  key: string;
  label: string;
  icon: React.ReactNode;
};

type Props = {
  tabs: NavTab[];
  activeKey: string;
  onPress: (key: string) => void;
};

export function BottomNav({ tabs, activeKey, onPress }: Props) {
  const insets = useSafeAreaInsets();

  const handlePress = (key: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress(key);
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.bar}>
        {tabs.map((tab) => {
          const isActive = tab.key === activeKey;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tab}
              onPress={() => handlePress(tab.key)}
              activeOpacity={0.7}
            >
              <View style={{ opacity: isActive ? 1 : 0.45 }}>
                {tab.icon}
              </View>
              <Text
                style={[
                  styles.label,
                  { color: isActive ? Colors.primary : Colors.textMuted },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  bar: {
    height: Size.bottomNavHeight,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    height: '100%',
  },
  label: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.caption,
    fontWeight: FontWeight.semibold,
  },
});
