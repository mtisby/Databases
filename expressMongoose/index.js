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
app.use(express.urlencoded({extended: true}))

// use async and await here because 
// we are requesting data from our database
// and we can run our code and 
// wait for our request to be resolved
app.get('/products', async (req, res) => {
    const products = await Product.find({})
    res.render('./products/index.ejs', {products})
})

app.get('/products/new', (req, res) => {
    res.render('./products/new')
})

app.post('/products', (req, res) => {
    console.log(req.body);
    res.send("making ur product")
 })

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    console.log(product._id)
    res.render('./products/show.ejs', {product})
})

app.listen(port, () => {
    console.log(`listening on ${port}`)
})