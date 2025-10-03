# 한국모래상자치료학회 웹사이트 PRD (Product Requirements Document)

## 📋 프로젝트 개요

### 프로젝트 정보
- **프로젝트명**: 한국모래상자치료학회 공식 웹사이트
- **버전**: 0.1.0
- **프로덕션 URL**: https://sandtray25.vercel.app
- **프로젝트 목표**: 한국모래상자치료학회의 온라인 플랫폼 구축을 통한 회원 관리, 자격증 관리, 교육 프로그램 제공 및 학회 정보 공유

### 프로젝트 목적
한국모래상자치료학회는 모래상자치료(Sandtray Therapy)의 전문성을 높이고, 회원들의 지속적인 성장을 지원하며, 일반인들에게 모래상자치료에 대한 올바른 정보를 제공하는 것을 목적으로 합니다.

이 웹사이트는:
1. **정보 제공**: 모래상자치료에 대한 전문 정보 제공
2. **회원 관리**: 회원 가입, 로그인, 자격증 관리
3. **교육 지원**: 교육 프로그램, 수련기관, 강사 정보 제공
4. **커뮤니티**: 학회 소식, 공지사항, 자료 공유
5. **자격증 관리**: 2급, 1급, 전문가 자격증 과정 안내 및 관리

---

## 🎯 타겟 사용자

### 주요 사용자 그룹
1. **예비 회원**: 모래상자치료에 관심있는 심리상담 전공자 및 관련 분야 종사자
2. **정회원**: 학회에 가입한 모래상자상담사 2급 이상 자격 소지자
3. **교육분석가**: 교육분석 및 수퍼비전을 제공하는 전문가
4. **수련기관**: 교육 프로그램을 운영하는 기관
5. **일반인**: 모래상자치료 정보를 찾는 방문자

---

## 🏗️ 기술 스택

### 프론트엔드
- **프레임워크**: Next.js 14.2.32 (App Router)
- **언어**: TypeScript 5.9.2
- **스타일링**: Tailwind CSS 4.1.13
- **애니메이션**: Framer Motion 12.23.18
- **UI 컴포넌트**: 
  - Radix UI (접근성 최적화 컴포넌트)
  - shadcn/ui 커스텀 컴포넌트
  - Aceternity UI (프리미엄 UI 컴포넌트)
- **아이콘**: 
  - Tabler Icons React
  - Lucide React
  - React Icons
- **폰트**: Inter (Google Font), GMarketSans, Noto Sans KR

### 백엔드 & 데이터베이스
- **BaaS**: Supabase (인증, 데이터베이스, 스토리지)
- **데이터베이스**: PostgreSQL (via Supabase)
- **레거시 DB**: MySQL (sandtray_2014.sql - 마이그레이션 대상)
- **테이블 라이브러리**: TanStack React Table 8.21.3

### 인프라 & 배포
- **호스팅**: Vercel
- **CDN**: Vercel CDN (정적 파일)
- **백업 스토리지**: Cloudflare R2 (S3 호환)
- **버전 관리**: GitHub (자동 배포 연동)
- **배포 전략**: Git-based 자동 배포 (main 브랜치)

### 추가 통합
- **예약 시스템**: Cal.com Embed React 1.5.0
- **PDF 처리**: pdf-parse 1.1.1
- **테마**: next-themes 0.4.6 (다크/라이트 모드)
- **View Transitions**: next-view-transitions 0.3.4
- **3D 효과**: cobe 0.6.3

### 개발 도구
- **린터**: ESLint 8 (Next.js 설정)
- **PostCSS**: 8.5.3
- **타입 체킹**: TypeScript strict mode
- **경로 별칭**: `@/*` → 프로젝트 루트

---

## 📁 프로젝트 구조

