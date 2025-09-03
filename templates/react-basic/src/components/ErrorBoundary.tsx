import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // 로그 시스템에 에러 기록
    if (typeof window !== "undefined") {
      const event = new CustomEvent("app-error", {
        detail: { error, errorInfo, timestamp: new Date().toISOString() },
      });
      window.dispatchEvent(event);
    }

    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="max-w-md mx-auto p-6">
              <div className="border border-destructive/50 rounded-lg bg-destructive/10 p-6">
                <h2 className="text-lg font-semibold text-destructive mb-2">
                  문제가 발생했습니다
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  예상치 못한 오류가 발생했습니다. 페이지를 새로고침해 주세요.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  페이지 새로고침
                </button>
              </div>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

// HOC 버전도 제공
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorFallback?: ReactNode
) {
  return function WithErrorBoundaryComponent(props: P) {
    return (
      <ErrorBoundary fallback={errorFallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

export default ErrorBoundary;
