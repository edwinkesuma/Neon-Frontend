import React from 'react';
import type {Category} from "~/routes/home/types";
import {Link} from "react-router";

const CategoryItem = ({category}: { category: Category }) => {
    return (
        <Link to={`/categories/${category.id}/${category.name}`}>
            <div className="flex min-w-30 flex-col items-center transition hover:text-red-600 pt-1">
                <div
                    className="flex h-28 w-28 items-center justify-center rounded-full bg-white border border-gray-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg p-1.5"
                >
                    <img
                        src={category.imageUrl}
                        className="h-full w-full rounded-full "
                        width={200}
                        height={200}
                        alt={`${category.name} image`}/>
                </div>

                <p className="mt-3 text-center text-sm font-medium ">
                    {category.name}
                </p>
            </div>
        </Link>
    );
};

export default CategoryItem;