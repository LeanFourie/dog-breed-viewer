// #region - Imports
import type { IComponentAttributes } from '../../../utils/definitions/interfaces'
import type { TSemanticState } from '../../../utils/definitions/types'
// #endregion

// #region - Types
/**
 * The final props to use for the UiSnackbar component.
 */
type TUiSnackbarProps = IUiSnackbarProps
// #endregion

// #region - Interfaces
/**
 * The development specific props to be set on the UiSnackbar component.
 */
interface IUiSnackbarDevProps extends IComponentAttributes {
    /**
     * The message value to render on the snackbar.
     */
    message: string
    /**
     * The click event that fires when the close button is clicked.
     */
    onClose: () => void
}
/**
 * The design specific props to be set on the UiSnackbar component.
 */
interface IUiSnackbarProps extends IUiSnackbarDevProps {
    /**
     * The semantic state of the snackbar which determines the color of the snackbar.
     */
    state?: Extract<TSemanticState, 'neutral' | 'danger'>
}
// #endregion

// #region - Exports
export type { TUiSnackbarProps }
// #endregion
