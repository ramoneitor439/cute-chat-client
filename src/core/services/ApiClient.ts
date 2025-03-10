import { FetchError } from "../errors/FetchError"

export class ApiClient {
    private readonly baseUrl: string
    private accessToken: string | null

    constructor() {
        this.baseUrl = import.meta.env.VITE_API_URL
        this.accessToken = sessionStorage.getItem("accessToken")
    }

    public async post<T>(path: string, body: any): Promise<T | null> {
        const response = await fetch(`${this.baseUrl}/${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.accessToken}`
            },
            body: JSON.stringify(body)
        })

        if (!response.ok) {
            throw new FetchError(response.status, await response.text())
        }

        const contentLength = response.headers.get("content-length");
        if (contentLength && parseInt(contentLength) === 0) {
            return null; 
        }

        return response.json()
    }

    public async put<T>(path: string, body: any): Promise<T> {
        const response = await fetch(`${this.baseUrl}/${path}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.accessToken}`
            },
            body: JSON.stringify(body)
        })

        if (!response.ok) {
            const errorResponse = await response.json()
            throw new Error(`Error ${errorResponse.status}: ${errorResponse.title}`)
        }

        return response.json()
    }

    public async delete<T>(path: string, body?: any): Promise<T> {
        const response = await fetch(`${this.baseUrl}/${path}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.accessToken}`
            },
            body: JSON.stringify(body)
        })

        if (!response.ok) {
            const errorResponse = await response.json()
            throw new Error(`Error ${errorResponse.status}: ${errorResponse.title}`)
        }

        return response.json()
    }

    public async get<T>(path: string) : Promise<T | null> {
        const response = await fetch(`${this.baseUrl}/${path}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.accessToken}`
            }
        })

        if (!response.ok) {
            throw new FetchError(response.status, await response.text())
        }

        const contentLength = response.headers.get("content-length");
        if (contentLength && parseInt(contentLength) === 0) {
            return null; 
        }

        return response.json()
    }
}