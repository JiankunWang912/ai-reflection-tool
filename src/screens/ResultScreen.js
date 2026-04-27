import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { colors, typography, spacing, radius } from '../theme';
import { computeReflection } from '../utils/reflectionLogic';
import { saveEntry } from '../utils/storage';

export default function ResultScreen({ navigation, route }) {
  const { taskKey, contributions, answers } = route.params;
  const result = computeReflection({ taskKey, contributions, answers });
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    await saveEntry({
      taskKey,
      contributions,
      answers,
      category: result.category,
      categoryLabel: result.categoryLabel,
      summary: result.summary,
    });
    setSaved(true);
    Alert.alert('Saved', 'This reflection has been saved to your local history.');
  }

  return (
    <View style={styles.outer}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Category badge — framed as guidance, not verdict */}
        <View style={[styles.badge, { backgroundColor: result.categoryBgColor, borderColor: result.categoryColor }]}>
          <Text style={[styles.badgeLabel, { color: result.categoryColor }]}>
            {result.categoryLabel}
          </Text>
          <Text style={[styles.badgeNote, { color: result.categoryColor }]}>
            Reflective guidance — not a rule or judgment
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>What this means</Text>
          <Text style={styles.cardBody}>{result.guidance}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your AI-use summary</Text>
          <Text style={styles.cardBody}>{result.summary}</Text>
        </View>

        {/* Reference examples so users can calibrate the categories */}
        <View style={styles.samplesCard}>
          <Text style={styles.samplesTitle}>Sample outputs for reference</Text>
          <Text style={styles.samplesBody}>
            <Text style={{ color: colors.lowConcern, fontWeight: '600' }}>Low concern: </Text>
            {'Routine support (e.g., spell-check, quick syntax fix) with no significant authorship implications.\n\n'}
            <Text style={{ color: colors.mediumConcern, fontWeight: '600' }}>Medium concern: </Text>
            {'AI contributed ideas or generated text that appears in the work — worth discussing with advisor.\n\n'}
            <Text style={{ color: colors.highConcern, fontWeight: '600' }}>High concern: </Text>
            {'AI played a substantial intellectual role; explicit disclosure in author statements is recommended.'}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('Disclosure', { result, taskKey, contributions })}
        >
          <Text style={styles.primaryBtnText}>Generate Disclosure Draft →</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.secondaryBtn, saved && styles.savedBtn]}
          onPress={handleSave}
          disabled={saved}
        >
          <Text style={[styles.secondaryBtnText, saved && styles.savedText]}>
            {saved ? '✓ Saved to History' : 'Save to History'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkBtn}
          onPress={() => navigation.navigate('Welcome')}
        >
          <Text style={styles.linkBtnText}>Start New Reflection</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.md, paddingTop: spacing.lg, paddingBottom: spacing.xl },
  badge: {
    borderRadius: radius.md,
    borderWidth: 1.5,
    padding: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  badgeLabel: { fontSize: 22, fontWeight: '700', marginBottom: 2 },
  badgeNote: { fontSize: 12 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: { ...typography.label, marginBottom: spacing.xs },
  cardBody: { ...typography.body, lineHeight: 24 },
  samplesCard: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  samplesTitle: { ...typography.label, color: colors.primary, marginBottom: spacing.xs },
  samplesBody: { ...typography.small, lineHeight: 20 },
  primaryBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  primaryBtnText: { color: colors.white, fontSize: 16, fontWeight: '600' },
  secondaryBtn: {
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  savedBtn: { borderColor: colors.border },
  secondaryBtnText: { color: colors.primary, fontSize: 16, fontWeight: '500' },
  savedText: { color: colors.textSecondary },
  linkBtn: { alignItems: 'center', paddingVertical: spacing.sm },
  linkBtnText: { ...typography.label, color: colors.textSecondary },
});
