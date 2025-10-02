// Supabase 기존 테이블 확인 스크립트
const { createClient } = require('@supabase/supabase-js');

// Supabase 설정
const supabaseUrl = 'https://yarakswvxhwlnomdmefr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhcmFrc3d2eGh3bG5vbWRtZWZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAwNTUwOCwiZXhwIjoyMDczNTgxNTA4fQ.9hLve1Y_345_s0s-9TgGZTH8eUxj9tqmbrL_oIh_1ug';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkExistingTables() {
    console.log('🔍 기존 테이블 확인 중...\n');

    try {
        // 공통 테이블들을 확인해보겠습니다
        const commonTables = [
            'users', 'profiles', 'posts', 'comments', 'todos', 
            'test_users', 'test_table', 'sample_data'
        ];

        for (const tableName of commonTables) {
            try {
                const { data, error } = await supabase
                    .from(tableName)
                    .select('*')
                    .limit(1);

                if (error) {
                    if (error.code === 'PGRST116') {
                        console.log(`❌ 테이블 '${tableName}' 없음`);
                    } else {
                        console.log(`❓ 테이블 '${tableName}' 오류:`, error.message);
                    }
                } else {
                    console.log(`✅ 테이블 '${tableName}' 존재함`);
                    if (data && data.length > 0) {
                        console.log(`   - 데이터 ${data.length}개 있음`);
                    } else {
                        console.log(`   - 데이터 없음`);
                    }
                }
            } catch (err) {
                console.log(`❌ 테이블 '${tableName}' 확인 실패:`, err.message);
            }
        }

        // Supabase 기본 테이블들 확인
        console.log('\n🔍 Supabase 기본 테이블 확인:');
        const systemTables = [
            'auth.users', 'auth.sessions', 'auth.identities'
        ];

        for (const tableName of systemTables) {
            try {
                const { data, error } = await supabase
                    .from(tableName)
                    .select('*')
                    .limit(1);

                if (error) {
                    console.log(`❓ 시스템 테이블 '${tableName}' 오류:`, error.message);
                } else {
                    console.log(`✅ 시스템 테이블 '${tableName}' 접근 가능`);
                }
            } catch (err) {
                console.log(`❌ 시스템 테이블 '${tableName}' 확인 실패:`, err.message);
            }
        }

    } catch (error) {
        console.error('❌ 전체 확인 중 오류 발생:', error);
    }
}

checkExistingTables();

