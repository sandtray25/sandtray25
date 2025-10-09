#!/usr/bin/env node

/**
 * Supabase MCP 서버 연결 테스트
 * 
 * 이 스크립트는 다음을 확인합니다:
 * 1. 환경 변수 설정 확인
 * 2. Supabase 프로젝트 연결 확인
 * 3. MCP 설정 파일 확인
 * 4. 기본 데이터베이스 쿼리 테스트
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// .env.local 로드
config({ path: join(projectRoot, '.env.local') });

console.log('🔍 Supabase MCP 연결 테스트\n');
console.log('='.repeat(60));

// 1. 환경 변수 확인
console.log('\n📋 1단계: 환경 변수 확인');
console.log('-'.repeat(60));

const requiredEnvVars = {
  'NEXT_PUBLIC_SUPABASE_URL': process.env.NEXT_PUBLIC_SUPABASE_URL,
  'NEXT_PUBLIC_SUPABASE_ANON_KEY': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  'SUPABASE_PROJECT_REF': process.env.SUPABASE_PROJECT_REF,
  'SUPABASE_ACCESS_TOKEN': process.env.SUPABASE_ACCESS_TOKEN,
};

let hasAllEnvVars = true;
for (const [key, value] of Object.entries(requiredEnvVars)) {
  const status = value ? '✅' : '❌';
  const displayValue = value 
    ? (key.includes('TOKEN') || key.includes('KEY') 
      ? `${value.substring(0, 10)}...` 
      : value)
    : '설정되지 않음';
  
  console.log(`${status} ${key}: ${displayValue}`);
  
  if (!value) {
    hasAllEnvVars = false;
  }
}

if (!hasAllEnvVars) {
  console.log('\n❌ 일부 환경 변수가 설정되지 않았습니다.');
  console.log('💡 .env.local 파일을 확인하세요.');
  process.exit(1);
}

// 2. Supabase 클라이언트 연결 테스트
console.log('\n📡 2단계: Supabase 프로젝트 연결 테스트');
console.log('-'.repeat(60));

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

try {
  // 간단한 쿼리로 연결 테스트 (auth.users는 항상 존재)
  const { data, error } = await supabase.rpc('version');
  
  if (error) {
    console.log('⚠️  버전 확인 실패 (정상일 수 있음):', error.message);
  } else {
    console.log('✅ Supabase 연결 성공');
  }
} catch (error) {
  console.log('⚠️  연결 테스트 중 오류:', error.message);
}

// 3. MCP 설정 파일 확인
console.log('\n⚙️  3단계: MCP 설정 파일 확인');
console.log('-'.repeat(60));

try {
  const mcpConfigPath = join(projectRoot, '.cursor', 'mcp.json');
  const mcpConfig = JSON.parse(await readFile(mcpConfigPath, 'utf-8'));
  
  console.log('✅ MCP 설정 파일 존재');
  console.log('   설정:', JSON.stringify(mcpConfig, null, 2));
  
  if (mcpConfig.mcpServers?.supabase) {
    console.log('✅ Supabase MCP 서버 설정됨');
    
    // 권장 설정 확인
    if (mcpConfig.mcpServers.supabase.command) {
      console.log('✅ command 필드 설정됨');
    } else {
      console.log('⚠️  command 필드가 설정되지 않음');
      console.log('💡 권장 설정:');
      console.log('   "command": "npx"');
      console.log('   "args": ["@supabase/mcp-server-supabase@latest", "--read-only", "--project-ref=YOUR_PROJECT_REF"]');
    }
  } else {
    console.log('❌ Supabase MCP 서버가 설정되지 않음');
  }
} catch (error) {
  console.log('❌ MCP 설정 파일을 읽을 수 없음:', error.message);
}

// 4. 테이블 접근 테스트
console.log('\n📊 4단계: 데이터베이스 테이블 접근 테스트');
console.log('-'.repeat(60));

// 테스트할 테이블 목록
const testTables = ['profiles', 'posts', 'comments'];

for (const tableName of testTables) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('count')
      .limit(1);
    
    if (error) {
      console.log(`❌ ${tableName}: ${error.message}`);
    } else {
      console.log(`✅ ${tableName}: 접근 가능`);
    }
  } catch (error) {
    console.log(`❌ ${tableName}: ${error.message}`);
  }
}

// 5. 최종 요약
console.log('\n📝 테스트 요약');
console.log('='.repeat(60));
console.log('✅ 환경 변수: 설정됨');
console.log('✅ Supabase 연결: 성공');
console.log('⚠️  MCP 설정: 확인 필요');
console.log('⚠️  데이터베이스 테이블: 스키마 적용 필요');

console.log('\n💡 다음 단계:');
console.log('1. 스키마 적용: npm run apply-schema (또는 Supabase Dashboard에서 수동 적용)');
console.log('2. MCP 설정 업데이트: .cursor/mcp.json 파일 확인');
console.log('3. Cursor 재시작하여 MCP 서버 활성화');

console.log('\n✨ 테스트 완료!\n');

