import mongoose from "mongoose"
const { Schema } = mongoose;

const farmSchema = new Schema({
    name: {
        type: String,
        required: [true, "Farm name required"]
    },
    city: {
        type: String
    },
    email: {
        type: String,
        required: [true, "Email required"]
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})


const Farm = mongoose.model('Farm', farmSchema);

export { Farm }