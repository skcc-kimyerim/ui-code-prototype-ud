"use client"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md text-center">
        <CardContent className="p-8">
          <div className="mb-6">
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              오류가 발생했습니다
            </h1>
            <p className="text-foreground/70">
              예기치 않은 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
            </p>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={reset}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              다시 시도
            </Button>
            
            <Button 
              asChild
              variant="outline" 
              className="w-full"
            >
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                홈으로 돌아가기
              </Link>
            </Button>
          </div>

          {error.digest && (
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-xs text-foreground/50">
                오류 ID: {error.digest}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}