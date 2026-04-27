import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';

// Shows "Step N of 6" with a filled progress bar strip
export default function ProgressBar({ step, total = 6 }) {
  const progress = step / total;
  return (
    <View style={styles.container}>
      <View style={styles.barBg}>
        <View style={[styles.barFill, { flex: progress }]} />
        <View style={{ flex: 1 - progress }} />
      </View>
      <Text style={styles.label}>Step {step} of {total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  barBg: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  barFill: { backgroundColor: colors.primary },
  label: { ...typography.caption, marginTop: spacing.xs, textAlign: 'right' },
});
