/*import React from "react";
import { Card, Form, Input, Button, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import UserController from "../../controllers/userController";

const { Title } = Typography;

const Register = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await UserController.createUser(values);
      message.success("Registration successful:");
      localStorage.setItem("uid", response._id);
      navigate("/home");
    } catch (error) {
      console.error("Error registering user:", error);
      message.error("Registration failed. Please try again."); // Display error message
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card style={{ width: 400 }}>
        <Title level={3}>Register</Title>
        <Form
          name="register_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>

          <Form.Item>
            Already have an account? <Link to="/">Login now!</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;*/
