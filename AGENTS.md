# Repository Guidelines

## 최우선 원칙 (Language)
- 이 저장소와 관련된 모든 커뮤니케이션(이슈, PR, 커밋 메시지, 리뷰, 문서, 에이전트/봇 응답)은 반드시 한국어로 작성합니다.
- 코드 식별자, 라이브러리/프레임워크 이름, 표준 기술 용어는 영어 사용을 허용합니다.

## Project Structure & Module Organization
- App Router in `app/` (routes at `app/<segment>/page.tsx`, root shell `app/layout.tsx`, styles `app/globals.css`).
- Reusable UI in `components/` and `components/ui/`; shared values in `constants/`, context in `context/`, helpers in `lib/`, static assets in `public/`.
- TypeScript config in `tsconfig.json` (alias `@/*` → project root) and framework config in `next.config.mjs`.

## Build, Test, and Development Commands
- `npm run dev` — start local dev server at `http://localhost:3000`.
- `npm run build` — production build (Next.js 14 App Router).
- `npm start` — run the built app.
- `npm run lint` — lint with Next/ESLint defaults.
- Type-check (no script): `npx tsc --noEmit`.

## Coding Style & Naming Conventions
- Language: TypeScript (strict). Prefer 2-space indentation and single-responsibility modules.
- React components use PascalCase names; files/components in `components/` use kebab-case filenames (e.g., `logo-clouds.tsx`).
- Hooks start with `use*` (e.g., `app/hooks/useCalEmbed.ts`). Add `"use client"` at top for client components that use state/effects.
- Use the `@/*` alias for root-relative imports (e.g., `import { X } from '@/components/x'`).

## Testing Guidelines
- No test suite is configured yet. For unit/UI tests, prefer Jest + React Testing Library; for e2e, Playwright.
- Suggested naming: collocate `*.test.tsx` next to components or use `__tests__/` mirrors.
- Aim for smoke tests on pages and interaction tests for critical components.

## Commit & Pull Request Guidelines
- Use concise, imperative commit messages. Prefer Conventional Commits when possible: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`.
- PRs should be small and focused. Include:
  - Clear description and rationale; reference issues (e.g., `Closes #123`).
  - Screenshots/GIFs for UI changes.
  - Notes on testing and any config/env changes.

## Security & Configuration Tips
- Store secrets in `.env.local`; never commit env files. Expose only public keys as `NEXT_PUBLIC_*`.
- Allowed external image domains are set in `next.config.mjs`; update if adding new sources.
- Use Node 18+ and a recent npm. Verify type safety with `npx tsc --noEmit` before pushing.
