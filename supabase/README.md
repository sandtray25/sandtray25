# Supabase 데이터베이스 스키마

한국모래상자치료학회 프로젝트의 데이터베이스 스키마 및 마이그레이션 파일입니다.

---

## 📁 디렉토리 구조

```
supabase/
├── README.md              # 이 문서
├── config.toml            # Supabase 설정 파일
├── schema.sql             # 전체 데이터베이스 스키마
└── migrations/            # 마이그레이션 파일들
    ├── 20241009000000_initial_schema.sql
    ├── 20241009000001_create_team_table.sql
    └── 20241009000002_add_email_to_profiles.sql
```

---

## 📊 데이터베이스 스키마

### 1. profiles 테이블

사용자 프로필 정보를 저장하는 메인 테이블입니다.

**구조**:
```sql
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  zonecode TEXT,
  road_address TEXT,
  jibun_address TEXT,
  detail_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
```

**특징**:
- `auth.users` 테이블과 1:1 관계
- RLS(Row Level Security) 활성화
- 자동 생성/수정 시간 관리
- 회원가입 시 자동으로 프로필 생성 (트리거)

**보안 정책**:
- 사용자는 자신의 프로필만 조회/수정/삭제 가능
- 회원가입 시 자신의 프로필만 생성 가능

### 2. hoam 테이블

팀 정보 및 테스트 데이터용 테이블입니다.

**구조**:
```sql
CREATE TABLE hoam (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  team TEXT NOT NULL,
  goal TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**샘플 데이터**:
- 김철수 (개발팀 - 풀스택 개발자 되기)
- 이영희 (디자인팀 - UI/UX 전문가 되기)
- 박민수 (기획팀 - 프로덕트 오너 되기)

---

## 🔄 마이그레이션

### 마이그레이션 실행 순서

1. **20241009000000_initial_schema.sql**
   - profiles 테이블 생성
   - RLS 정책 설정
   - 트리거 함수 생성
   - 인덱스 생성

2. **20241009000001_create_team_table.sql**
   - team 관련 테이블 생성 (선택사항)

3. **20241009000002_add_email_to_profiles.sql**
   - profiles 테이블에 email 컬럼 추가
   - email 인덱스 생성

### 마이그레이션 적용 방법

#### 방법 1: Supabase 대시보드 (권장)

1. [Supabase 대시보드](https://app.supabase.com) 접속
2. 프로젝트 선택
3. 좌측 메뉴 `SQL Editor` 클릭
4. 마이그레이션 파일 내용을 순서대로 복사하여 실행

#### 방법 2: MCP를 통한 적용

```bash
# MCP를 사용한 마이그레이션 적용 (스크립트 예정)
node scripts/apply-migration.mjs
```

#### 방법 3: Supabase CLI (로컬 개발)

```bash
# Supabase CLI 설치
npm install -g supabase

# 로컬 Supabase 시작
supabase start

# 마이그레이션 적용
supabase db push

# 원격 Supabase에 적용
supabase db push --linked
```

---

## 🔧 주요 기능

### 자동 프로필 생성

새 사용자가 가입하면 자동으로 프로필이 생성됩니다.

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'Unknown User')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 자동 updated_at 업데이트

프로필 수정 시 자동으로 `updated_at`이 업데이트됩니다.

```sql
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 🔒 보안 (RLS)

### RLS 정책 확인

```sql
-- profiles 테이블의 모든 정책 조회
SELECT * FROM pg_policies WHERE tablename = 'profiles';

-- RLS 활성화 확인
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public' AND tablename = 'profiles';
```

### 정책 상세

1. **"Users can view own profile"**
   - SELECT 권한
   - `auth.uid() = id` 조건

2. **"Users can insert own profile"**
   - INSERT 권한
   - 회원가입 시 자신의 ID로만 생성 가능

3. **"Users can update own profile"**
   - UPDATE 권한
   - `auth.uid() = id` 조건

4. **"Users can delete own profile"**
   - DELETE 권한
   - `auth.uid() = id` 조건

---

## 📝 스키마 수정 가이드

### 새 컬럼 추가

1. 마이그레이션 파일 생성:
```sql
-- migrations/새파일명.sql
ALTER TABLE public.profiles 
ADD COLUMN new_column TEXT;

-- 인덱스 추가 (필요시)
CREATE INDEX profiles_new_column_idx ON public.profiles(new_column);

-- 주석 추가
COMMENT ON COLUMN public.profiles.new_column IS '컬럼 설명';
```

2. `schema.sql` 파일도 업데이트

3. Supabase 대시보드에서 마이그레이션 실행

### 새 테이블 생성

1. 마이그레이션 파일 생성
2. RLS 정책 설정 (필요시)
3. 인덱스 생성
4. 외래 키 설정 (필요시)

---

## 🧪 테스트

### 스키마 적용 확인

```sql
-- 모든 테이블 목록
SELECT tablename FROM pg_tables 
WHERE schemaname = 'public';

-- profiles 테이블 구조
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'profiles'
ORDER BY ordinal_position;

-- 인덱스 확인
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'profiles';
```

### 프로필 생성 테스트

```sql
-- 테스트 사용자 생성 (Auth를 통해)
-- 자동으로 profiles 레코드가 생성되어야 함

-- profiles 레코드 확인
SELECT id, name, email, created_at
FROM profiles
WHERE id = 'user-uuid-here';
```

---

## 🔄 백업 및 복원

### 데이터 백업

```bash
# Supabase CLI를 통한 백업
supabase db dump -f backup.sql

# 특정 테이블만 백업
supabase db dump -f profiles_backup.sql --table profiles
```

### 데이터 복원

```bash
# SQL 파일로 복원
supabase db reset
supabase db push
```

---

## 📚 참고 자료

- [Supabase 데이터베이스 문서](https://supabase.com/docs/guides/database)
- [PostgreSQL 공식 문서](https://www.postgresql.org/docs/)
- [Row Level Security 가이드](https://supabase.com/docs/guides/auth/row-level-security)
- 프로젝트 MCP 가이드: `../SUPABASE_MCP_GUIDE.md`
- 일반 Supabase 설정: `../SUPABASE_SETUP_GUIDE.md`

---

## 📞 도움말

### 일반적인 문제

**Q: 마이그레이션 순서가 중요한가요?**
A: 네, 파일명의 타임스탬프 순서대로 실행해야 합니다.

**Q: 로컬 개발 환경 설정은?**
A: Supabase CLI를 사용하여 로컬 Supabase를 실행할 수 있습니다.

**Q: RLS를 비활성화하려면?**
A: 개발 환경에서만 사용하세요:
```sql
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
```

---

**마지막 업데이트**: 2025-10-09  
**스키마 버전**: 1.0.2
