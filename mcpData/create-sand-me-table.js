// sand_me 테이블 생성 스크립트
const { createClient } = require('@supabase/supabase-js');

// Supabase 설정
const supabaseUrl = 'https://yarakswvxhwlnomdmefr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhcmFrc3d2eGh3bG5vbWRtZWZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAwNTUwOCwiZXhwIjoyMDczNTgxNTA4fQ.9hLve1Y_345_s0s-9TgGZTH8eUxj9tqmbrL_oIh_1ug';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createSandMeTable() {
    console.log('🏗️ sand_me 테이블 생성 중...\n');

    try {
        // SQL을 사용해서 테이블 생성
        const createTableSQL = `
            CREATE TABLE IF NOT EXISTS sand_me (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                age INTEGER,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
        `;

        console.log('📋 테이블 구조:');
        console.log('- id: SERIAL PRIMARY KEY (자동 증가 ID)');
        console.log('- name: VARCHAR(100) NOT NULL (이름)');
        console.log('- email: VARCHAR(255) UNIQUE NOT NULL (이메일, 고유값)');
        console.log('- age: INTEGER (나이)');
        console.log('- created_at: TIMESTAMP WITH TIME ZONE DEFAULT NOW() (생성일시)');

        // REST API를 통해 SQL 실행 시도
        console.log('\n🔧 테이블 생성 시도 중...');
        
        // 대안 방법: 직접 데이터 삽입으로 테이블 존재 여부 확인
        const testData = {
            name: '테스트 사용자',
            email: 'test@example.com',
            age: 25
        };

        // 먼저 테이블이 존재하는지 확인
        const { data: existingData, error: checkError } = await supabase
            .from('sand_me')
            .select('*')
            .limit(1);

        if (checkError) {
            if (checkError.code === 'PGRST116') {
                console.log('❌ sand_me 테이블이 존재하지 않습니다.');
                console.log('⚠️ Supabase Dashboard의 SQL Editor를 통해 테이블을 생성해주세요.');
                console.log('\n📝 다음 SQL을 Supabase Dashboard → SQL Editor에서 실행하세요:');
                console.log('```sql');
                console.log(createTableSQL);
                console.log('```');
                
                console.log('\n🔗 Supabase Dashboard 링크:');
                console.log('https://supabase.com/dashboard/project/yarakswvxhwlnomdmefr/sql');
                
                return false;
            } else {
                console.log('❌ 테이블 확인 중 오류:', checkError.message);
                return false;
            }
        } else {
            console.log('✅ sand_me 테이블이 이미 존재합니다!');
            
            // 테이블 구조 확인
            const { data: sampleData, error: sampleError } = await supabase
                .from('sand_me')
                .select('*')
                .limit(1);

            if (sampleError) {
                console.log('❌ 테이블 구조 확인 오류:', sampleError.message);
            } else {
                console.log('📊 현재 테이블 데이터:');
                if (sampleData && sampleData.length > 0) {
                    console.log(sampleData[0]);
                } else {
                    console.log('테이블이 비어있습니다.');
                }
            }
            
            return true;
        }

    } catch (error) {
        console.error('❌ 오류 발생:', error.message);
        return false;
    }
}

createSandMeTable();
