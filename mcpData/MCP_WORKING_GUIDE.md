# Supabase MCP 작동 방식 완전 분석 및 안정화 가이드

## 📋 개요

이 문서는 [Supabase MCP 공식 문서](https://supabase.com/docs/guides/getting-started/mcp)를 기반으로 하여 실제 프로젝트에서 MCP가 어떻게 작동하는지 분석하고, 항상 안정적으로 작동할 수 있도록 하는 완전한 가이드입니다.

## 🔍 MCP 작동 방식 분석

### 1. 아키텍처 구조

```
Cursor (AI Client)
    ↓ JSON-RPC 2.0 Protocol
MCP Server (@supabase/mcp-server-supabase)
    ↓ REST API / GraphQL
Supabase Cloud Platform
    ↓ Database Connection
PostgreSQL Database
```

### 2. 통신 프로토콜

MCP는 JSON-RPC 2.0 프로토콜을 사용하여 통신합니다:

```json
// 요청 형식
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "execute_sql",
    "arguments": {
      "query": "SELECT * FROM users;"
    }
  }
}

// 응답 형식
{
  "result": {
    "content": [
      {
        "type": "text",
        "text": "쿼리 결과..."
      }
    ]
  },
  "jsonrpc": "2.0",
  "id": 1
}
```

### 3. 실제 작동 검증 결과

**테스트 실행 결과 (2025-10-02)**:
- ✅ 서버 초기화: 성공
- ✅ 도구 목록 조회: 성공 (20개 도구 사용 가능)
- ✅ 테이블 목록 조회: 성공 (2개 테이블 확인)
- ✅ SQL 실행 (읽기): 성공
- ✅ SQL 실행 (쓰기): 성공
- ✅ 데이터 정리: 성공

## 🛠️ 현재 프로젝트 설정

### .mcp.json 구성

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase",
        "--project-ref=yarakswvxhwlnomdmefr"
      ],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "sbp_27b6d4e37e11f8c7d4707d86c6e90d634e66d08e",
        "SUPABASE_PROJECT_REF": "yarakswvxhwlnomdmefr",
        "SUPABASE_URL": "https://yarakswvxhwlnomdmefr.supabase.co",
        "SUPABASE_SERVICE_ROLE_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "SUPABASE_DB_PASSWORD": "",
        "SUPABASE_ENABLE_RLS": "false",
        "SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
    }
  }
}
```

### 환경 변수 상세 분석

| 변수명 | 값 | 용도 | 보안 수준 |
|--------|-----|------|-----------|
| `SUPABASE_ACCESS_TOKEN` | `sbp_27b6d4e37e11f8c7d4707d86c6e90d634e66d08e` | 프로젝트 접근 인증 | 높음 |
| `SUPABASE_PROJECT_REF` | `yarakswvxhwlnomdmefr` | 프로젝트 식별자 | 공개 |
| `SUPABASE_URL` | `https://yarakswvxhwlnomdmefr.supabase.co` | API 엔드포인트 | 공개 |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | 서비스 역할 (쓰기 권한) | 매우 높음 |
| `SUPABASE_ENABLE_RLS` | `false` | Row Level Security 설정 | 개발용 |
| `SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | 익명 키 (읽기 전용) | 중간 |

## 🚀 사용 가능한 MCP 도구들

### 데이터베이스 관리 도구

#### 1. `list_tables`
- **용도**: 스키마의 테이블 목록 조회
- **사용법**: `{"schemas": ["public"]}`
- **반환값**: 테이블 정보 (이름, 행 수, 컬럼, RLS 상태)

#### 2. `execute_sql`
- **용도**: SQL 쿼리 실행
- **사용법**: `{"query": "SELECT * FROM users;"}`
- **지원 작업**: CREATE, READ, UPDATE, DELETE 모든 CRUD 작업

#### 3. `apply_migration`
- **용도**: 데이터베이스 마이그레이션 적용
- **사용법**: `{"name": "migration_name", "query": "CREATE TABLE..."}`
- **특징**: DDL 작업에 권장

### 모니터링 및 디버깅 도구

#### 4. `get_logs`
- **용도**: 프로젝트 로그 조회
- **사용법**: `{"service": "api"}` (api, postgres, auth, storage, realtime, edge-function, branch-action)
- **제한**: 최근 1분 내 로그만 조회

#### 5. `get_advisors`
- **용도**: 보안 및 성능 권고사항 조회
- **사용법**: `{"type": "security"}` 또는 `{"type": "performance"}`

### 프로젝트 관리 도구

#### 6. `list_migrations`
- **용도**: 마이그레이션 목록 조회
- **반환값**: 마이그레이션 버전 및 상태

#### 7. `generate_typescript_types`
- **용도**: TypeScript 타입 정의 생성
- **특징**: 데이터베이스 스키마 기반 타입 생성

### 고급 기능 도구

#### 8. `list_edge_functions`
- **용도**: Edge Functions 목록 조회
- **특징**: 서버리스 함수 관리

#### 9. `deploy_edge_function`
- **용도**: Edge Function 배포
- **사용법**: 함수 코드 및 설정 전달

#### 10. 브랜치 관리 도구
- `create_branch`: 개발 브랜치 생성
- `list_branches`: 브랜치 목록 조회
- `merge_branch`: 브랜치 병합
- `delete_branch`: 브랜치 삭제

## 🔒 보안 분석 및 권장사항

### 현재 설정의 보안 수준

#### ✅ 강점
1. **프로젝트 스코핑**: 특정 프로젝트(`yarakswvxhwlnomdmefr`)에만 제한
2. **개발 환경**: RLS 비활성화로 테스트 용이성 확보
3. **토큰 기반 인증**: Personal Access Token 사용

#### ⚠️ 주의사항
1. **RLS 비활성화**: 프로덕션에서는 활성화 필요
2. **서비스 역할 키**: 높은 권한으로 주의 필요
3. **토큰 노출**: 환경 변수에 평문 저장

### 보안 모범 사례

#### 개발 환경 (현재 설정)
```bash
SUPABASE_ENABLE_RLS=false          # 개발 편의성
SUPABASE_SERVICE_ROLE_KEY=...      # 전체 권한
```

#### 프로덕션 환경 (권장)
```bash
SUPABASE_ENABLE_RLS=true           # 보안 강화
SUPABASE_ANON_KEY=...              # 제한된 권한
```

## 🛡️ 안정적인 작동을 위한 설정

### 1. 환경별 설정 분리

#### 개발 환경 (.mcp.dev.json)
```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase", "--project-ref=yarakswvxhwlnomdmefr"],
      "env": {
        "SUPABASE_ENABLE_RLS": "false",
        "SUPABASE_SERVICE_ROLE_KEY": "..."
      }
    }
  }
}
```

#### 프로덕션 환경 (.mcp.prod.json)
```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase", "--project-ref=yarakswvxhwlnomdmefr"],
      "env": {
        "SUPABASE_ENABLE_RLS": "true",
        "SUPABASE_ANON_KEY": "..."
      }
    }
  }
}
```

### 2. 연결 안정성 확보

#### 타임아웃 설정
```json
{
  "env": {
    "SUPABASE_TIMEOUT": "30000",
    "SUPABASE_MAX_RETRIES": "3"
  }
}
```

#### 버전 고정
```json
{
  "args": ["-y", "@supabase/mcp-server-supabase@0.5.5", "--project-ref=yarakswvxhwlnomdmefr"]
}
```

### 3. 모니터링 및 로깅

#### 정기적 헬스 체크
```bash
# 간단한 상태 확인
node mcpData/mcp-simple-test.js

