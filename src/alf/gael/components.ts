/**
 * Gael Component Color Overrides
 *
 * This file contains Gael-specific color assignments for components
 * that need explicit brand colors rather than theme-generated colors.
 */

import {GAEL_BRAND_COLORS} from './colors'

/**
 * Component-specific color mappings
 * Use these when components need explicit Gael brand colors
 * rather than theme-generated colors
 */
export const GAEL_COMPONENT_COLORS = {
  // Logo and branding components
  logo: {
    primary: GAEL_BRAND_COLORS.darkGreen, // Main logo color
    accent: GAEL_BRAND_COLORS.brightGreen, // Logo accent/gradient color
  },

  // Static assets (SVG, config files)
  assets: {
    logomark: GAEL_BRAND_COLORS.darkGreen, // For SVG logomarks
    verifier: GAEL_BRAND_COLORS.darkGreen, // For verification badges
    favicon: GAEL_BRAND_COLORS.darkGreen, // For favicon colors
  },

  // Profile and avatar colors
  profile: {
    avatarOption: GAEL_BRAND_COLORS.darkGreen, // For avatar color picker
  },

  // App configuration colors
  config: {
    notification: GAEL_BRAND_COLORS.brightGreen, // Push notification color
    primaryColor: GAEL_BRAND_COLORS.brightGreen, // App primary color
    androidIcon: GAEL_BRAND_COLORS.darkGreen, // Android adaptive icon
    maskIcon: GAEL_BRAND_COLORS.darkGreen, // Safari mask icon
  },
} as const

/**
 * Helper function to get Gael colors for specific component types
 */
export function getGaelColor(
  component: keyof typeof GAEL_COMPONENT_COLORS,
  variant: string,
): string {
  const componentColors = GAEL_COMPONENT_COLORS[component] as Record<
    string,
    string
  >
  return componentColors[variant] || GAEL_BRAND_COLORS.primary
}
