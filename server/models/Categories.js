const mongoose = require('mongoose');
const Schema =  mongoose.Schema;


const CategoriesSchema = new Schema({
    cat_name:{
        type: String,
        required: true,
    },
    cat_id:{
        type: String,
        required: true,
    }
})

const CategoriesModel = mongoose.model('categories', CategoriesSchema);

module.exports = CategoriesModel;