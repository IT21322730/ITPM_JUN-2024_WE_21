const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  itemName: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
