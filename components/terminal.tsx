"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Terminal as TerminalIcon,
  AlertTriangle,
  ChevronUp,
  MessageSquare,
} from "lucide-react";

interface TerminalLog {
  timestamp: string;
  level: "error" | "warning" | "info";
  message: string;
}

interface TerminalProps {
  isTerminalOpen: boolean;
  errorLogs: TerminalLog[];
  onToggleTerminal: () => void;
  onClearLogs: () => void;
  onSendToAIChat: (message: string) => void;
}

export default function Terminal({
  isTerminalOpen,
  errorLogs,
  onToggleTerminal,
  onClearLogs,
  onSendToAIChat,
}: TerminalProps) {
  const hasErrors = errorLogs.some((log) => log.level === "error");
  const errorCount = errorLogs.filter((log) => log.level === "error").length;

  return (
    <div className="w-full">
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors bg-white border-b border-gray-200"
        style={{
          borderRadius: "0 10px",
        }}
        onClick={onToggleTerminal}
      >
        <div className="flex items-center space-x-3">
          <TerminalIcon className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-900">터미널</span>
          {errorLogs.length > 0 && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {errorLogs.length}
            </span>
          )}
          {hasErrors && (
            <Badge variant="destructive" className="text-xs h-5">
              <AlertTriangle className="h-3 w-3 mr-1" />
              오류 {errorCount}개
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onClearLogs();
            }}
            className="text-xs h-7 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            지우기
          </Button>
          <div
            className={`transform transition-transform text-gray-600 ${
              isTerminalOpen ? "rotate-180" : ""
            }`}
          >
            <ChevronUp className="h-4 w-4" />
          </div>
        </div>
      </div>

      {isTerminalOpen && (
        <div className="bg-gray-50 h-full">
          <ScrollArea style={{ height: "calc(100% - 60px)" }}>
            <div className="p-4 space-y-2">
              {errorLogs.length === 0 ? (
                <div className="text-center py-12">
                  <TerminalIcon className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                  <p className="text-sm text-gray-600 font-medium">
                    터미널 로그가 없습니다
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    코드 생성 및 수정 시 로그가 여기에 표시됩니다
                  </p>
                </div>
              ) : (
                errorLogs.map((log, index) => (
                  <div
                    key={index}
                    className="text-xs font-mono flex items-start space-x-3 py-2 px-3 bg-white rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-500 shrink-0 w-20 font-medium">
                      {log.timestamp}
                    </span>
                    <span
                      className={`shrink-0 font-semibold w-12 ${
                        log.level === "error"
                          ? "text-red-600"
                          : log.level === "warning"
                          ? "text-orange-600"
                          : "text-blue-600"
                      }`}
                    >
                      {log.level === "error"
                        ? "ERROR"
                        : log.level === "warning"
                        ? "WARN"
                        : "INFO"}
                    </span>
                    <span className="text-gray-800 flex-1 leading-relaxed">
                      {log.message}
                    </span>
                    {log.level === "error" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          const aiMessage = `다음 오류를 해결하는 방법을 알려주세요:\n\n${log.message}`;
                          onSendToAIChat(aiMessage);
                        }}
                        className="shrink-0 h-6 w-6 p-0 text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                        title="AI 채팅으로 오류 해결 방법 문의"
                      >
                        <MessageSquare className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
