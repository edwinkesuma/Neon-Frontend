import React, {useEffect, useRef, useState} from 'react';
import {MdImageNotSupported} from "react-icons/md";
import Button from "~/components/Button";
import {useNavigate} from "react-router";
import type {ProductFormData, SimpleCategories} from "~/types";

const CreateProductPage = () => {
    const baseUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const [categories, setCategories] = useState<SimpleCategories[]>([]);

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

        fetchCategories();
    }, []);

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<ProductFormData>({
        name: "",
        description: "",
        price: "",
        discountPercentage: "",
        stock: "",
        categoryId: ""
    });
    const [imagesPreview, setImagesPreview] = useState<string[]>(["", "", ""]);

    const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const [imageFiles, setImageFiles] = useState<(File | null)[]>([]);

    const handlePickImage = (index: number) => {
        fileInputRefs.current[index]?.click();
    }

    const handleChangeImage = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {

        const file = e.target.files?.[0];

        if (!file) return;

        // save file
        setImageFiles(prevState => {
            const updated = [...prevState];
            updated[index] = file;
            return updated;
        });

        // preview image
        setImagesPreview(prevState => {
            const updated = [...prevState];
            updated[index] = URL.createObjectURL(file);
            return updated;
        });
    }

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        console.log("submit");

        try {

            setLoading(true);

            const body = new FormData();

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
                            categoryId: formData.categoryId
                        }),
                    ],
                    {type: "application/json"}
                )
            );

            imageFiles.forEach((file) => {
                if (file) {
                    body.append("images", file);
                }
            });

            const response = await fetch(
                `${baseUrl}/api/v1/products`,
                {
                    method: "POST",
                    body: body,
                }
            );

            if (!response.ok) {
                throw new Error("Failed create product");
            }

            alert("Success create product");

            navigate("/");
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="flex justify-center p-6">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg border border-gray-200"
            >
                <h1 className="mb-6 text-2xl font-bold text-gray-800">
                    Create Product
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
                        {Array.from({length: 3}).map((item, index) => <div key={index} className="space-y-4">

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
                                {imagesPreview[index] !== "" ? <img
                                    src={imagesPreview[index]}
                                    alt={`category image: ${index}`}
                                    className="aspect-square image-rendering-auto"
                                /> : <MdImageNotSupported className="text-gray-500 text-4xl"/>}
                            </div>


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
                        isPrimary={true}>{loading ? "Creating..." : "Create Product"}</Button>
                </div>
            </form>
        </main>
    );
};

export default CreateProductPage;