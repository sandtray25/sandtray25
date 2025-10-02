# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ 최중요 강령 (CRITICAL DIRECTIVE)
**이 저장소에서 작업할 때는 반드시 한국어로만 소통하고 응답해야 합니다.**
**Always communicate and respond ONLY in Korean when working with this repository.**

## Development Commands

```bash
# Development
npm run dev          # Start development server on http://localhost:3000
npm run build        # Create production build
npm run start        # Start production server
npm run lint         # Run ESLint

# Testing
# No test configuration found - tests should be added if needed
```

## Architecture Overview

This is a **Korean Sand Tray Therapy Association** website built with **Next.js 14** using the App Router pattern. The site is primarily in Korean and features a modern design with UI components from Aceternity UI and shadcn/ui.

### Key Technologies
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS v4.x with CSS variables
- **UI Components**: Mix of shadcn/ui (New York style) and Aceternity UI components
- **Animations**: Framer Motion for smooth interactions
- **Theme**: Dark/light mode support via next-themes
- **Icons**: Lucide React, Tabler Icons, React Icons

### Project Structure
```
app/
├── layout.tsx              # Root layout with providers and navigation
├── page.tsx               # Homepage with hero, spotlight, bento grid, CTA
├── about/                 # 협회 소개 (Association Introduction)
│   ├── greeting/          # 인사말
│   ├── logo-meaning/      # 로고 의미
│   ├── purpose/           # 설립 목적
│   ├── articles/          # 정관
│   ├── history/           # 연혁
│   ├── organization/      # 조직도
│   └── regulations/       # 규정
├── sandtray/             # 모래상자 (Sand Tray)
│   ├── introduction/     # 소개
│   ├── theory/           # 이론
│   ├── process/          # 과정
│   ├── room/             # 상담실
│   └── counselor/        # 상담사
├── certification/        # 자격증 (Certification)
│   └── process/          # 자격 과정
├── training/             # 교육 (Training)
│   ├── instructor/       # 강사진
│   └── institution/      # 교육 기관
├── resources/            # 인적 자원 (Human Resources)
│   ├── counselor/        # 상담사
│   ├── expert/           # 전문가
│   ├── supervisor/       # 수퍼바이저
│   └── analyst/          # 분석가
├── login/page.tsx        # Login page
├── signup/page.tsx       # Signup page
├── mypage/page.tsx       # My page
├── terms/page.tsx        # Terms of service
├── privacy/page.tsx      # Privacy policy
├── sitemap/page.tsx      # Site map
├── hooks/                # Custom hooks (useCalEmbed)
└── globals.css           # Global styles and font definitions

components/
├── ui/               # Reusable UI components (shadcn + Aceternity)
├── navbar.tsx        # Main navigation with dropdown menus
├── hero.tsx          # Hero section with video/image background
├── footer.tsx        # Site footer
├── login.tsx         # Login form component
├── features.tsx      # Features showcase
├── pricing.tsx       # Pricing table
├── data-table.tsx    # Data table with sorting
└── *-demo.tsx        # Component demos

context/
└── providers.tsx     # Theme provider wrapper

lib/
└── utils.ts          # Utility functions (cn for className merging)
```

### Important Architectural Notes

#### Hydration Prevention Rules
This project has specific **Korean-language hydration prevention rules** in `.cursor/hydration-prevention-rules.md`:
- **DO NOT** define `@font-face` in template literals within `layout.tsx`
- **USE** `globals.css` for all font definitions
- **AVOID** server/client HTML mismatches with dynamic content
- **TEST** with `npm run build && npm run start` to catch hydration issues

#### Next.js Configuration
- **Remote Images**: Allowed from `assets.aceternity.com` and `images.unsplash.com`
- **Webpack**: Cache disabled in development mode (`cache: false` in dev)
- **Styling**: Tailwind CSS v4 with PostCSS (no traditional config file - uses `@import` in CSS)

#### Component System
- **shadcn/ui**: New York style with neutral base color, CSS variables enabled
- **Path Aliases**: `@/components`, `@/lib`, `@/utils`, `@/hooks` configured
- **Aceternity Registry**: Additional components from `ui.aceternity.com`

#### Theme System
- **Provider**: Custom `ThemeProvider` wrapper for next-themes
- **Support**: System, light, and dark themes
- **CSS Variables**: Used for consistent color theming

### Key Components & Integrations
- **Hero**: Video background with fallback image, Korean text overlay
- **BentoGrid**: Feature showcase with hover effects
- **DataTable**: Sortable table with TanStack React Table
- **Login**: Authentication form with Cal.com embed integration (`@calcom/embed-react`)
- **Navbar**: Multi-level dropdown navigation for Korean/English sections
- **Footer**: Site navigation and branding

### Cal.com Integration
- **Package**: `@calcom/embed-react` v1.5.0
- **Hook**: `useCalEmbed` in `app/hooks/`
- **Purpose**: Embedded scheduling/booking functionality (likely for counseling sessions)

### Development Guidelines
- **Korean Language First**: All UI text must be in Korean (협회 소개, 모래상자, 자격증 등)
- **Hydration Safety**: ALWAYS test with `npm run build && npm run start` before deployment
- **Font Definitions**: Use `globals.css` only - NEVER template literals in `layout.tsx`
- **Component Patterns**: Follow shadcn/ui (New York) and Aceternity UI conventions
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Theme Consistency**: Use CSS variables for all color theming
- **Path Aliases**: Use `@/components`, `@/lib`, `@/utils`, `@/hooks` for imports

### Default Background Color
**표준 배경 그라데이션 (Default Background Gradient):**
모든 페이지에서 기본적으로 사용할 배경 그라데이션은 다음과 같습니다:

```css
background: linear-gradient(135deg,
  #fafafa 0%,
  #f8f9fa 20%,
  #f1f5f9 40%,
  #e2e8f0 60%,
  #cbd5e1 80%,
  #94a3b8 100%)
```

이 그라데이션은:
- 부드러운 그레이 톤으로 구성
- 눈에 편안하고 텍스트 가독성이 좋음
- 전문적이고 세련된 느낌 제공
- 모든 페이지에서 일관성 있는 디자인 유지

새로운 페이지를 만들 때는 이 배경 그라데이션을 기본으로 사용하세요.

## Supabase Integration

이 프로젝트는 Supabase를 백엔드 서비스로 활용할 준비가 되어 있습니다:
- **MCP Server**: Claude Code는 Supabase MCP 서버 도구를 사용할 수 있습니다
- **주요 기능**: 인증(auth), 데이터베이스(PostgreSQL), 스토리지, 실시간 기능
- **사용 가능한 작업**:
  - 데이터베이스 마이그레이션 (`apply_migration`, `list_migrations`)
  - SQL 실행 (`execute_sql`)
  - Edge Functions 관리 (`deploy_edge_function`, `list_edge_functions`)
  - 개발 브랜치 관리 (`create_branch`, `merge_branch`)
  - 로그 조회 및 보안 진단 (`get_logs`, `get_advisors`)
- **주의사항**: Supabase 프로젝트가 구성되어 있어야 MCP 도구를 사용할 수 있습니다