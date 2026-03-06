import { UiLoader } from '../../components'
import {
    AuthContext,
    BreedProvider,
    BreedsProvider,
    FavouritesProvider,
} from '../../providers'
import css from './dashboard.module.scss'
import { type PropsWithChildren, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { LayoutDashboardNavigation } from './components'

const LayoutDashboard = ({ children }: PropsWithChildren<{}>) => {
    // #region - Variables
    /**
     * The name of the component used for styling and identification in the DOM inspector.
     */
    const name = `LayoutDashboard`
    // #endregion

    // #region - Hooks
    /**
     * The context for the authentication state.
     */
    const authContext = useContext(AuthContext)
    // #endregion

    // #region - Markup
    if (authContext?.isLoading) {
        // Show a loading state while checking auth
        return (
            <div className={css[`${name}__loader`]}>
                <UiLoader size={'lg'} type={'shape'} />
            </div>
        )
    }

    if (!authContext?.user) {
        // Redirect to login if not authenticated
        return <Navigate to="/auth/login" replace />
    }

    return (
        <BreedsProvider>
            <FavouritesProvider>
                <BreedProvider>
                    {children}

                    <LayoutDashboardNavigation />
                </BreedProvider>
            </FavouritesProvider>
        </BreedsProvider>
    )
    // #endregion
}

export { LayoutDashboard }
