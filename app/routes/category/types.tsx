export interface Product {
    id: string;
    name: string;
    image: string | undefined;
    stock: number;
    price: number;
    discountPercentage: number;
}

export interface PaginatedProductsResponse {
    content: Product[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    lastPage: boolean;
}