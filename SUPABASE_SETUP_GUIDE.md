# Supabase MCP 설정 완료 가이드

이 가이드는 Supabase MCP를 완전히 작동시키기 위한 단계별 안내입니다.

## 📋 준비물

1. Supabase 계정 (https://supabase.com)
2. 생성된 Supabase 프로젝트

---

## 🚀 Step 1: Supabase 프로젝트 정보 확인

### 1-1. Supabase 대시보드 접속
1. https://app.supabase.com 접속
2. 로그인
3. 프로젝트 선택

### 1-2. 필요한 정보 수집

#### ① 프로젝트 URL과 Anon Key
- 왼쪽 메뉴: **Settings** → **API**
- 복사할 항목:
  - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
  - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### ② Service Role Key (MCP용)
- 같은 페이지에서:
  - `service_role` key → `SUPABASE_ACCESS_TOKEN`
  - ⚠️ **주의**: 이 키는 모든 권한을 가지므로 절대 공개하지 마세요!

#### ③ 프로젝트 Reference ID
- 왼쪽 메뉴: **Settings** → **General**
- `Reference ID` 복사 → `SUPABASE_PROJECT_REF`

---

## 🔧 Step 2: 환경 변수 설정

### 2-1. .env.local 파일 생성

프로젝트 루트에 `.env.local` 파일을 생성하고 아래 내용을 붙여넣으세요:

```bash
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Supabase MCP 서버용
SUPABASE_ACCESS_TOKEN=your_service_role_key_here
SUPABASE_PROJECT_REF=your_project_ref_here
```

### 2-2. 실제 값으로 교체

Step 1에서 복사한 값들을 각각 해당 위치에 붙여넣으세요.

**예시:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_PROJECT_REF=abcdefghijklm
```

---

## 🔌 Step 3: MCP 서버 설정

### 3-1. .cursor/mcp.json 파일 확인

프로젝트 루트의 `.cursor/mcp.json` 파일은 이미 환경 변수를 참조하도록 설정되어 있습니다:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": [
        "@supabase/mcp-server-supabase@latest",
        "--read-only",
        "--project-ref=${SUPABASE_PROJECT_REF}"
      ],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "${SUPABASE_ACCESS_TOKEN}"
      }
    }
  }
}
```

✅ **보안**: 이 파일은 민감한 정보를 직접 포함하지 않으므로 Git에 커밋해도 안전합니다.

### 3-2. 환경 변수가 자동으로 읽힘

Step 2에서 `.env.local`에 설정한 다음 변수들이 자동으로 사용됩니다:
- `SUPABASE_PROJECT_REF` → MCP 서버의 프로젝트 참조
- `SUPABASE_ACCESS_TOKEN` → MCP 서버의 인증 토큰

**추가 설정이 필요 없습니다!**

---

## 🗄️ Step 4: 데이터베이스 스키마 배포

### 4-1. Supabase SQL Editor 접속
1. Supabase 대시보드에서
2. 왼쪽 메뉴: **SQL Editor**
3. **New query** 클릭

### 4-2. 스키마 실행
1. `supabase/schema.sql` 파일의 전체 내용을 복사
2. SQL Editor에 붙여넣기
3. **Run** 버튼 클릭 (또는 Ctrl+Enter / Cmd+Enter)

### 4-3. 확인
- 왼쪽 메뉴: **Table Editor**
- `profiles` 테이블이 생성되었는지 확인

---

## 🔄 Step 5: Cursor 재시작

모든 설정을 완료한 후:

1. **Cursor를 완전히 종료**
2. **Cursor를 다시 시작**
3. MCP 서버가 자동으로 연결됩니다

---

## ✅ Step 6: 연결 확인

### 6-1. 개발 서버 실행
```bash
npm run dev
```

### 6-2. 회원가입 테스트
1. 브라우저에서 http://localhost:3000/signup 접속
2. 회원가입 폼 작성
3. "가입하기" 버튼 클릭
4. 이메일 확인 (Supabase가 보낸 확인 메일)

### 6-3. Supabase 대시보드 확인
- **Authentication** → **Users**에서 새 사용자 확인
- **Table Editor** → **profiles**에서 프로필 정보 확인

---

## 🎉 완료!

모든 단계를 완료하셨다면:
- ✅ Supabase 연동 완료
- ✅ MCP 서버 작동
- ✅ 회원가입 기능 사용 가능

---

## 🐛 문제 해결

### 환경 변수를 읽을 수 없다는 오류
```bash
# 개발 서버 재시작
npm run dev
```

### MCP 서버가 연결되지 않음
1. `.cursor/mcp.json` 파일의 JSON 형식이 올바른지 확인
2. Cursor를 완전히 재시작
3. Cursor 설정 > Extensions에서 MCP 상태 확인

### 회원가입 시 오류 발생
1. 브라우저 콘솔(F12)에서 오류 메시지 확인
2. Supabase 대시보드 > Logs에서 오류 확인
3. `.env.local` 파일의 값들이 올바른지 재확인

### 이메일 확인 메일이 오지 않음
- Supabase 대시보드 > **Authentication** > **Email Templates**
- 로컬 개발 시 Inbucket 사용 (http://127.0.0.1:54324)
- 프로덕션에서는 SMTP 설정 필요

---

## 📚 추가 참고 자료

- [Supabase 공식 문서](https://supabase.com/docs)
- [Supabase MCP 서버](https://github.com/supabase/mcp-server-supabase)
- [Next.js + Supabase 가이드](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

---

## 🔒 보안 주의사항

⚠️ **절대 커밋하지 말 것:**
- `.env.local` 파일
- Service Role Key
- Access Token

✅ **커밋해도 되는 것:**
- `.env.example` 파일
- 공개 문서

