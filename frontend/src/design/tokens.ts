// Design tokens: colors, spacing, typography
export const tokens = {
  colors: {
    primary: '#0ea5a4',
    primaryHover: '#089e9b',
    accent: '#f59e0b',
    bg: '#f8fafc',
    surface: '#ffffff',
    text: '#0f172a',
    muted: '#64748b',
    danger: '#ef4444'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  radii: {
    sm: '6px',
    md: '10px',
    pill: '9999px'
  },
  typography: {
    body: '16px',
    lead: '18px',
    h1: '32px',
    h2: '24px'
  },
  shadows: {
    sm: '0 1px 2px rgba(2,6,23,0.06)',
    md: '0 6px 18px rgba(2,6,23,0.08)'
  }
} as const

export type Tokens = typeof tokens
