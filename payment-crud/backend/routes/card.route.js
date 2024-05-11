const express = require("express");
const router = express.Router();
const cardController = require("../controllers/card.controller");

// Create a new card
router.post("/", cardController.createCard);

// Get all cards
router.get("/", cardController.getAllCards);

// Get card by ID
router.get("/:id", cardController.getCardById);

// Update card
router.put("/:id", cardController.updateCard);

// Delete card
router.delete("/:id", cardController.deleteCard);

module.exports = router;
