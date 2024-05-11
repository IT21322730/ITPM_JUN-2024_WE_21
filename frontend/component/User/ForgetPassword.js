import React, { useState } from 'react';
import axios from 'axios';
import loginBackgroundImage from '../../pictures/loginBackground.jpeg';

const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:8000/admin/update-password', formData);
      setMessage(response.data.message);
      window.location.href = "/authenticate";
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred while updating the password');
      }
    }
  };

  const validateFormData = (data) => {
    // Validation logic
    const errors = {};

    if (!data.username) {
      errors.username = 'Username is required.';
    }
    if (!data.password) {
      errors.password = 'Password is required.';
    }
    if (!data.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required.';
    }
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords don't match.";
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
        width: '350px', // Increase the width of the form
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center form items horizontally
      }} onSubmit={handleSubmit}>

        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Forgot Password</h2>

        <div style={{ marginBottom: '10px', width: '100%' }}>
          <label style={{ display: 'block', textAlign: 'left' }}>Username<span style={{ color: 'red' }}>*</span>:</label>
          <input type="text" name="username" onChange={handleChange} style={{ width: '100%', borderRadius: '5px' }} />
          {errors.username && <p style={{ color: 'red', marginBottom: '0px' }}>{errors.username}</p>}
        </div>
        <div style={{ marginBottom: '10px', width: '100%' }}>
          <label style={{ display: 'block', textAlign: 'left' }}>New Password<span style={{ color: 'red' }}>*</span>:</label>
          <input type="password" name="password" onChange={handleChange} style={{ width: '100%', borderRadius: '5px' }} />
          {errors.password && <p style={{ color: 'red', marginBottom: '0px' }}>{errors.password}</p>}
        </div>
        <div style={{ marginBottom: '10px', width: '100%' }}>
          <label style={{ display: 'block', textAlign: 'left' }}>Confirm Password<span style={{ color: 'red' }}>*</span>:</label>
          <input type="password" name="confirmPassword" onChange={handleChange} style={{ width: '100%', borderRadius: '5px' }} />
          {errors.confirmPassword && <p style={{ color: 'red', marginBottom: '0px' }}>{errors.confirmPassword}</p>}
        </div>
        <button type="submit" style={{ width: '65%', marginTop: '20px', marginBottom: '20px', backgroundColor: 'green', color: 'white', borderRadius: '5px' }}>Reset Password</button>
      </form>
    </div>
  );
};

export default ForgetPassword;
