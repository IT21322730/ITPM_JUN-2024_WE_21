import React, { useEffect, useState } from "react";
import state from "../../utils/state";
import { useSnapshot } from "valtio";
import Footer from "./Footer";
import {
  Button,
  Form,
  Input,
  Card,
  List,
  Image,
  message,
  Modal,
  DatePicker,
} from "antd";
import OrderController from "../../controllers/orderController";
import { createCard } from "../../controllers/cardController";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

const OrderView = () => {
  const navigate = useNavigate();
  const snap = useSnapshot(state);
  const cartItems = snap.cart;
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [totalBill, setTotalBill] = useState(0);
  const [deliveryForm] = Form.useForm();
  const [cardForm] = Form.useForm();
  const [micActiveField, setMicActiveField] = useState(null);
  const [speechText, setSpeechText] = useState('');
  const recognition = new window.webkitSpeechRecognition();

  useEffect(() => {
    let bill = 0;
    cartItems.forEach((cartItem) => {
      bill += cartItem.itemId.price * cartItem.quantity;
    });
    setTotalBill(bill);
  }, [cartItems]);

  useEffect(() => {
    if (micActiveField) {
      recognition.start();
      recognition.continuous = true;
      recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        setSpeechText(transcript);
        if (micActiveField === 'address') {
          deliveryForm.setFieldsValue({ address: transcript });
        } else if (micActiveField === 'phoneNumber') {
          deliveryForm.setFieldsValue({ phoneNumber: transcript });
        }else if (micActiveField === 'cardNumber') {
          cardForm.setFieldsValue({ cardNumber: transcript });
        } else if (micActiveField === 'cardHolderName') {
          cardForm.setFieldsValue({ cardHolderName: transcript });
        } else if (micActiveField === 'cvv') {
          cardForm.setFieldsValue({ cvv: transcript });
        }else if (micActiveField === 'expiryDate') {
          const parsedDate = parseDate(transcript); // Parse the spoken date string
          cardForm.setFieldsValue({ expiryDate: parsedDate });
        }

        recognition.stop();
        setMicActiveField(null);
      };
    }
  }, [micActiveField, deliveryForm, cardForm]);

  const parseDate = (dateString) => {
    const [month, year] = dateString.split('/');
    const parsedMonth = parseInt(month);
    const parsedYear = parseInt(year);

    if (!isNaN(parsedMonth) && !isNaN(parsedYear)) {
      return new Date(parsedYear, parsedMonth - 1, 1);
    } else {
      return null;
    }
  };

  const handleBuyItems = async () => {
    try {
      await deliveryForm.validateFields();
      await cardForm.validateFields();

      try {
        await OrderController.createOrder({
          userId: localStorage.getItem("uid"),
          itemIds: cartItems.map((cartItem) => cartItem.itemId._id),
          address: deliveryForm.getFieldValue("address"),
          phoneNumber: deliveryForm.getFieldValue("phoneNumber"),
          totalPrice: totalBill,
        });
        try {
          await createCard({
            cardNumber: cardForm.getFieldValue("cardNumber"),
            expiryDate: cardForm.getFieldValue("expiryDate"),
            cardHolderName: cardForm.getFieldValue("cardHolderName"),
            cvv: cardForm.getFieldValue("cvv"),
            userId: localStorage.getItem("uid"),
          });
        } catch (e) {
          console.error("Error creating card:", e);
        }

        setShowSuccessModal(true);
        cardForm.resetFields();
        deliveryForm.resetFields();
      } catch (error) {
        message.error(`Error creating order: ${error}`);
      }
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  const handleMicClick = (fieldName) => {
    setMicActiveField(fieldName);
  };

  return (
    <div style={{ padding: 16, width: "100vw" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "45%" }}>
          <h2>Cart Items</h2>
          <List
            itemLayout="horizontal"
            dataSource={cartItems}
            renderItem={(item) => (
              <Card style={{ marginBottom: 16 }}>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Image src={`/Uploads/${item.image}`} width={100} />}
                    title={item.itemId.itemName}
                    description={`Quantity: ${item.quantity}`}
                  />
                </List.Item>
              </Card>
            )}
          />
          <Title>Total Bill LKR: {totalBill.toFixed(2)}</Title>
        </div>
        <div style={{ width: "45%" }}>
          <Card style={{ height: "130vh", padding: 24 }}>
            <h2>Delivery Details</h2>
            <Form form={deliveryForm} layout="vertical">
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  { required: true, message: "Please input your address!" },
                ]}
              >
                <Input suffix={<FontAwesomeIcon icon={faMicrophone} onClick={() => handleMicClick('address')} />} value={speechText} />
              </Form.Item>
              <Form.Item
                label="Phone"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input suffix={<FontAwesomeIcon icon={faMicrophone} onClick={() => handleMicClick('phoneNumber')} />} value={speechText} />
              </Form.Item>
            </Form>
            <h2>Card Details</h2>
            <Form form={cardForm} layout="vertical">
              <Form.Item
                label="Card Number"
                name="cardNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your card number!",
                  },
                ]}
              >
                <Input suffix={<FontAwesomeIcon icon={faMicrophone} onClick={() => handleMicClick('cardNumber')} />} value={speechText} />
              </Form.Item>
              <Form.Item
                label="Expiration Date"
                name="expiryDate"
                rules={[
                  {
                    required: true,
                    message: "Please input your card's expiration date!",
                  },
                ]}
              >
                <DatePicker suffix={<FontAwesomeIcon icon={faMicrophone} onClick={() => handleMicClick('expiryDate')} />} value={speechText} />
              </Form.Item>
              <Form.Item
                label="Cardholder Name"
                name="cardHolderName"
                rules={[
                  {
                    required: true,
                    message: "Please input the cardholder's name!",
                  },
                ]}
              >
                <Input suffix={<FontAwesomeIcon icon={faMicrophone} onClick={() => handleMicClick('cardHolderName')} />} value={speechText} />
              </Form.Item>
              <Form.Item
                label="CVV"
                name="cvv"
                rules={[{ required: true, message: "Please input the CVV!" }]}
              >
                <Input suffix={<FontAwesomeIcon icon={faMicrophone} onClick={() => handleMicClick('cvv')} />} value={speechText} />
              </Form.Item>
            </Form>
            <div style={{ textAlign: "center", marginTop: 24 }}>
              <Button type="primary" onClick={handleBuyItems}>
                Place Order
              </Button>
            </div>
          </Card>
        </div>
      </div>
      <Modal
        title="Order Placed Successfully"
        visible={showSuccessModal}
        onCancel={() => {
          setShowSuccessModal(false);
          navigate("/Orders");
        }}
        footer={[
          <Button
            key="ok"
            type="primary"
            onClick={() => {
              setShowSuccessModal(false);
              navigate("/Orders");
            }}
          >
            OK
          </Button>,
        ]}
      >
        <p>Your order has been successfully placed. Thank you!</p>
      </Modal>
      <Footer />
    </div>
  );
};

export default OrderView;
