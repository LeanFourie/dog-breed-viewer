// #region - Imports
import type { TSizeExtended } from '../../../utils/definitions/types.js'
import type { IComponentAttributes } from '../../../utils/definitions/interfaces'
// #endregion

// #region - Types
/**
 * Determines the type of loader that should render.
 */
type TUiLoaderType = 'circular' | 'dots' | 'shape'
/**
 * The final props to use for the UiLoader component.
 */
type TUiLoaderProps = IUiLoaderProps
// #endregion

// #region - Interfaces
/**
 * The development specific props to be set on the UiLoader component.
 */
interface IUiLoaderDevProps extends IComponentAttributes {}
/**
 * The design specific props to be set on the UiLoader component.
 */
interface IUiLoaderProps extends IUiLoaderDevProps {
    /**
     * Sets the loader type that should render.
     */
    type: TUiLoaderType
    /**
     * Sets the size at which the loader should render.
     * @default 'md'
     */
    size?: TSizeExtended
}
// #endregion

// #region - Exports
export type { TUiLoaderProps }
// #endregion
