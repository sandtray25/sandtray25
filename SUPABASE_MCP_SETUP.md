# Supabase MCP 설정 가이드

이 문서는 Cursor에서 Supabase MCP(Model Context Protocol) 서버를 사용하기 위한 설정 가이드입니다.

## 1. 필요한 정보 수집

Supabase MCP 서버를 설정하기 위해 다음 정보가 필요합니다:

### Supabase 프로젝트 정보
1. **프로젝트 참조 ID**: Supabase 대시보드 > 프로젝트 설정 > 일반에서 확인
2. **Access Token**: Supabase 대시보드 > 프로젝트 설정 > API에서 생성

### 프로젝트 참조 ID 찾기
1. [Supabase 대시보드](https://app.supabase.com)에 로그인
2. 프로젝트 선택
3. 좌측 메뉴에서 "Settings" > "General" 클릭
4. "Reference ID" 섹션에서 프로젝트 ID 확인

### Access Token 생성하기
1. Supabase 대시보드에서 프로젝트 선택
2. 좌측 메뉴에서 "Settings" > "API" 클릭
3. "Project API keys" 섹션에서 "service_role" 키 복사 (또는 새로 생성)

## 2. 환경 변수 설정

프로젝트에 이미 `.env.local` 파일이 있습니다. 해당 파일에 다음 내용을 추가하세요:

```bash
# Supabase MCP 서버용
SUPABASE_ACCESS_TOKEN=your_access_token_here
```

**참고**: 이 프로젝트는 이미 `.env.local` 파일을 사용하고 있으며, Supabase 관련 환경변수들이 설정되어 있습니다.

## 3. MCP 설정 파일 업데이트

`.cursor/mcp.json` 파일을 열고 다음 값들을 업데이트하세요:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": [
        "@supabase/mcp-server-supabase@latest",
        "--read-only",
        "--project-ref=YOUR_PROJECT_REF_HERE"
      ],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "YOUR_ACCESS_TOKEN_HERE"
      }
    }
  }
}
```

- `YOUR_PROJECT_REF_HERE`: 실제 프로젝트 참조 ID로 교체
- `YOUR_ACCESS_TOKEN_HERE`: 실제 Access Token으로 교체

## 4. Cursor 재시작

설정을 완료한 후 Cursor를 재시작하세요.

## 5. MCP 서버 연결 확인

Cursor 재시작 후:
1. Cursor 설정에서 MCP 서버 상태 확인
2. 채팅에서 Supabase 관련 질문을 테스트

## 6. 사용 예시

MCP 서버가 정상적으로 연결되면 다음과 같은 기능을 사용할 수 있습니다:

- 데이터베이스 스키마 조회
- 테이블 구조 확인
- 쿼리 최적화 제안
- Supabase 관련 설정 도움

## 문제 해결

### MCP 서버가 연결되지 않는 경우
1. 프로젝트 참조 ID와 Access Token이 올바른지 확인
2. `.cursor/mcp.json` 파일의 JSON 형식이 올바른지 확인
3. 환경 변수가 올바르게 설정되었는지 확인
4. Cursor를 완전히 재시작

### 권한 오류가 발생하는 경우
- Access Token에 적절한 권한이 있는지 확인
- `--read-only` 옵션을 사용하여 읽기 전용 모드로 실행 중인지 확인

## 참고 자료

- [Supabase MCP 서버 공식 문서](https://supabase.com/blog/mcp-server)
- [Cursor MCP 설정 가이드](https://cursor.sh/docs)
