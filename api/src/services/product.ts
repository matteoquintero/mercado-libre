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
            products = data.results.map((product: any) => ({
                    id: product.id || null,
                    title: product.title || null,
                    picture: product.thumbnail || null,
                    condition: product.condition || null,
                    free_shipping: product.shipping.free_shipping || null,
                    address: product.address.state_name +' '+ product.address.city_name || null,
                    price:{
                        currency: product.currency_id || null,
                        amount: product.price || null,
                        decimals: 0 //I can't find this value in api
                    }                    
			}));


            //Map and filter data to create list of categories
            //
            //in the test information it did not say what parameter 
            //to take the categories for that reason the repeated 
            //code of filters and available_filters
            if( data.available_filters.find( (data: { id: string; }) => data.id == 'category')){
                categories = data.available_filters.find( 
                    (data: { id: string; }) => data.id == 'category'
                )
                .values
                //Filter to reduce breadcrumbs
                .filter(
                    (category: any) => { return category.results > 1800 }
                )
                .map(
                    (category: any) => { return category.name }
                )
            } else if( data.filters.find( (data: { id: string; }) => data.id == 'category')){
                categories = data.filters.find( 
                    (data: { id: string; }) => data.id == 'category'
                )
                .values
                .map(
                    (category: any) => { return category.name }
                )
            }
 
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
        //Array of promises to get product detail
        Promise.all([
            fetchData(`https://api.mercadolibre.com/items/${id}`),
            fetchData(`https://api.mercadolibre.com/items/${id}/description`)
        ]).then(function (responses) {
            //Map of promises to create response
            return Promise.all(responses.map(function (response) {
                return response;
            }));
        }).then(function (data:any) {
            //Map data to create detail of product
            productDetail = {
                id: data[0].id || null,
                title: data[0].title || null,
                picture: data[0].thumbnail || null,
                condition: data[0].condition || null,
                free_shipping: data[0].shipping.free_shipping || null,
                sold_quantity: data[0].sold_quantity || null,
                description: data[1].plain_text || null,
                price:{
                    currency: data[0].currency_id || null,
                    amount: data[0].price || null,
                    decimals: 0
                }
            }
            responseProduct.item = productDetail
            resolve(responseProduct)
        }).catch(function (error) {
            console.log({error});
            reject(error)
        });
    });

}

