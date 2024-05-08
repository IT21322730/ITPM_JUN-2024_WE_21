import React, { useState, useEffect } from 'react';
import { Card, Slider, Button } from 'antd';
import Header from '../../../Header';
import Footer from '../../../Footer';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import backgroundImage from '../../../img/pic_1.jpg'; // Import the image

const { Meta } = Card;

const ItemList = () => {
  const { listening } = useSpeechRecognition();
  const [items, setItems] = useState([]);
  const [priceRange, setPriceRange] = useState([8000, 9000]);
  const [containerHeight, setContainerHeight] = useState('auto');

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    const newHeight = document.getElementById('itemsContainer')?.scrollHeight || 'auto';
    setContainerHeight(newHeight);
  }, [items, priceRange]);

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:8000/oitem/');
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const filteredItems = items.filter(item => item.price >= priceRange[0] && item.price <= priceRange[1]);

  const handleSliderChange = value => {
    setPriceRange(value);
  };

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!listening && filteredItems.length > 0) {
      filteredItems.forEach(result => {
        const resultUtterance = new SpeechSynthesisUtterance(`Item Name: ${result.name}, Item Price: Rs.${result.price}, ${result.quantity} Person`);
        synth.speak(resultUtterance);
      });
    }
  }, [filteredItems, listening]);

  return (
    <>
      <Header />
      <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: containerHeight }} id="itemsContainer">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Slider
            range
            step={10}
            defaultValue={[8000, 9000]}
            min={8000}
            max={9000}
            onChange={handleSliderChange}
            style={{ width: '80%', color: 'black' }}
          />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <Card
                key={item.id}
                style={{
                  width: 300,
                  margin: 10,
                  border: '2px solid black',
                }}
              >
                <Meta title={item.name} description={`Price: Rs.${item.price}`} />
                <p style={{ marginTop: 10 }}>Person: {item.quantity}</p>
              </Card>
            ))
          ) : (
            <p>No items within the price range of Rs.8000-Rs.9000</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ItemList;
