-- money_renewal_set 테이블 데이터 삽입
-- Supabase Dashboard → SQL Editor에서 실행

-- money_renewal_set 테이블 데이터 삽입
INSERT INTO sandtray.money_renewal_set (2, 50000, 50000, 50000, 0, 0);

-- 확인 쿼리
SELECT COUNT(*) as total_records FROM sandtray.money_renewal_set;
SELECT * FROM sandtray.money_renewal_set LIMIT 5;
