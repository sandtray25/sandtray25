# Cloudflare R2 스토리지 설정 완료

## 📦 업로드된 파일들

### 버킷 정보
- **버킷 이름**: `sandtray25-assets`
- **생성일**: 2025-10-02T10:05:26.066Z
- **총 파일 수**: 48개 (1개 실패)
- **실패한 파일**: `rules/~$r1.docx` (임시 Word 파일)

### 업로드된 디렉토리 구조
```
sandtray25-assets/
├── card1.png
├── jojikdo.jpg
├── linear.webp
├── next.svg
├── noise.webp
├── s1.png
├── vercel.svg
├── 교육분석가
├── 수련기관
├── images/
│   ├── about/
│   │   ├── h1.png
│   │   ├── l1.png
│   │   └── st.png
│   ├── logo/
│   │   ├── l1.png ~ l7.png
│   │   └── logo.png
│   ├── b2_v.mp4
│   ├── bg_img.png
│   ├── bg_video.mp4
│   ├── c1.png, c2.png
│   ├── card1.png, card3.png
│   ├── g1.png, g2.png, g3.png
│   ├── hand-heart*.png (4개 변형)
│   ├── ja.png
│   ├── login.png
│   ├── n1.png ~ n4.png
│   └── logo.png
└── rules/
    ├── r1.pdf ~ r4.pdf
    └── ~$r1.docx (실패)
```

## 🌐 웹 접근 설정

### 1. 커스텀 도메인 설정 (선택사항)
R2 버킷에 커스텀 도메인을 연결하여 CDN을 통해 파일에 접근할 수 있습니다:

```bash
# 커스텀 도메인 추가 (예시)
wrangler r2 bucket domain add sandtray25-assets assets.yourdomain.com
```

### 2. 퍼블릭 액세스 설정
현재 R2 버킷은 기본적으로 비공개입니다. 퍼블릭 액세스를 위해서는:

1. **Cloudflare Dashboard**에서 R2 버킷 설정
2. **퍼블릭 액세스 활성화**
3. **CORS 설정** (필요한 경우)

### 3. 파일 접근 URL 형식
퍼블릭 액세스 활성화 후:
- **직접 URL**: `https://pub-<bucket-id>.r2.dev/<file-path>`
- **커스텀 도메인**: `https://assets.yourdomain.com/<file-path>`

## 🔧 사용 방법

### 파일 업데이트
```bash
# 개별 파일 업로드
wrangler r2 object put sandtray25-assets/path/to/file.png --file=local-file.png

# 전체 public 폴더 재업로드
node upload-to-r2.js
```

### 파일 다운로드
```bash
# 파일 다운로드
wrangler r2 object get sandtray25-assets/path/to/file.png --file=local-file.png
```

### 파일 삭제
```bash
# 파일 삭제
wrangler r2 object delete sandtray25-assets/path/to/file.png
```

## 📝 Next.js에서 사용

### 환경 변수 설정
```env
NEXT_PUBLIC_R2_BUCKET_URL=https://pub-<bucket-id>.r2.dev
# 또는
NEXT_PUBLIC_R2_BUCKET_URL=https://assets.yourdomain.com
```

### 컴포넌트에서 사용
```tsx
const imageUrl = `${process.env.NEXT_PUBLIC_R2_BUCKET_URL}/images/logo/logo.png`;
```

## ✅ 다음 단계

1. **퍼블릭 액세스 활성화**: Cloudflare Dashboard에서 설정
2. **커스텀 도메인 설정**: 필요시 도메인 연결
3. **Next.js 설정**: 환경 변수 및 이미지 최적화 설정
4. **CDN 캐싱**: Cloudflare의 글로벌 CDN 활용

## 🎉 완료!

모든 정적 파일들이 Cloudflare R2에 성공적으로 업로드되었습니다!
