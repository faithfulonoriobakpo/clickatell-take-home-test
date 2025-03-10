export interface Product {
    id: number;
    title: string;
    slug: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
    creationAt: string;
    updatedAt: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    image: string;
    creationAt: string;
    updatedAt: string;
}

export interface GetProductsParams {
    price_min?: number;
    price_max?: number;
    title?: string;
    categoryId?: number;
    offset?: number;
    limit?: number;
}