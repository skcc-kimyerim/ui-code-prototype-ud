## 📝 기본 정보

**프로젝트 이름:**
<input type="text" id="projectName" name="projectName" placeholder="my-awesome-project" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin: 4px 0;" />

---

## ⚛️ 프레임워크

<select id="framework" name="framework" style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 8px; margin: 8px 0; font-size: 16px; background: white;">
  <option value="">프레임워크를 선택하세요</option>
  <option value="React">React</option>
  <option value="Vue">Vue</option>
</select>

---

## 🎨 스타일링 도구

<select id="styling" name="styling" style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 8px; margin: 8px 0; font-size: 16px; background: white;">
  <option value="">스타일링 도구를 선택하세요</option>
  <option value="Tailwind CSS">Tailwind CSS</option>
  <option value="Styled Components">Styled Components</option>
  <option value="CSS Modules">CSS Modules</option>
  <option value="SCSS">SCSS</option>
</select>

---

## 🗄️ 상태 관리

**클라이언트 상태 관리:**
<select id="clientState" name="clientState" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin: 4px 0;">
  <option value="None">없음</option>
  <option value="Zustand">Zustand</option>
  <option value="Redux Toolkit">Redux Toolkit</option>
</select>

**서버 상태 관리:**
<select id="serverState" name="serverState" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin: 4px 0;">
  <option value="None">없음</option>
  <option value="React Query">React Query</option>
  <option value="Redux Toolkit">Redux Toolkit</option>
</select>

---

## 📎 자료 및 파일 설정

