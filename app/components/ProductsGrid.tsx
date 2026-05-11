import React from 'react';
import ProductItem from "~/components/ProductItem";
import type {Product} from "~/types";

const ProductsGrid = ({products}: { products: Product[] }) => {
    return (
        <section>
            <div
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 my-10">
                {products.map((product) => <ProductItem key={product.id} product={product}/>)}
            </div>
        </section>
    );
};

export default ProductsGrid;