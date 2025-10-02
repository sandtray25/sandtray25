# Vercel 배포 및 Cloudflare 연동 가이드

## 🚀 Vercel 배포 완료

### ✅ 현재 상태:
- **Vercel 프로젝트**: `sandtrays-projects/sandtray25`
- **GitHub 연동**: 자동 배포 설정 완료
- **최신 배포**: https://sandtray25-cval4corc-sandtrays-projects.vercel.app (빌드 중)

### 📋 자동 배포 설정:
1. **GitHub 연동**: `https://github.com/sandtray25/sandtray25` 연결됨
2. **자동 배포**: `main` 브랜치에 push할 때마다 자동 배포
3. **빌드 설정**: Next.js 자동 감지 및 설정

## 🌐 Cloudflare R2와 Vercel 연결

### 1. 환경 변수 설정

Vercel Dashboard에서 다음 환경 변수들을 설정해야 합니다:

```bash
# Cloudflare R2 설정
NEXT_PUBLIC_R2_BUCKET_URL=https://pub-<bucket-id>.r2.dev
NEXT_PUBLIC_R2_BUCKET_NAME=sandtray25-assets

# 또는 커스텀 도메인 사용시
NEXT_PUBLIC_R2_BUCKET_URL=https://assets.yourdomain.com
```

### 2. Vercel 환경 변수 설정 방법:

1. **Vercel Dashboard** → **프로젝트 선택** → **Settings** → **Environment Variables**
2. 다음 변수들을 추가:
   - `NEXT_PUBLIC_R2_BUCKET_URL`: R2 버킷의 퍼블릭 URL
   - `NEXT_PUBLIC_R2_BUCKET_NAME`: `sandtray25-assets`

### 3. Cloudflare R2 퍼블릭 액세스 설정:

#### 방법 1: r2.dev 도메인 사용
```bash
# 퍼블릭 액세스 활성화
wrangler r2 bucket dev-url enable sandtray25-assets
```

#### 방법 2: 커스텀 도메인 설정
```bash
# 커스텀 도메인 추가 (예시)
wrangler r2 bucket domain add sandtray25-assets assets.yourdomain.com
```

### 4. Next.js에서 이미지 사용:

```tsx
// 이미지 컴포넌트에서 사용
const imageUrl = `${process.env.NEXT_PUBLIC_R2_BUCKET_URL}/images/logo/logo.png`;

// 또는 직접 사용
<Image 
  src={`${process.env.NEXT_PUBLIC_R2_BUCKET_URL}/images/login.png`}
  alt="로그인 이미지"
  width={500}
  height={300}
/>
```

## 🔧 현재 필요한 작업:

### 1. 즉시 실행:
```bash
# R2 퍼블릭 액세스 활성화
wrangler r2 bucket dev-url enable sandtray25-assets
```

### 2. Vercel Dashboard에서:
1. 프로젝트 → Settings → Environment Variables
2. `NEXT_PUBLIC_R2_BUCKET_URL` 추가
3. `NEXT_PUBLIC_R2_BUCKET_NAME=sandtray25-assets` 추가

### 3. 이미지 경로 수정:
현재 `/images/` 경로를 사용하는 모든 컴포넌트를 환경 변수를 사용하도록 수정

## 📊 배포 상태 확인:

```bash
# 배포 상태 확인
vercel ls

# 특정 배포 로그 확인
vercel logs <deployment-url>
```

## 🌟 최종 결과:

배포 완료 후:
- **프로덕션 URL**: `https://sandtray25-<hash>-sandtrays-projects.vercel.app`
- **이미지 CDN**: Cloudflare R2를 통한 글로벌 이미지 서빙
- **자동 배포**: GitHub push 시 자동 배포
- **성능**: Vercel의 글로벌 CDN + Cloudflare R2의 이중 CDN 효과

## 🔗 유용한 링크:

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Cloudflare Dashboard**: https://dash.cloudflare.com
- **R2 Object Storage**: https://dash.cloudflare.com → R2 Object Storage
- **프로젝트 설정**: Vercel Dashboard → 프로젝트 → Settings
