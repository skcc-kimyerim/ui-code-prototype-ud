"use client";

import { Button } from "@/components/ui/button";

interface HeaderProps {
  showBackButton?: boolean;
  backButtonText?: string;
  onBackClick?: () => void;
  title?: string;
  showUserInfo?: boolean;
  userName?: string;
  userInitial?: string;
  notificationCount?: number;
}

export default function Header({
  showBackButton = false,
  backButtonText = "뒤로",
  onBackClick,
  title,
  showUserInfo = true,
  userName = "박윤원",
  userInitial = "박",
  notificationCount = 2,
}: HeaderProps) {
  return (
    <header className="border-b bg-card shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* 햄버거 메뉴 */}
            <Button variant="ghost" size="sm">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </Button>

            {/* Davis 로고 */}
            <h1 className="text-xl font-bold text-primary">Davis</h1>

            {/* 뒤로 가기 버튼 (옵션) */}
            {showBackButton && (
              <div className="flex items-center gap-2">
                <div className="w-px h-6 bg-border"></div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBackClick}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {backButtonText}
                </Button>
              </div>
            )}

            {/* 페이지 타이틀 (옵션) */}
            {title && (
              <div className="flex items-center gap-2">
                <div className="w-px h-6 bg-border"></div>
                <h2 className="text-lg font-semibold text-foreground">
                  {title}
                </h2>
              </div>
            )}
          </div>

          {/* 사용자 정보 */}
          {showUserInfo && (
            <div className="flex items-center gap-3">
              <div className="w-px h-6 bg-border"></div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-sm text-muted-foreground font-medium">
                    {userInitial}
                  </span>
                </div>
                <span className="text-sm text-foreground">{userName}</span>
                {notificationCount > 0 && (
                  <div className="w-6 h-6 bg-destructive rounded-full flex items-center justify-center">
                    <span className="text-xs text-destructive-foreground font-bold">
                      {notificationCount}
                    </span>
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 hover:bg-accent"
                >
                  <div className="w-5 h-5 border border-border rounded-full flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">?</span>
                  </div>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
