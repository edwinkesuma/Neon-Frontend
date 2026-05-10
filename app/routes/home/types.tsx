export interface Category {
    id: string;
    name: string;
    imageUrl: string;
}

export interface PaginatedCategoriesResponse {
    content: Category[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    lastPage: boolean;
}

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

export type HomeLoaderData = {
    categories: PaginatedCategoriesResponse;
    products: PaginatedProductsResponse;
}