-- ============================================================================
-- 마이그레이션: profiles 테이블에 email 컬럼 추가
-- 생성일: 2025-10-09
-- ============================================================================

-- email 컬럼 추가
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS email TEXT;

-- email 컬럼에 인덱스 생성
CREATE INDEX IF NOT EXISTS profiles_email_idx ON public.profiles(email);

-- 주석 추가
COMMENT ON COLUMN public.profiles.email IS '이메일 주소';

