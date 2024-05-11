import axios from "axios";
import { baseUrl } from "../utils/constants";

class CartItemController {
  static async getAllCartItems() {
    try {
      const response = await axios.get(baseUrl + "/api/cart");
      return response.data;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      throw error;
    }
  }

  static async createCartItem(cartItemData) {
    try {
      const response = await axios.post(baseUrl + "/api/cart", cartItemData);
      return response.data;
    } catch (error) {
      console.error("Error creating cart item:", error);
      throw error;
    }
  }

  static async updateCartItem(cartItemId, cartItemData) {
    try {
      const response = await axios.put(
        baseUrl + `/api/cart/${cartItemId}`,
        cartItemData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating cart item:", error);
      throw error;
    }
  }

  static async deleteCartItem(cartItemId) {
    try {
      const response = await axios.delete(baseUrl + `/api/cart/${cartItemId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting cart item:", error);
      throw error;
    }
  }
}

export default CartItemController;
