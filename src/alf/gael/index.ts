/**
 * Gael Brand System
 *
 * Main entry point for all Gael branding. Import from here to access
 * Gael colors, theme configuration, and component overrides.
 */

// Export all color definitions
export * from './colors'

// Export theme configuration
export * from './theme'

// Export component color mappings
export * from './components'

// Re-export commonly used items for convenience
export {
  GAEL_BRAND_COLORS,
  GAEL_BRIGHT_GREEN,
  GAEL_DARK_GREEN,
  GAEL_PRIMARY_HUE,
  GAEL_THEME_CONFIG,
} from './colors'
export {GAEL_COMPONENT_COLORS, getGaelColor} from './components'
export {GAEL_THEME_HUES, USE_GAEL_THEME} from './theme'
