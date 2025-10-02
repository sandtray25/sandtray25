# Next.js 하이드레이션 에러 방지 규칙

## 개요
Next.js에서 서버사이드 렌더링(SSR)과 클라이언트 하이드레이션 간 HTML 불일치로 인한 에러를 방지하기 위한 규칙입니다.

## 주요 규칙

### 1. 폰트 로딩 방식
❌ **금지사항**
- `layout.tsx`의 `<style>` 태그 내에서 템플릿 리터럴로 `@font-face` 정의
- 서버와 클라이언트 간 HTML 인코딩 차이 발생

```tsx
// ❌ 잘못된 방식
<style>
  {`
    @font-face {
      font-family: 'CustomFont';
      src: url('font.woff2') format('woff2');
    }
  `}
</style>
```

✅ **권장사항**
- `globals.css`에서 `@font-face` 정의
- 또는 Next.js Font 최적화 기능 사용

```css
/* ✅ 올바른 방식 - globals.css */
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
```

### 2. 동적 콘텐츠 처리
❌ **금지사항**
- 클라이언트에서만 사용 가능한 API를 서버 렌더링 시 사용
- `window`, `document` 등 브라우저 전용 객체 직접 사용

✅ **권장사항**
- `useEffect` 훅으로 클라이언트 전용 로직 분리
- `typeof window !== 'undefined'` 조건 검사
- `suppressHydrationWarning` 속성 신중히 사용

### 3. CSS-in-JS 사용 시 주의사항
❌ **금지사항**
- 서버와 클라이언트에서 다른 스타일 생성
- 동적 클래스명이나 해시 불일치

✅ **권장사항**
- 안정적인 CSS 클래스명 사용
- 조건부 스타일링 시 서버/클라이언트 일관성 보장

### 4. 날짜/시간 처리
❌ **금지사항**
- 서버와 클라이언트의 시간대 차이로 인한 불일치
- `new Date()` 직접 렌더링

✅ **권장사항**
- ISO 문자열이나 타임스탬프 사용
- 클라이언트에서 현지화 처리

## 디버깅 방법

### 1. 개발자 도구 확인
```bash
# 개발 모드에서 하이드레이션 에러 확인
npm run dev
```

### 2. 빌드 테스트
```bash
# 프로덕션 빌드로 SSR 문제 확인
npm run build
npm run start
```

### 3. 에러 로그 분석
- 콘솔에서 "Text content does not match server-rendered HTML" 메시지 확인
- 서버와 클라이언트 HTML 차이점 비교

## 체크리스트

- [ ] 폰트 정의가 `globals.css`에 있는가?
- [ ] `layout.tsx`에 템플릿 리터럴 스타일이 없는가?
- [ ] 동적 콘텐츠가 `useEffect`로 처리되는가?
- [ ] 브라우저 전용 API 사용 시 조건 검사가 있는가?
- [ ] 빌드 후 하이드레이션 에러가 발생하지 않는가?

## 참고 자료
- [Next.js Hydration Error 공식 문서](https://nextjs.org/docs/messages/react-hydration-error)
- [Next.js Font Optimization](https://nextjs.org/docs/basic-features/font-optimization)
