//model = collection
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});


//This line does two things: 
// 1) connects this product model to products collection in mongodb, 
// 2) Creates a product class you can use for crud operations.

const Product = mongoose.model("Product", productSchema); 
//mongodb converts product to products collection by itself.

export default Product;