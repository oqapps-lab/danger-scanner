import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Eyebrow, PillCTA, Screen } from '../components/ui';
import {
  colors,
  fonts,
  lineHeight,
  radius,
  spacing,
  tracking,
  typeScale,
} from '../constants/tokens';

/**
 * Welcome — first screen an unauthenticated / fresh user sees.
 * Single hero + sub + CTA. Generous whitespace, no carousel.
 */
export default function Welcome() {
  const insets = useSafeAreaInsets();

  return (
    <Screen>
      <View style={[styles.topBrand, { paddingTop: insets.top + spacing.lg }]}>
        <View style={styles.brandMark} />
        <Text style={styles.brandWord}>Danger Scanner</Text>
      </View>

      <View style={styles.hero}>
        <View style={styles.glyphCard}>
          <Text style={styles.glyphText}>⚑</Text>
        </View>

        <Eyebrow color={colors.primary}>Photo-first safety check</Eyebrow>

        <Text style={styles.heroTitle}>
          Scan anything.{'\n'}Know if it's safe.
        </Text>

        <Text style={styles.heroBody}>
          Snap a photo of a bite, a spider, a suspicious plant, a mold patch —
          and get a plain-English read on the risk in seconds.
        </Text>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.xl }]}>
        <PillCTA
          label="Start scanning"
          variant="primary"
          onPress={() => router.replace('/(tabs)')}
        />
        <Text style={styles.footnote}>
          Not medical advice. Call a professional for serious concerns.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  // — Top brand row (logo + wordmark) —
  topBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
  },
  brandMark: {
    width: 10,
    height: 10,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
  },
  brandWord: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleSmall,
    color: colors.ink,
    letterSpacing: tracking.tight,
  },

  // — Hero block (centered-ish) —
  hero: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
    gap: spacing.md,
    marginTop: -spacing.xxl,
  },
  glyphCard: {
    width: 96,
    height: 96,
    borderRadius: radius.xl,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  glyphText: {
    fontSize: 42,
    color: colors.primary,
    lineHeight: 48,
  },
  heroTitle: {
    fontFamily: fonts.display,
    fontSize: typeScale.displayLarge,
    lineHeight: lineHeight.displayLarge,
    color: colors.ink,
    letterSpacing: tracking.tight,
  },
  heroBody: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    lineHeight: lineHeight.bodyLarge,
    color: colors.inkSubtle,
    marginTop: spacing.xs,
    maxWidth: 340,
  },

  // — Footer CTA —
  footer: {
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  footnote: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    lineHeight: lineHeight.bodySmall,
    color: colors.inkMuted,
    textAlign: 'center',
  },
});
