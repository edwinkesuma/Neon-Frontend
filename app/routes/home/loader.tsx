import type {HomeLoaderData} from "~/types";

export async function loader(): Promise<HomeLoaderData> {
    console.log("LOADER JALAN");

    const baseUrl = import.meta.env.VITE_API_URL;

    const [categoriesRes, productsRes] = await Promise.all([
        fetch(`${baseUrl}/api/v1/categories?pageNumber=0&pageSize=10&sortBy=name&sortOrder=asc`),
        fetch(`${baseUrl}/api/v1/products?sortBy=price&sortOrder=desc&pageSize=20`),
    ]);

    const [categories, products] = await Promise.all([
        categoriesRes.json(),
        productsRes.json(),
    ]);

    return {
        categories,
        products,
    };
}