import React from 'react';
import {Link} from "react-router";
import {FaEdit, FaTrash} from "react-icons/fa";
import type {Product} from "~/types";

type ProductDashboardItemProps = {
    product: Product;
    onDelete: (id: string) => void;
};

const ProductDashboardItem = ({product, onDelete}: ProductDashboardItemProps) => {
    return (
        <div
            className="flex flex-row border-b border-gray-400 hover:text-red-600 hover:border-red-600 py-3 transition hover:-translate-y-1 hover:shadow-lg">
            <img className="w-20 h-30 object-contain" src={product.image} alt={product.name}/>
            <div className="flex flex-col ml-5 gap-2">
                <h2 className="text-xl font-semibold line-clamp-2">{product.name}</h2>
                <div className="flex flex-row gap-5">
                    <Link
                        to={`/admin/products/${product.id}/edit`}
                        className="flex flex-row items-center justify-center text-md text-gray-500 align-middle gap-1 transition hover:text-red-600 hover:cursor-pointer"
                    >
                        <FaEdit/>
                        <span>Edit</span>
                    </Link>
                    <button
                        onClick={() => onDelete(product.id)}
                        className="flex flex-row items-center justify-center text-md text-gray-500 align-middle gap-1 transition hover:text-red-600 hover:cursor-pointer">
                        <FaTrash/>
                        <span>Delete</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDashboardItem;