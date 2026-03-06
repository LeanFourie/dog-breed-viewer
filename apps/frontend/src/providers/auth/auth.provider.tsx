'use client'

import { UiUserDropdown } from '../../components'
import { fetchJson } from '../../utils/methods/api'
import { type IUserModel } from '../../utils/models/user.model'
import { ROUTES } from '../../utils/routes/routes'
import { type IAuthContext } from './auth.definitions'
import { createContext, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const AuthContext = createContext<IAuthContext | null>(null)

const AUTH_EVENT_KEY = 'auth-event'

const AuthProvider = ({ children }: React.PropsWithChildren) => {
    // #region - States
    /**
     * The currently authenticated user.
     */
    const [_user, _setUser] = useState<IAuthContext['user']>(null)
    /**
     * Whether the auth context is currently loading.
     */
    const [_isLoading, _setIsLoading] =
        useState<IAuthContext['isLoading']>(true)
    // #endregion

    // #region - States
    /**
     * The navigation function from react-router-dom.
     */
    const navigate = useNavigate()
    /**
     * The location object from react-router-dom.
     */
    const location = useLocation()
    // #endregion

    // #region - States
    /**
     * Fetches JSON data from the server with optional authentication.
     * @param url - The URL to fetch data from.
     * @param options - Optional request options, including a token for authentication.
     * @returns A promise that resolves to the fetched JSON data.
     */
    async function fetchAuthJson<T>(
        url: string,
        options: RequestInit & { token?: string } = {}
    ): Promise<{ ok: boolean; data?: T; error?: string }> {
        // Create a new Headers object from the existing headers in the options
        const headers = new Headers(options.headers)
        // Set the Content-Type header to application/json
        headers.set('Content-Type', 'application/json')

        // Set the Authorization header with the Bearer token if provided
        if (options.token)
            headers.set('Authorization', `Bearer ${options.token}`)

        // Make the actual fetch request with the updated headers
        let res = await fetchJson<T>({
            url,
            options: { ...options, headers, credentials: 'include' },
        })

        // Retry once if 401 Unauthorized
        if (
            !res.ok &&
            res.error === 'Unauthorized' &&
            url !== `/api/auth/refresh`
        ) {
            // If the response is 401 Unauthorized and the URL is not the refresh token endpoint,
            // try to refresh the token and retry the request
            const newToken = await refreshToken()

            // If the refresh token was successfully retrieved, retry the request with the new token
            if (newToken) {
                // Set the Authorization header with the new token
                headers.set('Authorization', `Bearer ${newToken}`)

                // Retry the request with the new token
                res = await fetchJson<T>({
                    url,
                    options: { ...options, headers, credentials: 'include' },
                })
            }
        }

        // Return the server response
        return res
    }
    /**
     * Refreshes the access token using the refresh token stored in local storage.
     * @returns The new access token if the refresh was successful, or null if it failed.
     */
    const refreshToken = async (): Promise<string | null> => {
        try {
            // Refresh the access token using the refresh token stored in local storage
            const res = await fetchJson<{ accessToken: string }>({
                url: `/api/auth/refresh`,
                options: { method: 'POST', credentials: 'include' },
            })

            // Check if the refresh was successful
            // If not, throw an error with the server error message
            if (!res.ok) {
                _setUser(null)
                return null
            }

            // If the refresh was successful, set the new access token in local storage
            const token = res.data.accessToken

            // Fetch current user
            const userRes = await fetchAuthJson<IUserModel>(`/api/auth/me`, {
                token,
            })

            // Set the user state to the server response data if the request was successful
            _setUser(userRes.ok ? userRes.data ?? null : null)
            return token
        } catch (err) {
            // Log any errors that occur during token refresh
            console.error('Refresh token failed:', err)

            // Set the user state to null if the refresh failed
            _setUser(null)

            // Return null to indicate the refresh failed
            return null
        }
    }
    /**
     * Logs in the user by sending a login request to the server.
     * @param username - The username of the user.
     * @param password - The password of the user.
     */
    const login = async ({
        username,
        password,
    }: {
        username: IUserModel['username']
        password: string
    }) => {
        try {
            // Log in the user on the server
            const res = await fetchJson<IUserModel>({
                url: `/api/auth/login`,
                options: {
                    method: 'POST',
                    body: JSON.stringify({ username, password }),
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                },
            })

            // Check if the login was successful
            // If not, throw an error with the server error message
            if (!res.ok) throw new Error(res.error)

            // If the login was successful, set the user state to the server response data
            _setUser(res.data)

            // Broadcast login event
            localStorage.setItem(
                AUTH_EVENT_KEY,
                JSON.stringify({ type: 'login', timestamp: Date.now() })
            )

            // Navigate to the home page after successful login
            navigate('/')
        } catch (err) {
            // Log any errors that occur during login
            console.error('Login failed:', err)

            // Re-throw the error to be handled by the caller
            throw err
        }
    }
    /**
     * Logs out the current user by invalidating the session and updating the user state.
     */
    const logout = async () => {
        try {
            // Log out the user on the server
            await fetchJson({
                url: `/api/auth/logout`,
                options: {
                    method: 'POST',
                    credentials: 'include',
                },
            })
        } catch (err) {
            // Log any errors that occur during logout
            console.error('Logout failed:', err)
        } finally {
            // Set the user state to null to indicate the user is logged out
            _setUser(null)

            // Broadcast logout event
            localStorage.setItem(
                AUTH_EVENT_KEY,
                JSON.stringify({ type: 'logout', timestamp: Date.now() })
            )

            // Navigate to the login page to clear the session
            navigate(ROUTES.Login)
        }
    }
    // #endregion

    // #region - Effects
    /**
     * Handle storage events to update user state on logout.
     */
    useEffect(() => {
        const handleStorage = (event: StorageEvent) => {
            // Ignore events that are not for our auth key or do not have a new value
            if (event.key !== AUTH_EVENT_KEY || !event.newValue) return

            // Parse the stored auth event
            const { type } = JSON.parse(event.newValue)
            // If the stored auth event is a logout event, set the user to null
            if (type === 'logout') _setUser(null)
            // If the stored auth event is a login event, refresh the token
            if (type === 'login') refreshToken()
        }

        // Add event listener for storage events
        // This is necessary to handle logout events from other tabs
        window.addEventListener('storage', handleStorage)
        return () => window.removeEventListener('storage', handleStorage)
    }, [])
    /**
     * Initialize authentication on page load.
     * Check if we have a hint that the user is logged in and refresh token if so.
     */
    useEffect(() => {
        const initAuth = async () => {
            // Check if we have a hint that the user is logged in
            const storedAuth = localStorage.getItem(AUTH_EVENT_KEY)
            // Create a flag that checks if we think the user is logged in
            let isLikelyLoggedIn = false

            // If we have a stored auth event, check if it is a login event
            if (storedAuth) {
                try {
                    // Parse the stored auth event
                    const { type } = JSON.parse(storedAuth)
                    // If the stored auth event is a login event, set the flag to true
                    if (type === 'login') isLikelyLoggedIn = true
                } catch (error) {
                    console.error(error)
                }
            }

            // Do not refresh token if on login page AND we don't think we are logged in
            if (location.pathname === ROUTES.Login && !isLikelyLoggedIn) {
                _setIsLoading(false)
                return
            }

            // Set the loading state to true while we are refreshing the token
            _setIsLoading(true)
            // Refresh the token if we think the user is logged in
            await refreshToken()
            // Set the loading state to false after we have refreshed the token
            _setIsLoading(false)
        }
        initAuth()
    }, [])
    /**
     * Redirect to home if user is logged in on login page
     */
    useEffect(() => {
        if (_user && location.pathname === ROUTES.Login) {
            navigate('/')
        }
    }, [_user, location.pathname, navigate])
    // #endregion

    // #region - Value
    const value: IAuthContext = {
        user: _user,
        isLoading: _isLoading,
        login,
        logout,
        refreshToken,
    }
    // #endregion

    // #region - Markup
    return (
        <AuthContext.Provider value={value}>
            {children}

            {!!_user ? (
                <UiUserDropdown onLogoutClick={logout} user={_user} />
            ) : null}
        </AuthContext.Provider>
    )
    // #endregion
}

export default AuthProvider
