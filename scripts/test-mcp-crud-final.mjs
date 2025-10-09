#!/usr/bin/env node

/**
 * MCP CRUD 최종 테스트
 * - 테스트 전용 테이블 생성
 * - MCP execute_sql로 CRUD 수행
 * - 테스트 후 정리
 */

import { spawn } from 'child_process';
import { config } from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

config({ path: join(projectRoot, '.env.local') });

const PROJECT_REF = process.env.SUPABASE_PROJECT_REF;
const ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN?.trim();

console.log('🧪 Supabase MCP CRUD 테스트 (테스트 테이블 사용)\n');
console.log('='.repeat(60));

if (!PROJECT_REF || !ACCESS_TOKEN) {
  console.error('❌ 환경 변수가 설정되지 않았습니다.');
  process.exit(1);
}

let mcpProcess;
let messageId = 0;
let responses = [];

function startMCP() {
  return new Promise((resolve) => {
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
            responses.push(JSON.parse(line));
          } catch (e) {}
        }
      });
    });

    mcpProcess.stderr.on('data', (data) => {
      const msg = data.toString();
      if (msg.includes('started')) {
        console.log('✅ MCP 서버 시작 완료\n');
      }
    });

    setTimeout(resolve, 2000);
  });
}

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
        clientInfo: { name: 'crud-test', version: '1.0.0' }
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

