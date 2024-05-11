import { BrowserRouter, Route, Routes } from "react-router-dom";
//import Login from "./components/Login";
import "antd/dist/reset.css";
//import Register from "./components/user/Register";
import Cart from "./components/user/Cart";
import OrderView from "./components/user/OrderView";
import PaymentDetails from "./components/user/PaymentDetails";
import Home from "./components/user/Home";
import React from 'react';
import Orders from "./components/user/Orders";
import PaymentCards from "./components/user/PaymentCards";
import AdminDelivery from "./components/admin/AdminDelivery";
import AdminPaymentDetails from "./components/admin/AdminPaymentDetails";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-view" element={<OrderView />} />
        <Route path="/payment-details" element={<PaymentCards />} />
        <Route path="/admin" element={<AdminDelivery/>} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/adpayment" element={<AdminPaymentDetails/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
