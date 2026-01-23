/**
 * Design System - Smart Restaurantes
 * Sistema de design tokens para consistência visual em toda a aplicação
 */

// ============================================================================
// CORES
// ============================================================================

/**
 * Paleta de cores neutras - Slate (mais sofisticado que gray)
 */
export const neutral = {
  50: '#f8fafc',
  100: '#f1f5f9',
  200: '#e2e8f0',
  300: '#cbd5e1',
  400: '#94a3b8',
  500: '#64748b',
  600: '#475569',
  700: '#334155',
  800: '#1e293b',
  900: '#0f172a',
  950: '#020617',
} as const;

/**
 * Paleta alternativa - Zinc (para backgrounds e bordas)
 */
export const zinc = {
  50: '#fafafa',
  100: '#f4f4f5',
  200: '#e4e4e7',
  300: '#d4d4d8',
  400: '#a1a1aa',
  500: '#71717a',
  600: '#52525b',
  700: '#3f3f46',
  800: '#27272a',
  900: '#18181b',
  950: '#09090b',
} as const;

/**
 * Cor de destaque principal - Amber/Gold sofisticado
 */
export const accent = {
  50: '#fffbeb',
  100: '#fef3c7',
  200: '#fde68a',
  300: '#fcd34d',
  400: '#fbbf24',
  500: '#f59e0b',
  600: '#d97706',
  700: '#b45309',
  800: '#92400e',
  900: '#78350f',
  950: '#451a03',
} as const;

/**
 * Gold - Variação mais elegante do accent
 */
export const gold = {
  light: '#fef3c7',
  DEFAULT: '#d4a853',
  dark: '#b8860b',
  muted: '#c9a227',
  subtle: '#f5e6c8',
} as const;

/**
 * Cores semânticas - Success (Emerald)
 */
export const success = {
  50: '#ecfdf5',
  100: '#d1fae5',
  200: '#a7f3d0',
  300: '#6ee7b7',
  400: '#34d399',
  500: '#10b981',
  600: '#059669',
  700: '#047857',
  800: '#065f46',
  900: '#064e3b',
  950: '#022c22',
} as const;

/**
 * Cores semânticas - Warning (Amber)
 */
export const warning = {
  50: '#fffbeb',
  100: '#fef3c7',
  200: '#fde68a',
  300: '#fcd34d',
  400: '#fbbf24',
  500: '#f59e0b',
  600: '#d97706',
  700: '#b45309',
  800: '#92400e',
  900: '#78350f',
  950: '#451a03',
} as const;

/**
 * Cores semânticas - Error (Rose)
 */
export const error = {
  50: '#fff1f2',
  100: '#ffe4e6',
  200: '#fecdd3',
  300: '#fda4af',
  400: '#fb7185',
  500: '#f43f5e',
  600: '#e11d48',
  700: '#be123c',
  800: '#9f1239',
  900: '#881337',
  950: '#4c0519',
} as const;

/**
 * Cores semânticas - Info (Sky)
 */
export const info = {
  50: '#f0f9ff',
  100: '#e0f2fe',
  200: '#bae6fd',
  300: '#7dd3fc',
  400: '#38bdf8',
  500: '#0ea5e9',
  600: '#0284c7',
  700: '#0369a1',
  800: '#075985',
  900: '#0c4a6e',
  950: '#082f49',
} as const;

/**
 * Todas as cores agrupadas
 */
export const colors = {
  neutral,
  zinc,
  accent,
  gold,
  success,
  warning,
  error,
  info,
  // Aliases úteis
  background: {
    light: '#ffffff',
    dark: zinc[950],
    muted: {
      light: neutral[50],
      dark: zinc[900],
    },
    subtle: {
      light: neutral[100],
      dark: zinc[800],
    },
  },
  foreground: {
    light: neutral[900],
    dark: neutral[50],
    muted: {
      light: neutral[600],
      dark: neutral[400],
    },
  },
  border: {
    light: neutral[200],
    dark: zinc[800],
    subtle: {
      light: neutral[100],
      dark: zinc[900],
    },
  },
} as const;

// ============================================================================
// GRADIENTES
// ============================================================================

/**
 * Gradientes sutis para backgrounds e elementos decorativos
 */
