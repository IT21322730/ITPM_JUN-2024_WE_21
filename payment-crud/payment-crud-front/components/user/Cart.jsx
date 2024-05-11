import React, { useState, useEffect } from "react";
import { Button, List, message, Popconfirm, Image, Card } from "antd";
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";
import CartItemController from "../../controllers/cartItemController";
import { useNavigate } from "react-router-dom";
import state from "../../utils/state";
import Footer from "./Footer";
import Header from "./Header";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem("uid");

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const cartItemsData = await CartItemController.getAllCartItems();

      setCartItems(
        cartItemsData.filter((cartItem) => cartItem.userId === currentUserId)
      );
      state.cart = cartItemsData.filter(
        (cartItem) => cartItem.userId === currentUserId
      );
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleUpdateCartItem = async (cartItemId, quantity) => {
    try {
      await CartItemController.updateCartItem(cartItemId, { quantity });
      message.success("Cart item updated successfully!");
      fetchCartItems(); // Refresh cart items after update
    } catch (error) {
      console.error("Error updating cart item:", error);
      message.error("Failed to update cart item. Please try again.");
    }
  };

  const handleDeleteCartItem = async (cartItemId) => {
    try {
      await CartItemController.deleteCartItem(cartItemId);
      message.success("Cart item deleted successfully!");
      fetchCartItems(); // Refresh cart items after deletion
    } catch (error) {
      console.error("Error deleting cart item:", error);
      message.error("Failed to delete cart item. Please try again.");
    }
  };

  return (

    <div>
      <Header/>
      
      <List
        itemLayout="horizontal"
        dataSource={cartItems}
        renderItem={(item) => (
          <Card>
            <List.Item
              actions={[
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  onClick={() =>
                    handleUpdateCartItem(item._id, item.quantity + 1)
                  }
                />,
                <Button
                  type="text"
                  icon={<MinusOutlined />}
                  onClick={() =>
                    handleUpdateCartItem(item._id, item.quantity - 1)
                  }
                  disabled={item.quantity === 1}
                />,
                <Popconfirm
                  title="Are you sure to delete this item?"
                  onConfirm={() => handleDeleteCartItem(item._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="text" icon={<DeleteOutlined />} />
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <img src={`/Uploads/${item.image}`} width={100} height={100} />
                }
                title={item.itemId ? item.itemId.itemName : "Unknown Item"}
                description={`Quantity: ${item.quantity}`}
              />
            </List.Item>
          </Card>
        )}
      />
      <Button
        onClick={() => {
          navigate("/order-view");
        }}
        type="primary"
      >
        Checkout
      </Button>
      <Footer />
    </div>
  );
};

export default Cart;
