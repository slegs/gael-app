/**
 * Gael Brand Color System
 *
 * This file contains all Gael-specific colors and should be the single source
 * of truth for Gael branding. No hardcoded Gael colors should exist elsewhere.
 */

// Gael Brand Hues
export const GAEL_PRIMARY_HUE = 130 // Gael green hue for primary brand colors
export const GAEL_ACCENT_HUE = 127 // Slightly different hue for accents if needed

// Gael Brand Colors (Hex values for reference and specific use cases)
export const GAEL_BRAND_COLORS = {
  // Primary brand greens
  darkGreen: '#122023', // Main dark green for logos, primary elements
  brightGreen: '#2ECC40', // Main bright green for accents, CTAs

  // Extended palette (derived from hue calculations)
  green50: '#f0fdf4', // Very light green for backgrounds
  green100: '#dcfce7', // Light green for subtle highlights
  green200: '#bbf7d0', // Medium light green
  green300: '#86efac', // Medium green
  green400: '#4ade80', // Medium bright green
  green500: '#22c55e', // Standard green
  green600: '#16a34a', // Medium dark green
  green700: '#15803d', // Dark green
  green800: '#166534', // Very dark green
  green900: '#14532d', // Ultra dark green

  // Semantic colors
  success: '#22c55e', // For success states
  accent: '#2ECC40', // For accent elements, CTAs
  primary: '#122023', // For primary elements, logos
} as const

// Gael Theme Configuration
export const GAEL_THEME_CONFIG = {
  // Primary hue for theme generation
  primaryHue: GAEL_PRIMARY_HUE,

  // Brand color mappings for specific use cases
  logo: GAEL_BRAND_COLORS.darkGreen,
  cta: GAEL_BRAND_COLORS.brightGreen,
  notification: GAEL_BRAND_COLORS.brightGreen,
  avatar: GAEL_BRAND_COLORS.darkGreen,

  // For config files that need hex values
  configColors: {
    primary: '#2ECC40', // For app.config.js primaryColor
    notification: '#2ECC40', // For notification color
    maskIcon: '#122023', // For mask-icon color in HTML
    android: '#122023', // For Android adaptive icon
  },
} as const

// Export individual colors for convenience
export const {
  darkGreen: GAEL_DARK_GREEN,
  brightGreen: GAEL_BRIGHT_GREEN,
  accent: GAEL_ACCENT,
  primary: GAEL_PRIMARY,
} = GAEL_BRAND_COLORS
