import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

const Home = () => {
    const [speechText, setSpeechText] = useState('');
    const [isListening, setIsListening] = useState(false);
    
    const recognition = new window.webkitSpeechRecognition();

    useEffect(() => {
        recognition.continuous = true;
        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript;
            setSpeechText(transcript);
            navigateToPage(transcript);
        };
    }, []);

    const startListening = () => {
        setIsListening(true);
        recognition.start();
    };

    const stopListening = () => {
        setIsListening(false);
        recognition.stop();
    };

    const handleSpeak = () => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance("Welcome to the Taste Guide. Which cuisine would you like to try today? We have Indian, Chinese, Korean, Thai, Japanese, and Sri Lankan cuisines.");
        synth.speak(utterance);
    };

    const navigateToPage = (transcript) => {
        if (transcript.toLowerCase().includes("indian")) {
            window.location.href = '/indian';
        } else if (transcript.toLowerCase().includes("chinese")) {
            window.location.href = '/chinese';
        } else if (transcript.toLowerCase().includes("korean")) {
            window.location.href = '/korean';
        } else if (transcript.toLowerCase().includes("thai")) {
            window.location.href = '/thai';
        } else if (transcript.toLowerCase().includes("japanese")) {
            window.location.href = '/japanese';
        } else if (transcript.toLowerCase().includes("sri lankan")) {
            window.location.href = '/sri-lankan';
        }
    };

    return (
        <div>
            <Header />
            <div
                style={{
                    backgroundImage: "url('https://images.pexels.com/photos/616401/pexels-photo-616401.jpeg?cs=srgb&dl=pexels-lukas-616401.jpg&fm=jpg')",
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    textAlign: 'center',
                    padding: '20px',
                }}
            >
                <h1>Welcome to the Taste Guide</h1>
                <button onClick={handleSpeak}>Start Speaking</button>
                <button onClick={startListening} disabled={isListening}>Start Listening</button>
                <button onClick={stopListening} disabled={!isListening}>Stop Listening</button>
                <br />
                <textarea
                    value={speechText}
                    onChange={(e) => setSpeechText(e.target.value)}
                    placeholder="Speak or type here..."
                    style={{ width: '100%', minHeight: '100px', margin: '10px 0' }}
                />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
