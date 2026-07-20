"use client";

import { useState, useEffect, useRef } from "react";
import { useChat } from "ai/react";
import { Bot, X, MessageSquare, Send, Loader2, User } from "lucide-react";
import Markdown from "markdown-to-jsx";
import clsx from "clsx";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage only on mount
  const [initialMessages, setInitialMessages] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("csd201_chat_history");
    if (saved) {
      try {
        setInitialMessages(JSON.parse(saved));
      } catch (e) { }
    }
    setIsLoaded(true);
  }, []);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "http://localhost:3001/chat",
    initialMessages: initialMessages,
  });

  // Save to localStorage whenever messages change
  useEffect(() => {
    if (isLoaded && messages.length > 0) {
      localStorage.setItem("csd201_chat_history", JSON.stringify(messages));
    }
  }, [messages, isLoaded]);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={clsx(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-110 focus:outline-none focus:ring-4 focus:ring-indigo-500/20",
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        )}
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      <div
        className={clsx(
          "fixed bottom-6 right-6 z-50 flex w-[380px] sm:w-[450px] max-w-[calc(100vw-48px)] flex-col overflow-hidden rounded-2xl border border-neutral-200/50 bg-white/90 shadow-2xl backdrop-blur-xl transition-all duration-300 dark:border-neutral-800/50 dark:bg-neutral-900/90",
          isOpen ? "translate-y-0 opacity-100 h-[600px] max-h-[calc(100vh-100px)]" : "translate-y-10 opacity-0 pointer-events-none h-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">Trợ lý CSD201</h3>
              <p className="text-[10px] text-emerald-500 font-medium">● Local AI Online</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full p-1.5 text-neutral-500 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800 dark:text-neutral-400"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center space-y-3 text-center opacity-70">
              <Bot className="h-10 w-10 text-indigo-400" />
              <p className="text-sm text-neutral-500 dark:text-neutral-400 px-4">
                Chào bạn! Mình là AI trợ lý môn CSD201. Mình có thể giúp bạn giải đáp các thuật toán, phân tích độ phức tạp, hoặc giải thích code.
              </p>
            </div>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className={clsx(
                  "flex gap-3",
                  m.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                {/* Avatar */}
                <div
                  className={clsx(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                    m.role === "user"
                      ? "bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
                      : "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400"
                  )}
                >
                  {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>

                {/* Bubble */}
                <div
                  className={clsx(
                    "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                    m.role === "user"
                      ? "bg-indigo-600 text-white rounded-tr-sm"
                      : "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100 rounded-tl-sm prose-custom-ai"
                  )}
                >
                  {m.role === "user" ? (
                    m.content
                  ) : (
                    <Markdown
                      options={{
                        overrides: {
                          pre: { props: { className: "bg-neutral-900 text-neutral-100 p-2 rounded-lg my-2 overflow-x-auto text-xs font-mono" } },
                          code: { props: { className: "bg-neutral-200 dark:bg-neutral-700 px-1 rounded text-rose-500 dark:text-rose-400 font-mono text-[0.9em]" } },
                        },
                      }}
                    >
                      {m.content}
                    </Markdown>
                  )}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex gap-3 flex-row">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
                <Bot className="h-4 w-4" />
              </div>
              <div className="max-w-[80%] rounded-2xl px-4 py-3 text-sm bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100 rounded-tl-sm flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-indigo-500" />
                <span className="text-neutral-500 animate-pulse">Đang suy nghĩ...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="border-t border-neutral-200 p-3 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 rounded-full border border-neutral-300 bg-neutral-50 px-2 py-2 dark:border-neutral-700 dark:bg-neutral-800"
          >
            <input
              className="flex-1 bg-transparent px-3 text-sm focus:outline-none text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500"
              placeholder="Hỏi AI về bài học..."
              value={input}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
