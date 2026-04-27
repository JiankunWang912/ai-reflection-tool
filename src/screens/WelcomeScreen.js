import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { colors, typography, spacing, radius } from '../theme';

const PRIVACY_POINTS = [
  'All data is stored only on this device. Nothing is sent to any server.',
  'Do not enter sensitive research content, unpublished data, or confidential material.',
  'This tool does not determine whether your AI use is allowed or acceptable.',
  'It is a personal reflection aid — like a lab notebook entry for your AI use.',
];

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.outer}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        <Text style={styles.appName}>AI Reflection Tool</Text>
        <Text style={styles.tagline}>
          A private space to document and reflect on how AI assisted your research.
        </Text>

        {/* Privacy notice — users must read before proceeding */}
        <View style={styles.privacyCard}>
          <Text style={styles.privacyTitle}>Before you begin</Text>
          {PRIVACY_POINTS.map((pt, i) => (
            <View key={i} style={styles.privacyRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.privacyText}>{pt}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.purpose}>
          This tool helps you reflect on AI use, identify considerations around
          authorship and originality, and optionally generate a brief disclosure
          or discussion summary. It is not a compliance system.
        </Text>

        <TouchableOpacity
          style={styles.cta}
          onPress={() => navigation.navigate('TaskSelect')}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaText}>Start Reflection</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.historyLink}
          onPress={() => navigation.navigate('History')}
        >
          <Text style={styles.historyText}>View saved reflections →</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.lg, paddingTop: spacing.xl + spacing.lg },
  appName: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  tagline: { ...typography.body, color: colors.textSecondary, marginBottom: spacing.lg },
  privacyCard: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  privacyTitle: { ...typography.label, color: colors.primary, marginBottom: spacing.sm },
  privacyRow: { flexDirection: 'row', marginBottom: spacing.xs },
  bullet: { color: colors.primary, marginRight: spacing.xs, fontSize: 16 },
  privacyText: { ...typography.small, flex: 1, lineHeight: 20 },
  purpose: { ...typography.body, color: colors.textSecondary, marginBottom: spacing.xl },
  cta: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  ctaText: { color: colors.white, fontSize: 17, fontWeight: '600' },
  historyLink: { alignItems: 'center', paddingVertical: spacing.sm },
  historyText: { ...typography.label, color: colors.primary },
});
