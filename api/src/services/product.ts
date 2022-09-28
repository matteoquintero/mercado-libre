import { Product, ProductDetail } from "../types/product";
import { responseProducts, responseProduct } from "../types/product";
import { Category } from "../types/types";
import { fetchData } from "./fetch";

export const getProducts = (filter:string):Promise<responseProducts> => {
    const url =`https://api.mercadolibre.com/sites/MLA/search?limit=4&q=${filter}`;
    let products: Array<Product>;
    let categories: Category;
    let responseProducts: responseProducts = {
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
            console.log({data})
            products = data.results.map((product: any) => ({
                    id: product.id || null,
                    title: product.title || null,
                    picture: product.thumbnail || null,
                    condition: product.condition || null,
                    free_shipping: product.shipping.free_shipping || null,
                    address: Object.values(product.address).join(' ') || null
			}));

            //Map and filter data to create list of categories
            categories = data.filters.find( 
                    (data: { id: string; }) => data.id == 'category'
                )
                .values
                .map(
                    (category: any) => { return category.name }
                )

            responseProducts.items = products;
            responseProducts.categories = categories;
            resolve(responseProducts)
        })
        .catch(error => {
            console.log({error})
            reject(true)
        })
    });
}


export const getProduct = (id:string):Promise<responseProduct> => {
    let productDetail:ProductDetail;
    let responseProduct:responseProduct = {
        author: {
            name: 's',
            lastname: ''
        },
        item: undefined
    }    
    return new Promise((resolve, reject) => {
        Promise.all([
            fetchData(`https://api.mercadolibre.com/items/${id}`),
            fetchData(`https://api.mercadolibre.com/items/${id}/description`)
        ]).then(function (responses) {
            return Promise.all(responses.map(function (response) {
                return response;
            }));
        }).then(function (data:any) {
            productDetail = {
                id: data[0].id,
                title: data[0].title,
                picture: data[0].thumbnail,
                condition: data[0].condition,
                free_shipping: data[0].shipping.free_shipping,
                sold_quantity: data[0].sold_quantity,
                description: data[1].plain_text,
                price:{
                    currency: data[0].currency_id,
                    amount: data[0].price,
                    decimals: 0
                }
            }
            responseProduct.item = productDetail
            resolve(responseProduct)
        }).catch(function (error) {
            console.log({error});
            reject(true)
        });
    });

}

