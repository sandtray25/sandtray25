# Supabase MCP 완전 가이드

## 📋 개요

이 문서는 Supabase MCP (Model Context Protocol)의 작동 방식과 안정적인 설정 방법을 설명합니다. [공식 Supabase MCP 문서](https://supabase.com/docs/guides/getting-started/mcp)를 기반으로 하여 프로젝트별 맞춤 설정을 제공합니다.

## 🔧 MCP 작동 방식 분석

### 1. MCP 서버 아키텍처

```
AI Client (Cursor) ↔ MCP Protocol ↔ Supabase MCP Server ↔ Supabase Cloud
```

- **AI Client**: Cursor와 같은 AI 도구
- **MCP Protocol**: JSON-RPC 2.0 기반 통신 프로토콜
- **MCP Server**: `@supabase/mcp-server-supabase` 패키지
- **Supabase Cloud**: 실제 데이터베이스 및 API

### 2. 통신 방식

```json
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
```

### 3. 지원하는 작업 유형

#### 📊 데이터베이스 관리
- `list_tables` - 테이블 목록 조회
- `execute_sql` - SQL 실행 (CRUD 작업)
- `apply_migration` - 마이그레이션 적용
- `list_migrations` - 마이그레이션 목록

#### 🔍 모니터링 및 디버깅
- `get_logs` - 프로젝트 로그 조회
- `get_advisors` - 보안/성능 권고사항

#### ⚡ 고급 기능
- `list_edge_functions` - Edge Functions 관리
- `deploy_edge_function` - Edge Function 배포
- `create_branch` - 개발 브랜치 생성
- `generate_typescript_types` - TypeScript 타입 생성

## 🚀 현재 프로젝트 설정

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

### 환경 변수 설명

| 변수명 | 설명 | 현재 값 |
|--------|------|---------|
| `SUPABASE_ACCESS_TOKEN` | Supabase Personal Access Token | `sbp_27b6d4e37e11f8c7d4707d86c6e90d634e66d08e` |
| `SUPABASE_PROJECT_REF` | 프로젝트 참조 ID | `yarakswvxhwlnomdmefr` |
| `SUPABASE_URL` | 프로젝트 API URL | `https://yarakswvxhwlnomdmefr.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | 서비스 역할 키 (쓰기 권한) | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `SUPABASE_ENABLE_RLS` | Row Level Security 활성화 여부 | `false` |
| `SUPABASE_ANON_KEY` | 익명 키 (읽기 전용) | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

## 🔒 보안 설정 및 모범 사례

### 1. 권한 관리

#### 현재 설정 (개발용)
```bash
# 모든 권한 활성화 (개발 환경용)
SUPABASE_ENABLE_RLS=false  # RLS 비활성화
SUPABASE_SERVICE_ROLE_KEY=...  # 서비스 역할 키 사용
```

#### 프로덕션 권장 설정
```bash
# 제한된 권한 (프로덕션용)
SUPABASE_ENABLE_RLS=true   # RLS 활성화
SUPABASE_ANON_KEY=...      # 익명 키만 사용 (읽기 전용)
```

### 2. 프로젝트 스코핑

현재 설정은 특정 프로젝트(`yarakswvxhwlnomdmefr`)에만 제한되어 있어 안전합니다:

```json
{
  "args": ["--project-ref=yarakswvxhwlnomdmefr"]
}
```

### 3. 보안 위험 및 완화 방안

#### ⚠️ 주요 위험 요소
1. **Prompt Injection**: 악성 사용자 입력을 통한 권한 상승
2. **데이터 노출**: 민감한 데이터의 무단 접근
3. **권한 오남용**: 과도한 권한으로 인한 시스템 손상

#### ✅ 완화 방안
1. **수동 승인 활성화**: 모든 도구 호출을 수동으로 승인
2. **개발 환경 사용**: 프로덕션 데이터 대신 개발 데이터 사용
3. **읽기 전용 모드**: 가능한 경우 읽기 전용 권한만 사용
4. **정기적 감사**: 로그 및 권한 정기 검토

## 🛠️ 안정적인 작동을 위한 설정

### 1. MCP 서버 버전 관리

```bash
# 최신 버전 확인
npm view @supabase/mcp-server-supabase version

# 특정 버전 사용 (안정성 우선)
"args": ["-y", "@supabase/mcp-server-supabase@0.5.5", "--project-ref=yarakswvxhwlnomdmefr"]
```

### 2. 연결 테스트 스크립트

```bash
# MCP 서버 연결 테스트
echo '{"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {"protocolVersion": "2024-11-05", "capabilities": {"tools": {}}, "clientInfo": {"name": "test", "version": "1.0.0"}}}' | \
SUPABASE_ACCESS_TOKEN="sbp_27b6d4e37e11f8c7d4707d86c6e90d634e66d08e" \
SUPABASE_PROJECT_REF="yarakswvxhwlnomdmefr" \
npx -y @supabase/mcp-server-supabase --project-ref=yarakswvxhwlnomdmefr
```

### 3. 환경별 설정

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

## 📊 모니터링 및 로깅

### 1. 로그 확인

```bash
# API 로그 확인
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "get_logs", "arguments": {"service": "api"}}}' | \
SUPABASE_ACCESS_TOKEN="..." npx -y @supabase/mcp-server-supabase --project-ref=yarakswvxhwlnomdmefr
```

### 2. 보안 권고사항 확인

```bash
# 보안 권고사항 확인
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "get_advisors", "arguments": {"type": "security"}}}' | \
SUPABASE_ACCESS_TOKEN="..." npx -y @supabase/mcp-server-supabase --project-ref=yarakswvxhwlnomdmefr
```

## 🔄 백업 및 복구

### 1. 데이터베이스 백업

```bash
# 전체 스키마 백업
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "execute_sql", "arguments": {"query": "SELECT * FROM information_schema.tables WHERE table_schema = '\''public'\'';"}}}' | \
SUPABASE_ACCESS_TOKEN="..." npx -y @supabase/mcp-server-supabase --project-ref=yarakswvxhwlnomdmefr
```

### 2. 마이그레이션 관리

```bash
# 마이그레이션 목록 확인
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "list_migrations", "arguments": {}}}' | \
SUPABASE_ACCESS_TOKEN="..." npx -y @supabase/mcp-server-supabase --project-ref=yarakswvxhwlnomdmefr
```

## 🚨 문제 해결

### 1. 일반적인 오류

#### 연결 오류
```bash
# 해결 방법: 토큰 갱신
# Supabase Dashboard → Settings → API → Generate new token
```

#### 권한 오류
```bash
# 해결 방법: RLS 비활성화 (개발 환경)
SUPABASE_ENABLE_RLS=false
```

#### 버전 충돌
```bash
# 해결 방법: 캐시 클리어
npm cache clean --force
npx -y @supabase/mcp-server-supabase@latest --project-ref=yarakswvxhwlnomdmefr
```

### 2. 진단 명령어

```bash
# MCP 서버 상태 확인
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/list", "params": {}}' | \
SUPABASE_ACCESS_TOKEN="..." npx -y @supabase/mcp-server-supabase --project-ref=yarakswvxhwlnomdmefr

