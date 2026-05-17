import type {LoaderFunctionArgs} from "react-router";
import type {PaginatedProductsResponse, ProductDetail} from "~/types";

const baseUrl = import.meta.env.VITE_API_URL;

export async function loader(): Promise<PaginatedProductsResponse> {
    console.log("LOADER PRODUCT JALAN");

    const products = await fetch(`${baseUrl}/api/v1/products?sortBy=price&sortOrder=desc&pageSize=20`);

    return await products.json();
}

export async function productDetailsLoader({ params }: LoaderFunctionArgs): Promise<ProductDetail> {
    console.log("PRODUCT DETAILS LOADER JALAN");

    const productId = params.id;

    const response = await fetch(`${baseUrl}/api/v1/products/${productId}`);

    const data = await response.json();

    console.log(JSON.stringify(data, null, 2));

    return data;
}