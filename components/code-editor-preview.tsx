"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Terminal,
  Monitor,
  Tablet,
  Smartphone,
  RefreshCw,
  AlertTriangle,
  Plus,
  ChevronRight,
  Folder,
  Search,
  Github,
  Save,
  Download,
  GitCommit,
  GithubIcon,
} from "lucide-react";
import Editor from "@/components/editor";
import TerminalComponent from "@/components/terminal";

interface ProjectFile {
  [key: string]: string;
}

interface TerminalLog {
  timestamp: string;
  level: "error" | "warning" | "info";
  message: string;
}

interface CodeEditorPreviewProps {
  hasError: boolean;
  errorMessage: string;
  isGenerating: boolean;
  generatedCode: string;
  projectData: any;
  projectFiles: ProjectFile;
  selectedFile: string;
  expandedFolders: Set<string>;
  previewDevice: string;

  isTerminalOpen: boolean;
  errorLogs: TerminalLog[];
  onCodeChange: (value: string | undefined) => void;
  onFileSelect: (filePath: string) => void;
  onFolderToggle: (folderPath: string) => void;
  onDeviceChange: (device: string) => void;
  onRetry: () => void;

  setProjectFiles: (
    files: ProjectFile | ((prev: ProjectFile) => ProjectFile)
  ) => void;
  setShowGitModal: (show: boolean) => void;
  onSave: () => void;
  onExport: () => void;
  onToggleTerminal: () => void;
  onClearLogs: () => void;
  onSendToAIChat: (message: string) => void;
}

