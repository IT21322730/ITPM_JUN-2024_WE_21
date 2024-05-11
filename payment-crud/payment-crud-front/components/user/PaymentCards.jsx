import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Input, message } from "antd";
import {
  getAllCards,
  updateCard,
  deleteCard,
} from "../../controllers/cardController";
import moment from "moment";
import Footer from "./Footer";
import Header from "./Header";
const PaymentCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    setLoading(true);
    try {
      const data = await getAllCards();
      setCards(
        data.filter((card) => card.userId === localStorage.getItem("uid"))
      );
    } catch (error) {
      console.error("Error fetching cards:", error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (record) => {
    setSelectedCard(record);
    form.setFieldsValue(record);
    setVisible(true);
  };

  const handleUpdate = async (values) => {
    try {
      await updateCard(selectedCard._id, values);
      setVisible(false);
      fetchCards();
      message.success("Card updated successfully!");
    } catch (error) {
      console.error("Error updating card:", error);
      // Handle error
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCard(id);
      fetchCards();
      message.success("Card deleted successfully!");
    } catch (error) {
      console.error("Error deleting card:", error);
      // Handle error
    }
  };

  const columns = [
    {
      title: "Card Number",
      dataIndex: "cardNumber",
      key: "cardNumber",
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (text, record) => moment(text).format("MM/YYYY"),
    },
    {
      title: "Cardholder Name",
      dataIndex: "cardHolderName",
      key: "cardHolderName",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <Button style={{ marginRight: 4 }} onClick={() => handleEdit(record)}>
            Edit
          </Button>

          <Button onClick={() => handleDelete(record._id)} danger>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Header />
      <Table
        dataSource={cards}
        columns={columns}
        loading={loading}
        rowKey="_id"
      />
      <Modal
        title="Edit Card"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleUpdate}>
          <Form.Item
            label="Card Number"
            name="cardNumber"
            rules={[{ required: true, message: "Please enter card number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Expiry Date"
            name="expiryDate"
            rules={[{ required: true, message: "Please enter expiry date" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="CVV"
            name="cvv"
            rules={[{ required: true, message: "Please enter cvv" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Cardholder Name"
            name="cardHolderName"
            rules={[
              { required: true, message: "Please enter cardholder name" },
            ]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Edit
          </Button>
        </Form>
      </Modal>
  

      <Footer />
    </div>
  );
};

export default PaymentCards;
