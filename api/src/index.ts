import express from 'express'
import routesProduct from './routes/product'
import { auth } from './services/auth'

const app = express()

app.use(auth) //Middleware to auth app
app.use(express.json()) //Middleware to map request to json
app.use('/api/v1', routesProduct) //Routes of products

app.listen(3000, () => {
    console.log('is listen')
})

