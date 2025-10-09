# 📚 문서 목록

한국모래상자치료학회 프로젝트의 모든 문서를 한 곳에서 확인하세요.

---

## 📋 프로젝트 문서

### [AGENTS.md](./AGENTS.md)
AI 에이전트 및 개발 도구 설정 가이드

### [HISTORY.md](./HISTORY.md)
프로젝트 개발 히스토리 및 변경 이력

### [PRD.md](./PRD.md)
제품 요구사항 문서 (Product Requirements Document)

---

## 🚀 배포 및 설정 가이드

### 배포 가이드
- [Vercel 배포 가이드](./guides/vercel-deployment.md) - Vercel을 통한 프로덕션 배포
- [R2 CDN 설정](./guides/r2-cdn-setup.md) - Cloudflare R2를 이용한 CDN 설정

### Supabase 설정
- [Supabase MCP 가이드](./guides/supabase-mcp.md) - MCP를 통한 Supabase 통합
- [Supabase 초기 설정](./guides/supabase-setup.md) - Supabase 기본 설정

---

## 🗄️ 데이터베이스

### [스키마 문서](./database/schema.md)
데이터베이스 테이블 구조, 마이그레이션, RLS 정책

---

## 💻 개발 가이드

### [CLAUDE.md](./development/CLAUDE.md)
Claude AI를 활용한 개발 가이드 및 프롬프트 템플릿

---

## 📂 문서 구조

```
docs/
├── README.md                      # 이 파일
├── AGENTS.md                      # AI 에이전트 설정
├── HISTORY.md                     # 개발 히스토리
├── PRD.md                         # 제품 요구사항
├── guides/                        # 설정 및 배포 가이드
│   ├── supabase-mcp.md           # Supabase MCP 통합
│   ├── supabase-setup.md         # Supabase 초기 설정
│   ├── r2-cdn-setup.md           # R2 CDN 설정
│   └── vercel-deployment.md      # Vercel 배포
├── database/                      # 데이터베이스 관련
│   └── schema.md                 # 스키마 및 마이그레이션
└── development/                   # 개발 도구
    └── CLAUDE.md                 # Claude 개발 가이드
```

---

## 🔗 빠른 링크

### 시작하기
1. [프로젝트 README](../README.md) - 프로젝트 소개
2. [Supabase 초기 설정](./guides/supabase-setup.md)
3. [개발 환경 구성](./development/CLAUDE.md)

### 배포하기
1. [Vercel 배포](./guides/vercel-deployment.md)
2. [R2 CDN 설정](./guides/r2-cdn-setup.md)

### 개발하기
1. [데이터베이스 스키마](./database/schema.md)
2. [Supabase MCP 사용법](./guides/supabase-mcp.md)
3. [AI 에이전트 활용](./AGENTS.md)

---

## 📝 문서 작성 규칙

문서 작성 시 다음 규칙을 따라주세요:

1. **마크다운 형식** 사용
2. **한국어** 작성 (기술 용어는 영어 사용 가능)
3. **명확한 제목**과 섹션 구분
4. **코드 예시** 포함 (필요시)
5. **스크린샷** 또는 다이어그램 추가 (필요시)
6. **업데이트 날짜** 명시

---

**마지막 업데이트**: 2025-10-09  
**관리자**: 한국모래상자치료학회 개발팀

