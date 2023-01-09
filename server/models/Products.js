const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = Schema({
    sku_id:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    onSale:{
        type: Boolean,
        required: true,
    },
    featured:{
        type: Boolean,
        required: true,
    },
    new:{
        type: Boolean,
        required: true,
    },
    category:{
        type: Array,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required:true,
    },
    discountedPrice:{
        type: Number,
        required:true,
    },
    quantity:{
        type: Number,
        required:true,
    },
})

const ProductsModel = mongoose.model('Products', ProductSchema)

module.exports = ProductsModel