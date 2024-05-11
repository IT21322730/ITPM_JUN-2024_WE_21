const express = require("express");
const router = express.Router();
const cartItemController = require("../controllers/cart.item.controller");

// Create a new cart item
router.post("/", cartItemController.createCartItem);

// Get all cart items
router.get("/", cartItemController.getCartItems);

// Get all cart items by user ID
router.get("/:userId", cartItemController.getCartItemsByUserId);

// Update a cart item by ID
router.put("/:id", cartItemController.updateCartItem);

// Delete a cart item by ID
router.delete("/:id", cartItemController.deleteCartItem);

module.exports = router;