# 테이블 목록 확인
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "list_tables", "arguments": {"schemas": ["public"]}}}' | \
SUPABASE_ACCESS_TOKEN="..." npx -y @supabase/mcp-server-supabase --project-ref=yarakswvxhwlnomdmefr
```

## 📈 성능 최적화

### 1. 연결 풀링

```json
{
  "env": {
    "SUPABASE_MAX_CONNECTIONS": "20",
    "SUPABASE_TIMEOUT": "30000"
  }
}
```

### 2. 캐싱 전략

- 자주 사용되는 쿼리 결과 캐싱
- 테이블 스키마 정보 캐싱
- 마이그레이션 상태 캐싱

## 🔮 향후 계획

### 1. 기능 확장
- 실시간 데이터 동기화
- 고급 쿼리 최적화
- 자동 백업 시스템

### 2. 보안 강화
- 다중 인증 지원
- 세밀한 권한 제어
- 암호화된 통신

## 📚 참고 자료

- [Supabase MCP 공식 문서](https://supabase.com/docs/guides/getting-started/mcp)
- [MCP 프로토콜 명세](https://modelcontextprotocol.io/)
- [Supabase 보안 가이드](https://supabase.com/docs/guides/platform/security)
- [Cursor MCP 설정](https://cursor.sh/docs/mcp)

---

**마지막 업데이트**: 2025년 10월 2일  
**문서 버전**: 1.0  
**프로젝트**: sandtray25
