// #region - Imports
import type { IUserModel } from '../../utils/models/user.model'
// #endregion

// #region - Interfaces
/**
 * The values to expose via the auth context.
 */
interface IAuthContext {
    // Data
    /**
     * The currently authenticated user.
     */
    user: IUserModel | null
    /**
     * Whether the auth context is currently loading.
     */
    isLoading: boolean

    // Methods
    /**
     * Log in a user with the provided credentials.
     * @param args.username - The username of the user.
     * @param args.password - The password of the user.
     */
    login: (args: {
        username: IUserModel['username']
        password: string
    }) => Promise<void>
    /**
     * Log out the currently authenticated user.
     */
    logout: () => Promise<void>
    /**
     * Refresh the authentication token.
     * @returns The new authentication token, or null if the refresh failed.
     */
    refreshToken: () => Promise<string | null>
}
// #endregion

// #region - Exports
export type { IAuthContext }
// #endregion
