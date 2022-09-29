import express from 'express'
import routesProduct from './routes/product'
import { auth } from './services/auth'
import cors from 'cors';
import {corsOptions} from './services/cors'
const app = express()

app.options('*', cors(corsOptions)) //Config cors
app.use(auth) //Middleware to auth app
app.use(express.json()) //Middleware to map request to json
app.use('/api/v1', routesProduct) //Routes of products

app.listen(3100, () => {
    console.log('is listen')
})

