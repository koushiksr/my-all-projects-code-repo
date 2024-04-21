export type PaginatedResponse<T> = {
    count: number | null;
    previous: string | null;
    next: string | null;
    results: T[];
};