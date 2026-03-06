'use client'

import { UiSnackbar } from '../../components/feedback/ui-snackbar/ui-snackbar'
import { type INotificationContext } from './notification.definitions'
import { createContext, useState } from 'react'

export const NotificationContext = createContext<INotificationContext | null>(
    null
)

const NotificationProvider = ({ children }: React.PropsWithChildren) => {
    // #region - States
    /**
     * Stores the snackbars to render.
     */
    const [_snackbars, _setSnackbars] = useState<
        INotificationContext['snackbars']
    >([])
    // #endregion

    // #region - Methods
    /**
     * Adds a snackbar to the list of snackbars to render.
     * @param snackbar - The required props for snackbar to add.
     */
    const addSnackbar = (
        snackbar: Omit<INotificationContext['snackbars'][number], 'id'>
    ): void => {
        // Create a random ID to assign to the snackbar
        // This is used to remove the snackbar after a certain time
        const id = crypto.randomUUID()

        // Add the snackbar to the list
        _setSnackbars([..._snackbars, { ...snackbar, id }])

        // Remove it after a 3 seconds
        setTimeout(() => removeSnackbar(id), 3000)
    }
    /**
     * Removes a snackbar from the list of rendered snackbars.
     * @param id - The unique ID of the snackbar to remove.
     */
    const removeSnackbar = (
        id: INotificationContext['snackbars'][number]['id']
    ): void => {
        _setSnackbars(_snackbars.filter((snackbar) => snackbar.id !== id))
    }
    // #endregion

    // #region - Value
    const value: INotificationContext = {
        // Data
        snackbars: _snackbars,

        // Methods
        addSnackbar,
    }
    // #endregion

    // #region - Markup
    return (
        <NotificationContext.Provider value={value}>
            {children}

            {_snackbars.map((snackbar) => (
                <UiSnackbar
                    {...snackbar}
                    onClose={() => removeSnackbar(snackbar.id)}
                    key={snackbar.id}
                />
            ))}
        </NotificationContext.Provider>
    )
    // #endregion
}

export default NotificationProvider
