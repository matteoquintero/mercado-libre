import { Product } from "../types/product";
import { responseMercadoLibre } from "../types/response";
import { Category } from "../types/types";
import { fetchData } from "./fetch";

export const getProducts = (filter:string):Promise<responseMercadoLibre> => {
    const url ='https://api.mercadolibre.com/sites/MLA/search?limit=4&q='+filter;
    let products: Array<Product>;
    let categories: Category;
    let responseMercadoLibre: responseMercadoLibre = {
        author:{
            name:'',
            lastname:''
        },
        categories:[],
        items:[]
    };
    return new Promise((resolve, reject) => {
        fetchData(url)
        .then(data => {
            //Map data to create list of product
            products = data.results.map((product: any) => ({
                    id: product.id,
                    title: product.title,
                    picture: product.thumbnail,
                    condition: product.condition,
                    free_shipping: product.shipping.free_shipping,
                    address: Object.values(product.address).join(' ')
 
			}));

            //Map and filter data to create list of categories
            categories = data.available_filters.find( 
                    (data: { id: string; }) => data.id == 'category'
                )
                .values
                .map(
                    (category: any) => { return category.name }
                )

            responseMercadoLibre.items = products;
            responseMercadoLibre.categories = categories;
            resolve(responseMercadoLibre)
        })
        .catch(error => {
            console.log({error})
            reject(true)
        })
    });
}