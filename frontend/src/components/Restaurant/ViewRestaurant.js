import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Card } from 'antd'; // Importing Ant Design Card component
import AdminDashboard from "../AdminDashboard";

const ViewRestaurants = () => {

    const [getRestaurants, setRestaurants] = useState({});
    const id = useParams().id;

    useEffect(() => {
        const fetchRestaurant = async () => {
            await axios.get(`http://localhost:8000/restaurant/get/${id}`)
                .then(res => res.data)
                .then(data => setRestaurants(data.restaurant));
        };
        fetchRestaurant();
    }, [id]);

    const history = useNavigate();
    const deleteHandler = () => {
        axios.delete(`http://localhost:8000/restaurant/delete/${id}`)
            .then((res) => res.data)
            .then(() => history("/r"));
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <AdminDashboard />
                    </div>
                    <div className="col-md-9">
                        <div className="container" style={{ width: '100%' }}>
                            <div className="d-flex justify-content-center mt-5">
                                <Card style={{ width: 800, border: '1px solid black' }}> {/* Adjust width and border as needed */}
                                    <div className="box column">
                                        <h1 style={{ fontWeight: 400 }}> Details About {getRestaurants.name}</h1>
                                        <h3 className="mt-3">Restaurant Name : <span style={{ fontWeight: 400 }}>{getRestaurants.restaurantname}</span></h3>
                                        <h3 className="mt-3">Restaurant Address : <span style={{ fontWeight: 400 }}>{getRestaurants.restaurantaddress}</span></h3>
                                        <h3 className="mt-3">Restaurant Owner : <span style={{ fontWeight: 400 }}>{getRestaurants.restaurantowner}</span></h3>
                                        <h3 className="mt-3">Restaurant Phone : <span style={{ fontWeight: 400 }}>{getRestaurants.restaurantphone}</span></h3>
                                        <h3 className="mt-3">Restaurant Email : <span style={{ fontWeight: 400 }}>{getRestaurants.restaurantemail}</span></h3>
                                        <h3 className="mt-3">Account Number : <span style={{ fontWeight: 400 }}>{getRestaurants.restaurantaccNumber}</span></h3>
                                        <h3 className="mt-3">Item: <span style={{ fontWeight: 400 }}>{getRestaurants.restaurantitem}</span></h3>
                                        <h3 className="mt-3">Unit Price: Rs.<span style={{ fontWeight: 400 }}>{getRestaurants.restaurantunitPrice}.00</span></h3>
                                        <div className="d-flex justify-content-between mt-3"> {/* Decrease space between buttons */}
                                            <NavLink to={`/restaurants/update/${id}`} className="btn btn-primary">Update</NavLink>
                                            <button onClick={deleteHandler} className="btn btn-danger">Delete</button>
                                            <NavLink to={`/restaurants/view/${id}`} className="btn btn-success fab fa-amazon-pay" >View</NavLink>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewRestaurants;
