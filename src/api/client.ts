const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api/v1'

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`, {
        headers: { 'Content-Type': 'application/json', ...init?.headers || {} },
        ...init
    })

    if (!res.ok) {
        const text = await res.text().catch(() => null)
        throw new Error(`HTTP Status: ${res.status}: ${text ?? res.statusText}`)
    }

    if (res.status === 204) {
        return undefined as T
    }
    const text = await res.text()
    if (!text) {
        return undefined as T
    }
    return JSON.parse(text) as T
}