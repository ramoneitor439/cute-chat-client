export class FetchError extends Error {
    status: number
    body: string

    constructor(status: number, body: string) {
        super(`Fetch error with status ${status}`)
        this.status = status
        this.body = body
    }    
}