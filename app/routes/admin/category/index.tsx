import React from 'react';
import type {loader} from "./loader";
import {Link, useLoaderData} from "react-router";
import CategoryDashboardItem from "~/components/CategoryDashboardItem";
import Button from "~/components/Button";
import {FaSquarePlus} from "react-icons/fa6";

export {loader} from "./loader";


const CategoryDashboard = () => {
    const categories = useLoaderData<typeof loader>();

    return (
        <main className="flex flex-col justify-center align-middle px-5">
            <div className="mb-5">
                <Link to="/admin/categories/:id"><Button isPrimary={true}><FaSquarePlus/> Create a Category</Button></Link>
            </div>
            {
                categories.content.map(category => <CategoryDashboardItem
                    key={category.id} category={category}/>)
            }
        </main>
    );
};

export default CategoryDashboard;