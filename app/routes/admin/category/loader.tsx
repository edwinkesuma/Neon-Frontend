import type {PaginatedCategoriesResponse} from "~/types";

export async function loader(): Promise<PaginatedCategoriesResponse> {
    console.log("LOADER JALAN");

    const baseUrl = import.meta.env.VITE_API_URL;

    const categories = await fetch(`${baseUrl}/api/v1/categories?pageNumber=0&pageSize=10&sortBy=name&sortOrder=asc`);

    return await categories.json();
}