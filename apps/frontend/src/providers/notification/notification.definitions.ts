// #region - Imports
import type { TUiSnackbarProps } from '../../components/feedback/ui-snackbar/ui-snackbar.definitions'
// #endregion

// #region - Interfaces
/**
 * The values to expose via the notification context.
 */
interface INotificationContext {
    // Data
    /**
     * The list of snackbars that is rendered.
     */
    snackbars: (Omit<TUiSnackbarProps, 'onClose'> & { id: string })[]

    // Methods
    /**
     * A method that adds a snackbar to the list of snackbars to render.
     * @param snackbar - The config for the snackbar to add.
     */
    addSnackbar: (snackbar: Omit<TUiSnackbarProps, 'onClose'>) => void
}
// #endregion

// #region - Exports
export type { INotificationContext }
// #endregion
