-- ============================================================================
-- 한국모래상자치료학회 데이터베이스 스키마
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- PROFILES TABLE (사용자 프로필 정보)
-- ============================================================================
-- auth.users 테이블과 1:1 관계를 가지는 추가 사용자 정보 테이블

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,

  -- 기본 정보
  name TEXT NOT NULL,
  phone TEXT,

  -- 주소 정보
  zonecode TEXT,
  road_address TEXT,
  jibun_address TEXT,
  detail_address TEXT,

  -- 메타 정보
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- INDEXES
-- ============================================================================
CREATE INDEX IF NOT EXISTS profiles_phone_idx ON public.profiles(phone);
CREATE INDEX IF NOT EXISTS profiles_created_at_idx ON public.profiles(created_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: 사용자는 자신의 프로필만 조회 가능
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: 사용자는 자신의 프로필만 수정 가능
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy: 회원가입 시 프로필 생성 가능
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Policy: 사용자는 자신의 프로필만 삭제 가능
CREATE POLICY "Users can delete own profile"
  ON public.profiles
  FOR DELETE
  USING (auth.uid() = id);

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function: 프로필 updated_at 자동 업데이트
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: updated_at 자동 업데이트
DROP TRIGGER IF EXISTS on_profiles_updated ON public.profiles;
CREATE TRIGGER on_profiles_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Function: 회원가입 시 자동으로 프로필 생성
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

-- Trigger: 새 사용자 생성 시 프로필 자동 생성
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- GRANT PERMISSIONS
-- ============================================================================

-- Grant necessary permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE public.profiles IS '사용자 프로필 정보 테이블';
COMMENT ON COLUMN public.profiles.id IS 'auth.users 테이블의 user id (UUID)';
COMMENT ON COLUMN public.profiles.name IS '사용자 이름';
COMMENT ON COLUMN public.profiles.phone IS '핸드폰 번호 (010-1234-5678)';
COMMENT ON COLUMN public.profiles.zonecode IS '우편번호';
COMMENT ON COLUMN public.profiles.road_address IS '도로명 주소';
COMMENT ON COLUMN public.profiles.jibun_address IS '지번 주소';
COMMENT ON COLUMN public.profiles.detail_address IS '상세 주소';
COMMENT ON COLUMN public.profiles.created_at IS '생성 일시';
COMMENT ON COLUMN public.profiles.updated_at IS '수정 일시';
