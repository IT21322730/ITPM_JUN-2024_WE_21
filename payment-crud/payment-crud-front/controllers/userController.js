/*import axios from "axios";
import { baseUrl } from "../utils/constants";

class UserController {
  static async getAllUsers() {
    try {
      const response = await axios.get(`${baseUrl}/api/users`);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  static async createUser(userData) {
    try {
      const response = await axios.post(baseUrl + "/api/users", userData);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  static async loginUser(credentials) {
    try {
      const response = await axios.post(
        baseUrl + "/api/users/login",
        credentials
      );
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }

  static async updateUser(userId, userData) {
    try {
      const response = await axios.put(
        baseUrl + `/api/users/${userId}`,
        userData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  static async deleteUser(userId) {
    try {
      const response = await axios.delete(baseUrl + `/api/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
}

export default UserController;*/
