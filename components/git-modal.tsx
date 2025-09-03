"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { GitBranch, Plus, Tag, History, X, Github } from "lucide-react";

interface CodeVersion {
  id: number;
  timestamp: Date;
  description: string;
  code: string;
}

interface GitModalProps {
  showGitModal: boolean;
  onClose: () => void;
  currentBranch: string;
  branches: string[];
  currentTag: string;
  tags: string[];
  codeVersions: CodeVersion[];
  selectedVersion: CodeVersion;
  onBranchSwitch: (branch: string) => void;
  onCreateBranch: (branchName?: string) => void;
  onTagSwitch: (tag: string) => void;
  onCreateTag: (tagName?: string) => void;
  onVersionRevert: (version: CodeVersion) => void;
}

export default function GitModal({
  showGitModal,
  onClose,
  currentBranch,
  branches,
  currentTag,
  tags,
  codeVersions,
  selectedVersion,
  onBranchSwitch,
  onCreateBranch,
  onTagSwitch,
  onCreateTag,
  onVersionRevert,
}: GitModalProps) {
  const [newBranchName, setNewBranchName] = useState("");
  const [newTagName, setNewTagName] = useState("");
  const [showNewBranchInput, setShowNewBranchInput] = useState(false);
  const [showNewTagInput, setShowNewTagInput] = useState(false);

  if (!showGitModal) return null;

  const handleCreateBranch = () => {
    if (newBranchName.trim()) {
      onCreateBranch(newBranchName);
      setNewBranchName("");
      setShowNewBranchInput(false);
    }
  };

  const handleCreateTag = () => {
    if (newTagName.trim()) {
      onCreateTag(newTagName);
      setNewTagName("");
      setShowNewTagInput(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Github className="h-6 w-6 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Git 관리</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6 bg-white">
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-600 mb-3">
                Repository
              </h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Github className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-900 font-medium">
                    skcc-kimyerim/ui-code-prototype-ud
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-600 mb-3">
                Active Branch
              </h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <GitBranch className="h-4 w-4 text-gray-500" />
                    <select
                      value={currentBranch}
                      onChange={(e) => onBranchSwitch(e.target.value)}
                      className="bg-transparent text-gray-900 border-none outline-none flex-1 cursor-pointer"
                    >
                      {branches.map((branch) => (
                        <option
                          key={branch}
                          value={branch}
                          className="bg-white text-gray-900"
                        >
                          {branch}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md ml-3"
                    onClick={() => setShowNewBranchInput(true)}
                  >
                    <Plus className="h-2 w-2" />
                  </Button>
                </div>

                {showNewBranchInput && (
                  <div className="mt-4 space-y-2">
                    <Input
                      placeholder="브랜치 이름을 입력하세요"
                      value={newBranchName}
                      onChange={(e) => setNewBranchName(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleCreateBranch()
                      }
                      className="bg-white border-gray-300 text-gray-900"
                    />
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={handleCreateBranch}
                        className="bg-primary hover:bg-primary/90 text-white"
                      >
                        생성
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setShowNewBranchInput(false);
                          setNewBranchName("");
                        }}
                        className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        취소
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Tabs defaultValue="tags" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-100 border border-gray-200 rounded-lg p-1">
                <TabsTrigger
                  value="tags"
                  className="flex items-center space-x-2 text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:bg-white rounded-md text-xs"
                >
                  <Tag className="h-3 w-3" />
                  <span>태그</span>
                </TabsTrigger>
                <TabsTrigger
                  value="versions"
                  className="flex items-center space-x-2 text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:bg-white rounded-md text-xs"
                >
                  <History className="h-3 w-3" />
                  <span>버전</span>
                </TabsTrigger>
                <TabsTrigger
                  value="push"
                  className="flex items-center space-x-2 text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:bg-white rounded-md text-xs"
                >
                  <span>Push</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="tags" className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-3">
                    현재 태그
                  </h3>
                  <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-2 text-primary" />
                      <span className="font-medium text-primary/90">
                        {currentTag}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-3">
                    모든 태그
                  </h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {tags.map((tag) => (
                      <div
                        key={tag}
                        className={`flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer ${
                          tag === currentTag
                            ? "bg-primary/10 border-primary/20"
                            : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                        }`}
                        onClick={() => tag !== currentTag && onTagSwitch(tag)}
                      >
                        <div className="flex items-center">
                          <Tag className="h-4 w-4 mr-2 text-gray-600" />
                          <span className="font-medium text-gray-900">
                            {tag}
                          </span>
                          {tag === currentTag && (
                            <Badge
                              variant="secondary"
                              className="ml-2 text-xs bg-blue-600 text-white"
                            >
                              현재
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  {!showNewTagInput ? (
                    <Button
                      variant="outline"
                      onClick={() => setShowNewTagInput(true)}
                      className="w-full bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
                    >
                      <Plus className="h-4 w-4 mr-2" />새 태그 생성
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Input
                        placeholder="태그 이름을 입력하세요 (예: v1.1.0)"
                        value={newTagName}
                        onChange={(e) => setNewTagName(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleCreateTag()
                        }
                        className="bg-white border-gray-300 text-gray-900"
                      />
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={handleCreateTag}
                          className="bg-primary hover:bg-primary/90 text-white"
                        >
                          생성
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setShowNewTagInput(false);
                            setNewTagName("");
                          }}
                          className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                          취소
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="versions" className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-3">
                    코드 변경 내역
                  </h3>
                  <div className="space-y-2 max-h-80 overflow-y-auto ">
                    {codeVersions
                      .slice()
                      .reverse()
                      .map((version) => (
                        <div
                          key={version.id}
                          className={`p-4 rounded-lg border cursor-pointer hover:bg-gray-100 transition-colors ${
                            version.id === selectedVersion.id
                              ? "bg-green-50 border-green-200"
                              : "bg-gray-50 border-gray-200"
                          }`}
                          onClick={() => onVersionRevert(version)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <History className="h-4 w-4 mr-2 text-gray-600" />
                              <span className="font-medium text-sm text-gray-900">
                                버전 {version.id}
                              </span>
                              {version.id === selectedVersion.id && (
                                <Badge
                                  variant="secondary"
                                  className="ml-2 text-xs bg-green-600 text-white"
                                >
                                  현재
                                </Badge>
                              )}
                            </div>
                            <span className="text-xs text-gray-500">
                              {version.timestamp.toLocaleString("ko-KR")}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">
                            {version.description}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="push" className="space-y-4">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg"
                    onClick={() => {
                      /* Push 로직 */
                    }}
                  >
                    Push Changes
                  </Button>
                  <p className="text-xs text-gray-600 mt-2 text-center">
                    로컬 변경사항을 원격 저장소로 푸시합니다
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="flex justify-end p-6 rounded-2xl">
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            닫기
          </Button>
        </div>
      </div>
    </div>
  );
}
