-- money_set 테이블 데이터 삽입
-- Supabase Dashboard → SQL Editor에서 실행

-- money_set 테이블 데이터 삽입
INSERT INTO sandtray.money_set (1, 100000, 30000, 30000, 30000, 20000);

-- 확인 쿼리
SELECT COUNT(*) as total_records FROM sandtray.money_set;
SELECT * FROM sandtray.money_set LIMIT 5;
