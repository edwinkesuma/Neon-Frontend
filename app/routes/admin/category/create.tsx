import React, {useRef, useState} from 'react';
import Button from "~/components/Button";
import type {CategoryFormData} from "~/types";
import {MdImageNotSupported} from "react-icons/md";
import {useNavigate} from "react-router";

const CreateCategoryPage = () => {
    const baseUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<CategoryFormData>({
        name: "",
        image: ""
    });

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [previewImage, setPreviewImage] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handlePickImage = () => {
        fileInputRef.current?.click();
    }

    const handleChangeImage = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file = e.target.files?.[0];

        if (!file) return;

        setImageFile(file);

        // preview image baru
        setPreviewImage(URL.createObjectURL(file));
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
                "category",
                new Blob(
                    [
                        JSON.stringify({
                            name: formData.name,
                        }),
                    ],
                    {type: "application/json"}
                )
            );

            if (imageFile) {
                body.append("image", imageFile);
            }

            const response = await fetch(
                `${baseUrl}/api/v1/categories`,
                {
                    method: "POST",
                    body: body,
                }
            );

            if (!response.ok) {
                throw new Error("Failed update category");
            }

            alert("Success update category");

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
                    Create Category
                </h1>

                {/* Category Name */}
                <div className="mb-5">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Category Name
                    </label>

                    <input
                        type="text"
                        placeholder="Input category name"
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

                {/* Image */}
                <div className="mb-6">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Category Image
                    </label>

                    <div className="space-y-4">

                        {/* Hidden Input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleChangeImage}
                            className="hidden"
                        />

                        {/* Preview Image */}
                        <div
                            onClick={handlePickImage}
                            className="flex justify-center items-center cursor-pointer overflow-hidden rounded-2xl border border-gray-300 hover:opacity-80 transition w-50 h-50"
                        >
                            {previewImage == "" ? <MdImageNotSupported className="text-gray-500 text-5xl"/> : <img
                                src={previewImage}
                                alt="Category image"
                                className="aspect-square image-rendering-auto"
                            />}
                        </div>

                        <p className="text-sm text-gray-500">
                            Click image to change
                        </p>

                    </div>
                </div>

                {/*Button*/}
                <div className="flex justify-center">
                    <Button
                        type="submit"
                        disabled={loading}
                        isPrimary={true}>{loading ? "Creating..." : "Create Category"}</Button>
                </div>
            </form>
        </main>
    );
};

export default CreateCategoryPage;