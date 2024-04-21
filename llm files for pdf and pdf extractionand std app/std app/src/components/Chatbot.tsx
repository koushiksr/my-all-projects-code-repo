import React, { useState } from "react";
import axios from "axios";

const ChatBot = () => {
  const [query, setQuery] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post<{ response: string }>(
        "http://localhost:8000/",
        { query }
      );

      setResponse(res.data.response);
    } catch (error) {
      console.error("Failed to get response:", error);
      setResponse("Failed to get response. Please try again.");
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {/* Display chat history and responses here */}
        <div className="chatbot-message">{response}</div>
      </div>
      <form onSubmit={handleSubmit} className="chatbot-input-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your query..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBot;
