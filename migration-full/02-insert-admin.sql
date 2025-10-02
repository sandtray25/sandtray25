-- admin 테이블 데이터 삽입
-- Supabase Dashboard → SQL Editor에서 실행

-- admin 테이블 데이터 삽입
INSERT INTO sandtray.admin (1, 0, 'admin', '전체관리자', 'c7753557b59d251571c55a79ef78ee4a', 0),
(2, 0, 'sandtray', '전체관리자', '4a737f5070b8ee92a9dfb9bae01fcfa6', 0);

-- 확인 쿼리
SELECT COUNT(*) as total_records FROM sandtray.admin;
SELECT * FROM sandtray.admin LIMIT 5;
