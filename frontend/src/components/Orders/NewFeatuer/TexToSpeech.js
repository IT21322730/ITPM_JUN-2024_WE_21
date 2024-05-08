import React, {useEffect, useRef, useState} from "react";

const useSpeechToText = (options) => {

    const [isListening, setListening] = useState(false)
    const [transcript, setTranscript] = useState("")
    const recognitionRef = useRef(null)

    useEffect (() => {

        if (!('webitSpeechRecognition' in window)){
            console.error("Web speech api is not supported.")
            return;
        }

        recognitionRef.current = new window.webitSpeechRecognition()
        const recognition = recognitionRef.current
        recognition.interimResults = options.interimResults || true
        recognition.lang = options.lang || "en-US"
        recognition.continuous = options.continuous || false

        if ("webkitSpeechGrammarList" in window){
            const grammar = "#JSGF V1.0; grammar punctuation; public <punc> = . | , | ? | ; | : ;"
            const SpeechRecognitionList = new window.webkitSpeechGrammarList()
            SpeechRecognitionList.addFromString(grammar, 1)
            recognition.grammars = SpeechRecognitionList
        }

        recognition.onresult = (event) => {

            let text = ""
            for (let i=0; i<event.results.length; i++){
                text += event.results[i][0].transcript
            }
            setTranscript(text)
        }

        recognition.onerror = (event) => {
            console.error("Speech recoginition error:", event.error)
        }

        recognition.onend = () => {
            setListening(false)
            setTranscript("")
        }

        return() => {
            recognition.stop()
        }
    },[])

    const startListening = () => {
        if(recognitionRef.current && !isListening){
            recognitionRef.current.start()
            setListening(true)
        }
    }

    const stopListening = () => {
        if(recognitionRef.current && isListening){
            recognitionRef.current.stop()
            setListening(false)
        }
    }

    return{
        isListening,
        transcript,
        startListening,
        stopListening
    }
}

export default useSpeechToText;
