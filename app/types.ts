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

export interface ProductImage {
    id: string;
    imageUrl: string;
    publicId: string;
}

export interface ProductDetail {
    id: string;
    name: string;
    description: string;
    images: ProductImage[];
    stock: number;
    price: number;
    discountPercentage: number;
    categoryId: string | null;
}

export interface CategoryFormData {
    name: string;
    image: File | string;
}

export interface ProductFormData {
    name: string;
    description: string;
    price: string;
    discountPercentage: string;
    stock: string;
    categoryId: string;
}

export interface SimpleCategories {
    id: string;
    name: string;
}

export interface ProductImageItem {
    id?: string,
    preview: string,
    file?: File,
    existingUrl?: string
}