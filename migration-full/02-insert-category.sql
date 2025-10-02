-- category 테이블 데이터 삽입
-- Supabase Dashboard → SQL Editor에서 실행

-- category 테이블 데이터 삽입
INSERT INTO sandtray.category (1, '', '_18', '', '교육연수', '', 100, 'Y'),
(2, '', '_18', '', '워크샵', '', 100, 'Y'),
(3, '', '_19', '', '자격시험', '', 100, 'Y'),
(4, '', '_19', '', '자격면접', '', 100, 'Y'),
(5, '', '_19', '', '자격심사', '', 100, 'Y');

-- 확인 쿼리
SELECT COUNT(*) as total_records FROM sandtray.category;
SELECT * FROM sandtray.category LIMIT 5;
