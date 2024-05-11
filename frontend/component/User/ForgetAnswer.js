import React, { useState } from 'react';
import axios from 'axios';
import loginBackgroundImage from '../../pictures/loginBackground.jpeg'; // Import the image

const ForgetAnswer = () => {
  const [formData, setFormData] = useState({
    username: '',
    securityQuestion: '',
    securityAnswer: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear the error message for the changed field
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Frontend validation
      const validationErrors = validateFormData(formData);
      if (Object.keys(validationErrors).length !== 0) {
        setErrors(validationErrors);
        return;
      }

      const response = await axios.put('http://localhost:8000/user/update-user', formData);
      setMessage(response.data.message);
      window.location.href = "/authenticate";
    } catch (error) {
      console.error('Error updating security answer:', error);
      setMessage('An error occurred while updating security answer');
    }
  };

  const validateFormData = (data) => {
    // Validation logic
    const errors = {};

    if (!data.username) {
      errors.username = 'Username is required.';
    }

    if (!data.securityQuestion) {
      errors.securityQuestion = 'Security question is required.';
    }

    if (!data.securityAnswer) {
      errors.securityAnswer = 'Security answer is required.';
    }

    return errors;
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundImage: `url(${loginBackgroundImage})`, // Use the imported image
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>

      <h1 style={{
        color: 'yellow', // Yellow color for the heading
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
        padding: '10px 20px', // Increased padding for better highlight
        borderRadius: '10px', // Rounded corners
        marginBottom: '10px',
        textAlign: 'center',
        fontSize: '36px', // Larger font size for emphasis
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Text shadow for depth
        fontWeight: 'bold', // Bold font weight
        display: 'flex',
        alignItems: 'center', // Aligns the emoji and text horizontally
      }}>
        Taste Guide <span role="img" aria-label="Emoji with Glasses" style={{ marginLeft: '10px', fontSize: '36px' }}>🥸</span>
      </h1>

      <form style={{
        width: '350px', // Set the width of the form
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center form items horizontally
      }} onSubmit={handleSubmit}>

        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Forgot Answer</h2>
        <div style={{ marginBottom: '10px', width: '100%' }}>
          <label style={{ display: 'block', textAlign: 'left', color: 'black' }}>Username<span style={{ color: 'red' }}>*</span>:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} style={{ width: '100%', borderRadius: '5px' }} />
          {errors.username && <p style={{ color: 'red', marginBottom: '0px' }}>{errors.username}</p>}
        </div>
        <div style={{ marginBottom: '10px', width: '100%' }}>
          <label style={{ display: 'block', textAlign: 'left', color: 'black' }}>New Security Question<span style={{ color: 'red' }}>*</span>:</label>
          <input type="text" name="securityQuestion" value={formData.securityQuestion} onChange={handleChange} style={{ width: '100%', borderRadius: '5px' }} />
          {errors.securityQuestion && <p style={{ color: 'red', marginBottom: '0px' }}>{errors.securityQuestion}</p>}
        </div>
        <div style={{ marginBottom: '10px', width: '100%' }}>
          <label style={{ display: 'block', textAlign: 'left', color: 'black' }}>New Security Answer<span style={{ color: 'red' }}>*</span>:</label>
          <input type="text" name="securityAnswer" value={formData.securityAnswer} onChange={handleChange} style={{ width: '100%', borderRadius: '5px'}} />
          {errors.securityAnswer && <p style={{ color: 'red', marginBottom: '0px' }}>{errors.securityAnswer}</p>}
        </div>
        <button type="submit" style={{ width: '65%', marginTop: '20px', marginBottom: '20px', backgroundColor: 'green', color: 'white', borderRadius: '5px' }}>Reset Answer</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgetAnswer;
