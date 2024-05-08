import React, { useEffect } from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import Header from '../../../Header';
import Footer from '../../../Footer';
import picBack from '../../../img/pic_back.jpg'; // Importing the image

const ItemList = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const speak = () => {
      const speech = new SpeechSynthesisUtterance("Hey, If you want to select a price range between 1000 and 2000, please press key 1. If you prefer a price range between 2000 and 3000, press key 2. For a range between 3000 and 4000, press key 3. To choose a range between 4000 and 5000, press key 4. Press key 5 for a range between 5000 and 6000, key 6 for 6000-7000, key 7 for 7000-8000, and key 8 for 8000-9000.");
      window.speechSynthesis.speak(speech);
    };

    speak();

    const handleKeyPress = (event) => {
      const key = event.key;
      if (key >= '1' && key <= '9') {
        const cardNumber = parseInt(key);
        handleCardClick(cardNumber);
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleCardClick = (cardNumber) => {
    console.log(`Clicked card ${cardNumber}`);
    navigate(`/price-${cardNumber}`);
  };

  return (
    <>
      <Header />
      <div style={{ backgroundImage: `url(${picBack})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: 'calc(100vh - 160px)', padding: '20px 0' }}>
        <div style={{ textAlign: 'center' }}>
          {[...Array(9).keys()].map((index) => (
            <div key={index} style={{ marginBottom: '10px' }}> 
              <Card
                bordered={true}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80%',
                  maxWidth: 500,
                  margin: '0 auto',
                  borderColor: 'black',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  cursor: 'pointer',
                  height: 50,
                }}
                onClick={() => handleCardClick(index + 1)}
              >
                <p style={{ margin: 0 }}>Price Range Between Rs.{index * 1000 + 1000} - Rs.{index * 1000 + 2000}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ItemList;
