import express from "express";
import mongoose from "mongoose"
import {Product} from './models/product.js';

mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log("mongo connected")
    })
    .catch(err => {
        console.log("mongo connection error")
    })

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/products', async (req, res) => {
    const products = await Product.find({})
    console.log(products)
    res.send("all products will be here")
})

app.listen(port, () => {
    console.log(`listening on ${port}`)
})