import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colors, typography, spacing, radius } from '../theme';
import { loadEntries, deleteEntry } from '../utils/storage';

const TASK_LABELS = {
  literature_review: 'Literature review',
  brainstorming: 'Brainstorming',
  writing: 'Writing / revising',
  coding: 'Coding',
  debugging: 'Debugging',
  data_analysis: 'Data analysis',
  presentations: 'Presentations',
  communication: 'Research communication',
  other: 'Other',
};

const CATEGORY_COLORS = {
  low: '#2E7D32',
  medium: '#E65100',
  high: '#B71C1C',
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

export default function HistoryScreen({ navigation }) {
  const [entries, setEntries] = useState([]);

  // Reload entries each time this screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadEntries().then(setEntries);
    }, [])
  );

  function confirmDelete(id) {
    Alert.alert(
      'Delete Entry',
      'Remove this reflection from your local history?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteEntry(id);
            setEntries(prev => prev.filter(e => e.id !== id));
          },
        },
      ]
    );
  }

  function renderItem({ item }) {
    const catColor = CATEGORY_COLORS[item.category] || colors.textSecondary;
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.date}>{formatDate(item.date)}</Text>
          <Text style={[styles.category, { color: catColor }]}>{item.categoryLabel}</Text>
        </View>
        <Text style={styles.taskLabel}>{TASK_LABELS[item.taskKey] || item.taskKey}</Text>
        <Text style={styles.summary} numberOfLines={3}>{item.summary}</Text>
        <TouchableOpacity onPress={() => confirmDelete(item.id)} style={styles.deleteBtn}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.outer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Saved Reflections</Text>
      </View>
      {entries.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No reflections saved yet.</Text>
          <Text style={styles.emptyHint}>Complete a reflection to see it here.</Text>
        </View>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outer: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  back: { marginRight: spacing.md },
  backText: { ...typography.label, color: colors.primary },
  heading: { ...typography.h2 },
  list: { padding: spacing.md },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  date: { ...typography.caption },
  category: { ...typography.caption, fontWeight: '600' },
  taskLabel: { ...typography.label, marginBottom: spacing.xs },
  summary: { ...typography.small, lineHeight: 20, color: colors.textSecondary },
  deleteBtn: { alignSelf: 'flex-end', marginTop: spacing.sm },
  deleteText: { ...typography.small, color: '#B71C1C' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  emptyText: { ...typography.body, color: colors.textSecondary },
  emptyHint: { ...typography.small, marginTop: spacing.xs },
});
