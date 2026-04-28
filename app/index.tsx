import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import {
  Screen,
  TopBar,
  BottomNav,
  Card,
  Txt,
  PillCTA,
  DangerBadge,
  NavTab,
} from '@/components/primitives';
import { ScanCard } from '@/components/home/ScanCard';
import { Colors, Spacing, Radius, Size } from '@/constants/tokens';
import { RECENT_SCANS, ALERT, SCANS_USED, SCANS_TOTAL } from '@/mock/scans';

const TABS: NavTab[] = [
  { key: 'home',    label: 'Home',    icon: <Feather name="home"       size={22} /> },
  { key: 'scanner', label: 'Scanner', icon: <Feather name="camera"     size={22} /> },
  { key: 'reports', label: 'Reports', icon: <Feather name="file-text"  size={22} /> },
  { key: 'settings',label: 'Settings',icon: <Feather name="settings"   size={22} /> },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 18) return 'Good Afternoon';
  return 'Good Evening';
}

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('home');
  const scansLeft = SCANS_TOTAL - SCANS_USED;

  return (
    <View style={styles.root}>
      <TopBar
        left={<Feather name="shield" size={22} color={Colors.primary} />}
        title="DANGER SCANNER"
        right={
          <View style={styles.avatar}>
            <Feather name="user" size={16} color={Colors.text} />
          </View>
        }
      />

      <Screen scroll noTopInset style={styles.screen}>
        <View style={styles.content}>

          {/* Greeting */}
          <View style={styles.greeting}>
            <Txt variant="display">{getGreeting()}</Txt>
            <TouchableOpacity
              style={styles.scanPill}
              activeOpacity={0.8}
              onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
            >
              <Feather name="lock" size={12} color={Colors.canvas} />
              <Txt variant="badge" style={styles.scanPillText}>
                {scansLeft} OF {SCANS_TOTAL} SCANS LEFT
              </Txt>
            </TouchableOpacity>
          </View>

          {/* Alert card */}
          <Card style={styles.alertCard}>
            <View style={styles.alertRow}>
              <View style={styles.alertIcon}>
                <Feather name="alert-triangle" size={18} color={Colors.warning} />
              </View>
              <View style={styles.alertBody}>
                <Txt variant="caption" style={styles.alertEyebrow}>SEASONAL ALERT</Txt>
                <Txt variant="h3">{ALERT.title}</Txt>
                <Txt variant="bodySmall" style={styles.alertDesc}>{ALERT.body}</Txt>
                <TouchableOpacity activeOpacity={0.7}>
                  <Txt variant="badge" style={styles.alertLink}>Read Protocol →</Txt>
                </TouchableOpacity>
              </View>
              <Feather name="chevron-right" size={18} color={Colors.textMuted} />
            </View>
          </Card>

          {/* Recent scans */}
          <View style={styles.sectionHeader}>
            <Txt variant="h3">Recent Scans</Txt>
            <TouchableOpacity activeOpacity={0.7}>
              <Txt variant="badge" style={styles.viewAll}>VIEW ALL</Txt>
            </TouchableOpacity>
          </View>

          <View style={styles.grid}>
            {RECENT_SCANS.slice(0, 4).map((scan) => (
              <ScanCard key={scan.id} scan={scan} />
            ))}
          </View>

          <View style={{ height: Spacing.xxxl }} />
        </View>
      </Screen>

      {/* NEW SCAN floating button */}
      <View style={styles.ctaWrapper}>
        <PillCTA
          label="NEW SCAN"
          onPress={() => {}}
          style={styles.cta}
        />
      </View>

      <BottomNav tabs={TABS} activeKey={activeTab} onPress={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.canvas,
  },
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    gap: Spacing.lg,
  },
  greeting: {
    gap: Spacing.sm,
  },
  scanPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radius.full,
  },
  scanPillText: {
    color: Colors.canvas,
    fontSize: 11,
  },
  alertCard: {
    backgroundColor: Colors.surface,
  },
  alertRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  alertIcon: {
    marginTop: 2,
  },
  alertBody: {
    flex: 1,
    gap: 4,
  },
  alertEyebrow: {
    color: Colors.warning,
    fontWeight: '700',
  },
  alertDesc: {
    color: Colors.textMuted,
  },
  alertLink: {
    color: Colors.primary,
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewAll: {
    color: Colors.primary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  ctaWrapper: {
    position: 'absolute',
    bottom: 100,
    left: Spacing.lg,
    right: Spacing.lg,
  },
  cta: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
