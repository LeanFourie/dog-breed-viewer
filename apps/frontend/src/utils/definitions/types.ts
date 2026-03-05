// #region - Types
/**
 * The base values representing T-Shirt sizes.
 * This is used to size components in a recognizable pattern.
 */
type TSize = 'sm' | 'md' | 'lg'
/**
 * The extended size values representing T-Shirt sizes.
 * This is used to size components in a recognizable pattern.
 */
type TSizeExtended = 'xs' | TSize | 'xl'
/**
 * The available shades for UI variants.
 */
type TShade = 'light' | 'dark'
/**
 * The theme color variants available in the system.
 */
type TThemeColor = 'primary' | 'secondary' | 'tertiary'
/**
 * The sematic state color variants available in the system.
 */
type TSemanticColor = 'info' | 'success' | 'warning' | 'danger'/**
 * The system color variants available in the system.
 */
type TSystemColor = 'base' | 'invert'
/**
 * The neutral color variants available in the system.
 */
type TNeutralColor = 'white' | 'grey' | 'black'
/**
 * The full list of available colors in the system.
 */
type TColor = TThemeColor | TSemanticColor | TSystemColor | TNeutralColor
/**
 * UI variant styles that can be applied to components.
 */
type TUiVariant = 'filled' | 'outlined' | 'ghost'
/**
 * UI shape styles that can be applied to components.
 */
type TUiShape = 'square' | 'circle' | 'squircle'
/**
 * The available semantic states.
 */
type TSemanticState = 'neutral' | TSemanticColor
type TValueOf<T> = T[keyof T]
// #endregion

// #region - Exports
export type {
    TColor,
    TNeutralColor,
    TSemanticColor,
    TShade,
    TSize,
    TSizeExtended,
    TSystemColor,
    TThemeColor,
    TUiShape,
    TUiVariant,
    TSemanticState,
    TValueOf
}
// #endregion
