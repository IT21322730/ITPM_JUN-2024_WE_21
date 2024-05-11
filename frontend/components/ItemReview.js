// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Rating from "@mui/material/Rating";
// import Card from "react-bootstrap/Card";
// import ProgressBar from "react-bootstrap/ProgressBar";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import { FaStar } from "react-icons/fa";

// const colors = {
//   orange: "#FEB902",
//   grey: "#D4D1D0",
// };

// const Review = () => {
//   const id = useParams().id;
//   const [inputs, setInput] = useState({});
//   const [review, setReview] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [inpval, setINP] = useState({
//     product: "",
//     name: "",
//     rating: "",
//     comment: "",
//   });

//   useEffect(() => {
//     const fetchHandler = async () => {
//       await axios
//         .get(`http://localhost:8070/Item/get/${id}`)
//         .then((res) => res.data)
//         .then((data) => setInput(data.item));
//     };
//     fetchHandler();
//   }, [id]);

//   useEffect(() => {
//     getReviews();
//   }, []);

//   const getReviews = () => {
//     axios
//       .get(`http://localhost:8070/Item/item/${id}/reviews`)
//       .then((res) => {
//         setReview(res.data);
//       })
//       .catch((err) => {
//         alert(err.message);
//       });
//   };

//   const handleOpen = () => {
//     setIsOpen(true);
//   };

//   const handleClose = () => {
//     setIsOpen(false);
//   };

//   const setdata = (e) => {
//     setINP((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const sendRequest = async () => {
//     await axios
//       .post(`http://localhost:8070/Item/item/${id}/review`, {
//         product: String(inpval.product),
//         name: String(inpval.name),
//         rating: Number(inpval.rating),
//         comment: String(inpval.comment),
//       })
//       .then((res) => res.data)
//       .catch((err) => {
//         alert(err.message);
//       });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     sendRequest();
//     handleClose();
//   };

//   const stars = Array(5).fill(0);

//   return (
//     <div style={{ marginLeft: "30px" }}>
//       <Card style={{ width: "100%" }}>
//         <Card.Body>
//           <div className="column999">
//             <table style={{ margin: "10px" }}>
//               {/* Progress bars for different ratings */}
//             </table>
//           </div>
//           <div className="column1000">
//             <center>
//               <table>
//                 <tr>
//                   <td style={{ fontSize: "35px", fontWeight: "600" }}>
//                     {/* Display average rating */}
//                     {inputs?.avgRating?.toFixed(1)}{" "}
//                   </td>
//                   <td style={{ fontSize: "22px" }}>/5</td>
//                   <td style={{ paddingLeft: "25px" }}>
//                     <div style={styles.stars}>
//                       {stars.map((_, index) => {
//                         return (
//                           <FaStar
//                             key={index}
//                             size={28}
//                             color={
//                               inputs?.avgRating?.toFixed(0) > index
//                                 ? colors.orange
//                                 : colors.grey
//                             }
//                           />
//                         );
//                       })}
//                     </div>
//                   </td>
//                 </tr>
//               </table>
//             </center>
//           </div>
//         </Card.Body>
//       </Card>
//       <br />
//       <div className="popup-form-container">
//         <table>
//           <tr>
//             <td style={{ verticalAlign: "top" }}>
//               {" "}
//               <button className="button" onClick={handleOpen}>
//                 <span>Write a Review </span>
//               </button>
//             </td>
//             <td style={{ width: "1000px" }}>
//               {isOpen && (
//                 <Card style={{ width: "50%", marginLeft: "40px" }}>
//                   <Card.Body>
//                     <form onSubmit={handleSubmit}>
//                       <button
//                         className="close-button"
//                         onClick={handleClose}
//                         style={{
//                           float: "right",
//                           borderRadius: "50%",
//                           width: "30px",
//                           height: "30px",
//                           border: "none",
//                           backgroundColor: "#B666D2",
//                           color: "white",
//                         }}
//                       >
//                         X
//                       </button>

//                       <Box
//                         component="form"
//                         sx={{
//                           "& > :not(style)": { m: 0.5, width: "35ch" },
//                         }}
//                         noValidate
//                         autoComplete="off"
//                         style={{ marginLeft: "12px" }}
//                       >
//                         <TextField
//                           id="outlined-basic"
//                           label="User Name"
//                           variant="outlined"
//                           name="name"
//                           value={inpval.name}
//                           onChange={setdata}
//                         />
//                         <table>
//                           <tr>
//                             <td>Rating :</td>
//                             <td>
//                               <Rating
//                                 style={{
//                                   fontSize: "27px",
//                                   marginLeft: "7px",
//                                   paddingTop: "8px",
//                                 }}
//                                 name="rating"
//                                 value={inpval.rating}
//                                 onChange={setdata}
//                                 precision={1}
//                               />
//                             </td>
//                           </tr>
//                         </table>
//                         <TextField
//                           id="outlined-basic"
//                           label="Comment"
//                           variant="outlined"
//                           multiline
//                           rows={4}
//                           name="comment"
//                           value={inpval.comment}
//                           onChange={setdata}
//                         />
//                       </Box>
//                       <button
//                         className="button"
//                         onClick={handleOpen}
//                         style={{ width: "301px", marginLeft: "16px" }}
//                       >
//                         <span>Submit Review </span>
//                       </button>
//                     </form>
//                   </Card.Body>
//                 </Card>
//               )}
//             </td>
//           </tr>
//         </table>
//       </div>
//       <br />
//       <Card style={{ width: "100%" }}>
//         {review.map((review, id) => {
//           return (
//             <div key={id}>
//               <div className="columnR1">{review.name}</div>
//               <div className="columnR2">
//                 <Rating
//                   style={{ fontSize: "17px" }}
//                   name="half-rating-read"
//                   defaultValue={review.rating}
//                   precision={0.5}
//                   readOnly
//                 />
//                 <p>{review.comment}</p>
//               </div>
//               <center>
//                 <hr style={{ width: "940px", marginBottom: "8px" }}></hr>
//               </center>
//             </div>
//           );
//         })}
//       </Card>
//     </div>
//   );
// };

// export default Review;

// const styles = {
//   stars: {
//     display: "flex",
//     flexDirection: "row",
//     Animationdelay: "4s",
//   },
// };
