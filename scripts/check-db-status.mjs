#!/usr/bin/env node

/**
 * 데이터베이스 상태 확인 스크립트
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// .env.local 파일 로드
config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ 환경 변수가 설정되지 않았습니다.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('🔍 데이터베이스 상태 확인 중...\n');

// profiles 테이블 확인
const { data, error } = await supabase
  .from('profiles')
  .select('count')
  .limit(1);

if (error) {
  console.log('❌ profiles 테이블이 존재하지 않거나 접근할 수 없습니다.');
  console.log('   오류:', error.message);
  console.log('\n💡 스키마를 먼저 적용해야 합니다.');
  console.log('   Supabase Dashboard > SQL Editor에서 supabase/schema.sql 파일 내용을 실행하세요.');
} else {
  console.log('✅ profiles 테이블이 존재합니다.');
  console.log(`   현재 레코드 수: ${data?.length || 0}`);
}

