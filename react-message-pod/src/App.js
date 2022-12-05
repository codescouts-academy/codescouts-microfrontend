import React, { useState } from "react";
import styles from "./App.module.css";

import logo from "./logo.svg";

import { MessageBus } from "@podium/browser";

const useMessageBus = (appId, onMessage) => {
  const messageBus = new MessageBus();

  messageBus.subscribe("internalchannel", "newMessage", (event) => {
    if (event.payload.from !== appId) {
      onMessage(event.payload.message);
    }
  });

  const sendMessage = (message) => {
    messageBus.publish("internalchannel", "newMessage", {
      message: message,
      from: appId,
    });

    onMessage(message);
  };

  return { sendMessage, onMessage };
};

function App() {
  const [messager, setMessage] = useState("");

  const { sendMessage } = useMessageBus("react panel", (message) => {
    setMessage(message);
  });

  const handleChange = (e) => {
    sendMessage(e.target.value);
  };

  return (
    <div className={styles.sendMessageApp}>
      <img
        className={styles.sendMessageImage}
        src={window.location.origin.replace("7000", "7100") + logo}
        alt="react framework"
      />
      <br />
      Micro Frontend Sender
      <br />
      <input
        className={styles.sendMessageInput}
        type="text"
        value={messager}
        onChange={handleChange}
        placeholder="Send a message..."
      />
    </div>
  );
}

export default App;
