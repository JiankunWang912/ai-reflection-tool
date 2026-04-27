import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { colors, typography, spacing, radius } from '../theme';

export default function DisclosureScreen({ navigation, route }) {
  const { result } = route.params;

  async function copyToClipboard() {
    await Clipboard.setStringAsync(result.disclosureDraft);
    Alert.alert('Copied', 'Disclosure draft copied to clipboard.');
  }

  return (
    <View style={styles.outer}>
      <ScrollView contentContainerStyle={styles.scroll}>

        <Text style={styles.heading}>Disclosure Draft</Text>
        <Text style={styles.sub}>
          This is a starting point for a disclosure statement or conversation with
          your advisor. Adapt it to fit your context, discipline, and institution's
          norms. This is not a legal or official statement.
        </Text>

        <View style={styles.draftCard}>
          <Text style={styles.draftText}>{result.disclosureDraft}</Text>
        </View>

        <Text style={styles.hint}>
          You may adapt this for an author contribution section, methods note,
          cover letter, or conversation with your advisor or collaborators.
        </Text>

        <TouchableOpacity style={styles.copyBtn} onPress={copyToClipboard}>
          <Text style={styles.copyBtnText}>Copy to Clipboard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>← Back to Result</Text>
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
  heading: { ...typography.h2, marginBottom: spacing.xs },
  sub: { ...typography.small, marginBottom: spacing.md, lineHeight: 20 },
  draftCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  draftText: { ...typography.body, lineHeight: 26 },
  hint: { ...typography.small, marginBottom: spacing.md, lineHeight: 20 },
  copyBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  copyBtnText: { color: colors.white, fontSize: 16, fontWeight: '600' },
  backBtn: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  backBtnText: { ...typography.label, color: colors.textSecondary },
  linkBtn: { alignItems: 'center', paddingVertical: spacing.sm },
  linkBtnText: { ...typography.label, color: colors.textSecondary },
});
