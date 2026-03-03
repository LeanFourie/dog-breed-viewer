// #region - Imports
import type { IComponentAttributes } from '../../../utils/definitions/interfaces'
// #endregion

// #region - Types
/**
 * Determines how the UiIcon component should be rendered.
 */
type TUiIconType = 'svg' | 'text'
/**
 * A reusable interface for assigning icon props to other components.
 */
type TIcon = Pick<IUiIconProps, 'type' | 'value'>
/**
 * The final props to use for the UiIcon component.
 */
type TUiIconProps = IUiIconProps
// #endregion

// #region - Interfaces
/**
 * The development specific props to be set on the UiIcon component.
 */
interface IUiIconDevProps extends IComponentAttributes {}
/**
 * The design specific props to be set on the UiIcon component.
 */
interface IUiIconProps extends IUiIconDevProps {
    /**
     * The type of icon to render.
     */
    type: TUiIconType
    /**
     * The value of the icon to render.
     * - If type is 'svg', this should be the path to the SVG icon to render.
     * - If type is 'text', this should be the text value that renders the icon.
     */
    value: string
}
// #endregion

// #region - Exports
export type { TUiIconProps, TIcon }
// #endregion
