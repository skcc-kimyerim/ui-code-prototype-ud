import fs from 'fs'
import path from 'path'

export interface FileTreeNode {
  name: string
  path: string
  type: 'file' | 'folder'
  children?: FileTreeNode[]
}

export interface ProjectFile {
  path: string
  content: string
}

export function loadProjectTemplate(templateName: string = 'react-basic'): ProjectFile[] {
  const templatePath = path.join(process.cwd(), 'templates', templateName)
  
  if (!fs.existsSync(templatePath)) {
    console.warn(`Template ${templateName} not found, using default files`)
    return getDefaultFiles()
  }

  const files: ProjectFile[] = []
  
  function walkDirectory(dir: string, basePath: string = '') {
    const items = fs.readdirSync(dir)
    
    for (const item of items) {
      const fullPath = path.join(dir, item)
      const relativePath = path.join(basePath, item).replace(/\\/g, '/')
      const stats = fs.statSync(fullPath)
      
      if (stats.isDirectory()) {
        walkDirectory(fullPath, relativePath)
      } else {
        const content = fs.readFileSync(fullPath, 'utf-8')
        files.push({
          path: relativePath,
          content
        })
      }
    }
  }
  
  walkDirectory(templatePath)
  return files
}

export function buildFileTree(files: ProjectFile[]): FileTreeNode {
  const root: FileTreeNode = {
    name: 'root',
    path: '',
    type: 'folder',
    children: []
  }

  files.forEach(file => {
    const parts = file.path.split('/')
    let current = root

    parts.forEach((part, index) => {
      if (!current.children) current.children = []
      
      let existing = current.children.find(child => child.name === part)
      
      if (!existing) {
        existing = {
          name: part,
          path: parts.slice(0, index + 1).join('/'),
          type: index === parts.length - 1 ? 'file' : 'folder',
          children: index === parts.length - 1 ? undefined : []
        }
        current.children.push(existing)
      }
      
      if (existing.type === 'folder') {
        current = existing
      }
    })
  })

  return root
}

function getDefaultFiles(): ProjectFile[] {
  return [
    {
      path: 'src/App.tsx',
      content: `import React from 'react'
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
    },
    {
      path: 'src/components/LoginForm.tsx',
      content: ''
    },
    {
      path: 'src/components/Button.tsx',
      content: ''
    },
    {
      path: 'src/styles/globals.css',
      content: ''
    },
    {
      path: 'package.json',
      content: JSON.stringify({
        name: "ui-code-project",
        version: "1.0.0",
        dependencies: {
          react: "^18.0.0",
          "react-dom": "^18.0.0",
        },
      }, null, 2)
    },
    {
      path: 'README.md',
      content: '# UI Code Project\n\n자동 생성된 React 프로젝트입니다.'
    }
  ]
}