export const gradients = {
  // Gradientes de accent/gold
  goldShimmer: 'linear-gradient(135deg, #fef3c7 0%, #fcd34d 50%, #f59e0b 100%)',
  goldSubtle: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
  goldRadial: 'radial-gradient(circle at top right, #fef3c7 0%, transparent 50%)',

  // Gradientes neutros
  slateSubtle: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
  slateDark: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',

  // Gradientes para cards
  cardLight: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)',
  cardDark: 'linear-gradient(180deg, #27272a 0%, #18181b 100%)',

  // Gradientes decorativos
  warmGlow: 'radial-gradient(ellipse at top, rgba(251, 191, 36, 0.15) 0%, transparent 50%)',
  coolGlow: 'radial-gradient(ellipse at top, rgba(14, 165, 233, 0.1) 0%, transparent 50%)',

  // Gradientes de overlay
  overlayLight: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 100%)',
  overlayDark: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)',

  // Glassmorphism
  glassLight: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%)',
  glassDark: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
} as const;

// ============================================================================
// TIPOGRAFIA
// ============================================================================

/**
 * Tamanhos de fonte padronizados
 */
export const fontSize = {
  xs: '0.75rem',      // 12px
  sm: '0.875rem',     // 14px
  base: '1rem',       // 16px
  lg: '1.125rem',     // 18px
  xl: '1.25rem',      // 20px
  '2xl': '1.5rem',    // 24px
  '3xl': '1.875rem',  // 30px
  '4xl': '2.25rem',   // 36px
  '5xl': '3rem',      // 48px
  '6xl': '3.75rem',   // 60px
  '7xl': '4.5rem',    // 72px
  '8xl': '6rem',      // 96px
  '9xl': '8rem',      // 128px
} as const;

/**
 * Alturas de linha padronizadas
 */
export const lineHeight = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
  // Valores específicos por tamanho de fonte
  '3': '0.75rem',   // 12px
  '4': '1rem',      // 16px
  '5': '1.25rem',   // 20px
  '6': '1.5rem',    // 24px
  '7': '1.75rem',   // 28px
  '8': '2rem',      // 32px
  '9': '2.25rem',   // 36px
  '10': '2.5rem',   // 40px
} as const;

/**
 * Pesos de fonte
 */
export const fontWeight = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
} as const;

/**
 * Espaçamento entre letras
 */
export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const;

/**
 * Configurações tipográficas completas
 */
export const typography = {
  fontSize,
  lineHeight,
  fontWeight,
  letterSpacing,
  // Presets úteis
  presets: {
    heading1: {
      fontSize: fontSize['5xl'],
      lineHeight: lineHeight.tight,
      fontWeight: fontWeight.bold,
      letterSpacing: letterSpacing.tight,
    },
    heading2: {
      fontSize: fontSize['4xl'],
      lineHeight: lineHeight.tight,
      fontWeight: fontWeight.bold,
      letterSpacing: letterSpacing.tight,
    },
    heading3: {
      fontSize: fontSize['3xl'],
      lineHeight: lineHeight.snug,
      fontWeight: fontWeight.semibold,
      letterSpacing: letterSpacing.normal,
    },
    heading4: {
      fontSize: fontSize['2xl'],
      lineHeight: lineHeight.snug,
      fontWeight: fontWeight.semibold,
      letterSpacing: letterSpacing.normal,
    },
    heading5: {
      fontSize: fontSize.xl,
      lineHeight: lineHeight.normal,
      fontWeight: fontWeight.medium,
      letterSpacing: letterSpacing.normal,
    },
    heading6: {
      fontSize: fontSize.lg,
      lineHeight: lineHeight.normal,
      fontWeight: fontWeight.medium,
      letterSpacing: letterSpacing.normal,
    },
    body: {
      fontSize: fontSize.base,
      lineHeight: lineHeight.relaxed,
      fontWeight: fontWeight.normal,
      letterSpacing: letterSpacing.normal,
    },
    bodySmall: {
      fontSize: fontSize.sm,
      lineHeight: lineHeight.normal,
      fontWeight: fontWeight.normal,
      letterSpacing: letterSpacing.normal,
    },
    caption: {
      fontSize: fontSize.xs,
      lineHeight: lineHeight.normal,
      fontWeight: fontWeight.normal,
      letterSpacing: letterSpacing.wide,
    },
    label: {
      fontSize: fontSize.sm,
      lineHeight: lineHeight.none,
      fontWeight: fontWeight.medium,
      letterSpacing: letterSpacing.wide,
    },
  },
} as const;

