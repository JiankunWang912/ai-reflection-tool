import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography, spacing, radius } from '../theme';
import ProgressBar from '../components/ProgressBar';
import OptionButton from '../components/OptionButton';

const CONTRIBUTIONS = [
  { key: 'suggested_ideas', label: 'Suggested ideas or directions' },
  { key: 'rewrote_text', label: 'Rewrote or polished sentences' },
  { key: 'generated_code', label: 'Generated code' },
  { key: 'explained_error', label: 'Explained an error or concept' },
  { key: 'summarized', label: 'Summarized papers or notes' },
  { key: 'analysis_steps', label: 'Suggested analysis steps' },
  { key: 'organized_notes', label: 'Organized notes or materials' },
  { key: 'created_outline', label: 'Created an outline or structure' },
  { key: 'other', label: 'Other' },
];

export default function AIContributionScreen({ navigation, route }) {
  const { taskKey } = route.params;
  const [selected, setSelected] = useState([]);

  function toggle(key) {
    setSelected(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  }

  return (
    <View style={styles.outer}>
      <ProgressBar step={2} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.heading}>What did the AI help with?</Text>
        <Text style={styles.sub}>Select all that apply.</Text>
        {CONTRIBUTIONS.map(c => (
          <OptionButton
            key={c.key}
            label={c.label}
            selected={selected.includes(c.key)}
            onPress={() => toggle(c.key)}
          />
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.next, selected.length === 0 && styles.nextDisabled]}
          disabled={selected.length === 0}
          onPress={() => navigation.navigate('Reflection', { taskKey, contributions: selected })}
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
