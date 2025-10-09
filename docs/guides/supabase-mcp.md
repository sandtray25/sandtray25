# Supabase MCP 통합 가이드

한국모래상자치료학회 프로젝트의 Supabase MCP(Model Context Protocol) 설정 및 사용 가이드입니다.

> 📅 **최종 업데이트**: 2025-10-09  
> ✅ **상태**: MCP 서버 정상 작동 중

---

## 📋 목차

1. [개요](#1-개요)
2. [환경 변수 설정](#2-환경-변수-설정)
3. [MCP 설정](#3-mcp-설정)
4. [데이터베이스 스키마](#4-데이터베이스-스키마)
5. [MCP 사용 예시](#5-mcp-사용-예시)
6. [테스트 스크립트](#6-테스트-스크립트)
7. [문제 해결](#7-문제-해결)

---

## 1. 개요

### MCP란?

Model Context Protocol(MCP)은 AI가 외부 데이터 소스와 상호작용할 수 있게 해주는 프로토콜입니다.

### 이 프로젝트의 MCP 설정

- **MCP 서버**: Supabase MCP Server (`@supabase/mcp-server-supabase`)
- **프로젝트 참조**: `yarakswvxhwlnomdmefr`
- **기능**:
  - 데이터베이스 스키마 조회
  - SQL 쿼리 실행 (CRUD)
  - 테이블 관리
  - 마이그레이션 적용

---

## 2. 환경 변수 설정

### 2.1 `.env.local` 파일

프로젝트 루트의 `.env.local` 파일에 다음 환경 변수가 설정되어 있어야 합니다:

```bash
# Supabase 프로젝트 정보
NEXT_PUBLIC_SUPABASE_URL=https://yarakswvxhwlnomdmefr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# MCP 서버용 (필수)
SUPABASE_PROJECT_REF=yarakswvxhwlnomdmefr
SUPABASE_ACCESS_TOKEN=your-access-token-here
```

### 2.2 Access Token 발급 방법

1. [Supabase 대시보드](https://app.supabase.com) 접속
2. 프로젝트 선택
3. `Settings` → `API` 메뉴
4. `Project API keys` 섹션에서 **service_role** 키 복사
5. `.env.local`에 `SUPABASE_ACCESS_TOKEN`으로 설정

> ⚠️ **주의**: service_role 키는 절대 클라이언트 코드에 노출하지 마세요!

---

## 3. MCP 설정

### 3.1 MCP 설정 파일

`.cursor/mcp.json` 파일:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase@latest",
        "--project-ref=yarakswvxhwlnomdmefr"
      ],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "${SUPABASE_ACCESS_TOKEN}"
      }
    }
  }
}
```

### 3.2 주요 설정 항목

- `command`: MCP 서버 실행 명령어 (`npx`)
- `args`: 
  - `-y`: 자동 설치 승인
  - `@supabase/mcp-server-supabase@latest`: 최신 버전 사용
  - `--project-ref`: 프로젝트 참조 ID
- `env`: 환경 변수 (Access Token 자동 주입)

### 3.3 Cursor 재시작

MCP 설정 변경 후 Cursor를 재시작하면 자동으로 연결됩니다.

---

## 4. 데이터베이스 스키마

### 4.1 profiles 테이블

사용자 프로필 정보를 저장하는 메인 테이블입니다.

| 컬럼명 | 타입 | 제약 | 설명 |
|--------|------|------|------|
| `id` | UUID | PK, FK → auth.users | 사용자 ID |
| `name` | TEXT | NOT NULL | 이름 |
| `email` | TEXT | - | 이메일 주소 |
| `phone` | TEXT | - | 핸드폰 번호 |
| `zonecode` | TEXT | - | 우편번호 |
| `road_address` | TEXT | - | 도로명 주소 |
| `jibun_address` | TEXT | - | 지번 주소 |
| `detail_address` | TEXT | - | 상세 주소 |
| `created_at` | TIMESTAMPTZ | NOT NULL | 생성일시 |
| `updated_at` | TIMESTAMPTZ | NOT NULL | 수정일시 |

### 4.2 hoam 테이블

테스트 및 팀 정보 저장용 테이블입니다.

| 컬럼명 | 타입 | 제약 | 설명 |
|--------|------|------|------|
| `id` | SERIAL | PK | 자동 증가 ID |
| `name` | TEXT | NOT NULL | 이름 |
| `team` | TEXT | NOT NULL | 팀명 |
| `goal` | TEXT | NOT NULL | 목표 |
| `created_at` | TIMESTAMP | - | 생성일시 |

### 4.3 RLS (Row Level Security) 정책

`profiles` 테이블에는 다음 보안 정책이 적용됩니다:

- ✅ **SELECT**: 사용자는 자신의 프로필만 조회 가능
- ✅ **INSERT**: 회원가입 시 자신의 프로필만 생성 가능
- ✅ **UPDATE**: 사용자는 자신의 프로필만 수정 가능
- ✅ **DELETE**: 사용자는 자신의 프로필만 삭제 가능

---

## 5. MCP 사용 예시

### 5.1 Cursor에서 직접 사용

Cursor 채팅에서 다음과 같이 요청할 수 있습니다:

```
"profiles 테이블의 구조를 보여줘"
"hoam 테이블의 모든 데이터를 조회해줘"
"새로운 테이블을 만들어줘"
```

### 5.2 스크립트에서 MCP 사용

```javascript
// MCP 서버 시작
const mcpProcess = spawn('npx', [
  '-y',
  '@supabase/mcp-server-supabase@latest',
  `--project-ref=${PROJECT_REF}`,
  `--access-token=${ACCESS_TOKEN}`
]);

// SQL 실행
const request = {
  jsonrpc: '2.0',
  id: 1,
  method: 'tools/call',
  params: {
    name: 'execute_sql',
    arguments: {
      query: 'SELECT * FROM profiles LIMIT 10;'
    }
  }
};

mcpProcess.stdin.write(JSON.stringify(request) + '\n');
```

---

## 6. 테스트 스크립트

프로젝트에는 다음 MCP 테스트 스크립트가 포함되어 있습니다:

### 6.1 CRUD 테스트

```bash
# 완전한 CRUD 작업 테스트
node scripts/test-mcp-crud-final.mjs
```

**테스트 내용**:
- ✅ CREATE: 테이블 생성 및 데이터 삽입
- ✅ READ: 데이터 조회
- ✅ UPDATE: 데이터 수정
- ✅ DELETE: 데이터 삭제
- ✅ CLEANUP: 테스트 테이블 정리

### 6.2 테이블 관리

```bash
# hoam 테이블 생성 및 더미 데이터 추가
node scripts/create-hoam-table.mjs

# hoam 테이블 데이터 조회
node scripts/view-hoam-data.mjs

# profiles 테이블에 email 컬럼 추가
node scripts/add-email-to-profiles.mjs
```

### 6.3 MCP 연결 테스트

```bash
# MCP 서버 연결 확인
node scripts/test-mcp-connection.mjs

# MCP 도구 목록 확인
node scripts/test-mcp-tools.mjs

# 테이블 목록 조회
node scripts/test-mcp-list-tables.mjs
```

---

## 7. 문제 해결

### 7.1 "Unauthorized" 오류

**증상**: MCP 서버가 "Unauthorized" 오류를 반환

**해결 방법**:
1. `.env.local`에 `SUPABASE_ACCESS_TOKEN`이 설정되어 있는지 확인
2. Access Token이 유효한지 확인 (Supabase 대시보드에서 재발급)
3. Cursor 재시작

```bash
# 환경 변수 확인
cat .env.local | grep "SUPABASE_ACCESS_TOKEN"
```

### 7.2 MCP 서버가 시작되지 않음

**증상**: Cursor에서 MCP 서버를 인식하지 못함

**해결 방법**:
1. `.cursor/mcp.json` 파일의 JSON 형식 확인
2. `project-ref`가 올바른지 확인
3. Cursor 완전히 종료 후 재시작
4. 터미널에서 수동으로 MCP 서버 실행 테스트:

```bash
npx -y @supabase/mcp-server-supabase@latest \
  --project-ref=yarakswvxhwlnomdmefr \
  --access-token=$SUPABASE_ACCESS_TOKEN
```

### 7.3 RLS 정책 오류

**증상**: "row-level security policy" 관련 오류

**해결 방법**:

MCP 서버는 service_role 키를 사용하므로 RLS를 우회합니다. 
클라이언트 코드에서 오류가 발생하는 경우:

```sql
-- Supabase SQL Editor에서 RLS 정책 확인
SELECT * FROM pg_policies WHERE tablename = 'profiles';

-- RLS 활성화 확인
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public' AND tablename = 'profiles';
```

### 7.4 외래 키 제약 오류

**증상**: "violates foreign key constraint" 오류

**해결 방법**:

`profiles` 테이블은 `auth.users`를 참조합니다. 
테스트 데이터 삽입 시에는 별도 테이블을 사용하세요:

```javascript
// ❌ 직접 profiles에 임의 UUID 삽입 (실패)
INSERT INTO profiles (id, name) 
VALUES ('random-uuid', 'Test');

// ✅ 테스트 전용 테이블 사용 (성공)
CREATE TABLE test_data (id SERIAL PRIMARY KEY, name TEXT);
INSERT INTO test_data (name) VALUES ('Test');
```

---

## 📚 참고 자료

- [Supabase 공식 문서](https://supabase.com/docs)
- [Supabase MCP 서버 발표](https://supabase.com/blog/mcp-server)
- [Model Context Protocol 스펙](https://modelcontextprotocol.io/)
- [Cursor MCP 가이드](https://docs.cursor.com/advanced/model-context-protocol)

---

## 🎯 MCP 주요 기능

### 사용 가능한 MCP 도구

1. **execute_sql** - SQL 쿼리 실행 (CRUD)
2. **list_tables** - 테이블 목록 조회
3. **apply_migration** - 마이그레이션 적용
4. **get_logs** - 서비스 로그 조회
5. **get_advisors** - 보안/성능 권고사항
6. **generate_typescript_types** - TypeScript 타입 생성
7. **list_edge_functions** - Edge Functions 관리
8. **search_docs** - Supabase 문서 검색

---

## ✅ 체크리스트

MCP 설정이 올바른지 확인하세요:

- [x] Supabase 프로젝트 생성 완료
- [x] `.env.local`에 환경 변수 설정
- [x] `.cursor/mcp.json` 설정 완료
- [x] Cursor 재시작
- [x] MCP CRUD 테스트 성공
- [x] `profiles` 테이블 생성 및 RLS 설정
- [x] `hoam` 테이블 생성 및 데이터 추가
- [x] email 컬럼 추가 완료

**모든 항목이 체크되었습니다! 🎉**

---

## 📞 지원

문제가 발생하면 다음을 확인하세요:

1. [프로젝트 이슈](https://github.com/your-repo/issues)
2. [Supabase 커뮤니티](https://github.com/supabase/supabase/discussions)
3. 프로젝트 문서: `SUPABASE_SETUP_GUIDE.md`

---

**마지막 업데이트**: 2025-10-09  
**작성자**: AI Assistant  
**버전**: 1.0.0

