import { mongoose } from "mongoose";

mongoose.connect('mongodb://localhost:27017/shopApp');

// Mongoose uses operation buffering which allows
// us to start using models we define immediately 
// without having Mongoose connected

// we will be alerted about connection errors later

const productSchema = new mongoose.Schema({
    // short way is to:
    // name: String,
    // long way is to do :
    // name: {
    // type: String,
    // required: true // these allow us to use validations
    // // saying that certain things are required
    // // basically this allows us to add more detail into this
    //}
    
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number // this is also a form of validation 
                     // however there is no required value but errors
                     // will come up if type requirements are not met
    }
});

const Product = mongoose.model('Product', productSchema);

const bike = new Product({ name: 'Mountain Bike', price: 599 })
bike.save()
    .then(data => {
        console.log('it worked!!')
        console.log(data)
    })
    .catch(err => {
        console.log('oops bih')
        console.log(err);
    })