import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import {
  Screen,
  Card,
  Txt,
  PillCTA,
  GhostButton,
  IconButton,
  HeroNumber,
  Eyebrow,
  Stat,
  Divider,
  TopBar,
  BottomNav,
  DangerBadge,
  ProgressBar,
  NavTab,
} from '@/components/primitives';
import { Colors, Spacing } from '@/constants/tokens';

const TABS: NavTab[] = [
  { key: 'home', label: 'Home', icon: <Txt variant="badge">🏠</Txt> },
  { key: 'scan', label: 'Scan', icon: <Txt variant="badge">📷</Txt> },
  { key: 'history', label: 'History', icon: <Txt variant="badge">📋</Txt> },
  { key: 'profile', label: 'Profile', icon: <Txt variant="badge">👤</Txt> },
];

function SectionHeader({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Eyebrow color={Colors.textMuted}>{title}</Eyebrow>
      <Divider spacing={Spacing.sm} />
    </View>
  );
}

export default function Playground() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <View style={styles.root}>
      <TopBar
        title="Primitives"
        right={<Txt variant="caption">v0.1</Txt>}
      />

      <Screen scroll noTopInset style={styles.scroll}>
        <View style={styles.inner}>

          {/* ── Typography ── */}
          <SectionHeader title="Typography" />
          <Txt variant="display">Display 32</Txt>
          <Txt variant="h1">Heading 1 — h1</Txt>
          <Txt variant="h2">Heading 2 — h2</Txt>
          <Txt variant="h3">Heading 3 — h3</Txt>
          <Txt variant="body">Body — regular 16pt text</Txt>
          <Txt variant="bodySmall">Body Small — 14pt</Txt>
          <Txt variant="caption">Caption — muted 12pt</Txt>
          <Txt variant="badge">Badge — bold 13pt</Txt>
          <Eyebrow>Eyebrow label</Eyebrow>

          <Divider />

          {/* ── DangerBadge ── */}
          <SectionHeader title="DangerBadge" />
          <View style={styles.row}>
            <DangerBadge level="safe" />
            <DangerBadge level="warning" />
            <DangerBadge level="danger" />
          </View>
          <DangerBadge level="danger" customLabel="EASTERN COPPERHEAD" />

          <Divider />

          {/* ── HeroNumber ── */}
          <SectionHeader title="HeroNumber" />
          <View style={styles.row}>
            <HeroNumber value={42} label="scans" />
            <HeroNumber value="7" label="dangers" color={Colors.danger} />
            <HeroNumber value="66%" label="complete" color={Colors.warning} />
          </View>

          <Divider />

          {/* ── Stat ── */}
          <SectionHeader title="Stat" />
          <View style={styles.row}>
            <Stat label="Category" value="Snake" />
            <Stat label="Threat" value="HIGH" valueColor={Colors.danger} />
            <Stat label="Region" value="SE US" />
          </View>

          <Divider />

          {/* ── ProgressBar ── */}
          <SectionHeader title="ProgressBar" />
          <View style={styles.col}>
            <ProgressBar progress={0.33} />
            <ProgressBar progress={0.66} color={Colors.warning} height={6} />
            <ProgressBar progress={1.0} color={Colors.danger} height={8} />
          </View>

          <Divider />

          {/* ── Card variants ── */}
          <SectionHeader title="Card" />
          <Card>
            <Txt variant="h3">Default card</Txt>
            <Txt variant="bodySmall">surface background, border, 12dp radius</Txt>
          </Card>
          <View style={styles.gap} />
          <Card variant="alt">
            <Txt variant="h3">Alt card</Txt>
            <Txt variant="bodySmall">surfaceAlt — slightly lighter</Txt>
          </Card>
          <View style={styles.gap} />
          <Card shadow>
            <Txt variant="h3">Card with shadow</Txt>
            <Txt variant="bodySmall">elevation: 4, shadowRadius: 8</Txt>
          </Card>

          <Divider />

          {/* ── PillCTA ── */}
          <SectionHeader title="PillCTA" />
          <PillCTA label="NEW SCAN" onPress={() => Alert.alert('PillCTA tapped')} />
          <View style={styles.gap} />
          <PillCTA label="CALL 911" variant="danger" onPress={() => Alert.alert('Danger tapped')} />
          <View style={styles.gap} />
          <PillCTA label="DISABLED" onPress={() => {}} disabled />

          <Divider />

          {/* ── GhostButton ── */}
          <SectionHeader title="GhostButton" />
          <GhostButton label="Learn More" onPress={() => Alert.alert('Ghost tapped')} />
          <View style={styles.gap} />
          <GhostButton label="Dismiss" color={Colors.textMuted} onPress={() => {}} />
          <View style={styles.gap} />
          <GhostButton label="Disabled" onPress={() => {}} disabled />

          <Divider />

          {/* ── IconButton ── */}
          <SectionHeader title="IconButton" />
          <View style={styles.row}>
            <IconButton
              icon={<Txt variant="h2">✕</Txt>}
              onPress={() => Alert.alert('close')}
              variant="ghost"
            />
            <IconButton
              icon={<Txt variant="h2">←</Txt>}
              onPress={() => Alert.alert('back')}
              variant="surface"
            />
            <IconButton
              icon={<Txt variant="h2">⋯</Txt>}
              onPress={() => Alert.alert('menu')}
              variant="surface"
            />
          </View>

          <Divider />

          {/* ── BottomNav preview ── */}
          <SectionHeader title="BottomNav" />
          <Card>
            <BottomNav tabs={TABS} activeKey={activeTab} onPress={setActiveTab} />
          </Card>

          <View style={{ height: Spacing.xxxl }} />
        </View>
      </Screen>
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
  inner: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  sectionHeader: {
    marginTop: Spacing.lg,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.lg,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  col: {
    gap: Spacing.md,
  },
  gap: {
    height: Spacing.sm,
  },
});
