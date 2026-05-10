import React, {useState} from 'react';
import type {loader} from "./loader";
import {useLoaderData} from "react-router";
import Button from "~/components/Button";
import {FaCartPlus} from "react-icons/fa6";

export {loader} from "./loader";

type ImageProps = {
    imageUrl: string;
    name: string;
}

const ProductDetailsPage = () => {
    const product = useLoaderData<typeof loader>();

    const [selectedImage, setSelectedImage] = useState<ImageProps>({
        imageUrl: product.images[0].imageUrl,
        name: product.name,
    });

    return (
        <main className="bg-white p-5">
            <div className="flex flex-row">
                <div className="flex flex-col max-w-lg overflow-hidden">
                    <img
                        className="w-full"
                        src={selectedImage.imageUrl}
                        alt={selectedImage.name}
                    />
                    <div className="flex flex-row mt-2">
                        {product.images.map(image => <img className="w-40 mx-1 hover:cursor-pointer" onClick={() =>
                            setSelectedImage({
                                imageUrl: image.imageUrl,
                                name: product.name,
                            })} key={image.id} src={image.imageUrl}
                                                          alt={product.name}/>)}
                    </div>
                </div>

                <section className="flex flex-col ms-10">
                    <h1 className="text-xl font-bold">{product.name}</h1>
                    <h3 className="text-gray-500 my-2">Stock: {product.stock}</h3>
                    <h2 className="text-red-600 font-bold text-3xl">${product.price}</h2>
                    <p className="mt-10">{product.description}</p>
                    <div className="flex flex-row mt-auto gap-5">
                        <Button isPrimary={false}>
                            <FaCartPlus/>
                            Add to Cart
                        </Button>
                        <Button isPrimary={true}>
                            Buy Now
                        </Button>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default ProductDetailsPage;