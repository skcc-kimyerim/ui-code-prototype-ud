"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Code, Plus, FolderOpen, Calendar, Trash2, Zap, GitBranch } from "lucide-react"

interface Project {
  id: string
  name: string
  framework: string
  styling: string
  createdAt: string
  lastModified: string
  status: "active" | "completed" | "draft"
  gitRepository?: {
    url: string
    branch: string
    tag?: string
    accessToken?: string
  }
}

export default function ProjectDashboard() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const savedProjects = localStorage.getItem("projects")
    if (savedProjects) {
      const existingProjects = JSON.parse(savedProjects)
      const updatedProjects = existingProjects.map((project: Project) => {
        if (!project.gitRepository) {
          return {
            ...project,
            gitRepository: {
              url: `https://github.com/user/${project.name.toLowerCase().replace(/\s+/g, "-")}`,
              branch: "main",
              tag: "v1.0.0",
            },
          }
        }
        return project
      })
      setProjects(updatedProjects)
      localStorage.setItem("projects", JSON.stringify(updatedProjects))
    } else {
      const sampleProjects: Project[] = [
        {
          id: "1",
          name: "E-commerce Dashboard",
          framework: "React",
          styling: "Tailwind CSS",
          createdAt: "2024-01-15",
          lastModified: "2024-01-20",
          status: "active",
          gitRepository: {
            url: "https://github.com/user/e-commerce-dashboard",
            branch: "main",
            tag: "v1.2.0",
          },
        },
        {
          id: "2",
          name: "Landing Page",
          framework: "Vue",
          styling: "SCSS",
          createdAt: "2024-01-10",
          lastModified: "2024-01-18",
          status: "completed",
          gitRepository: {
            url: "https://github.com/user/landing-page",
            branch: "develop",
            tag: "v2.1.0",
          },
        },
      ]
      setProjects(sampleProjects)
      localStorage.setItem("projects", JSON.stringify(sampleProjects))
    }
  }, [])

  const handleCreateNewProject = () => {
    router.push("/create")
  }

  const handleOpenProject = (project: Project) => {
    localStorage.setItem("currentProject", JSON.stringify(project))
    router.push("/result")
  }

  const handleDeleteProject = (projectId: string) => {
    const updatedProjects = projects.filter((p) => p.id !== projectId)
    setProjects(updatedProjects)
    localStorage.setItem("projects", JSON.stringify(updatedProjects))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30">
        <div className="flex h-14 items-center justify-between px-6">
          <div className="flex items-center space-x-3">
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
          <Button onClick={handleCreateNewProject} className="bg-purple-600 hover:bg-purple-700 text-white">
            <Plus className="h-4 w-4 mr-2" />새 프로젝트
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">프로젝트 대시보드</h1>
          <p className="text-foreground/80">AI로 생성된 프론트엔드 프로젝트들을 관리하세요</p>
        </div>

        {projects.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <FolderOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">프로젝트가 없습니다</h3>
              <p className="text-foreground/80 mb-4">첫 번째 AI 프로젝트를 생성해보세요</p>
              <Button onClick={handleCreateNewProject} className="bg-purple-600 hover:bg-purple-700 text-white">
                <Plus className="h-4 w-4 mr-2" />새 프로젝트 생성
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-1">{project.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-foreground/70">
                        <span>{project.framework}</span>
                        <span>•</span>
                        <span>{project.styling}</span>
                      </div>
                    </div>
                    <Badge className={`text-xs ${getStatusColor(project.status)}`}>{project.status}</Badge>
                  </div>

                  {project.gitRepository && (
                    <div className="flex items-center text-xs text-foreground/60 mb-2">
                      <GitBranch className="h-3 w-3 mr-1" />
                      <span className="truncate">{project.gitRepository.branch}</span>
                      {project.gitRepository.tag && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{project.gitRepository.tag}</span>
                        </>
                      )}
                    </div>
                  )}

                  <div className="flex items-center text-xs text-foreground/60 mb-4">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>생성: {new Date(project.createdAt).toLocaleDateString("ko-KR")}</span>
                    <span className="mx-2">•</span>
                    <span>수정: {new Date(project.lastModified).toLocaleDateString("ko-KR")}</span>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleOpenProject(project)}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                      size="sm"
                    >
                      <FolderOpen className="h-4 w-4 mr-2" />
                      열기
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteProject(project.id)
                      }}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
