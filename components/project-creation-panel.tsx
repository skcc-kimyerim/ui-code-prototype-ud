"use client";

import type React from "react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Code,
  Upload,
  Settings,
  FileText,
  Zap,
  X,
  RefreshCw,
} from "lucide-react";

export function ProjectCreationPanel() {
  const router = useRouter();
  const [projectName, setProjectName] = useState("My UI Project");
  const [framework, setFramework] = useState("React");
  const [styling, setStyling] = useState("Tailwind CSS");
  const [stateManagement, setStateManagement] = useState("None");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [featureRequirements, setFeatureRequirements] = useState({
    responsive: true,
    accessibility: true,
    darkMode: false,
    i18n: false,
    formValidation: true,
    animations: false,
  });

  const [useRequirementsFile, setUseRequirementsFile] = useState(false);
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  const [componentLibrary, setComponentLibrary] = useState("shadcn/ui");
  const [isDownloadingRequirements, setIsDownloadingRequirements] =
    useState(false);
  const [requirementsData, setRequirementsData] = useState<string>("");

  const [gitIntegration, setGitIntegration] = useState({
    enabled: false,
    repositoryUrl: "",
    branch: "main",
    tag: "",
    accessToken: "",
  });

  const frameworks = [
    { value: "React", label: "React", description: "Modern React with Hooks" },
    { value: "Vue", label: "Vue", description: "Vue 3 with Composition API" },
  ];

  const stylingOptions = [
    {
      value: "Tailwind CSS",
      label: "Tailwind CSS",
      description: "Utility-first CSS",
    },
    {
      value: "Styled Components",
      label: "Styled Components",
      description: "CSS-in-JS",
    },
    { value: "SCSS", label: "SCSS", description: "Enhanced CSS" },
    { value: "CSS Modules", label: "CSS Modules", description: "Scoped CSS" },
  ];

  const stateOptions = [
    { value: "None", label: "None", description: "Built-in state only" },
    {
      value: "Redux-toolkit",
      label: "Redux-toolkit",
      description: "Predictable state container",
    },
    {
      value: "Zustand",
      label: "Zustand",
      description: "Lightweight state management",
    },
    {
      value: "React-query",
      label: "React-query",
      description: "State management",
    },
  ];

  const componentLibraries = [
    {
      value: "custom-components",
      label: "custom-components",
      description: "Custom components",
    },
    {
      value: "shadcn/ui",
      label: "shadcn/ui",
      description: "Beautifully designed components",
    },
    {
      value: "Material-UI",
      label: "Material-UI",
      description: "React components for faster development",
    },
    {
      value: "Ant Design",
      label: "Ant Design",
      description: "Enterprise UI design language",
    },
    {
      value: "Chakra UI",
      label: "Chakra UI",
      description: "Simple, modular and accessible",
    },
    {
      value: "Mantine",
      label: "Mantine",
      description: "Full-featured React components library",
    },
  ];

  const commonComponents = [
    "Navigation Bar",
    "Footer",
    "Hero Section",
    "Card Component",
    "Button Component",
    "Form Components",
    "Modal/Dialog",
    "Sidebar",
    "Table Component",
    "Chart Components",
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).map((file) => file.name);
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (fileName: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file !== fileName));
  };

  const toggleComponent = (component: string) => {
    setSelectedComponents((prev) =>
      prev.includes(component)
        ? prev.filter((c) => c !== component)
        : [...prev, component]
    );
  };

  const downloadRequirementsFromAgent = async () => {
    setIsDownloadingRequirements(true);
    try {
      // 시뮬레이션된 요구사항 agent API 호출
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2초 대기

      // 예시 요구사항 데이터 (실제로는 API에서 받아올 데이터)
      const mockRequirements = `
프로젝트 요구사항:

1. 사용자 인터페이스
   - 반응형 디자인 적용
   - 다크모드 지원
   - 모바일 우선 접근 방식

2. 기능 요구사항
   - 사용자 로그인/로그아웃
   - 데이터 CRUD 기능
   - 실시간 알림 시스템
   - 검색 및 필터링

3. 성능 요구사항
   - 페이지 로딩 시간 3초 이내
   - 이미지 최적화
   - 코드 스플리팅 적용

4. 보안 요구사항
   - JWT 토큰 기반 인증
   - XSS 방지
   - CSRF 보호

5. 접근성 요구사항
   - WCAG 2.1 AA 레벨 준수
   - 키보드 네비게이션 지원
   - 스크린 리더 호환성
      `;

      setRequirementsData(mockRequirements);

      // 요구사항에 따라 자동으로 기능 요구사항 업데이트
      setFeatureRequirements((prev) => ({
        ...prev,
        responsive: true,
        accessibility: true,
        darkMode: true,
        formValidation: true,
        animations: false,
        i18n: false,
      }));

      // 추천 컴포넌트 자동 선택
      setSelectedComponents([
        "Navigation Bar",
        "Footer",
        "Button Component",
        "Form Components",
        "Modal/Dialog",
        "Card Component",
      ]);

      console.log("요구사항 다운로드 완료");
    } catch (error) {
      console.error("요구사항 다운로드 실패:", error);
    } finally {
      setIsDownloadingRequirements(false);
    }
  };

  const handleRequirementsFileToggle = (checked: boolean) => {
    setUseRequirementsFile(checked);
    if (checked && !requirementsData) {
      downloadRequirementsFromAgent();
    }
  };

  const handleCreateProject = () => {
    setIsCreating(true);
    console.log("[v0] Starting project creation...");

    setTimeout(() => {
      console.log("[v0] Creating project with data:", {
        projectName,
        framework,
        styling,
        uploadedFiles: uploadedFiles.length,
      });

      const projectId = Date.now().toString();
      const projectData = {
        id: projectId,
        name: projectName,
        framework,
        styling,
        stateManagement,
        componentLibrary,
        featureRequirements,
        uploadedFiles,
        gitIntegration,
        useRequirementsFile,
        requirementsData: useRequirementsFile ? requirementsData : "",
        selectedComponents,
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        status: "active" as const,
      };

      const existingProjects = JSON.parse(
        localStorage.getItem("projects") || "[]"
      );
      const updatedProjects = [...existingProjects, projectData];
      localStorage.setItem("projects", JSON.stringify(updatedProjects));

      localStorage.setItem("currentProject", JSON.stringify(projectData));

      console.log("[v0] Project saved, navigating to /result");
      try {
        router.push("/result");
        console.log("[v0] router.push('/result') called successfully");

        setTimeout(() => {
          console.log(
            "[v0] Current pathname after navigation attempt:",
            window.location.pathname
          );
        }, 100);
      } catch (error) {
        console.error("[v0] Error during navigation:", error);
      }
    }, 2000);
  };

  const canCreateProject = projectName.trim() && uploadedFiles.length > 0;

  return (
    <div className="h-full flex flex-col">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".fig,.sketch,.xd,.png,.jpg,.jpeg,.pdf,.doc,.docx,.txt,.html,.css,.js,.vue,.jsx,.tsx,.ts,.json,.md"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3 mb-2">
          <Settings className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">프로젝트 설정</h2>
        </div>
        <p className="text-sm text-gray-600">
          새로운 프로젝트를 생성하고 설정하세요
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              프로젝트 이름
            </label>
            <Input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="프로젝트 이름을 입력하세요"
              className="w-full"
            />
          </div>

          {/* Framework Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              프레임워크
            </label>
            <Select value={framework} onValueChange={setFramework}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="프레임워크를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {frameworks.map((fw) => (
                  <SelectItem key={fw.value} value={fw.value}>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{fw.label}</span>
                      <span className="text-xs text-gray-500">
                        {fw.description}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Styling Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              스타일링
            </label>
            <Select value={styling} onValueChange={setStyling}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="스타일링 방식을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {stylingOptions.map((style) => (
                  <SelectItem key={style.value} value={style.value}>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{style.label}</span>
                      <span className="text-xs text-gray-500">
                        {style.description}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* State Management */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              상태 관리
            </label>
            <Select value={stateManagement} onValueChange={setStateManagement}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="상태 관리 방식을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {stateOptions.map((state) => (
                  <SelectItem key={state.value} value={state.value}>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{state.label}</span>
                      <span className="text-xs text-gray-500">
                        {state.description}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Component Library */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              컴포넌트 라이브러리
            </label>
            <Select
              value={componentLibrary}
              onValueChange={setComponentLibrary}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="컴포넌트 라이브러리를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {componentLibraries.map((lib) => (
                  <SelectItem key={lib.value} value={lib.value}>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{lib.label}</span>
                      <span className="text-xs text-gray-500">
                        {lib.description}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              파일 업로드
            </label>
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="w-full h-20 border-dashed border-2 border-gray-300 hover:border-blue-400"
            >
              <div className="text-center">
                <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                <div className="text-sm text-gray-600">
                  파일을 선택하거나 드래그하여 업로드
                </div>
              </div>
            </Button>

            {uploadedFiles.length > 0 && (
              <div className="mt-3 space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-md border border-gray-200 shadow-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{file}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Requirements File Option */}
          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={useRequirementsFile}
                onChange={(e) => handleRequirementsFileToggle(e.target.checked)}
                className="rounded border-gray-300"
                disabled={isDownloadingRequirements}
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">
                    요구사항 파일 사용
                  </span>
                  {isDownloadingRequirements && (
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 border border-blue-500 border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs text-blue-600">
                        다운로드 중...
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  요구사항 Agent에서 프로젝트 요구사항을 자동으로 가져옵니다
                </p>
              </div>
            </label>

            {/* 다운로드된 요구사항 표시 */}
            {useRequirementsFile && requirementsData && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-900">
                    다운로드된 요구사항
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={downloadRequirementsFromAgent}
                    disabled={isDownloadingRequirements}
                    className="text-blue-600 hover:text-blue-700 p-1 h-auto"
                  >
                    <RefreshCw className="h-3 w-3" />
                  </Button>
                </div>
                <div className="max-h-32 overflow-y-auto">
                  <pre className="text-xs text-blue-800 whitespace-pre-wrap">
                    {requirementsData.trim()}
                  </pre>
                </div>
              </div>
            )}

            {/* 수동 새로고침 버튼 */}
            {useRequirementsFile && !isDownloadingRequirements && (
              <div className="mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadRequirementsFromAgent}
                  className="text-xs h-7"
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  요구사항 새로고침
                </Button>
              </div>
            )}
          </div>

          {/* Feature Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              기능 요구사항
            </label>
            <div className="space-y-2">
              {Object.entries(featureRequirements).map(([key, value]) => (
                <label key={key} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) =>
                      setFeatureRequirements((prev) => ({
                        ...prev,
                        [key]: e.target.checked,
                      }))
                    }
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Git Integration */}
          <div>
            <label className="flex items-center space-x-3 mb-3">
              <input
                type="checkbox"
                checked={gitIntegration.enabled}
                onChange={(e) =>
                  setGitIntegration((prev) => ({
                    ...prev,
                    enabled: e.target.checked,
                  }))
                }
                className="rounded border-gray-300"
              />
              <div>
                <span className="text-sm font-medium text-gray-700">
                  Git 통합 활성화
                </span>
                <p className="text-xs text-gray-500">
                  프로젝트를 Git 리포지토리와 연동합니다
                </p>
              </div>
            </label>

            {gitIntegration.enabled && (
              <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Repository URL
                  </label>
                  <Input
                    value={gitIntegration.repositoryUrl}
                    onChange={(e) =>
                      setGitIntegration((prev) => ({
                        ...prev,
                        repositoryUrl: e.target.value,
                      }))
                    }
                    placeholder="https://github.com/username/repo"
                    className="text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Branch
                    </label>
                    <Input
                      value={gitIntegration.branch}
                      onChange={(e) =>
                        setGitIntegration((prev) => ({
                          ...prev,
                          branch: e.target.value,
                        }))
                      }
                      placeholder="main"
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Tag
                    </label>
                    <Input
                      value={gitIntegration.tag}
                      onChange={(e) =>
                        setGitIntegration((prev) => ({
                          ...prev,
                          tag: e.target.value,
                        }))
                      }
                      placeholder="v1.0.0"
                      className="text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Access Token (선택사항)
                  </label>
                  <Input
                    type="password"
                    value={gitIntegration.accessToken}
                    onChange={(e) =>
                      setGitIntegration((prev) => ({
                        ...prev,
                        accessToken: e.target.value,
                      }))
                    }
                    placeholder="ghp_xxxxxxxxxxxx"
                    className="text-sm"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Button
          onClick={handleCreateProject}
          disabled={!canCreateProject || isCreating}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isCreating ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>생성 중...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>프로젝트 생성</span>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}
