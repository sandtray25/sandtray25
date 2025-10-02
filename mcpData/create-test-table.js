// Supabase 테이블 생성 스크립트
const { createClient } = require('@supabase/supabase-js');

// Supabase 설정
const supabaseUrl = 'https://yarakswvxhwlnomdmefr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhcmFrc3d2eGh3bG5vbWRtZWZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAwNTUwOCwiZXhwIjoyMDczNTgxNTA4fQ.9hLve1Y_345_s0s-9TgGZTH8eUxj9tqmbrL_oIh_1ug';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTestTable() {
    console.log('🔧 테스트 테이블 생성 중...\n');

    try {
        // SQL을 사용해서 테이블 생성
        const createTableSQL = `
            CREATE TABLE IF NOT EXISTS test_users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                age INTEGER,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
        `;

        // REST API를 통해 SQL 실행
        const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${supabaseKey}`,
                'apikey': supabaseKey
            },
            body: JSON.stringify({
                sql: createTableSQL
            })
        });

        if (response.ok) {
            console.log('✅ 테이블 생성 성공!');
            
            // 테이블이 생성되었는지 확인
            const { data, error } = await supabase
                .from('test_users')
                .select('*')
                .limit(1);
                
            if (error && error.code === 'PGRST116') {
                console.log('✅ 테이블이 성공적으로 생성되었습니다!');
            } else if (error) {
                console.log('❌ 테이블 확인 중 오류:', error.message);
            } else {
                console.log('✅ 테이블이 이미 존재하고 데이터에 접근 가능합니다!');
            }
        } else {
            const errorText = await response.text();
            console.log('❌ 테이블 생성 실패:', response.status, errorText);
        }

    } catch (error) {
        console.error('❌ 오류 발생:', error.message);
    }
}

createTestTable();

