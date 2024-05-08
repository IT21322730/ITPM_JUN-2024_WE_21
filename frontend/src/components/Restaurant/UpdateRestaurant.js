import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import AdminDashboard from "../AdminDashboard";


const UpdateRestaurant = () => {

  const [getRestaurant, setRestaurant] = useState({});
    const id = useParams().id;
    const history = useNavigate();

    useEffect(() => {
        const fetchRestaurant = async () => {
            await axios.get(`http://localhost:8000/restaurant/get/${id}`).
                then(res => res.data).then(data => setRestaurant(data.restaurant));

        };
        fetchRestaurant();
    }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:8000/restaurant/update/${id}`, {
            restaurantname: String(getRestaurant.restaurantname),
            restaurantaddress: String(getRestaurant.restaurantaddress),
            restaurantowner: String(getRestaurant.restaurantowner),
            restaurantphone: Number(getRestaurant.restaurantphone),
            restaurantemail: String(getRestaurant.restaurantemail),
            restaurantaccNumber: String(getRestaurant.restaurantaccNumber),
            restaurantitem: String(getRestaurant.restaurantitem),
            restaurantunitPrice: Number(getRestaurant.restaurantunitPrice),
      })
      .then((res) => res.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history("/admin/restaurants"))
};

  const setdata  = (e) => {
    setRestaurant((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <AdminDashboard />
                </div>

      <div className="col-md-10 mt-9 mx-auto" style={{width:"70%"}}>
        
        <form onSubmit={handleSubmit}>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Restaurant Name:</Form.Label>
            <Form.Control
              type="text"
              value={getRestaurant.restaurantname}
              onChange={setdata}
              name="restaurantname"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Restaurant Address:</Form.Label>
            <Form.Control
              type="text"
              value={getRestaurant.restaurantaddress}
              onChange={setdata}
              name="restaurantaddress"
            />
  
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Restaurant Owner:</Form.Label>
            <Form.Control
              type="text"
              value={getRestaurant.restaurantowner}
              onChange={setdata}
              name="restaurantowner"
            />
  
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Restaurant Phone:</Form.Label>
            <Form.Control
              type="text"
              value={getRestaurant.restaurantphone}
              onChange={setdata}
              name="restaurantphone"
            />
     
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Restaurant Email:</Form.Label>
            <Form.Control
              type="text"
              value={getRestaurant.restaurantemail}
              onChange={setdata}
              name="restaurantemail"
            />
            
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Account Number:</Form.Label>
            <Form.Control
              type="text"
              value={getRestaurant.restaurantaccNumber}
              onChange={setdata}
              name="restaurantaccNumber"
            />
            
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Item:</Form.Label>
            <Form.Control
              type="text"
              value={getRestaurant.restaurantitem}
              onChange={setdata}
              name="restaurantitem"
            />
     
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Unit Price:</Form.Label>
            <Form.Control
              type="text"
              value={getRestaurant.restaurantunitPrice}
              onChange={setdata}
              name="restaurantunitPrice"
            />

          </Form.Group>
          
          <button
            type="submit"
            className="button"
            style={{
              marginTop: "15px",
              width: "100%",
              height: "40px",
              borderRadius: "6px",
              backgroundColor: "#FAB200",
              border: "none",
            }}
            onClick={handleSubmit}
          >
            <i class="fas fa-edit"></i> &nbsp;Update Details
          </button>


          
        </form>
      </div>
    </div></div>
  );
}

export default UpdateRestaurant;
