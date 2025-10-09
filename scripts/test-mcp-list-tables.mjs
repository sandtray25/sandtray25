#!/usr/bin/env node

/**
 * MCP 서버의 list_tables 도구 테스트
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

console.log('📋 Supabase MCP - 테이블 목록 조회 테스트\n');
console.log('='.repeat(60));

// MCP 서버 실행
const mcpServer = spawn('npx', [
  '-y',
  '@supabase/mcp-server-supabase@latest',
  '--read-only',
  `--project-ref=${process.env.SUPABASE_PROJECT_REF}`
], {
  env: {
    ...process.env,
    SUPABASE_ACCESS_TOKEN: process.env.SUPABASE_ACCESS_TOKEN
  },
  stdio: ['pipe', 'pipe', 'pipe']
});

let responseBuffer = '';

mcpServer.stdout.on('data', (data) => {
  responseBuffer += data.toString();
});

mcpServer.stderr.on('data', (data) => {
  console.log('⚠️  서버 메시지:', data.toString());
});

// 1. Initialize
const initRequest = {
  jsonrpc: '2.0',
  id: 1,
  method: 'initialize',
  params: {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: {
      name: 'mcp-test',
      version: '1.0.0'
    }
  }
};

console.log('📤 1단계: MCP 초기화...');
mcpServer.stdin.write(JSON.stringify(initRequest) + '\n');

// 2. List tables
setTimeout(() => {
  console.log('✅ 초기화 완료\n');
  
  const listTablesRequest = {
    jsonrpc: '2.0',
    id: 2,
    method: 'tools/call',
    params: {
      name: 'list_tables',
      arguments: {
        schemas: ['public']
      }
    }
  };
  
  console.log('📤 2단계: 테이블 목록 요청...');
  console.log('   스키마: public\n');
  mcpServer.stdin.write(JSON.stringify(listTablesRequest) + '\n');
}, 1000);

// 결과 출력
setTimeout(() => {
  console.log('📊 결과:');
  console.log('='.repeat(60));
  
  const responses = responseBuffer.split('\n').filter(line => line.trim());
  
  responses.forEach((response, index) => {
    try {
      const parsed = JSON.parse(response);
      
      if (parsed.result?.content) {
        console.log('\n✅ 테이블 목록 조회 성공!\n');
        
        parsed.result.content.forEach(item => {
          if (item.type === 'text') {
            try {
              const tables = JSON.parse(item.text);
              
              if (Array.isArray(tables)) {
                console.log(`📋 총 ${tables.length}개의 테이블 발견:\n`);
                
                tables.forEach((table, idx) => {
                  console.log(`${idx + 1}. ${table.schema}.${table.name}`);
                  if (table.comment) {
                    console.log(`   설명: ${table.comment}`);
                  }
                  if (table.columns) {
                    console.log(`   컬럼: ${table.columns.length}개`);
                  }
                });
              } else {
                console.log(JSON.stringify(tables, null, 2));
              }
            } catch (e) {
              console.log(item.text);
            }
          }
        });
      } else if (parsed.error) {
        console.log('\n❌ 오류 발생:');
        console.log(JSON.stringify(parsed.error, null, 2));
      } else if (index > 0) {
        console.log(`\n응답 ${index + 1}:`);
        console.log(JSON.stringify(parsed, null, 2));
      }
    } catch (error) {
      if (response) {
        console.log('파싱 오류:', response);
      }
    }
  });
  
  mcpServer.kill();
  console.log('\n✨ 테스트 완료!\n');
}, 3000);

