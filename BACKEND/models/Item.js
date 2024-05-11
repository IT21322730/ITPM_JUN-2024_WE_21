const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    item_code:{
        type:String,
    },
    itemName : {
        type : String,
    },
    itemCategory : {
        type : String,
    },
    itemStatus : {
        type : String,
    },
    price : {
        type : Number,
    },
    potion : {
        type : String,
    },
    description : {
        type : String,
    },
    image: {
        type : String, // Assuming you store image URLs
    },
    ratings: {
        type: Number,
        default: 0,
    },
    numReviews: {
        type: Number,
        default: 0,
    },
    avgRating: {
        type: Number,
        default: 0,
    },
});

const item = mongoose.model("item",itemSchema);

module.exports = item;
