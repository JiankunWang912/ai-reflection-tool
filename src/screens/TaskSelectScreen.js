import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography, spacing, radius } from '../theme';
import ProgressBar from '../components/ProgressBar';
import OptionButton from '../components/OptionButton';

const TASKS = [
  { key: 'literature_review', label: 'Literature review' },
  { key: 'brainstorming', label: 'Brainstorming or ideation' },
  { key: 'writing', label: 'Writing or revising text' },
  { key: 'coding', label: 'Coding' },
  { key: 'debugging', label: 'Debugging' },
  { key: 'data_analysis', label: 'Data analysis' },
  { key: 'presentations', label: 'Preparing presentations' },
  { key: 'communication', label: 'Email or research communication' },
  { key: 'other', label: 'Other' },
];

export default function TaskSelectScreen({ navigation, route }) {
  const [selected, setSelected] = useState(route.params?.taskKey || null);

  return (
    <View style={styles.outer}>
      <ProgressBar step={1} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.heading}>What research task did you just do?</Text>
        <Text style={styles.sub}>Select the one that best fits.</Text>
        {TASKS.map(t => (
          <OptionButton
            key={t.key}
            label={t.label}
            selected={selected === t.key}
            onPress={() => setSelected(t.key)}
          />
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.next, !selected && styles.nextDisabled]}
          disabled={!selected}
          onPress={() => navigation.navigate('AIContribution', { taskKey: selected })}
        >
          <Text style={styles.nextText}>Next →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.md, paddingTop: spacing.md },
  heading: { ...typography.h2, marginBottom: spacing.xs },
  sub: { ...typography.small, marginBottom: spacing.md },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  back: { padding: spacing.sm },
  backText: { ...typography.label, color: colors.textSecondary },
  next: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  nextDisabled: { backgroundColor: colors.border },
  nextText: { color: colors.white, fontWeight: '600' },
});
