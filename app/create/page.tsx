"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Code, Upload, Settings, FileText, Zap, ArrowRight, CheckCircle, ArrowLeft, GitBranch } from "lucide-react"

export default function ProjectCreationPage() {
  const router = useRouter()
  const [projectName, setProjectName] = useState("My UI Project")
  const [framework, setFramework] = useState("React")
  const [styling, setStyling] = useState("Tailwind CSS")
  const [stateManagement, setStateManagement] = useState("None")
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [featureRequirements, setFeatureRequirements] = useState({
    responsive: true,
    accessibility: true,
    darkMode: false,
    i18n: false,
    formValidation: true,
    animations: false,
  })

  const [useRequirementsFile, setUseRequirementsFile] = useState(false)
  const [selectedComponents, setSelectedComponents] = useState<string[]>([])

  const [gitIntegration, setGitIntegration] = useState({
    enabled: false,
    repositoryUrl: "",
    branch: "main",
    tag: "",
    accessToken: "",
  })

  const commonComponents = [
    { id: "header", name: "헤더/네비게이션", description: "로고, 메뉴, 사용자 프로필" },
    { id: "footer", name: "푸터", description: "링크, 저작권, 소셜 미디어" },
    { id: "sidebar", name: "사이드바", description: "네비게이션, 필터, 메뉴" },
    { id: "card", name: "카드", description: "콘텐츠 카드, 제품 카드" },
    { id: "form", name: "폼", description: "로그인, 회원가입, 연락처" },
    { id: "button", name: "버튼", description: "CTA, 액션 버튼" },
    { id: "modal", name: "모달/팝업", description: "다이얼로그, 알림" },
    { id: "table", name: "테이블", description: "데이터 테이블, 목록" },
    { id: "tabs", name: "탭", description: "콘텐츠 분류, 네비게이션" },
    { id: "carousel", name: "캐러셀", description: "이미지 슬라이더, 콘텐츠 회전" },
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newFiles = Array.from(files).map((file) => file.name)
      setUploadedFiles((prev) => [...prev, ...newFiles])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    const newFiles = files.map((file) => file.name)
    setUploadedFiles((prev) => [...prev, ...newFiles])
  }

  const handleCreateProject = () => {
    console.log("[v0] handleCreateProject called")
    console.log("[v0] canCreateProject:", canCreateProject)
    console.log("[v0] projectName:", projectName)
    console.log("[v0] uploadedFiles:", uploadedFiles)

    setIsCreating(true)
    setTimeout(() => {
      console.log("[v0] Creating project with data:", {
        projectName,
        framework,
        styling,
        uploadedFiles: uploadedFiles.length,
      })

      const projectId = Date.now().toString()
      const projectData = {
        id: projectId,
        name: projectName,
        framework,
        styling,
        stateManagement,
        featureRequirements,
        uploadedFiles,
        gitIntegration,
        useRequirementsFile,
        selectedComponents,
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        status: "active" as const,
      }

      const existingProjects = JSON.parse(localStorage.getItem("projects") || "[]")
      const updatedProjects = [...existingProjects, projectData]
      localStorage.setItem("projects", JSON.stringify(updatedProjects))

      localStorage.setItem("currentProject", JSON.stringify(projectData))

      console.log("[v0] Project saved, navigating to /result")
      try {
        router.push("/result")
        console.log("[v0] router.push('/result') called successfully")

        // Additional check to see if navigation actually happens
        setTimeout(() => {
          console.log("[v0] Current pathname after navigation attempt:", window.location.pathname)
        }, 100)
      } catch (error) {
        console.error("[v0] Error during navigation:", error)
      }
    }, 2000)
  }

  const canCreateProject = projectName.trim() && uploadedFiles.length > 0

  return (
    <div className="min-h-screen bg-background">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".fig,.sketch,.xd,.png,.jpg,.jpeg,.pdf,.doc,.docx,.txt,.html,.css,.js,.vue,.jsx,.tsx,.ts,.json,.md"
        onChange={handleFileUpload}
        className="hidden"
      />

      <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30">
        <div className="flex h-14 items-center justify-between px-6">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/")}
              className="text-foreground hover:text-purple-600"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              대시보드로
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                <Code className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">UI CODE AGENT</span>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <Badge
              variant="secondary"
              className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
            >
              <Zap className="h-3 w-3 mr-1" />
              AI-Powered
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">새 프로젝트 생성</h1>
          <p className="text-foreground/80">AI가 디자인을 분석하여 고품질 프론트엔드 코드를 자동 생성합니다</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6 h-full">
            <Card className="h-full">
              <CardContent className="p-6 h-full">
                <div className="flex items-center space-x-2 mb-4">
                  <Settings className="h-5 w-5 text-purple-600" />
                  <h2 className="text-lg font-semibold text-foreground">프로젝트 초기 설정</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">프로젝트명</label>
                    <Input
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="mt-1"
                      placeholder="프로젝트 이름을 입력하세요"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-foreground">프레임워크</label>
                      <select
                        value={framework}
                        onChange={(e) => setFramework(e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      >
                        <option value="React">React</option>
                        <option value="Vue">Vue</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">스타일링</label>
                      <select
                        value={styling}
                        onChange={(e) => setStyling(e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      >
                        <option value="Tailwind CSS">Tailwind CSS</option>
                        <option value="CSS Modules">CSS Modules</option>
                        <option value="Styled Components">Styled Components</option>
                        <option value="SCSS">SCSS</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">상태 관리</label>
                    <select
                      value={stateManagement}
                      onChange={(e) => setStateManagement(e.target.value)}
                      className="mt-1 w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                    >
                      <option value="None">없음</option>
                      <option value="React Query">React Query</option>
                      <option value="Zustand">Zustand</option>
                      <option value="Redux Toolkit">Redux Toolkit</option>
                    </select>
                    <p className="text-xs text-foreground/60 mt-1">
                      선택 시 쿼리/뮤테이션 훅, 캐시, 에러 핸들링 템플릿이 자동 생성됩니다
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-3">기능 요구사항</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <label className="flex items-center space-x-2 text-foreground">
                        <input
                          type="checkbox"
                          className="rounded accent-purple-600"
                          checked={featureRequirements.responsive}
                          onChange={(e) =>
                            setFeatureRequirements((prev) => ({ ...prev, responsive: e.target.checked }))
                          }
                        />
                        <span>반응형 디자인</span>
                      </label>
                      <label className="flex items-center space-x-2 text-foreground">
                        <input
                          type="checkbox"
                          className="rounded accent-purple-600"
                          checked={featureRequirements.accessibility}
                          onChange={(e) =>
                            setFeatureRequirements((prev) => ({ ...prev, accessibility: e.target.checked }))
                          }
                        />
                        <span>접근성 (A11y)</span>
                      </label>
                      <label className="flex items-center space-x-2 text-foreground">
                        <input
                          type="checkbox"
                          className="rounded accent-purple-600"
                          checked={featureRequirements.darkMode}
                          onChange={(e) => setFeatureRequirements((prev) => ({ ...prev, darkMode: e.target.checked }))}
                        />
                        <span>다크모드</span>
                      </label>
                      <label className="flex items-center space-x-2 text-foreground">
                        <input
                          type="checkbox"
                          className="rounded accent-purple-600"
                          checked={featureRequirements.i18n}
                          onChange={(e) => setFeatureRequirements((prev) => ({ ...prev, i18n: e.target.checked }))}
                        />
                        <span>국제화 (i18n)</span>
                      </label>
                      <label className="flex items-center space-x-2 text-foreground">
                        <input
                          type="checkbox"
                          className="rounded accent-purple-600"
                          checked={featureRequirements.formValidation}
                          onChange={(e) =>
                            setFeatureRequirements((prev) => ({ ...prev, formValidation: e.target.checked }))
                          }
                        />
                        <span>폼 검증</span>
                      </label>
                      <label className="flex items-center space-x-2 text-foreground">
                        <input
                          type="checkbox"
                          className="rounded accent-purple-600"
                          checked={featureRequirements.animations}
                          onChange={(e) =>
                            setFeatureRequirements((prev) => ({ ...prev, animations: e.target.checked }))
                          }
                        />
                        <span>애니메이션</span>
                      </label>
                    </div>
                  </div>

                  <Separator />
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <FileText className="h-4 w-4 text-purple-600" />
                      <h4 className="text-sm font-medium text-foreground">요구사항 파일 연동</h4>
                      <label className="flex items-center space-x-2 ml-auto">
                        <input
                          type="checkbox"
                          className="rounded accent-purple-600"
                          checked={useRequirementsFile}
                          onChange={(e) => setUseRequirementsFile(e.target.checked)}
                        />
                        <span className="text-xs text-foreground/70">요구사항 반영</span>
                      </label>
                    </div>
                    {useRequirementsFile && (
                      <div className="pl-6 border-l-2 border-purple-200 dark:border-purple-800">
                        <p className="text-xs text-foreground/60 mb-2">
                          이전 단계에서 정의된 요구사항 파일을 불러와서 FE 코드 생성에 반영합니다.
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 bg-transparent"
                          onClick={() => {
                            const requirementsContent = `# 프로젝트 요구사항 문서

## 기능 요구사항
- 사용자 인증 시스템
- 반응형 디자인
- 다크모드 지원
- 접근성 준수

## 기술 스택
- Frontend: React/Vue
- Styling: Tailwind CSS
- State Management: Zustand/Redux

## UI/UX 가이드라인
- 모던하고 깔끔한 디자인
- 직관적인 사용자 경험
- 빠른 로딩 속도
`
                            const blob = new Blob([requirementsContent], { type: "text/plain" })
                            const url = URL.createObjectURL(blob)
                            const a = document.createElement("a")
                            a.href = url
                            a.download = "requirements.txt"
                            document.body.appendChild(a)
                            a.click()
                            document.body.removeChild(a)
                            URL.revokeObjectURL(url)
                          }}
                        >
                          <FileText className="h-3 w-3 mr-1" />
                          요구사항 파일 다운로드
                        </Button>
                      </div>
                    )}
                  </div>

                  <Separator />
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Code className="h-4 w-4 text-purple-600" />
                      <h4 className="text-sm font-medium text-foreground">컴포넌트 라이브러리 선택</h4>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-medium text-foreground">사용할 컴포넌트 라이브러리</label>
                        <select
                          value={selectedComponents[0] || ""}
                          onChange={(e) => setSelectedComponents(e.target.value ? [e.target.value] : [])}
                          className="mt-1 w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm"
                        >
                          <option value="">선택하세요</option>
                          <option value="internal">사내 제작 컴포넌트</option>
                          <option value="shadcn">shadcn/ui</option>
                          <option value="radix">Radix UI</option>
                          <option value="antd">Ant Design</option>
                          <option value="mui">Material-UI</option>
                          <option value="chakra">Chakra UI</option>
                          <option value="mantine">Mantine</option>
                          <option value="headless">Headless UI</option>
                        </select>
                        <p className="text-xs text-foreground/60 mt-1">
                          선택한 라이브러리의 컴포넌트와 스타일이 코드 생성에 반영됩니다
                        </p>
                      </div>

                      {selectedComponents.length > 0 && (
                        <div className="p-3 bg-purple-50/50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-purple-600" />
                            <span className="text-sm font-medium text-foreground">
                              {selectedComponents[0] === "internal" && "사내 제작 컴포넌트"}
                              {selectedComponents[0] === "shadcn" && "shadcn/ui"}
                              {selectedComponents[0] === "radix" && "Radix UI"}
                              {selectedComponents[0] === "antd" && "Ant Design"}
                              {selectedComponents[0] === "mui" && "Material-UI"}
                              {selectedComponents[0] === "chakra" && "Chakra UI"}
                              {selectedComponents[0] === "mantine" && "Mantine"}
                              {selectedComponents[0] === "headless" && "Headless UI"}
                            </span>
                          </div>
                          <p className="text-xs text-foreground/60 mt-1">
                            해당 라이브러리의 컴포넌트 패턴과 스타일 가이드를 따라 코드가 생성됩니다
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <GitBranch className="h-4 w-4 text-purple-600" />
                      <h4 className="text-sm font-medium text-foreground">Git 저장소 연동</h4>
                      <label className="flex items-center space-x-2 ml-auto">
                        <input
                          type="checkbox"
                          className="rounded accent-purple-600"
                          checked={gitIntegration.enabled}
                          onChange={(e) => setGitIntegration((prev) => ({ ...prev, enabled: e.target.checked }))}
                        />
                        <span className="text-xs text-foreground/70">활성화</span>
                      </label>
                    </div>

                    {gitIntegration.enabled && (
                      <div className="space-y-3 pl-6 border-l-2 border-purple-200 dark:border-purple-800">
                        <div>
                          <label className="text-xs font-medium text-foreground">저장소 URL</label>
                          <Input
                            value={gitIntegration.repositoryUrl}
                            onChange={(e) => setGitIntegration((prev) => ({ ...prev, repositoryUrl: e.target.value }))}
                            className="mt-1 text-sm"
                            placeholder="https://github.com/username/repository.git"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-xs font-medium text-foreground">브랜치</label>
                            <Input
                              value={gitIntegration.branch}
                              onChange={(e) => setGitIntegration((prev) => ({ ...prev, branch: e.target.value }))}
                              className="mt-1 text-sm"
                              placeholder="main"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-foreground">태그 (선택)</label>
                            <Input
                              value={gitIntegration.tag}
                              onChange={(e) => setGitIntegration((prev) => ({ ...prev, tag: e.target.value }))}
                              className="mt-1 text-sm"
                              placeholder="v1.0.0"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-medium text-foreground">액세스 토큰 (Private 저장소)</label>
                          <Input
                            type="password"
                            value={gitIntegration.accessToken}
                            onChange={(e) => setGitIntegration((prev) => ({ ...prev, accessToken: e.target.value }))}
                            className="mt-1 text-sm"
                            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                          />
                          <p className="text-xs text-foreground/60 mt-1">Private 저장소 접근 시에만 필요합니다</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 h-full flex flex-col">
            <Card className="flex-1">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Upload className="h-5 w-5 text-purple-600" />
                  <h2 className="text-lg font-semibold text-foreground">프로젝트 파일 업로드</h2>
                </div>

                <Card
                  className="border-dashed border-2 border-purple-300 hover:border-purple-500 transition-colors cursor-pointer mb-4 bg-purple-50/50 dark:bg-purple-950/20"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <CardContent className="p-8 text-center">
                    <Upload className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                    <p className="text-sm font-medium text-foreground mb-2">
                      프로젝트 관련 파일을 드래그하거나 클릭하여 업로드
                    </p>
                    <div className="text-xs text-foreground/70 space-y-1">
                      <p>
                        <strong>디자인:</strong> Figma, Sketch, Adobe XD, PNG, JPG
                      </p>
                      <p>
                        <strong>문서:</strong> PDF, DOC, TXT, MD
                      </p>
                      <p>
                        <strong>코드:</strong> HTML, CSS, JS, Vue, React, TS
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">업로드된 파일 ({uploadedFiles.length}개)</h4>
                    <ScrollArea className="h-32 border border-border rounded-lg p-2">
                      {uploadedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 rounded text-sm hover:bg-muted text-foreground"
                        >
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-purple-600" />
                            <span>{file}</span>
                          </div>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                      ))}
                    </ScrollArea>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 border-purple-200 dark:border-purple-800 flex-shrink-0">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-foreground mb-2">프로젝트 생성 준비 완료</h3>
                <p className="text-sm text-foreground/80 mb-4">
                  {canCreateProject
                    ? "AI가 입력하신 정보를 바탕으로 고품질 코드를 생성합니다"
                    : "프로젝트명과 디자인 파일을 업로드해주세요"}
                </p>
                <Button
                  onClick={handleCreateProject}
                  disabled={!canCreateProject || isCreating}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-base"
                  size="lg"
                >
                  {isCreating ? (
                    <>
                      <Settings className="h-5 w-5 mr-2 animate-spin" />
                      AI 코드 생성 중...
                    </>
                  ) : (
                    <>
                      <ArrowRight className="h-5 w-5 mr-2" />
                      프로젝트 생성하기
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
