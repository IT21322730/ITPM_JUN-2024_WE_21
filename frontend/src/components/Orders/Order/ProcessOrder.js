import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import MetaData from '../../Layout/MetaData'
import Loader from '../../Layout/Loader'

import { useAlert } from 'react-alert'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, updateOrder, clearErrors } from '../../Orders/CartAction/OrderAction'
import { UPDATE_ORDER_RESET } from '../../Orders/Constants/OrderConstants'

const ProcessOrder = ({ match }) => {

    const [status, setStatus] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();
    const params = useParams();

    const { loading, order = {} } = useSelector(state => state.orderDetails)
    const { orderItems, totalPrice, orderStatus } = order
    const { error, isUpdated } = useSelector(state => state.order)

    const { shippingInfo } = useSelector(state => state.cart)
/*
    const {orderId} = useParams;
    /*if(orderId==null){
        alert(error);
    }*/

    //const {orderId} = useParams;
    const orderId = params.id;

    useEffect(() => {

        dispatch(getOrderDetails(orderId))


        if (isUpdated) {
            alert('Order updated successfully');
            dispatch({ type: UPDATE_ORDER_RESET })
        }else if(error){
            alert(error);
            dispatch(clearErrors())
        }

    }, [dispatch,error, isUpdated,orderId])


    const updateOrderHandler = (id) => {

        const formData = new FormData();
        formData.set('status', status);

        dispatch(updateOrder(id, formData))
    }

    const shippingDetails = shippingInfo && `${shippingInfo.name}, ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.phoneNo}`
    //const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false

    return (
        <Fragment>
            <MetaData title={`Process Order # ${order && order._id}`} />
            <div className="row">
              
                <div className="col-12 col-md-2">
              
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        {loading ? <Loader /> : (
                            <div className="row d-flex justify-content-around">
                                <div className="col-12 col-lg-7 order-details">

                                    

                                    <h4 className="mb-4">Order Info</h4>
                                    <p><b>Name:</b> {shippingInfo && shippingInfo.name}</p>
                                    <p><b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                                    <p className="mb-4"><b>Address:</b>{shippingInfo.address}</p>
                                    <p><b>Amount:</b> Rs.{totalPrice}</p>

                                    <hr />
 
                                    
                                    <h4 className="my-4">Order Status:</h4>
                                    <p className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p>

                                    <h4 className="my-4">Order Items:</h4>

                                    <hr />
                                    <div className="cart-item my-1">
                                        {orderItems && orderItems.map(oitem => (
                                            <div key={oitem.product} className="row my-5">
                                                <div className="col-4 col-lg-2">
                                                    <img src={oitem.image} alt={oitem.name} height="100" width="100" />
                                                </div>

                                                <div className="col-5 col-lg-5">
                                                    <Link to={`/products/${oitem.product}`}>{oitem.name}</Link>
                                                </div>


                                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                    <p>Rs.{oitem.price}</p>
                                                </div>

                                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                    <p>{oitem.quantity} Piece(s)</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-12 col-lg-3 mt-5">
                                    <h4 className="my-4">Status</h4>

                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            name='status'
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        ><br/>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Wrapping</option>
                                        </select>
                                    </div>

                                    <button className="buttonW" onClick={() => updateOrderHandler(order._id)}>
                                        Update Status
                                    </button>
                                </div>

                            </div>
                        )}
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default ProcessOrder