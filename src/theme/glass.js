export const glassColors = {
  background: '#EDF2F8',
  glassFill: 'rgba(255, 255, 255, 0.65)',
  glassBorder: 'rgba(255, 255, 255, 0.8)',
  textStrong: '#3E454C',
  textPrimary: '#5A646E',
  textMuted: '#7A8694',
  accent: '#7CC9A6',
  accentDark: '#5AA884',
  accentSoft: 'rgba(124, 201, 166, 0.45)',
  accentSoft2: 'rgba(124, 201, 166, 0.3)',
};

export const glassShadow = {
  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowRadius: 14,
  shadowOffset: { width: 0, height: 6 },
  elevation: 3,
};

export const glassCard = {
  backgroundColor: glassColors.glassFill,
  borderWidth: 1,
  borderColor: glassColors.glassBorder,
  borderRadius: 18,
  ...glassShadow,
};
