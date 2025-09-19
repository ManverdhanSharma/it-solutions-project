import React, { useState, useEffect, useRef } from "react";

export default function ChatbotFloat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! I'm Chiki, your Phenoxis AI assistant 🤖 How can I help you with your digital transformation needs today?", timestamp: new Date() }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced send function with better error handling and UX
  const send = async (e) => {
    e.preventDefault();
    const question = input.trim();
    if (!question || loading) return;

    const userMessage = { role: "user", text: question, timestamp: new Date() };
    setMessages((m) => [...m, userMessage]);
    setInput("");
    setLoading(true);
    setTyping(true);

    // Show typing indicator
    const typingMessage = { role: "bot", text: "typing", timestamp: new Date(), isTyping: true };
    setMessages((m) => [...m, typingMessage]);

    try {
      const history = messages.map((m) =>
        m.role === "bot" && !m.isTyping
          ? { role: "assistant", content: m.text }
          : m.role === "user"
          ? { role: "user", content: m.text }
          : null
      ).filter(Boolean);
      
      history.push({ role: "user", content: question });

      const resp = await fetch("http://localhost:8081/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history })
      });

      // Remove typing indicator
      setMessages((m) => m.filter(msg => !msg.isTyping));
      setTyping(false);

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        const msg = err?.error || `Server error ${resp.status}`;
        setMessages((m) => [...m, { 
          role: "bot", 
          text: `Sorry, I encountered an error: ${msg}`, 
          timestamp: new Date(),
          isError: true 
        }]);
        return;
      }

      const data = await resp.json();
      const reply = data?.message?.content?.trim();
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          text: reply && reply.length ? reply : "Sorry, I couldn't generate a reply.",
          timestamp: new Date()
        }
      ]);
    } catch (err) {
      // Remove typing indicator on error
      setMessages((m) => m.filter(msg => !msg.isTyping));
      setTyping(false);
      
      setMessages((m) => [
        ...m,
        { 
          role: "bot", 
          text: "Network issue contacting AI. Please check your connection and try again.", 
          timestamp: new Date(),
          isError: true 
        }
      ]);
    } finally {
      setLoading(false);
      setTyping(false);
    }
  };

  // Handle keyboard shortcuts
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(e);
    }
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl flex flex-col z-50 animate-in slide-in-from-bottom-2">
          {/* Header with Chiki branding */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">C</span>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Chiki</h3>
                <p className="text-xs opacity-90">Phenoxis AI Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors duration-200"
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="max-w-xs">
                  <div
                    className={`px-3 py-2 rounded-lg text-sm ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white ml-auto"
                        : msg.isError
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border border-red-200 dark:border-red-800"
                        : msg.isTyping
                        ? "bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 animate-pulse"
                        : "bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    {msg.isTyping ? (
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    ) : (
                      <>
                        {msg.text}
                        {!msg.isTyping && (
                          <div className={`text-xs mt-1 opacity-70 ${
                            msg.role === "user" ? "text-white/70" : "text-gray-500 dark:text-gray-400"
                          }`}>
                            {formatTime(msg.timestamp)}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={send} className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-lg">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={loading ? "Chiki is typing..." : "Ask Chiki anything..."}
                className="flex-1 px-3 py-2 text-sm bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
                disabled={loading}
                maxLength={500}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm font-medium"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
            {input.length > 400 && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {500 - input.length} characters remaining
              </div>
            )}
          </form>
        </div>
      )}

      {/* Float Button with Chiki branding */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 group relative"
          aria-label={open ? "Close chat" : "Chat with Chiki"}
        >
          <div className="flex items-center justify-center">
            {open ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <span className="font-bold text-lg">C</span>
            )}
          </div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Chat with Chiki
          </div>
          
          {/* Pulse animation when closed */}
          {!open && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 animate-ping opacity-20"></div>
          )}
        </button>
      </div>
    </>
  );
}
