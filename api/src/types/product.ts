import { Price } from "./price";
import { Author } from "./author";
import { Category } from "./types";

export interface Product{
    id: String,
    title: String,
    picture: String,
    condition: String,
    free_shipping: Boolean,
    address: String,
    price: Price
}

export interface ProductDetail extends Partial<Product>{
    sold_quantity: Number,
    description: String
}

export interface responseProducts {
    author: Author,
    categories: Category,
    items: Array<Product>,
}

export interface responseProduct {
    author: Author,
    item: ProductDetail | null | undefined,
}
