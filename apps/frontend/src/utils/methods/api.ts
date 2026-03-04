type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string }

async function fetchJson<T>({
    url,
    options,
}: {
    url: string
    options?: RequestInit
}): Promise<ApiResult<T>> {
    try {

        const res = await fetch(url, options)

        if (!res.ok) {
            return { ok: false, error: res.statusText }
        }

        const data = await res.json()

        // throw new Error('Forced error for testing')

        return { ok: true, data }
    } catch (error) {
        return { ok: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
}

export { fetchJson }