```
sandtray25/
├── app/                          # Next.js App Router
│   ├── about/                    # 학회소개
│   │   ├── greeting/            # 학회장 인사말
│   │   ├── logo-meaning/        # 로고 의미
│   │   ├── purpose/             # 설립 목적
│   │   ├── articles/            # 학회 정관
│   │   ├── history/             # 연혁
│   │   ├── regulations/         # 규정 (윤리규정, 연구윤리규정)
│   │   └── organization/        # 조직도
│   ├── sandtray/                 # 모래상자치료 소개
│   │   ├── introduction/        # 개념 소개
│   │   ├── theory/              # 이론
│   │   ├── process/             # 치료 과정
│   │   ├── room/                # 상담실 구성
│   │   └── counselor/           # 상담사 역할
│   ├── certification/            # 자격증
│   │   └── process/             # 자격증 과정 (2급, 1급, 전문가)
│   ├── training/                 # 교육/수련
│   │   ├── institution/         # 수련기관 목록 (지역별)
│   │   └── instructor/          # 교육강사 등록
│   ├── resources/                # 자료실
│   │   ├── analyst/             # 교육분석가
│   │   ├── supervisor/          # 1급 강사/수퍼바이저
│   │   ├── expert/              # 전문가
│   │   └── counselor/           # 상담사
│   ├── login/                    # 로그인
│   ├── signup/                   # 회원가입
│   ├── mypage/                   # 마이페이지
│   ├── privacy/                  # 개인정보처리방침
│   ├── terms/                    # 이용약관
│   ├── sitemap/                  # 사이트맵
│   └── api/                      # API 라우트
│
├── components/                   # 재사용 가능 컴포넌트
│   ├── ui/                      # 기본 UI 컴포넌트
│   │   ├── background-gradient.tsx
│   │   ├── bento-grid.tsx
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── spotlight.tsx
│   │   ├── table.tsx
│   │   └── ...
│   ├── navbar.tsx               # 네비게이션 (데스크톱/모바일)
│   ├── footer.tsx               # 푸터
│   ├── hero.tsx                 # 히어로 섹션 (비디오 배경)
│   ├── notice-board.tsx         # 공지사항 게시판
│   ├── data-table.tsx           # 데이터 테이블
│   └── ...
│
├── constants/                    # 상수 정의
│   └── links.ts                 # 링크 상수
│
├── context/                      # React Context
│   └── providers.tsx            # Theme Provider
│
├── lib/                          # 유틸리티 함수
│   └── utils.ts                 # cn() 등 헬퍼 함수
│
├── public/                       # 정적 파일
│   ├── images/                  # 이미지 리소스
│   └── rules/                   # PDF 규정 파일
│
├── supabase/                     # Supabase 설정
│   └── config.toml              # 로컬 Supabase 설정
│
└── mysql/                        # 레거시 DB
    └── sandtray_2014.sql        # 기존 MySQL 스키마
```

---

## 🎨 디자인 시스템

