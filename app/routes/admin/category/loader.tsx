import type {Category, PaginatedCategoriesResponse} from "~/types";
import type {LoaderFunctionArgs} from "react-router";

const baseUrl = import.meta.env.VITE_API_URL;

export async function loader(): Promise<PaginatedCategoriesResponse> {
    console.log("LOADER JALAN");

    const categories = await fetch(`${baseUrl}/api/v1/categories?pageNumber=0&pageSize=10&sortBy=name&sortOrder=asc`);

    return await categories.json();
}

export async function categoryDetailsLoader({params}: LoaderFunctionArgs): Promise<Category> {
    console.log("CATEGORY DETAILS LOADER JALAN");

    const categoryId = params.id;

    const category = await fetch(`${baseUrl}/api/v1/categories/${categoryId}`);

    return await category.json();
}