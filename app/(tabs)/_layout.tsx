import { Tabs } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { colors, fonts, tracking, typeScale } from '../../constants/tokens';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.inkMuted,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color }) => <Text style={[styles.icon, { color }]}>⦿</Text>,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => <Text style={[styles.icon, { color }]}>❡</Text>,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.divider,
    height: 84,
    paddingTop: 8,
    paddingBottom: 24,
  },
  tabLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    letterSpacing: tracking.wide,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  icon: {
    fontSize: 20,
    lineHeight: 22,
  },
});
