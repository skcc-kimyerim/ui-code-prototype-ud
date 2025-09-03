"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import {
  Shield,
  Globe,
  Zap,
  AlertTriangle,
  BookOpen,
  Camera,
} from "lucide-react";

export default function InspectPage() {
  const router = useRouter();
  const [inspectionTab, setInspectionTab] = useState<
    "overview" | "accessibility" | "i18n" | "performance" | "storybook"
  >("overview");

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header
        showBackButton={true}
        backButtonText="뒤로"
        onBackClick={() => router.back()}
        title="코드 검사"
      />

      {/* Two Panel Layout */}
      <div className="flex gap-4 p-4" style={{ height: "calc(100vh - 4rem)" }}>
        {/* Left Panel - Inspection Menu */}
        <div className="w-80">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-full overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                코드 검사
              </h2>
              <p className="text-sm text-gray-600">
                프로젝트의 품질을 종합적으로 검사합니다
              </p>
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-2">
              <button
                onClick={() => setInspectionTab("overview")}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center space-x-3 ${
                  inspectionTab === "overview"
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <Shield className="h-5 w-5" />
                <div>
                  <div className="font-medium">개요</div>
                  <div className="text-xs text-gray-500">전체 검사 결과</div>
                </div>
              </button>

              <button
                onClick={() => setInspectionTab("accessibility")}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center space-x-3 ${
                  inspectionTab === "accessibility"
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <Shield className="h-5 w-5" />
                <div>
                  <div className="font-medium">접근성</div>
                  <div className="text-xs text-gray-500">WCAG 준수 검사</div>
                </div>
              </button>

              <button
                onClick={() => setInspectionTab("i18n")}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center space-x-3 ${
                  inspectionTab === "i18n"
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <Globe className="h-5 w-5" />
                <div>
                  <div className="font-medium">국제화</div>
                  <div className="text-xs text-gray-500">다국어 지원 검사</div>
                </div>
              </button>

              <button
                onClick={() => setInspectionTab("performance")}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center space-x-3 ${
                  inspectionTab === "performance"
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <Zap className="h-5 w-5" />
                <div>
                  <div className="font-medium">성능</div>
                  <div className="text-xs text-gray-500">Web Vitals 측정</div>
                </div>
              </button>

              <button
                onClick={() => setInspectionTab("storybook")}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center space-x-3 ${
                  inspectionTab === "storybook"
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <BookOpen className="h-5 w-5" />
                <div>
                  <div className="font-medium">스토리북</div>
                  <div className="text-xs text-gray-500">컴포넌트 문서화</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Inspection Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-full overflow-auto">
            <div className="p-6">
              {inspectionTab === "overview" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-foreground">접근성</h3>
                        <Shield className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="text-2xl font-bold text-green-500 mb-1">
                        92%
                      </div>
                      <p className="text-sm text-muted-foreground">
                        WCAG 2.1 AA 준수
                      </p>
                    </div>

                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-foreground">성능</h3>
                        <Zap className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div className="text-2xl font-bold text-yellow-500 mb-1">
                        78%
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Core Web Vitals
                      </p>
                    </div>

                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-foreground">국제화</h3>
                        <Globe className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-2xl font-bold text-primary mb-1">
                        85%
                      </div>
                      <p className="text-sm text-muted-foreground">
                        다국어 지원 준비도
                      </p>
                    </div>

                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-foreground">문서화</h3>
                        <BookOpen className="h-5 w-5 text-purple-500" />
                      </div>
                      <div className="text-2xl font-bold text-purple-500 mb-1">
                        67%
                      </div>
                      <p className="text-sm text-muted-foreground">
                        컴포넌트 문서화율
                      </p>
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-3 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                      주요 개선 권장사항
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium text-foreground">
                            이미지 최적화 필요
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            PNG 이미지들을 WebP 포맷으로 변환하여 로딩 속도를
                            개선하세요.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium text-foreground">
                            키보드 네비게이션 개선
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            일부 대화형 요소에서 키보드 접근성이 부족합니다.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium text-foreground">
                            다국어 텍스트 추가
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            하드코딩된 텍스트를 i18n 키로 변환하는 것을
                            권장합니다.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {inspectionTab === "accessibility" && (
                <div className="space-y-6">
                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-3 flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-green-500" />
                      접근성 검사 결과
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-500 mb-1">
                          15
                        </div>
                        <p className="text-sm text-muted-foreground">통과</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-500 mb-1">
                          3
                        </div>
                        <p className="text-sm text-muted-foreground">경고</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-red-500 mb-1">
                          1
                        </div>
                        <p className="text-sm text-muted-foreground">오류</p>
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
                <div className="space-y-6">
                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-3 flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-primary" />
                      국제화 분석
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-2">
                          지원 언어
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 border border-border rounded">
                            <span className="text-sm">한국어 (ko)</span>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              100%
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-2 border border-border rounded">
                            <span className="text-sm">English (en)</span>
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                              75%
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-2 border border-border rounded">
                            <span className="text-sm">日本語 (ja)</span>
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                              45%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-2">
                          번역 상태
                        </h4>
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="text-muted-foreground">
                              총 텍스트 키:
                            </span>{" "}
                            <span className="font-medium">127개</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">
                              번역 완료:
                            </span>{" "}
                            <span className="font-medium">85개</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">
                              하드코딩된 텍스트:
                            </span>{" "}
                            <span className="font-medium text-red-500">
                              42개
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-3">
                      i18n 설정 스크립트
                    </h3>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono overflow-x-auto">
                      <pre>{`// i18n 설정 (next-i18next)
import { appWithTranslation } from 'next-i18next';

const MyApp = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default appWithTranslation(MyApp);

// 사용 예시
import { useTranslation } from 'next-i18next';

const { t } = useTranslation('common');
console.log(t('welcome')); // "환영합니다"`}</pre>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 bg-transparent"
                    >
                      스크립트 복사
                    </Button>
                  </div>
                </div>
              )}

              {inspectionTab === "performance" && (
                <div className="space-y-6">
                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-3 flex items-center">
                      <Zap className="h-4 w-4 mr-2 text-yellow-500" />
                      성능 분석
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-500 mb-1">
                          2.3s
                        </div>
                        <p className="text-sm text-muted-foreground">
                          First Contentful Paint
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-500 mb-1">
                          4.1s
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Largest Contentful Paint
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-500 mb-1">
                          180ms
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Cumulative Layout Shift
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-3">
                      성능 최적화 권장사항
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium text-foreground">
                            이미지 최적화
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            대용량 이미지를 WebP 포맷으로 변환하고 lazy
                            loading을 적용하세요.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium text-foreground">
                            코드 분할
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            동적 import를 사용하여 번들 크기를 줄이세요.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-3">
                      성능 측정 스크립트
                    </h3>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono overflow-x-auto">
                      <pre>{`// Web Vitals 측정
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  console.log(metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);`}</pre>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 bg-transparent"
                    >
                      스크립트 복사
                    </Button>
                  </div>
                </div>
              )}

              {inspectionTab === "storybook" && (
                <div className="space-y-6">
                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-3 flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-purple-500" />
                      스토리북 분석
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-2">
                          컴포넌트 커버리지
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 border border-border rounded">
                            <span className="text-sm">Button</span>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              완료
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-2 border border-border rounded">
                            <span className="text-sm">Input</span>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              완료
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-2 border border-border rounded">
                            <span className="text-sm">Modal</span>
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                              진행중
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-2 border border-border rounded">
                            <span className="text-sm">Card</span>
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                              미완료
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-2">
                          문서화 상태
                        </h4>
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="text-muted-foreground">
                              총 컴포넌트:
                            </span>{" "}
                            <span className="font-medium">24개</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">
                              스토리 작성:
                            </span>{" "}
                            <span className="font-medium">16개</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">
                              문서화율:
                            </span>{" "}
                            <span className="font-medium text-primary">
                              67%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-3">
                      스토리북 설정 스크립트
                    </h3>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono overflow-x-auto">
                      <pre>{`// .storybook/main.js
module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-docs'
  ]
};

// Button.stories.tsx
export default {
  title: 'Components/Button',
  component: Button,
};

export const Primary = {
  args: { variant: 'primary', children: 'Button' }
};`}</pre>
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
                    <h3 className="font-medium text-foreground mb-2">
                      스크린샷 테스트
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                      <div className="border border-border rounded p-2">
                        <div className="w-full h-20 bg-gray-200 rounded mb-2 flex items-center justify-center">
                          <Camera className="h-6 w-6 text-gray-400" />
                        </div>
                        <p className="text-xs text-center text-muted-foreground">
                          Button Primary
                        </p>
                      </div>
                      <div className="border border-border rounded p-2">
                        <div className="w-full h-20 bg-gray-200 rounded mb-2 flex items-center justify-center">
                          <Camera className="h-6 w-6 text-gray-400" />
                        </div>
                        <p className="text-xs text-center text-muted-foreground">
                          Button Secondary
                        </p>
                      </div>
                      <div className="border border-border rounded p-2">
                        <div className="w-full h-20 bg-gray-200 rounded mb-2 flex items-center justify-center">
                          <Camera className="h-6 w-6 text-gray-400" />
                        </div>
                        <p className="text-xs text-center text-muted-foreground">
                          Input Default
                        </p>
                      </div>
                      <div className="border border-border rounded p-2">
                        <div className="w-full h-20 bg-gray-200 rounded mb-2 flex items-center justify-center">
                          <Camera className="h-6 w-6 text-gray-400" />
                        </div>
                        <p className="text-xs text-center text-muted-foreground">
                          Input Error
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
