-- money_conf 테이블 데이터 삽입
-- Supabase Dashboard → SQL Editor에서 실행

-- money_conf 테이블 데이터 삽입
INSERT INTO sandtray.money_conf (19, '회비', 2018, '연회비'),
(17, '회비', 2016, '연회비'),
(18, '회비', 2017, '연회비'),
(20, '회비', 2019, '연회비');

-- 확인 쿼리
SELECT COUNT(*) as total_records FROM sandtray.money_conf;
SELECT * FROM sandtray.money_conf LIMIT 5;
