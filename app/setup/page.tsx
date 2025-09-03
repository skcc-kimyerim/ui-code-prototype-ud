"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import AIChat from "@/components/ai-chat";
import ProjectSetup from "@/components/project-setup";

export default function SetupPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // AI 응답 시뮬레이션
    setTimeout(() => {
      const message = input.toLowerCase();
      let response = "";

      if (
        message.includes("문서") ||
        message.includes("작성") ||
        message.includes("마크다운")
      ) {
        response =
          "프로젝트 문서 작성을 도와드리겠습니다! README, API 문서, 사용자 가이드 등 어떤 종류의 문서를 작성하고 싶으신가요?";
      } else if (message.includes("readme") || message.includes("리드미")) {
        response =
          "README 파일 작성을 도와드리겠습니다! 프로젝트 개요, 설치 방법, 사용법, 기여 가이드 등을 포함하면 좋습니다. 어떤 부분부터 시작할까요?";
      } else if (message.includes("api") || message.includes("에이피아이")) {
        response =
          "API 문서 작성이군요! 엔드포인트별로 요청/응답 예시, 파라미터 설명, 에러 코드 등을 포함하면 좋습니다. 어떤 API를 문서화하시나요?";
      } else if (message.includes("가이드") || message.includes("튜토리얼")) {
        response =
          "사용자 가이드나 튜토리얼 작성을 도와드리겠습니다! 단계별 설명과 스크린샷, 코드 예제를 포함하면 더욱 유용한 문서가 됩니다.";
      } else {
        response =
          "프로젝트 문서 작성에 대해 궁금한 점이 있으시면 언제든 물어보세요! 마크다운 문법, 문서 구조, 내용 작성 등에 대해 도움드릴 수 있습니다.";
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header
        showBackButton={true}
        backButtonText="뒤로"
        onBackClick={() => router.back()}
        title="프로젝트 문서"
      />

      {/* Two Panel Layout */}
      <div className="flex gap-4 p-4" style={{ height: "calc(100vh - 4rem)" }}>
        {/* Left Panel - AI Chat */}
        <AIChat
          messages={messages}
          input={input}
          isLoading={isLoading}
          onInputChange={setInput}
          onSubmit={handleSubmit}
        />

        {/* Right Panel - Markdown Viewer */}
        <div className="flex-1">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-full overflow-hidden">
            <ProjectSetup />
          </div>
        </div>
      </div>
    </div>
  );
}
