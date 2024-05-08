import React, { useState } from 'react';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import beepSound from 'D:/ITPM_01/frontend/src/components/VoiceBeep/beep-01a.mp3'; // Adjust the path if necessary
import Header from '../../Header';
import Footer from '../../Footer';
import { useParams } from 'react-router-dom';

const FormComponent = () => {

  const { foodId, itemName, itemPrice } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    address: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    phoneNumber: '',
    address: '',
  });

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
  };

  const {
    transcript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClick = (label) => {
    let message = '';
    switch (label) {
      case 'name':
        message = 'Hey, please enter your name';
        break;
      case 'phoneNumber':
        message = 'Please give your current phone number';
        break;
      case 'address':
        message = 'Please give your current address';
        break;
      default:
        break;
    }
    
    // Speak the message
    const speechMessage = new SpeechSynthesisUtterance(message);
    speechMessage.onend = () => {
      // Play a beep sound after the message
      const beepAudio = new Audio(beepSound);
      beepAudio.play();
    };
    window.speechSynthesis.speak(speechMessage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = {};
    if (!formData.name.match(/^[a-zA-Z\s]*$/)) {
      errors.name = "Name must contain only letters and spaces";
    }
    if (!formData.phoneNumber.match(/^\d+$/)) {
      errors.phoneNumber = "Phone number must contain only digits";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      console.log("Form submitted successfully:", formData);
    }
  };

  return (
    <>
      <Header/><br/>
      <form onSubmit={handleSubmit} style={{ marginLeft: '10px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name" style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <VolumeUpIcon style={{ marginRight: '5px' }} onClick={() => handleClick('name')} /> Name:
          </label>
          <div style={{ position: 'relative', width: 'calc(100% - 10px)' }}>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxSizing: 'border-box',
                paddingLeft: '30px',
              }}
            />
            <KeyboardVoiceIcon
              style={{
                position: 'absolute',
                top: '50%',
                left: '5px',
                transform: 'translateY(-50%)'
              }}
              onClick={() => {
                if (transcript) {
                  setFormData(prevData => ({
                    ...prevData,
                    name: transcript
                  }));
                }
                startListening();
              }}
            />
          </div>
          {formErrors.name && <span style={{ color: 'red' }}>{formErrors.name}</span>}
        </div>
        <div style={{ marginBottom: '15px' }}>
          
          <label htmlFor="phoneNumber" style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <VolumeUpIcon style={{ marginRight: '5px' }} onClick={() => handleClick('phoneNumber')} /> Telephone Number:
          </label>
          <div style={{ position: 'relative', width: 'calc(100% - 10px)' }}>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              style={{ 
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxSizing: 'border-box',
                paddingLeft: '30px', }}
            />
            <KeyboardVoiceIcon style={{ position: 'absolute', top: '50%', left: '5px', transform: 'translateY(-50%)' }}
              onClick={() => {
                if (transcript) {
                  setFormData(prevData => ({
                    ...prevData,
                    phoneNumber: transcript
                  }));
                }
                startListening();
              }} />
          </div>
          {formErrors.phoneNumber && <span style={{ color: 'red' }}>{formErrors.phoneNumber}</span>}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="address" style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <VolumeUpIcon style={{ marginRight: '5px' }} onClick={() => handleClick('address')} /> Address:
          </label>
          <div style={{ position: 'relative', width: 'calc(100% - 10px)' }}>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              style={{ 
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxSizing: 'border-box',
                paddingLeft: '30px', }}
            />
            <KeyboardVoiceIcon style={{ position: 'absolute', top: '50%', left: '5px', transform: 'translateY(-50%)' }}
              onClick={() => {
                if (transcript) {
                  setFormData(prevData => ({
                    ...prevData,
                    address: transcript
                  }));
                }
                startListening();
              }} />
          </div>
          {formErrors.address && <span style={{ color: 'red' }}>{formErrors.address}</span>}
        </div>
        <div>
          <button type="submit" style={{ 
            display: 'flex', 
            backgroundColor: '#4caf50', 
            color: 'white', 
            padding: '10px 20px', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer' }}>
           Payement
          </button><br/>
        </div>
      </form><br/>
      <Footer/>
    </>
  );
};

export default FormComponent;

