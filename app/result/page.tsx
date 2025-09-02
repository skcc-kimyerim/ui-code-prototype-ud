"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Terminal,
  Monitor,
  Tablet,
  Smartphone,
  RefreshCw,
  AlertTriangle,
  ArrowLeft,
  Code,
  GitBranch,
  Save,
  Download,
  MessageSquare,
  Plus,
  Tag,
  ChevronUp,
  History,
  Search,
  X,
  Shield,
  Globe,
  Zap,
  ChevronRight,
  Folder,
} from "lucide-react"
import Editor from "@/components/editor"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ResultPage() {
  const router = useRouter()
  const [inspectionTab, setInspectionTab] = useState<"overview" | "accessibility" | "i18n" | "performance">("overview")
  const [projectData, setProjectData] = useState<any>(null)
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [generatedCode, setGeneratedCode] = useState("")
  const [previewDevice, setPreviewDevice] = useState("desktop")
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [errorLogs, setErrorLogs] = useState<
    Array<{ timestamp: string; level: "error" | "warning" | "info"; message: string }>
  >([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [currentBranch, setCurrentBranch] = useState("main")
  const [branches, setBranches] = useState(["main", "develop", "feature/ui-updates"])
  const [currentTag, setCurrentTag] = useState("v1.0.0")
  const [tags, setTags] = useState(["v1.0.0", "v0.9.0", "v0.8.1"])
  const [showTagDropdown, setShowTagDropdown] = useState(false)
  const [newTagName, setNewTagName] = useState("")
  const [showNewTagInput, setShowNewTagInput] = useState(false)
  const [showVersionSidebar, setShowVersionSidebar] = useState(false)
  const [codeVersions, setCodeVersions] = useState([
    { id: 1, timestamp: new Date(Date.now() - 3600000), description: "초기 코드 생성", code: generatedCode },
    { id: 2, timestamp: new Date(Date.now() - 1800000), description: "버튼 스타일 수정", code: generatedCode },
    { id: 3, timestamp: new Date(Date.now() - 900000), description: "레이아웃 개선", code: generatedCode },
  ])
  const [selectedVersion, setSelectedVersion] = useState(codeVersions[codeVersions.length - 1])
  const [gitStatus, setGitStatus] = useState("clean")
  const [showBranchDropdown, setShowBranchDropdown] = useState(false) // Declare the variable
  const [showInspectionModal, setShowInspectionModal] = useState(false)

  const [projectFiles, setProjectFiles] = useState<{ [key: string]: string }>({
    "src/App.tsx": generatedCode,
    "src/components/LoginForm.tsx": "",
    "src/components/Button.tsx": "",
    "src/styles/globals.css": "",
    "package.json": JSON.stringify(
      {
        name: projectData?.name || "ui-code-project",
        version: "1.0.0",
        dependencies: {
          react: "^18.0.0",
          "react-dom": "^18.0.0",
        },
      },
      null,
      2,
    ),
    "README.md": `# ${projectData?.name || "UI Code Project"}\n\n자동 생성된 React 프로젝트입니다.`,
  })
  const [selectedFile, setSelectedFile] = useState("src/App.tsx")
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["src", "src/components"]))

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith(".tsx") || fileName.endsWith(".jsx")) return "⚛️"
    if (fileName.endsWith(".ts") || fileName.endsWith(".js")) return "📄"
    if (fileName.endsWith(".css") || fileName.endsWith(".scss")) return "🎨"
    if (fileName.endsWith(".json")) return "⚙️"
    if (fileName.endsWith(".md")) return "📝"
    return "📄"
  }

  const buildFileTree = (files: { [key: string]: string }) => {
    const tree: any = {}
    Object.keys(files).forEach((filePath) => {
      const parts = filePath.split("/")
      let current = tree
      parts.forEach((part, index) => {
        if (index === parts.length - 1) {
          current[part] = { type: "file", path: filePath }
        } else {
          if (!current[part]) current[part] = { type: "folder", children: {} }
          current = current[part].children
        }
      })
    })
    return tree
  }

  const renderFileTree = (tree: any, path = "") => {
    return Object.entries(tree).map(([name, node]: [string, any]) => {
      const fullPath = path ? `${path}/${name}` : name

      if (node.type === "file") {
        return (
          <div
            key={node.path}
            className={`flex items-center px-2 py-1 text-sm cursor-pointer hover:bg-accent rounded ${
              selectedFile === node.path ? "bg-purple-100 dark:bg-purple-900" : ""
            }`}
            style={{ paddingLeft: `${(path.split("/").length) * 12 + 8}px` }}
            onClick={() => {
              setSelectedFile(node.path)
              setGeneratedCode(projectFiles[node.path] || "")
            }}
          >
            <span className="mr-2">{getFileIcon(name)}</span>
            <span className="text-foreground">{name}</span>
          </div>
        )
      } else {
        const isExpanded = expandedFolders.has(fullPath)
        return (
          <div key={fullPath}>
            <div
              className="flex items-center px-2 py-1 text-sm cursor-pointer hover:bg-accent rounded"
              style={{ paddingLeft: `${(path.split("/").length) * 12 + 8}px` }}
              onClick={() => {
                const newExpanded = new Set(expandedFolders)
                if (isExpanded) {
                  newExpanded.delete(fullPath)
                } else {
                  newExpanded.add(fullPath)
                }
                setExpandedFolders(newExpanded)
              }}
            >
              <ChevronRight className={`h-4 w-4 mr-1 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
              <Folder className="h-4 w-4 mr-2 text-blue-500" />
              <span className="text-foreground">{name}</span>
            </div>
            {isExpanded && renderFileTree(node.children, fullPath)}
          </div>
        )
      }
    })
  }

  useEffect(() => {
    const storedProject = localStorage.getItem("currentProject")
    if (storedProject) {
      const project = JSON.parse(storedProject)
      setProjectData(project)
      setGeneratedCode(generateInitialCode(project.framework, project.styling))
    } else {
      router.push("/")
    }
  }, [router])

  useEffect(() => {
    if (generatedCode && generatedCode !== selectedVersion.code) {
      const newVersion = {
        id: codeVersions.length + 1,
        timestamp: new Date(),
        description: "자동 저장",
        code: generatedCode,
      }
      setCodeVersions((prev) => [...prev, newVersion])
      setSelectedVersion(newVersion)
    }
  }, [generatedCode])

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
        ].join("\n")
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
        ].join("\n")
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
}`
    }
  }

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
      ].join("\n")
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
}`
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setIsGenerating(true)
    setHasError(false)
    setErrorMessage("")

    const shouldSimulateError = Math.random() < 0.2 // 20% chance of error for demo

    setTimeout(() => {
      const message = input.toLowerCase()
      let response = ""
      let newCode = generatedCode

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
        ]

        const randomError = errorTypes[Math.floor(Math.random() * errorTypes.length)]
        setHasError(true)
        setErrorMessage(randomError.message)
        setErrorLogs((prev) => [
          ...prev,
          {
            timestamp: new Date().toLocaleTimeString(),
            level: "error" | "warning" | "info",
            message: randomError.log,
          },
        ])

        response = `죄송합니다. 코드 생성 중 오류가 발생했습니다: ${randomError.message} 오류 로그를 확인하고 다시 시도해주세요.`
      } else {
        if (
          message.includes("새로운") ||
          message.includes("새") ||
          message.includes("만들어") ||
          message.includes("생성")
        ) {
          if (message.includes("로그인") || message.includes("login")) {
            response =
              "새로운 로그인 폼 컴포넌트를 생성했습니다. 이메일과 비밀번호 입력 필드, 로그인 버튼이 포함되어 있습니다."
            newCode = generateLoginForm(projectData.framework, projectData.styling)
          } else {
            response = "새로운 컴포넌트를 생성했습니다. 요청하신 내용을 반영하여 구성했습니다."
          }
        } else if (message.includes("색상") || message.includes("컬러")) {
          if (message.includes("파란") || message.includes("blue")) {
            response = "버튼 색상을 파란색으로 변경했습니다."
            if (projectData.framework === "Vue") {
              newCode = generatedCode
                .replace(/background-color: #7c3aed/g, "background-color: #2563eb")
                .replace(/&:hover {\s*background-color: #6d28d9/g, "&:hover {\n      background-color: #1d4ed8")
                .replace(/bg-purple-600/g, "bg-blue-600")
                .replace(/hover:bg-purple-700/g, "hover:bg-blue-700")
            } else {
              newCode = generatedCode
                .replace(/bg-purple-600/g, "bg-blue-600")
                .replace(/hover:bg-purple-700/g, "hover:bg-blue-700")
            }
          } else {
            response = "색상을 변경했습니다."
          }
        } else {
          response = "요청하신 내용을 반영하여 코드를 수정했습니다. 변경사항을 확인해보세요."
        }

        setErrorLogs((prev) => [
          ...prev,
          {
            timestamp: new Date().toLocaleTimeString(),
            level: "info",
            message: `코드 생성 완료: ${message}`,
          },
        ])
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }])
      if (!shouldSimulateError) {
        setGeneratedCode(newCode)
      }
      setIsLoading(false)
      setIsGenerating(false)
    }, 1500)
  }

  const handleRetry = () => {
    if (messages.length > 0) {
      const lastUserMessage = messages.filter((m) => m.role === "user").pop()
      if (lastUserMessage) {
        setInput(lastUserMessage.content)
        setHasError(false)
        setErrorMessage("")
      }
    }
  }

  const handleClearLogs = () => {
    setErrorLogs([])
  }

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
      ].join("\n")
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
      ].join("\n")
    }
  }

  const getEditorLanguage = (framework: string) => {
    switch (framework) {
      case "Vue":
        return "html" // Vue SFC files are HTML-like
      case "React":
      default:
        return "typescript"
    }
  }

  const handleCodeChange = (value: string | undefined) => {
    const newCode = value || ""
    setGeneratedCode(newCode)
    setProjectFiles((prev) => ({
      ...prev,
      [selectedFile]: newCode,
    }))

    // Auto-save version
    const newVersion = {
      id: codeVersions.length + 1,
      code: newCode,
      timestamp: new Date(),
      description: `${selectedFile} 수정됨`,
    }
    setCodeVersions((prev) => [...prev, newVersion])
    setSelectedVersion(newVersion)
  }

  const handleSave = () => {
    alert("Project saved successfully!")
  }

  const handleExport = () => {
    const blob = new Blob([generatedCode], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${projectData?.projectName || "component"}.tsx`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleBranchSwitch = (branchName: string) => {
    setCurrentBranch(branchName)
    setShowBranchDropdown(false)
    // Simulate loading different branch content
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      addLog("info", `브랜치 '${branchName}'로 전환되었습니다.`)
    }, 1000)
  }

  const handleCreateBranch = () => {
    const newBranchName = "new-branch" // Placeholder for new branch name
    if (newBranchName.trim()) {
      setBranches([...branches, newBranchName])
      setCurrentBranch(newBranchName)
      addLog("info", `새 브랜치 '${newBranchName}'가 생성되었습니다.`)
    }
  }

  const handleTagSwitch = (tagName: string) => {
    setCurrentTag(tagName)
    setShowTagDropdown(false)
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      addLog("info", `태그 '${tagName}'로 전환되었습니다.`)
    }, 1000)
  }

  const handleCreateTag = () => {
    if (newTagName.trim()) {
      setTags([newTagName, ...tags])
      setCurrentTag(newTagName)
      setNewTagName("")
      setShowNewTagInput(false)
      setShowTagDropdown(false)
      addLog("info", `새 태그 '${newTagName}'가 생성되었습니다.`)
    }
  }

  const handleCommitAndPush = () => {
    setGitStatus("clean")
    addLog("info", "변경사항이 커밋되고 푸시되었습니다.")
  }

  const getGitStatusColor = () => {
    switch (gitStatus) {
      case "clean":
        return "text-green-600"
      case "modified":
        return "text-yellow-600"
      case "staged":
        return "text-blue-600"
      case "conflict":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getGitStatusText = () => {
    switch (gitStatus) {
      case "clean":
        return "변경사항 없음"
      case "modified":
        return "수정됨"
      case "staged":
        return "스테이징됨"
      case "conflict":
        return "충돌"
      default:
        return "알 수 없음"
    }
  }

  const addLog = (level: "error" | "warning" | "info", message: string) => {
    setErrorLogs((prev) => [
      ...prev,
      {
        timestamp: new Date().toLocaleTimeString(),
        level,
        message,
      },
    ])
  }

  const handleVersionRevert = (version: any) => {
    setGeneratedCode(version.code)
    setSelectedVersion(version)
    addLog("info", `버전 ${version.id}로 롤백했습니다: ${version.description}`)
  }

  if (!projectData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-purple-600" />
          <p className="text-foreground">프로젝트 로딩 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30 sticky top-0 z-50">
        <div className="flex h-14 items-center justify-between px-6">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/")}
              className="text-foreground hover:text-purple-600"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />새 프로젝트
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                <Code className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-foreground">{projectData.projectName}</span>
            </div>
            <Badge
              variant="secondary"
              className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
            >
              <GitBranch className="h-3 w-3 mr-1" />
              {projectData.framework} + {projectData.styling}
            </Badge>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setShowInspectionModal(true)}>
              <Search className="h-4 w-4 mr-2" />
              검사
            </Button>
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              저장
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              내보내기
            </Button>
          </div>
        </div>
      </header>

      <div className="h-[calc(100vh-3.5rem)] flex">
        <div
          className={`${showVersionSidebar ? "w-80" : "w-16"} transition-all duration-300 border-r border-border bg-card/50 flex flex-col overflow-hidden`}
        >
          <div className="p-2 border-b border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowVersionSidebar(!showVersionSidebar)}
              className="w-full justify-start text-foreground hover:text-purple-600"
            >
              <GitBranch className="h-4 w-4 flex-shrink-0" />
              {showVersionSidebar && <span className="ml-2">버전 관리</span>}
            </Button>
          </div>

          {showVersionSidebar ? (
            <div className="flex-1 flex flex-col overflow-hidden">
              <Tabs defaultValue="branches" className="flex-1 flex flex-col">
                <TabsList className="grid w-full grid-cols-3 m-2">
                  <TabsTrigger value="branches" className="text-xs">
                    브랜치
                  </TabsTrigger>
                  <TabsTrigger value="tags" className="text-xs">
                    태그
                  </TabsTrigger>
                  <TabsTrigger value="versions" className="text-xs">
                    버전
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="branches" className="flex-1 p-2 space-y-2">
                  <div className="text-xs text-muted-foreground mb-2">현재 브랜치</div>
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded text-sm">
                    <GitBranch className="h-4 w-4 inline mr-2" />
                    {currentBranch}
                  </div>

                  <div className="text-xs text-muted-foreground mb-2">브랜치 목록</div>
                  <ScrollArea className="flex-1">
                    {branches.map((branch) => (
                      <Button
                        key={branch}
                        variant="ghost"
                        size="sm"
                        className={`w-full justify-start mb-1 ${
                          branch === currentBranch ? "bg-purple-100 dark:bg-purple-900" : ""
                        }`}
                        onClick={() => handleBranchSwitch(branch)}
                      >
                        <GitBranch className="h-4 w-4 mr-2" />
                        {branch}
                      </Button>
                    ))}
                  </ScrollArea>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                    onClick={() => handleCreateBranch()}
                  >
                    <Plus className="h-4 w-4 mr-2" />새 브랜치
                  </Button>
                </TabsContent>

                <TabsContent value="tags" className="flex-1 p-2 space-y-2">
                  <div className="text-xs text-muted-foreground mb-2">현재 태그</div>
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded text-sm">
                    <Tag className="h-4 w-4 inline mr-2" />
                    {currentTag}
                  </div>

                  <div className="text-xs text-muted-foreground mb-2">태그 목록</div>
                  <ScrollArea className="flex-1">
                    {tags.map((tag) => (
                      <Button
                        key={tag}
                        variant="ghost"
                        size="sm"
                        className={`w-full justify-start mb-1 ${
                          tag === currentTag ? "bg-purple-100 dark:bg-purple-900" : ""
                        }`}
                        onClick={() => handleTagSwitch(tag)}
                      >
                        <Tag className="h-4 w-4 mr-2" />
                        {tag}
                      </Button>
                    ))}
                  </ScrollArea>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                    onClick={() => handleCreateTag()}
                  >
                    <Plus className="h-4 w-4 mr-2" />새 태그
                  </Button>
                </TabsContent>

                <TabsContent value="versions" className="flex-1 p-2 space-y-2">
                  <div className="text-xs text-muted-foreground mb-2">코드 변경 내역</div>
                  <ScrollArea className="flex-1">
                    {codeVersions
                      .slice()
                      .reverse()
                      .map((version) => (
                        <div
                          key={version.id}
                          className={`p-2 mb-2 rounded border cursor-pointer hover:bg-accent ${
                            version.id === selectedVersion.id
                              ? "bg-purple-100 dark:bg-purple-900 border-purple-300"
                              : ""
                          }`}
                          onClick={() => handleVersionRevert(version)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium">v{version.id}</span>
                            <span className="text-xs text-muted-foreground">
                              {version.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-xs text-foreground/80">{version.description}</p>
                          {version.id === selectedVersion.id && (
                            <Badge variant="secondary" className="text-xs mt-1">
                              현재
                            </Badge>
                          )}
                        </div>
                      ))}
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="flex-1 flex flex-col py-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full h-12 flex flex-col items-center justify-center text-xs text-foreground hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 mb-1"
                onClick={() => setShowVersionSidebar(true)}
              >
                <GitBranch className="h-4 w-4 mb-1" />
                <span className="text-[10px] leading-none">브랜치</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full h-12 flex flex-col items-center justify-center text-xs text-foreground hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 mb-1"
                onClick={() => setShowVersionSidebar(true)}
              >
                <Tag className="h-4 w-4 mb-1" />
                <span className="text-[10px] leading-none">태그</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full h-12 flex flex-col items-center justify-center text-xs text-foreground hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                onClick={() => setShowVersionSidebar(true)}
              >
                <History className="h-4 w-4 mb-1" />
                <span className="text-[10px] leading-none">버전</span>
              </Button>
            </div>
          )}
        </div>
        <div className="w-80 border-r border-border bg-card/50 flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-2 mb-3">
              <MessageSquare className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold text-foreground">AI 채팅</h3>
            </div>
            <p className="text-xs text-foreground/70">코드를 생성하고 수정하세요</p>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 mx-auto mb-3 text-purple-400" />
                  <p className="text-sm mb-2 text-foreground">AI와 채팅하여 코드를 수정하고 개선하세요</p>
                  <div className="text-xs text-foreground/80 space-y-1">
                    <p>예시: "버튼을 더 크게 만들고 색상을 변경해줘"</p>
                    <p>예시: "새로운 대시보드 컴포넌트 만들어줘"</p>
                  </div>
                </div>
              )}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-purple-600 text-white ml-4"
                      : "bg-background text-foreground border border-border"
                  }`}
                >
                  {message.role !== "user" && <p className="text-xs text-muted-foreground mb-1">AI 어시스턴트</p>}
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              ))}
              {isLoading && (
                <div className="bg-background text-foreground p-3 rounded-lg border border-border">
                  <p className="text-xs text-muted-foreground mb-1">AI 어시스턴트</p>
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="h-4 w-4 animate-spin text-purple-600" />
                    <p className="text-sm">생각하는 중...</p>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-border">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                placeholder="코드 수정 요청..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white"
                disabled={isLoading}
              >
                <Terminal className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="border-b border-border p-4 bg-card/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <h2 className="text-lg font-semibold text-foreground">생성 결과</h2>
                {hasError && (
                  <Badge variant="destructive" className="text-xs">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    생성 실패
                  </Badge>
                )}
                {!hasError && isGenerating && (
                  <Badge
                    variant="secondary"
                    className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  >
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    생성 중...
                  </Badge>
                )}
                {!hasError && !isGenerating && (
                  <Badge variant="outline" className="text-xs border-purple-300 text-purple-700 dark:text-purple-300">
                    <Terminal className="h-4 w-4 mr-2" />
                    생성 완료
                  </Badge>
                )}
              </div>
              {hasError && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRetry}
                  className="text-red-600 border-red-300 hover:bg-red-50 bg-transparent"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  다시 시도
                </Button>
              )}
            </div>
            {hasError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-800">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-red-800 dark:text-red-200">코드 생성 실패</h4>
                    <p className="text-sm text-red-700 dark:text-red-300 mt-1">{errorMessage}</p>
                  </div>
                </div>
              </div>
            )}
            <Tabs defaultValue="code" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-muted/50 p-1 rounded-lg">
                <TabsTrigger
                  value="code"
                  className="flex items-center justify-center px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:border-l-2 data-[state=active]:border-purple-500 data-[state=active]:shadow-sm hover:bg-muted/80"
                >
                  <Terminal className="h-4 w-4 mr-2" />
                  생성된 코드
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  className="flex items-center justify-center px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:border-l-2 data-[state=active]:border-purple-500 data-[state=active]:shadow-sm hover:bg-muted/80"
                >
                  <Monitor className="h-4 w-4 mr-2" />
                  라이브 미리보기
                </TabsTrigger>
              </TabsList>

              <TabsContent value="code" className="mt-4">
                <div className="flex h-[calc(100vh-12rem)]">
                  <div className="w-64 border-r border-border bg-card/30 flex flex-col">
                    <div className="p-3 border-b border-border">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-foreground">파일 탐색기</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const fileName = prompt("새 파일명을 입력하세요 (예: src/components/NewComponent.tsx)")
                            if (fileName) {
                              setProjectFiles((prev) => ({
                                ...prev,
                                [fileName]: "// 새 파일\n",
                              }))
                            }
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <ScrollArea className="flex-1 p-2">{renderFileTree(buildFileTree(projectFiles))}</ScrollArea>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <div className="p-2 border-b border-border bg-card/50">
                      <div className="flex items-center">
                        <span className="mr-2">{getFileIcon(selectedFile)}</span>
                        <span className="text-sm font-medium text-foreground">{selectedFile}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <Editor
                        height="100%"
                        language={getEditorLanguage(projectData?.framework || "React")}
                        value={generatedCode}
                        onChange={handleCodeChange}
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

              <TabsContent value="preview" className="mt-4">
                <div
                  className={`border border-border rounded-lg bg-background p-4 ${
                    isTerminalOpen ? "h-[calc(100vh-20rem)]" : "h-[calc(100vh-12rem)]"
                  }`}
                >
                  <div className="flex items-center justify-center mb-4 space-x-2">
                    <Button
                      variant={previewDevice === "desktop" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewDevice("desktop")}
                      className={previewDevice === "desktop" ? "bg-purple-600 hover:bg-purple-700 text-white" : ""}
                    >
                      <Monitor className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={previewDevice === "tablet" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewDevice("tablet")}
                      className={previewDevice === "tablet" ? "bg-purple-600 hover:bg-purple-700 text-white" : ""}
                    >
                      <Tablet className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={previewDevice === "mobile" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewDevice("mobile")}
                      className={previewDevice === "mobile" ? "bg-purple-600 hover:bg-purple-700 text-white" : ""}
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
                            <h3 className="text-lg font-semibold mb-2 text-card-foreground">Welcome</h3>
                            <p className="text-card-foreground mb-4">
                              This is your generated component based on the uploaded design.
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
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-purple-200 dark:border-purple-800 bg-card shadow-lg">
        <div
          className={`flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-card/70 transition-colors ${
            errorLogs.some((log) => log.level === "error")
              ? "bg-red-50 dark:bg-red-900/20"
              : "bg-purple-50 dark:bg-purple-900/20"
          }`}
          onClick={() => setIsTerminalOpen(!isTerminalOpen)}
        >
          <div className="flex items-center space-x-3">
            <Terminal
              className={`h-5 w-5 ${
                errorLogs.some((log) => log.level === "error") ? "text-red-500" : "text-purple-600"
              }`}
            />
            <span className="text-sm font-semibold text-foreground">터미널 ({errorLogs.length})</span>
            {errorLogs.some((log) => log.level === "error") && (
              <Badge variant="destructive" className="text-xs">
                <AlertTriangle className="h-3 w-3 mr-1" />
                오류 {errorLogs.filter((log) => log.level === "error").length}개
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                handleClearLogs()
              }}
              className="text-xs h-7 px-3 hover:bg-purple-100 dark:hover:bg-purple-900/30"
            >
              지우기
            </Button>
            <div className={`transform transition-transform text-purple-600 ${isTerminalOpen ? "rotate-180" : ""}`}>
              <ChevronUp className="h-4 w-4" />
            </div>
          </div>
        </div>
        {isTerminalOpen && (
          <div className="h-64 border-t border-border bg-gray-950 text-gray-100">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-1">
                {errorLogs.length === 0 ? (
                  <div className="text-center py-12">
                    <Terminal className="h-10 w-10 mx-auto mb-3 text-gray-500" />
                    <p className="text-sm text-gray-400">터미널 로그가 없습니다</p>
                    <p className="text-xs text-gray-500 mt-1">코드 생성 및 수정 시 로그가 여기에 표시됩니다</p>
                  </div>
                ) : (
                  errorLogs.map((log, index) => (
                    <div
                      key={index}
                      className="text-xs font-mono flex items-start space-x-2 py-1 hover:bg-gray-800/50 px-2 rounded"
                    >
                      <span className="text-gray-500 shrink-0 w-16">[{log.timestamp}]</span>
                      <span
                        className={`shrink-0 font-semibold w-12 ${
                          log.level === "error"
                            ? "text-red-400"
                            : log.level === "warning"
                              ? "text-yellow-400"
                              : "text-blue-400"
                        }`}
                      >
                        {log.level === "error" ? "ERROR" : log.level === "warning" ? "WARN" : "INFO"}
                      </span>
                      <span className="text-gray-200 flex-1">{log.message}</span>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>

      {showInspectionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-semibold text-foreground">코드 검사</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowInspectionModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="border-b border-border">
              <div className="flex space-x-1 p-2">
                <Button
                  variant={inspectionTab === "overview" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setInspectionTab("overview")}
                  className={inspectionTab === "overview" ? "bg-purple-600 text-white" : ""}
                >
                  전체 검사
                </Button>
                <Button
                  variant={inspectionTab === "accessibility" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setInspectionTab("accessibility")}
                  className={inspectionTab === "accessibility" ? "bg-purple-600 text-white" : ""}
                >
                  접근성 검사
                </Button>
                <Button
                  variant={inspectionTab === "i18n" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setInspectionTab("i18n")}
                  className={inspectionTab === "i18n" ? "bg-purple-600 text-white" : ""}
                >
                  국제화 (i18n)
                </Button>
                <Button
                  variant={inspectionTab === "performance" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setInspectionTab("performance")}
                  className={inspectionTab === "performance" ? "bg-purple-600 text-white" : ""}
                >
                  성능 최적화
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
              {inspectionTab === "overview" && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-foreground">코드 구문 검사 완료</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-foreground">타입 검사 통과</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-foreground">성능 최적화 권장사항 1개</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-foreground">접근성 검사 완료</span>
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4 bg-muted/50">
                    <h3 className="font-medium text-foreground mb-2">검사 결과 요약</h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>• 총 라인 수: 156줄</p>
                      <p>• 오류: 0개</p>
                      <p>• 경고: 1개</p>
                      <p>• 정보: 3개</p>
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-2 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                      권장사항
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      컴포넌트 렌더링 최적화를 위해 React.memo 사용을 고려해보세요.
                    </p>
                  </div>
                </div>
              )}

              {inspectionTab === "accessibility" && (
                <div className="space-y-4">
                  <div className="border border-border rounded-lg p-4 bg-muted/50">
                    <h3 className="font-medium text-foreground mb-3 flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-blue-500" />
                      접근성 검사 결과
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-foreground">ARIA 라벨 검사 통과</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-foreground">키보드 탐색 지원 확인</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-foreground">포커스 관리 개선 필요</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-foreground">색상 대비 검사 통과</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-3">Axe 자동 검사 스크립트</h3>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono overflow-x-auto">
                      <pre>{`// Axe 접근성 검사 스크립트
import axe from '@axe-core/react';

if (process.env.NODE_ENV !== 'production') {
  axe(React, ReactDOM, 1000);
}

// 수동 검사 실행
axe.run().then(results => {
  console.log('접근성 검사 결과:', results);
});`}</pre>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      스크립트 복사
                    </Button>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-2 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                      접근성 개선 권장사항
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 모달 다이얼로그에 focus trap 구현 필요</li>
                      <li>• 버튼에 aria-label 추가 권장</li>
                      <li>• 키보드 탐색 순서 최적화 필요</li>
                    </ul>
                  </div>
                </div>
              )}

              {inspectionTab === "i18n" && (
                <div className="space-y-4">
                  <div className="border border-border rounded-lg p-4 bg-muted/50">
                    <h3 className="font-medium text-foreground mb-3 flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-green-500" />
                      국제화 분석 결과
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-foreground">추출된 문자열: 23개</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-foreground">하드코딩된 텍스트 발견</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-foreground">i18n 설정 필요</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-3">생성된 i18n JSON</h3>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono overflow-x-auto max-h-40 overflow-y-auto">
                      <pre>{`{
  "ko": {
    "common": {
      "save": "저장",
      "cancel": "취소",
      "confirm": "확인",
      "close": "닫기"
    },
    "navigation": {
      "home": "홈",
      "about": "소개",
      "contact": "연락처"
    },
    "form": {
      "email": "이메일",
      "password": "비밀번호",
      "login": "로그인"
    }
  },
  "en": {
    "common": {
      "save": "Save",
      "cancel": "Cancel", 
      "confirm": "Confirm",
      "close": "Close"
    },
    "navigation": {
      "home": "Home",
      "about": "About",
      "contact": "Contact"
    },
    "form": {
      "email": "Email",
      "password": "Password",
      "login": "Login"
    }
  }
}`}</pre>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      JSON 다운로드
                    </Button>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-3">언어 스위치 훅/HOC</h3>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono overflow-x-auto">
                      <pre>{`// useTranslation 훅
import { useTranslation } from 'react-i18next';

export const useI18n = () => {
  const { t, i18n } = useTranslation();
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
  return { t, changeLanguage, currentLang: i18n.language };
};

// 사용 예시
const { t, changeLanguage } = useI18n();
return <button onClick={() => changeLanguage('en')}>{t('common.save')}</button>;`}</pre>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      코드 복사
                    </Button>
                  </div>
                </div>
              )}

              {inspectionTab === "performance" && (
                <div className="space-y-4">
                  <div className="border border-border rounded-lg p-4 bg-muted/50">
                    <h3 className="font-medium text-foreground mb-3 flex items-center">
                      <Zap className="h-4 w-4 mr-2 text-orange-500" />
                      성능 최적화 분석 결과
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-foreground">코드 스플리팅 적용 가능</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-foreground">이미지 최적화 필요 (3개 파일)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-foreground">LCP: 2.1초 (양호)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-foreground">INP: 180ms (우수)</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-3">코드 스플리팅 설정</h3>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono overflow-x-auto">
                      <pre>{`// Next.js 동적 임포트
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

// React.lazy 사용
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// 사용 예시
<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>`}</pre>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      코드 복사
                    </Button>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-3">이미지 최적화 스크립트</h3>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono overflow-x-auto">
                      <pre>{`// Next.js Image 컴포넌트 최적화
import Image from 'next/image';

<Image
  src="/hero-image.jpg"
  alt="Hero Image"
  width={800}
  height={600}
  priority={true}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>

// 이미지 압축 스크립트 (build 시)
const sharp = require('sharp');

sharp('input.jpg')
  .resize(800, 600)
  .webp({ quality: 80 })
  .toFile('output.webp');`}</pre>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      스크립트 복사
                    </Button>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-3">LCP/INP 체크 스크립트</h3>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono overflow-x-auto">
                      <pre>{`// Web Vitals 측정 스크립트
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  console.log('Performance metric:', metric);
  // 분석 서비스로 전송
}

// Core Web Vitals 측정
getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);

// INP 측정 (실험적)
import { onINP } from 'web-vitals/attribution';
onINP(sendToAnalytics);`}</pre>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      스크립트 복사
                    </Button>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-2 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                      성능 최적화 권장사항
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 큰 이미지 파일들을 WebP 형식으로 변환 권장</li>
                      <li>• 무거운 컴포넌트에 React.memo 적용 고려</li>
                      <li>• 번들 크기 분석 후 불필요한 라이브러리 제거</li>
                      <li>• 폰트 로딩 최적화 (font-display: swap)</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2 p-6 border-t border-border">
              <Button variant="outline" onClick={() => setShowInspectionModal(false)}>
                닫기
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                {inspectionTab === "accessibility"
                  ? "Axe 보고서 다운로드"
                  : inspectionTab === "i18n"
                    ? "i18n 파일 다운로드"
                    : inspectionTab === "performance"
                      ? "성능 최적화 가이드 다운로드"
                      : "상세 보고서 다운로드"}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="h-16"></div>
    </div>
  )
}
