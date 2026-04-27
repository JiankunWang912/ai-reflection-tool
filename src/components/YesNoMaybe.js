import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography, spacing, radius } from '../theme';

const OPTIONS = ['yes', 'maybe', 'no'];
const LABELS = { yes: 'Yes', maybe: 'Maybe', no: 'No' };

// One reflection question row with three toggle buttons (Yes / Maybe / No)
export default function YesNoMaybe({ question, value, onChange }) {
  return (
    <View style={styles.row}>
      <Text style={styles.question}>{question}</Text>
      <View style={styles.toggle}>
        {OPTIONS.map(opt => (
          <TouchableOpacity
            key={opt}
            style={[styles.btn, value === opt && styles.btnActive]}
            onPress={() => onChange(opt)}
            activeOpacity={0.75}
          >
            <Text style={[styles.btnLabel, value === opt && styles.btnLabelActive]}>
              {LABELS[opt]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  question: { ...typography.body, marginBottom: spacing.sm },
  toggle: { flexDirection: 'row', gap: spacing.sm },
  btn: {
    flex: 1,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.sm,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
  },
  btnActive: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  btnLabel: { ...typography.small, color: colors.textSecondary },
  btnLabelActive: { color: colors.primary, fontWeight: '600' },
});
