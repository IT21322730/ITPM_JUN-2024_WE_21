const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const complainSchema = new Schema({
    holderName: {
        type: String,
        //required: true
    },
    holderTelephoneNumber: {
        type: Number,
        //required: true
    },
    complain: {
        type: String,
        //required: true
    }
});

const Complain = mongoose.model("Complain", complainSchema);

module.exports = Complain;
