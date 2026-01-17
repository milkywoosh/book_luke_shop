export interface DatatableResponse<T> {
    body: T;           // This will be your orderTailorT[]
    status: number;
    message: string;
    // Add other consistent metadata here
}

export interface DataAPIResponse<T> {
    body: T;           // This will be your orderTailorT[]
    status: number;
    message: string;
    // Add other consistent metadata here
}