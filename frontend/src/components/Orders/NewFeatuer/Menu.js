import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Header';
import Footer from '../../Footer';

const NavigationComponent = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Fetch menu items
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/oitem/');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Speak out menu items when fetched
    const speakMenuItems = () => {
      const synth = window.speechSynthesis;
      if (!synth) {
        console.error('SpeechSynthesis API is not supported.');
        return;
      }

      menuItems.forEach((item, index) => {
        setTimeout(() => {
          const utterance = new SpeechSynthesisUtterance(`${item.name}, Price: ${item.price}`);
          synth.speak(utterance);
        }, index * 1000); // Delay each utterance by 1 second
      });
    };

    if (menuItems.length > 0) {
      speakMenuItems();
    }
  }, [menuItems]);

  return (
    <>
      <Header />
      <div style={{ position: 'relative' }}>
        <video autoPlay loop muted style={{ position: 'fixed', top: '50px', left: 0, width: '100%', zIndex: '-1' }}>
          <source src={require('D:/Ibind/frontend/src/components/Video/Video_1.mp4')} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '60px auto 20px', position: 'relative', zIndex: '1', color: '#fff' }}>
        <h1 style={{ textAlign: 'center', color: '#fff', fontFamily: 'Garamond, serif' }}>Menu</h1>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderBottom: '1px solid #ddd', color: '#333' }}>Item</th>
                <th style={{ padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderBottom: '1px solid #ddd', color: '#333' }}>Price</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item, index) => (
                <tr key={index}>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd', color: '#fff' }}>{item.name}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd', color: '#fff' }}>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div><br/><br/>
      <Footer />
    </>
  );
};

export default NavigationComponent;
