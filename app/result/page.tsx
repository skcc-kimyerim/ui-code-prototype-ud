"use client";

import type React from "react";

import { RefreshCw } from "lucide-react";
import AIChat from "@/components/ai-chat";
import GitModal from "@/components/git-modal";
import CodeEditorPreview from "@/components/code-editor-preview";
import Header from "@/components/header";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ResultPage() {
  const router = useRouter();
  const [projectData, setProjectData] = useState<any>(null);
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [previewDevice, setPreviewDevice] = useState("desktop");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorLogs, setErrorLogs] = useState<
    Array<{
      timestamp: string;
      level: "error" | "warning" | "info";
      message: string;
    }>
  >([
    {
      timestamp: "14:32:15",
      level: "error",
      message:
        "TypeError: Cannot read property 'map' of undefined at Component.render (App.tsx:45:12)",
    },
    {
      timestamp: "14:32:10",
      level: "warning",
      message:
        "Warning: React Hook useEffect has a missing dependency: 'fetchData'. Either include it or remove the dependency array.",
    },
    {
      timestamp: "14:32:05",
      level: "info",
      message: "Build completed successfully in 2.3s",
    },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [currentBranch, setCurrentBranch] = useState("main");
  const [branches, setBranches] = useState([
    "main",
    "develop",
    "feature/ui-updates",
  ]);
  const [currentTag, setCurrentTag] = useState("v1.0.0");
  const [tags, setTags] = useState(["v1.0.0", "v0.9.0", "v0.8.1"]);
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [showNewTagInput, setShowNewTagInput] = useState(false);
  const [codeVersions, setCodeVersions] = useState([
    {
      id: 1,
      timestamp: new Date(Date.now() - 3600000),
      description: "초기 코드 생성",
      code: generatedCode,
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 1800000),
      description: "버튼 스타일 수정",
      code: generatedCode,
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 900000),
      description: "레이아웃 개선",
      code: generatedCode,
    },
  ]);
  const [selectedVersion, setSelectedVersion] = useState(
    codeVersions[codeVersions.length - 1]
  );
  const [gitStatus, setGitStatus] = useState("clean");
  const [showBranchDropdown, setShowBranchDropdown] = useState(false); // Declare the variable

  const [showGitModal, setShowGitModal] = useState(false);

  const [projectFiles, setProjectFiles] = useState<{ [key: string]: string }>(
    {}
  );
  const [selectedFile, setSelectedFile] = useState("src/App.tsx");
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["src", "src/components"])
  );

  useEffect(() => {
    const storedProject = localStorage.getItem("currentProject");
    if (storedProject) {
      const project = JSON.parse(storedProject);
      setProjectData(project);
      loadProjectFiles(project.framework);
    } else {
      router.push("/");
    }
  }, [router]);

  const loadProjectFiles = async (framework: string) => {
    try {
      const template = framework === "Vue" ? "vue-basic" : "react-basic";
      const response = await fetch(`/api/files?template=${template}`);
      const data = await response.json();

      if (data.files) {
        const fileMap: { [key: string]: string } = {};
        data.files.forEach((file: { path: string; content: string }) => {
          fileMap[file.path] = file.content;
        });
        setProjectFiles(fileMap);
        setGeneratedCode(fileMap["src/App.tsx"] || "");
      }
    } catch (error) {
      console.error("Failed to load project files:", error);
      // Fallback to default files if API fails
      const defaultFiles = getDefaultProjectFiles(framework);
      setProjectFiles(defaultFiles);
      setGeneratedCode(defaultFiles["src/App.tsx"] || "");
    }
  };

  const getDefaultProjectFiles = (framework: string) => {
    const defaultCode = generateInitialCode(framework, "Tailwind CSS");
    return {
      "src/App.tsx": defaultCode,
      "src/components/LoginForm.tsx": "",
      "src/components/Button.tsx": "",
      "src/styles/globals.css": "",
      "package.json": JSON.stringify(
        {
          name: "ui-code-project",
          version: "1.0.0",
          dependencies: {
            react: "^18.0.0",
            "react-dom": "^18.0.0",
          },
        },
        null,
        2
      ),
      "README.md": "# UI Code Project\n\n자동 생성된 React 프로젝트입니다.",
    };
  };

  useEffect(() => {
    if (generatedCode && generatedCode !== selectedVersion.code) {
      const newVersion = {
        id: codeVersions.length + 1,
        timestamp: new Date(),
        description: "자동 저장",
        code: generatedCode,
      };
      setCodeVersions((prev) => [...prev, newVersion]);
      setSelectedVersion(newVersion);
    }
  }, [generatedCode]);

  const generateInitialCode = (framework: string, styling: string) => {
    if (framework === "Vue") {
      if (styling === "SCSS") {
        return [
          "<template>",
          '  <div class="p-6 max-w-md mx-auto">',
          '    <div class="border border-gray-200 rounded-lg shadow-sm bg-white">',
          '      <div class="p-6">',
          '        <h2 class="text-lg font-semibold mb-2 text-gray-900">Welcome</h2>',
          '        <p class="text-gray-600 mb-4">',
          "          This is your generated component based on the uploaded design.",
          "        </p>",
          "        <button",
          '          class="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"',
          '          @click="handleClick"',
          "        >",
          "          Get Started",
          "        </button>",
          "      </div>",
          "    </div>",
          "  </div>",
          "</template>",
          "",
          "<script>",
          "export default {",
          "  methods: {",
          "    handleClick() {",
          '      console.log("Button clicked!")',
          "    }",
          "  }",
          "}",
          "</script>",
          "",
          '<style lang="scss" scoped>',
          ".p-6 {",
          "  padding: 1.5rem;",
          "}",
          ".max-w-md {",
          "  max-width: 28rem;",
          "}",
          ".mx-auto {",
          "  margin-left: auto;",
          "  margin-right: auto;",
          "}",
          "</style>",
        ].join("\n");
      } else {
        return [
          "<template>",
          '  <div class="p-6 max-w-md mx-auto">',
          '    <div class="border border-gray-200 rounded-lg shadow-sm bg-white">',
          '      <div class="p-6">',
          '        <h2 class="text-lg font-semibold mb-2 text-gray-900">Welcome</h2>',
          '        <p class="text-gray-600 mb-4">',
          "          This is your generated component based on the uploaded design.",
          "        </p>",
          "        <button",
          '          class="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"',
          '          @click="handleClick"',
          "        >",
          "          Get Started",
          "        </button>",
          "      </div>",
          "    </div>",
          "  </div>",
          "</template>",
          "",
          "<script>",
          "export default {",
          "  methods: {",
          "    handleClick() {",
          '      console.log("Button clicked!")',
          "    }",
          "  }",
          "}",
          "</script>",
        ].join("\n");
      }
    } else {
      // Default React code
      return `import React from 'react'
import { Button } from '@/components/ui/button'

export default function GeneratedComponent() {
  const handleClick = () => {
    console.log('Button clicked!')
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="border border-border rounded-lg shadow-sm bg-card">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-2 text-foreground">Welcome</h2>
          <p className="text-muted-foreground mb-4">
            This is your generated component based on the uploaded design.
          </p>
          <Button 
            onClick={handleClick}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  )
}`;
    }
  };

  const generateComponent = (framework: string, styling: string) => {
    if (framework === "Vue") {
      return [
        "<template>",
        '  <div class="p-6 max-w-md mx-auto">',
        '    <div class="border border-gray-200 rounded-lg shadow-sm bg-white">',
        '      <div class="p-6">',
        '        <h2 class="text-lg font-semibold mb-2 text-gray-900">Welcome</h2>',
        '        <p class="text-gray-600 mb-4">',
        "          This is your generated component based on the uploaded design.",
        "        </p>",
        "        <button",
        '          class="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"',
        '          @click="handleClick"',
        "        >",
        "          Get Started",
        "        </button>",
        "      </div>",
        "    </div>",
        "  </div>",
        "</template>",
        "<script>",
        "export default {",
        "  methods: {",
        "    handleClick() {",
        '      console.log("Button clicked!")',
        "    }",
        "  }",
        "}",
        "</script>",
        styling === "SCSS" ? '<style lang="scss" scoped>' : "<style scoped>",
        "</style>",
      ].join("\n");
    } else {
      // Default React code
      return `import React from 'react'
import { Button } from '@/components/ui/button'

export default function GeneratedComponent() {
  const handleClick = () => {
    console.log('Button clicked!')
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="border border-border rounded-lg shadow-sm bg-card">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-2 text-foreground">Welcome</h2>
          <p className="text-muted-foreground mb-4">
            This is your generated component based on the uploaded design.
          </p>
          <Button 
            onClick={handleClick}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  )
}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setIsGenerating(true);
    setHasError(false);
    setErrorMessage("");

    const shouldSimulateError = Math.random() < 0.2; // 20% chance of error for demo

    setTimeout(() => {
      const message = input.toLowerCase();
      let response = "";
      let newCode = generatedCode;

      if (shouldSimulateError) {
        const errorTypes = [
          {
            type: "syntax",
            message: "구문 오류: 예상치 못한 토큰이 발견되었습니다.",
            log: "SyntaxError: Unexpected token '}' at line 23:5",
          },
          {
            type: "compile",
            message: "컴파일 오류: 타입 불일치가 발생했습니다.",
            log: "TypeScript Error: Type 'string' is not assignable to type 'number'",
          },
          {
            type: "runtime",
            message: "런타임 오류: 정의되지 않은 변수에 접근했습니다.",
            log: "ReferenceError: 'handleClick' is not defined",
          },
        ];

        const randomError =
          errorTypes[Math.floor(Math.random() * errorTypes.length)];
        setHasError(true);
        setErrorMessage(randomError.message);
        setErrorLogs((prev) => [
          ...prev,
          {
            timestamp: new Date().toLocaleTimeString(),
            level: "error" as const,
            message: randomError.log,
          },
        ]);

        response = `죄송합니다. 코드 생성 중 오류가 발생했습니다: ${randomError.message} 오류 로그를 확인하고 다시 시도해주세요.`;
      } else {
        if (
          message.includes("새로운") ||
          message.includes("새") ||
          message.includes("만들어") ||
          message.includes("생성")
        ) {
          if (message.includes("로그인") || message.includes("login")) {
            response =
              "새로운 로그인 폼 컴포넌트를 생성했습니다. 이메일과 비밀번호 입력 필드, 로그인 버튼이 포함되어 있습니다.";
            newCode = generateLoginForm(
              projectData.framework,
              projectData.styling
            );
          } else {
            response =
              "새로운 컴포넌트를 생성했습니다. 요청하신 내용을 반영하여 구성했습니다.";
          }
        } else if (message.includes("색상") || message.includes("컬러")) {
          if (message.includes("파란") || message.includes("blue")) {
            response = "버튼 색상을 파란색으로 변경했습니다.";
            if (projectData.framework === "Vue") {
              newCode = generatedCode
                .replace(
                  /background-color: #7c3aed/g,
                  "background-color: #2563eb"
                )
                .replace(
                  /&:hover {\s*background-color: #6d28d9/g,
                  "&:hover {\n      background-color: #1d4ed8"
                )
                .replace(/bg-purple-600/g, "bg-blue-600")
                .replace(/hover:bg-purple-700/g, "hover:bg-blue-700");
            } else {
              newCode = generatedCode
                .replace(/bg-purple-600/g, "bg-blue-600")
                .replace(/hover:bg-purple-700/g, "hover:bg-blue-700");
            }
          } else {
            response = "색상을 변경했습니다.";
          }
        } else {
          response =
            "요청하신 내용을 반영하여 코드를 수정했습니다. 변경사항을 확인해보세요.";
        }

        setErrorLogs((prev) => [
          ...prev,
          {
            timestamp: new Date().toLocaleTimeString(),
            level: "info",
            message: `코드 생성 완료: ${message}`,
          },
        ]);
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
      if (!shouldSimulateError) {
        setGeneratedCode(newCode);
      }
      setIsLoading(false);
      setIsGenerating(false);
    }, 1500);
  };

  const handleRetry = () => {
    if (messages.length > 0) {
      const lastUserMessage = messages.filter((m) => m.role === "user").pop();
      if (lastUserMessage) {
        setInput(lastUserMessage.content);
        setHasError(false);
        setErrorMessage("");
      }
    }
  };

  const handleClearLogs = () => {
    setErrorLogs([]);
  };

  const generateLoginForm = (framework: string, styling: string) => {
    if (framework === "Vue") {
      return [
        "<template>",
        '  <div class="min-h-screen flex items-center justify-center bg-gray-50">',
        '    <div class="max-w-md w-full space-y-8">',
        "      <div>",
        '        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">',
        "          로그인",
        "        </h2>",
        "      </div>",
        '      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">',
        "        <div>",
        '          <label for="email" class="sr-only">이메일</label>',
        "          <input",
        '            id="email"',
        '            name="email"',
        '            type="email"',
        "            required",
        '            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500"',
        '            placeholder="이메일 주소"',
        '            v-model="email"',
        "          />",
        "        </div>",
        "        <div>",
        '          <label for="password" class="sr-only">비밀번호</label>',
        "          <input",
        '            id="password"',
        '            name="password"',
        '            type="password"',
        "            required",
        '            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500"',
        '            placeholder="비밀번호"',
        '            v-model="password"',
        "          />",
        "        </div>",
        "        <button",
        '          type="submit"',
        '          class="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"',
        "        >",
        "          로그인",
        "        </button>",
        "      </form>",
        "    </div>",
        "  </div>",
        "</template>",
        "<script>",
        "export default {",
        "  data() {",
        "    return {",
        "      email: '',",
        "      password: ''",
        "    }",
        "  },",
        "  methods: {",
        "    handleSubmit() {",
        '      console.log("로그인 시도:", { email: this.email, password: this.password })',
        "    }",
        "  }",
        "}",
        "</script>",
        "",
        "<style scoped>",
        "</style>",
      ].join("\n");
    } else {
      return [
        "import React, { useState } from 'react'",
        "import { Button } from '@/components/ui/button'",
        "import { Input } from '@/components/ui/input'",
        "import { Label } from '@/components/ui/label'",
        "",
        "export default function LoginForm() {",
        "  const [email, setEmail] = useState('')",
        "  const [password, setPassword] = useState('')",
        "",
        "  return (",
        '    <div className="p-6 max-w-md mx-auto">',
        '      <div className="border border-border rounded-lg shadow-sm bg-card">',
        '        <div className="p-6">',
        '          <h2 className="text-lg font-semibold mb-2 text-foreground">로그인</h2>',
        '          <div className="space-y-4">',
        '            <div className="space-y-2">',
        '              <Label htmlFor="email">이메일</Label>',
        "              <Input ",
        '                id="email" ',
        '                type="email" ',
        "                value={email}",
        "                onChange={(e) => setEmail(e.target.value)}",
        '                placeholder="이메일을 입력하세요"',
        "              />",
        "            </div>",
        '            <div className="space-y-2">',
        '              <Label htmlFor="password">비밀번호</Label>',
        "              <Input ",
        '                id="password" ',
        '                type="password" ',
        "                value={password}",
        "                onChange={(e) => setPassword(e.target.value)}",
        '                placeholder="비밀번호를 입력하세요"',
        "              />",
        "            </div>",
        "            <Button ",
        "              onClick={() => console.log('로그인 시도:', { email, password })}",
        '              className="w-full bg-purple-600 hover:bg-purple-700"',
        "            >",
        "              로그인",
        "            </Button>",
        "          </div>",
        "        </div>",
        "      </div>",
        "    </div>",
        "  )",
        "}",
      ].join("\n");
    }
  };

  const handleCodeChange = (value: string | undefined) => {
    const newCode = value || "";
    setGeneratedCode(newCode);
    setProjectFiles((prev) => ({
      ...prev,
      [selectedFile]: newCode,
    }));

    // Auto-save version
    const newVersion = {
      id: codeVersions.length + 1,
      code: newCode,
      timestamp: new Date(),
      description: `${selectedFile} 수정됨`,
    };
    setCodeVersions((prev) => [...prev, newVersion]);
    setSelectedVersion(newVersion);
  };

  const handleSave = () => {
    alert("Project saved successfully!");
  };

  const handleExport = () => {
    const blob = new Blob([generatedCode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${projectData?.projectName || "component"}.tsx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleBranchSwitch = (branchName: string) => {
    setCurrentBranch(branchName);
    setShowBranchDropdown(false);
    // Simulate loading different branch content
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      addLog("info", `브랜치 '${branchName}'로 전환되었습니다.`);
    }, 1000);
  };

  const handleCreateBranch = (newBranchName?: string) => {
    const branchName = newBranchName || "new-branch"; // Use provided name or default
    if (branchName.trim()) {
      setBranches([...branches, branchName]);
      setCurrentBranch(branchName);
      addLog("info", `새 브랜치 '${branchName}'가 생성되었습니다.`);
    }
  };

  const handleTagSwitch = (tagName: string) => {
    setCurrentTag(tagName);
    setShowTagDropdown(false);
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      addLog("info", `태그 '${tagName}'로 전환되었습니다.`);
    }, 1000);
  };

  const handleCreateTag = (tagName?: string) => {
    const newTag = tagName || newTagName;
    if (newTag.trim()) {
      setTags([newTag, ...tags]);
      setCurrentTag(newTag);
      setNewTagName("");
      setShowNewTagInput(false);
      setShowTagDropdown(false);
      addLog("info", `새 태그 '${newTag}'가 생성되었습니다.`);
    }
  };

  const addLog = (level: "error" | "warning" | "info", message: string) => {
    setErrorLogs((prev) => [
      ...prev,
      {
        timestamp: new Date().toLocaleTimeString(),
        level,
        message,
      },
    ]);
  };

  const handleVersionRevert = (version: any) => {
    setGeneratedCode(version.code);
    setSelectedVersion(version);
    addLog("info", `버전 ${version.id}로 롤백했습니다: ${version.description}`);
  };

  if (!projectData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-purple-600" />
          <p className="text-foreground">프로젝트 로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header
        showBackButton={true}
        backButtonText="새 프로젝트"
        onBackClick={() => router.push("/")}
        notificationCount={0}
      />

      <div className="flex gap-4 p-4" style={{ height: "calc(100vh - 4rem)" }}>
        <AIChat
          messages={messages}
          input={input}
          isLoading={isLoading}
          onInputChange={setInput}
          onSubmit={handleSubmit}
        />
        <CodeEditorPreview
          hasError={hasError}
          errorMessage={errorMessage}
          isGenerating={isGenerating}
          generatedCode={generatedCode}
          projectData={projectData}
          projectFiles={projectFiles}
          selectedFile={selectedFile}
          expandedFolders={expandedFolders}
          previewDevice={previewDevice}
          isTerminalOpen={isTerminalOpen}
          errorLogs={errorLogs}
          onCodeChange={handleCodeChange}
          onFileSelect={(filePath) => {
            setSelectedFile(filePath);
            setGeneratedCode(projectFiles[filePath] || "");
          }}
          onFolderToggle={(folderPath) => {
            const newExpanded = new Set(expandedFolders);
            if (newExpanded.has(folderPath)) {
              newExpanded.delete(folderPath);
            } else {
              newExpanded.add(folderPath);
            }
            setExpandedFolders(newExpanded);
          }}
          onDeviceChange={setPreviewDevice}
          onRetry={handleRetry}
          setProjectFiles={setProjectFiles}
          setShowGitModal={setShowGitModal}
          onSave={handleSave}
          onExport={handleExport}
          onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
          onClearLogs={() => setErrorLogs([])}
          onSendToAIChat={(message: string) => {
            // 메시지를 바로 전송하는 함수
            const sendMessage = async () => {
              if (!message.trim() || isLoading) return;

              const userMessage = { role: "user" as const, content: message };
              setMessages((prev) => [...prev, userMessage]);
              setInput(""); // input 필드 비우기
              setIsLoading(true);

              // AI 응답 시뮬레이션
              setTimeout(() => {
                const response =
                  "오류를 분석해보겠습니다. 일반적으로 이런 오류는 다음과 같은 방법으로 해결할 수 있습니다:\n\n1. 변수가 정의되었는지 확인\n2. 타입 선언이 올바른지 검토\n3. import 구문이 정확한지 확인\n4. 함수나 객체가 존재하는지 검증\n\n구체적인 코드를 보여주시면 더 정확한 해결책을 제시해드릴 수 있습니다.";

                setMessages((prev) => [
                  ...prev,
                  { role: "assistant" as const, content: response },
                ]);
                setIsLoading(false);
              }, 1500);
            };

            sendMessage();
          }}
        />
      </div>

      <GitModal
        showGitModal={showGitModal}
        onClose={() => setShowGitModal(false)}
        currentBranch={currentBranch}
        branches={branches}
        currentTag={currentTag}
        tags={tags}
        codeVersions={codeVersions}
        selectedVersion={selectedVersion}
        onBranchSwitch={handleBranchSwitch}
        onCreateBranch={handleCreateBranch}
        onTagSwitch={handleTagSwitch}
        onCreateTag={handleCreateTag}
        onVersionRevert={handleVersionRevert}
      />
    </div>
  );
}
