import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

const AddItem = () => {
    const history = useNavigate();
    const [item_code, setitem_code] = useState("");
    const [itemName, setitemName] = useState("");
    const [itemCategory, setitemCategory] = useState("");
    const [itemStatus, setitemStatus] = useState("");
    const [price, setprice] = useState("");
    const [potion, setpotion] = useState("");
    const [description, setdescription] = useState("");
    const [fileName, setFileName] = useState("");
    const [error, setError] = useState("");

    const onChangeFile = (e) => {
        setFileName(e.target.files[0]);
    };

    const changeOnclick = async (e) => {
        e.preventDefault();
        if (
            item_code.length === 0 ||
            itemName.length === 0 ||
            itemCategory.length === 0 ||
            itemStatus.length === 0 ||
            price.length === 0 ||
            potion.length === 0 ||
            description.length === 0
        ) {
            setError(true);
        } else {
            const formData = new FormData();

            formData.append("item_code", item_code);
            formData.append("itemName", itemName);
            formData.append("itemCategory", itemCategory);
            formData.append("itemStatus", itemStatus);
            formData.append("price", price);
            formData.append("potion", potion);
            formData.append("description", description);
            formData.append("image", fileName);

            try {
                const res = await axios.post("http://localhost:8070/Item/add", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                if (res.status === 200) {
                    window.alert("Item Added Successfully!");
                    // Redirect or navigate to another page after successful item addition
                    history("/"); // Assuming this is the path to redirect after adding an item
                }
            } catch (err) {
                console.error(err);
                window.alert("Error adding item. Please try again.");
            }
        }
    };

    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <AdminDashboard />
            </div>

            <div className="container mt-5" style={{ width: "50%" }}>
                <div className="heading" style={{ textAlign: "center", fontSize: "30px" }}>
                    Insert Item
                </div>
                <form onSubmit={changeOnclick} encType="multipart/form-data">
                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="itemName">Code</label>
                            <input
                                type="text"
                                className="form-control"
                                name="item_code"
                                placeholder="Enter item_code"
                                onChange={(e) => setitem_code(e.target.value)}
                            />
                            {error && item_code.length <= 0 ? (
                                <label style={{ color: "red", fontSize: 12 }}>Item code is required</label>
                            ) : (
                                ""
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="itemName">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="itemName"
                                placeholder="Enter itemName"
                                value={itemName}
                                onChange={(e) => setitemName(e.target.value)}
                            />
                            {error && itemName.length <= 0 ? (
                                <label style={{ color: "red", fontSize: 12 }}>Item name is required</label>
                            ) : (
                                ""
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="itemCategory">Item Category</label>
                            <select
                                className="form-select"
                                name="itemCategory"
                                aria-label="Default select example"
                                value={itemCategory}
                                onChange={(e) => setitemCategory(e.target.value)}
                            >
                                <option selected>Select Category</option>
                                <option value={"Sri Lankan"}>Sri Lankan</option>
                                <option value={"Indian"}>Indian</option>
                                <option value={"Chinese"}>Chinese</option>
                                <option value={"Japanese"}>Japanese</option>
                                <option value={"Korean"}>Korean</option>
                                <option value={"Thai"}>Thai</option>
                            </select>
                            {error && itemCategory === "" ? (
                                <label style={{ color: "red", fontSize: 12 }}>Please select a category</label>
                            ) : (
                                ""
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="itemStatus">Status</label>
                            <select
                                className="form-select"
                                name="itemStatus"
                                aria-label="Default select example"
                                value={itemStatus}
                                onChange={(e) => setitemStatus(e.target.value)}
                            >
                                <option>Select Category</option>
                                <option value={"In Stock"}>In Stock</option>
                                <option value={"Out Of Stock"}>Out Of Stock</option>
                            </select>
                            {error && itemStatus === "" ? (
                                <label style={{ color: "red", fontSize: 12 }}>Please select a item status</label>
                            ) : (
                                ""
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="price">Price(Rs.)</label>
                            <input
                                type="text"
                                className="form-control"
                                name="price"
                                placeholder="Enter price"
                                value={price}
                                onChange={(e) => setprice(e.target.value)}
                            />
                            {error && price.length <= 0 ? (
                                <label style={{ color: "red", fontSize: 12 }}>Please enter price</label>
                            ) : (
                                ""
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="potion">Potion</label>
                            <select
                                className="form-select"
                                name="potion"
                                aria-label="Default select example"
                                value={potion}
                                onChange={(e) => setpotion(e.target.value)}
                            >
                                <option>Select Potion</option>
                                <option value={"Half"}>Half</option>
                                <option value={"Full"}>Full</option>
                            </select>
                            {error && potion === "" ? (
                                <label style={{ color: "red", fontSize: 12 }}>Please select a Potion</label>
                            ) : (
                                ""
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                name="description"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setdescription(e.target.value)}
                            />
                            {error && description.length <= 0 ? (
                                <label style={{ color: "red", fontSize: 12 }}>Please enter description</label>
                            ) : (
                                ""
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="image">Image</label>
                            <input type="file" className="form-control" name="image" onChange={onChangeFile} />
                        </div>

                        <button type="submit" className="btn btn-success">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItem;
