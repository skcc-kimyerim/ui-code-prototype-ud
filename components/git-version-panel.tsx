"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GitBranch, Plus, Tag, History } from "lucide-react";

interface CodeVersion {
  id: number;
  timestamp: Date;
  description: string;
  code: string;
}

interface GitVersionPanelProps {
  showVersionSidebar: boolean;
  setShowVersionSidebar: (show: boolean) => void;
  currentBranch: string;
  branches: string[];
  currentTag: string;
  tags: string[];
  codeVersions: CodeVersion[];
  selectedVersion: CodeVersion;
  onBranchSwitch: (branch: string) => void;
  onCreateBranch: () => void;
  onTagSwitch: (tag: string) => void;
  onCreateTag: () => void;
  onVersionRevert: (version: CodeVersion) => void;
}

export default function GitVersionPanel({
  showVersionSidebar,
  setShowVersionSidebar,
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
}: GitVersionPanelProps) {
  return (
    <div
      className={`${
        showVersionSidebar ? "w-80" : "w-16"
      } transition-all duration-300 border-r border-gray-700 bg-gray-900 flex flex-col overflow-hidden`}
    >
      <div className="p-2 border-b border-gray-700">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowVersionSidebar(!showVersionSidebar)}
          className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg"
        >
          <GitBranch className="h-4 w-4 flex-shrink-0" />
          {showVersionSidebar && <span className="ml-2">버전 관리</span>}
        </Button>
      </div>

      {showVersionSidebar ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-4">
            <div className="mb-4">
              <h3 className="text-xs font-medium text-gray-500 mb-2">
                REPOSITORY
              </h3>
              <div className="text-xs text-gray-400">
                skcc-kimyerim/ui-code-prototype-ud
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-xs font-medium text-gray-500 mb-2">
                ACTIVE BRANCH
              </h3>
              <div className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-lg p-2">
                <div className="flex items-center space-x-2 flex-1">
                  <GitBranch className="h-3 w-3 text-gray-400" />
                  <select
                    value={currentBranch}
                    onChange={(e) => onBranchSwitch(e.target.value)}
                    className="bg-transparent text-white border-none outline-none text-xs flex-1 cursor-pointer"
                  >
                    {branches.map((branch) => (
                      <option
                        key={branch}
                        value={branch}
                        className="bg-gray-800 text-white"
                      >
                        {branch}
                      </option>
                    ))}
                  </select>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onCreateBranch}
                  className="text-gray-400 hover:text-white hover:bg-gray-700 p-1 h-auto"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="tags" className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-2 mx-2 bg-gray-800 border border-gray-700 rounded-lg p-1">
              <TabsTrigger
                value="tags"
                className="text-xs text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700 rounded-md"
              >
                태그
              </TabsTrigger>
              <TabsTrigger
                value="versions"
                className="text-xs text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700 rounded-md"
              >
                버전
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tags" className="flex-1 p-2 space-y-2">
              <div className="text-xs text-gray-500 mb-2">현재 태그</div>
              <div className="p-2 bg-gray-700 rounded text-xs mb-2">
                <Tag className="h-3 w-3 inline mr-2 text-blue-400" />
                <span className="text-blue-300">{currentTag}</span>
              </div>
              <div className="text-xs text-gray-500 mb-2">태그 목록</div>
              <ScrollArea className="flex-1">
                {tags.map((tag) => (
                  <Button
                    key={tag}
                    variant="ghost"
                    size="sm"
                    className={`w-full justify-start mb-1 text-xs ${
                      tag === currentTag
                        ? "bg-gray-700 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    }`}
                    onClick={() => onTagSwitch(tag)}
                  >
                    <Tag className="h-3 w-3 mr-2" />
                    {tag}
                  </Button>
                ))}
              </ScrollArea>
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-gray-800 border-gray-600 text-white hover:bg-gray-700 text-xs"
                onClick={onCreateTag}
              >
                <Plus className="h-3 w-3 mr-1" />새 태그
              </Button>
            </TabsContent>

            <TabsContent value="versions" className="flex-1 p-2 space-y-2">
              <div className="text-xs text-gray-500 mb-2">코드 버전</div>
              <ScrollArea className="flex-1">
                {codeVersions
                  .slice()
                  .reverse()
                  .map((version) => (
                    <div
                      key={version.id}
                      className={`p-2 mb-2 rounded border cursor-pointer text-xs ${
                        version.id === selectedVersion.id
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-750"
                      }`}
                      onClick={() => onVersionRevert(version)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">v{version.id}</span>
                        <span className="text-gray-500">
                          {version.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">
                        {version.description}
                      </p>
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
            className="w-full h-12 flex flex-col items-center justify-center text-xs text-gray-400 hover:text-white hover:bg-gray-800 mb-1 rounded-lg"
            onClick={() => setShowVersionSidebar(true)}
          >
            <GitBranch className="h-4 w-4 mb-1" />
            <span className="text-[10px] leading-none">Git</span>
          </Button>
        </div>
      )}
    </div>
  );
}
