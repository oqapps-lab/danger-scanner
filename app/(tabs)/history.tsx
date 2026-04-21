import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, Eyebrow, Screen } from '../../components/ui';
import {
  colors,
  fonts,
  lineHeight,
  radius,
  spacing,
  tracking,
  typeScale,
} from '../../constants/tokens';
import { MOCK_SCANS, ScanRisk } from '../../mock/scans';

const RISK_COPY: Record<ScanRisk, { label: string; tone: 'danger' | 'warning' | 'safe' }> = {
  danger: { label: 'Danger', tone: 'danger' },
  caution: { label: 'Caution', tone: 'warning' },
  safe: { label: 'Safe', tone: 'safe' },
};

/**
 * History — full list of past scans.
 * Empty state shown when MOCK_SCANS is empty.
 */
export default function History() {
  const insets = useSafeAreaInsets();
  const scans = MOCK_SCANS;

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + spacing.lg, paddingBottom: spacing.xxl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Eyebrow color={colors.inkMuted}>History</Eyebrow>
          <Text style={styles.title}>Your scan log</Text>
          <Text style={styles.sub}>
            Everything you've checked, sorted by newest. Tap to revisit.
          </Text>
        </View>

        {scans.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyGlyph}>◎</Text>
            <Text style={styles.emptyTitle}>Nothing scanned yet</Text>
            <Text style={styles.emptyBody}>
              Your first scan will show up here with the risk read and notes.
            </Text>
          </View>
        ) : (
          <View style={styles.list}>
            {scans.map((s) => {
              const r = RISK_COPY[s.risk];
              return (
                <Card key={s.id} tone="surface" style={styles.historyCard}>
                  <View style={styles.topRow}>
                    <Text style={styles.category}>{s.category.toUpperCase()}</Text>
                    <View style={[styles.chip, chipStyle[r.tone]]}>
                      <Text style={[styles.chipText, chipTextStyle[r.tone]]}>{r.label}</Text>
                    </View>
                  </View>
                  <Text style={styles.itemTitle}>{s.title}</Text>
                  <Text style={styles.itemBody}>{s.summary}</Text>
                  <Text style={styles.itemMeta}>{formatWhen(s.scannedAt)}</Text>
                </Card>
              );
            })}
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}

function formatWhen(iso: string): string {
  const d = new Date(iso);
  const mo = d.toLocaleString('en-US', { month: 'short' });
  const day = d.getDate();
  const h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = ((h + 11) % 12) + 1;
  return `${mo} ${day} · ${h12}:${m} ${ampm}`;
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: spacing.xl,
    gap: spacing.xl,
  },

  header: { gap: spacing.xs },
  title: {
    fontFamily: fonts.display,
    fontSize: typeScale.displayMedium,
    lineHeight: lineHeight.displayMedium,
    color: colors.ink,
    letterSpacing: tracking.tight,
    marginTop: spacing.xs,
  },
  sub: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    lineHeight: lineHeight.bodyMedium,
    color: colors.inkSubtle,
    maxWidth: 320,
  },

  list: { gap: spacing.sm },

  historyCard: { gap: spacing.xs },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  category: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    letterSpacing: tracking.labelWide,
    color: colors.inkMuted,
  },
  itemTitle: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleMedium,
    lineHeight: lineHeight.titleMedium,
    color: colors.ink,
  },
  itemBody: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    lineHeight: lineHeight.bodyMedium,
    color: colors.inkSubtle,
  },
  itemMeta: {
    fontFamily: fonts.bodyMedium,
    fontSize: typeScale.bodySmall,
    color: colors.inkMuted,
    marginTop: spacing.xxs,
  },

  // Empty state
  empty: {
    alignItems: 'center',
    paddingTop: spacing.huge,
    gap: spacing.sm,
  },
  emptyGlyph: {
    fontSize: 56,
    color: colors.inkGhost,
    lineHeight: 60,
    marginBottom: spacing.xs,
  },
  emptyTitle: {
    fontFamily: fonts.headlineBold,
    fontSize: typeScale.titleLarge,
    color: colors.ink,
  },
  emptyBody: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    lineHeight: lineHeight.bodyMedium,
    color: colors.inkSubtle,
    textAlign: 'center',
    maxWidth: 280,
  },

  // Risk chips
  chip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  chipText: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    letterSpacing: tracking.labelWide,
  },
});

const chipStyle = {
  danger: { backgroundColor: colors.primaryContainer },
  warning: { backgroundColor: colors.tertiaryContainer },
  safe: { backgroundColor: colors.secondaryContainer },
} as const;

const chipTextStyle = {
  danger: { color: colors.primaryDim },
  warning: { color: colors.tertiaryDim },
  safe: { color: colors.secondaryDim },
} as const;
