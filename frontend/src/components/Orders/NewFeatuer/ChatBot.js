import React, { useState, useEffect,Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import axios from 'axios';
import PropTypes from 'prop-types';
import Header from '../../Header';
import backgroundImage from 'D:/ITPM_01/frontend/src/components/img/food_1.jpg';


class Review extends Component {
  constructor(props) {
    super(props);

    const { steps } = props;
    const { name, address, telephoneNumber } = steps;

    this.state = {
      name: name ? name.value : '',
      address: address ? address.value : '',
      telephoneNumber: telephoneNumber ? telephoneNumber.value : '',
    };
  }

  render() {
    const { name, address, telephoneNumber } = this.state;
    return (
      <div style={{ width: '100%' }}>
        <h3>Summary</h3>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{name}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{address}</td>
            </tr>
            <tr>
              <td>Tele No.</td>
              <td>{telephoneNumber}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

const Chat = () => {
  const [items, setItems] = useState([]);
  const [menuReady, setMenuReady] = useState(false);

  useEffect(() => {
    // Fetch items from backend when component mounts
    axios.get('http://localhost:8000/oitem/')
      .then(response => {
        setItems(response.data);
        setMenuReady(true); // Set menuReady to true when items are fetched
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, []);

  // Render chatbot only when menu items are ready
  return (
    <>
      <div
        style={{
          position: 'relative', // Ensure positioning context for children
          minHeight: '100vh', // Ensure the container covers the full height of the viewport
        }}
      >
        <Header />
        <div
          style={{
            position: 'absolute', // Position this div absolutely to layer it on top of the background image
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${backgroundImage})`, // Apply background image to the entire page
            backgroundSize: 'cover', // Make sure the image covers the entire page
            backgroundRepeat: 'no-repeat', // Prevent image from repeating
            zIndex: -1, // Push this div to the back so that the header appears above it
          }}
        />
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '400px', // Adjust width as needed
          height: '550px', // Adjust height as needed
        }}>
          {menuReady && (
            <ChatBot
              headerTitle="Helper Centre"
              speechSynthesis={{ enable: true, lang: 'en' }}
              recognitionEnable={true}
              steps={[
                {
                  id: '1',
                  message: ' Hi there! Welcome to our food ordering service. How can I assist you today?',
                  trigger: '2',
                },
                {
                  id: '2',
                  options: [
                    { value: 1, label: 'I desire to purchase delectable cuisine ?', trigger: '3' },
                    { value: 2, label: 'I wish to establish contact with our service provider ?', trigger: '4' },
                    { value: 3, label: 'I want to put the complain ', trigger: 'complain' },
                    { value: 4, label: 'Subscribe to newsletter', trigger: 'subscribe' }, // New option for subscribing to the newsletter
                  ],
          
                },
                {
                  id: 'complain', // Unique id for this step
                  message: 'Give me Your name', // Use {previousValue} to access user input
                  trigger: 'complain-name',
                },
                {
                  id: 'complain-name',
                  user: true,
                  trigger: 'complain-mail',
                },
                {
                  id: 'complain-mail', // Unique id for this step
                  message: 'Give me Your Email', // Use {previousValue} to access user input
                  trigger: 'complain-mail-user',
                },
                {
                  id: 'complain-mail-user',
                  user: true,
                  validator: (value) => {
                    // Validate email address format
                    if (!/^\S+@\S+\.\S+$/.test(value)) {
                      return 'Please enter a valid email address';
                    }
                    return true;
                  },
                  trigger: 'complain-msg-user',
                },
                {
                  id: 'complain-msg-user', // Unique id for this step
                  message: 'Put Your Complain', // Use {previousValue} to access user input
                  trigger: 'complain-msguser',
                },
                {
                  id: 'complain-msguser',
                  user: true,
                  trigger: 'saveComplaint',
                },
                {
                  id: 'saveComplaint',
                  message: 'Thank you for your complaint. It has been submitted.',
                  end: true,
                  trigger: 2,
                  
                },
                {
                  id: 'subscribe',
                  message: 'Would you like to subscribe to our newsletter for updates and promotions?',
                  trigger: 'subscribe-options',
                },
                {
                  id: 'subscribe-options',
                  options: [
                    { value: 'yes', label: 'Yes', trigger: 'ask-name' },
                    { value: 'no', label: 'No', trigger: '2' },
                  ],
                },
                {
                  id: 'ask-name',
                  message: 'Please enter your name:',
                  trigger: 'get-name',
                },
                {
                  id: 'get-name',
                  user: true,
                  trigger: 'ask-email',
                },
                {
                  id: 'ask-email',
                  message: 'Great! Now, please enter your email address:',
                  trigger: 'get-email',
                },
                {
                  id: 'get-email',
                  user: true,
                  trigger: 'subscribe-confirm',
                },
                {
                  id: 'subscribe-confirm',
                  message: 'Thank you for subscribing to our newsletter! You will now receive updates and promotions via email.',
                  trigger: '2',
                },
                {
                  id: '3',
                  message: `This is our menu, offering a variety of delicious options. Feel free to choose anything you like. Once you have made your selection, please provide me with the corresponding food number. 
                
                ${items.length > 0 ? items.map((item, id) =>
                `Item Number: ${id + 1}
                Item Name: ${item.name}
                Item Price: ${item.price}
                
                `).join(' ') : 'No items available'}`,
                  trigger: '6'
                },        
                {
                  id: '4',
                  message: 'Okay, I will connect you to our service provider. Call this - 0912258895.',
                  end: true,
                },
                {
                  id: '6',
                  user: true,
                  trigger: '7',
                },
                {
                  id: '7', // Unique id for this step
                  message: 'You have selected food ID {previousValue}.', //
                  trigger: '8',
                },
                {
                  id: '8',
                  options: [
                    { value: 1, label: 'Yes', trigger: '9' },
                    { value: 2, label: 'No', trigger: '10' },
                  ],
                },
                {
                  id: '9',
                  message: 'Are you interested in purchasing this item? Yes or no?',
                  trigger: 'option'
                },
                {
                  id: 'option',
                  options: [
                    { value: 1, label: 'Yes', trigger: '12' },
                    { value: 2, label: 'No', trigger: '10' },
                  ],
                },
                {
                  id: '10',
                  message: 'Okay, Thank you for connecting with us..',
                  trigger: '2',
                },
                {
                  id: '12',
                  message: 'What is your name?',
                  trigger: 'name',
                },
                {
                  id: 'name',
                  user: true,
                  trigger: '13',
                },
                {
                  id: '13',
                  message: 'Hi {previousValue}! What is your Address?',
                  trigger: 'address',
                },
                {
                  id: 'address',
                  user: true,
                  trigger: 'getNum',
                },
                {
                  id: 'getNum',
                  message: 'What is your telephone number',
                  trigger: 'telephoneNumber',
                },
                {
                  id: 'telephoneNumber',
                  user: true,
                  validator: (value) => {
                    // Validate telephone number format
                    if (!/^\d{10}$/.test(value)) {
                      return 'Please enter a valid 10-digit telephone number';
                    }
                    return true;
                  },
                  trigger: 'summary',
                },
                {
                  id: 'summary',
                  message: 'Great! Check out your summary',
                  trigger: 'review',
                },
                {
                  id: 'review',
                  component: <Review />,
                  asMessage: true,
                  trigger: 'update',
                },
                {
                  id: 'update',
                  message: 'Would you like to update some field?',
                  trigger: 'update-question',
                },
                {
                  id: 'update-question',
                  options: [
                    { value: 'yes', label: 'Yes', trigger: 'update-yes' },
                    { value: 'no', label: 'No', trigger: 'end-message' },
                  ],
                },
                {
                  id: 'update-yes',
                  message: 'What field would you like to update?',
                  trigger: 'update-fields',
                },
                {
                  id: 'update-fields',
                  options: [
                    { value: 'name', label: 'Name', trigger: 'update-name' },
                    { value: 'address', label: 'Address', trigger: 'update-address' },
                    { value: 'telephoneNumber', label: 'Telephone Number', trigger: 'update-Number' }, // Corrected trigger id
                  ],
                },
                {
                  id: 'update-name',
                  update: 'name',
                  trigger: 'summary',
                },
                {
                  id: 'update-address',
                  update: 'address',
                  trigger: 'summary',
                },
                {
                  id: 'update-Number',
                  update: 'Number',
                  trigger: 'summary',
                },
                {
                  id: 'end-message',
                  message: 'Thanks! Your Order place successfully! ',
                  trigger: '2',
                },
              ]}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
