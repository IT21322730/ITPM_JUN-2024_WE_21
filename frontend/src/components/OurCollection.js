import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Carousel } from 'antd';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import side1 from '../components/img/side_1.jpg';
import side2 from '../components/img/side_2.jpg';
import side3 from '../components/img/side_3.jpg';
import side4 from '../components/img/side_4.jpg';
import side5 from '../components/img/side_5.jpg';
import side6 from '../components/img/side_6.jpg';
import side7 from '../components/img/side_7.jpg';
import side8 from '../components/img/side_8.jpg';
import side9 from '../components/img/side_9.jpg';
import side10 from '../components/img/side_10.jpg';

const { Meta } = Card;

const Home = () => {
  const navigate = useNavigate();
  const [enterPressed, setEnterPressed] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    speakInstructions();
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const speakInstructions = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance("Welcome! you are in the Collection page. If you want to know price details filter the food items given price ranges? yes or no if yes press 1 and enter buttton ");
    synth.speak(utterance);
  };

  useEffect(() => {
    if (enterPressed) {
      setEnterPressed(false);
    }
  }, [enterPressed]);

  const handleKeyDown = (event) => {
    console.log('Key pressed:', event.key);
    if (event.key === '1') {
      document.getElementById('exampleFormControlTextarea1').select();
      SpeechRecognition.startListening({ continuous: true });
    } else if (event.key === '2') {
      if (window.SpeechRecognition) {
        SpeechRecognition.stopListening();
      }
    } else if (event.key === '3') {
      resetTranscript();
    } else if (event.key === 'Enter') {
      setEnterPressed(true);
        navigate('/selection');
      
      event.preventDefault();
    }
  };
  
  const startListening = () => {
    SpeechRecognition.startListening();
  };
  
  const stopListening = () => {
    SpeechRecognition.stopListening();
  };
  
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const images = [
    side1,
    side2,
    side3,
    side4,
    side5,
    side6,
    side7,
    side8,
    side9,
    side10,
  ];

  return (
    <>
      <Header />
      <div style={{ margin: '20px auto', padding: '20px' }}>
        <Carousel autoplay>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Slide ${index + 1}`} style={{ width: '100vw', height: '50vh', objectFit: 'cover' }} />
            </div>
          ))}
        </Carousel>
        <Card
          hoverable
          style={{ width: '90vw', margin: '20px auto',border: '1px solid black' }}
        >
          <Meta title="Bringing you the best products from around the world at the best prices" /><br/>
          <Input
            id="exampleFormControlTextarea1"
            placeholder="Enter your text here"
            value={transcript}
            autoSize={{ minRows: 3, maxRows: 6 }}
            onKeyDown={handleKeyDown}
            readOnly /><br/><br/>
          <Button type="primary" onClick={startListening} style={{ marginRight: '5px' }}>Start</Button>
          <Button type="default" onClick={stopListening} style={{ marginRight: '5px' }}>Stop</Button>
          <Button type="default" onClick={resetTranscript}>Reset</Button>
        </Card>
      </div>
      <Footer />
    </>
  )
};

export default Home;
