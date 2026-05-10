import React from 'react';
import type {Product} from "~/routes/home/types";
import ProductItem from "~/components/ProductItem";

const ProductsGrid = ({products}: { products: Product[] }) => {
    return (
        <section>
            <div
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 my-10">
                {products.map((product) => <ProductItem product={product}/>)}
            </div>
        </section>
    );
};

export default ProductsGrid;