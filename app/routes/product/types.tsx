export interface ProductImage {
    id: string;
    imageUrl: string;
    publicId: string;
}

export interface ProductDetail {
    id: string;
    name: string;
    description: string;
    images: ProductImage[];
    stock: number;
    price: number;
    discountPercentage: number;
}