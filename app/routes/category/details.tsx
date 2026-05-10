import React from 'react';
import type {loader} from "./loader";
import {useLoaderData, useParams} from "react-router";
import ProductsGrid from "~/components/ProductsGrid";

export {loader} from "./loader";

const CategoryDetailsPage = () => {
    const products = useLoaderData<typeof loader>();

    const {name} = useParams();

    return (
        <section>
            <h1 className="text-2xl font-bold">{name}:</h1>
            <ProductsGrid products={products.content}/>
        </section>
    );
};

export default CategoryDetailsPage;