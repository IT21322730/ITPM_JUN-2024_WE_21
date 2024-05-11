/*import React from "react";
import { Card, Form, Input, Button, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import UserController from "../controllers/userController";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      if (values.email === "admin@admin.com") {
        navigate("/admin");
        return;
      }
      const response = await UserController.loginUser(values);
      console.log("Login successful:", response);
      message.success("Welcome back!");
      localStorage.setItem("uid", response.user._id);
      navigate("/home");
    } catch (error) {
      console.error("Error logging in:", error);
      message.error("Invalid email or password. Please try again."); // Display error message
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
        <Title level={3}>Login</Title>
        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
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
              Log in
            </Button>
          </Form.Item>

          <Form.Item>
            Don't have an account? <Link to="/register">Register now!</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;*/
