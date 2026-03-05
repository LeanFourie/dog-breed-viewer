import { type TUiSnackbarProps } from '../../components/feedback/ui-snackbar/ui-snackbar.definitions'

// #region - Interfaces
interface INotificationContext {
    // Data
    snackbars: (Omit<TUiSnackbarProps, 'onClose'> & { id: string })[]

    // Methods
    addSnackbar: (snackbar: Omit<TUiSnackbarProps, 'onClose'>) => void
}
// #endregion

// #region - Exports
export type { INotificationContext }
// #endregion
