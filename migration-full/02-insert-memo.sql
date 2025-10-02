-- memo 테이블 데이터 삽입
-- Supabase Dashboard → SQL Editor에서 실행

-- memo 테이블 데이터 삽입
INSERT INTO sandtray.memo (NULL, NULL, NULL, '');

-- 확인 쿼리
SELECT COUNT(*) as total_records FROM sandtray.memo;
SELECT * FROM sandtray.memo LIMIT 5;
