import express from "express";
import mongoose from "mongoose"
import { Product } from './models/product.js';
import methodOverride from "method-override"


mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log("mongo connected")
    })
    .catch(err => {
        console.log("mongo connection error")
    })

const app = express();
const port = 3000;
const categories = ['fruit', 'vegetable', 'dairy'];

app.set('view engine', 'ejs');
app.use(methodOverride('_method'))
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

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.redirect(`./products/${newProduct._id}`)
 })

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    console.log(product._id)
    res.render('./products/show.ejs', {product})
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('./products/edit.ejs', {product, categories})
})

app.put('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true})
    res.redirect(`./products/${product._id}`)
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`./products/${product._id}`);
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

app.listen(port, () => {
    console.log(`listening on ${port}`)
})