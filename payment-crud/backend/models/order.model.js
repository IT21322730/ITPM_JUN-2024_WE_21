const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Order schema
const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  itemIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
  ],
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered"],
    default: "pending",
  },
});

// Create and export the Order model
const Order = mongoose.model("Orderss", orderSchema);
module.exports = Order;
