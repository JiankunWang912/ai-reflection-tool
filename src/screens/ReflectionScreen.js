import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography, spacing, radius } from '../theme';
import ProgressBar from '../components/ProgressBar';
import YesNoMaybe from '../components/YesNoMaybe';

const QUESTIONS = [
  { key: 'q1', text: 'Did this task involve private, sensitive, or restricted data?' },
  { key: 'q2', text: 'Is AI-generated text or content likely to appear in the final output?' },
  { key: 'q3', text: 'Did the AI make a substantive intellectual contribution to the work?' },
  { key: 'q4', text: 'Did AI output influence your interpretation, claims, or conclusions?' },
  {
    key: 'q5',
    text: 'Would you feel comfortable explaining this AI use to an advisor, collaborator, or reviewer?',
  },
  { key: 'q6', text: 'Do you think this AI use should be discussed or disclosed?' },
];

const INITIAL = { q1: null, q2: null, q3: null, q4: null, q5: null, q6: null };

export default function ReflectionScreen({ navigation, route }) {
  const { taskKey, contributions } = route.params;
  const [answers, setAnswers] = useState(INITIAL);

  const allAnswered = QUESTIONS.every(q => answers[q.key] !== null);

  function setAnswer(key, val) {
    setAnswers(prev => ({ ...prev, [key]: val }));
  }

  return (
    <View style={styles.outer}>
      <ProgressBar step={3} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.heading}>Reflection questions</Text>
        <Text style={styles.sub}>
          Answer honestly. There are no right or wrong answers — your responses
          shape a personal reflection summary, not a compliance record.
        </Text>
        {QUESTIONS.map(q => (
          <YesNoMaybe
            key={q.key}
            question={q.text}
            value={answers[q.key]}
            onChange={val => setAnswer(q.key, val)}
          />
        ))}
        {!allAnswered && (
          <Text style={styles.hint}>Answer all questions to continue.</Text>
        )}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.next, !allAnswered && styles.nextDisabled]}
          disabled={!allAnswered}
          onPress={() => navigation.navigate('Result', { taskKey, contributions, answers })}
        >
          <Text style={styles.nextText}>See My Reflection</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.md, paddingTop: spacing.md, paddingBottom: spacing.xl },
  heading: { ...typography.h2, marginBottom: spacing.xs },
  sub: { ...typography.small, marginBottom: spacing.md },
  hint: {
    ...typography.small,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
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
    paddingHorizontal: spacing.md,
  },
  nextDisabled: { backgroundColor: colors.border },
  nextText: { color: colors.white, fontWeight: '600' },
});
