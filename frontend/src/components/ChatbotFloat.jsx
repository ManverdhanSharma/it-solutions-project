import React, { useState, useEffect, useRef } from "react";

export default function ChatbotFloat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! Ask about services, pricing, or timelines.", timestamp: new Date() }
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

      const resp = await fetch("/api/chat", {
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
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-card border border-app rounded-lg shadow-2xl flex flex-col z-50 animate-in slide-in-from-bottom-2">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-app bg-surface rounded-t-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <h3 className="font-semibold text-app">Phenoxis Support</h3>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-muted hover:text-app transition-colors p-1 hover:bg-app/10 rounded"
              aria-label="Close chat"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-card">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="max-w-xs">
                  <div
                    className={`px-3 py-2 rounded-lg text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-white ml-auto"
                        : msg.isError
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border border-red-200 dark:border-red-800"
                        : msg.isTyping
                        ? "bg-surface text-app border border-app animate-pulse"
                        : "bg-surface text-app border border-app"
                    }`}
                  >
                    {msg.isTyping ? (
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    ) : (
                      <>
                        {msg.text}
                        {!msg.isTyping && (
                          <div className={`text-xs mt-1 opacity-70 ${
                            msg.role === "user" ? "text-white/70" : "text-muted"
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
          <form onSubmit={send} className="p-4 border-t border-app bg-surface rounded-b-lg">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={loading ? "Sending..." : "Ask anything..."}
                className="flex-1 px-3 py-2 text-sm bg-card text-app border border-app rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-muted"
                disabled={loading}
                maxLength={500}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-soft disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm font-medium"
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
              <div className="text-xs text-muted mt-1">
                {500 - input.length} characters remaining
              </div>
            )}
          </form>
        </div>
      )}

      {/* Float Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-4 right-4 w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-40 group ${
          open ? 'rotate-180' : 'hover:scale-110'
        }`}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {/* Notification dot for new messages */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
          </div>
        )}
      </button>
    </>
  );
}
