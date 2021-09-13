import { mongoose } from "mongoose";

mongoose.connect('mongodb://localhost:27017/movieApp');

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String,
})

// pass in a string containing the name of our model, 
// after that pass in the schema --> this will create
// a collection for us
const Movie = mongoose.model('Movie', movieSchema);

// using the object.save() method will add it 
// to our Mongo database but this is only for when
// we create a single instance

// insertMany() will automatically save them to the
// database 
