import React from "react";
import { Button } from "./components/Button";
import ErrorBoundary from "./components/ErrorBoundary";
import { ToastProvider, useToast } from "./components/Toast";
import { useLogger } from "./hooks/useLogger";

function AppContent() {
  const toast = useToast();
  const logger = useLogger("App");

  const handleClick = () => {
    logger.info("Button clicked!");
    toast.success("환영합니다!", "버튼이 성공적으로 클릭되었습니다.");
  };

  const handleError = () => {
    logger.error("Intentional error for testing");
    toast.error("오류 발생", "테스트용 오류입니다.");
    throw new Error("테스트 오류");
  };

  const handleWarning = () => {
    logger.warn("Warning test");
    toast.warning("주의", "이것은 경고 메시지입니다.");
  };

  const handleInfo = () => {
    logger.info("Info test");
    toast.info("정보", "이것은 정보 메시지입니다.");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="border border-border rounded-lg shadow-sm bg-card">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-2 text-foreground">
            Welcome
          </h2>
          <p className="text-muted-foreground mb-4">
            ErrorBoundary, 토스트, 로깅 시스템이 포함된 개선된 React
            프로젝트입니다.
          </p>
          <div className="space-y-2">
            <Button
              onClick={handleClick}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              시작하기
            </Button>
            <Button
              onClick={handleWarning}
              variant="secondary"
              className="w-full"
            >
              경고 테스트
            </Button>
            <Button onClick={handleInfo} variant="outline" className="w-full">
              정보 테스트
            </Button>
            <Button
              onClick={handleError}
              variant="destructive"
              className="w-full"
            >
              에러 테스트
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GeneratedComponent() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </ErrorBoundary>
  );
}
