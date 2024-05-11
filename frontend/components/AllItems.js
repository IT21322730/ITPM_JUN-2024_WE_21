import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminDashboard from "./AdminDashboard";

const AllItems = () => {
    const [items, setItems] = useState([]);
    const id = useParams().id;

    useEffect(() => {
        getItems();
    }, [id]);

    const getItems = () => {
        axios.get("http://localhost:8070/Item/").then((res) => {
            setItems(res.data);
        }).catch((err) => {
            alert(err.message);
        })
    }

    const deleteHandler = async (id) => {
        console.warn(id)
        let result = await fetch(`http://localhost:8070/Item/delete/${id}`, {
            method: "Delete"
        });
        result = await result.json();

        if (result) {
            getItems();
        }
    }

    const searchHandler = async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8070/Item/search/${key}`);
            result = await result.json();
            if (result) {
                setItems(result)
            }
        } else {
            getItems();
        }
    }

    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <AdminDashboard />
            </div>

            <div className="mt-5" style={{ width: '80%' }}>
                <div className="container" >
                    <div className="heading" style={{ textAlign: 'center', fontSize: '30px', fontWeight: '600' }}>Items</div>
                    <div className="add_btn mt-2 mb-2">
                        <NavLink to="/addcake" className="btn btn-success"> + Add Item </NavLink>
                    </div>
                    <div className="input-group rounded mt-3"> {/* Added mt-3 for margin-top */}
                        <input type="search" className="form-control rounded" placeholder="Search" onChange={searchHandler} />
                        <span className="input-group-text border-0" id="search-addon">
                            <SearchIcon />
                        </span>
                    </div>
                    <div className="category-links mt-3"> {/* Added mt-3 for margin-top */}
    <NavLink to="/SriLankan" className="btn btn-primary mb-2" style={{ width: '100px' }}>Sri Lankan</NavLink> {/* Added mb-2 for margin-bottom */}
    <NavLink to="/Korean" className="btn btn-primary mb-2" style={{ width: '100px' }}>Korean</NavLink> {/* Added mb-2 for margin-bottom */}
    <NavLink to="/Chinese" className="btn btn-primary mb-2" style={{ width: '100px' }}>Chinese</NavLink> {/* Added mb-2 for margin-bottom */}
    <NavLink to="/Thai" className="btn btn-primary mb-2" style={{ width: '100px' }}>Thai</NavLink> {/* Added mb-2 for margin-bottom */}
    <NavLink to="/Japanese" className="btn btn-primary mb-2" style={{ width: '100px' }}>Japanese</NavLink> {/* Added mb-2 for margin-bottom */}
    <NavLink to="/Indian" className="btn btn-primary mb-2" style={{ width: '100px' }}>Indian</NavLink> {/* Added mb-2 for margin-bottom */}
    {/* Add links for other cuisine categories */}
</div>



                    <table className="table">
                        <thead>
                            <tr className="table-dark">
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">itemCategory</th>
                                <th scope="col">itemStatus</th>
                                <th scope="col">Price</th>
                                <th scope="col">Image</th>
                                <th scope="col" className="action">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.length > 0 ? items.map((element, id) => {
                                    return (
                                        <tr key={id}>
                                            <th scope="row">{id + 1}</th>
                                            <td>{element.itemName}</td>
                                            <td>{element.itemCategory}</td>
                                            <td>{element.itemStatus}</td>
                                            <td>Rs.{element.price}</td>
                                            <td><img src={`/Uploads/${element.image}`} style={{ width: "100px", height: "100px" }} alt="item" /></td>

                                            <td className="d-flex justify-content-between">
                                                <NavLink to={`/viewcake/${element._id}`} className="btn btn-primary" ><RemoveRedEyeIcon /></NavLink>
                                                <NavLink to={{ pathname: `/updatecake/${element._id}`, state: { imageUrl: `http://localhost:8070/Uploads/${element.image}` } }} className="btn btn-warning"><CreateIcon /></NavLink>

                                                <button onClick={() => deleteHandler(element._id)} className="btn btn-danger"><DeleteIcon /></button>
                                            </td>
                                        </tr>
                                    )
                                })
                                    : <tr><td colSpan="7">No Result Found</td></tr>
                            }
                        </tbody>
                    </table>
                    <div className="report_btn mt-2 mb-2">
                        <NavLink to="/cakeprint" className="btn btn-success"> Generate Report </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllItems;
