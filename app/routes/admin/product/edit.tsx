import React, {useEffect, useRef, useState} from 'react';
import {MdImageNotSupported} from "react-icons/md";
import Button from "~/components/Button";
import {useLoaderData, useNavigate, useParams} from "react-router";
import type {ProductFormData, ProductImageItem, SimpleCategories} from "~/types";
import type {productDetailsLoader} from "~/routes/admin/product/loader";
import {FaTrash} from "react-icons/fa";

export {productDetailsLoader as loader} from "./loader";

const EditProductPage = () => {
    const product = useLoaderData<typeof productDetailsLoader>();

    const {id} = useParams();

    const baseUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const [categories, setCategories] = useState<SimpleCategories[]>([]);
    const [images, setImages] = useState<ProductImageItem[]>([]);

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<ProductFormData>({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        discountPercentage: product.discountPercentage.toString(),
        stock: product.stock.toString(),
        categoryId: product.categoryId ?? ""
    });

    const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handlePickImage = (index: number) => {
        fileInputRefs.current[index]?.click();
    }

    const handleChangeImage = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {

        const file = e.target.files?.[0];

        if (!file) return;

        setImages(prevState => {
            const temporaryImage: ProductImageItem = {
                preview: URL.createObjectURL(file),
                file: file
            };
            return [...prevState, temporaryImage];
        });
    }

    const handleDeleteImage = (idx: number) => {
        setImages(prev =>
            prev.filter((_, index) => index !== idx)
        );
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        console.log("submit");

        try {

            setLoading(true);

            const body = new FormData();

            const existingImages = images
                .filter(img => img.existingUrl)
                .map(img => img.existingUrl);

            const newFiles = images
                .filter(img => img.file)
                .map(img => img.file);

            body.append(
                "product",
                new Blob(
                    [
                        JSON.stringify({
                            name: formData.name,
                            description: formData.description,
                            price: Number(formData.price),
                            discountPercentage: Number(formData.discountPercentage),
                            stock: Number(formData.stock),
                            categoryId: formData.categoryId,
                            existingImages: existingImages
                        }),
                    ],
                    {type: "application/json"}
                )
            );

            newFiles.forEach((file) => {
                if (file) {
                    body.append("images", file);
                }
            });

            const response = await fetch(
                `${baseUrl}/api/v1/products/${id}`,
                {
                    method: "PUT",
                    body: body,
                }
            );

            if (!response.ok) {
                throw new Error("Failed update product");
            }

            alert("Success update product");

            navigate("/");
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(
                    `${baseUrl}/api/v1/categories/simple`
                );

                const data: SimpleCategories[] = await response.json();

                setCategories(data);
            } catch (error) {
                console.error(error);
            }
        };

        const setImagePreviews = () => {
            const tempImages: ProductImageItem[] =
                product.images.map(image => ({
                    preview: image.imageUrl,
                    existingUrl: image.imageUrl
                }));

            setImages(tempImages);
        };


        fetchCategories();
        setImagePreviews();
    }, []);

    return (
        <main className="flex justify-center p-6">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg border border-gray-200"
            >
                <h1 className="mb-6 text-2xl font-bold text-gray-800">
                    Update Product
                </h1>

                {/* Product Name */}
                <div className="mb-5">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Product Name
                    </label>

                    <input
                        type="text"
                        placeholder="Input product name"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value,
                            })
                        }
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                    />
                </div>

                {/* Product Description */}
                <div className="mb-5">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Product Description
                    </label>

                    <input
                        type="text"
                        placeholder="Input product description"
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                description: e.target.value,
                            })
                        }
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                    />
                </div>

                {/* Product Price */}
                <div className="mb-5">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Product Price
                    </label>

                    <input
                        type="text"
                        inputMode="decimal"
                        placeholder="Input product price"
                        value={formData.price}
                        onChange={(e) => {

                            let value = e.target.value;

                            // hanya angka dan titik
                            value = value.replace(/[^0-9.]/g, "");

                            // cegah lebih dari 1 titik
                            const parts = value.split(".");
                            if (parts.length > 2) {
                                value = parts[0] + "." + parts.slice(1).join("");
                            }

                            setFormData({
                                ...formData,
                                price: value,
                            });
                        }}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                    />
                </div>

                {/* Product Discount Percentage */}
                <div className="mb-5">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Product Discount Percentage
                    </label>

                    <input
                        type="text"
                        inputMode="decimal"
                        placeholder="Input product discount percentage"
                        value={formData.discountPercentage}
                        onChange={(e) => {

                            let value = e.target.value;

                            // hanya angka dan titik
                            value = value.replace(/[^0-9.]/g, "");

                            // cegah lebih dari 1 titik
                            const parts = value.split(".");
                            if (parts.length > 2) {
                                value = parts[0] + "." + parts.slice(1).join("");
                            }

                            setFormData({
                                ...formData,
                                discountPercentage: value,
                            });
                        }}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                    />
                </div>

                {/* Product Stock */}
                <div className="mb-5">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Product Stock
                    </label>

                    <input
                        type="text"
                        inputMode="decimal"
                        placeholder="Input product stock"
                        value={formData.stock}
                        onChange={(e) => {

                            let value = e.target.value;

                            // hanya angka dan titik
                            value = value.replace(/[^0-9.]/g, "");

                            // cegah lebih dari 1 titik
                            const parts = value.split(".");
                            if (parts.length > 2) {
                                value = parts[0] + "." + parts.slice(1).join("");
                            }

                            setFormData({
                                ...formData,
                                stock: value,
                            });
                        }}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                    />
                </div>

                <div className="mb-5">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Product Stock
                    </label>

                    <select
                        className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
                        value={formData.categoryId}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                categoryId: e.target.value,
                            })
                        }
                    >
                        <option value="">
                            Select Category
                        </option>

                        {categories.map((category) => (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Image */}
                <div className="mb-6">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Product Images
                    </label>

                    <div className="flex flex-row justify-between">
                        {Array.from({length: 3}).map((item, index) => <div key={index} className="relative">
                            <div className="space-y-4">
                                {/* Hidden Input */}
                                <input
                                    ref={(el) => {
                                        fileInputRefs.current[index] = el;
                                    }}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleChangeImage(e, index)}
                                    className="hidden"
                                />

                                {/* Preview Image */}
                                <div
                                    onClick={() => handlePickImage(index)}
                                    className="flex items-center justify-center cursor-pointer overflow-hidden rounded-2xl border border-gray-300 hover:opacity-80 transition w-30 h-30"
                                >
                                    {images[index]?.preview ? (
                                        <img
                                            src={images[index].preview}
                                            alt={`product image: ${index}`}
                                            className="aspect-square image-rendering-auto"
                                        />
                                    ) : (
                                        <MdImageNotSupported className="text-gray-500 text-4xl"/>
                                    )}
                                </div>
                            </div>

                            {images[index]?.preview ? (
                                <button
                                    type="button"
                                    className="absolute flex justify-center items-center h-7 w-7 top-1 text-xs right-1 bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-600 hover:cursor-pointer"
                                    onClick={() => handleDeleteImage(index)}
                                >
                                    <FaTrash/>
                                </button>
                            ) : null}


                        </div>)}
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                        Click images to change
                    </p>
                </div>


                {/*Button*/}
                <div className="flex justify-center">
                    <Button
                        type="submit"
                        disabled={loading}
                        isPrimary={true}>{loading ? "Creating..." : "Update Product"}</Button>
                </div>
            </form>
        </main>
    );
};

export default EditProductPage;