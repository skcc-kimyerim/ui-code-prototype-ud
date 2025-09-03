"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, ArrowLeft, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md text-center">
        <CardContent className="p-8">
          <div className="mb-6">
            <div className="text-6xl font-bold text-purple-600 mb-2">404</div>
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              페이지를 찾을 수 없습니다
            </h1>
            <p className="text-foreground/70">
              요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
            </p>
          </div>

          <div className="space-y-3">
            <Button 
              asChild 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                홈으로 돌아가기
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              이전 페이지
            </Button>
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-sm text-foreground/60">
              문제가 지속되면 관리자에게 문의하세요.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
