#!/usr/bin/env node

/**
 * Supabase MCP 헬스 체크 스크립트
 * 
 * 이 스크립트는 MCP 서버의 작동 상태를 확인하고
 * 모든 주요 기능이 정상적으로 작동하는지 검증합니다.
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// 환경 변수 설정
const env = {
    SUPABASE_ACCESS_TOKEN: "sbp_27b6d4e37e11f8c7d4707d86c6e90d634e66d08e",
    SUPABASE_PROJECT_REF: "yarakswvxhwlnomdmefr",
    SUPABASE_URL: "https://yarakswvxhwlnomdmefr.supabase.co",
    SUPABASE_SERVICE_ROLE_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhcmFrc3d2eGh3bG5vbWRtZWZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAwNTUwOCwiZXhwIjoyMDczNTgxNTA4fQ.9hLve1Y_345_s0s-9TgGZTH8eUxj9tqmbrL_oIh_1ug",
    SUPABASE_DB_PASSWORD: "",
    SUPABASE_ENABLE_RLS: "false",
    SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhcmFrc3d2eGh3bG5vbWRtZWZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMDU1MDgsImV4cCI6MjA3MzU4MTUwOH0.Ri1po1cZUMwC5IwBOtjfxtPcnyFcG3JCTyRIwljRVX0"
};

class MCPHealthChecker {
    constructor() {
        this.results = {
            server: null,
            tools: null,
            tables: null,
            crud: null,
            errors: []
        };
    }

    /**
     * MCP 서버에 JSON-RPC 요청을 보냅니다
     */
    async sendMCPRequest(request) {
        return new Promise((resolve, reject) => {
            const mcpProcess = spawn('npx', [
                '-y', 
                '@supabase/mcp-server-supabase', 
                '--project-ref=yarakswvxhwlnomdmefr'
            ], {
                env: { ...process.env, ...env },
                stdio: ['pipe', 'pipe', 'pipe']
            });

            let output = '';
            let errorOutput = '';

            mcpProcess.stdout.on('data', (data) => {
                output += data.toString();
            });

            mcpProcess.stderr.on('data', (data) => {
                errorOutput += data.toString();
            });

            mcpProcess.on('close', (code) => {
                if (code !== 0) {
                    reject(new Error(`MCP process exited with code ${code}: ${errorOutput}`));
                } else {
                    try {
                        // 출력에서 JSON 부분만 추출
                        const jsonMatch = output.match(/\{.*\}/s);
                        if (jsonMatch) {
                            const response = JSON.parse(jsonMatch[0]);
                            resolve(response);
                        } else {
                            reject(new Error(`No valid JSON found in output: ${output}`));
                        }
                    } catch (e) {
                        reject(new Error(`Failed to parse MCP response: ${output}. Error: ${e.message}`));
                    }
                }
            });

            mcpProcess.on('error', (err) => {
                reject(err);
            });

            // 요청 전송
            mcpProcess.stdin.write(JSON.stringify(request));
            mcpProcess.stdin.end();
        });
    }

    /**
     * 1. MCP 서버 초기화 테스트
     */
    async testServerInitialization() {
        console.log('🔧 1. MCP 서버 초기화 테스트...');
        
        try {
            const request = {
                jsonrpc: "2.0",
                id: 1,
                method: "initialize",
                params: {
                    protocolVersion: "2024-11-05",
                    capabilities: { tools: {} },
                    clientInfo: { name: "health-check", version: "1.0.0" }
                }
            };

            const response = await this.sendMCPRequest(request);
            
            if (response.result && response.result.serverInfo) {
                console.log(`✅ 서버 초기화 성공: ${response.result.serverInfo.name} v${response.result.serverInfo.version}`);
                this.results.server = {
                    status: 'success',
                    version: response.result.serverInfo.version,
                    name: response.result.serverInfo.name
                };
            } else {
                throw new Error('Invalid server response');
            }
        } catch (error) {
            console.log(`❌ 서버 초기화 실패: ${error.message}`);
            this.results.errors.push(`Server initialization: ${error.message}`);
            this.results.server = { status: 'failed', error: error.message };
        }
    }

    /**
     * 2. 사용 가능한 도구 목록 테스트
     */
    async testAvailableTools() {
        console.log('\n🛠️ 2. 사용 가능한 도구 목록 테스트...');
        
        try {
            const request = {
                jsonrpc: "2.0",
                id: 2,
                method: "tools/list",
                params: {}
            };

            const response = await this.sendMCPRequest(request);
            
            if (response.result && response.result.tools) {
                const tools = response.result.tools;
                console.log(`✅ 사용 가능한 도구: ${tools.length}개`);
                
                // 주요 도구들 확인
                const expectedTools = [
                    'list_tables',
                    'execute_sql', 
                    'apply_migration',
                    'get_logs',
                    'get_advisors'
                ];
                
                const availableTools = tools.map(tool => tool.name);
                const missingTools = expectedTools.filter(tool => !availableTools.includes(tool));
                
                if (missingTools.length === 0) {
                    console.log('✅ 모든 주요 도구가 사용 가능합니다');
                } else {
                    console.log(`⚠️ 누락된 도구: ${missingTools.join(', ')}`);
                }
                
                this.results.tools = {
                    status: 'success',
                    count: tools.length,
                    available: availableTools,
                    missing: missingTools
                };
            } else {
                throw new Error('Invalid tools response');
            }
        } catch (error) {
            console.log(`❌ 도구 목록 조회 실패: ${error.message}`);
            this.results.errors.push(`Tools list: ${error.message}`);
            this.results.tools = { status: 'failed', error: error.message };
        }
    }

    /**
     * 3. 테이블 목록 조회 테스트
     */
    async testTableListing() {
        console.log('\n📊 3. 테이블 목록 조회 테스트...');
        
        try {
            const request = {
                jsonrpc: "2.0",
                id: 3,
                method: "tools/call",
                params: {
                    name: "list_tables",
                    arguments: { schemas: ["public"] }
                }
            };

            const response = await this.sendMCPRequest(request);
            
            if (response.result && response.result.content) {
                const tables = JSON.parse(response.result.content[0].text);
                console.log(`✅ 테이블 목록 조회 성공: ${tables.length}개 테이블`);
                
                // 주요 테이블들 확인
                const tableNames = tables.map(table => table.name);
                console.log(`📋 테이블 목록: ${tableNames.join(', ')}`);
                
                this.results.tables = {
                    status: 'success',
                    count: tables.length,
                    names: tableNames
                };
            } else {
                throw new Error('Invalid tables response');
            }
        } catch (error) {
            console.log(`❌ 테이블 목록 조회 실패: ${error.message}`);
            this.results.errors.push(`Table listing: ${error.message}`);
            this.results.tables = { status: 'failed', error: error.message };
        }
    }

    /**
     * 4. CRUD 작업 테스트
     */
    async testCRUDOperations() {
        console.log('\n🔄 4. CRUD 작업 테스트...');
        
        const crudResults = {
            create: null,
            read: null,
            update: null,
            delete: null
        };

        try {
            // CREATE 테스트
            console.log('  📝 CREATE 테스트...');
            const createRequest = {
                jsonrpc: "2.0",
                id: 4,
                method: "tools/call",
                params: {
                    name: "execute_sql",
                    arguments: {
                        query: "INSERT INTO test_table (name) VALUES ('MCP 헬스체크 테스트') RETURNING *;"
                    }
                }
            };

            const createResponse = await this.sendMCPRequest(createRequest);
            if (createResponse.result && createResponse.result.content) {
                const data = JSON.parse(createResponse.result.content[0].text.match(/<untrusted-data-[^>]+>(.*?)<\/untrusted-data-[^>]+>/s)[1]);
                console.log(`    ✅ CREATE 성공: ID ${data[0].id}`);
                crudResults.create = { status: 'success', id: data[0].id };
            }

            // READ 테스트
            console.log('  📖 READ 테스트...');
            const readRequest = {
                jsonrpc: "2.0",
                id: 5,
                method: "tools/call",
                params: {
                    name: "execute_sql",
                    arguments: {
                        query: "SELECT * FROM test_table WHERE name = 'MCP 헬스체크 테스트';"
                    }
                }
            };

            const readResponse = await this.sendMCPRequest(readRequest);
            if (readResponse.result && readResponse.result.content) {
                console.log('    ✅ READ 성공');
                crudResults.read = { status: 'success' };
            }

            // UPDATE 테스트
            console.log('  ✏️ UPDATE 테스트...');
            const updateRequest = {
                jsonrpc: "2.0",
                id: 6,
                method: "tools/call",
                params: {
                    name: "execute_sql",
                    arguments: {
                        query: "UPDATE test_table SET name = 'MCP 헬스체크 업데이트됨' WHERE name = 'MCP 헬스체크 테스트' RETURNING *;"
                    }
                }
            };

            const updateResponse = await this.sendMCPRequest(updateRequest);
            if (updateResponse.result && updateResponse.result.content) {
                console.log('    ✅ UPDATE 성공');
                crudResults.update = { status: 'success' };
            }

            // DELETE 테스트
            console.log('  🗑️ DELETE 테스트...');
            const deleteRequest = {
                jsonrpc: "2.0",
                id: 7,
                method: "tools/call",
                params: {
                    name: "execute_sql",
                    arguments: {
                        query: "DELETE FROM test_table WHERE name = 'MCP 헬스체크 업데이트됨' RETURNING *;"
                    }
                }
            };

            const deleteResponse = await this.sendMCPRequest(deleteRequest);
            if (deleteResponse.result && deleteResponse.result.content) {
                console.log('    ✅ DELETE 성공');
                crudResults.delete = { status: 'success' };
            }

            // 전체 CRUD 결과 확인
            const allSuccess = Object.values(crudResults).every(result => result && result.status === 'success');
            if (allSuccess) {
                console.log('✅ 모든 CRUD 작업이 성공했습니다');
                this.results.crud = { status: 'success', operations: crudResults };
            } else {
                console.log('❌ 일부 CRUD 작업이 실패했습니다');
                this.results.crud = { status: 'partial', operations: crudResults };
            }

        } catch (error) {
            console.log(`❌ CRUD 테스트 실패: ${error.message}`);
            this.results.errors.push(`CRUD operations: ${error.message}`);
            this.results.crud = { status: 'failed', error: error.message };
        }
    }

    /**
     * 헬스 체크 실행
     */
    async runHealthCheck() {
        console.log('🏥 Supabase MCP 헬스 체크 시작...\n');
        
        await this.testServerInitialization();
        await this.testAvailableTools();
        await this.testTableListing();
        await this.testCRUDOperations();
        
        this.generateReport();
    }

    /**
     * 결과 리포트 생성
     */
    generateReport() {
        console.log('\n📋 헬스 체크 결과 리포트');
        console.log('=' .repeat(50));
        
        // 서버 상태
        if (this.results.server && this.results.server.status === 'success') {
            console.log(`✅ 서버: ${this.results.server.name} v${this.results.server.version}`);
        } else {
            console.log(`❌ 서버: 연결 실패`);
        }
        
        // 도구 상태
        if (this.results.tools && this.results.tools.status === 'success') {
            console.log(`✅ 도구: ${this.results.tools.count}개 사용 가능`);
        } else {
            console.log(`❌ 도구: 조회 실패`);
        }
        
        // 테이블 상태
        if (this.results.tables && this.results.tables.status === 'success') {
            console.log(`✅ 테이블: ${this.results.tables.count}개 테이블 발견`);
        } else {
            console.log(`❌ 테이블: 조회 실패`);
        }
        
        // CRUD 상태
        if (this.results.crud && this.results.crud.status === 'success') {
            console.log(`✅ CRUD: 모든 작업 성공`);
        } else if (this.results.crud && this.results.crud.status === 'partial') {
            console.log(`⚠️ CRUD: 일부 작업 실패`);
        } else {
            console.log(`❌ CRUD: 작업 실패`);
        }
        
        // 오류 목록
        if (this.results.errors.length > 0) {
            console.log('\n🚨 발견된 오류:');
            this.results.errors.forEach((error, index) => {
                console.log(`  ${index + 1}. ${error}`);
            });
        }
        
        // 전체 상태
        const hasErrors = this.results.errors.length > 0;
        const hasFailures = Object.values(this.results).some(result => 
            result && typeof result === 'object' && result.status === 'failed'
        );
        
        console.log('\n🎯 전체 상태:');
        if (!hasErrors && !hasFailures) {
            console.log('🟢 모든 시스템이 정상 작동 중입니다!');
        } else if (hasFailures) {
            console.log('🔴 시스템에 심각한 문제가 있습니다.');
        } else {
            console.log('🟡 시스템이 작동 중이지만 일부 경고가 있습니다.');
        }
        
        // 결과를 파일로 저장
        const reportPath = path.join(__dirname, 'mcp-health-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
        console.log(`\n📄 상세 리포트가 저장되었습니다: ${reportPath}`);
    }
}

// 헬스 체크 실행
if (require.main === module) {
    const checker = new MCPHealthChecker();
    checker.runHealthCheck().catch(error => {
        console.error('❌ 헬스 체크 실행 중 오류 발생:', error);
        process.exit(1);
    });
}

module.exports = MCPHealthChecker;
