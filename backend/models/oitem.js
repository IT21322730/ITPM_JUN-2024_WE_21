const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const oitemSchema =  new Schema({

    
    name : {
        type : String,
        //required : true
    },
    price : {
        type : Number,
        //required : true
    },
    quantity : {
        type : Number,
        //required : true
    }

})

const oitem = mongoose.model("oitem",oitemSchema);

module.exports = oitem;  
