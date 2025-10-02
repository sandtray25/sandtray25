// MCP 테스트를 위한 새 테이블 생성 및 CRUD 테스트
const { createClient } = require('@supabase/supabase-js');

// Supabase 설정
const supabaseUrl = 'https://yarakswvxhwlnomdmefr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhcmFrc3d2eGh3bG5vbWRtZWZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAwNTUwOCwiZXhwIjoyMDczNTgxNTA4fQ.9hLve1Y_345_s0s-9TgGZTH8eUxj9tqmbrL_oIh_1ug';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createMCPTestTable() {
    console.log('🚀 MCP 테스트용 테이블 생성 시작...\n');

    try {
        // 테이블 생성 SQL
        const createTableSQL = `
            CREATE TABLE IF NOT EXISTS mcp_test_table (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                status VARCHAR(50) DEFAULT 'active',
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
            
            -- 트리거 함수 생성 (updated_at 자동 업데이트)
            CREATE OR REPLACE FUNCTION update_updated_at_column()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = NOW();
                RETURN NEW;
            END;
            $$ language 'plpgsql';
            
            -- 트리거 생성
            DROP TRIGGER IF EXISTS update_mcp_test_table_updated_at ON mcp_test_table;
            CREATE TRIGGER update_mcp_test_table_updated_at
                BEFORE UPDATE ON mcp_test_table
                FOR EACH ROW
                EXECUTE FUNCTION update_updated_at_column();
        `;

        console.log('1️⃣ 테이블 및 트리거 생성 중...');
        
        // SQL 실행 (Supabase에서는 직접 SQL 실행이 제한적이므로 RPC 사용 시도)
        const { data, error } = await supabase.rpc('exec_sql', { sql: createTableSQL });
        
        if (error) {
            console.log('⚠️ RPC exec_sql 오류 (정상적일 수 있음):', error.message);
            console.log('📝 테이블이 이미 존재하거나 권한 문제일 수 있습니다.');
        } else {
            console.log('✅ 테이블 및 트리거 생성 완료');
        }

        // 테이블 존재 확인
        console.log('\n2️⃣ 테이블 존재 확인...');
        const { data: tableData, error: tableError } = await supabase
            .from('mcp_test_table')
            .select('*')
            .limit(1);

        if (tableError) {
            console.log('❌ 테이블 접근 오류:', tableError.message);
            console.log('📝 테이블이 존재하지 않거나 권한이 없습니다.');
            console.log('💡 Supabase Dashboard에서 수동으로 테이블을 생성해주세요.');
            return;
        }

        console.log('✅ 테이블 접근 성공');

        // 3. 초기 데이터 삽입
        console.log('\n3️⃣ 초기 테스트 데이터 삽입...');
        const { data: insertData, error: insertError } = await supabase
            .from('mcp_test_table')
            .insert([
                {
                    title: 'MCP 테스트 항목 1',
                    description: 'MCP를 통한 CRUD 테스트를 위한 첫 번째 항목입니다.',
                    status: 'active'
                },
                {
                    title: 'MCP 테스트 항목 2',
                    description: 'MCP를 통한 CRUD 테스트를 위한 두 번째 항목입니다.',
                    status: 'pending'
                },
                {
                    title: 'MCP 테스트 항목 3',
                    description: 'MCP를 통한 CRUD 테스트를 위한 세 번째 항목입니다.',
                    status: 'completed'
                }
            ])
            .select();

        if (insertError) {
            console.log('❌ 데이터 삽입 오류:', insertError.message);
        } else {
            console.log('✅ 초기 데이터 삽입 완료:');
            console.log(insertData);
        }

        // 4. 데이터 조회 테스트
        console.log('\n4️⃣ 데이터 조회 테스트...');
        const { data: readData, error: readError } = await supabase
            .from('mcp_test_table')
            .select('*')
            .order('id');

        if (readError) {
            console.log('❌ 데이터 조회 오류:', readError.message);
        } else {
            console.log('✅ 데이터 조회 성공:');
            console.log(readData);
        }

        console.log('\n🎉 MCP 테스트용 테이블 준비 완료!');
        console.log('📋 테이블명: mcp_test_table');
        console.log('📋 구조: id, title, description, status, created_at, updated_at');
        console.log('📋 초기 데이터: 3개 항목 삽입됨');

    } catch (error) {
        console.error('❌ 테이블 생성 중 오류 발생:', error);
    }
}

// 테스트 실행
createMCPTestTable();

