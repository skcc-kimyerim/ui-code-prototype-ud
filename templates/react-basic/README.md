# UI Code Project

자동 생성된 React 프로젝트입니다.

## 프로젝트 구조

\`\`\`
src/
├── App.tsx              # 메인 애플리케이션 컴포넌트
├── components/          # 재사용 가능한 컴포넌트들
│   ├── Button.tsx       # 버튼 컴포넌트
│   └── LoginForm.tsx    # 로그인 폼 컴포넌트
└── styles/
    └── globals.css      # 전역 스타일시트
\`\`\`

## 설치 및 실행

\`\`\`bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
\`\`\`

## 기술 스택

- React 18
- TypeScript
- Tailwind CSS
- Next.js 14

## 컴포넌트 사용법

### Button 컴포넌트
\`\`\`tsx
import { Button } from './components/Button'

<Button variant="default" size="sm">
  클릭하세요
</Button>
\`\`\`

### LoginForm 컴포넌트
\`\`\`tsx
import LoginForm from './components/LoginForm'

<LoginForm />
\`\`\`
