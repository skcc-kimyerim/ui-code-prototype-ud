"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  X,
  Shield,
  Globe,
  Zap,
  AlertTriangle,
  BookOpen,
  FileText,
  Camera,
} from "lucide-react";

interface InspectionModalProps {
  showInspectionModal: boolean;
  onClose: () => void;
}

export default function InspectionModal({
  showInspectionModal,
  onClose,
}: InspectionModalProps) {
  const [inspectionTab, setInspectionTab] = useState<
    "overview" | "accessibility" | "i18n" | "performance" | "storybook"
  >("overview");

  if (!showInspectionModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">코드 검사</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="border-b border-border">
          <div className="flex space-x-1 p-2">
            <Button
              variant={inspectionTab === "overview" ? "default" : "ghost"}
              size="sm"
              onClick={() => setInspectionTab("overview")}
              className={
                inspectionTab === "overview" ? "bg-purple-600 text-white" : ""
              }
            >
              전체 검사
            </Button>
            <Button
              variant={inspectionTab === "accessibility" ? "default" : "ghost"}
              size="sm"
              onClick={() => setInspectionTab("accessibility")}
              className={
                inspectionTab === "accessibility"
                  ? "bg-purple-600 text-white"
                  : ""
              }
            >
              접근성 검사
            </Button>
            <Button
              variant={inspectionTab === "i18n" ? "default" : "ghost"}
              size="sm"
              onClick={() => setInspectionTab("i18n")}
              className={
                inspectionTab === "i18n" ? "bg-purple-600 text-white" : ""
              }
            >
              국제화 (i18n)
            </Button>
            <Button
              variant={inspectionTab === "performance" ? "default" : "ghost"}
              size="sm"
              onClick={() => setInspectionTab("performance")}
              className={
                inspectionTab === "performance"
                  ? "bg-purple-600 text-white"
                  : ""
              }
            >
              성능 최적화
            </Button>
            <Button
              variant={inspectionTab === "storybook" ? "default" : "ghost"}
              size="sm"
              onClick={() => setInspectionTab("storybook")}
              className={
                inspectionTab === "storybook" ? "bg-purple-600 text-white" : ""
              }
            >
              Storybook
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
          {inspectionTab === "overview" && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-foreground">
                    코드 구문 검사 완료
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-foreground">
                    타입 검사 통과
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-foreground">
                    성능 최적화 권장사항 1개
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-foreground">
                    접근성 검사 완료
                  </span>
                </div>
              </div>

              <div className="border border-border rounded-lg p-4 bg-muted/50">
                <h3 className="font-medium text-foreground mb-2">
                  검사 결과 요약
                </h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• 총 라인 수: 156줄</p>
                  <p>• 오류: 0개</p>
                  <p>• 경고: 1개</p>
                  <p>• 정보: 3개</p>
                </div>
              </div>

              <div className="border border-border rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-2 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                  권장사항
                </h3>
                <p className="text-sm text-muted-foreground">
                  컴포넌트 렌더링 최적화를 위해 React.memo 사용을 고려해보세요.
                </p>
              </div>
            </div>
          )}

          {inspectionTab === "accessibility" && (
            <div className="space-y-4">
              <div className="border border-border rounded-lg p-4 bg-muted/50">
                <h3 className="font-medium text-foreground mb-3 flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-blue-500" />
                  접근성 검사 결과
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-foreground">
                      ARIA 라벨 검사 통과
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-foreground">
                      키보드 탐색 지원 확인
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-foreground">
                      포커스 관리 개선 필요
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-foreground">
                      색상 대비 검사 통과
                    </span>
                  </div>
                </div>
              </div>

              <div className="border border-border rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-3">
                  Axe 자동 검사 스크립트
                </h3>
                <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono overflow-x-auto">
                  <pre>{`// Axe 접근성 검사 스크립트
import axe from '@axe-core/react';

if (process.env.NODE_ENV !== 'production') {
  axe(React, ReactDOM, 1000);
}

// 수동 검사 실행
axe.run().then(results => {
  console.log('접근성 검사 결과:', results);
});`}</pre>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 bg-transparent"
                >
                  스크립트 복사
                </Button>
              </div>

              <div className="border border-border rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-2 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                  접근성 개선 권장사항
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 모달 다이얼로그에 focus trap 구현 필요</li>
                  <li>• 버튼에 aria-label 추가 권장</li>
                  <li>• 키보드 탐색 순서 최적화 필요</li>
                </ul>
              </div>
            </div>
          )}

          {inspectionTab === "i18n" && (
            <div className="space-y-4">
              <div className="border border-border rounded-lg p-4 bg-muted/50">
                <h3 className="font-medium text-foreground mb-3 flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-green-500" />
                  국제화 분석 결과
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-foreground">
                      추출된 문자열: 23개
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-foreground">
                      하드코딩된 텍스트 발견
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-foreground">
                      i18n 설정 필요
                    </span>
                  </div>
                </div>
              </div>

              <div className="border border-border rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-3">
                  생성된 i18n JSON
                </h3>
                <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono overflow-x-auto max-h-40 overflow-y-auto">
                  <pre>{`{
  "ko": {
    "common": {
      "save": "저장",
      "cancel": "취소",
      "confirm": "확인",
      "close": "닫기"
    },
    "navigation": {
      "home": "홈",
      "about": "소개",
      "contact": "연락처"
    },
    "form": {
      "email": "이메일",
      "password": "비밀번호",
      "login": "로그인"
    }
  },
  "en": {
    "common": {
      "save": "Save",
      "cancel": "Cancel", 
      "confirm": "Confirm",
      "close": "Close"
    },
    "navigation": {
      "home": "Home",
      "about": "About",
      "contact": "Contact"
    },
    "form": {
      "email": "Email",
      "password": "Password",
      "login": "Login"
    }
  }
}`}</pre>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 bg-transparent"
                >
                  JSON 다운로드
                </Button>
              </div>

              <div className="border border-border rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-3">
                  언어 스위치 훅/HOC
                </h3>
                <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono overflow-x-auto">
                  <pre>{`// useTranslation 훅
import { useTranslation } from 'react-i18next';

export const useI18n = () => {
  const { t, i18n } = useTranslation();
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
  return { t, changeLanguage, currentLang: i18n.language };
};

// 사용 예시
const { t, changeLanguage } = useI18n();
return <button onClick={() => changeLanguage('en')}>{t('common.save')}</button>;`}</pre>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 bg-transparent"
                >
                  코드 복사
                </Button>
              </div>
            </div>
          )}

          {inspectionTab === "performance" && (
            <div className="space-y-4">
              <div className="border border-border rounded-lg p-4 bg-muted/50">
                <h3 className="font-medium text-foreground mb-3 flex items-center">
                  <Zap className="h-4 w-4 mr-2 text-orange-500" />
                  성능 최적화 분석 결과
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-foreground">
                      코드 스플리팅 적용 가능
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-foreground">
                      이미지 최적화 필요 (3개 파일)
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-foreground">
                      LCP: 2.1초 (양호)
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-foreground">
                      INP: 180ms (우수)
                    </span>
                  </div>
                </div>
              </div>

              <div className="border border-border rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-3">
                  코드 스플리팅 설정
                </h3>
                <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono overflow-x-auto">
                  <pre>{`// Next.js 동적 임포트
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

// React.lazy 사용
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// 사용 예시
<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>`}</pre>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 bg-transparent"
                >
                  코드 복사
                </Button>
              </div>

              <div className="border border-border rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-3">
                  이미지 최적화 스크립트
                </h3>
                <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono overflow-x-auto">
                  <pre>{`// Next.js Image 컴포넌트 최적화
import Image from 'next/image';

<Image
  src="/hero-image.jpg"
  alt="Hero Image"
  width={800}
  height={600}
  priority={true}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>

// 이미지 압축 스크립트 (build 시)
const sharp = require('sharp');

sharp('input.jpg')
  .resize(800, 600)
  .webp({ quality: 80 })
  .toFile('output.webp');`}</pre>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 bg-transparent"
                >
                  스크립트 복사
                </Button>
              </div>

              <div className="border border-border rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-3">
                  LCP/INP 체크 스크립트
                </h3>
                <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono overflow-x-auto">
                  <pre>{`// Web Vitals 측정 스크립트
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  console.log('Performance metric:', metric);
  // 분석 서비스로 전송
}

// Core Web Vitals 측정
getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);

// INP 측정 (실험적)
import { onINP } from 'web-vitals/attribution';
onINP(sendToAnalytics);`}</pre>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 bg-transparent"
                >
                  스크립트 복사
                </Button>
              </div>

              <div className="border border-border rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-2 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                  성능 최적화 권장사항
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 큰 이미지 파일들을 WebP 형식으로 변환 권장</li>
                  <li>• 무거운 컴포넌트에 React.memo 적용 고려</li>
                  <li>• 번들 크기 분석 후 불필요한 라이브러리 제거</li>
                  <li>• 폰트 로딩 최적화 (font-display: swap)</li>
                </ul>
              </div>
            </div>
          )}

          {inspectionTab === "storybook" && (
            <div className="space-y-4">
              <div className="border border-border rounded-lg p-4 bg-muted/50">
                <h3 className="font-medium text-foreground mb-3 flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 text-blue-500" />
                  Storybook 템플릿 생성
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  컴포넌트를 위한 Storybook 스토리, MDX 문서, 스냅샷 테스트를
                  자동으로 생성합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-border rounded-lg p-3 hover:bg-muted/30 cursor-pointer transition-colors">
                    <div className="flex items-center space-x-2 mb-2">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      <span className="font-medium text-sm">스토리 생성</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      컴포넌트 스토리 파일 생성
                    </p>
                  </div>
                  <div className="border border-border rounded-lg p-3 hover:bg-muted/30 cursor-pointer transition-colors">
                    <div className="flex items-center space-x-2 mb-2">
                      <FileText className="h-4 w-4 text-green-500" />
                      <span className="font-medium text-sm">MDX 문서</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      상세 문서 생성
                    </p>
                  </div>
                  <div className="border border-border rounded-lg p-3 hover:bg-muted/30 cursor-pointer transition-colors">
                    <div className="flex items-center space-x-2 mb-2">
                      <Camera className="h-4 w-4 text-orange-500" />
                      <span className="font-medium text-sm">스냅샷 테스트</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      시각적 회귀 테스트
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-border rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-3">
                  Storybook 스토리 템플릿
                </h3>
                <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono overflow-x-auto max-h-60 overflow-y-auto">
                  <pre>{`import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Button',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Button',
  },
};`}</pre>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 bg-transparent"
                >
                  스토리 파일 생성
                </Button>
              </div>

              <div className="border border-border rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-3">
                  MDX 문서 템플릿
                </h3>
                <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono overflow-x-auto max-h-60 overflow-y-auto">
                  <pre>{`import { Meta, Canvas, Story, ArgsTable } from '@storybook/blocks';
import { Button } from './Button';

<Meta title="Components/Button" component={Button} />

# Button

버튼 컴포넌트는 사용자 상호작용을 위한 기본적인 UI 요소입니다.

## 사용법

\`\`\`tsx
import { Button } from './Button';

<Button variant="primary" size="md">
  클릭하세요
</Button>
\`\`\`

## Variants

### Primary
기본 버튼 스타일입니다.

<Canvas>
  <Story id="components-button--primary" />
</Canvas>

### Secondary  
보조 버튼 스타일입니다.

<Canvas>
  <Story id="components-button--secondary" />
</Canvas>

## Sizes

버튼은 세 가지 크기를 지원합니다:

<Canvas>
  <Story id="components-button--small" />
  <Story id="components-button--large" />
</Canvas>

## Props

<ArgsTable of={Button} />

## 접근성

- 키보드 탐색 지원
- 스크린 리더 호환
- ARIA 라벨 지원

## 사용 예시

\`\`\`tsx
// 기본 사용
<Button onClick={handleClick}>확인</Button>

// 비활성화 상태
<Button disabled>비활성화</Button>

// 로딩 상태
<Button loading>로딩 중...</Button>
\`\`\``}</pre>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 bg-transparent"
                >
                  MDX 파일 생성
                </Button>
              </div>

              <div className="border border-border rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-3">
                  스냅샷 테스트 템플릿
                </h3>
                <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono overflow-x-auto max-h-60 overflow-y-auto">
                  <pre>{`import { render } from '@testing-library/react';
import { Button } from './Button';

// Jest 스냅샷 테스트
describe('Button Component', () => {
  it('renders primary button correctly', () => {
    const { container } = render(
      <Button variant="primary">Test Button</Button>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders secondary button correctly', () => {
    const { container } = render(
      <Button variant="secondary">Test Button</Button>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders disabled button correctly', () => {
    const { container } = render(
      <Button disabled>Test Button</Button>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders different sizes correctly', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    
    sizes.forEach(size => {
      const { container } = render(
        <Button size={size}>Test Button</Button>
      );
      expect(container.firstChild).toMatchSnapshot(\`button-\${size}\`);
    });
  });
});

// Storybook 스냅샷 테스트 (Chromatic)
import { composeStories } from '@storybook/react';
import * as stories from './Button.stories';

const { Primary, Secondary, Large, Small } = composeStories(stories);

describe('Button Storybook Tests', () => {
  it('Primary story snapshot', () => {
    const { container } = render(<Primary />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Secondary story snapshot', () => {
    const { container } = render(<Secondary />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Large story snapshot', () => {
    const { container } = render(<Large />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Small story snapshot', () => {
    const { container } = render(<Small />);
    expect(container.firstChild).toMatchSnapshot();
  });
});`}</pre>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 bg-transparent"
                >
                  테스트 파일 생성
                </Button>
              </div>

              <div className="border border-border rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-3">
                  Storybook 설정 파일
                </h3>
                <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono overflow-x-auto max-h-40 overflow-y-auto">
                  <pre>{`// .storybook/main.ts
import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;`}</pre>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 bg-transparent"
                >
                  설정 파일 생성
                </Button>
              </div>

              <div className="border border-border rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-2 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                  생성 옵션
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>TypeScript 지원</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>접근성 테스트 포함</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>인터랙션 테스트 포함</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    <span>Chromatic 스냅샷 테스트</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            닫기
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            {inspectionTab === "accessibility"
              ? "Axe 보고서 다운로드"
              : inspectionTab === "i18n"
              ? "i18n 파일 다운로드"
              : inspectionTab === "performance"
              ? "성능 최적화 가이드 다운로드"
              : inspectionTab === "storybook"
              ? "모든 템플릿 생성"
              : "상세 보고서 다운로드"}
          </Button>
        </div>
      </div>
    </div>
  );
}
