// Supabase CRUD 테스트 스크립트
const { createClient } = require('@supabase/supabase-js');

// Supabase 설정
const supabaseUrl = 'https://yarakswvxhwlnomdmefr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhcmFrc3d2eGh3bG5vbWRtZWZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAwNTUwOCwiZXhwIjoyMDczNTgxNTA4fQ.9hLve1Y_345_s0s-9TgGZTH8eUxj9tqmbrL_oIh_1ug';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testCRUD() {
    console.log('🚀 Supabase CRUD 테스트 시작...\n');

    try {
        // 1. CREATE - 테이블 생성 (SQL로)
        console.log('1️⃣ CREATE - 테스트 테이블 생성');
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS test_users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                age INTEGER,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
        `;
        
        const { error: createError } = await supabase.rpc('exec_sql', { sql: createTableQuery });
        if (createError) {
            console.log('테이블 생성 시도 중 오류 (이미 존재할 수 있음):', createError.message);
        } else {
            console.log('✅ 테이블 생성 완료');
        }

        // 2. CREATE - 데이터 삽입
        console.log('\n2️⃣ CREATE - 테스트 데이터 삽입');
        const { data: insertData, error: insertError } = await supabase
            .from('test_users')
            .insert([
                { name: '김철수', email: 'kim@example.com', age: 25 },
                { name: '이영희', email: 'lee@example.com', age: 30 },
                { name: '박민수', email: 'park@example.com', age: 28 }
            ]);

        if (insertError) {
            console.log('❌ 데이터 삽입 오류:', insertError.message);
        } else {
            console.log('✅ 데이터 삽입 완료');
        }

        // 3. READ - 데이터 조회
        console.log('\n3️⃣ READ - 모든 데이터 조회');
        const { data: readData, error: readError } = await supabase
            .from('test_users')
            .select('*')
            .order('id');

        if (readError) {
            console.log('❌ 데이터 조회 오류:', readError.message);
        } else {
            console.log('✅ 데이터 조회 완료:');
            console.log(readData);
        }

        // 4. READ - 조건부 조회
        console.log('\n4️⃣ READ - 조건부 조회 (age > 26)');
        const { data: filteredData, error: filterError } = await supabase
            .from('test_users')
            .select('*')
            .gt('age', 26);

        if (filterError) {
            console.log('❌ 조건부 조회 오류:', filterError.message);
        } else {
            console.log('✅ 조건부 조회 완료:');
            console.log(filteredData);
        }

        // 5. UPDATE - 데이터 수정
        console.log('\n5️⃣ UPDATE - 데이터 수정 (김철수 나이 26으로 변경)');
        const { data: updateData, error: updateError } = await supabase
            .from('test_users')
            .update({ age: 26 })
            .eq('name', '김철수')
            .select();

        if (updateError) {
            console.log('❌ 데이터 수정 오류:', updateError.message);
        } else {
            console.log('✅ 데이터 수정 완료:');
            console.log(updateData);
        }

        // 6. DELETE - 데이터 삭제
        console.log('\n6️⃣ DELETE - 데이터 삭제 (박민수 삭제)');
        const { data: deleteData, error: deleteError } = await supabase
            .from('test_users')
            .delete()
            .eq('name', '박민수')
            .select();

        if (deleteError) {
            console.log('❌ 데이터 삭제 오류:', deleteError.message);
        } else {
            console.log('✅ 데이터 삭제 완료:');
            console.log(deleteData);
        }

        // 7. 최종 데이터 확인
        console.log('\n7️⃣ 최종 데이터 확인');
        const { data: finalData, error: finalError } = await supabase
            .from('test_users')
            .select('*')
            .order('id');

        if (finalError) {
            console.log('❌ 최종 조회 오류:', finalError.message);
        } else {
            console.log('✅ 최종 데이터:');
            console.log(finalData);
        }

        console.log('\n🎉 Supabase CRUD 테스트 완료!');

    } catch (error) {
        console.error('❌ 테스트 중 오류 발생:', error);
    }
}

// 테스트 실행
testCRUD();

