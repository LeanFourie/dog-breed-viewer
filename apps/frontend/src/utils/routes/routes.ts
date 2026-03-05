const BASE_ROUTES = {
    Home: '/',
    Breeds: '/breeds',
    _Auth: '/auth',
} as const

const SUB_ROUTES = {
    Login: `${BASE_ROUTES._Auth}/login`,
    Register: `${BASE_ROUTES._Auth}/register`,
    Breed: `${BASE_ROUTES.Breeds}/:id`,
} as const

const ROUTES = {
    ...BASE_ROUTES,
    ...SUB_ROUTES,
} as const

export { ROUTES }
