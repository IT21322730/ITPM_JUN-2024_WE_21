import React, { useEffect, useState } from "react";
import { Table, Input, Button, Space, message, Modal } from "antd";
import OrderController from "../../controllers/orderController";
import Footer from "./Footer";
import Header from "./Header";


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const ordersData = await OrderController.getAllOrders();

      setOrders(
        ordersData.filter(
          (order)=>{
            console.log(`${order?.userId?._id }=== ${localStorage.getItem("uid")}`)
            return order?.userId?._id === localStorage.getItem("uid");
          }
        )
      );
    } catch (error) {
      console.error("Error fetching orders:", error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await OrderController.deleteOrder(id);
      await fetchOrders();
      message.success("Order deleted successfully!");
    } catch (err) {
      message.error("Failed to delete details. Please try again.");
    }
  };

  const columns = [
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },

    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEditOrder(record)}>
            Edit
          </Button>
          <Button
            danger
            type="primary"
            onClick={() => handleDeleteOrder(record._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setAddress(order.address);
    setPhoneNumber(order.phoneNumber);
    setVisible(true);
  };

  const handleSaveOrder = async () => {
    try {
      await OrderController.updateOrder(selectedOrder._id, {
        address,
        phoneNumber,
      });
      message.success("Order updated successfully!");
      setVisible(false);
      fetchOrders();
    } catch (error) {
      message.error(`Error updating order: ${error}`);
    }
  };

  return (
     <div>
       <Header />
      <div>
      <Table
        dataSource={orders}
        columns={columns}
        loading={loading}
        rowKey="_id"
      />
      <Modal
        title="Edit Order"
        visible={visible}
        onOk={handleSaveOrder}
        onCancel={() => setVisible(false)}
      >
        <div>
          <p>Address:</p>
          <Input value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <p>Phone Number:</p>
          <Input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </Modal>
    </div>
    <Footer />
   
     </div>
  );
};

export default Orders;
