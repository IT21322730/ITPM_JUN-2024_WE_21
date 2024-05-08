const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    restaurantname : {
        type : String,
        required : true
    },
    restaurantaddress : {
        type : String,
        required : true
    },
    restaurantowner : {
        type : String,
        required : true
    },
    restaurantphone : {
        type : Number,
        required : true
    },
    restaurantemail : {
        type : String,
        required : true
    },
    restaurantaccNumber : {
        type : String,
        required : true
    },
    restaurantitem : {
        type : String,
        required : true
    },
    restaurantunitPrice : {
        type : Number,
        required : true
    }
    
})

const Restaurant = mongoose.model("Restaurant",restaurantSchema);

module.exports = Restaurant;