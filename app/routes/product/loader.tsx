import type {LoaderFunctionArgs} from "react-router";
import type {ProductDetail} from "~/types";

export async function loader({params}: LoaderFunctionArgs): Promise<ProductDetail> {
    console.log("PRODUCT LOADER JALAN");

    const productId = params.id;

    const baseUrl = import.meta.env.VITE_API_URL;

    const productRes = await fetch(`${baseUrl}/api/v1/products/${productId}`);

    return await productRes.json();
}