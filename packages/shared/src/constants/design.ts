export const COLORS = {
  medicalBlue: '#2563EB',
  medicalBlueLight: '#3B82F6',
  medicalBlueDark: '#1D4ED8',
  healthcareGreen: '#16A34A',
  healthcareGreenLight: '#22C55E',
  healthcareGreenDark: '#15803D',
  white: '#FFFFFF',
  lightGrey: '#F8FAFC',
  grey: '#E2E8F0',
  darkGrey: '#64748B',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  error: '#DC2626',
  warning: '#F59E0B',
  success: '#16A34A',
  info: '#2563EB',
  riskGreen: '#16A34A',
  riskAmber: '#F59E0B',
  riskRed: '#DC2626',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const SHADOWS = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
} as const;

export const FONTS = {
  sans: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
  mono: "'Geist Mono', 'SF Mono', monospace",
} as const;

export const FONT_SIZES = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
} as const;

export const ANIMATION = {
  fast: '150ms ease',
  normal: '250ms ease',
  slow: '350ms ease',
  spring: 'spring(1, 100)',
} as const;
