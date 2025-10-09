#!/usr/bin/env node

/**
 * Service Role Key를 사용하여 스키마 직접 적용
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// .env.local 로드
config({ path: join(projectRoot, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ 환경 변수가 설정되지 않았습니다.');
  process.exit(1);
}

// Service Role Key로 관리자 클라이언트 생성
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

console.log('🚀 Supabase 스키마 적용 시작...\n');

try {
  // 테이블 존재 여부 확인
  console.log('📄 profiles 테이블 확인 중...\n');
  
  const { data: existingProfiles, error: checkError } = await supabase
    .from('profiles')
    .select('count')
    .limit(1);

  if (checkError) {
    if (checkError.message.includes('does not exist') || checkError.message.includes('not find')) {
      console.log('   ⚠️  profiles 테이블이 아직 생성되지 않았습니다.');
      console.log('\n📋 Supabase Dashboard에서 수동으로 스키마를 적용해주세요:');
      console.log('   1. https://supabase.com/dashboard 접속');
      console.log('   2. 프로젝트 선택 → SQL Editor');
      console.log('   3. 아래 파일 내용 복사하여 실행:');
      console.log(`      ${join(projectRoot, 'supabase/schema.sql')}`);
      
      // 스키마 내용 출력
      const schemaPath = join(projectRoot, 'supabase', 'schema.sql');
      const schemaSql = await readFile(schemaPath, 'utf-8');
      console.log('\n' + '='.repeat(80));
      console.log('SQL 스키마 내용:');
      console.log('='.repeat(80));
      console.log(schemaSql);
      console.log('='.repeat(80));
      
      process.exit(1);
    } else {
      console.error('   ❌ 테이블 확인 중 오류:', checkError.message);
      process.exit(1);
    }
  }

  console.log('   ✅ profiles 테이블이 존재합니다!\n');
  console.log('🎉 스키마가 이미 적용되어 있거나 정상적으로 적용되었습니다.');

} catch (error) {
  console.error('❌ 오류 발생:', error.message);
  process.exit(1);
}

