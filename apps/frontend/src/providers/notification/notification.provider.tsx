'use client'

import { UiSnackbar } from '../../components/feedback/ui-snackbar/ui-snackbar'
import { type INotificationContext } from './notification.definitions'
import { createContext, useState } from 'react'

export const NotificationContext = createContext<INotificationContext | null>(
    null
)

const NotificationProvider = ({ children }: React.PropsWithChildren) => {
    // #region - States
    const [_snackbars, _setSnackbars] = useState<
        INotificationContext['snackbars']
    >([])
    // #endregion

    // #region - Methods
    const addSnackbar = (
        snackbar: Omit<INotificationContext['snackbars'][number], 'id'>
    ): void => {
        console.log(snackbar)
        const id = crypto.randomUUID()
        _setSnackbars([..._snackbars, { ...snackbar, id }])

        setTimeout(() => removeSnackbar(id), 3000)
    }

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

    // Markup
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
