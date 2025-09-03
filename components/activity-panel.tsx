"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  FileText,
  GitBranch,
  Settings,
} from "lucide-react";

interface ActivityItem {
  id: string;
  type: "approval" | "completion" | "creation" | "update";
  title: string;
  description: string;
  time: string;
  user?: string;
  status?: "승인" | "미승인" | "완료" | "대기";
}

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "approval",
    title: "검토 요청",
    description:
      "박윤원 님이 TS-20250803-001-V045 에서 신규 검토 요청을 보냈습니다.",
    time: "오늘 10:43",
    user: "김철수",
    status: "승인",
  },
  {
    id: "2",
    type: "completion",
    title: "검토 요청",
    description:
      "박윤원 님이 TS-20250803-001-V045 에서 신규 검토 요청을 보냈습니다.",
    time: "오늘 10:43",
    user: "김철수",
    status: "미승인",
  },
  {
    id: "3",
    type: "creation",
    title: "산출물 생성",
    description: "박윤원 님이 TS-20250803-001-V045 검사를 생성했습니다.",
    time: "2025년 8월 3일 오전 10:43",
    user: "김철수",
    status: "미승인",
  },
  {
    id: "4",
    type: "completion",
    title: "검토 요청",
    description:
      "박윤원 님이 TS-20250803-001-V045 에서 신규 검토 요청을 보냈습니다.",
    time: "오전 10:43",
    user: "김철수",
    status: "미승인",
  },
];

export function ActivityPanel() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">활동</h2>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Activity List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {mockActivities.map((activity, index) => (
            <div
              key={activity.id}
              className="p-3 bg-gray-50 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-3">
                {/* Avatar */}
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-gray-600" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </h4>
                    {activity.status && (
                      <Badge
                        variant={
                          activity.status === "승인" ? "default" : "secondary"
                        }
                        className={`text-xs ${
                          activity.status === "승인"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {activity.status}
                      </Badge>
                    )}
                  </div>

                  <p className="text-xs text-gray-600 mb-2 leading-relaxed">
                    {activity.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {activity.time}
                    </span>
                    {activity.user && (
                      <div className="flex items-center space-x-1">
                        <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-xs text-gray-600">김</span>
                        </div>
                        <span className="text-xs text-gray-600">
                          {activity.user}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
