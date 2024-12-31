// Breakpoint constants for consistent usage
export const breakpoints = {
  mobile: '320px',
  mobileLarge: '480px',
  tablet: '768px',
  desktop: '1024px',
  desktopLarge: '1280px'
} as const

// Helper function for media queries
export const media = {
  mobile: `@media (min-width: ${breakpoints.mobile})`,
  mobileLarge: `@media (min-width: ${breakpoints.mobileLarge})`,
  tablet: `@media (min-width: ${breakpoints.tablet})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
  desktopLarge: `@media (min-width: ${breakpoints.desktopLarge})`
} as const
