const BASE_ROUTES = {
    Home: '/',
    Breeds: '/breeds',
    _Auth: '/auth',
} as const

const SUB_ROUTES = {
    Login: `${BASE_ROUTES._Auth}/login`,
    Register: `${BASE_ROUTES._Auth}/register`,
} as const

const DYNAMIC_ROUTES = {
    Breed: (id: string) => `${BASE_ROUTES.Breeds}/${id}`,
} as const

const ROUTES = {
    ...BASE_ROUTES,
    ...SUB_ROUTES,
    ...DYNAMIC_ROUTES,
} as const

export { ROUTES }
