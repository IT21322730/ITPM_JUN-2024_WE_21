import React, { useState, useEffect } from 'react';
import axios from 'axios';
import loginBackgroundImage from '../../pictures/loginBackground.jpeg'; // Import the image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';

const LoginForm = () => {
  const [role, setRole] = useState('user');
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [userListening, setUserListening] = useState(false);
  const [securityAnswerListening, setSecurityAnswerListening] = useState(false);
  const [speechSynthesisSupported, setSpeechSynthesisSupported] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('Welcome to the Taste Guide! If you are not a registered user, please click number zero to navigate to register. Or else lets login. Press number 4 to insert the username. To insert the answer press bumber 5. After inserting press number 6 to navigate to the homepage. User numeric keys.');
  const [speechText, setSpeechText] = useState('');
  const [speechTextSecurityAns, setSpeechTextSecurityAns] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Track if user is registering
  const [micEnabled, setMicEnabled] = useState(false); // Track if microphone is enabled
  const [abc, setAbc] = useState('mic0');

  const recognition = new window.webkitSpeechRecognition(); // Initialize SpeechRecognition

  useEffect(() => {
    if (securityAnswerListening) {
      recognition.start();
      recognition.continuous = true;
      recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        setSpeechTextSecurityAns(transcript);
        setFormData({ ...formData, securityAnswer: transcript }); // Update the security answer field with speech input
        recognition.stop();
        setSecurityAnswerListening(false);
      };
    }
  }, [securityAnswerListening]);

  useEffect(() => {
    if (userListening) {
      recognition.start();
      recognition.continuous = true;
      recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        setSpeechText(transcript);
        setFormData({ ...formData, username: transcript }); // Update the username field with speech input
        recognition.stop();
        setUserListening(false);
      };
    }
  }, [userListening]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.keyCode) {
        
        case 96: // Number 0 key on the numeric keypad
          if (role === 'user') {
            window.location.href = '/register';
          }
          break;

        case 100: // Number 4 key on the numeric keypad
          startListening('user');
          break;
        default:
          break;

          case 101: // Number 5 key on the numeric keypad
          if (!securityAnswerListening) {
            startListening('security');
          }
          break;  

        case 102: // Number 6 key on the numeric keypad
          if (role === 'user') {
            window.location.href = '/home';
          }
          break; 
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [userListening, securityAnswerListening, role]); // Add userListening and role to dependency array

  useEffect(() => {
    // Check if SpeechSynthesis API is supported
    if ('speechSynthesis' in window) {
      setSpeechSynthesisSupported(true);
    }
  }, []);

  useEffect(() => {
    // Speak welcome message when welcomeMessage state changes
    if (speechSynthesisSupported && welcomeMessage) {
      const utterance = new SpeechSynthesisUtterance(welcomeMessage);
      window.speechSynthesis.speak(utterance);
    }
  }, [welcomeMessage, speechSynthesisSupported]);


  const handleRoleChange = (e) => {
    setRole(e.target.value);
    if (e.target.value === 'user') {
      setMicEnabled(true);
    } else {
      setMicEnabled(false);
    }
  };

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

      const response = await axios.post(`http://localhost:8000/${role}/authenticate`, formData);
      console.log(response.data); // handle response data as needed
      // Redirect based on role using window.location.href
      if (role === 'user') {
        window.location.href = '/home';
      } else if (role === 'admin') {
        window.location.href = '/adminhome';
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const validateFormData = (data) => {
    // Validation logic
    const errors = {};

    if (!data.username) {
      errors.username = 'Username is required.';
    }

    if (role === 'user' && !data.securityAnswer) {
      errors.securityAnswer = 'Security answer is required.';
    }

    if (role === 'admin' && !data.password) {
      errors.password = 'Password is required.';
    }

    return errors;
  };


  const startListening = (userType) => {
    if (userType === 'user') {
      setUserListening(true);
      setSecurityAnswerListening(false);

    } else if (userType === 'security') {
      setSecurityAnswerListening(true);
      setUserListening(false);
    }
  };

  const stopListening = (userType) => {
    if (userType === 'user') {
      setUserListening(false);
    } else if (userType === 'security') {
      setSecurityAnswerListening(false);
    }
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
        justifyContent: 'space-between' // Move mic icon to the right
      }}>
        <span>Taste Guide <span role="img" aria-label="Emoji with Glasses" style={{ marginLeft: '10px', fontSize: '36px' }}>🥸</span></span>
        {role === 'user' && micEnabled && ( // Conditionally render microphone icon
          <FontAwesomeIcon
            icon={faMicrophone}
            style={{ cursor: 'pointer', marginRight: '5px', fontSize: '24px' }}
            onClick={() => startListening('user')}
          />
        )}
      </h1>

      <form style={{
        width: '350px', // Increase the width of the login form
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center form items horizontally
      }} onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Login</h2>
        <div style={{ marginBottom: '10px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          <label style={{ marginRight: '10px', display: 'inline-block', textAlign: 'left' }}>Select Role:</label>
          <select value={role} onChange={handleRoleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div style={{ marginBottom: '10px', width: '100%', display: 'flex', flexDirection: 'column' }}>
          <label style={{ display: 'block', textAlign: 'left', marginBottom: '5px' }}>Username:</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>

            <FontAwesomeIcon icon={userListening ? faMicrophone : faMicrophoneSlash} style={{ cursor: 'pointer', marginRight: '5px' }} onClick={() => userListening ? stopListening('user') : startListening('user')} />
            <input
              type="text"
              name="username"
              style={{ width: '100%', borderRadius: '5px' }}
              onChange={handleChange}
              value={speechText} // Set value to speechText state
            />
          </div>
          {errors.username && <p style={{ color: 'red', marginBottom: '0px' }}>{errors.username}</p>}
        </div>

        {role === 'user' && (
          <div style={{ marginBottom: '10px', width: '100%' }}>
            <label style={{ display: 'block', textAlign: 'left', marginBottom: '5px' }}>Security Answer:</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FontAwesomeIcon icon={securityAnswerListening ? faMicrophone : faMicrophoneSlash} style={{ cursor: 'pointer', marginRight: '5px' }} onClick={() => securityAnswerListening ? stopListening('security') : startListening('security')} />
              <input
                type="text"
                name="securityAnswer"
                style={{ width: '100%', borderRadius: '5px' }}
                onChange={handleChange}
                value={speechTextSecurityAns}
              />
            </div>
            {errors.securityAnswer && <p style={{ color: 'red', marginBottom: '0px' }}>{errors.securityAnswer}</p>}
            <p style={{ marginTop: '10px', textAlign: 'left' }}>
              <a href="/forget-answer">Forgot Answer?</a>
            </p>
          </div>
        )}
        {role === 'admin' && (
          <div style={{ marginBottom: '10px', width: '100%' }}>
            <label style={{ display: 'block', textAlign: 'left' }}>Admin Password:</label>
            <input
              type="password"
              name="password"
              style={{ width: '100%', borderRadius: '5px' }}
              onChange={handleChange}
              value={formData.securityAnswer} // Set value to security answer state
            />
            {errors.password && <p style={{ color: 'red', marginBottom: '0px' }}>{errors.password}</p>}
            <p style={{ marginTop: '10px', textAlign: 'left' }}>
              <a href="/forget-password">Forgot Password?</a>
            </p>
          </div>
        )}
        <button type="submit" style={{ width: '100px', marginTop: '5px', backgroundColor: 'green', color: 'white', borderRadius: '5px' }}>Login</button>
        <p style={{ marginTop: '20px', textAlign: 'center' }}>Don't have an account? <a href="/register">Register</a></p>
      </form>
    </div>
  );
};

export default LoginForm;
