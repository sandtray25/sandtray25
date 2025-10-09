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

# Type checking (before deployment)
npx tsc --noEmit     # Verify TypeScript types without emitting files

# Testing hydration issues (CRITICAL before any deployment)
npm run build && npm run start  # Always test to catch SSR/hydration errors

# UI component management
npx shadcn@latest add [component]                    # Add shadcn/ui component
npx shadcn@latest add https://ui.aceternity.com/...  # Add Aceternity UI component
```

## Recent Updates

### Major Version Upgrades
- **Next.js**: Upgraded from 14.x to **15.5.4**
  - Enhanced App Router performance
  - Improved server components optimization
  - Better hydration handling
- **React**: Upgraded from 18.x to **19.2.0**
  - New concurrent features
  - Improved performance and stability
  - Enhanced TypeScript support
- **New Visual Effects**: Added `liquid-glass-react` v1.1.1
  - Apple-style liquid glass effect
  - Mouse-reactive visual interactions
  - Chrome-optimized rendering

## Architecture Overview

This is a **Korean Sand Tray Therapy Association** website built with **Next.js 15** using the App Router pattern. The site is primarily in Korean and features a modern design with UI components from Aceternity UI and shadcn/ui.

### Key Technologies
- **Framework**: Next.js 15.5.4 with App Router
- **Runtime**: React 19.2.0, Node.js 18+
- **Styling**: Tailwind CSS v4.1.13 with CSS variables (no traditional config file)
- **UI Components**: shadcn/ui (New York style) + Aceternity UI custom registry
- **Animations**: Framer Motion 12.x for smooth interactions
- **Visual Effects**: liquid-glass-react v1.1.1 (Apple liquid glass effect)
- **Theme**: Dark/light mode via next-themes with CSS variables
- **Icons**: Lucide React (primary), Tabler Icons, React Icons
- **Database**: Supabase (PostgreSQL) with RLS support
- **Storage**: Cloudflare R2 (S3-compatible backup storage)
- **Analytics**: Vercel Analytics + Speed Insights

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

### Liquid Glass Effect
- **Package**: `liquid-glass-react` v1.1.1
- **Purpose**: Apple-style liquid glass visual effect with displacement, blur, and chromatic aberration
- **Features**:
  - Configurable displacement intensity, blur amount, saturation
  - Mouse-reactive liquid effect with elasticity
  - Chromatic aberration for depth
- **Browser Compatibility**:
  - Full effect in Chrome/Chromium browsers
  - Partial support in Safari/Firefox (displacement not visible)
- **Usage Example**:
  ```jsx
  import LiquidGlass from 'liquid-glass-react'

  <LiquidGlass
    displacementScale={0.5}
    blurAmount={10}
    saturation={1.2}
    elasticity={0.8}
  >
    <div>Content with glass effect</div>
  </LiquidGlass>
  ```

### Development Guidelines
- **Korean Language First**: All UI text must be in Korean (협회 소개, 모래상자, 자격증 등)
- **Hydration Safety**: ALWAYS test with `npm run build && npm run start` before deployment
- **Font Definitions**: Use `globals.css` only - NEVER template literals in `layout.tsx`
- **Component Patterns**: Follow shadcn/ui (New York) and Aceternity UI conventions
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Theme Consistency**: Use CSS variables for all color theming
- **Path Aliases**: Use `@/components`, `@/lib`, `@/utils`, `@/hooks` for imports
- **Type Safety**: Run `npx tsc --noEmit` before committing to catch type errors
- **Branch Strategy**: Work on feature branches, merge to `main` triggers auto-deploy
- **React 19 Compatibility**: Ensure all dependencies support React 19 before upgrading
- **Visual Effects**: Test liquid-glass effects in Chrome for full experience

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

## Backend & Infrastructure

### Deployment
- **Platform**: Vercel (https://sandtray25.vercel.app)
- **Repository**: GitHub (automatic deployment configured)
- **CDN**: Vercel CDN for static assets
- **Workflow**: Push to `main` branch → Vercel auto-builds and deploys

### Supabase Integration
이 프로젝트는 Supabase를 백엔드 서비스로 활용할 준비가 되어 있습니다:
- **Package**: `@supabase/supabase-js` v2.58.0 installed
- **주요 기능**: 인증(auth), 데이터베이스(PostgreSQL), 스토리지, 실시간 기능
- **환경 변수** (`.env.local`에 설정):
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (서버 전용)
  - `SUPABASE_JWT_SECRET`
- **주의사항**: RLS(Row Level Security) 정책을 활성화하여 최소 권한 원칙을 준수하세요

### Cloudflare R2
- **Purpose**: S3-compatible backup storage
- **환경 변수**:
  - `R2_ENDPOINT`
  - `R2_ACCESS_KEY_ID`
  - `R2_SECRET_ACCESS_KEY`
  - `R2_BUCKET_NAME`
  - `R2_PUBLIC_BASE_URL` (optional)

### Environment Variables
로컬 개발은 `.env.local`, 프로덕션 환경 변수는 Vercel 프로젝트 설정에서 관리합니다.
- 비밀값은 절대 커밋하지 마세요
- 클라이언트 노출 가능한 키만 `NEXT_PUBLIC_*` 접두사 사용
- `.env.example` 파일을 참고하여 필요한 환경 변수 설정

## Common Workflows

### Adding a New Page
1. Create page file: `app/[section]/[subsection]/page.tsx`
2. Use standard background gradient (see Default Background Color section)
3. Ensure all text content is in Korean
4. Test hydration: `npm run build && npm run start`
5. Type check: `npx tsc --noEmit`

### Adding UI Components
```bash
# shadcn/ui component
npx shadcn@latest add button

# Aceternity UI component (check registry URL first)
npx shadcn@latest add https://ui.aceternity.com/registry/[component].json
```

### Working with Supabase
1. Define database schema in Supabase dashboard
2. Enable RLS (Row Level Security) policies
3. Use `@supabase/supabase-js` client in API routes or server components
4. Store credentials in `.env.local` and Vercel environment variables

### Deployment Checklist
- [ ] All Korean text properly displayed
- [ ] `npm run build` succeeds without errors
- [ ] `npm run start` works without hydration errors
- [ ] `npx tsc --noEmit` passes type checking
- [ ] Environment variables set in Vercel dashboard
- [ ] Test on mobile and desktop viewports
- [ ] Verify remote images load from allowed domains

## Troubleshooting

### Hydration Errors
- **Symptom**: "Text content does not match server-rendered HTML"
- **Common Causes**:
  - `@font-face` in template literals (use `globals.css` instead)
  - Browser APIs (`window`, `document`) used in server components
  - Date/time rendering differences between server and client
- **Solution**: Review `.cursor/hydration-prevention-rules.md` and test with production build

### Type Errors
- Run `npx tsc --noEmit` to see all TypeScript errors
- Check `tsconfig.json` path aliases match actual file structure
- Ensure all imported components have proper type definitions

### Image Loading Issues
- Verify domain is in `next.config.mjs` `remotePatterns`
- Currently allowed: `assets.aceternity.com`, `images.unsplash.com`
- For new domains, add to `remotePatterns` array

### Build Failures on Vercel
- Check Vercel build logs for specific errors
- Ensure all dependencies in `package.json`
- Verify environment variables are set in Vercel dashboard
- Check Node.js version compatibility (18+)