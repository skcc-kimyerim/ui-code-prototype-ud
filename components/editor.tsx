"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface EditorProps {
  height?: string | number
  language?: string
  value?: string
  onChange?: (value: string | undefined) => void
  theme?: string
  options?: any
  loading?: React.ReactNode
}

export default function Editor({
  height,
  language = "typescript",
  value = "",
  onChange,
  theme = "vs-dark",
  options = {},
  loading,
}: EditorProps) {
  const [MonacoEditor, setMonacoEditor] = useState<React.ComponentType<any> | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    console.log("[v0] Starting Monaco Editor initialization")

    const initMonaco = async () => {
      try {
        console.log("[v0] Attempting to import @monaco-editor/react")
        const monaco = await import("@monaco-editor/react")
        console.log("[v0] Monaco Editor imported successfully:", monaco)

        if (!mounted) {
          console.log("[v0] Component unmounted, skipping Monaco setup")
          return
        }

        setMonacoEditor(() => monaco.default)
        setIsLoading(false)
        console.log("[v0] Monaco Editor initialized successfully")
      } catch (error) {
        console.error("[v0] Failed to load Monaco Editor:", error)
        setIsLoading(false)
      }
    }

    initMonaco()

    return () => {
      mounted = false
      console.log("[v0] Monaco Editor component unmounting")
    }
  }, [])

  console.log("[v0] Editor render state:", { isLoading, hasMonacoEditor: !!MonacoEditor })

  if (isLoading) {
    console.log("[v0] Rendering loading state")
    return (
      <div
        style={{ height: typeof height === "string" ? height : `${height}px` }}
        className="border border-border rounded-lg overflow-hidden bg-gray-900 flex items-center justify-center"
      >
        {loading || <div className="text-gray-400">Loading editor...</div>}
      </div>
    )
  }

  if (!MonacoEditor) {
    console.log("[v0] Monaco Editor failed to load, rendering fallback textarea")
    return (
      <div
        style={{ height: typeof height === "string" ? height : `${height}px` }}
        className="border border-border rounded-lg overflow-hidden bg-gray-900"
      >
        <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full h-full bg-gray-900 text-gray-100 font-mono text-sm p-4 resize-none border-none outline-none"
          placeholder="Enter your code here..."
        />
      </div>
    )
  }

  console.log("[v0] Rendering Monaco Editor with props:", { height, language, theme })
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <MonacoEditor
        height={height}
        language={language}
        value={value}
        theme={theme}
        onChange={onChange}
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
          contextmenu: true,
          mouseWheelZoom: true,
          suggest: {
            enabled: true,
            showKeywords: true,
            showSnippets: true,
          },
          quickSuggestions: {
            other: true,
            comments: true,
            strings: true,
          },
          ...options,
        }}
      />
    </div>
  )
}
