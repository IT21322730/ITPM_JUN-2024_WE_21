// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import AdminDashboard from "./AdminDashboard";

// const UpdateItem = () => {
//     const [getItem, setItem] = useState({});
//     const [potion, setPotion] = useState(""); // Define potion state
//     const id = useParams().id;
//     const history = useNavigate();

//     useEffect(() => {
//         const fetchItem = async () => {
//             await axios.get(`http://localhost:8070/Item/get/${id}`)
//                 .then(res => res.data)
//                 .then(data => setItem(data.item));
//         };
//         fetchItem();
//     }, [id]);

//     const sendRequest = async () => {
//         await axios.put(`http://localhost:8070/Item/update/${id}`, {
//             itemName: String(getItem.itemName),
//             itemCategory: String(getItem.itemCategory),
//             itemStatus: String(getItem.itemStatus),
//             price: Number(getItem.price),
//             potion: String(potion), // Use potion state here
//             Description: Number(getItem.description),
//         }).then(res => res.data);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         sendRequest().then(() => history("/allItems"));
//     };

//     const setdata = (e) => {
//         setItem((prevState) => ({
//             ...prevState,
//             [e.target.name]: e.target.value,
//         }));
//     };

//     return (
//         <div className="row">
//             <div className="col-12 col-md-2">
//                 <AdminDashboard />
//             </div>
//             <div className="container" style={{ width: '50%' }}>
//                 <div className="heading" style={{ textAlign: 'center', fontSize: '30px' }}>Update Item</div>
//                 <form onSubmit={handleSubmit} className="mt-4">
//                     <div className="row">
//                         <div className="mb-3">
//                             <label htmlFor="itemName">Name</label>
//                             <input type="text" className="form-control" value={getItem.itemName} onChange={setdata} name="itemName" placeholder="Enter item Name" />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="itemCategory">Item Category</label>
//                             <select name="itemCategory" style={{ marginLeft: '20px' }} value={getItem.itemCategory} onChange={setdata}>
//                                 <option>Select Category</option>
//                                 <option value={"Sri Lankan"}>Sri Lankan</option>
//                                 <option value={"Indian"}>Indian</option>
//                                 <option value={"Chinese"}>Chinese</option>
//                                 <option value={"Japanese"}>Japanese</option>
//                                 <option value={"Korean"}>Korean</option>
//                                 <option value={"Thai"}>Thai</option>
//                             </select>
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="itemStatus">Status</label>
//                             <select name="itemStatus" style={{ marginLeft: '20px' }} value={getItem.itemStatus} onChange={setdata}>
//                                 <option>Select Category</option>
//                                 <option value={"In Stock"}>In Stock</option>
//                                 <option value={"Out Of Stock"}>Out Of Stock</option>
//                             </select>
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="potion">Potion</label>
//                             <select className="form-select" name="potion" aria-label="Default select example" value={potion} onChange={(e) => setPotion(e.target.value)}>
//                                 <option>Select Potion</option>
//                                 <option value={"Half"}>Half</option>
//                                 <option value={"Full"}>Full</option>
//                             </select>
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="price">Price</label>
//                             <input type="text" className="form-control" value={getItem.price} onChange={setdata} name="price" placeholder="Enter price" />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="description">Description</label>
//                             <input type="text" className="form-control" value={getItem.description} onChange={setdata} name="description" placeholder="Enter Description" />
//                         </div>
//                         <button style={{ backgroundColor: "#FAB200" }} type="submit" onClick={handleSubmit} className="btn btn-primary">Update</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default UpdateItem;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

const UpdateItem = () => {
    const [getItem, setItem] = useState({});
    const [potion, setPotion] = useState("");
    const [imageFile, setImageFile] = useState(null); // Define state for the image file
    const id = useParams().id;
    const history = useNavigate();

    useEffect(() => {
        const fetchItem = async () => {
            await axios.get(`http://localhost:8070/Item/get/${id}`)
                .then(res => res.data)
                .then(data => setItem(data.item));
        };
        fetchItem();
    }, [id]);

    const sendRequest = async () => {
        const formData = new FormData(); // Create FormData object
        formData.append("itemName", getItem.itemName);
        formData.append("itemCategory", getItem.itemCategory);
        formData.append("itemStatus", getItem.itemStatus);
        formData.append("price", getItem.price);
        formData.append("potion", potion);
        formData.append("description", getItem.description);
        formData.append("image", imageFile); // Append image file to the FormData

        await axios.put(`http://localhost:8070/Item/update/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data" // Set content type to multipart/form-data
            }
        }).then(res => res.data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() => history("/allItems"));
    };

    const setdata = (e) => {
        setItem((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    // Handle image file change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <AdminDashboard />
            </div>
            <div className="container" style={{ width: '50%' }}>
                <div className="heading" style={{ textAlign: 'center', fontSize: '30px' }}>Update Item</div>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="row">
                        
                        {/* Rest of the form */}
                        <div className="mb-3">
                            <label htmlFor="itemName">Name</label>
                            <input type="text" className="form-control" value={getItem.itemName} onChange={setdata} name="itemName" placeholder="Enter item Name" />
                        </div>
                        {/* Rest of the form */}
                        <div className="mb-3">
                            <label htmlFor="itemCategory">Item Category</label>
                            <select name="itemCategory" style={{ marginLeft: '20px' }} value={getItem.itemCategory} onChange={setdata}>
                                <option>Select Category</option>
                                <option value={"Sri Lankan"}>Sri Lankan</option>
                                <option value={"Indian"}>Indian</option>
                                <option value={"Chinese"}>Chinese</option>
                                <option value={"Japanese"}>Japanese</option>
                                <option value={"Korean"}>Korean</option>
                                <option value={"Thai"}>Thai</option>
                            </select>
                        </div>
                        {/* Rest of the form */}
                        <div className="mb-3">
                            <label htmlFor="itemStatus">Status</label>
                            <select name="itemStatus" style={{ marginLeft: '20px' }} value={getItem.itemStatus} onChange={setdata}>
                                <option>Select Status</option>
                                <option value={"In Stock"}>In Stock</option>
                                <option value={"Out Of Stock"}>Out Of Stock</option>
                            </select>
                        </div>
                        {/* Rest of the form */}
                        <div className="mb-3">
                            <label htmlFor="potion">Potion</label>
                            <select className="form-select" name="potion" aria-label="Default select example" value={potion} onChange={(e) => setPotion(e.target.value)}>
                                <option>Select Potion</option>
                                <option value={"Half"}>Half</option>
                                <option value={"Full"}>Full</option>
                            </select>
                        </div>
                        {/* Rest of the form */}
                        <div className="mb-3">
                            <label htmlFor="price">Price(Rs.)</label>
                            <input type="text" className="form-control" value={getItem.price} onChange={setdata} name="price" placeholder="Enter price" />
                        </div>
                        {/* Rest of the form */}
                        <div className="mb-3">
                            <label htmlFor="description">Description</label>
                            <input type="text" className="form-control" value={getItem.description} onChange={setdata} name="description" placeholder="Enter Description" />
                        </div>
                        {/* Add input field for image file
                        <div className="mb-3">
                            <label htmlFor="image">Image</label>
                            <input type="file" className="form-control" onChange={handleImageChange} accept="image/*" />
                        </div> */}
                        <button style={{ backgroundColor: "#FAB200" }} type="submit" onClick={handleSubmit} className="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;
