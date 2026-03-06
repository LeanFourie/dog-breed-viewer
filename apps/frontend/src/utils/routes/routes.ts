// #region - Routes
/**
 * The base routes for the application.
 * These are routes that have one level of depth.
 */
const BASE_ROUTES = {
    Home: '/',
    Breeds: '/breeds',
    Favourites: '/favourites',
    _Auth: '/auth',
} as const
/**
 * The sub-routes for the application.
 * These are routes that have two levels of depth.
 */
const SUB_ROUTES = {
    Login: `${BASE_ROUTES._Auth}/login`,
    Register: `${BASE_ROUTES._Auth}/register`,
    Breed: `${BASE_ROUTES.Breeds}/:id`,
} as const
/**
 * The complete routes for the application.
 * This includes both base and sub-routes.
 */
const ROUTES = {
    ...BASE_ROUTES,
    ...SUB_ROUTES,
} as const
// #endregion

// #region - Exports
export { ROUTES }
// #endregion
