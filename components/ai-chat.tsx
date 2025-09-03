"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, RefreshCw } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIChatProps {
  messages: Message[];
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function AIChat({
  messages,
  input,
  isLoading,
  onInputChange,
  onSubmit,
}: AIChatProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 새 메시지가 추가될 때마다 스크롤을 맨 아래로
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className="w-80 border border-gray-200 bg-white flex flex-col rounded-lg shadow-sm"
      style={{
        height: "calc(100vh - 4rem - 2rem)",
      }}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-semibold text-gray-900">AI 어시스턴트</h3>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          코드 수정 및 개선 요청을 해보세요
        </p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <p className="text-sm mb-2 text-gray-700 font-medium">
                AI와 대화를 시작해보세요
              </p>
              <div className="text-xs text-gray-500 space-y-1">
                <p>• "버튼을 더 크게 만들어줘"</p>
                <p>• "색상을 파란색으로 변경해줘"</p>
                <p>• "로그인 폼 컴포넌트 만들어줘"</p>
                <p>• "반응형 디자인을 적용해줘"</p>
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-primary text-white rounded-br-sm"
                    : "bg-gray-50 text-gray-900 border border-gray-200 rounded-bl-sm"
                }`}
              >
                {message.role === "assistant" && (
                  <p className="text-xs text-gray-500 mb-1">AI</p>
                )}
                <p className="text-sm whitespace-pre-wrap leading-relaxed">
                  {message.content}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-50 text-gray-900 p-3 rounded-lg border border-gray-200 rounded-bl-sm">
                <p className="text-xs text-gray-500 mb-1">AI</p>
                <div className="flex items-center space-x-2">
                  <RefreshCw className="h-4 w-4 animate-spin text-primary" />
                  <p className="text-sm">생각하는 중...</p>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={onSubmit} className="flex space-x-2">
          <Input
            placeholder="메시지를 입력하세요..."
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            className="flex-1 border-gray-200 focus:border-primary focus:ring-primary"
            disabled={isLoading}
          />
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-white px-3"
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