export default function CodeEditorPreview({
  hasError,
  errorMessage,
  isGenerating,
  generatedCode,
  projectData,
  projectFiles,
  selectedFile,
  expandedFolders,
  previewDevice,

  isTerminalOpen,
  errorLogs,
  onCodeChange,
  onFileSelect,
  onFolderToggle,
  onDeviceChange,
  onRetry,

  setProjectFiles,
  setShowGitModal,
  onSave,
  onExport,
  onToggleTerminal,
  onClearLogs,
  onSendToAIChat,
}: CodeEditorPreviewProps) {
  const router = useRouter();
  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith(".tsx") || fileName.endsWith(".jsx")) return "⚛️";
    if (fileName.endsWith(".ts") || fileName.endsWith(".js")) return "📄";
    if (fileName.endsWith(".css") || fileName.endsWith(".scss")) return "🎨";
    if (fileName.endsWith(".json")) return "⚙️";
    if (fileName.endsWith(".md")) return "📝";
    return "📄";
  };

  const buildFileTree = (files: ProjectFile) => {
    const tree: any = {};
    Object.keys(files).forEach((filePath) => {
      const parts = filePath.split("/");
      let current = tree;
      parts.forEach((part, index) => {
        if (index === parts.length - 1) {
          current[part] = { type: "file", path: filePath };
        } else {
          if (!current[part]) current[part] = { type: "folder", children: {} };
          current = current[part].children;
        }
      });
    });
    return tree;
  };

  const renderFileTree = (tree: any, path = "") => {
    return Object.entries(tree).map(([name, node]: [string, any]) => {
      const fullPath = path ? `${path}/${name}` : name;

      if (node.type === "file") {
        return (
          <div
            key={node.path}
            className={`flex items-center px-2 py-1 text-sm cursor-pointer hover:bg-gray-100 rounded ${
              selectedFile === node.path ? "bg-primary/20 text-primary" : ""
            }`}
            style={{ paddingLeft: `${path.split("/").length * 12 + 8}px` }}
            onClick={() => {
              onFileSelect(node.path);
            }}
          >
            <span className="mr-2">{getFileIcon(name)}</span>
            <span className="text-gray-700">{name}</span>
          </div>
        );
      } else {
        const isExpanded = expandedFolders.has(fullPath);
        return (
          <div key={fullPath}>
            <div
              className="flex items-center px-2 py-1 text-sm cursor-pointer hover:bg-gray-100 rounded"
              style={{ paddingLeft: `${path.split("/").length * 12 + 8}px` }}
              onClick={() => onFolderToggle(fullPath)}
            >
              <ChevronRight
                className={`h-4 w-4 mr-1 transition-transform text-gray-500 ${
                  isExpanded ? "rotate-90" : ""
                }`}
              />
              <Folder className="h-4 w-4 mr-2 text-primary" />
              <span className="text-gray-700">{name}</span>
            </div>
            {isExpanded && renderFileTree(node.children, fullPath)}
          </div>
        );
      }
    });
  };

  const getEditorLanguage = (filePath: string) => {
    const extension = filePath.split(".").pop()?.toLowerCase();

    switch (extension) {
      case "tsx":
      case "ts":
        return "typescript";
      case "jsx":
      case "js":
        return "javascript";
      case "vue":
        return "html"; // Vue SFC files
      case "css":
        return "css";
      case "scss":
      case "sass":
        return "scss";
      case "json":
        return "json";
      case "md":
        return "markdown";
      case "html":
        return "html";
      case "xml":
        return "xml";
      case "yaml":
      case "yml":
        return "yaml";
      case "py":
        return "python";
      case "java":
        return "java";
      case "php":
        return "php";
      case "go":
        return "go";
      case "rs":
        return "rust";
      case "sql":
        return "sql";
      default:
        return "typescript"; // 기본값
    }
  };

  return (
    <div className="flex flex-1 flex-col border-1 border-gray-200 rounded-lg bg-white h-full relative">
      <div
        className="p-4 flex-1 flex flex-col transition-all duration-300"
        // style={{ paddingBottom: isTerminalOpen ? "" : "48px" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-medium text-gray-900">
              AI가 생성한 UI 코드
            </h2>
            {hasError && (
              <Badge variant="destructive" className="text-xs">
                <AlertTriangle className="h-3 w-3 mr-1" />
                생성 실패
              </Badge>
            )}
            {!hasError && isGenerating && (
              <Badge
                variant="secondary"
                className="text-xs bg-primary/20 text-primary/90"
              >
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                생성 중...
              </Badge>
            )}
            {!hasError && !isGenerating && (
              <Badge
                variant="outline"
                className="text-xs border-green-300 text-green-700 bg-green-50"
              >
                <Terminal className="h-4 w-4 mr-2" />
                생성 완료
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowGitModal(true)}
              className="text-gray-600 border-gray-300 hover:bg-gray-50"
            >
              <Github className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onSave}
              className="text-gray-600 border-gray-300 hover:bg-gray-50"
            >
              <Save className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              className="text-gray-600 border-gray-300 hover:bg-gray-50"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/inspect")}
              className="text-gray-600 border-gray-300 hover:bg-gray-50"
            >
              <Search className="h-4 w-4 mr-1" />
              검사
            </Button>
            {hasError && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="text-red-600 border-red-300 hover:bg-red-50 bg-transparent"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                다시 시도
              </Button>
            )}
          </div>
        </div>

        {hasError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-800">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-red-800 dark:text-red-200">
                  코드 생성 실패
                </h4>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  {errorMessage}
                </p>
              </div>
            </div>
          </div>
        )}

        <Tabs defaultValue="code" className="w-full flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-2 bg-transparent p-0 h-auto border-b border-gray-200">
            <TabsTrigger
              value="code"
              className="flex items-center justify-center px-4 py-3 text-sm font-medium transition-colors bg-transparent border-0 rounded-none data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:font-semibold hover:text-gray-700 hover:bg-gray-50 text-gray-500"
            >
              <Terminal className="h-4 w-4 mr-2" />
              생성된 코드
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="flex items-center justify-center px-4 py-3 text-sm font-medium transition-colors bg-transparent border-0 rounded-none data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:font-semibold hover:text-gray-700 hover:bg-gray-50 text-gray-500"
            >
              <Monitor className="h-4 w-4 mr-2" />
              라이브 미리보기
            </TabsTrigger>
          </TabsList>

          <TabsContent value="code" className="mt-4 flex-1 flex flex-col">
            <div className="flex flex-1">
              <div className="w-64 border-r border-gray-200 bg-white flex flex-col">
                <div className="p-3 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">
                      파일 탐색기
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-gray-100"
                      onClick={() => {
                        const fileName = prompt(
                          "새 파일명을 입력하세요 (예: src/components/NewComponent.tsx)"
                        );
                        if (fileName) {
                          setProjectFiles((prev: ProjectFile) => ({
                            ...prev,
                            [fileName]: "// 새 파일\n",
                          }));
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <ScrollArea className="flex-1 p-2">
                  {renderFileTree(buildFileTree(projectFiles))}
                </ScrollArea>
              </div>

              <div className="flex-1 flex flex-col">
                <div className="p-2 border-b border-border bg-card/50">
                  <div className="flex items-center">
                    <span className="mr-2">{getFileIcon(selectedFile)}</span>
                    <span className="text-sm font-medium text-foreground">
                      {selectedFile}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <Editor
                    height="100%"
                    language={getEditorLanguage(selectedFile)}
                    value={generatedCode}
                    onChange={onCodeChange}
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: true },
                      fontSize: 14,
                      lineNumbers: "on",
                      roundedSelection: false,
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      tabSize: 2,
                      insertSpaces: true,
                      wordWrap: "on",
                      folding: true,
                      foldingHighlight: true,
                      foldingImportsByDefault: false,
                      unfoldOnClickAfterEndOfLine: false,
                      contextmenu: true,
                      mouseWheelZoom: true,
                      multiCursorModifier: "ctrlCmd",
                      accessibilitySupport: "auto",
                      suggest: {
                        enabled: true,
                        showKeywords: true,
                        showSnippets: true,
                        showClasses: true,
                        showFunctions: true,
                        showVariables: true,
                      },
                      quickSuggestions: {
                        other: true,
                        comments: true,
                        strings: true,
                      },
                      parameterHints: {
                        enabled: true,
                      },
                      autoIndent: "full",
                      formatOnPaste: true,
                      formatOnType: true,
                    }}
                    loading={
                      <div className="flex items-center justify-center h-full bg-gray-900">
                        <div className="text-center">
                          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-purple-400" />
                          <p className="text-gray-300">에디터 로딩 중...</p>
                        </div>
                      </div>
                    }
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-4 flex-1 flex flex-col">
            <div className="border border-border rounded-lg bg-background p-4 flex-1">
              <div className="flex items-center justify-center mb-4 space-x-2">
                <Button
                  variant={previewDevice === "desktop" ? "default" : "outline"}
                  size="sm"
                  onClick={() => onDeviceChange("desktop")}
                  className={
                    previewDevice === "desktop"
                      ? "bg-purple-600 hover:bg-purple-700 text-white"
                      : ""
                  }
                >
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button
                  variant={previewDevice === "tablet" ? "default" : "outline"}
                  size="sm"
                  onClick={() => onDeviceChange("tablet")}
                  className={
                    previewDevice === "tablet"
                      ? "bg-purple-600 hover:bg-purple-700 text-white"
                      : ""
                  }
                >
                  <Tablet className="h-4 w-4" />
                </Button>
                <Button
                  variant={previewDevice === "mobile" ? "default" : "outline"}
                  size="sm"
                  onClick={() => onDeviceChange("mobile")}
                  className={
                    previewDevice === "mobile"
                      ? "bg-purple-600 hover:bg-purple-700 text-white"
                      : ""
                  }
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex justify-center">
                <div
                  className={`border border-border rounded-lg bg-background overflow-hidden ${
                    previewDevice === "mobile"
                      ? "max-w-sm"
                      : previewDevice === "tablet"
                      ? "max-w-md"
                      : "w-full max-w-2xl"
                  }`}
                >
                  <div className="p-6 max-w-md mx-auto">
                    <div className="border border-border rounded-lg shadow-sm bg-card">
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-2 text-card-foreground">
                          Welcome
                        </h3>
                        <p className="text-card-foreground mb-4">
                          This is your generated component based on the uploaded
                          design.
                        </p>
                        <button className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">
                          Get Started
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 터미널 섹션 - 절대 위치로 하단에 고정 */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-10 bg-white border-t border-border shadow-lg transition-all duration-300 ${
          isTerminalOpen ? "h-80" : "h-12"
        }`}
      >
        <TerminalComponent
          isTerminalOpen={isTerminalOpen}
          errorLogs={errorLogs}
          onToggleTerminal={onToggleTerminal}
          onClearLogs={onClearLogs}
          onSendToAIChat={onSendToAIChat}
        />
      </div>
    </div>
  );
}
