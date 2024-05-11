import React, { useEffect, useState } from "react";
import { Table, Button, Row, Col } from "antd"; // Import Col from antd
import OrderController from "../../controllers/orderController";
import ItemController from "../../controllers/itemController";
import jsPDF from "jspdf";
import "jspdf-autotable";
import AdminDashboard from "./AdminDashboard";

const AdminPaymentDetails = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const ordersData = await OrderController.getAllOrders();
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const generatePDF = () => {
    // PDF generation logic here
  };

  const columns = [
    {
      title: "Customer Email",
      dataIndex: "userId",
      key: "userId",
      render: (userId) => <p>{userId?.email}</p>,
    },
    {
      title: "Total Bill",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <Row>
      <Col span={6}>
        <AdminDashboard />
      </Col>
      <Col span={18}>
        <div style={{ marginLeft: "20px" }}>
          <Row justify="space-between" style={{ marginBottom: "20px" }}>
            <h1>Payment Details</h1>
            <Button onClick={generatePDF}>
              Generate PDF
            </Button>
          </Row>
          <Table dataSource={orders} columns={columns} />
        </div>
      </Col>
    </Row>
  );
};

export default AdminPaymentDetails;
