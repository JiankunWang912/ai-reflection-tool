import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, radius } from '../theme';

// Tappable pill for task-type and AI-contribution selection
// selected=true renders filled teal background
export default function OptionButton({ label, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.btn, selected && styles.btnSelected]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.surface,
  },
  btnSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  label: { ...typography.label, textAlign: 'center' },
  labelSelected: { color: colors.primary },
});
