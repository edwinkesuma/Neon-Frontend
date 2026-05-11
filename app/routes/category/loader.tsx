import type {LoaderFunctionArgs} from "react-router";
import type {PaginatedProductsResponse} from "~/types";

export async function loader({params}: LoaderFunctionArgs): Promise<PaginatedProductsResponse> {
    console.log("CATEGORY LOADER JALAN");

    const categoryId = params.id;

    const baseUrl = import.meta.env.VITE_API_URL;

    const productRes = await fetch(`${baseUrl}/api/v1/products/category/${categoryId}?sortBy=price&sortOrder=desc&pageSize=20`);

    return await productRes.json();
}