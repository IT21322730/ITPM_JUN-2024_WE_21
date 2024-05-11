import React, { useEffect, useState } from "react";
import { Table, Button, Row, Col } from "antd";
import OrderController from "../../controllers/orderController";
import ItemController from "../../controllers/itemController";
import jsPDF from "jspdf";
import "jspdf-autotable";
import AdminDashboard from "./AdminDashboard";

const AdminDelivery = () => {
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
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Set up the table headers
    const headers = columns.map((column) => column.title);
    const tableData = orders.map((order) => {
      return [
        order.userId ? order.userId.email : "", // Null check before accessing email
        order.address,
        order.phoneNumber,
      ];
    });

    // Add the table to the document
    doc.autoTable({
      head: [headers],
      body: tableData,
    });

    // Save the document
    doc.save("delivery_details.pdf");
  };

  const columns = [
    {
      title: "Customer Email",
      dataIndex: "userId",
      key: "userId",
      render: (userId) => <p>{userId?.email}</p>,
    },
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
  ];

  return (
    <Row>
      <Col span={6}>
        <AdminDashboard />
      </Col>
      <Col span={18}>
        <div style={{ marginLeft: "20px" }}>
          <Row justify="space-between" style={{ marginBottom: "20px" }}>
            <h1>Delivery Details</h1>
            <Button onClick={generatePDF}>Generate PDF</Button>
          </Row>
          <Table dataSource={orders} columns={columns} />
        </div>
      </Col>
    </Row>
  );
};

export default AdminDelivery;
