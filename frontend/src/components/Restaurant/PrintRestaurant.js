import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Button, Table } from 'react-bootstrap';
import axios from "axios";
import { useEffect } from 'react';
import AdminDashboard from "../AdminDashboard";

const PrintRestaurants = () => {

    const [restaurants, setRestaurants] = useState([]);
    console.log(restaurants);

    useEffect(() => {
        getRestaurants();
    }, []);

    const getRestaurants = () => {
        axios.get("http://localhost:8000/restaurant/").then((res) => {
            setRestaurants(res.data);
        }).catch((err) => {
            alert(err.message);
        })
    }


    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'sup-data',
        onAfterPrint: () => alert('Print Successful')
    });

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear}`;

    return (
        <>
        <div className="row">
            <div className="col-12 col-md-2">
            <AdminDashboard />
            </div>
                <div style={{ width: '80%' }}>
                    <Button variant='success' style={{ width: '5%', height: '5%', marginLeft: '82.65%' }} className="print_btn mt-2 mb-2" onClick={handlePrint}>Print</Button>


                    <div ref={componentRef} style={{ width: '100%', height: window.innerHeight }}>

                        <h1 className='text-center my-3 border py-2'>Restaurants Details</h1>

                        <div style={{ textAlign: 'center' }}>
                            <Table className='w-75 mx-auto' bordered>
                                <thead>
                                    <tr className='table-dark'>
                                        <th scope='col'>Id</th>
                                        <th scope='col'>Restaurant Name</th>
                                        <th scope='col'>Restaurant Address</th>
                                        <th scope='col'>Restaurant Owner</th>
                                        <th scope='col'>Restaurant Phone</th>
                                        <th scope='col'>Restaurant Email</th>
                                        <th scope='col'>Unit Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        restaurants.map((element, id) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <th scope='row'>{id + 1}</th>
                                                        <td>{element.restaurantname}</td>
                                                        <td>{element.restaurantaddress}</td>
                                                        <td>{element.restaurantowner}</td>
                                                        <td>{element.restaurantphone}</td>
                                                        <td>{element.restaurantemail}</td>
                                                        <td>{element.restaurantunitPrice}</td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div>


                    </div></div></div>

        </>




    )
}

export default PrintRestaurants