-- Add member management fields to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS journal boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS grade text DEFAULT 'associate',
ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending';

-- Add comment to columns
COMMENT ON COLUMN profiles.journal IS '학술지 허용 여부';
COMMENT ON COLUMN profiles.grade IS '회원 등급: admin, expert, grade1, grade2, regular, associate';
COMMENT ON COLUMN profiles.status IS '회원 상태: approved, pending';

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_profiles_grade ON profiles(grade);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON profiles(status);

