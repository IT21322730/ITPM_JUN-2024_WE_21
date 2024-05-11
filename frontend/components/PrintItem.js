import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Button, Table } from 'react-bootstrap';
import axios from "axios";
import { useEffect } from 'react';
import AdminDashboard from "./AdminDashboard"
 


const PrintItem = () => {

    const [items, setItems] = useState([]);
    console.log(items);

    useEffect(() => {
        getItems();
    }, []);

    const getItems = () => {
        axios.get("http://localhost:8070/item/").then((res) => {
            setItems(res.data);
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
                

                <div style={{width:'80%'}}>
                <Button variant='success' style={{ marginLeft: '86%' }} className="print_btn" onClick={handlePrint}>Download Report</Button>


                <div ref={componentRef} style={{ width: '100%', height: window.innerHeight }}>
                    <h1 className='text-center my-3 border py-2'>Item Details</h1>

                    
                    <Table className='w-75 mx-auto' bordered>
                        <thead>
                            <tr className='table-dark'>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">itemCategory</th>
                                <th scope="col">itemStatus</th>
                                <th scope="col">Price</th>
                                <th scope="col">Potion</th>
                               
                                <th scope="col">Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope='row'>{id + 1}</th>
                                                <td>{element.itemName}</td>
                                                <td>{element.itemCategory}</td>
                                                <td>{element.itemStatus}</td>
                                                <td>{element.price}</td>
                                                <td>{element.potion}</td>
                                                
                                                <td>
    <img src={`/uploads/${element.image}`} style={{ width: "100px", height: "100px" }} />
</td>


                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </Table>

                </div></div>
                </div>
                
                



        </>

    )
}

export default PrintItem