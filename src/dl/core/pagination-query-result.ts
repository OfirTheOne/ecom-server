export interface PaginationQueryResult<T> {
    total_count: number, 
    limit: number,
    skip: number,
    items: Array<T>
}