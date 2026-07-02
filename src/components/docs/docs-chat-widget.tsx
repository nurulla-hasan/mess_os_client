"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Send, Trash2, Loader2, Bot, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { chatWithAI } from "@/services/docs-chat.service";
import type { DocPageContext } from "@/app/docs/docs-context";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface DocsChatWidgetProps {
  context?: DocPageContext;
}

const WELCOME_MESSAGE =
  "👋 হ্যালো! আমি Mess OS-এর AI Assistant। আপনার Mess OS কিভাবে চালাতে হয়, কোনো feature সম্পর্কে জানতে চান বা কোনো সাহায্য লাগলে আমাকে প্রশ্ন করতে পারেন। আমি বাংলা ও ইংরেজি দুই ভাষায় উত্তর দিতে পারি!";

export function DocsChatWidget({ context }: DocsChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = async () => {
    const question = input.trim();
    if (!question || isLoading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setIsLoading(true);

    try {
      const contextStr = context
        ? `You are on the "${context.title}" page. This page covers: ${context.description}\n\nKey topics: ${context.keyTopics.join(", ")}`
        : undefined;

      const result = await chatWithAI(question, contextStr);

      if (result.success && result.data?.answer) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: result.data.answer },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `দুঃখিত, আমি উত্তর দিতে পারিনি। ${
              result.message || "প্লিজ আবার চেষ্টা করুন।"
            }`,
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "দুঃখিত, একটি ত্রুটি হয়েছে। দয়া করে আবার চেষ্টা করুন।",
        },
      ]);
    } finally {
      setIsLoading(false);
      // Refocus textarea after loading completes
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const handleClear = () => {
    setMessages([{ role: "assistant", content: WELCOME_MESSAGE }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className={cn(
            "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl z-40 cursor-pointer",
            "bg-linear-to-br from-primary via-primary to-primary/80",
            "hover:scale-105 active:scale-95 transition-all duration-200",
            "border border-primary/20"
          )}
          aria-label="Open AI Assistant"
        >
          <Bot className="h-6 w-6 text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg p-0 flex flex-col gap-0 bg-background/95 backdrop-blur-xl border-l"
      >
        {/* Header */}
        <SheetHeader className="px-5 py-4 border-b shrink-0 flex flex-row items-center justify-between space-y-0 bg-linear-to-r from-primary/5 via-primary/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex items-center justify-center size-10 rounded-xl bg-linear-to-br from-primary to-primary/60 text-white shadow-md">
                <Bot className="size-5" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-emerald-500 border-2 border-background" />
            </div>
            <div>
              <SheetTitle className="text-base font-bold flex items-center gap-2">
                AI Assistant
                <span className="text-[10px] font-normal text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full border">
                  Mess OS
                </span>
              </SheetTitle>
              <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-500 inline-block" />
                Online &nbsp;·&nbsp; Ask me anything
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {messages.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClear}
                className="size-8 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors"
                title="Clear chat"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="size-8 rounded-lg hover:bg-muted transition-colors"
              title="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4 scrollbar-thin">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex items-end gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-300",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {msg.role === "assistant" && (
                <div className="flex items-center justify-center size-7 rounded-full bg-linear-to-br from-primary/20 to-primary/5 border border-primary/10 shrink-0 mb-0.5">
                  <Bot className="size-3.5 text-primary" />
                </div>
              )}

              <div
                className={cn(
                  "max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm",
                  msg.role === "user"
                    ? [
                        "bg-linear-to-br from-primary to-primary/90",
                        "text-primary-foreground",
                        "rounded-br-md",
                        "shadow-primary/20",
                      ]
                    : [
                        "bg-card border border-border/50",
                        "text-foreground",
                        "rounded-bl-md",
                        "shadow-xs",
                      ]
                )}
              >
                {msg.role === "assistant" ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-code:px-1 prose-code:py-0.5 prose-code:rounded-md prose-code:bg-muted prose-code:text-xs prose-pre:bg-muted prose-pre:border prose-pre:border-border/50">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap text-[15px] leading-relaxed font-medium">
                    {msg.content}
                  </p>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-end gap-2.5 justify-start animate-in fade-in duration-200">
              <div className="flex items-center justify-center size-7 rounded-full bg-linear-to-br from-primary/20 to-primary/5 border border-primary/10 shrink-0 mb-0.5">
                <Bot className="size-3.5 text-primary" />
              </div>
              <div className="bg-card border border-border/50 rounded-2xl rounded-bl-md px-4 py-3.5 shadow-xs">
                <div className="flex gap-1.5">
                  <span className="size-2 rounded-full bg-primary/60 animate-bounce [animation-delay:0ms]" />
                  <span className="size-2 rounded-full bg-primary/60 animate-bounce [animation-delay:150ms]" />
                  <span className="size-2 rounded-full bg-primary/60 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t bg-muted/30 px-4 py-3 shrink-0">
          <div className="flex items-end gap-2 bg-background rounded-2xl border border-border/60 shadow-xs px-3 py-1.5 focus-within:border-primary/40 focus-within:ring-1 focus-within:ring-primary/20 transition-all duration-200">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about Mess OS..."
              rows={1}
              className="flex-1 min-h-10 max-h-30 resize-none bg-transparent px-1 py-2 text-sm outline-none placeholder:text-muted-foreground/60"
              disabled={isLoading}
            />
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={cn(
                "h-9 w-9 shrink-0 rounded-xl transition-all duration-200",
                input.trim()
                  ? "bg-linear-to-br from-primary to-primary/80 shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
                  : "bg-muted"
              )}
              aria-label="Send message"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground/50 text-center mt-1.5">
            Responses are AI-generated &middot; May contain mistakes
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
