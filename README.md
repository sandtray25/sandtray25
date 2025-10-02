이 프로젝트는 [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)으로 부트스트랩된 [Next.js](https://nextjs.org/) 애플리케이션입니다.

## 인프라 & 배포

- **배포**: Vercel (프로덕션: https://sandtray25.vercel.app)
- **저장소**: GitHub (자동 배포 설정 완료)
- **데이터베이스**: Supabase
- **정적 파일**: Vercel CDN (성능 최적화 완료)
- **백업 스토리지**: Cloudflare R2 (S3 호환)

### 배포 흐름
- `main` 브랜치로 GitHub 푸시 → Vercel이 자동 빌드/배포
- 로컬 개발 환경은 `.env.local` 사용, 프로덕션 환경 변수는 Vercel 프로젝트 설정에서 관리

### 🚀 성능 최적화
- **정적 파일**: Vercel CDN을 통한 빠른 이미지/비디오 서빙
- **우선순위 로딩**: 중요한 이미지에 `priority` 속성 적용
- **비디오 사전 로딩**: `preload="auto"`로 빠른 재생 시작
- **캐시 최적화**: Vercel Cache HIT으로 빠른 로딩

### 환경 변수 (.env.local 예시)
```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
# 서버 전용 (필요 시)
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_JWT_SECRET=

# Cloudflare R2 (S3 호환)
R2_ENDPOINT= # 예: https://<accountid>.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
# 퍼블릭 URL/도메인(이미지 접근용, 선택)
R2_PUBLIC_BASE_URL=
```

주의사항
- 비밀값은 절대 커밋하지 말고 `.env.local`에만 저장하세요.
- 클라이언트에 노출 가능한 키만 `NEXT_PUBLIC_*` 접두사를 사용하세요.
- 이미지 등 외부 리소스를 사용한다면 `next.config.mjs`의 `images.domains`에 해당 도메인을 추가하세요.

### Supabase 설정 팁
- Project → API에서 `URL`과 `anon key`를 발급받아 `NEXT_PUBLIC_*`에 설정
- 서버 측에서 관리자 권한 작업이 필요하면 `SERVICE_ROLE_KEY`를 서버 전용으로 사용(클라이언트에 노출 금지)
- RLS(Row Level Security) 정책을 켜고, 필요한 정책을 정의하여 최소 권한 원칙 준수

### Cloudflare R2 설정 팁
- R2 → Bucket 생성 후 Access Keys 발급 (S3 호환)
- SDK는 S3 호환 클라이언트(AWS SDK v3 등)를 사용하여 `R2_ENDPOINT`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`로 서명 요청
- 퍼블릭 액세스가 필요한 정적 파일은 퍼블릭 도메인(CDN/커스텀 도메인) 설정 후 `R2_PUBLIC_BASE_URL`로 접근 경로 구성

### Vercel 설정 팁
- Vercel 프로젝트에 GitHub 저장소 연결
- Vercel → Settings → Environment Variables에 위 환경 변수 등록(Production/Preview/Development 별도 설정 권장)
- 빌드 프레임워크: Next.js 14(App Router). 필요 시 `NEXT_PUBLIC_`/서버 전용 변수 범위 확인

## MCP (Vercel MCP)

Vercel MCP는 원격 MCP 서버(OAuth)로, Vercel 프로젝트/배포/로그 등을 AI 도구에서 안전하게 다룰 수 있게 해줍니다.

- 서버 URL: `https://mcp.vercel.com`
- 지원 클라이언트: Claude Code, Claude.ai/Claude Desktop, ChatGPT(Connectors), Cursor 등

### 로컬 MCP 클라이언트 설정(.mcp.json)
이 저장소에는 `./.mcp.json`이 포함되어 있으며, 아래와 같이 Vercel MCP 원격 서버가 등록되어 있습니다.

```json
{
  "mcpServers": {
    "vercel": { "url": "https://mcp.vercel.com" }
  }
}
```

접속 시 최초 한 번 Vercel OAuth 인증이 발생할 수 있습니다(클라이언트에서 브라우저 팝업/링크로 진행).

### ChatGPT(커넥터)에서 연결
- Settings → Connectors → Add custom connector
- Name: `Vercel`
- URL: `https://mcp.vercel.com`

### 참고
- 이 원격 MCP는 OAuth로 인증되며, 토큰을 로컬에 저장하지 않습니다.
- 일부 클라이언트는 자체 설정 화면에서 원격 MCP를 추가해야 하며 `.mcp.json`을 사용하지 않을 수 있습니다.

### 보안/구성 체크리스트
- `.env.local`만 사용하고, `.env*` 파일은 커밋 금지
- 이미지 외부 도메인: `next.config.mjs`에 허용 도메인 추가
- Node 18+ / 최신 npm 사용, 푸시 전 `npx tsc --noEmit`로 타입 검사

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

배포는 Vercel에 구성되어 있습니다. GitHub 저장소와 연결하면 브랜치 푸시에 따라 자동으로 Preview/Production 배포가 수행됩니다. 자세한 내용은 [Next.js Deployment 문서](https://nextjs.org/docs/deployment) 및 Vercel 프로젝트 설정을 참고하세요.