### 색상 시스템
- **Primary**: 베이지/골드 톤 (#dab376 ~ #fadbb2)
- **Background Gradients**: 
  - 메인: 베이지-옐로우-그린-블루-핑크 그라데이션
  - 서브: 그레이 톤 그라데이션 (#fafafa ~ #94a3b8)
- **Text**: 
  - Dark: #1f2937, #374151
  - Light: #6b7280, #9ca3af
- **Accent**: 
  - Success: Green tones
  - Error: Red (#dc2626)
  - Info: Blue tones

### 타이포그래피
- **한글 폰트**:
  - 제목: GMarketSans (font-weight: 500, 700)
  - 본문: Noto Sans KR
  - 특수: Grandiflora One (장식적 요소)
- **영문 폰트**: Inter
- **크기 스케일**:
  - 메인 제목: 4xl ~ 5xl (모바일/데스크톱)
  - 서브 제목: 2xl ~ 3xl
  - 본문: base ~ lg
  - 캡션: sm ~ xs

### UI 패턴
1. **Glassmorphism**: 블러 효과 + 반투명 배경
2. **Gradient Cards**: BackgroundGradient 컴포넌트
3. **Spotlight Effects**: 동적 스팟라이트 효과
4. **Motion Animations**: Framer Motion 기반 인터랙션
5. **Bento Grid**: 카드 기반 레이아웃
6. **Responsive Navigation**: 
   - 데스크톱: 드롭다운 메뉴
   - 모바일: 햄버거 메뉴 + 아코디언

### 반응형 브레이크포인트
- **Mobile**: < 768px
- **Tablet**: 768px ~ 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1280px

---

## 📄 주요 페이지 및 기능

### 1. 메인 페이지 (`/`)
**목적**: 학회 소개 및 주요 정보 제공

**섹션**:
- Hero: 비디오 배경 + 메인 메시지
- Spotlight: 주요 공지사항
- Bento Grid: 주요 서비스 카드
- Number Stats: 학회 통계 (회원수, 자격증 발급 등)
- Now Start: CTA (시작하기)
- Background Gradient: 주요 프로그램 소개
- Community: 커뮤니티 섹션
- Footer: 연락처 및 링크

**기술 구현**:
- 비디오 재생 속도 제어 (playbackRate: 0.85)
- 스크롤 기반 애니메이션
- 그라데이션 배경 (linear-gradient 135deg)

### 2. 학회소개 (`/about/*`)

#### 2.1 학회장 인사말 (`/about/greeting`)
- 학회장 사진 + 인사말
- 2단 레이아웃 (사진 | 인사말)
- 모바일: 1단 레이아웃

#### 2.2 로고 의미 (`/about/logo-meaning`)
- 학회 로고 설명 및 의미

#### 2.3 설립 목적 (`/about/purpose`)
- 학회 설립 배경 및 비전

#### 2.4 학회 정관 (`/about/articles`)
- 정관 전문

#### 2.5 연혁 (`/about/history`)
- 학회 발전 과정 타임라인

#### 2.6 규정 (`/about/regulations`)
**특수 구현**:
- PDF 뷰어 통합 (pdf-parse)
- 탭 UI: 윤리규정, 연구윤리규정
- PDF 파일 경로: `/rules/r*.pdf`
- 컴포넌트:
  - `EthicsContent.tsx`: 윤리규정
  - `ResearchEthicsContent.tsx`: 연구윤리규정
  - `RulesHtmlViewer.tsx`: HTML 렌더링

#### 2.7 조직도 (`/about/organization`)
- 학회 조직 구조 시각화

### 3. 모래상자치료 소개 (`/sandtray/*`)

#### 3.1 소개 (`/sandtray/introduction`)
**내용**:
- 모래상자 치료의 개념
- 모래상자 치료의 이해
- 로웬펠드, 칼프 이론 소개

**UI**:
- BackgroundGradient 카드 레이아웃
- 섹션별 구분

#### 3.2 이론 (`/sandtray/theory`)
- 융 심리학 기반 이론
- 상징과 무의식

#### 3.3 과정 (`/sandtray/process`)
- 치료 단계별 설명

#### 3.4 상담실 (`/sandtray/room`)
- 모래상자 준비물
- 상담실 환경 구성

#### 3.5 상담사 (`/sandtray/counselor`)
- 상담사의 역할과 태도
- 윤리적 책임

### 4. 자격증 과정 (`/certification/process`)
**목적**: 자격증 취득 과정 안내

**자격 등급**:
1. **2급 모래상자상담사**
   - 자격요건: 관련 학사 + 워크샵 40시간
   - 교육연수: 20시간
   - 교육분석: 8회
   - 공개사례발표: 1회
   - 사례참관: 2회
   - 자격시험: 필기/실기
   - 자격갱신: 3년 (교육연수 20시간, 사례발표 3회 등)

2. **1급 모래상자상담사**
   - 자격요건: 2급 + 3년 경력
   - 교육연수: 40시간
   - 교육분석: 16회
   - 공개사례발표: 2회
   - 사례참관: 3회
   - 포스터발표: 1회
   - 자격갱신: 3년

3. **전문가 모래상자상담사**
   - 자격요건: 1급 + 3년 경력 + 석사 이상
   - 교육연수: 60시간
   - 교육분석: 24회
   - 공개사례발표: 4회
   - 사례참관: 6회
   - 면접시험: 있음
   - 자격갱신: 5년 (교육연수 40시간, 학술대회 3회 등)

**UI 구현**:
- Apple 스타일 비교표
- 3단 레이아웃 (2급 | 1급 | 전문가)
- 모바일: 스크롤 가능 테이블
- 색상 강조: 중요 항목 빨간색

### 5. 교육/수련 (`/training/*`)

#### 5.1 수련기관 (`/training/institution`)
**기능**:
- 지역별 수련기관 목록
- 필터링: 전체, 서울, 경기, 전남, 전북, 광주
- 정보:
  - 기관명
  - 주소
  - 연락처
  - 소장/센터장 정보 (자격 포함)

**데이터 구조**:
```typescript
type Center = {
  name: string;
  address: string;
  contact: string;
  managerLabel: string;
  region: string;
};
```

**UI**:
- 탭 기반 필터 (지역별)
- 카드 레이아웃
- 지역 태그 색상 구분
- BackgroundGradient 효과

#### 5.2 교육강사 등록 (`/training/instructor`)
**기능**: 교육강사 등록 신청

**폼 필드**:
- 이름
- 생년월일 (YYYY/MM/DD)
- 핸드폰 (000-0000-0000)
- 직장명
- 전자메일
- 우편번호
- 주소
- 파일 업로드 (자격증 등)

**폼 검증**:
- 필수 필드 체크
- 숫자 형식 검증
- 이메일 형식 검증
- 개인정보 처리방침 동의 필수

**UI**:
- FileUpload 컴포넌트
- 2단 그리드 레이아웃
- BackgroundGradient 카드

### 6. 자료실 (`/resources/*`)
- `/resources/analyst`: 교육분석가
- `/resources/supervisor`: 1급 강사/수퍼바이저
- `/resources/expert`: 전문가
- `/resources/counselor`: 상담사

### 7. 인증 (`/login`, `/signup`)
- 로그인/회원가입 페이지
- Supabase Auth 통합 (예정)

### 8. 마이페이지 (`/mypage`)
- 회원 정보 관리
- 자격증 현황
- 교육 이수 현황

### 9. 법적 페이지
- `/privacy`: 개인정보처리방침
- `/terms`: 이용약관

### 10. 사이트맵 (`/sitemap`)
- 전체 페이지 구조 안내

---

## 🗄️ 데이터베이스

### Supabase
프로젝트는 Supabase를 데이터베이스 및 백엔드 서비스로 사용합니다.

**설정 위치**:
- 로컬 설정: `supabase/config.toml`
- 환경 변수: `.env.local`

**MCP 통합**:
- Cursor에서 Supabase MCP 서버를 통해 데이터베이스에 접근 가능
- 설정 파일: `.cursor/mcp.json`
- 상세 가이드: `SUPABASE_MCP_SETUP.md` 참조

**레거시 데이터**:
- 기존 MySQL 데이터 (`mysql/sandtray_2014.sql`)는 Supabase로 마이그레이션 예정

---

## 🔐 인증 및 권한

### 인증 방식
- **Provider**: Supabase Auth
- **로그인 방법**:
  - 이메일/비밀번호
  - (향후) 소셜 로그인 (Google, Kakao 등)

### 사용자 권한 레벨
1. **비회원**: 공개 페이지만 열람
2. **정회원**: 자료실 접근, 교육 신청
3. **교육분석가**: 교육분석 관리
4. **관리자**: 전체 관리 권한

### 보호된 라우트
- `/mypage/*`: 로그인 필요
- `/resources/*`: 정회원 이상
- `/admin/*`: 관리자 전용 (미구현)

---

## 🎯 핵심 기능 요구사항

### 1. 회원 관리
- [x] 회원가입/로그인 UI
- [ ] Supabase Auth 통합
- [ ] 회원 정보 관리
- [ ] 비밀번호 재설정
- [ ] 이메일 인증

### 2. 자격증 관리
- [x] 자격증 과정 안내 페이지
- [ ] 자격증 신청 시스템
- [ ] 자격증 발급 관리
- [ ] 갱신 알림 기능
- [ ] 자격증 조회 시스템

### 3. 교육 관리
- [x] 수련기관 목록
- [x] 교육강사 등록 폼
- [ ] 교육 프로그램 등록
- [ ] 교육 신청 시스템
- [ ] 이수증 발급

### 4. 커뮤니티
- [ ] 공지사항 게시판
- [ ] 회원 소식
- [ ] Q&A 게시판
- [ ] 포토 갤러리
- [ ] 추천 도서
- [ ] 서식 다운로드

### 5. 예약 시스템
- [x] Cal.com 통합
- [ ] 교육분석 예약
- [ ] 수퍼비전 예약

### 6. 관리자 기능
- [ ] 회원 관리 대시보드
- [ ] 자격증 심사/발급
- [ ] 게시판 관리
- [ ] 통계 및 리포트

---

## 🚀 성능 최적화

### 이미지 최적화
- Next.js Image 컴포넌트 사용
- `priority` 속성으로 중요 이미지 우선 로딩
- Remote Patterns: aceternity.com, unsplash.com
- Vercel CDN 활용

### 비디오 최적화
- `preload="auto"` 설정
- playbackRate 조절로 용량 절감 효과
- 로컬 호스팅 (Vercel CDN)

### 코드 스플리팅
- Next.js 자동 코드 스플리팅
- Dynamic imports (필요 시)
- 컴포넌트 lazy loading

### 캐싱 전략
- Vercel Edge Caching
- Supabase 캐싱
- Static Generation (가능한 페이지)

### 성능 목표
- Lighthouse Score: 90+ (모든 지표)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s

---

## 🔧 개발 환경 설정

### 환경 변수 (`.env.local`)
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_JWT_SECRET=your_jwt_secret

# Supabase MCP (Cursor)
SUPABASE_ACCESS_TOKEN=your_access_token

# Cloudflare R2
R2_ENDPOINT=https://accountid.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=your_bucket_name
R2_PUBLIC_BASE_URL=your_public_url

# 기타
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 개발 명령어
```bash
# 개발 서버 실행
npm run dev          # http://localhost:3000

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린팅
npm run lint

# 타입 체크
npx tsc --noEmit
```

### Supabase 로컬 개발
```bash
# Supabase 시작
supabase start       # http://127.0.0.1:54323 (Studio)

# 마이그레이션
supabase migration new <name>
supabase db push

# 데이터베이스 리셋
supabase db reset
```

---

## 📦 배포 전략

### Git 워크플로우
1. `main` 브랜치: 프로덕션
2. `develop` 브랜치: 개발 (권장)
3. Feature 브랜치: `feature/*`
4. Hotfix 브랜치: `hotfix/*`

### Vercel 자동 배포
- **Production**: `main` 브랜치 푸시 시
- **Preview**: PR 생성 시 자동 프리뷰 배포
- **환경 변수**: Vercel 대시보드에서 관리

### 배포 체크리스트
- [ ] 타입 에러 없음 (`npx tsc --noEmit`)
- [ ] 린트 에러 없음 (`npm run lint`)
- [ ] 빌드 성공 (`npm run build`)
- [ ] 환경 변수 설정 (Vercel)
- [ ] Supabase 프로덕션 DB 마이그레이션
- [ ] 이미지 도메인 설정 (`next.config.mjs`)

---

## 🔒 보안 고려사항

### 데이터 보호
- 환경 변수 절대 커밋 금지
- `.env.local`만 사용
- `NEXT_PUBLIC_*`만 클라이언트 노출

### Supabase RLS (Row Level Security)
- 모든 테이블에 RLS 정책 설정
- 사용자별 데이터 접근 제한
- 공개 테이블: 읽기 전용

### 인증 보안
- JWT 토큰 관리
- 비밀번호 해싱 (Supabase 자동)
- 세션 타임아웃 설정

### API 보안
- CORS 설정
- Rate limiting (Vercel Edge)
- API 라우트 인증 체크

---

## 🧪 테스트 전략

### 테스트 유형 (향후 구현)
1. **단위 테스트**: Jest + React Testing Library
2. **통합 테스트**: 컴포넌트 상호작용
3. **E2E 테스트**: Playwright
4. **시각적 회귀 테스트**: Chromatic (선택)

### 테스트 우선순위
1. 인증 플로우
2. 자격증 신청 프로세스
3. 폼 검증
4. 네비게이션
5. 반응형 레이아웃

---

## 📊 분석 및 모니터링

### 분석 도구 (향후 통합)
- **Google Analytics 4**: 사용자 행동 분석
- **Vercel Analytics**: 성능 모니터링
- **Sentry**: 에러 트래킹

### 주요 메트릭
- 페이지뷰
- 사용자 플로우
- 자격증 신청 전환율
- 교육 프로그램 신청 현황
- 에러율

---

## 🗓️ 개발 로드맵

### Phase 1: 기반 구축 (완료)
- [x] Next.js 프로젝트 초기화
- [x] 기본 페이지 구조
- [x] UI 컴포넌트 라이브러리
- [x] 네비게이션 시스템
- [x] 반응형 디자인
- [x] Vercel 배포

### Phase 2: 콘텐츠 구축 (완료)
- [x] 학회소개 페이지
- [x] 모래상자치료 소개 페이지
- [x] 자격증 과정 안내
- [x] 수련기관 목록
- [x] 교육강사 등록 폼

### Phase 3: 인증 및 회원 관리 (진행 중)
- [ ] Supabase Auth 통합
- [ ] 로그인/회원가입 기능
- [ ] 마이페이지 구현
- [ ] 권한 관리 시스템

### Phase 4: 데이터베이스 및 백엔드 (예정)
- [ ] MySQL → Supabase 마이그레이션
- [ ] 회원 데이터 관리
- [ ] 자격증 데이터 관리
- [ ] 교육 이수 데이터 관리

### Phase 5: 커뮤니티 기능 (예정)
- [ ] 공지사항 게시판
- [ ] 회원 소식
- [ ] Q&A 게시판
- [ ] 포토 갤러리
- [ ] 파일 다운로드

### Phase 6: 관리자 기능 (예정)
- [ ] 관리자 대시보드
- [ ] 회원 관리
- [ ] 자격증 심사/발급
- [ ] 게시판 관리
- [ ] 통계 리포트

### Phase 7: 최적화 및 고도화 (예정)
- [ ] 성능 최적화
- [ ] SEO 최적화
- [ ] 접근성 개선
- [ ] 다국어 지원 (검토)
- [ ] PWA 변환 (검토)

---

## 🤝 기여 가이드

### 코딩 규칙
1. **언어**: 모든 커뮤니케이션은 한국어
2. **TypeScript**: strict mode 준수
3. **들여쓰기**: 2 spaces
4. **컴포넌트**: PascalCase
5. **파일명**: kebab-case
6. **Hooks**: `use*` prefix
7. **Client Component**: `"use client"` 명시
8. **Import**: `@/*` 별칭 사용

### 커밋 메시지
- `feat:` 새로운 기능
- `fix:` 버그 수정
- `docs:` 문서 수정
- `style:` 코드 스타일 변경
- `refactor:` 리팩토링
- `test:` 테스트 추가/수정
- `chore:` 빌드/설정 변경

### PR 가이드라인
- 명확한 제목과 설명
- 이슈 번호 참조 (`Closes #123`)
- UI 변경 시 스크린샷 포함
- 테스트 결과 포함
- 리뷰어 지정

---

## 📞 연락처 및 지원

### 기술 지원
- **개발팀**: [개발팀 이메일]
- **이슈 트래킹**: GitHub Issues
- **문서**: 이 PRD 문서

### 학회 연락처
- **웹사이트**: https://sandtray25.vercel.app
- **이메일**: [학회 공식 이메일]
- **주소**: [학회 주소]

---

## 📝 변경 이력

### v0.1.0 (2025-10-02)
- 초기 PRD 문서 작성
- 프로젝트 구조 및 기술 스택 정의
- 주요 페이지 및 기능 명세
- 데이터베이스 스키마 설계
- 개발 로드맵 수립

---

## 🔗 참고 자료

### 외부 문서
- [Next.js 14 문서](https://nextjs.org/docs)
- [Supabase 문서](https://supabase.com/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [Framer Motion 문서](https://www.framer.com/motion/)
- [Vercel 배포 가이드](https://vercel.com/docs)

### 내부 문서
- `README.md`: 프로젝트 개요 및 시작 가이드
- `SUPABASE_MCP_SETUP.md`: Cursor용 Supabase MCP 설정
- `AGENTS.md`: AI 에이전트 가이드 (있는 경우)
- `CLAUDE.md`: Claude AI 가이드 (있는 경우)
- `HISTORY.md`: 프로젝트 변경 이력 (있는 경우)

---

**마지막 업데이트**: 2025년 10월 2일  
**문서 버전**: 1.0.0  
**작성자**: AI 개발 어시스턴트 (Claude)  
**검토자**: [검토자 이름]

