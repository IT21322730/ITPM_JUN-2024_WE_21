const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

// Create a new order
router.post("/", orderController.createOrder);

// Get all orders
router.get("/", orderController.getOrders);

// Get a single order by ID
router.get("/:id", orderController.getOrderById);

// Update an order by ID
router.put("/:id", orderController.updateOrder);

// Delete an order by ID
router.delete("/:id", orderController.deleteOrder);

module.exports = router;