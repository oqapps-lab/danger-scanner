import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Colors, Radius, Spacing } from '@/constants/tokens';
import { Txt } from '@/components/primitives/Txt';
import { DangerBadge } from '@/components/primitives/DangerBadge';
import type { Scan } from '@/mock/scans';

const PLACEHOLDER_COLOR: Record<string, string> = {
  danger:  '#1a0a0a',
  warning: '#1a1200',
  safe:    '#0a1a0f',
};

type Props = {
  scan: Scan;
  onPress?: () => void;
};

export function ScanCard({ scan, onPress }: Props) {
  const { width } = useWindowDimensions();
  const cardWidth = (width - Spacing.lg * 2 - Spacing.md) / 2;

  return (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth, height: cardWidth / 0.85, backgroundColor: PLACEHOLDER_COLOR[scan.level] }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {scan.imageUri ? (
        <Image source={{ uri: scan.imageUri }} style={styles.image} resizeMode="cover" />
      ) : null}
      <View style={styles.overlay} />
      <View style={styles.badge}>
        <DangerBadge level={scan.level} />
      </View>
      <View style={styles.info}>
        <Txt variant="badge" style={styles.name} numberOfLines={1}>{scan.name}</Txt>
        <Txt variant="caption" style={styles.date}>{scan.date}</Txt>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.md,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7,19,37,0.45)',
  },
  badge: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
  },
  info: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.sm,
    backgroundColor: 'rgba(7,19,37,0.75)',
  },
  name: {
    color: Colors.white,
  },
  date: {
    color: Colors.textMuted,
    marginTop: 2,
  },
});
