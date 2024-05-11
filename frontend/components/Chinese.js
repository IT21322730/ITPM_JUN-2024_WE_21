import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Favorite } from '@mui/icons-material'; // Import the Favorite icon
import Footer from './Footer';
import Header from './Header'

const Chinese = () => {
    const [items, setItems] = useState([]);
    const [chineseItems, setChineseItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get("http://localhost:8070/Item");
                console.log("All items:", response.data);
                const filteredItems = response.data.filter(item => item.itemCategory === 'Chinese');
                setChineseItems(filteredItems);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, []);

    const addToCart = (item) => {
        // Implement your add to cart logic here
        console.log("Adding item to cart:", item);
    };

    const addToFavorites = (item) => {
        // Implement your add to favorites logic here
        console.log("Adding item to favorites:", item);
    };

    return (
        <div style={{ textAlign: 'center' }}>
             <Header />
            <h2 style={{ marginBottom: '20px' }}>Chinese Cuisine</h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {chineseItems.map((item, index) => (
                    <div key={index} style={{ margin: '10px', width: '300px' }}>
                        <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', height: '450px' }}>
                            <img src={`/Uploads/${item.image}`} alt={item.itemName} style={{ width: '100%', height: '50%', objectFit: 'cover', borderRadius: '5px' }} />
                            <p style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '10px' }}>{item.itemName}</p>
                            <p style={{ color: 'green' }}>  {item.itemStatus}</p>
                            <p> {item.potion}</p>
                            <p>Rs. {item.price}</p>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <div>
                                    <button onClick={() => addToCart(item)} style={{ backgroundColor: 'yellow', color: 'black', marginRight: '10px', borderRadius: '5px' }}>Add to Cart</button>
                                </div>
                                <div>
                                    <button onClick={() => addToFavorites(item)} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}><Favorite /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer /> {/* Assuming you want to include the footer */}
        </div>
    );
};

export default Chinese;
