import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notification } from 'antd';
import AdminDashboard from "../AdminDashboard";

const AddSupplier = () => {
    const history = useNavigate();
    const [inpval, setINP] = useState({
        restaurantname: "",
        restaurantaddress: "",
        restaurantowner: "",
        restaurantphone: "",
        restaurantemail: "",
        restaurantaccNumber: "",
        restaurantitem: "",
        restaurantunitPrice: "",
    });

    const setdata = (e) => {
        setINP((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const openNotification = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
        });
    };

    const sendRequest = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/restaurant/add`, {
                restaurantname: String(inpval.restaurantname),
                restaurantaddress: String(inpval.restaurantaddress),
                restaurantowner: String(inpval.restaurantowner),
                restaurantphone: Number(inpval.restaurantphone),
                restaurantemail: String(inpval.restaurantemail),
                restaurantaccNumber: String(inpval.restaurantaccNumber),
                restaurantitem: String(inpval.restaurantitem),
                restaurantunitPrice: Number(inpval.restaurantunitPrice),
            });
            console.log(response.data); // Make sure you handle the response as needed
            openNotification('success', 'Success', 'Restaurant added successfully');
        } catch (error) {
            console.error('Error adding restaurant:', error);
            openNotification('error', 'Error', 'Failed to add restaurant');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inpval);
        sendRequest().then(() => history("/admin/restaurants"));
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <AdminDashboard />
                </div>
                <div className="col-md-9">
                    <div className="container" style={{ width: '100%' }}>
                        <div className="heading" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}><br/><h3>Add Restaurant </h3></div>
                        <form onSubmit={handleSubmit} className="mt-4" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className="row">
                                <div className="mb-3 form-group was-validated">
                                    <label htmlFor="name" style={{ marginBottom: '5px' }}>Restaurant Name:</label>
                                    <input type="text" className="form-control" value={inpval.restaurantname} onChange={setdata} name="restaurantname" placeholder="Enter Restaurant Name" required />
                                </div>
                                <div className="mb-3 form-group was-validated">
                                    <label htmlFor="address" style={{ marginBottom: '5px' }}>Restaurant Address:</label>
                                    <input type="text" className="form-control" value={inpval.restaurantaddress} onChange={setdata} name="restaurantaddress" placeholder="Enter Restaurant Address" required />
                                </div>
                                <div className="mb-3 form-group was-validated">
                                    <label htmlFor="owner" style={{ marginBottom: '5px' }}>Restaurant Owner:</label>
                                    <input type="text" className="form-control" value={inpval.restaurantowner} onChange={setdata} name="restaurantowner" placeholder="Enter Restaurant Owner Name" required />
                                </div>
                                <div className="mb-3 form-group was-validated">
                                    <label htmlFor="phone" style={{ marginBottom: '5px' }}>Restaurant Phone:</label>
                                    <input type="tel" className="form-control" value={inpval.restaurantphone} onChange={setdata} name="restaurantphone" placeholder="Enter Restaurant Phone Number" pattern="\d{10}" maxLength="10" required />
                                </div>
                                <div className="mb-3 form-group was-validated">
                                    <label htmlFor="email" style={{ marginBottom: '5px' }}>Restaurant Email:</label>
                                    <input type="email" className="form-control" value={inpval.restaurantemail} onChange={setdata} name="restaurantemail" placeholder="Enter Restaurant Email" required />
                                </div>
                                <div className="mb-3 form-group was-validated">
                                    <label htmlFor="accNumber" style={{ marginBottom: '5px' }}>Account Number:</label>
                                    <input type="text" className="form-control" value={inpval.restaurantaccNumber} onChange={setdata} name="restaurantaccNumber" placeholder="Enter Account Number" required />
                                </div>
                                <div className="mb-3 form-group was-validated">
                                    <label htmlFor="item" style={{ marginBottom: '5px' }}>Item:</label>
                                    <input type="text" className="form-control" value={inpval.restaurantitem} onChange={setdata} name="restaurantitem" placeholder="Enter Restaurant Item" required />
                                </div>
                                <div className="mb-3 form-group was-validated">
                                    <label htmlFor="unitPrice" style={{ marginBottom: '5px' }}>Unit Price:</label>
                                    <input type="text" className="form-control" value={inpval.restaurantunitPrice} onChange={setdata} name="restaurantunitPrice" placeholder="Enter Unit Price" required />
                                </div>
                                <div style={{ width: '100%' }}>
                                    <button type="submit" className="btn btn-primary" style={{ width: '150px', alignSelf: 'flex-end' }}>Submit Details</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddSupplier;
