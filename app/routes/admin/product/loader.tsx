import type {PaginatedCategoriesResponse, PaginatedProductsResponse} from "~/types";

const baseUrl = import.meta.env.VITE_API_URL;

export async function loader(): Promise<PaginatedProductsResponse> {
    console.log("LOADER PRODUCT JALAN");

    const products = await fetch(`${baseUrl}/api/v1/products?sortBy=price&sortOrder=desc&pageSize=20`);

    return await products.json();
}