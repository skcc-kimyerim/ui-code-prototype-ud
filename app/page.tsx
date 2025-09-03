"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectCreationPanel } from "@/components/project-creation-panel";
import { ActivityPanel } from "@/components/activity-panel";
import Header from "@/components/header";

import {
  Plus,
  FolderOpen,
  Calendar,
  Trash2,
  GitBranch,
  Search,
} from "lucide-react";

// 각 프로젝트의 output을 어떤 단위로 생성할지
// 하나의 페이지를 만들도록 시킬 수도 있을 것 같음,,
// 원하는대로 개발되었는지 체크할 수 있게 끔 (기획자랑 디자이너)
// 프론트엔드 코드에 대한 품질 검사
//

// 요구사항 매핑하는 화면(화면 배치, 사이트 이름 - menu, ,etc) -> ui-mockup 이전에
// 위는 다대다 관계가 될 것 같음
// 코드는 숨기고 미리보기 화면만 보여줌
// selector로 수정할 수 있게끔 여기서 editing
//

interface Project {
  id: string;
  name: string;
  framework: string;
  styling: string;
  createdAt: string;
  lastModified: string;
  status: "active" | "completed" | "draft";
  gitRepository?: {
    url: string;
    branch: string;
    tag?: string;
    accessToken?: string;
  };
}

export default function ProjectDashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const savedProjects = localStorage.getItem("projects");
    if (savedProjects) {
      const existingProjects = JSON.parse(savedProjects);
      const updatedProjects = existingProjects.map((project: Project) => {
        if (!project.gitRepository) {
          return {
            ...project,
            gitRepository: {
              url: `https://github.com/user/${project.name
                .toLowerCase()
                .replace(/\s+/g, "-")}`,
              branch: "main",
              tag: "v1.0.0",
            },
          };
        }
        return project;
      });
      setProjects(updatedProjects);
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
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
      ];
      setProjects(sampleProjects);
      localStorage.setItem("projects", JSON.stringify(sampleProjects));
    }
  }, []);

  const handleCreateNewProject = () => {
    // 이제 create 페이지는 메인 페이지로 리다이렉트하므로 별도 동작 필요 없음
    // 왼쪽 패널에서 직접 프로젝트 생성 가능
  };

  const handleOpenProject = (project: Project) => {
    localStorage.setItem("currentProject", JSON.stringify(project));
    router.push("/result");
  };

  const handleDeleteProject = (projectId: string) => {
    const updatedProjects = projects.filter((p) => p.id !== projectId);
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      {/* Three Panel Layout */}
      <div className="flex gap-4 p-4" style={{ height: "calc(100vh - 4rem)" }}>
        {/* Left Panel - Project Creation */}
        <div className="w-80">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-full overflow-hidden">
            <ProjectCreationPanel />
          </div>
        </div>

        {/* Center Panel - Project Dashboard */}
        <div className="flex-1">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-full overflow-auto">
            <div className="p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  AI가 생성한 프로젝트
                </h1>
                <p className="text-gray-600 text-sm">
                  AI로 생성된 프론트엔드 프로젝트들을 관리하세요
                </p>
              </div>

              {projects.length === 0 ? (
                <div className="bg-gray-50 rounded-lg border border-gray-200 shadow-sm text-center py-16">
                  <FolderOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    프로젝트가 없습니다
                  </h3>
                  <p className="text-gray-600 mb-6">
                    첫 번째 AI 프로젝트를 생성해보세요
                  </p>
                  <Button
                    onClick={handleCreateNewProject}
                    variant="outline"
                    className="text-gray-600 border-gray-300 hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4 mr-2" />새 프로젝트 생성
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group p-4 hover:border-gray-300"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-gray-900 mb-1">
                            {project.name}
                          </h3>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <span>{project.framework}</span>
                            <span>•</span>
                            <span>{project.styling}</span>
                          </div>
                        </div>
                        <Badge
                          className={`text-xs px-2 py-1 rounded-full ${
                            project.status === "active"
                              ? "bg-green-100 text-green-700"
                              : project.status === "completed"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {project.status}
                        </Badge>
                      </div>

                      {project.gitRepository && (
                        <div className="flex items-center text-xs text-gray-500 mb-3">
                          <GitBranch className="h-3 w-3 mr-1" />
                          <span className="truncate">
                            {project.gitRepository.branch}
                          </span>
                          {project.gitRepository.tag && (
                            <>
                              <span className="mx-2">•</span>
                              <span>{project.gitRepository.tag}</span>
                            </>
                          )}
                        </div>
                      )}

                      <div className="text-xs text-gray-500 mb-4">
                        <div className="flex items-center mb-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>
                            생성:{" "}
                            {new Date(project.createdAt).toLocaleDateString(
                              "ko-KR"
                            )}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-4"></span>
                          <span>
                            수정:{" "}
                            {new Date(project.lastModified).toLocaleDateString(
                              "ko-KR"
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleOpenProject(project)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                          size="sm"
                        >
                          <FolderOpen className="h-4 w-4 mr-2" />
                          열기
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push("/inspect");
                          }}
                          variant="outline"
                          size="sm"
                          className="text-gray-600 hover:text-gray-700 hover:bg-gray-50 border-gray-300"
                        >
                          <Search className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProject(project.id);
                          }}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 border-gray-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Activity */}
        <div className="w-80">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-full overflow-hidden">
            <ActivityPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
