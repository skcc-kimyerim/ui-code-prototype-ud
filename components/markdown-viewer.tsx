"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FileText, Download, Copy, Edit, Eye } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";

interface MarkdownViewerProps {
  initialContent?: string;
}

export default function MarkdownViewer({
  initialContent = `# 프로젝트 문서

## 개요
이 프로젝트는 AI를 활용한 UI 코드 생성 도구입니다.

## 주요 기능
- React/Vue 프레임워크 지원
- 실시간 프리뷰
- 코드 검사 기능

## 사용 방법
1. 프레임워크 선택
2. 스타일링 옵션 설정
3. AI와 대화하며 요구사항 정의
4. 코드 생성 및 수정

## 기술 스택
- **Frontend**: React, Next.js
- **Styling**: Tailwind CSS
- **Language**: TypeScript

\`\`\`javascript
// 예시 코드
const MyComponent = () => {
  return (
    <div className="p-4">
      <h1>Hello World</h1>
    </div>
  );
};
\`\`\`

## 추가 정보
더 자세한 내용은 [공식 문서](https://docs.example.com)를 참조하세요.`,
}: MarkdownViewerProps) {
  const [content, setContent] = useState(initialContent);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  const handleCopy = () => {
    navigator.clipboard.writeText(content || "");
  };

  const handleDownload = () => {
    const blob = new Blob([content || ""], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "project-documentation.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-gray-900">
              프로젝트 문서
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={handleCopy}
              variant="outline"
              size="sm"
              className="text-gray-600 border-gray-300 hover:bg-gray-50"
            >
              <Copy className="h-4 w-4 mr-1" />
              복사
            </Button>
            <Button
              onClick={handleDownload}
              variant="outline"
              size="sm"
              className="text-gray-600 border-gray-300 hover:bg-gray-50"
            >
              <Download className="h-4 w-4 mr-1" />
              다운로드
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "edit" | "preview")}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit" className="flex items-center space-x-2">
              <Edit className="h-4 w-4" />
              <span>편집</span>
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="flex items-center space-x-2"
            >
              <Eye className="h-4 w-4" />
              <span>미리보기</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab}>
          <TabsContent value="edit" className="h-full m-0">
            <div className="h-full overflow-auto" data-color-mode="light">
              <MDEditor
                value={content}
                onChange={(val) => setContent(val || "")}
                height="100%"
                visibleDragbar={false}
                data-color-mode="light"
                preview="edit"
                hideToolbar
              />
            </div>
          </TabsContent>

          <TabsContent value="preview" className="h-full m-0">
            <div className="overflow-auto" data-color-mode="light">
              <MDEditor.Markdown
                source={content}
                style={{
                  whiteSpace: "pre-wrap",
                  padding: "20px",
                }}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
