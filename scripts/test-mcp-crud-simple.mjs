#!/usr/bin/env node

/**
 * MCP execute_sql 도구를 사용한 간단한 CRUD 테스트
 */

import { spawn } from 'child_process';
import { config } from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// .env.local 로드
config({ path: join(projectRoot, '.env.local') });

const PROJECT_REF = process.env.SUPABASE_PROJECT_REF;
const ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN?.trim();

console.log('🧪 Supabase MCP CRUD 테스트\n');
console.log('='.repeat(60));
console.log('📋 설정 확인:');
console.log(`   - Project Ref: ${PROJECT_REF}`);
console.log(`   - Access Token: ${ACCESS_TOKEN ? '✅ 설정됨' : '❌ 없음'}`);
console.log('='.repeat(60));
console.log('');

if (!PROJECT_REF || !ACCESS_TOKEN) {
  console.error('❌ 환경 변수가 설정되지 않았습니다.');
  process.exit(1);
}

let mcpProcess;
let messageId = 0;
let responses = [];

/**
 * MCP 프로세스 시작
 */
function startMCP() {
  return new Promise((resolve, reject) => {
    console.log('🚀 MCP 서버 시작 중...\n');
    
    mcpProcess = spawn('npx', [
      '-y',
      '@supabase/mcp-server-supabase@latest',
      `--project-ref=${PROJECT_REF}`,
      `--access-token=${ACCESS_TOKEN}`
    ], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    let buffer = '';

    mcpProcess.stdout.on('data', (data) => {
      buffer += data.toString();
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';
      
      lines.forEach(line => {
        if (line.trim()) {
          try {
            const parsed = JSON.parse(line);
            responses.push(parsed);
          } catch (e) {
            // JSON이 아닌 로그 무시
          }
        }
      });
    });

    mcpProcess.stderr.on('data', (data) => {
      const msg = data.toString();
      if (msg.includes('started')) {
        console.log('✅ MCP 서버 시작 완료\n');
      }
    });

    mcpProcess.on('error', reject);

    setTimeout(resolve, 2000);
  });
}

/**
 * MCP 초기화
 */
function initialize() {
  return new Promise((resolve) => {
    console.log('🔧 MCP 초기화 중...\n');
    
    const request = {
      jsonrpc: '2.0',
      id: ++messageId,
      method: 'initialize',
      params: {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: {
          name: 'crud-test',
          version: '1.0.0'
        }
      }
    };

    responses = [];
    mcpProcess.stdin.write(JSON.stringify(request) + '\n');
    
    setTimeout(() => {
      console.log('✅ 초기화 완료\n');
      resolve();
    }, 1500);
  });
}

/**
 * SQL 실행
 */
function executeSQL(sql, description) {
  return new Promise((resolve) => {
    console.log(`📤 ${description}`);
    console.log(`   ${sql.split('\n')[0].trim()}...`);
    
    const request = {
      jsonrpc: '2.0',
      id: ++messageId,
      method: 'tools/call',
      params: {
        name: 'execute_sql',
        arguments: {
          query: sql
        }
      }
    };

    responses = [];
    mcpProcess.stdin.write(JSON.stringify(request) + '\n');
    
    setTimeout(() => {
      const response = responses[responses.length - 1];
      resolve(response);
    }, 2500);
  });
}

/**
 * 테스트 실행
 */
async function runTests() {
  const testId = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee';
  const results = { create: false, read: false, update: false, delete: false };

  try {
    await startMCP();
    await initialize();

    // 1. CREATE
    console.log('📝 [1/4] CREATE 테스트');
    console.log('-'.repeat(60));
    
    const createSQL = `
      INSERT INTO profiles (id, name, phone)
      VALUES ('${testId}', 'MCP 테스트', '010-1111-2222')
      RETURNING id, name, phone;
    `.trim();
    
    const createRes = await executeSQL(createSQL, 'INSERT 실행');
    
    if (createRes?.result?.content?.[0]?.text) {
      const text = createRes.result.content[0].text;
      console.log('   📊 전체 응답:\n', text);
      console.log('');
      
      if (text.includes(testId)) {
        console.log('   ✅ CREATE 성공!\n');
        results.create = true;
      } else {
        console.log('   ❌ CREATE 실패\n');
      }
    } else {
      console.log('   ❌ CREATE 실패: 응답 없음\n');
    }

    // 잠시 대기
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 2. READ
    console.log('\n📖 [2/4] READ 테스트');
    console.log('-'.repeat(60));
    
    const readSQL = `SELECT id, name, phone FROM profiles WHERE id = '${testId}';`;
    const readRes = await executeSQL(readSQL, 'SELECT 실행');
    
    if (readRes?.result?.content?.[0]?.text) {
      const text = readRes.result.content[0].text;
      console.log('   📊 전체 응답:\n', text);
      console.log('');
      
      if (text.includes(testId) && text.includes('MCP 테스트')) {
        console.log('   ✅ READ 성공!\n');
        results.read = true;
      } else if (text.includes('[]')) {
        console.log('   ⚠️  READ: 빈 결과 (데이터가 없음)\n');
      } else {
        console.log('   ❌ READ 실패: 데이터를 찾을 수 없음\n');
      }
    } else {
      console.log('   ❌ READ 실패: 응답 없음\n');
    }

    // 3. UPDATE
    console.log('\n✏️  [3/4] UPDATE 테스트');
    console.log('-'.repeat(60));
    
    const updateSQL = `
      UPDATE profiles
      SET phone = '010-3333-4444',
          road_address = '서울시 강남구 테헤란로 123'
      WHERE id = '${testId}'
      RETURNING id, phone, road_address;
    `.trim();
    
    const updateRes = await executeSQL(updateSQL, 'UPDATE 실행');
    
    if (updateRes?.result?.content?.[0]?.text) {
      const text = updateRes.result.content[0].text;
      console.log('   📊 전체 응답:\n', text);
      console.log('');
      
      if (text.includes('010-3333-4444')) {
        console.log('   ✅ UPDATE 성공!\n');
        results.update = true;
      } else if (text.includes('[]')) {
        console.log('   ⚠️  UPDATE: 빈 결과 (업데이트할 데이터가 없음)\n');
      } else {
        console.log('   ❌ UPDATE 실패\n');
      }
    } else {
      console.log('   ❌ UPDATE 실패: 응답 없음\n');
    }

    // 4. DELETE
    console.log('\n🗑️  [4/4] DELETE 테스트');
    console.log('-'.repeat(60));
    
    const deleteSQL = `DELETE FROM profiles WHERE id = '${testId}' RETURNING id;`;
    const deleteRes = await executeSQL(deleteSQL, 'DELETE 실행');
    
    if (deleteRes?.result?.content?.[0]?.text) {
      const text = deleteRes.result.content[0].text;
      if (text.includes(testId) || text.includes('[]')) {
        console.log('   ✅ DELETE 성공!\n');
        results.delete = true;
        
        // 삭제 확인
        const verifySQL = `SELECT COUNT(*) FROM profiles WHERE id = '${testId}';`;
        const verifyRes = await executeSQL(verifySQL, '삭제 확인');
        if (verifyRes?.result?.content?.[0]?.text) {
          console.log('   확인:', verifyRes.result.content[0].text.match(/\[.*?\]/)?.[0] || 'N/A');
        }
      } else {
        console.log('   ❌ DELETE 실패\n');
      }
    } else {
      console.log('   ❌ DELETE 실패: 응답 없음\n');
    }

    // 결과 요약
    console.log('\n' + '='.repeat(60));
    console.log('📊 테스트 결과 요약');
    console.log('='.repeat(60));
    console.log(`CREATE (생성): ${results.create ? '✅ 통과' : '❌ 실패'}`);
    console.log(`READ   (조회): ${results.read ? '✅ 통과' : '❌ 실패'}`);
    console.log(`UPDATE (수정): ${results.update ? '✅ 통과' : '❌ 실패'}`);
    console.log(`DELETE (삭제): ${results.delete ? '✅ 통과' : '❌ 실패'}`);
    console.log('='.repeat(60));

    const passCount = Object.values(results).filter(r => r).length;
    const totalCount = Object.keys(results).length;
    console.log(`\n결과: ${passCount}/${totalCount} 테스트 통과`);
    
    if (passCount === totalCount) {
      console.log('\n🎉 모든 CRUD 작업이 MCP를 통해 정상적으로 작동합니다!');
    } else {
      console.log('\n⚠️  일부 CRUD 작업에 문제가 있습니다.');
    }
    
    console.log('\n✨ MCP execute_sql 도구를 사용하여 테스트를 완료했습니다.\n');

    mcpProcess.kill();
    process.exit(passCount === totalCount ? 0 : 1);

  } catch (error) {
    console.error('\n💥 오류 발생:', error);
    if (mcpProcess) mcpProcess.kill();
    process.exit(1);
  }
}

runTests();

