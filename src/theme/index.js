// Design tokens — all visual decisions live here so screens stay consistent
export const colors = {
  background: '#F7F8FA',
  surface: '#FFFFFF',
  primary: '#2D7D8E',       // muted teal — calm, not alarming
  primaryLight: '#E6F4F6',
  accent: '#5BA4B0',
  text: '#1A1A2E',
  textSecondary: '#5C6370',
  border: '#DDE3EA',
  lowConcern: '#2E7D32',    // dark green
  mediumConcern: '#E65100', // dark orange
  highConcern: '#B71C1C',   // dark red
  lowBg: '#E8F5E9',
  mediumBg: '#FFF3E0',
  highBg: '#FFEBEE',
  white: '#FFFFFF',
};

export const typography = {
  h1: { fontSize: 22, fontWeight: '700', color: colors.text },
  h2: { fontSize: 18, fontWeight: '600', color: colors.text },
  body: { fontSize: 16, color: colors.text, lineHeight: 24 },
  small: { fontSize: 13, color: colors.textSecondary, lineHeight: 20 },
  label: { fontSize: 15, fontWeight: '500', color: colors.text },
  caption: { fontSize: 12, color: colors.textSecondary },
};

export const spacing = {
  xs: 4, sm: 8, md: 16, lg: 24, xl: 32,
};

export const radius = { sm: 8, md: 12, lg: 20 };
