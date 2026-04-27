import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@ai_reflection_entries';

export async function loadEntries() {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch {
    return [];
  }
}

export async function saveEntry(entry) {
  try {
    const entries = await loadEntries();
    const newEntry = {
      ...entry,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([newEntry, ...entries]));
    return newEntry;
  } catch (e) {
    console.warn('Failed to save entry:', e);
    return null;
  }
}

export async function deleteEntry(id) {
  try {
    const entries = await loadEntries();
    const filtered = entries.filter(e => e.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.warn('Failed to delete entry:', e);
  }
}
