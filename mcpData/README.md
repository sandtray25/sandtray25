# MCP Data 테스트 파일들

이 폴더는 Supabase MCP 테스트를 위해 생성된 파일들을 포함합니다.

## 📁 파일 목록

### 🆕 sand_me 테이블 관련 파일들

#### 1. `create-sand-me-table.js`
- **용도**: `sand_me` 테이블 생성 및 존재 확인 스크립트
- **실행**: `node create-sand-me-table.js`
- **기능**: 테이블 구조 확인 및 생성 가이드 제공

#### 2. `test-sand-me-table.js`
- **용도**: `sand_me` 테이블의 CRUD 기능 테스트 스크립트
- **실행**: `node test-sand-me-table.js`
- **기능**: 
  - CREATE: 테스트 데이터 삽입
  - READ: 전체/조건부 데이터 조회
  - UPDATE: 데이터 수정
  - DELETE: 데이터 삭제

#### 3. `manual-table-creation.md`
- **용도**: Supabase Dashboard를 통한 수동 테이블 생성 가이드
- **내용**: 
  - 테이블 구조 설명
  - SQL 생성 쿼리
  - Supabase Dashboard 링크

### 🔧 기존 테이블 테스트 파일들

#### 4. `check-existing-tables.js`
- **용도**: 기존 테이블들 존재 여부 확인
- **실행**: `node check-existing-tables.js`
- **기능**: 공통 테이블명들로 존재 여부 확인

#### 5. `create-test-table.js`
- **용도**: 테스트 테이블 생성 시도 스크립트
- **실행**: `node create-test-table.js`
- **기능**: SQL을 통한 테이블 생성 시도

#### 6. `test-crud-proper.js`
- **용도**: test_table의 실제 구조에 맞춘 CRUD 테스트
- **실행**: `node test-crud-proper.js`
- **기능**: 완전한 CRUD 작업 테스트

#### 7. `test-existing-table.js`
- **용도**: 기존 test_table을 사용한 CRUD 테스트
- **실행**: `node test-existing-table.js`
- **기능**: 기존 테이블의 CRUD 기능 검증

#### 8. `test-supabase-crud.js`
- **용도**: Supabase CRUD 기본 테스트 스크립트
- **실행**: `node test-supabase-crud.js`
- **기능**: 전체 CRUD 워크플로우 테스트

#### 9. `test_crud.sql`
- **용도**: SQL 기반 CRUD 테스트 쿼리
- **실행**: Supabase Dashboard SQL Editor에서 실행
- **기능**: SQL로 직접 CRUD 작업 수행

## 🚀 사용 방법

1. **테이블 생성**:
   ```bash
   node create-sand-me-table.js
   ```

2. **CRUD 테스트**:
   ```bash
   node test-sand-me-table.js
   ```

3. **수동 테이블 생성** (필요시):
   - `manual-table-creation.md` 파일 참고
   - Supabase Dashboard → SQL Editor에서 SQL 실행

## 📋 테이블 구조

```sql
CREATE TABLE IF NOT EXISTS sand_me (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🔧 Supabase MCP 설정

`.mcp.json`에서 다음 옵션들이 활성화되어 있습니다:
- `--allow-writes`: 데이터 쓰기 허용
- `--allow-deletes`: 데이터 삭제 허용
- `--allow-table-creation`: 테이블 생성 허용
- `--allow-schema-changes`: 스키마 변경 허용
- `--enable-sql-execution`: SQL 실행 허용

## 📝 주의사항

- 테스트 전에 Supabase 프로젝트가 올바르게 연결되어 있는지 확인하세요
- Service Role Key가 설정되어 있어야 모든 CRUD 작업이 가능합니다
- RLS(Row Level Security)가 비활성화되어 있어 테스트가 원활합니다
