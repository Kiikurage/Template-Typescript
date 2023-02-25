export interface PaginationResponse<T> {
    items: T[];
    offset: number;
    total: number;
}
