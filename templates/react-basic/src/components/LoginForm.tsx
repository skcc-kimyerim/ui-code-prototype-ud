import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="border border-border rounded-lg shadow-sm bg-card">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-2 text-foreground">로그인</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            <Button 
              onClick={() => console.log('로그인 시도:', { email, password })}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              로그인
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}