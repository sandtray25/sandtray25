-- gangsa_list 테이블 데이터 삽입
-- Supabase Dashboard → SQL Editor에서 실행

-- gangsa_list 테이블 데이터 삽입
INSERT INTO sandtray.gangsa_list (2, '이복순', '1950-10-15', '010-2680-2986', '길벗마음치유연수소', 'field2000@hanmail.net', '501-200', '광주광역시 동구 운림동 무등파크맨션 102동 1403호 ', 'FN20140515170120.hwp', '2014-05-15 17:01:20', '118.40.35.26', '완료'),
(3, '김재옥', '1956-11-25', '010-9553-4695', '발달심리지원센터', 'kjo1125@hanmail.net', '58651', '전남 목포시영산로 325 카톨릭문화회관 503호 발달심리지원센터', 'FN20190301161931.hwp', '2019-03-01 16:19:31', '61.84.158.88', '신청중');

-- 확인 쿼리
SELECT COUNT(*) as total_records FROM sandtray.gangsa_list;
SELECT * FROM sandtray.gangsa_list LIMIT 5;
