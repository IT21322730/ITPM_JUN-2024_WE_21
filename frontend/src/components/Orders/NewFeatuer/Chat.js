import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import Selection from "../NewFeatuer/Select"; // Import your components for each route
import Complain from "../NewFeatuer/ComplainName";
import SpeechMenu from "../NewFeatuer/Menu";
import Contract from "../../Contract";
import { recognition } from 'D:/ITPM_01/frontend/src/components/Orders/NewFeatuer/Voicerecognition.js';

const App = () => {
  const history = useHistory();
  const [stopReco, setStopReco] = useState(false);

  useEffect(() => {
    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript;

      if (
        command.includes("i want more details about items") ||
        command.includes("give me the item details")
      ) {
        // Simulate navigation by calling the appropriate function
        if (command.includes("itemdetails") || command.includes("index")) {
          navigate("/selection");
        } else if (
          command.includes("i want to put the complaint") ||
          command.includes("complain")
        ) {
          navigate("/complain");
        } else if (
          command.includes("i want today's menu") ||
          command.includes("menu")
        ) {
          navigate("/speechmenu");
        } else if (
          command.includes("i want to contact details") ||
          command.includes("contact")
        ) {
          navigate("/contract");
        }
      } else if (
        command.includes("stop listening") ||
        command.includes("stop recognition") ||
        command.includes("stop recognizing") ||
        command.includes("stop voice controlling") ||
        command.includes("stop voice control")
      ) {
        recognition.stop();
        setStopReco(true);
      }
    };

    recognition.onend = () => {
      if (!stopReco) {
        recognition.start();
      }
    };

    return () => {
      recognition.stop();
    };
  }, [stopReco]);

  // Function to navigate to a specific path
  const navigate = (path) => {
    history.push(path); // Use history.push to navigate to the specified path
  };

  return (
    <div className="app">
        <Route exact path="/selection">
          <Selection />
        </Route>
        <Route exact path="/complain">
          <Complain />
        </Route>
        <Route exact path="/speechmenu">
          <SpeechMenu />
        </Route>
        <Route exact path="/contract">
          <Contract />
        </Route>
    </div>
  );
};

export default App;
