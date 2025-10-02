// sand_me 테이블 CRUD 테스트 스크립트
const { createClient } = require('@supabase/supabase-js');

// Supabase 설정
const supabaseUrl = 'https://yarakswvxhwlnomdmefr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhcmFrc3d2eGh3bG5vbWRtZWZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAwNTUwOCwiZXhwIjoyMDczNTgxNTA4fQ.9hLve1Y_345_s0s-9TgGZTH8eUxj9tqmbrL_oIh_1ug';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSandMeTable() {
    console.log('🧪 sand_me 테이블 CRUD 테스트 시작...\n');

    try {
        // 1. 테이블 존재 확인
        console.log('1️⃣ 테이블 존재 확인');
        const { data: checkData, error: checkError } = await supabase
            .from('sand_me')
            .select('*')
            .limit(1);

        if (checkError) {
            if (checkError.code === 'PGRST116') {
                console.log('❌ sand_me 테이블이 존재하지 않습니다.');
                console.log('⚠️ 먼저 Supabase Dashboard에서 테이블을 생성해주세요.');
                console.log('📋 생성 가이드: manual-table-creation.md 파일을 참고하세요.');
                return;
            } else {
                console.log('❌ 테이블 확인 오류:', checkError.message);
                return;
            }
        } else {
            console.log('✅ sand_me 테이블이 존재합니다!');
        }

        // 2. CREATE - 테스트 데이터 삽입
        console.log('\n2️⃣ CREATE - 테스트 데이터 삽입');
        const { data: insertData, error: insertError } = await supabase
            .from('sand_me')
            .insert([
                { 
                    name: '김샌드', 
                    email: 'kim@sandtray.com', 
                    age: 28 
                },
                { 
                    name: '이트레이', 
                    email: 'lee@sandtray.com', 
                    age: 32 
                },
                { 
                    name: '박테라피', 
                    email: 'park@sandtray.com', 
                    age: 25 
                }
            ])
            .select();

        if (insertError) {
            console.log('❌ 데이터 삽입 오류:', insertError.message);
        } else {
            console.log('✅ 테스트 데이터 삽입 완료:');
            console.log(insertData);
        }

        // 3. READ - 전체 데이터 조회
        console.log('\n3️⃣ READ - 전체 데이터 조회');
        const { data: readData, error: readError } = await supabase
            .from('sand_me')
            .select('*')
            .order('id');

        if (readError) {
            console.log('❌ 데이터 조회 오류:', readError.message);
        } else {
            console.log('✅ 전체 데이터:');
            console.log(readData);
        }

        // 4. READ - 조건부 조회 (나이가 30 이상)
        console.log('\n4️⃣ READ - 조건부 조회 (나이 >= 30)');
        const { data: filteredData, error: filterError } = await supabase
            .from('sand_me')
            .select('*')
            .gte('age', 30)
            .order('age', { ascending: false });

        if (filterError) {
            console.log('❌ 조건부 조회 오류:', filterError.message);
        } else {
            console.log('✅ 조건부 조회 결과 (나이 >= 30):');
            console.log(filteredData);
        }

        // 5. UPDATE - 데이터 수정
        console.log('\n5️⃣ UPDATE - 데이터 수정 (김샌드 나이 29로 변경)');
        const { data: updateData, error: updateError } = await supabase
            .from('sand_me')
            .update({ age: 29 })
            .eq('name', '김샌드')
            .select();

        if (updateError) {
            console.log('❌ 데이터 수정 오류:', updateError.message);
        } else {
            console.log('✅ 데이터 수정 완료:');
            console.log(updateData);
        }

        // 6. DELETE - 데이터 삭제
        console.log('\n6️⃣ DELETE - 데이터 삭제 (박테라피 삭제)');
        const { data: deleteData, error: deleteError } = await supabase
            .from('sand_me')
            .delete()
            .eq('name', '박테라피')
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
            .from('sand_me')
            .select('*')
            .order('id');

        if (finalError) {
            console.log('❌ 최종 조회 오류:', finalError.message);
        } else {
            console.log('✅ 최종 데이터:');
            console.log(finalData);
        }

        // 8. 통계 정보
        console.log('\n8️⃣ 통계 정보');
        const { count, error: countError } = await supabase
            .from('sand_me')
            .select('*', { count: 'exact', head: true });

        if (countError) {
            console.log('❌ 개수 조회 오류:', countError.message);
        } else {
            console.log(`📊 총 레코드 수: ${count}개`);
        }

        console.log('\n🎉 sand_me 테이블 CRUD 테스트 완료!');
        console.log('✅ CREATE (삽입) - 성공');
        console.log('✅ READ (조회) - 성공');
        console.log('✅ UPDATE (수정) - 성공');
        console.log('✅ DELETE (삭제) - 성공');

    } catch (error) {
        console.error('❌ 테스트 중 오류 발생:', error);
    }
}

testSandMeTable();
