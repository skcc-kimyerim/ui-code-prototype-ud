"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Edit, Eye, Settings, Check, Copy, Download } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";

export default function ProjectSetup() {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("preview");
  const [formData, setFormData] = useState({
    projectName: "",
    framework: "",
    styling: "",
    clientState: "None",
    serverState: "None",
    typescript: false,
    // 자료 소스 선택
    designDocSource: "",
    mockupSource: "",
    requirementsSource: "",
    figmaLink: "",
    uploadedFiles: {
      designDoc: null as File | null,
      mockup: null as File | null,
      imageAssets: null as FileList | null,
      globalCSS: null as File | null,
      requirements: null as File | null,
      references: null as FileList | null,
    },
  });

  const [markdownContent, setMarkdownContent] = useState("");

  // 마크다운 템플릿 로드
  useEffect(() => {
    const loadTemplate = async () => {
      try {
        const response = await fetch("/project-setup-template.md");
        if (response.ok) {
          const template = await response.text();
          setMarkdownContent(template);
        } else {
          // 폴백: 기본 템플릿
          const fallbackTemplate = `## 📝 기본 정보

**프로젝트 이름:**
<input type="text" id="projectName" name="projectName" placeholder="my-awesome-project" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin: 4px 0;" />

---

## ⚛️ 프레임워크

<select id="framework" name="framework" style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 8px; margin: 8px 0; font-size: 16px; background: white;">
  <option value="">프레임워크를 선택하세요</option>
  <option value="React">React</option>
  <option value="Vue">Vue</option>
</select>

---

## 📊 현재 설정 요약

**프로젝트 정보:**
- 프로젝트명: 미설정
- 프레임워크: 미선택`;
          setMarkdownContent(fallbackTemplate);
        }
      } catch (error) {
        console.error("템플릿 로드 실패:", error);
        // 에러 시 기본 템플릿 사용
        setMarkdownContent(
          "## 📝 프로젝트 설정\n\n설정 템플릿을 로드하는 중..."
        );
      }
    };

    loadTemplate();
  }, []);

  const previewRef = useRef<HTMLDivElement>(null);

  // HTML 폼 요소들의 값 변경을 감지하는 함수
  useEffect(() => {
    if (activeTab === "preview" && previewRef.current) {
      const handleFormChange = (event: Event) => {
        const target = event.target as HTMLInputElement | HTMLSelectElement;
        if (
          target &&
          (target.tagName === "SELECT" || target.tagName === "INPUT")
        ) {
          const field = target.name || target.id;
          let value: any;

          if (target.type === "checkbox") {
            value = (target as HTMLInputElement).checked;
          } else if (target.type === "file") {
            const fileInput = target as HTMLInputElement;
            if (fileInput.multiple) {
              value = fileInput.files;
            } else {
              value = fileInput.files?.[0] || null;
            }

            // 파일 업로드는 uploadedFiles 객체에 저장
            setFormData((prev) => ({
              ...prev,
              uploadedFiles: {
                ...prev.uploadedFiles,
                [field]: value,
              },
            }));
            return;
          } else {
            value = target.value;
          }

          setFormData((prev) => {
            const newData = {
              ...prev,
              [field]: value,
            };

            // 마크다운 요약 섹션 업데이트
            updateMarkdownSummary(newData);
            return newData;
          });
        }
      };

      // 모든 form 요소에 이벤트 리스너 추가
      const formElements = previewRef.current.querySelectorAll("select, input");
      formElements.forEach((element) => {
        element.addEventListener("change", handleFormChange);
      });

      // 클린업
      return () => {
        formElements.forEach((element) => {
          element.removeEventListener("change", handleFormChange);
        });
      };
    }
  }, [activeTab, markdownContent]);

  const updateMarkdownSummary = (newFormData: typeof formData) => {
    setMarkdownContent((prev) => {
      // 업로드된 파일 정보 생성
      const uploadedFilesInfo = Object.entries(newFormData.uploadedFiles)
        .filter(([_, file]) => file !== null)
        .map(([key, file]) => {
          if (file instanceof FileList) {
            return `  - **${getFileLabel(key)}:** ${file.length}개 파일`;
          } else if (file instanceof File) {
            return `  - **${getFileLabel(key)}:** ${file.name}`;
          }
          return null;
        })
        .filter(Boolean);

      const filesSection =
        uploadedFilesInfo.length > 0
          ? `\n- **업로드된 파일:**\n${uploadedFilesInfo.join("\n")}`
          : "";

      // 요약 섹션 업데이트
      const summarySection = /## 📊 현재 설정 요약[\s\S]*?(?=---|\n## |$)/;
      const newSummary = `## 📊 현재 설정 요약

> **실시간으로 업데이트됩니다!**

- **프로젝트 이름:** ${newFormData.projectName || "_선택해주세요_"}
- **프레임워크:** ${newFormData.framework || "_선택해주세요_"}  
- **스타일링:** ${newFormData.styling || "_선택해주세요_"}
- **클라이언트 상태관리:** ${newFormData.clientState || "_선택해주세요_"}
- **서버 상태관리:** ${
        newFormData.serverState || "_선택해주세요_"
      }${filesSection}

`;

      return prev.replace(summarySection, newSummary);
    });
  };

  const getFileLabel = (key: string) => {
    const labels: Record<string, string> = {
      designDoc: "화면 설계서",
      mockup: "목업 파일",
      imageAssets: "이미지 에셋",
      globalCSS: "Global CSS",
      requirements: "요구사항 정의서",
      references: "레퍼런스 이미지",
    };
    return labels[key] || key;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent || "");
  };

  const handleDownload = () => {
    const blob = new Blob([markdownContent || ""], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "project-setup.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-gray-900">
              프로젝트 설정 (마크다운 기반)
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
            <Button
              onClick={() => {
                console.log("프로젝트 설정:", formData);
                alert("설정이 완료되었습니다!\n콘솔을 확인해보세요.");
              }}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Check className="h-4 w-4 mr-2" />
              설정 완료
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
              <span>미리보기 (상호작용)</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-scroll">
        <Tabs value={activeTab}>
          <TabsContent value="edit" className="h-full m-0">
            <div className="h-full overflow-auto" data-color-mode="dark">
              <MDEditor
                value={markdownContent}
                onChange={(val) => setMarkdownContent(val || "")}
                height="100%"
                visibleDragbar={false}
                data-color-mode="dark"
                preview="edit"
                hideToolbar
                style={{
                  fontSize: "16px",
                }}
                textareaProps={{
                  style: {
                    fontSize: "16px",
                    lineHeight: "1.6",
                    fontFamily:
                      'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                  },
                }}
              />
            </div>
          </TabsContent>

          <TabsContent value="preview" className="h-full m-0">
            <div
              className="overflow-auto"
              data-color-mode="light"
              ref={previewRef}
            >
              <MDEditor.Markdown
                source={markdownContent}
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
