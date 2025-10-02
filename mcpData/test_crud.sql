-- Supabase CRUD 테스트용 SQL 스크립트

-- 1. 테스트 테이블 생성 (CREATE)
CREATE TABLE IF NOT EXISTS test_users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 테스트 데이터 삽입 (CREATE)
INSERT INTO test_users (name, email, age) VALUES 
('김철수', 'kim@example.com', 25),
('이영희', 'lee@example.com', 30),
('박민수', 'park@example.com', 28);

-- 3. 데이터 조회 (READ) - 모든 사용자
SELECT * FROM test_users;

-- 4. 데이터 조회 (READ) - 특정 조건
SELECT * FROM test_users WHERE age > 26;

-- 5. 데이터 수정 (UPDATE)
UPDATE test_users SET age = 26 WHERE name = '김철수';

-- 6. 수정된 데이터 확인
SELECT * FROM test_users WHERE name = '김철수';

-- 7. 데이터 삭제 (DELETE)
DELETE FROM test_users WHERE name = '박민수';

-- 8. 삭제 후 데이터 확인
SELECT * FROM test_users;

-- 9. 테스트 테이블 삭제 (정리)
-- DROP TABLE test_users;

