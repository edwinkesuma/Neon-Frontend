import React, {useState} from 'react';
import {Link, useLoaderData} from "react-router";
import Button from "~/components/Button";
import {FaSquarePlus} from "react-icons/fa6";
import CategoryDashboardItem from "~/components/CategoryDashboardItem";
import type {loader} from "./loader";
import ProductDashboardItem from "~/components/ProductDashboardItem";

export {loader} from "./loader";


const ProductDashboard = () => {
    const loaderProducts = useLoaderData<typeof loader>();
    const [products, setProducts] = useState(loaderProducts.content);

    const baseUrl = import.meta.env.VITE_API_URL;

    const handleDelete = async (id: string) => {
        const confirmed = confirm("Delete this product?");

        if (!confirmed) return;

        try {
            const response = await fetch(`${baseUrl}/api/v1/products/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete");
            }

            setProducts(prev => prev.filter(category => category.id !== id));

            alert("Product deleted");
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        }
    };

    return (
        <main className="flex flex-col justify-center align-middle px-5">
            <div className="mb-5">
                <Link to="/admin/categories/create"><Button isPrimary={true}><FaSquarePlus/> Create a Product</Button></Link>
            </div>
            {
                products.map(product => <ProductDashboardItem
                    key={product.id} product={product} onDelete={handleDelete}/>)
            }
        </main>
    );
};

export default ProductDashboard;