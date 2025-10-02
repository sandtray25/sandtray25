-- count_dateLog 테이블 데이터 삽입
-- Supabase Dashboard → SQL Editor에서 실행

-- count_dateLog 테이블 데이터 삽입
INSERT INTO sandtray.count_dateLog (137, '41', '45', '43', '34', '41', '26', '38', '41', '39', '41', '48', '11', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '2025-09');

-- 확인 쿼리
SELECT COUNT(*) as total_records FROM sandtray.count_dateLog;
SELECT * FROM sandtray.count_dateLog LIMIT 5;
