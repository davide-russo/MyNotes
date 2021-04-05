export interface DbResponse<T> {
    value: T | null,
    error: null | string
}
