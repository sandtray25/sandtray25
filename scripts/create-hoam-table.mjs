#!/usr/bin/env node

/**
 * hoam 테이블 생성 및 더미 데이터 추가
 * MCP execute_sql 사용
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

console.log('🚀 hoam 테이블 생성 및 데이터 추가\n');
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
    console.log('🔧 MCP 서버 시작 중...\n');
    
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

    mcpProcess.stderr.on('data', () => {});

    setTimeout(resolve, 2000);
  });
}

function initialize() {
  return new Promise((resolve) => {
    const request = {
      jsonrpc: '2.0',
      id: ++messageId,
      method: 'initialize',
      params: {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: { name: 'create-hoam', version: '1.0.0' }
      }
    };

    responses = [];
    mcpProcess.stdin.write(JSON.stringify(request) + '\n');
    setTimeout(resolve, 1500);
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

async function createHoamTable() {
  try {
    await startMCP();
    await initialize();

    console.log('✅ MCP 준비 완료\n');

    // 1. 테이블 생성
    console.log('📝 [1/3] hoam 테이블 생성');
    console.log('-'.repeat(60));
    
    const createTableSQL = `
      DROP TABLE IF EXISTS hoam;
      
      CREATE TABLE hoam (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        team TEXT NOT NULL,
        goal TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
      
      COMMENT ON TABLE hoam IS 'Hoam 팀 정보 테이블';
      COMMENT ON COLUMN hoam.name IS '이름';
      COMMENT ON COLUMN hoam.team IS '팀명';
      COMMENT ON COLUMN hoam.goal IS '목표';
    `.trim();
    
    const createRes = await executeSQL(createTableSQL, '테이블 생성 실행');
    
    if (createRes?.error) {
      console.log('   ❌ 테이블 생성 실패:', createRes.error);
      throw new Error('테이블 생성 실패');
    } else {
      console.log('   ✅ hoam 테이블 생성 완료!\n');
    }

    await new Promise(r => setTimeout(r, 1000));

    // 2. 더미 데이터 삽입
    console.log('📥 [2/3] 더미 데이터 삽입');
    console.log('-'.repeat(60));
    
    const insertDataSQL = `
      INSERT INTO hoam (name, team, goal) VALUES
        ('김철수', '개발팀', '풀스택 개발자 되기'),
        ('이영희', '디자인팀', 'UI/UX 전문가 되기'),
        ('박민수', '기획팀', '프로덕트 오너 되기');
    `.trim();
    
    const insertRes = await executeSQL(insertDataSQL, '데이터 삽입 실행');
    
    if (insertRes?.error) {
      console.log('   ❌ 데이터 삽입 실패:', insertRes.error);
      throw new Error('데이터 삽입 실패');
    } else {
      console.log('   ✅ 더미 데이터 3개 추가 완료!\n');
    }

    await new Promise(r => setTimeout(r, 1000));

    // 3. 데이터 확인
    console.log('🔍 [3/3] 생성된 데이터 확인');
    console.log('-'.repeat(60));
    
    const selectSQL = `SELECT id, name, team, goal, created_at FROM hoam ORDER BY id;`;
    const selectRes = await executeSQL(selectSQL, '데이터 조회');
    
    if (selectRes?.result?.content?.[0]?.text) {
      const text = selectRes.result.content[0].text;
      
      // JSON 데이터 추출
      const dataMatch = text.match(/<untrusted-data-[^>]+>([\s\S]*?)<\/untrusted-data-[^>]+>/);
      if (dataMatch) {
        const jsonData = dataMatch[1].trim();
        console.log('   ✅ 데이터 조회 성공!\n');
        console.log('📊 생성된 데이터:');
        console.log('-'.repeat(60));
        
        try {
          const data = JSON.parse(jsonData);
          data.forEach((row, idx) => {
            console.log(`\n${idx + 1}. ID: ${row.id}`);
            console.log(`   이름: ${row.name}`);
            console.log(`   팀: ${row.team}`);
            console.log(`   목표: ${row.goal}`);
            console.log(`   생성일: ${new Date(row.created_at).toLocaleString('ko-KR')}`);
          });
        } catch (e) {
          console.log(jsonData);
        }
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('✨ hoam 테이블 생성 및 데이터 추가 완료!');
    console.log('='.repeat(60));
    console.log('\n💡 테이블 정보:');
    console.log('   - 테이블명: hoam');
    console.log('   - 컬럼: id, name, team, goal, created_at');
    console.log('   - 데이터: 3개 행\n');

    mcpProcess.kill();
    process.exit(0);

  } catch (error) {
    console.error('\n💥 오류 발생:', error.message);
    if (mcpProcess) mcpProcess.kill();
    process.exit(1);
  }
}

createHoamTable();

