import React from 'react';
import type {Category} from "~/types";
import {FaEdit} from "react-icons/fa";
import {Link} from "react-router";

const CategoryDashboardItem = ({category}: { category: Category }) => {
    return (
        <div
            className="flex flex-row border-b border-gray-400 hover:text-red-600 hover:border-red-600 py-3 transition hover:-translate-y-1 hover:shadow-lg">
            <img className="w-30 h-20" src={category.imageUrl} alt={category.name}/>
            <div className="flex flex-col ml-5 gap-2">
                <h2 className="text-xl font-semibold">{category.name}</h2>
                <Link to={`/admin/categories/${category.id}`}>
                    <div
                        className="flex flex-row text-gray-500 align-middle gap-1 transition hover:text-red-600 hover:cursor-pointer">
                        <FaEdit/>
                        <h3>Edit</h3>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default CategoryDashboardItem;