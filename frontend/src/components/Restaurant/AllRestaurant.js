import React, { useEffect, useState } from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import AdminDashboard from "../AdminDashboard";

const AllSuppliers = () => {

    const [restaurants, setRestaurants] = useState([]);
    console.log(restaurants);

    const id = useParams().id;
    console.log(id);

    useEffect(() => {
        getRestaurants();
    }, [id]);

    const getRestaurants = () => {
        axios.get("http://localhost:8000/restaurant/").then((res) => {
            setRestaurants(res.data); // Fix this line
        }).catch((err) => {
            alert(err.message);
        })
    }

    const deleteHandler = async (id) => {
        console.warn(id)
        let result = await fetch(`http://localhost:8000/restaurant/delete/${id}`, {
            method: "Delete"
        });
        result = await result.json();

        if (result) {
            getRestaurants();
        }
    }

    const searchHandler = async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8000/restaurant/search/${key}`);
            result = await result.json();
            if (result) {
                setRestaurants(result)
            }
        } else {
            getRestaurants();
        }

    }


    return (

        <>
        <div className="row">
            <div className="col-12 col-md-2">
            <AdminDashboard />
            </div>
            <div className="container" style={{ width: '80%' }}>
                <div className="container">
                    <div className="heading"><br/><h3>Restaurants</h3></div>

                    <div className="add_btn mt-2 mb-2">
                        <NavLink to="/restaurants/add" className="btn btn-primary"> + Add Restaurants </NavLink>
                    </div>

                    <div className="input-group rounded mt-2 mb-2" style={{ width: '50%' }}>
                        <input type="search" class="form-control rounded" placeholder="Search" onChange={searchHandler} />
                        <span class="input-group-text border-0" id="search-addon" >
                            < SearchIcon />
                        </span>
                    </div>

                    <table class="table">
                        <thead>
                            <tr className="table-dark">
                                <th scope="col">Restaurant Name</th>
                                    <th scope="col">Restaurant Address</th>
                                    <th scope="col">Restaurant Phone</th>
                                    <th scope="col">Restaurant Owner</th>
                                <th scope="col" className="action">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {restaurants.length > 0 ? restaurants.map((element) => {
                        return (
                        <tr key={element._id}> {/* Use element._id as the key */}
                        
                        <td>{element.restaurantname}</td>
                        <td>{element.restaurantaddress}</td>
                        <td>{element.restaurantphone}</td>
                        <td>{element.restaurantemail}</td>

                        <td className="d-flex justify-content-between">
                        <NavLink to={`/restaurants/view/${element._id}`} className="btn btn-success" ><RemoveRedEyeIcon /></NavLink>
                        <NavLink to={`/restaurants/update/${element._id}`} className="btn btn-primary"><CreateIcon /></NavLink>
                        <button onClick={() => deleteHandler(element._id)} className="btn btn-danger"><DeleteIcon /></button>
                    </td>
                </tr>
        );
    }) : <tr><td colSpan="5" className="warn">No Result Found</td></tr>}
</tbody>
                    </table>
                    <div className="report_btn mt-2 mb-2">
                        <NavLink to="/restaurants/rprint" className="btn btn-primary"> Generate Report </NavLink>
                    </div>

                </div>
            </div></div>
            </>
    )

}




export default AllSuppliers





