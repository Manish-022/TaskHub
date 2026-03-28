import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import React from "react";

function AIChat({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your AI Task Assistant. I can help you create, organize, and manage your tasks. Try saying things like: 'Add a task to buy groceries by tomorrow' or 'Show my high priority tasks'",
      sender: "ai",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
    };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Call your backend AI endpoint
      const response = await fetch(
        "http://localhost:5001/api/ai/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ message: input }),
        }
      );

      const data = await response.json();

      // Add AI response
      const aiMessage = {
        id: messages.length + 2,
        text: data.response || "I couldn't process that request.",
        sender: "ai",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        id: messages.length + 2,
        text: "Sorry, I encountered an error. Please try again.",
        sender: "ai",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 h-96 bg-white rounded-lg shadow-2xl flex flex-col border border-indigo-300 z-50">
      {/* Header */}
      <div className="bg-indigo-600 text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
        <h3 className="font-semibold">AI Task Assistant</h3>
        <button
          onClick={onClose}
          className="hover:bg-indigo-700 p-1 rounded transition"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg">
              <p className="text-sm">Thinking...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSendMessage}
        className="border-t p-3 flex gap-2 bg-gray-50 rounded-b-lg"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}

export default AIChat;