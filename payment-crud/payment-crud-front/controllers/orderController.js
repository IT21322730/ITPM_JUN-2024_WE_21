import axios from "axios";
import { baseUrl } from "../utils/constants";

class OrderController {
  static async getAllOrders() {
    try {
      const response = await axios.get(baseUrl + "/api/orders");
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  }

  static async createOrder(orderData) {
    try {
      const response = await axios.post(baseUrl + "/api/orders", orderData);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  }

  static async updateOrder(orderId, orderData) {
    try {
      const response = await axios.put(
        baseUrl + `/api/orders/${orderId}`,
        orderData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating order:", error);
      throw error;
    }
  }

  static async deleteOrder(orderId) {
    try {
      const response = await axios.delete(baseUrl + `/api/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  }
}

export default OrderController;
