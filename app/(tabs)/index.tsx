import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, Eyebrow, PillCTA, Screen } from '../../components/ui';
import {
  colors,
  fonts,
  lineHeight,
  radius,
  shadows,
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
 * Scan home — primary screen.
 * Hero CTA ("Scan now") + last 3 scans preview.
 */
export default function ScanHome() {
  const insets = useSafeAreaInsets();
  const recent = MOCK_SCANS.slice(0, 3);

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + spacing.lg, paddingBottom: spacing.xxl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting */}
        <View style={styles.header}>
          <Eyebrow color={colors.inkMuted}>Home</Eyebrow>
          <Text style={styles.greeting}>What are we scanning?</Text>
          <Text style={styles.sub}>
            Point, shoot, know. No guesswork, no panic spiral.
          </Text>
        </View>

        {/* Big scan CTA card */}
        <View style={styles.scanCard}>
          <View style={styles.scanGlyph}>
            <Text style={styles.scanGlyphText}>◉</Text>
          </View>
          <Text style={styles.scanTitle}>Take a photo</Text>
          <Text style={styles.scanBody}>
            Camera will open. Frame the subject clearly.
          </Text>
          <View style={styles.scanCtaWrap}>
            <PillCTA
              label="Scan now"
              variant="primary"
              fullWidth={false}
              onPress={() => {
                // TODO (Stage 6): open camera, upload to Supabase, run AI detection.
              }}
            />
          </View>
        </View>

        {/* Recent scans */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Eyebrow color={colors.inkMuted}>Recent scans</Eyebrow>
            <Pressable accessibilityRole="button" accessibilityLabel="See all scans">
              <Text style={styles.sectionAction}>See all</Text>
            </Pressable>
          </View>

          <View style={styles.scanList}>
            {recent.map((s) => {
              const r = RISK_COPY[s.risk];
              return (
                <Card key={s.id} tone="surface" style={styles.historyCard}>
                  <View style={styles.historyTopRow}>
                    <Text style={styles.historyCategory}>{s.category.toUpperCase()}</Text>
                    <View style={[styles.chip, chipStyle[r.tone]]}>
                      <Text style={[styles.chipText, chipTextStyle[r.tone]]}>{r.label}</Text>
                    </View>
                  </View>
                  <Text style={styles.historyTitle}>{s.title}</Text>
                  <Text style={styles.historyBody}>{s.summary}</Text>
                </Card>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: spacing.xl,
    gap: spacing.xl,
  },

  // — Header —
  header: { gap: spacing.xs },
  greeting: {
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

  // — Scan card —
  scanCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
    ...shadows.card,
  },
  scanGlyph: {
    width: 72,
    height: 72,
    borderRadius: radius.full,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  scanGlyphText: {
    fontSize: 34,
    color: colors.primary,
    lineHeight: 38,
  },
  scanTitle: {
    fontFamily: fonts.headlineBold,
    fontSize: typeScale.titleLarge,
    lineHeight: lineHeight.titleLarge,
    color: colors.ink,
    letterSpacing: tracking.tight,
  },
  scanBody: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    lineHeight: lineHeight.bodyMedium,
    color: colors.inkMuted,
    textAlign: 'center',
    maxWidth: 280,
    marginBottom: spacing.sm,
  },
  scanCtaWrap: {
    marginTop: spacing.xs,
  },

  // — Section —
  section: { gap: spacing.md },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionAction: {
    fontFamily: fonts.bodyMedium,
    fontSize: typeScale.bodySmall,
    color: colors.primary,
  },
  scanList: { gap: spacing.sm },

  // — History card (shared with history.tsx) —
  historyCard: { gap: spacing.xs },
  historyTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  historyCategory: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    letterSpacing: tracking.labelWide,
    color: colors.inkMuted,
  },
  historyTitle: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleMedium,
    lineHeight: lineHeight.titleMedium,
    color: colors.ink,
  },
  historyBody: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    lineHeight: lineHeight.bodyMedium,
    color: colors.inkSubtle,
  },

  // — Risk chips —
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
