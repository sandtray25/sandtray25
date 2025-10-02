# sand_me 테이블 생성 가이드

## 📋 테이블 구조

`sand_me` 테이블을 다음 4개 컬럼으로 생성해주세요:

```sql
CREATE TABLE IF NOT EXISTS sand_me (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🔗 Supabase Dashboard 링크

다음 링크로 이동해서 SQL Editor에서 위의 SQL을 실행해주세요:

**https://supabase.com/dashboard/project/yarakswvxhwlnomdmefr/sql**

## 📝 컬럼 설명

1. **id**: SERIAL PRIMARY KEY - 자동 증가하는 고유 ID
2. **name**: VARCHAR(100) NOT NULL - 사용자 이름 (필수)
3. **email**: VARCHAR(255) UNIQUE NOT NULL - 이메일 주소 (고유값, 필수)
4. **age**: INTEGER - 나이 (선택사항)
5. **created_at**: TIMESTAMP WITH TIME ZONE DEFAULT NOW() - 레코드 생성일시

## 🚀 테이블 생성 후

테이블이 생성되면 다음 명령어로 테스트할 수 있습니다:

```bash
node test-sand-me-table.js
```
