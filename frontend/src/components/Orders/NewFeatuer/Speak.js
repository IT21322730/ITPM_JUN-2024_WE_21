import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Header from '../../Header';
import Footer from '../../Footer';
import backgroundImg from '../../img/Italian_1.jpg'; // Import the background image

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [itemPrice, setItemPrice] = useState('');
  const [priceType, setPriceType] = useState('less'); // Default to 'less' than price
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    speakInstructions();
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const sanitizeItemPrice = (value) => {
    // Remove periods from the value before setting it as itemPrice
    const sanitizedValue = value.replace(/\./g, '');
    setItemPrice(sanitizedValue);
  };

  const handleKeyDown = (event) => {
    console.log('Key pressed:', event.key);
    if (event.key === '1') {
      document.getElementById('formGroupExampleInput').select();
      SpeechRecognition.startListening({ continuous: true });
    } else if (event.key === '2') {
      SpeechRecognition.stopListening();
      speakNextInstructions();
    } else if (event.key === '3') {
      setPriceType('less');
    } else if (event.key === '4') {
      setPriceType('more');
    } else if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default form submission behavior
      console.log('Enter key pressed');
      handleSearch();
      speakSearchResults(); // Speak search results
    } else if (event.key === '6') {
      window.location.reload(); // Reload the page
    }
  };

  const speakInstructions = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance("Hey, I can give you the item details. You can press enter to enter the keyboard value of key 1, and you can give the item price. Also, you can enter the key of number 2 when the mic is off. Thank you");
    synth.speak(utterance);
  };

  const speakNextInstructions = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance("Hey, you can select key number 3 to choose 'less than', and you can press number 4 to select 'more than'. Please enter your input.");
    synth.speak(utterance);
  };

  const speakSearchResults = () => {
    const synth = window.speechSynthesis;
    if (searchResults) {
      const utterance = new SpeechSynthesisUtterance("Here are the search results:");
      synth.speak(utterance);
      searchResults.forEach(result => {
        const resultUtterance = new SpeechSynthesisUtterance(`Item Name: ${result.name}, Item Price: ${result.price}`);
        synth.speak(resultUtterance);
      });
    } 
  };
  
  const handleSearch = () => {
    const operator = priceType === 'less' ? 'lt' : 'gt';
    fetch(`http://localhost:8000/oitem/?price__${operator}=${transcript}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Search Results:', data);
        setSearchResults(data);
        speakSearchResults();
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
        alert('There was an error fetching data. Please try again.');
      });
  };
  

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover', backgroundPosition: 'center',minHeight: '100vh' }}>
      <Header/><br/>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '50%', border: '1px solid #ccc', padding: '10px', borderRadius: '5px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <form>
            <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
              <label htmlFor="formGroupExampleInput" style={{ marginRight: '5px', display: 'block' }}>Item Price (Rs.):</label>
              <input
                type="text"
                className="form-control form-input"
                id="formGroupExampleInput"
                placeholder="Enter item price"
                value={transcript}
                onChange={e => sanitizeItemPrice(e.target.value)}
                style={{ display: 'block', border: '1px solid #ccc', borderRadius: '3px', padding: '5px' }}
              />
            </div>
            <br/>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priceType"
                id="lessThanRadio"
                value="less"
                checked={priceType === 'less'}
                onChange={() => setPriceType('less')}
              />
              <label className="form-check-label" htmlFor="lessThanRadio">Less than</label>
            </div><br/>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priceType"
                id="moreThanRadio"
                value="more"
                checked={priceType === 'more'}
                onChange={() => setPriceType('more')}
              />
              <label className="form-check-label" htmlFor="moreThanRadio">More than</label>
            </div><br/><br/>
            <button type="button" className="btn btn-primary" onClick={handleSearch}>Search</button>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button className="btn btn-success" style={{ marginRight: '8px' }} onClick={SpeechRecognition.startListening}>Start</button>
            <button className="btn btn-danger" style={{ marginRight: '8px' }} onClick={SpeechRecognition.stopListening}>Stop</button>
            <button className="btn btn-dark" style={{ marginRight: '8px' }} onClick={resetTranscript}>Reset</button>
          </form>
        </div>

        {/* Display search results */}
        {searchResults && (
          <div style={{ width: '50%', marginTop: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <h2>Search Results:</h2>
            <ul>
              {searchResults.map(result => (
                <li key={result.id}>
                  <strong>Item Name:</strong> {result.name}, <strong>Item Price:</strong> {result.price}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div><br/><br/><br/>
      <Footer/>
    </div>
  );
}

export default Dictaphone;
