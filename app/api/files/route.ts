import { NextRequest, NextResponse } from 'next/server'
import { loadProjectTemplate } from '@/lib/file-loader'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const template = searchParams.get('template') || 'react-basic'
  
  try {
    const files = loadProjectTemplate(template)
    return NextResponse.json({ files })
  } catch (error) {
    console.error('Error loading project template:', error)
    return NextResponse.json({ error: 'Failed to load project template' }, { status: 500 })
  }
}
