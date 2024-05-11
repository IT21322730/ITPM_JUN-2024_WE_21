const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  itemId: {
    type: Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const CartItem = mongoose.model("CartItem", cartItemSchema);
module.exports = CartItem;
