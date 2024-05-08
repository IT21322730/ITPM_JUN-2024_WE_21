import React from 'react'

const CheckoutSteps = ({ shipping, confirmOrder }) => {
    return (
        <div className="checkout-progress d-flex justify-content-center mt-5">

            {shipping ? <a href='shippping' className="float-right">
                <div className="triangle2-active"></div>
                <div className="step active-step">Shipping</div>
                <div className="triangle-active"></div>
            </a> : <a href="#!" disabled>
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Shipping</div>
                    <div className="triangle-incomplete"></div>
                </a>}

            {confirmOrder ? <a href='/order/confirm' className="float-right">
                <div className="triangle2-active"></div>
                <div className="step active-step">Confirm Order</div>
                <div className="triangle-active"></div>
            </a> : <a href="#!" disabled>
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Confirm Order</div>
                    <div className="triangle-incomplete"></div>
                </a>}

        </div>
    )
}

export default CheckoutSteps