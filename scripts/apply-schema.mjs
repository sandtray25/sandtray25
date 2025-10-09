#!/usr/bin/env node

/**
 * Supabase 스키마 적용 스크립트
 * 
 * 주의: 이 스크립트는 SUPABASE_SERVICE_ROLE_KEY가 필요합니다.
 * .env.local 파일에 다음을 추가하세요:
 * SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// .env.local 파일 로드
config({ path: join(projectRoot, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ 필수 환경 변수가 설정되지 않았습니다.');
  console.error('   필요: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  console.error('\n💡 .env.local 파일에 SUPABASE_SERVICE_ROLE_KEY를 추가하세요.');
  console.error('   Supabase Dashboard > Settings > API > service_role key 복사');
  process.exit(1);
}

// Service Role Key로 Supabase 클라이언트 생성
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

console.log('🚀 Supabase 스키마 적용 시작...\n');

try {
  // schema.sql 파일 읽기
  const schemaPath = join(projectRoot, 'supabase', 'schema.sql');
  const schemaSql = await readFile(schemaPath, 'utf-8');

  console.log('📄 스키마 파일 읽기 완료');
  console.log(`   파일: ${schemaPath}`);
  console.log(`   크기: ${schemaSql.length} bytes\n`);

  // 스키마 적용
  console.log('⚙️  스키마 적용 중...');
  
  const { data, error } = await supabase.rpc('exec_sql', {
    sql_query: schemaSql
  });

  if (error) {
    // rpc 함수가 없는 경우, 직접 SQL 실행 시도
    console.log('   RPC 함수를 사용할 수 없습니다. 대체 방법을 시도합니다...\n');
    console.log('⚠️  현재 Supabase JS 클라이언트로는 직접 DDL을 실행할 수 없습니다.');
    console.log('\n📋 다음 방법으로 스키마를 적용하세요:');
    console.log('   1. Supabase Dashboard (https://supabase.com/dashboard) 접속');
    console.log('   2. 프로젝트 선택 → SQL Editor');
    console.log('   3. 아래 파일 내용을 복사하여 실행:');
    console.log(`      ${schemaPath}`);
    process.exit(1);
  }

  console.log('✅ 스키마 적용 완료!\n');

  // 테이블 확인
  console.log('🔍 생성된 테이블 확인 중...');
  const { data: tables, error: tableError } = await supabase
    .from('profiles')
    .select('count')
    .limit(0);

  if (tableError) {
    console.log('   ⚠️  profiles 테이블 확인 중 오류:', tableError.message);
  } else {
    console.log('   ✅ profiles 테이블이 정상적으로 생성되었습니다.');
  }

} catch (error) {
  console.error('❌ 스키마 적용 중 오류 발생:', error.message);
  console.log('\n📋 수동으로 스키마를 적용하세요:');
  console.log('   1. Supabase Dashboard (https://supabase.com/dashboard) 접속');
  console.log('   2. 프로젝트 선택 → SQL Editor');
  console.log('   3. supabase/schema.sql 파일 내용을 복사하여 실행');
  process.exit(1);
}
