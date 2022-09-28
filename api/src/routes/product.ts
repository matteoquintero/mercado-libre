import express from 'express'
import { getProducts } from '../services/product';

const routesProduct = express.Router()

routesProduct.get('/products', (_, res)=>{
    getProducts('mesa').then(products => {
        res.status(200).json(products);
    })
    .catch(_ => {
        res.status(500).json({message: `Internal Server Error.`});
    })
})

routesProduct.get('/product_detail', (_, res)=>{
    console.log({res})
})

export default routesProduct