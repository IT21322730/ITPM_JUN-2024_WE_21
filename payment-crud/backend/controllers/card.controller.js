const Card = require("../models/card.model");

// Create a new card
exports.createCard = async (req, res) => {
  try {
    const card = new Card(req.body);
    await card.save();
    res.status(201).json({ message: "Card created successfully", card });
  } catch (error) {
    console.error("Error creating card:", error);
    res.status(500).json({ error: "Failed to create card. Please try again." });
  }
};

// Get all cards
exports.getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).json({ error: "Failed to fetch cards. Please try again." });
  }
};

// Get card by ID
exports.getCardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }
    res.status(200).json(card);
  } catch (error) {
    console.error("Error fetching card:", error);
    res.status(500).json({ error: "Failed to fetch card. Please try again." });
  }
};

// Update card
exports.updateCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }
    res.status(200).json({ message: "Card updated successfully", card });
  } catch (error) {
    console.error("Error updating card:", error);
    res.status(500).json({ error: "Failed to update card. Please try again." });
  }
};

// Delete card
exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);
    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }
    res.status(200).json({ message: "Card deleted successfully", card });
  } catch (error) {
    console.error("Error deleting card:", error);
    res.status(500).json({ error: "Failed to delete card. Please try again." });
  }
};
