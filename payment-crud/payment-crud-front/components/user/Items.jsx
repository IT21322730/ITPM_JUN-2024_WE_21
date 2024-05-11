import React, { useState, useEffect } from "react";
import { Row, Col, Card, Image, Button, message } from "antd";
import ItemController from "../../controllers/itemController";
import CartItemController from "../../controllers/cartItemController";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Items = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const itemsData = await ItemController.getAllItems();
      setItems(itemsData);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleAddToCart = async (itemId) => {
    try {
      await CartItemController.createCartItem({
        itemId,
        userId: localStorage.getItem("uid"),
      });
      message.success("Item added to cart successfully!");
      navigate("/cart");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      message.error("Failed to add item to cart. Please try again.");
    }
  };

  return (
    <div className="site-layout-content" style={{ marginTop: 24 }}>
      <Row gutter={[16, 16]}>
        {items.map((item) => (
          <Col key={item._id} xs={12} sm={8} md={6} lg={6}>
            <Card
              hoverable
              cover={
                <Image
                  style={{ maxHeight: 500 }}
                  alt={item.itemName}
                  src={`/Uploads/${item.image}`} // Image path setup
                  height={400}
                />
              }
            >
              <Card.Meta
                title={item.itemName}
                description={`$${item.price.toFixed(2)}`}
              />
              <div style={{ height: 5 }} />
              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                onClick={() => handleAddToCart(item._id)}
              >
                Add to Cart
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Items;
