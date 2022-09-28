import { Author } from "./author";
import { Product } from "./product";
import { Category, Status } from "./types";

export interface responseMercadoLibre {
    author: Author,
    categories: Category,
    items: Array<Product>,
}

export interface responseFetch {
    status: Status,
    data:any[]
}