function executeSQL(sql, description) {
  return new Promise((resolve) => {
    console.log(`📤 ${description}`);
    
    const request = {
      jsonrpc: '2.0',
      id: ++messageId,
      method: 'tools/call',
      params: {
        name: 'execute_sql',
        arguments: { query: sql }
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

async function runTests() {
  const tableName = 'mcp_crud_test';
  const testId = 'test-001';
  const results = { 
    setup: false,
    create: false,
    read: false,
    update: false,
    delete: false,
    cleanup: false
  };

  try {
    await startMCP();
    await initialize();

    // 0. SETUP - 테스트 테이블 생성
    console.log('🔨 [0/5] 테스트 테이블 생성');
    console.log('-'.repeat(60));
    
    const setupSQL = `
      DROP TABLE IF EXISTS ${tableName};
      CREATE TABLE ${tableName} (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT,
        count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `.trim();
    
    const setupRes = await executeSQL(setupSQL, '테이블 생성');
    
    if (setupRes?.result || !setupRes?.error) {
      console.log('   ✅ 테이블 생성 성공!\n');
      results.setup = true;
    } else {
      console.log('   ❌ 테이블 생성 실패');
      console.log('   응답:', JSON.stringify(setupRes).substring(0, 300));
      throw new Error('테이블 생성 실패');
    }

    await new Promise(r => setTimeout(r, 1000));

    // 1. CREATE
    console.log('📝 [1/5] CREATE 테스트');
    console.log('-'.repeat(60));
    
    const createSQL = `
      INSERT INTO ${tableName} (id, name, email, count)
      VALUES ('${testId}', 'MCP 테스트', 'test@mcp.com', 100)
      RETURNING *;
    `.trim();
    
    const createRes = await executeSQL(createSQL, 'INSERT 실행');
    
    if (createRes?.result?.content?.[0]?.text) {
      const text = createRes.result.content[0].text;
      
      if (text.includes(testId) && text.includes('MCP 테스트')) {
        console.log('   ✅ CREATE 성공!');
        console.log('   데이터:', text.match(/\[.*?\]/s)?.[0]?.substring(0, 100) || 'N/A');
        console.log('');
        results.create = true;
      } else if (text.includes('error')) {
        console.log('   ❌ CREATE 실패 (에러)');
        console.log('   응답:', text.substring(0, 200));
        console.log('');
      }
    }

    await new Promise(r => setTimeout(r, 1000));

    // 2. READ
    console.log('📖 [2/5] READ 테스트');
    console.log('-'.repeat(60));
    
    const readSQL = `SELECT * FROM ${tableName} WHERE id = '${testId}';`;
    const readRes = await executeSQL(readSQL, 'SELECT 실행');
    
    if (readRes?.result?.content?.[0]?.text) {
      const text = readRes.result.content[0].text;
      
      if (text.includes(testId) && text.includes('MCP 테스트')) {
        console.log('   ✅ READ 성공!');
        console.log('   데이터:', text.match(/\[.*?\]/s)?.[0]?.substring(0, 100) || 'N/A');
        console.log('');
        results.read = true;
      } else if (text.includes('[]')) {
        console.log('   ⚠️  READ: 빈 결과 (데이터 없음)\n');
      }
    }

    await new Promise(r => setTimeout(r, 1000));

    // 3. UPDATE
    console.log('✏️  [3/5] UPDATE 테스트');
    console.log('-'.repeat(60));
    
    const updateSQL = `
      UPDATE ${tableName}
      SET email = 'updated@mcp.com', count = 200
      WHERE id = '${testId}'
      RETURNING *;
    `.trim();
    
    const updateRes = await executeSQL(updateSQL, 'UPDATE 실행');
    
    if (updateRes?.result?.content?.[0]?.text) {
      const text = updateRes.result.content[0].text;
      
      if (text.includes('updated@mcp.com') && text.includes('200')) {
        console.log('   ✅ UPDATE 성공!');
        console.log('   업데이트:', text.match(/\[.*?\]/s)?.[0]?.substring(0, 100) || 'N/A');
        console.log('');
        results.update = true;
      } else if (text.includes('[]')) {
        console.log('   ⚠️  UPDATE: 빈 결과\n');
      }
    }

    await new Promise(r => setTimeout(r, 1000));

    // 4. DELETE
    console.log('🗑️  [4/5] DELETE 테스트');
    console.log('-'.repeat(60));
    
    const deleteSQL = `DELETE FROM ${tableName} WHERE id = '${testId}' RETURNING id;`;
    const deleteRes = await executeSQL(deleteSQL, 'DELETE 실행');
    
    if (deleteRes?.result?.content?.[0]?.text) {
      const text = deleteRes.result.content[0].text;
      
      if (text.includes(testId)) {
        console.log('   ✅ DELETE 성공!');
        results.delete = true;
        
        // 삭제 확인
        const verifySQL = `SELECT COUNT(*) FROM ${tableName} WHERE id = '${testId}';`;
        const verifyRes = await executeSQL(verifySQL, '삭제 확인');
        
        if (verifyRes?.result?.content?.[0]?.text) {
          const vText = verifyRes.result.content[0].text;
          const count = vText.match(/count[\"']?\s*:\s*(\d+)/)?.[1];
          console.log(`   삭제 확인: count = ${count || '0'}`);
        }
        console.log('');
      }
    }

    await new Promise(r => setTimeout(r, 1000));

    // 5. CLEANUP - 테스트 테이블 삭제
    console.log('🧹 [5/5] 테스트 테이블 삭제');
    console.log('-'.repeat(60));
    
    const cleanupSQL = `DROP TABLE IF EXISTS ${tableName};`;
    const cleanupRes = await executeSQL(cleanupSQL, '테이블 삭제');
    
    if (cleanupRes?.result || !cleanupRes?.error) {
      console.log('   ✅ 정리 완료!\n');
      results.cleanup = true;
    }

    // 결과 요약
    console.log('='.repeat(60));
    console.log('📊 MCP CRUD 테스트 결과');
    console.log('='.repeat(60));
    console.log(`SETUP  (준비): ${results.setup ? '✅ 통과' : '❌ 실패'}`);
    console.log(`CREATE (생성): ${results.create ? '✅ 통과' : '❌ 실패'}`);
    console.log(`READ   (조회): ${results.read ? '✅ 통과' : '❌ 실패'}`);
    console.log(`UPDATE (수정): ${results.update ? '✅ 통과' : '❌ 실패'}`);
    console.log(`DELETE (삭제): ${results.delete ? '✅ 통과' : '❌ 실패'}`);
    console.log(`CLEANUP(정리): ${results.cleanup ? '✅ 통과' : '❌ 실패'}`);
    console.log('='.repeat(60));

    const crudPasses = [results.create, results.read, results.update, results.delete].filter(r => r).length;
    console.log(`\nCRUD 결과: ${crudPasses}/4 테스트 통과`);
    
    if (crudPasses === 4) {
      console.log('\n🎉 MCP를 통한 모든 CRUD 작업이 성공적으로 작동합니다!');
    } else {
      console.log('\n⚠️  일부 CRUD 작업에 문제가 있습니다.');
    }
    
    console.log('\n✨ MCP의 execute_sql 도구로 테스트를 완료했습니다.');
    console.log('📚 참고: https://supabase.com/docs\n');

    mcpProcess.kill();
    process.exit(crudPasses === 4 ? 0 : 1);

  } catch (error) {
    console.error('\n💥 오류 발생:', error.message);
    if (mcpProcess) mcpProcess.kill();
    process.exit(1);
  }
}

runTests();

