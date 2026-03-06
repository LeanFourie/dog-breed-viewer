import {
    Controller,
    Post,
    Body,
    Res,
    Req,
    Get,
    HttpStatus,
    Headers,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { type Response, type Request } from 'express'

/**
 * The request body for the login endpoint.
 * Note: This should be in a share package which can be consumed by FE and BE.
 */
interface LoginDto {
    username: string
    password: string
    expiresInMins?: number
}
/**
 * The response body for the login endpoint.
 * Note: This should be in a share package which can be consumed by FE and BE.
 */
interface DummyLoginResponse {
    id: number
    username: string
    firstName: string
    lastName: string
    token?: string
    accessToken?: string
}

@Controller('auth')
export class AuthController {
    constructor(private configService: ConfigService) {}

    /**
     * Log in a user with the provided credentials.
     * @param body - The login request body.
     * @param res - The response object.
     * @returns The login response data.
     */
    @Post('login')
    async login(@Body() body: LoginDto, @Res() res: Response) {
        try {
            // Proxy the login request to the dummyjson.com API
            const apiUrl = this.configService.get<string>('DUMMY_JSON_API_URL')
            const response = await fetch(`${apiUrl}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: body.username,
                    password: body.password,
                    expiresInMins: body.expiresInMins ?? 60,
                }),
                credentials: 'include',
            })

            // Parse the response JSON as the DummyLoginResponse type
            const data =
                (await response.json()) as unknown as DummyLoginResponse

            // Check if the response is not ok
            if (!response.ok) {
                return res.status(response.status).json(data)
            }

            // Set the access token in an HttpOnly cookie
            res.cookie('accessToken', data.token ?? data.accessToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                path: '/',
                maxAge: (body.expiresInMins ?? 60) * 60 * 1000,
            })

            // Return the login response data
            return res.json(data)
        } catch (err) {
            // Log the error and return a generic error response
            console.error('Login proxy error:', err)

            // Return a generic error response
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ error: 'Login failed' })
        }
    }
    /**
     * Log out the currently authenticated user.
     * @param res - The response object.
     * @returns A success message.
     */
    @Post('logout')
    logout(@Res() res: Response) {
        // Clear the access token cookie
        res.clearCookie('accessToken', {
            path: '/',
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        })

        // Return a success message
        return res
            .status(HttpStatus.OK)
            .json({ message: 'Logged out successfully' })
    }
    /**
     * Refresh the authentication token.
     * @param req - The request object.
     * @param res - The response object.
     * @returns The new authentication token, or null if the refresh failed.
     */
    @Post('refresh')
    async refresh(@Req() req: Request, @Res() res: Response) {
        try {
            // Read access token from httpOnly cookie and return it if it exists
            const cookieHeader = req.headers['cookie'] ?? ''
            // Parse the cookie header into a key-value map
            const cookies: Record<string, string> = {}
            cookieHeader.split(';').forEach((c) => {
                const [k, ...v] = c.trim().split('=')
                if (k) cookies[k] = decodeURIComponent(v.join('=') ?? '')
            })
            // Get the access token from the cookies
            const accessToken = cookies['accessToken']

            // Check if the access token is missing
            if (!accessToken) {
                return res
                    .status(HttpStatus.UNAUTHORIZED)
                    .json({ error: 'No token' })
            }

            // Return the access token in the response body
            return res.json({ accessToken })
        } catch (err) {
            // Log the error and return a generic error response
            console.error('Refresh proxy error:', err)

            // Return a generic error response
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ error: 'Refresh failed' })
        }
    }
    /**
     * Get the currently authenticated user.
     * @param authHeader - The Authorization header value.
     * @param req - The request object.
     * @param res - The response object.
     * @returns The user data.
     */
    @Get('me')
    async me(
        @Headers('authorization') authHeader: string | undefined,
        @Req() req: Request,
        @Res() res: Response
    ) {
        try {
            // Extract token from Authorization header or fallback to cookie
            let token = ''
            // Check if the Authorization header is present and starts with 'Bearer '
            if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
                token = authHeader.slice(7).trim()
            } else {
                // Fallback to cookie if Authorization header not present or invalid
                const cookieHeader = req.headers['cookie'] ?? ''
                // Parse the cookie header into a key-value map
                const cookies: Record<string, string> = {}
                cookieHeader.split(';').forEach((c) => {
                    const [k, ...v] = c.trim().split('=')
                    if (k) cookies[k] = decodeURIComponent(v.join('=') ?? '')
                })
                token = cookies['accessToken'] ?? ''
            }

            // If the token is missing, return an unauthorized error response
            if (!token) {
                return res
                    .status(HttpStatus.UNAUTHORIZED)
                    .json({ error: 'No token' })
            }

            // Call the dummyjson.com auth/me endpoint to get user data
            const apiUrl = this.configService.get<string>('DUMMY_JSON_API_URL')
            const response = await fetch(`${apiUrl}/auth/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })

            // Check if the response is successful
            const data = await response.json()

            // If the response is not ok, return the error response
            if (!response.ok) {
                return res.status(response.status).json(data)
            }

            // If the response is ok, return the user data
            return res.json(data)
        } catch (err) {
            // Log the error and return a generic error response
            console.error('Me proxy error:', err)

            // Return a generic error response
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ error: 'Failed to fetch user' })
        }
    }
}
