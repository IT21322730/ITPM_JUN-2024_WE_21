import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import AdminDashboard from "./AdminDashboard";

const ViewItem = () => {
    const [getItem, setItem] = useState({});
    const [reviews, setReviews] = useState([]);
    const id = useParams().id;
    const history = useNavigate();

    useEffect(() => {
        const fetchItemAndReviews = async () => {
            try {
                const itemResponse = await axios.get(`http://localhost:8070/Item/get/${id}`);
                setItem(itemResponse.data.item);
                
                const reviewsResponse = await axios.get(`http://localhost:8070/Item/item/${id}/reviews`);
                setReviews(reviewsResponse.data.reviews);
            } catch (error) {
                console.error("Error fetching item and reviews:", error);
            }
        };
        fetchItemAndReviews();
    }, [id]);

    const deleteHandler = () => {
        axios.delete(`http://localhost:8070/Item/delete/${id}`)
            .then(() => history("/allItems"))
            .catch(error => console.error("Error deleting item:", error));
    };

    const handleUpdate = () => {
        history(`/updatecake/${id}`);
    };

    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <AdminDashboard />
            </div>
            <div className="col-md-10 mt-5 mx-auto">
            <Card style={{ width: '50%', borderWidth: "6px", borderStyle: "solid" }} className="card-width">
    <Card.Img variant="top" src={`/Uploads/${getItem.image}`} style={{ width: "50%", height: "280px", margin: "20px auto", display: "block" }} />
    <Card.Body style={{ marginLeft: "180px" }}> {/* Adjust the left margin as needed */}
        <Card.Title>{getItem.itemName}</Card.Title>
        <Card.Text>
            {/* {getItem.description} */}
            {/* <strong>{getItem.item_code} - {getItem.category}</strong> */}
            <div style={{ color: "#B666D2" }}>
                <b>Rs.{getItem.price?.toFixed(2)}</b>
            </div>
            <p>Potion: {getItem.potion}</p>
            {getItem.itemStatus}
        </Card.Text>
        <Button variant="danger" onClick={deleteHandler} className="me-2">
            Delete Item
        </Button>
        <Button variant="warning" onClick={handleUpdate}>
            Update Item
        </Button>
    </Card.Body>
</Card>




                <Tabs defaultActiveKey="profile" className="mb-3 mt-3">
                    <Tab eventKey="profile" title="Description">
                        <p>{getItem.description}</p>
                    </Tab>
                    <Tab eventKey="home" title="Customer Reviews">
                        <ul>
                            {reviews.map(review => (
                                <li key={review._id}>
                                    <p>{review.comment}</p>
                                    <p>Rating: {review.rating}</p>
                                    <p>By: {review.name}</p>
                                </li>
                            ))}
                        </ul>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
};

export default ViewItem;
