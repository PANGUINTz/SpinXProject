import mongoose from "mongoose";

export const ProductSchema = new mongoose.Schema({
    product_name: {
        type: String,
        require: [true, "Product Name is required"],
        unique: [true, "Product Name Exist"]
    },

    product_img:{type: String},
    product_brand: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true,
        unique: false
    },
    description: {type: String},
    categories: {type: String},
    bestSeller: {type: String},
    created_at: { type: Date, default: Date.now }
})

export default mongoose.model.products || mongoose.model('products', ProductSchema)