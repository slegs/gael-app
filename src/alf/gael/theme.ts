/**
 * Gael Theme Configuration
 *
 * This file defines how Gael colors integrate with the ALF theme system.
 * It provides the theme configuration that can be imported into the main
 * themes.ts file to enable Gael branding.
 */

import {GREEN_HUE, RED_HUE} from '../util/colorGeneration'
import {GAEL_PRIMARY_HUE} from './colors'

/**
 * Gael theme hue configuration
 * This replaces the default BLUE_HUE with GAEL_PRIMARY_HUE for primary colors
 */
export const GAEL_THEME_HUES = {
  primary: GAEL_PRIMARY_HUE, // Use Gael green for primary theme colors
  negative: RED_HUE, // Keep standard red for negative states
  positive: GREEN_HUE, // Keep standard green for positive states
} as const

/**
 * Flag to enable Gael theming
 * Set this to true in themes.ts to use Gael colors
 */
export const USE_GAEL_THEME = true
