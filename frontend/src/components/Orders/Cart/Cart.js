import React, { useState } from 'react';
import Header from '../../Header';
import Footer from '../../Footer';

const CartPage = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', price: 10, quantity: 1, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Chicken_Kottu.jpg/640px-Chicken_Kottu.jpg' },
    { id: 2, name: 'Item 2', price: 15, quantity: 1, image: 'https://sweetcaramelsunday.com/wp-content/uploads/Soy-Sauce-Noodles-610.jpg' },
    // Add more items as needed
  ]);

  const increaseQuantity = (id) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    }));
  };

  const decreaseQuantity = (id) => {
    setItems(items.map(item => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const navigateToShipping = () => {
    // Navigate to the shipping page
    window.location.href = '/Shipping';
  };
  const totalUnits = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div>
      <Header /><br/>
      <div className="items-container">
        {items.map(item => (
          <div key={item.id} className="row" style={{ marginBottom: '20px',marginLeft: '50px' }}>
            <div className="col-lg-9">
              <div className="card" style={{ width: '100%', border: '2px solid yellow', padding: '10px' }}>
                <div className="row">
                  <div className="col-4 col-lg-3">
                    <img src={item.image} alt={item.name} height="90" width="115" style={{ marginBottom: '10px' }} />
                  </div>
                  <div className="col-4 col-lg-3" style={{ fontSize: '18px' }}>
                    {item.name}
                  </div>
                  <div className="col-4 col-lg-3">
                    Rs.{item.price}
                  </div>
                  <div className="col-12 col-lg-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <button className="btn btn-danger minus" onClick={() => decreaseQuantity(item.id)} style={{ backgroundColor: 'red', color: 'white', fontSize: '18px', padding: '5px 10px' }}>-</button>
                    <span style={{ backgroundColor: 'black', color: 'white', padding: '2px 5px', margin: '0 5px', fontSize: '18px' }}>{item.quantity}</span>
                    <button className="btn btn-primary plus" onClick={() => increaseQuantity(item.id)} style={{ backgroundColor: 'blue', color: 'white', fontSize: '18px', padding: '5px 10px' }}>+</button>
                    <button className="btn btn-secondary delete" onClick={() => deleteItem(item.id)} style={{ backgroundColor: 'gray', color: 'white', fontSize: '18px', padding: '5px 10px', marginLeft: '10px' }}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          
        ))}

        <div className="col-lg-3" style={{ marginBottom: '20px',marginLeft: '60px' }}>
              <div className="card summary" style={{ width: '100%', border: '2px solid green', padding: '10px' }}>
                <div>Total Units: {totalUnits}</div>
                <div>Total Price: Rs. {totalPrice}</div>
                <button className="btn btn-outline-success" onClick={navigateToShipping} style={{ marginTop: '10px', fontSize: '18px' }}>Shipping</button>
              </div>
            </div>
        
      </div><br/>
      <Footer />
    </div>
  );
};

export default CartPage;
