import React from 'react';
import type {Product} from "~/routes/home/types";
import {Link} from "react-router";

const ProductItem = ({product}: { product: Product }) => {
    return (
        <Link to={`/products/${product.id}`}>
            <div
                key={product.id}
                className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                {/* Image */}
                <img
                    src={product.image}
                    alt={product.name}
                    className="aspect-square w-full object-cover p-2 rounded-t-2xl"
                />

                {/* Content */}
                <div className="flex flex-col h-full pb-2 px-2">
                    <h3
                        className="line-clamp-2 text-lg">
                        {product.name}
                    </h3>
                    <div className="mt-auto">
                        <h3 className="text-red-600 font-bold text-xl">${product.price}</h3>
                        <h3 className="text-xs font-light">Stock: {product.stock}</h3>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductItem;