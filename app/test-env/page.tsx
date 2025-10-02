"use client";

export default function TestEnvPage() {
  const r2BucketUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL;
  const r2BucketName = process.env.NEXT_PUBLIC_R2_BUCKET_NAME;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">환경변수 테스트</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">환경변수 값</h2>
          <div className="space-y-2">
            <p><strong>NEXT_PUBLIC_R2_BUCKET_URL:</strong> {r2BucketUrl || '설정되지 않음'}</p>
            <p><strong>NEXT_PUBLIC_R2_BUCKET_NAME:</strong> {r2BucketName || '설정되지 않음'}</p>
          </div>
        </div>

        {r2BucketUrl && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Cloudflare R2 파일 테스트</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Next.js 로고 (SVG)</h3>
                <img 
                  src={`${r2BucketUrl}/next.svg`} 
                  alt="Next.js Logo" 
                  className="w-32 h-32 border border-gray-300 rounded"
                  onError={(e) => {
                    e.currentTarget.style.backgroundColor = '#fee';
                    e.currentTarget.alt = '이미지 로드 실패';
                  }}
                  onLoad={() => console.log('Next.js 로고 로드 성공')}
                />
              </div>
              
              <div>
                <h3 className="font-medium mb-2">로그인 이미지 (PNG)</h3>
                <img 
                  src={`${r2BucketUrl}/images/login.png`} 
                  alt="Login Image" 
                  className="w-64 h-32 border border-gray-300 rounded object-cover"
                  onError={(e) => {
                    e.currentTarget.style.backgroundColor = '#fee';
                    e.currentTarget.alt = '이미지 로드 실패';
                  }}
                  onLoad={() => console.log('로그인 이미지 로드 성공')}
                />
              </div>

              <div>
                <h3 className="font-medium mb-2">로고 이미지들</h3>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <img 
                      key={num}
                      src={`${r2BucketUrl}/images/logo/l${num}.png`} 
                      alt={`Logo ${num}`} 
                      className="w-16 h-16 border border-gray-300 rounded"
                      onError={(e) => {
                        e.currentTarget.style.backgroundColor = '#fee';
                        e.currentTarget.alt = `로고 ${num} 로드 실패`;
                      }}
                      onLoad={() => console.log(`로고 ${num} 로드 성공`)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 mb-2">테스트 방법:</h3>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• 환경변수가 올바르게 설정되었는지 확인</li>
            <li>• 이미지들이 정상적으로 로드되는지 확인</li>
            <li>• 브라우저 개발자 도구의 콘솔에서 로드 성공 메시지 확인</li>
            <li>• 네트워크 탭에서 이미지 요청 상태 확인</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
