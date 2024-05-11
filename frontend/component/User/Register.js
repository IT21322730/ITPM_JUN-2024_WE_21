import React, { useState, useEffect } from 'react';
import axios from 'axios';
import loginBackgroundImage from '../../pictures/loginBackground.jpeg'; // Import the image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';

const RegisterForm = () => {
  const [role, setRole] = useState('user');
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [userListening, setUserListening] = useState(false);
  const [securityQuestionListening, setSecurityQuestionListening] = useState(false);
  const [securityAnswerListening, setSecurityAnswerListening] = useState(false);
  const [speechText, setSpeechText] = useState('');
  const [speechTextSecurityQuestion, setSpeechTextSecurityQuestion] = useState('');
  const [speechTextSecurityAnswer, setSpeechTextSecurityAnswer] = useState('');
  const [micEnabled, setMicEnabled] = useState(false);

  const recognition = new window.webkitSpeechRecognition(); // Initialize SpeechRecognition

  useEffect(() => {
    // Check if SpeechSynthesis API is supported
    if ('speechSynthesis' in window) {
      setMicEnabled(true);
    }
  }, []);

  useEffect(() => {
    // Speak welcome message when component mounts
    const welcomeMessage = "Welcome to the registration page. Press number 1 to insert the username, press number 2 to insert the security question, and press number 3 to insert the security answer. After insering press number 7 to navigate to the login page. Use numeric keys";
    if (micEnabled && welcomeMessage) {
      const utterance = new SpeechSynthesisUtterance(welcomeMessage);
      window.speechSynthesis.speak(utterance);
    }
  }, [micEnabled]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.keyCode) {
        case 97: // Number 1 key on the numeric keypad
          startListening('username');
          break;
        case 98: // Number 2 key on the numeric keypad
          startListening('securityQuestion');
          break;
        case 99: // Number 3 key on the numeric keypad
          startListening('securityAnswer');
          break;
        case 103: // Number 7 key on the numeric keypad
          if (role === 'user') {
            window.location.href = '/authenticate';
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  useEffect(() => {
    if (userListening) {
      recognition.start();
      recognition.continuous = true;
      recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        setSpeechText(transcript);
        handleChange({ target: { name: 'newUsername' } }, transcript); // Update the form data and clear errors
        recognition.stop();
        setUserListening(false);
      };
    }
  }, [userListening, formData]);

  useEffect(() => {
    if (securityQuestionListening) {
      recognition.start();
      recognition.continuous = true;
      recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        setSpeechTextSecurityQuestion(transcript);
        handleChange({ target: { name: 'securityQuestion' } }, transcript); // Update the form data and clear errors
        recognition.stop();
        setSecurityQuestionListening(false);
      };
    }
  }, [securityQuestionListening, formData]);

  useEffect(() => {
    if (securityAnswerListening) {
      recognition.start();
      recognition.continuous = true;
      recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        setSpeechTextSecurityAnswer(transcript);
        handleChange({ target: { name: 'newSecurityAnswer' } }, transcript); // Update the form data and clear errors
        recognition.stop();
        setSecurityAnswerListening(false);
      };
    }
  }, [securityAnswerListening, formData]);

  useEffect(() => {
    // Check if SpeechSynthesis API is supported
    if ('speechSynthesis' in window) {
      setMicEnabled(true);
    }
  }, []);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleChange = (e, value) => {
    const inputValue = value || e.target.value; // Use the speech input if available
    setFormData({ ...formData, [e.target.name]: inputValue });
    // Clear the error message for the changed field
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log a message to indicate that the handleSubmit function is being called
    console.log('handleSubmit function called');

    try {
      let dataToSend;


      if (role === 'admin') {
        dataToSend = {
          username: formData.newAdminUsername,
          password: formData.newAdminPassword,
          role: role
        };
      } else {
        dataToSend = {
          username: formData.newUsername,
          securityQuestion: formData.securityQuestion,
          securityAnswer: formData.newSecurityAnswer,
          role: role
        };
      }

      // Frontend validation
      const validationErrors = validateFormData(dataToSend);
      if (Object.keys(validationErrors).length !== 0) {
        setErrors(validationErrors);
        return;
      }

      // Log a message to indicate that validation passed
      console.log('Validation passed');


      // Send the registration request to the backend
      const response = await axios.post(`http://localhost:8000/${role}/register`, dataToSend);
      console.log(response.data); // handle response data as needed
      // Redirect to login page
      window.location.href = '/authenticate';

      // Log a message to indicate successful registration
      console.log('Registration successful');

    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const validateFormData = (data) => {
    // Validation logic
    const errors = {};
    // let confirmPassword = formData.confirmPassword; // Get the confirm password value

    if (role === 'admin') {
      if (!data.username) {
        errors.newAdminUsername = 'Username is required.';
      }
      if (!data.password) {
        errors.newAdminPassword = 'Password is required.';
      }
      // // Frontend validation for confirm password
      // if (formData.newAdminPassword !== confirmPassword) {
      //   setErrors({ ...errors, confirmPassword: 'Passwords do not match.' });
      //   return;
      // }
    } else {
      if (!data.username) {
        errors.newUsername = 'Username is required.';
      }
      if (!data.securityQuestion) {
        errors.securityQuestion = 'Security question is required.';
      }
      if (!data.securityAnswer) {
        errors.newSecurityAnswer = 'Security answer is required.';
      }
    }

    return errors;
  };

  const startListening = (userType) => {
    if (userType === 'username') {
      setUserListening(true);
      setSecurityQuestionListening(false);
      setSecurityAnswerListening(false);
    } else if (userType === 'securityQuestion') {
      setSecurityQuestionListening(true);
      setUserListening(false);
      setSecurityAnswerListening(false);
    } else if (userType === 'securityAnswer') {
      setSecurityAnswerListening(true);
      setUserListening(false);
      setSecurityQuestionListening(false);
    }
  };

  const stopListening = (userType) => {
    if (userType === 'username') {
      setUserListening(false);
    } else if (userType === 'securityQuestion') {
      setSecurityQuestionListening(false);
    } else if (userType === 'securityAnswer') {
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
      }}>
        Taste Guide <span role="img" aria-label="Emoji with Glasses" style={{ marginLeft: '10px', fontSize: '36px' }}>🥸</span>
      </h1>

      <form style={{
        width: '350px', // Increase the width of the registration form
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center form items horizontally
      }} onSubmit={handleSubmit}>

        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Register</h2>
        <div style={{ marginBottom: '10px', width: '100%', textAlign: 'center' }}>
          <label style={{ marginRight: '10px', display: 'inline-block', textAlign: 'left' }}>
            Select Role:
          </label>
          <select value={role} onChange={handleRoleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {role === 'user' && (
          <>
            {/* User registration fields */}
            <div style={{ marginBottom: '10px', width: '100%' }}>
              <label style={{ display: 'block', textAlign: 'left' }}>
                Username<span style={{ color: 'red' }}>*</span>:
              </label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FontAwesomeIcon icon={userListening ? faMicrophone : faMicrophoneSlash} style={{ cursor: 'pointer', marginRight: '5px' }} onClick={() => userListening ? stopListening() : startListening('username')} />
                <input
                  type="text"
                  name="newUsername"
                  style={{ width: '100%', borderRadius: '5px' }}
                  onChange={handleChange}
                  value={speechText}
                />
              </div>
              {errors.newUsername && <p style={{ color: 'red', marginBottom: '0px' }}>{errors.newUsername}</p>}
            </div>
            <div style={{ marginBottom: '10px', width: '100%' }}>
              <label style={{ display: 'block', textAlign: 'left' }}>
                Security Question<span style={{ color: 'red' }}>*</span>:
              </label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FontAwesomeIcon icon={securityQuestionListening ? faMicrophone : faMicrophoneSlash} style={{ cursor: 'pointer', marginRight: '5px' }} onClick={() => securityQuestionListening ? stopListening() : startListening('securityQuestion')} />
                <input
                  type="text"
                  name="securityQuestion"
                  style={{ width: '100%', borderRadius: '5px' }}
                  onChange={handleChange}
                  value={speechTextSecurityQuestion}
                />
              </div>
              {errors.securityQuestion && <p style={{ color: 'red', marginBottom: '0px' }}>{errors.securityQuestion}</p>}
            </div>
            <div style={{ marginBottom: '10px', width: '100%' }}>
              <label style={{ display: 'block', textAlign: 'left' }}>
                Security Answer<span style={{ color: 'red' }}>*</span>:
              </label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FontAwesomeIcon icon={securityAnswerListening ? faMicrophone : faMicrophoneSlash} style={{ cursor: 'pointer', marginRight: '5px' }} onClick={() => securityAnswerListening ? stopListening() : startListening('securityAnswer')} />
                <input
                  type="text"
                  name="newSecurityAnswer"
                  style={{ width: '100%', borderRadius: '5px' }}
                  onChange={handleChange}
                  value={speechTextSecurityAnswer}
                />
              </div>
              {errors.newSecurityAnswer && <p style={{ color: 'red', marginBottom: '0px' }}>{errors.newSecurityAnswer}</p>}
            </div>
          </>
        )}
        {role === 'admin' && (
          <>
            {/* Admin registration fields */}
            <div style={{ marginBottom: '10px', width: '100%' }}>
              <label style={{ display: 'block', textAlign: 'left' }}>
                Admin Username<span style={{ color: 'red' }}>*</span>:
              </label>
              <input
                type="text"
                name="newAdminUsername"
                style={{ width: '100%', borderRadius: '5px' }}
                onChange={handleChange}
              />
              {errors.newAdminUsername && <p style={{ color: 'red', marginBottom: '0px' }}>{errors.newAdminUsername}</p>}
            </div>
            <div style={{ marginBottom: '10px', width: '100%' }}>
              <label style={{ display: 'block', textAlign: 'left' }}>
                Admin Password<span style={{ color: 'red' }}>*</span>:
              </label>
              <input
                type="password"
                name="newAdminPassword"
                style={{ width: '100%', borderRadius: '5px' }}
                onChange={handleChange}
              />
              {errors.newAdminPassword && <p style={{ color: 'red', marginBottom: '0px' }}>{errors.newAdminPassword}</p>}
            </div>
            <div style={{ marginBottom: '10px', width: '100%' }}>
              <label style={{ display: 'block', textAlign: 'left' }}>
                Confirm Password<span style={{ color: 'red' }}>*</span>:
              </label>
              <input
                type="password"
                name="confirmPassword"
                style={{ width: '100%', borderRadius: '5px' }}
                onChange={handleChange}
              />
              {errors.confirmPassword && <p style={{ color: 'red', marginBottom: '0px' }}>{errors.confirmPassword}</p>}
            </div>
          </>
        )}
        <button type="submit" style={{ width: '100px', marginTop: '20px', backgroundColor: 'green', color: 'white', borderRadius: '5px' }}>Register</button>
        <p style={{ marginTop: '20px', textAlign: 'center' }}>Already have an account? <a href="/authenticate">Login</a></p>
      </form>
    </div>
  );
};

export default RegisterForm;