<div>
  <!-- 화면 설계서 -->
  <div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 0 10px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); display: flex; flex-direction: column;">
    <h3 style="font-size: 20px; font-weight: 600; color: #1f2937; margin: 0 0 2px 0;">
      📋 화면 설계서
    </h3>
    <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 10px;">
      <label style="display: flex; align-items: center; padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='white'">
        <input type="radio" name="designDocSource" value="previous" style="margin-right: 12px; accent-color: #8b5cf6;" />
        <span style="font-size: 14px; color: #374151;">이전 단계에서 넘어온 자료 사용</span>
      </label>
      <div style="display: flex; flex-direction: column; gap: 10px;  border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; background: #fafafa;">
        <label style="display: flex; align-items: center;">
          <input type="radio" name="designDocSource" value="upload" style="margin-right: 12px; accent-color: #8b5cf6;" />
          <span style="font-size: 14px; color: #374151; font-weight: 500;">새로운 파일 업로드</span>
        </label>
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; background: white;">
          <button type="button" style="background: #8b5cf6; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 12px; font-weight: 500; cursor: pointer;">파일 선택</button>
          <input type="file" id="designDoc" name="designDoc" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" style="flex: 1; border: none; font-size: 14px; color: #6b7280;" />
          <span style="font-size: 12px; color: #9ca3af;">PDF, Word, 이미지</span>
        </div>
      </div>
    </div>
  </div>

  <!-- 목업 파일 -->
  <div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 0 10px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); display: flex; flex-direction: column;">
    <h3 style="font-size: 20px; font-weight: 600; color: #1f2937; margin: 0 0 2px 0;">
      🎨 목업 파일
    </h3>
    <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 10px;">
      <label style="display: flex; align-items: center; padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='white'">
        <input type="radio" name="mockupSource" value="previous" style="margin-right: 12px; accent-color: #8b5cf6;" />
        <span style="font-size: 14px; color: #374151;">이전 단계 HTML/CSS 코드 사용</span>
      </label>
      <div style="display: flex; flex-direction: column; gap: 10px; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; background: #fafafa;">
        <label style="display: flex; align-items: center;">
          <input type="radio" name="mockupSource" value="figma" style="margin-right: 12px; accent-color: #8b5cf6;" />
          <span style="font-size: 14px; color: #374151; font-weight: 500;">Figma 링크 사용</span>
        </label>
        <input type="url" id="figmaLink" name="figmaLink" placeholder="https://figma.com/..." style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; background: white;" />
        </div>
      </div>
    </div>
  </div>

  <!-- 요구사항 정의서 -->
  <div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 0 10px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); display: flex; flex-direction: column;">
    <h3 style="font-size: 20px; font-weight: 600; color: #1f2937; margin: 0 0 2px 0;">
      📄 요구사항 정의서
    </h3>
    <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 10px;">
      <label style="display: flex; align-items: center; padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='white'">
        <input type="radio" name="requirementsSource" value="previous" style="margin-right: 12px; accent-color: #8b5cf6;" />
        <span style="font-size: 14px; color: #374151;">이전 단계에서 넘어온 자료 사용</span>
      </label>
      <div style="display: flex; flex-direction: column; gap: 10px; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; background: #fafafa;">
        <label style="display: flex; align-items: center;">
          <input type="radio" name="requirementsSource" value="upload" style="margin-right: 12px; accent-color: #8b5cf6;" />
          <span style="font-size: 14px; color: #374151; font-weight: 500;">새로운 파일 업로드</span>
        </label>
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; background: white;">
          <button type="button" style="background: #8b5cf6; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 12px; font-weight: 500; cursor: pointer;">파일 선택</button>
          <input type="file" id="requirements" name="requirements" accept=".pdf,.doc,.docx,.md,.txt" style="flex: 1; border: none; font-size: 14px; color: #6b7280;" />
          <span style="font-size: 12px; color: #9ca3af;">PDF, Word, 마크다운</span>
        </div>
      </div>
    </div>
  </div>

  <!-- 이미지 에셋 -->
  <div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 0 10px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); display: flex; flex-direction: column;">
    <h4 style="font-size: 18px; font-weight: 600; color: #1f2937; margin: 0 0 2px 0;">
      🖼️ 이미지 에셋 <span style="font-size: 12px; color: #9ca3af; font-weight: normal;">(선택사항)</span>
    </h4>
    <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 10px;">
      <label style="display: flex; align-items: center; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='white'">
        <input type="radio" name="imageAssetsSource" value="previous" style="margin-right: 10px; accent-color: #8b5cf6;" />
        <span style="font-size: 13px; color: #374151;">기존 이미지 에셋 사용</span>
      </label>
      <div style="display: flex; flex-direction: column; gap: 8px; border: 1px solid #e5e7eb; border-radius: 6px; padding: 10px; background: #fafafa;">
        <label style="display: flex; align-items: center;">
          <input type="radio" name="imageAssetsSource" value="upload" style="margin-right: 10px; accent-color: #8b5cf6;" />
          <span style="font-size: 13px; color: #374151; font-weight: 500;">새 파일 업로드</span>
        </label>
        <div style="display: flex; align-items: center; gap: 10px; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; background: white;">
          <button type="button" style="background: #8b5cf6; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 11px; font-weight: 500; cursor: pointer;">파일 선택</button>
          <input type="file" id="imageAssets" name="imageAssets" accept=".png,.jpg,.jpeg,.svg,.gif" multiple style="flex: 1; border: none; font-size: 12px; color: #6b7280; background: none;" />
          <span style="font-size: 11px; color: #9ca3af;">PNG, JPG, SVG (여러 파일)</span>
        </div>
      </div>
    </div>
  </div>

  <!-- 레퍼런스 이미지 -->
  <div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 0 10px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); display: flex; flex-direction: column;">
    <h4 style="font-size: 18px; font-weight: 600; color: #1f2937; margin: 0 0 2px 0;">
      🌟 레퍼런스 이미지 <span style="font-size: 12px; color: #9ca3af; font-weight: normal;">(선택사항)</span>
    </h4>
    <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 10px;">
      <div style="display: flex; flex-direction: column; gap: 8px; border: 1px solid #e5e7eb; border-radius: 6px; padding: 10px; background: #fafafa;">
        <div style="display: flex; align-items: center; gap: 10px; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; background: white;">
          <button type="button" style="background: #8b5cf6; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 11px; font-weight: 500; cursor: pointer;">파일 선택</button>
          <input type="file" id="references" name="references" accept=".png,.jpg,.jpeg,.gif,.webp" multiple style="flex: 1; border: none; font-size: 12px; color: #6b7280; background: none;" />
          <span style="font-size: 11px; color: #9ca3af;">이미지 파일 (여러 파일)</span>
        </div>
      </div>
    </div>
  </div>

</div>

---

## 📁 폴더 구조 미리보기

선택한 설정에 따라 자동으로 생성될 폴더 구조:

\`\`\`
my-project/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── utils/
│   └── styles/
├── public/
├── package.json
└── README.md
\`\`\`

---

## 📊 현재 설정 요약

**프로젝트 정보:**
- 프로젝트명: 미설정
- 프레임워크: 미선택
- 스타일링: 미선택

**상태 관리:**
- 클라이언트: 미선택
- 서버: 미선택

**파일 업로드:**
- 화면 설계서: 미업로드
- 목업 파일: 미업로드
- 요구사항 정의서: 미업로드