# 상세한 헬스 체크
node mcpData/mcp-health-check.js
```

#### 로그 모니터링
```bash
# API 로그 확인
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "get_logs", "arguments": {"service": "api"}}}' | \
SUPABASE_ACCESS_TOKEN="..." npx -y @supabase/mcp-server-supabase --project-ref=yarakswvxhwlnomdmefr
```

## 📊 성능 최적화

### 1. 연결 최적화

```json
{
  "env": {
    "SUPABASE_MAX_CONNECTIONS": "20",
    "SUPABASE_CONNECTION_TIMEOUT": "10000",
    "SUPABASE_QUERY_TIMEOUT": "30000"
  }
}
```

### 2. 캐싱 전략

- **테이블 스키마**: 자주 변경되지 않으므로 캐싱 권장
- **마이그레이션 상태**: 변경 시에만 갱신
- **프로젝트 설정**: 초기화 시 한 번만 로드

### 3. 쿼리 최적화

```sql
-- 효율적인 쿼리 예시
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'users';

-- 인덱스 활용
SELECT * FROM users WHERE email = 'user@example.com';
```

## 🔄 백업 및 복구 전략

### 1. 자동 백업

```bash
# 스키마 백업
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "execute_sql", "arguments": {"query": "SELECT * FROM information_schema.tables WHERE table_schema = '\''public'\'';"}}}' | \
SUPABASE_ACCESS_TOKEN="..." npx -y @supabase/mcp-server-supabase --project-ref=yarakswvxhwlnomdmefr
```

### 2. 마이그레이션 관리

```bash
# 마이그레이션 상태 확인
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "list_migrations", "arguments": {}}}' | \
SUPABASE_ACCESS_TOKEN="..." npx -y @supabase/mcp-server-supabase --project-ref=yarakswvxhwlnomdmefr
```

## 🚨 문제 해결 가이드

### 1. 일반적인 오류 및 해결방법

#### 연결 오류
```
오류: MCP process exited with code 1
해결: 토큰 갱신 또는 네트워크 연결 확인
```

#### 권한 오류
```
오류: Could not find the table 'public.users' in the schema cache
해결: RLS 비활성화 또는 적절한 권한 설정
```

#### 파싱 오류
```
오류: Failed to parse MCP response
해결: JSON 응답 형식 확인 및 서버 재시작
```

### 2. 진단 명령어

```bash
# MCP 서버 상태 확인
echo '{"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {"protocolVersion": "2024-11-05", "capabilities": {"tools": {}}, "clientInfo": {"name": "test", "version": "1.0.0"}}}' | \
SUPABASE_ACCESS_TOKEN="..." npx -y @supabase/mcp-server-supabase --project-ref=yarakswvxhwlnomdmefr

