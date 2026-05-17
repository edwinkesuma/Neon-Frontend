import React from 'react';
import type {Category} from "~/types";
import {FaEdit, FaTrash} from "react-icons/fa";
import {Link} from "react-router";

type CategoryDashboardItemProps = {
    category: Category;
    onDelete: (id: string) => void;
};

const CategoryDashboardItem = ({category, onDelete}: CategoryDashboardItemProps) => {
    return (
        <div
            className="flex flex-row border-b border-gray-400 hover:text-red-600 hover:border-red-600 py-3 transition hover:-translate-y-1 hover:shadow-lg">
            <img className="w-30 h-20" src={category.imageUrl} alt={category.name}/>
            <div className="flex flex-col ml-5 gap-2">
                <h2 className="text-xl font-semibold">{category.name}</h2>
                <div className="flex flex-row gap-5">
                    <Link
                        to={`/admin/categories/${category.id}/edit`}
                        className="flex flex-row items-center justify-center text-md text-gray-500 align-middle gap-1 transition hover:text-red-600 hover:cursor-pointer"
                    >
                        <FaEdit/>
                        <span>Edit</span>
                    </Link>
                    <button
                        onClick={() => onDelete(category.id)}
                        className="flex flex-row items-center justify-center text-md text-gray-500 align-middle gap-1 transition hover:text-red-600 hover:cursor-pointer">
                        <FaTrash/>
                        <span>Delete</span>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CategoryDashboardItem;