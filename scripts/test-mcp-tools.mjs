#!/usr/bin/env node

/**
 * Supabase MCP 서버의 사용 가능한 도구 확인
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

console.log('🔧 Supabase MCP 도구 목록 확인\n');
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

// 1. Initialize 요청
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

console.log('📤 1단계: MCP 초기화 요청 전송...');
mcpServer.stdin.write(JSON.stringify(initRequest) + '\n');

// 초기화 응답 대기
setTimeout(() => {
  console.log('✅ 초기화 완료\n');
  
  // 2. 도구 목록 요청
  const toolsRequest = {
    jsonrpc: '2.0',
    id: 2,
    method: 'tools/list',
    params: {}
  };
  
  console.log('📤 2단계: 도구 목록 요청 전송...');
  mcpServer.stdin.write(JSON.stringify(toolsRequest) + '\n');
}, 1000);

// 응답 파싱 및 출력
setTimeout(() => {
  console.log('\n📊 수신된 응답:');
  console.log('='.repeat(60));
  
  const responses = responseBuffer.split('\n').filter(line => line.trim());
  
  responses.forEach((response, index) => {
    try {
      const parsed = JSON.parse(response);
      console.log(`\n응답 ${index + 1}:`);
      
      if (parsed.result?.tools) {
        console.log('\n🔧 사용 가능한 도구:');
        console.log('='.repeat(60));
        
        parsed.result.tools.forEach((tool, toolIndex) => {
          console.log(`\n${toolIndex + 1}. ${tool.name}`);
          console.log(`   설명: ${tool.description || '없음'}`);
          
          if (tool.inputSchema?.properties) {
            console.log('   입력 파라미터:');
            Object.entries(tool.inputSchema.properties).forEach(([key, value]) => {
              const required = tool.inputSchema.required?.includes(key) ? ' (필수)' : '';
              console.log(`   - ${key}${required}: ${value.description || value.type}`);
            });
          }
        });
      } else {
        console.log(JSON.stringify(parsed, null, 2));
      }
    } catch (error) {
      console.log('응답 파싱 오류:', response);
    }
  });
  
  mcpServer.kill();
  console.log('\n✨ 테스트 완료!\n');
}, 3000);

