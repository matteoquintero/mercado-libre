import { Price } from "./price";

export interface Product{
    id: String,
    title: String,
    picture: String,
    condition: String,
    free_shipping: Boolean,
    address: String,
    price: Price
}