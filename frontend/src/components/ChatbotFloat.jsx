import React, { useState } from "react";

export default function ChatbotFloat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! Ask about services, pricing, or timelines." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async (e) => {
    e.preventDefault();
    const question = input.trim();
    if (!question || loading) return;

    // append user message
    setMessages((m) => [...m, { role: "user", text: question }]);
    setInput("");

    // show loading placeholder
    setLoading(true);
    setMessages((m) => [...m, { role: "bot", text: "Thinking…" }]);

    try {
      // Build history for the server
      const history = messages.map((m) =>
        m.role === "bot"
          ? { role: "assistant", content: m.text }
          : { role: "user", content: m.text }
      );
      history.push({ role: "user", content: question });

      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history })
      });

      // remove the last "Thinking…" placeholder before adding real reply
      setMessages((m) => {
        const copy = [...m];
        // find last bot placeholder from end
        for (let i = copy.length - 1; i >= 0; i--) {
          if (copy[i].role === "bot" && copy[i].text === "Thinking…") {
            copy.splice(i, 1);
            break;
          }
        }
        return copy;
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        const msg = err?.error || `Server error ${resp.status}`;
        setMessages((m) => [...m, { role: "bot", text: msg }]);
        return;
      }

      const data = await resp.json();
      const reply = data?.message?.content?.trim();
      setMessages((m) => [
        ...m,
        { role: "bot", text: reply && reply.length ? reply : "Sorry, I couldn’t generate a reply." }
      ]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: "bot", text: "Network issue contacting AI. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 rounded-full bg-primary px-4 py-3 text-white shadow-lg hover:scale-105"
        aria-label="Open chatbot"
      >
        Chat
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/20 p-4 sm:items-center sm:justify-center">
          <div className="flex h-[420px] w-full max-w-md flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b px-4 py-2">
              <h4 className="text-sm font-semibold">AI Assistant</h4>
              <button
                className="text-sm text-gray-500 hover:text-gray-900"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>

            <div className="flex-1 space-y-2 overflow-auto px-4 py-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[80%] rounded-md px-3 py-2 text-sm ${
                    m.role === "bot" ? "bg-gray-100" : "ml-auto bg-primary text-white"
                  }`}
                >
                  {m.text}
                </div>
              ))}

              {loading && (
                <div className="max-w-[80%] rounded-md bg-gray-100 px-3 py-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    <span>Generating reply…</span>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={send} className="flex gap-2 border-t p-2">
              <input
                className="w-full rounded-md border px-3 py-2 text-sm focus:border-primary focus:outline-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                disabled={loading}
              />
              <button
                className={`rounded-md px-3 text-sm font-medium text-white ${
                  loading ? "bg-gray-400" : "bg-primary"
                }`}
                disabled={loading || !input.trim()}
              >
                {loading ? "Sending…" : "Send"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
