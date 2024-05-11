const mongoose = require("mongoose");

// Define the card schema
const cardSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: true,
    unique: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
  cardHolderName: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Create the Card model
const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
