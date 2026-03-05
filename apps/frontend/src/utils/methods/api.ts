// #region - Imports
import type { ApiResult } from '../definitions/types'
// #endregion

// #region - Variables
/**
 * Stores default error messages for common API error codes.
 */
const commonErrorMap = new Map([
    [400, 'Bad Request'],
    [401, 'Unauthorized'],
    [403, 'Forbidden'],
    [404, 'Not Found'],
    [500, 'Internal Server Error'],
])
// #endregion

// #region - Methods
/**
 * Creates a reusable, predictable wat to fetch JSON objects via an API.
 * @param url - The API endpoint 
 * @param options - Optional API request options
 * @returns A promise with the end result of the API call.
 */
async function fetchJson<T>({
    url,
    options,
}: {
    url: string
    options?: RequestInit
}): Promise<ApiResult<T>> {
    try {
        // Fetch the data from the endpoint
        const res = await fetch(url, options)

        // If the response failed...
        if (!res.ok) {
            // Return a negative `ok` response with either a common error or the result status.
            // This is just POC, can be made way better by handling proper error messages.
            return { ok: false, error: commonErrorMap.get(res.status) || `${ res.status }` }
        }

        // Get the JSON data from the response
        const data = await res.json()

        // NOTE: KEEP THIS COMMENTED OUT.
        // This is used for testing purposes.
        // throw new Error('Forced error for testing')

        // Return the result with a positive `ok` status
        return { ok: true, data }
    } catch (error) {
        // Catch the error and return the error with a negative `ok` status
        return {
            ok: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        }
    }
}
/**
 * Creates a small delay in API requests.
 * This is useful for testing loading states.
 * @param ms - The duration of the delay in milliseconds.
 * @returns - A promise with a timeout
 */
const apiDelay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))
// #endregion

// #region - Exports
export { apiDelay, fetchJson }
// #endregion
