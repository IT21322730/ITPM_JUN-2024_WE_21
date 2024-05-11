const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item.controller");

// Create a new item
router.post("/", itemController.createItem);

// Get all items
router.get("/", itemController.getItems);

// Get a single item by ID
router.get("/:id", itemController.getItemById);

// Update an item by ID
router.put("/:id", itemController.updateItem);

// Delete an item by ID
router.delete("/:id", itemController.deleteItem);

module.exports = router;
