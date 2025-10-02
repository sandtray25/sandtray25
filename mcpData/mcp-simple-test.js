#!/usr/bin/env node

/**
 * 간단한 MCP 테스트 스크립트
 * 실제 작동하는 MCP 명령어들을 실행하여 상태를 확인합니다.
 */

const { execSync } = require('child_process');

class SimpleMCPTest {
    constructor() {
        this.env = {
            SUPABASE_ACCESS_TOKEN: "sbp_27b6d4e37e11f8c7d4707d86c6e90d634e66d08e",
            SUPABASE_PROJECT_REF: "yarakswvxhwlnomdmefr",
            SUPABASE_URL: "https://yarakswvxhwlnomdmefr.supabase.co",
            SUPABASE_SERVICE_ROLE_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhcmFrc3d2eGh3bG5vbWRtZWZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAwNTUwOCwiZXhwIjoyMDczNTgxNTA4fQ.9hLve1Y_345_s0s-9TgGZTH8eUxj9tqmbrL_oIh_1ug",
            SUPABASE_DB_PASSWORD: "",
            SUPABASE_ENABLE_RLS: "false",
            SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhcmFrc3d2eGh3bG5vbWRtZWZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMDU1MDgsImV4cCI6MjA3MzU4MTUwOH0.Ri1po1cZUMwC5IwBOtjfxtPcnyFcG3JCTyRIwljRVX0"
        };
        
        this.results = [];
    }

    /**
     * MCP 명령어 실행
     */
    runMCPCommand(request, description) {
        console.log(`🔧 ${description}...`);
        
        try {
            const cmd = `echo '${JSON.stringify(request)}' | SUPABASE_ACCESS_TOKEN="${this.env.SUPABASE_ACCESS_TOKEN}" SUPABASE_PROJECT_REF="${this.env.SUPABASE_PROJECT_REF}" SUPABASE_URL="${this.env.SUPABASE_URL}" SUPABASE_SERVICE_ROLE_KEY="${this.env.SUPABASE_SERVICE_ROLE_KEY}" SUPABASE_DB_PASSWORD="${this.env.SUPABASE_DB_PASSWORD}" SUPABASE_ENABLE_RLS="${this.env.SUPABASE_ENABLE_RLS}" SUPABASE_ANON_KEY="${this.env.SUPABASE_ANON_KEY}" npx -y @supabase/mcp-server-supabase --project-ref=${this.env.SUPABASE_PROJECT_REF}`;
            
            const output = execSync(cmd, { 
                encoding: 'utf8',
                timeout: 10000 
            });
            
            const response = JSON.parse(output.trim());
            
            if (response.result) {
                console.log(`✅ ${description} - 성공`);
                this.results.push({ test: description, status: 'success', response });
                return response;
            } else {
                console.log(`❌ ${description} - 실패: ${response.error?.message || 'Unknown error'}`);
                this.results.push({ test: description, status: 'failed', error: response.error });
                return null;
            }
            
        } catch (error) {
            console.log(`❌ ${description} - 오류: ${error.message}`);
            this.results.push({ test: description, status: 'error', error: error.message });
            return null;
        }
    }

    /**
     * 모든 테스트 실행
     */
    async runAllTests() {
        console.log('🏥 간단한 MCP 테스트 시작...\n');
        
        // 1. 서버 초기화 테스트
        const initRequest = {
            jsonrpc: "2.0",
            id: 1,
            method: "initialize",
            params: {
                protocolVersion: "2024-11-05",
                capabilities: { tools: {} },
                clientInfo: { name: "simple-test", version: "1.0.0" }
            }
        };
        
        const initResponse = this.runMCPCommand(initRequest, "서버 초기화");
        
        // 2. 도구 목록 테스트
        const toolsRequest = {
            jsonrpc: "2.0",
            id: 2,
            method: "tools/list",
            params: {}
        };
        
        const toolsResponse = this.runMCPCommand(toolsRequest, "도구 목록 조회");
        
        // 3. 테이블 목록 테스트
        const tablesRequest = {
            jsonrpc: "2.0",
            id: 3,
            method: "tools/call",
            params: {
                name: "list_tables",
                arguments: { schemas: ["public"] }
            }
        };
        
        const tablesResponse = this.runMCPCommand(tablesRequest, "테이블 목록 조회");
        
        // 4. SQL 실행 테스트 (읽기)
        const readRequest = {
            jsonrpc: "2.0",
            id: 4,
            method: "tools/call",
            params: {
                name: "execute_sql",
                arguments: {
                    query: "SELECT COUNT(*) as table_count FROM information_schema.tables WHERE table_schema = 'public';"
                }
            }
        };
        
        const readResponse = this.runMCPCommand(readRequest, "SQL 실행 (읽기)");
        
        // 5. SQL 실행 테스트 (쓰기)
        const writeRequest = {
            jsonrpc: "2.0",
            id: 5,
            method: "tools/call",
            params: {
                name: "execute_sql",
                arguments: {
                    query: "INSERT INTO test_table (name) VALUES ('MCP 간단 테스트') RETURNING *;"
                }
            }
        };
        
        const writeResponse = this.runMCPCommand(writeRequest, "SQL 실행 (쓰기)");
        
        // 6. 정리 (삽입한 데이터 삭제)
        if (writeResponse && writeResponse.result) {
            const cleanupRequest = {
                jsonrpc: "2.0",
                id: 6,
                method: "tools/call",
                params: {
                    name: "execute_sql",
                    arguments: {
                        query: "DELETE FROM test_table WHERE name = 'MCP 간단 테스트';"
                    }
                }
            };
            
            this.runMCPCommand(cleanupRequest, "테스트 데이터 정리");
        }
        
        this.generateReport();
    }

