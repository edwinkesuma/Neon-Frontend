import React from 'react';
import type {Route} from "./+types/index";
import {useLoaderData} from "react-router";
import type {loader} from "./loader";
import CategorySlider from "~/components/CategorySlider";
import ProductsGrid from "~/components/ProductsGrid";

export {loader} from "./loader";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Neon | Welcome"},
        {name: "description", content: "Neon e-commerce website"},
    ];
}

const HomePage = () => {
    const {categories, products} = useLoaderData<typeof loader>();

    return (
        <div>
            <CategorySlider categories={categories.content}/>
            <ProductsGrid products={products.content}/>
        </div>
    );
};

export default HomePage;