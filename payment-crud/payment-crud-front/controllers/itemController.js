import axios from "axios";
import { baseUrl } from "../utils/constants";

class ItemController {
  static async getAllItems() {
    try {
      const response = await axios.get(baseUrl + "/api/items");
      return response.data;
    } catch (error) {
      console.error("Error fetching items:", error);
      throw error;
    }
  }

  static async createItem(itemData) {
    try {
      const response = await axios.post(baseUrl + "/api/items", itemData);
      return response.data;
    } catch (error) {
      console.error("Error creating item:", error);
      throw error;
    }
  }

  static async updateItem(itemId, itemData) {
    try {
      const response = await axios.put(
        baseUrl + `/api/items/${itemId}`,
        itemData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating item:", error);
      throw error;
    }
  }

  static async deleteItem(itemId) {
    try {
      const response = await axios.delete(baseUrl + `/api/items/${itemId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting item:", error);
      throw error;
    }
  }
}

export default ItemController;
