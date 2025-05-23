import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Forum.css";

const Forum = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [charonName, setCharonName] = useState("Anonymous Charon");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("charonName");

    if (!token) {
      navigate("/signin"); // Redirect if not signed in
    } else {
      setCharonName(name || "Charon I"); // Use stored name or fallback
    }
  }, [navigate]);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = {
        name: charonName,
        text: input.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, newMessage]);
      setInput("");
    }
  };

  return (
    <div className="forum-container">
      <h2 className="forum-title">Welcome to the River, <span className="charon-name">{charonName}</span></h2>

      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div key={idx} className="message">
            <div className="avatar">{msg.name.split(" ")[1] || "C"}</div>
            <div className="text-block">
              <span className="sender">{msg.name}</span>
              <p className="text">{msg.text}</p>
              <span className="timestamp">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Speak into the river..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Forum;