// ============================================================================
// ESPAÇAMENTO
// ============================================================================

/**
 * Escala de espaçamento consistente (baseada em 4px)
 */
export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
  36: '9rem',       // 144px
  40: '10rem',      // 160px
  44: '11rem',      // 176px
  48: '12rem',      // 192px
  52: '13rem',      // 208px
  56: '14rem',      // 224px
  60: '15rem',      // 240px
  64: '16rem',      // 256px
  72: '18rem',      // 288px
  80: '20rem',      // 320px
  96: '24rem',      // 384px
} as const;

// ============================================================================
// BORDER RADIUS
// ============================================================================

/**
 * Raios de borda padronizados
 */
export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  DEFAULT: '0.25rem', // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
} as const;

// ============================================================================
// SOMBRAS
// ============================================================================

/**
 * Sombras sofisticadas e sutis
 */
export const shadows = {
  // Sombras básicas
  none: 'none',
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.03)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.07)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.07)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.07), 0 4px 6px -4px rgb(0 0 0 / 0.07)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.07), 0 8px 10px -6px rgb(0 0 0 / 0.07)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.15)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.03)',

  // Sombras com cor (para elementos de destaque)
  accentSm: '0 1px 3px 0 rgb(245 158 11 / 0.1), 0 1px 2px -1px rgb(245 158 11 / 0.1)',
  accentMd: '0 4px 6px -1px rgb(245 158 11 / 0.15), 0 2px 4px -2px rgb(245 158 11 / 0.15)',
  accentLg: '0 10px 15px -3px rgb(245 158 11 / 0.15), 0 4px 6px -4px rgb(245 158 11 / 0.15)',

  // Sombras para cards elevados
  card: '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
  cardHover: '0 4px 12px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.06)',
  cardElevated: '0 10px 40px -10px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.05)',

  // Sombras para modais e overlays
  modal: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  dropdown: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',

  // Sombras para dark mode (mais sutis)
  darkSm: '0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3)',
  darkMd: '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)',
  darkLg: '0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.5)',
} as const;

// ============================================================================
// TRANSIÇÕES
// ============================================================================

/**
 * Durações de transição
 */
export const transitionDuration = {
  fast: '100ms',
  normal: '150ms',
  moderate: '200ms',
  slow: '300ms',
  slower: '500ms',
  slowest: '700ms',
} as const;

/**
 * Funções de easing
 */
export const transitionEasing = {
  linear: 'linear',
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  // Curvas customizadas
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  smoothIn: 'cubic-bezier(0.4, 0, 1, 1)',
  smoothOut: 'cubic-bezier(0, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
} as const;

/**
 * Transições pré-configuradas
 */
export const transitions = {
  duration: transitionDuration,
  easing: transitionEasing,
  // Presets úteis
  presets: {
    default: `all ${transitionDuration.normal} ${transitionEasing.smooth}`,
    fast: `all ${transitionDuration.fast} ${transitionEasing.smooth}`,
    slow: `all ${transitionDuration.slow} ${transitionEasing.smooth}`,
    colors: `color ${transitionDuration.normal} ${transitionEasing.smooth}, background-color ${transitionDuration.normal} ${transitionEasing.smooth}, border-color ${transitionDuration.normal} ${transitionEasing.smooth}`,
    transform: `transform ${transitionDuration.moderate} ${transitionEasing.smooth}`,
    opacity: `opacity ${transitionDuration.normal} ${transitionEasing.smooth}`,
    shadow: `box-shadow ${transitionDuration.moderate} ${transitionEasing.smooth}`,
    all: `all ${transitionDuration.moderate} ${transitionEasing.smooth}`,
  },
} as const;

// ============================================================================
// Z-INDEX
// ============================================================================

/**
 * Escala de z-index
 */
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// ============================================================================
// BREAKPOINTS
// ============================================================================

/**
 * Breakpoints para responsividade
 */
export const breakpoints = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ============================================================================
// EXPORT COMPLETO
// ============================================================================

/**
 * Design tokens completos
 */
export const designTokens = {
  colors,
  gradients,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  zIndex,
  breakpoints,
} as const;

export default designTokens;
