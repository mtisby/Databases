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

app.get('/dog', (req, res) => {
    res.send("woof")
})

app.listen(port, () => {
    console.log(`listening on ${port}`)
})