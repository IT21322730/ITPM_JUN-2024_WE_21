const CartItem = require("../models/cart.item.model");

// Create a new cart item
exports.createCartItem = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Check if the item already exists in the user's cart
    const existingCartItem = await CartItem.findOne({ userId, itemId });

    if (existingCartItem) {
      // If the item exists, increase the quantity
      existingCartItem.quantity++;
      await existingCartItem.save();
      res.status(200).json(existingCartItem);
    } else {
      // If the item doesn't exist, create a new cart item
      const newCartItem = await CartItem.create({ userId, itemId });
      res.status(201).json(newCartItem);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// Get all cart items
exports.getCartItems = async (req, res) => {
  try {
    const cartItems = await CartItem.find().populate("itemId");
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all cart items by user ID
exports.getCartItemsByUserId = async (req, res) => {
  try {
    const cartItems = await CartItem.find({ userId: req.params.userId });
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a cart item
exports.updateCartItem = async (req, res) => {
  try {
    const updatedCartItem = await CartItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.status(200).json(updatedCartItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a cart item
exports.deleteCartItem = async (req, res) => {
  try {
    const cartItem = await CartItem.findByIdAndDelete(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
