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
    <header className="border-b border-gray-200 bg-white shadow-sm sticky top-0 z-50">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-6">
          {/* 햄버거 메뉴 */}
          <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100">
            <div className="w-4 h-4 flex flex-col justify-between">
              <div className="w-full h-0.5 bg-gray-600"></div>
              <div className="w-full h-0.5 bg-gray-600"></div>
              <div className="w-full h-0.5 bg-gray-600"></div>
            </div>
          </Button>

          {/* DAVIS 로고와 타이틀 */}
          <div className="flex items-center space-x-3">
            <div className="text-2xl font-bold text-blue-600">DAVIS</div>
            <span className="text-lg text-gray-700 font-medium">UI CODE</span>
          </div>

          {/* 뒤로 가기 버튼 (옵션) */}
          {showBackButton && (
            <div className="pl-4 border-l border-gray-300">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBackClick}
                className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-3 py-2"
              >
                {backButtonText}
              </Button>
            </div>
          )}

          {/* 페이지 타이틀 (옵션) */}
          {title && (
            <div className="pl-4 border-l border-gray-300">
              <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            </div>
          )}
        </div>

        {/* 사용자 정보 */}
        {showUserInfo && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-300">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm text-gray-600 font-medium">
                  {userInitial}
                </span>
              </div>
              <span className="text-sm text-gray-700">{userName}</span>
              {notificationCount > 0 && (
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">
                    {notificationCount}
                  </span>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="p-1 hover:bg-gray-100"
              >
                <div className="w-5 h-5 border border-gray-400 rounded-full flex items-center justify-center">
                  <span className="text-xs text-gray-600">?</span>
                </div>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