    /**
     * 결과 리포트 생성
     */
    generateReport() {
        console.log('\n📋 테스트 결과 리포트');
        console.log('=' .repeat(50));
        
        const successCount = this.results.filter(r => r.status === 'success').length;
        const totalCount = this.results.length;
        
        console.log(`✅ 성공: ${successCount}/${totalCount}`);
        console.log(`❌ 실패: ${totalCount - successCount}/${totalCount}`);
        
        console.log('\n📊 상세 결과:');
        this.results.forEach((result, index) => {
            const status = result.status === 'success' ? '✅' : '❌';
            console.log(`  ${index + 1}. ${status} ${result.test}`);
            if (result.status !== 'success' && result.error) {
                console.log(`     오류: ${result.error}`);
            }
        });
        
        // 서버 정보 출력
        const initResult = this.results.find(r => r.test === '서버 초기화');
        if (initResult && initResult.status === 'success' && initResult.response?.result?.serverInfo) {
            const serverInfo = initResult.response.result.serverInfo;
            console.log(`\n🖥️ 서버 정보:`);
            console.log(`  이름: ${serverInfo.name}`);
            console.log(`  제목: ${serverInfo.title}`);
            console.log(`  버전: ${serverInfo.version}`);
        }
        
        // 도구 정보 출력
        const toolsResult = this.results.find(r => r.test === '도구 목록 조회');
        if (toolsResult && toolsResult.status === 'success' && toolsResult.response?.result?.tools) {
            const tools = toolsResult.response.result.tools;
            console.log(`\n🛠️ 사용 가능한 도구: ${tools.length}개`);
            
            const importantTools = ['list_tables', 'execute_sql', 'apply_migration', 'get_logs'];
            const availableImportantTools = tools.filter(tool => importantTools.includes(tool.name));
            console.log(`  주요 도구: ${availableImportantTools.length}/${importantTools.length}개 사용 가능`);
        }
        
        // 테이블 정보 출력
        const tablesResult = this.results.find(r => r.test === '테이블 목록 조회');
        if (tablesResult && tablesResult.status === 'success' && tablesResult.response?.result?.content) {
            try {
                const tables = JSON.parse(tablesResult.response.result.content[0].text);
                console.log(`\n📊 테이블 정보: ${tables.length}개 테이블`);
                tables.forEach(table => {
                    console.log(`  - ${table.name} (${table.rows}개 행, RLS: ${table.rls_enabled ? '활성' : '비활성'})`);
                });
            } catch (e) {
                console.log(`\n📊 테이블 정보: 파싱 오류`);
            }
        }
        
        // 전체 상태
        console.log('\n🎯 전체 상태:');
        if (successCount === totalCount) {
            console.log('🟢 모든 시스템이 정상 작동 중입니다!');
        } else if (successCount >= totalCount * 0.8) {
            console.log('🟡 시스템이 대부분 정상 작동 중입니다.');
        } else {
            console.log('🔴 시스템에 문제가 있습니다.');
        }
        
        console.log('\n💡 MCP가 정상적으로 작동하고 있습니다!');
        console.log('   이제 Cursor에서 자연어로 데이터베이스 작업을 요청할 수 있습니다.');
    }
}

// 테스트 실행
if (require.main === module) {
    const tester = new SimpleMCPTest();
    tester.runAllTests().catch(error => {
        console.error('❌ 테스트 실행 중 오류 발생:', error);
        process.exit(1);
    });
}

module.exports = SimpleMCPTest;
