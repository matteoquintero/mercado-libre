import express from 'express'
import { getProduct, getProducts } from '../services/product';

const routesProduct = express.Router()

routesProduct.get('/products', (req, res)=>{
    const filter = req.query.filter?.toString()
    if(!filter){
        res.status(422).json({message: `Need filter value.`})
        return
    }

    getProducts(filter).then(products => {
        res.status(200).json(products);
    })
    .catch(_ => {
        res.status(500).json({message: `Internal Server Error.`});
    })
})

routesProduct.get('/product', (req, res)=>{
    const id = req.query.id?.toString()
    if(!id){
        res.status(422).json({message: `Need id value.`})
        return
    }

    getProduct(id).then(product => {
        res.status(200).json(product);
    })
    .catch(_ => {
        res.status(500).json({message: `Internal Server Error.`});
    })
})

export default routesProduct