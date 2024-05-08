import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import MetaData from '../../Layout/MetaData'

//import CheckoutSteps from './CheckoutSteps'
import CheckoutSteps from '../../Orders/Cart/CheckoutSteps'

import { useSelector } from 'react-redux'

const ConfirmOrder = ({ history }) => {

    const { cartItems, shippingInfo } = useSelector(state => state.cart)
   // const { user } = useSelector(state => state.auth)
//<p>Shipping: <span className="order-summary-values">Rs.{shippingPrice}</span></p>
    // Calculate Order Prices
    const itemsPrice = cartItems.reduce((acc, oitem) => acc + oitem.price * oitem.quantity, 0)
    const shippingPrice = itemsPrice > 200 ? 0 : 25
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2))
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)

    const processToPayment = () => {
        const data = {
            itemsPrice: itemsPrice.toFixed(2),
            shippingPrice,
            taxPrice,
            totalPrice
        }

        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        history.push('/payment')
    }

    return (
        <Fragment>

            <MetaData title={'Confirm Order'} />

            <CheckoutSteps shipping confirmOrder />
            <div className='container'>
            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">

                    <h4 className="mb-3">Confirm Order</h4>
                    <p><b>Name:</b> {shippingInfo.name}</p>
                    <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                    <p className="mb-4"><b>Address:</b> {`${shippingInfo.address}`}</p>
                    <p className="mb-4"><b>City:</b> {`${shippingInfo.city},${shippingInfo.phoneNo}`}</p>
                    
                    <h4 className="mt-4">Your Cart Items:</h4>
                    </div>
                    {cartItems.map(item => (
                        <Fragment>
                            <hr />
                            <div className="cart-item my-1" key={item.oitem}>
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.img} alt={item.name} height="45" width="65" />
                                    </div>

                                    <div className="col-5 col-lg-6">
                                        <Link to={`/oitem/${item.product}`}>{item.name}</Link>
                                    </div>


                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p>{item.quantity} x Rs.{item.price} = <b>Rs.{(item.quantity * item.price).toFixed(2)}</b></p>
                                    </div>
                                    
                                </div>
                            </div>
                            <hr />
                        </Fragment>
                    ))}



                </div>

                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">Rs.{itemsPrice}</span></p>
                        
                        <p>Tax:  <span className="order-summary-values">Rs.{taxPrice}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">Rs.{totalPrice}</span></p>

                        <hr />
                        <a href={`http://localhost:3000/adddelivery/${totalPrice}`}><button id="checkout_btn" className="btn btn-primary btn-block" onClick={processToPayment}>Proceed to Dilivery</button></a>
                    </div>
                </div>


            </div>
            <div className='container'>
            <a href='/shipping'><button className="buttonW" >Shipping Info</button></a>
            </div>
            <br/><br/>
         
        </Fragment>
    )
}

export default ConfirmOrder