import { Bot, MessageCircle, Send, Sparkles, User, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

function newSessionId() {
  return Math.random().toString(36).slice(2, 10);
}

function escapeHtml(input) {
  return String(input ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatBotTextToSafeHtml(text) {
  const escaped = escapeHtml(text);
  return escaped
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>");
}

const DEFAULT_WEBHOOK_URL =
  "https://automation.lucrative.ai/webhook/399b2f42-b34d-4fa8-9019-ee131aa8b7bf/chat";

const suggestions = [
  "What are your skills?",
  "Tell me about your projects",
  "How can I contact you?",
];

export const ChatWidget = ({
  title = "Noor AI Assistant",
  webhookUrl = import.meta.env.VITE_N8N_CHAT_WEBHOOK_URL || DEFAULT_WEBHOOK_URL,
}) => {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(newSessionId());
  const endRef = useRef(null);
  const inputRef = useRef(null);

  const canSend = message.trim().length > 0 && !loading;
  const headerStatus = useMemo(
    () => (loading ? "Thinking..." : "Online"),
    [loading]
  );

  useEffect(() => {
    if (!open) return;
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading, open]);

  // Auto-focus input when opening
  useEffect(() => {
    if (open && !closing) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [open, closing]);

  const handleOpen = () => {
    setOpen(true);
    setClosing(false);
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 250);
  };

  const startNewChat = () => {
    setChat([]);
    setMessage("");
    setSessionId(newSessionId());
  };

  const sendMessage = async (text) => {
    const content = (text || message).trim();
    if (!content || loading) return;

    setChat((prev) => [...prev, { sender: "user", text: content }]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatInput: content,
          action: "sendMessage",
          sessionId,
        }),
      });
      const data = await res.json();
      setChat((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            typeof data?.output === "string"
              ? data.output
              : String(data?.output ?? ""),
        },
      ]);
    } catch {
      setChat((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I couldn't connect. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60]">
      {/* ── Floating trigger ── */}
      <button
        onClick={handleOpen}
        className={cn(
          "group relative transition-all duration-300",
          open
            ? "scale-0 opacity-0 pointer-events-none"
            : "scale-100 opacity-100"
        )}
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent2)))",
          color: "#fff",
          borderRadius: "24px",
          padding: "14px 22px",
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          fontWeight: 600,
          fontSize: "14px",
          border: "none",
          cursor: "pointer",
          boxShadow:
            "0 8px 32px hsl(var(--primary) / 0.35), 0 2px 8px hsl(var(--primary) / 0.2)",
        }}
        aria-label="Open AI chat assistant"
      >
        {/* Pulse ring */}
        <span
          className="absolute inset-0 rounded-[24px] animate-ping opacity-20"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent2)))",
            animationDuration: "2.5s",
          }}
        />
        <MessageCircle className="h-5 w-5 relative" />
        <span className="relative">Ask Noor</span>
      </button>

      {/* ── Chat panel ── */}
      {open && (
        <div
          className={cn(
            "flex flex-col overflow-hidden",
            closing ? "chat-panel-exit" : "chat-panel-enter"
          )}
          style={{
            width: "min(92vw, 420px)",
            height: "min(75vh, 640px)",
            borderRadius: "20px",
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            boxShadow:
              "0 25px 80px -12px hsl(var(--shadow-color) / 0.35), 0 12px 36px -8px hsl(var(--shadow-color) / 0.25)",
          }}
        >
          {/* ── Header ── */}
          <div
            className="shrink-0 px-5 py-4 flex items-center justify-between"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent2)))",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="leading-tight text-left">
                <div className="font-bold text-sm text-white">{title}</div>
                <div className="text-xs text-white/70 flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full inline-block"
                    style={{
                      background: loading ? "#fbbf24" : "#4ade80",
                      boxShadow: loading
                        ? "0 0 6px #fbbf24"
                        : "0 0 6px #4ade80",
                    }}
                  />
                  {headerStatus}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={startNewChat}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white/90 bg-white/15 hover:bg-white/25 backdrop-blur-sm transition-colors"
                aria-label="Start a new chat"
              >
                New chat
              </button>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-lg bg-white/15 hover:bg-white/25 backdrop-blur-sm transition-colors flex items-center justify-center"
                aria-label="Close chat"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>

          {/* ── Messages ── */}
          <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-5 flex flex-col gap-4">
            {/* Empty state */}
            {chat.length === 0 && !loading && (
              <div className="flex-1 flex flex-col items-center justify-center gap-5 py-6">
                {/* Avatar */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--primary) / 0.12), hsl(var(--accent2) / 0.12))",
                  }}
                >
                  <Sparkles
                    className="h-7 w-7"
                    style={{ color: "hsl(var(--primary))" }}
                  />
                </div>

                <div className="text-center space-y-1.5">
                  <p className="font-semibold text-sm">
                    Hi! I'm Noor's AI assistant
                  </p>
                  <p
                    className="text-xs leading-relaxed max-w-[240px]"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    Ask me anything about Noor's skills, projects, or experience.
                  </p>
                </div>

                {/* Suggestion chips */}
                <div className="flex flex-col gap-2 w-full max-w-[280px]">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="text-left px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-200"
                      style={{
                        background: "hsl(var(--surface))",
                        border: "1px solid hsl(var(--border))",
                        color: "hsl(var(--foreground))",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "hsl(var(--primary) / 0.4)";
                        e.currentTarget.style.background =
                          "hsl(var(--primary) / 0.06)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "hsl(var(--border))";
                        e.currentTarget.style.background =
                          "hsl(var(--surface))";
                      }}
                    >
                      <span
                        className="mr-2"
                        style={{ color: "hsl(var(--primary))" }}
                      >
                        →
                      </span>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message bubbles */}
            {chat.map((msg, idx) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={idx}
                  className={cn(
                    "flex items-end gap-2.5 chat-msg-enter",
                    isUser ? "justify-end" : "justify-start"
                  )}
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  {/* Bot avatar */}
                  {!isUser && (
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--accent2) / 0.15))",
                        color: "hsl(var(--primary))",
                      }}
                    >
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  {/* Bubble */}
                  <div
                    className="max-w-[80%] px-4 py-3 text-[13px] leading-relaxed text-left"
                    style={
                      isUser
                        ? {
                            background:
                              "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent2)))",
                            color: "#fff",
                            borderRadius: "18px 18px 4px 18px",
                            boxShadow:
                              "0 2px 12px hsl(var(--primary) / 0.2)",
                          }
                        : {
                            background: "hsl(var(--surface))",
                            color: "hsl(var(--foreground))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "18px 18px 18px 4px",
                          }
                    }
                    {...(!isUser
                      ? {
                          dangerouslySetInnerHTML: {
                            __html: formatBotTextToSafeHtml(msg.text),
                          },
                        }
                      : { children: msg.text })}
                  />

                  {/* User avatar */}
                  {isUser && (
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent2)))",
                      }}
                    >
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing indicator */}
            {loading && (
              <div className="flex items-end gap-2.5 chat-msg-enter">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--accent2) / 0.15))",
                  }}
                >
                  <Bot
                    className="w-4 h-4"
                    style={{ color: "hsl(var(--primary))" }}
                  />
                </div>
                <div
                  className="px-5 py-4"
                  style={{
                    background: "hsl(var(--surface))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "18px 18px 18px 4px",
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: "hsl(var(--primary))",
                          animation: "typing-dot 1.4s infinite ease-in-out",
                          animationDelay: `${i * 160}ms`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* ── Input ── */}
          <div
            className="shrink-0 px-4 py-3"
            style={{
              borderTop: "1px solid hsl(var(--border))",
              background: "hsl(var(--card))",
            }}
          >
            <div
              className="flex items-center gap-2 rounded-2xl px-4 py-1.5 transition-all duration-200"
              style={{
                background: "hsl(var(--surface))",
                border: "1.5px solid hsl(var(--border))",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "hsl(var(--primary) / 0.5)";
                e.currentTarget.style.boxShadow =
                  "0 0 0 3px hsl(var(--primary) / 0.08)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "hsl(var(--border))";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <input
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && canSend && sendMessage()
                }
                placeholder="Type a message..."
                className="flex-1 bg-transparent outline-none text-sm py-2.5"
                style={{ color: "hsl(var(--foreground))" }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!canSend}
                className="w-9 h-9 rounded-xl transition-all duration-200 inline-flex items-center justify-center shrink-0"
                style={
                  canSend
                    ? {
                        background:
                          "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent2)))",
                        color: "#fff",
                        boxShadow: "0 2px 8px hsl(var(--primary) / 0.3)",
                        transform: "scale(1)",
                      }
                    : {
                        background: "hsl(var(--muted))",
                        color: "hsl(var(--muted-foreground))",
                        cursor: "not-allowed",
                        transform: "scale(0.95)",
                      }
                }
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p
              className="text-center mt-2 text-[10px]"
              style={{ color: "hsl(var(--muted-foreground) / 0.6)" }}
            >
              Powered by AI · Responses may be inaccurate
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
