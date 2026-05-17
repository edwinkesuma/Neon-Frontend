import React, {useState} from 'react';
import type {loader} from "./loader";
import {Link, useLoaderData} from "react-router";
import CategoryDashboardItem from "~/components/CategoryDashboardItem";
import Button from "~/components/Button";
import {FaSquarePlus} from "react-icons/fa6";

export {loader} from "./loader";


const CategoryDashboard = () => {
    const loaderCategories = useLoaderData<typeof loader>();
    const [categories, setCategories] = useState(loaderCategories.content);

    const baseUrl = import.meta.env.VITE_API_URL;

    const handleDelete = async (id: string) => {
        const confirmed = confirm("Delete this category?");

        if (!confirmed) return;

        try {
            const response = await fetch(`${baseUrl}/api/v1/categories/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete");
            }

            setCategories(prev => prev.filter(category => category.id !== id));

            alert("Category deleted");
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        }
    };

    return (
        <main className="flex flex-col justify-center align-middle px-5">
            <div className="mb-5">
                <Link to="/admin/categories/create"><Button isPrimary={true}><FaSquarePlus/> Create a Category</Button></Link>
            </div>
            {
                categories.map(category => <CategoryDashboardItem
                    key={category.id} category={category} onDelete={handleDelete}/>)
            }
        </main>
    );
};

export default CategoryDashboard;