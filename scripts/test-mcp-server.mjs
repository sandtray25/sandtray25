#!/usr/bin/env node

/**
 * Supabase MCP 서버 직접 통신 테스트
 * 
 * MCP 서버와 직접 JSON-RPC 통신을 시도합니다.
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

console.log('🚀 Supabase MCP 서버 직접 테스트\n');
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

let responseData = '';
let errorData = '';

mcpServer.stdout.on('data', (data) => {
  responseData += data.toString();
  console.log('📡 서버 응답:', data.toString());
});

mcpServer.stderr.on('data', (data) => {
  errorData += data.toString();
  console.log('⚠️  서버 메시지:', data.toString());
});

mcpServer.on('error', (error) => {
  console.error('❌ MCP 서버 실행 오류:', error);
  process.exit(1);
});

// Initialize 요청 전송
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

console.log('\n📤 MCP 초기화 요청 전송...');
console.log(JSON.stringify(initRequest, null, 2));

mcpServer.stdin.write(JSON.stringify(initRequest) + '\n');

// 5초 후 종료
setTimeout(() => {
  console.log('\n⏱️  테스트 시간 종료');
  
  if (responseData) {
    console.log('\n✅ MCP 서버 응답 수신:');
    console.log(responseData);
  } else if (errorData) {
    console.log('\n⚠️  오류 메시지:');
    console.log(errorData);
  } else {
    console.log('\n❌ 응답 없음');
  }
  
  mcpServer.kill();
  process.exit(0);
}, 5000);