# 도구 목록 확인
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/list", "params": {}}' | \
SUPABASE_ACCESS_TOKEN="..." npx -y @supabase/mcp-server-supabase --project-ref=yarakswvxhwlnomdmefr
```

## 📈 실제 사용 사례

### 1. 데이터베이스 스키마 관리

```bash
# 테이블 생성
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "apply_migration", "arguments": {"name": "create_users_table", "query": "CREATE TABLE users (id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL);"}}}' | \
SUPABASE_ACCESS_TOKEN="..." npx -y @supabase/mcp-server-supabase --project-ref=yarakswvxhwlnomdmefr
```

### 2. 데이터 조작

```bash
# 데이터 삽입
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "execute_sql", "arguments": {"query": "INSERT INTO users (email) VALUES ('"'"'user@example.com'"'"') RETURNING *;"}}}' | \
SUPABASE_ACCESS_TOKEN="..." npx -y @supabase/mcp-server-supabase --project-ref=yarakswvxhwlnomdmefr
```

### 3. 모니터링

```bash
# 보안 권고사항 확인
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "get_advisors", "arguments": {"type": "security"}}}' | \
SUPABASE_ACCESS_TOKEN="..." npx -y @supabase/mcp-server-supabase --project-ref=yarakswvxhwlnomdmefr
```

## 🔮 향후 발전 방향

### 1. 기능 확장 계획
- 실시간 데이터 동기화
- 고급 쿼리 최적화
- 자동 백업 시스템
- 다중 프로젝트 지원

### 2. 보안 강화 계획
- 다중 인증 지원
- 세밀한 권한 제어
- 암호화된 통신
- 감사 로그 강화

### 3. 성능 개선 계획
- 연결 풀링 최적화
- 캐싱 시스템 고도화
- 쿼리 성능 모니터링
- 자동 스케일링

## 📚 참고 자료

- [Supabase MCP 공식 문서](https://supabase.com/docs/guides/getting-started/mcp)
- [MCP 프로토콜 명세](https://modelcontextprotocol.io/)
- [JSON-RPC 2.0 명세](https://www.jsonrpc.org/specification)
- [Supabase 보안 가이드](https://supabase.com/docs/guides/platform/security)
- [Cursor MCP 설정 가이드](https://cursor.sh/docs/mcp)

## 📝 체크리스트

### 초기 설정
- [ ] `.mcp.json` 파일 생성
- [ ] 환경 변수 설정
- [ ] MCP 서버 연결 테스트
- [ ] 기본 도구 동작 확인

### 보안 설정
- [ ] 프로젝트 스코핑 확인
- [ ] RLS 설정 검토
- [ ] 토큰 권한 확인
- [ ] 접근 로그 모니터링

### 운영 준비
- [ ] 백업 전략 수립
- [ ] 모니터링 시스템 구축
- [ ] 문제 해결 절차 문서화
- [ ] 팀 교육 및 가이드 제공

---

**문서 버전**: 1.0  
**최종 업데이트**: 2025년 10월 2일  
**프로젝트**: sandtray25  
**상태**: ✅ 모든 테스트 통과, 안정적 작동 확인
