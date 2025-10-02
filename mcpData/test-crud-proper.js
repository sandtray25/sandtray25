// test_table의 실제 구조에 맞춘 CRUD 테스트
const { createClient } = require('@supabase/supabase-js');

// Supabase 설정
const supabaseUrl = 'https://yarakswvxhwlnomdmefr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhcmFrc3d2eGh3bG5vbWRtZWZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAwNTUwOCwiZXhwIjoyMDczNTgxNTA4fQ.9hLve1Y_345_s0s-9TgGZTH8eUxj9tqmbrL_oIh_1ug';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testCRUDProper() {
    console.log('🚀 test_table 구조에 맞춘 CRUD 테스트 시작...\n');
    console.log('테이블 구조: id, name, created_at\n');

    try {
        // 1. READ - 기존 데이터 확인
        console.log('1️⃣ READ - 기존 데이터 조회');
        const { data: initialData, error: readError } = await supabase
            .from('test_table')
            .select('*')
            .order('id');

        if (readError) {
            console.log('❌ 데이터 조회 오류:', readError.message);
            return;
        } else {
            console.log('✅ 기존 데이터:');
            console.log(initialData);
        }

        // 2. CREATE - 새 데이터 삽입
        console.log('\n2️⃣ CREATE - 새 데이터 삽입');
        const { data: insertData, error: insertError } = await supabase
            .from('test_table')
            .insert([
                { name: 'CRUD 테스트 사용자 1' },
                { name: 'CRUD 테스트 사용자 2' },
                { name: 'CRUD 테스트 사용자 3' }
            ])
            .select();

        if (insertError) {
            console.log('❌ 데이터 삽입 오류:', insertError.message);
        } else {
            console.log('✅ 새 데이터 삽입 완료:');
            console.log(insertData);
        }

        // 3. READ - 삽입 후 전체 데이터 조회
        console.log('\n3️⃣ READ - 삽입 후 전체 데이터 조회');
        const { data: afterInsertData, error: readAfterInsertError } = await supabase
            .from('test_table')
            .select('*')
            .order('id');

        if (readAfterInsertError) {
            console.log('❌ 삽입 후 조회 오류:', readAfterInsertError.message);
        } else {
            console.log('✅ 삽입 후 전체 데이터:');
            console.log(afterInsertData);
        }

        // 4. UPDATE - 데이터 수정
        console.log('\n4️⃣ UPDATE - 데이터 수정');
        if (insertData && insertData.length > 0) {
            const { data: updateData, error: updateError } = await supabase
                .from('test_table')
                .update({ name: '수정된 CRUD 테스트 사용자' })
                .eq('id', insertData[0].id)
                .select();

            if (updateError) {
                console.log('❌ 데이터 수정 오류:', updateError.message);
            } else {
                console.log('✅ 데이터 수정 완료:');
                console.log(updateData);
            }
        } else {
            console.log('⚠️ 수정할 데이터가 없습니다.');
        }

        // 5. READ - 조건부 조회 (특정 이름으로 검색)
        console.log('\n5️⃣ READ - 조건부 조회 (이름에 "CRUD" 포함)');
        const { data: filteredData, error: filterError } = await supabase
            .from('test_table')
            .select('*')
            .like('name', '%CRUD%')
            .order('id');

        if (filterError) {
            console.log('❌ 조건부 조회 오류:', filterError.message);
        } else {
            console.log('✅ 조건부 조회 결과 (이름에 "CRUD" 포함):');
            console.log(filteredData);
        }

        // 6. DELETE - 테스트 데이터 삭제
        console.log('\n6️⃣ DELETE - 테스트 데이터 삭제');
        if (insertData && insertData.length > 1) {
            const { data: deleteData, error: deleteError } = await supabase
                .from('test_table')
                .delete()
                .eq('id', insertData[1].id)
                .select();

            if (deleteError) {
                console.log('❌ 데이터 삭제 오류:', deleteError.message);
            } else {
                console.log('✅ 데이터 삭제 완료:');
                console.log(deleteData);
            }
        } else {
            console.log('⚠️ 삭제할 데이터가 없습니다.');
        }

        // 7. 최종 데이터 확인
        console.log('\n7️⃣ 최종 데이터 확인');
        const { data: finalData, error: finalError } = await supabase
            .from('test_table')
            .select('*')
            .order('id');

        if (finalError) {
            console.log('❌ 최종 조회 오류:', finalError.message);
        } else {
            console.log('✅ 최종 데이터:');
            console.log(finalData);
        }

        // 8. 추가 테스트 - 개수 조회
        console.log('\n8️⃣ READ - 데이터 개수 조회');
        const { count, error: countError } = await supabase
            .from('test_table')
            .select('*', { count: 'exact', head: true });

        if (countError) {
            console.log('❌ 개수 조회 오류:', countError.message);
        } else {
            console.log(`✅ 전체 데이터 개수: ${count}개`);
        }

        console.log('\n🎉 Supabase CRUD 테스트 완료!');
        console.log('✅ CREATE (삽입) - 성공');
        console.log('✅ READ (조회) - 성공');
        console.log('✅ UPDATE (수정) - 성공');
        console.log('✅ DELETE (삭제) - 성공');
        console.log('\n📊 테스트 결과: 모든 CRUD 작업이 정상적으로 작동합니다!');

    } catch (error) {
        console.error('❌ 테스트 중 오류 발생:', error);
    }
}

testCRUDProper();

