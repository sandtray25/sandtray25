import { NextResponse } from 'next/server';

export async function GET() {
  const r2BucketUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL;
  const r2BucketName = process.env.NEXT_PUBLIC_R2_BUCKET_NAME;

  return NextResponse.json({
    success: true,
    environment: process.env.NODE_ENV,
    variables: {
      NEXT_PUBLIC_R2_BUCKET_URL: r2BucketUrl || '설정되지 않음',
      NEXT_PUBLIC_R2_BUCKET_NAME: r2BucketName || '설정되지 않음',
    },
    timestamp: new Date().toISOString(),
    // Cloudflare R2 파일 테스트 URL들
    testUrls: r2BucketUrl ? [
      `${r2BucketUrl}/next.svg`,
      `${r2BucketUrl}/images/login.png`,
      `${r2BucketUrl}/images/logo/l1.png`,
      `${r2BucketUrl}/images/logo/l2.png`,
    ] : [],
  });
}
