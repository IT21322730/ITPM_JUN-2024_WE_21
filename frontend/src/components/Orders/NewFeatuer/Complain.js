import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from 'antd';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from "axios";
import Header from '../../Header';
import Footer from '../../Footer';

const { TextArea } = Input;

const AddComplain = () => {
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
        const utterance = new SpeechSynthesisUtterance("Hello, you can input your complaint by pressing the '1' key, and then pressing the enter button to submit it. Thank you");
        synth.speak(utterance);
    };

    useEffect(() => {
        if (enterPressed) {
            submitComplain();
            setEnterPressed(false);
        }
    }, [enterPressed]);

    const handleKeyDown = (event) => {
        console.log('Key pressed:', event.key);
        if (event.key === '1') {
            document.getElementById('exampleFormControlTextarea1').select();
            SpeechRecognition.startListening({ continuous: true });
        } else if (event.key === '2') {
            SpeechRecognition.stopListening();
        } else if (event.key === '3') {
            resetTranscript();
        } else if (event.key === 'Enter') {
            setEnterPressed(true);
            event.preventDefault(); // Prevent default behavior of textarea on Enter
        }
    };

    const startListening = () => {
        SpeechRecognition.startListening();
    };

    const stopListening = () => {
        SpeechRecognition.stopListening();
    };

    const submitComplain = async () => {
        await axios.post(`http://localhost:8000/complain/add`, {
            complain: transcript, // Send only the transcribed text
        }).then(res => {
            // Redirect to /home after successful submission
            navigate('/home');
            return res.data;
        });
    };

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <>
            <Header />
            <img src="https://www.searchenginejournal.com/wp-content/uploads/2022/08/contact-us-2-62fa2cc2edbaf-sej.png" alt="Contact Us" style={{ width: '100%', maxHeight: '700px', objectFit: 'contain' }} />
            <div className="container-fluid" style={{ position: 'relative', zIndex: '1' }}>
                <div className="row">
                    <div className="col-md-9">
                        <div className="container" style={{ width: '100%' }}>
                            <div className="heading" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
                                <br />
                                <h3>We Heard You! </h3>
                            </div>
                            <form className="mt-4" style={{ display: 'flex', flexDirection: 'column' }}>
                                <div className="form-group">
                                    <TextArea
                                        id="exampleFormControlTextarea1"
                                        value={transcript} // Display transcribed text directly
                                        autoSize={{ minRows: 3, maxRows: 6 }}
                                        readOnly // Ensure textarea is read-only
                                        onKeyDown={handleKeyDown} // Listen for keydown events
                                    />
                                    <br/><br/>
                                    <Button type="primary" onClick={submitComplain}>Submit my Complain..</Button>
                                    <br/><br/>
                                    <p>Microphone: {listening ? 'on' : 'off'}</p>
                                    <Button type="primary" onClick={startListening} style={{ marginRight: '5px' }}>Start</Button>
                                    <Button type="default" onClick={stopListening} style={{ marginRight: '5px' }}>Stop</Button>
                                    <Button type="default" onClick={resetTranscript}>Reset</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <br/><br/><br/><br/>
            <Footer />
        </>
    );
};

export default AddComplain;
