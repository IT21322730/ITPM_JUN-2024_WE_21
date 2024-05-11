import axios from "axios";

const API_URL = "http://localhost:8085/api/cards";

// Create a new card
export const createCard = async (cardData) => {
  try {
    const response = await axios.post(API_URL, cardData);
    return response.data;
  } catch (error) {
    console.error("Error creating card:", error);
    throw new Error("Failed to create card. Please try again.");
  }
};

// Get all cards
export const getAllCards = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw new Error("Failed to fetch cards. Please try again.");
  }
};

// Get card by ID
export const getCardById = async (cardId) => {
  try {
    const response = await axios.get(`${API_URL}/${cardId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching card:", error);
    throw new Error("Failed to fetch card. Please try again.");
  }
};

// Update card
export const updateCard = async (cardId, cardData) => {
  try {
    const response = await axios.put(`${API_URL}/${cardId}`, cardData);
    return response.data;
  } catch (error) {
    console.error("Error updating card:", error);
    throw new Error("Failed to update card. Please try again.");
  }
};

// Delete card
export const deleteCard = async (cardId) => {
  try {
    const response = await axios.delete(`${API_URL}/${cardId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting card:", error);
    throw new Error("Failed to delete card. Please try again.");
  }
};
