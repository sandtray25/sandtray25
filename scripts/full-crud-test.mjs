#!/usr/bin/env node

/**
 * 완전한 Supabase CRUD 테스트
 * - 스키마 확인
 * - CREATE (생성)
 * - READ (조회)  
 * - UPDATE (수정)
 * - DELETE (삭제)
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ 환경 변수가 설정되지 않았습니다.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('🧪 Supabase 전체 CRUD 테스트 시작...\n');
console.log('='.repeat(60));

const timestamp = Date.now();
const testEmail = `test.user.${timestamp}@testdomain.com`;
const testPassword = 'TestPassword123!';
const testName = 'CRUD 테스트 사용자';

let testUserId = null;
let testSession = null;

// 테스트 결과 저장
const results = {
  schemaCheck: false,
  create: false,
  read: false,
  update: false,
  delete: false
};

/**
 * 0. 스키마 확인
 */
async function checkSchema() {
  console.log('\n🔍 [0/5] 스키마 확인');
  console.log('   → profiles 테이블 존재 확인...');
  
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);

    if (error) {
      console.error('   ❌ 스키마 확인 실패:', error.message);
      console.log('\n📋 스키마를 먼저 적용해주세요:');
      console.log('   1. https://supabase.com/dashboard 접속');
      console.log('   2. SQL Editor에서 supabase/schema.sql 실행');
      return false;
    }

    console.log('   ✅ profiles 테이블이 존재합니다!');
    return true;
  } catch (error) {
    console.error('   ❌ 오류:', error.message);
    return false;
  }
}

/**
 * 1. CREATE 테스트
 */
async function testCreate() {
  console.log('\n📝 [1/5] CREATE 테스트');
  console.log('   → 새 사용자 생성 시도...');
  
  try {
    const { data, error } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        data: {
          name: testName
        }
      }
    });

    if (error) {
      console.error('   ❌ CREATE 실패:', error.message);
      return false;
    }

    if (data.user && data.session) {
      testUserId = data.user.id;
      testSession = data.session;
      console.log('   ✅ CREATE 성공');
      console.log('   - User ID:', testUserId);
      console.log('   - Email:', data.user.email);
      console.log('   - Session:', data.session ? '생성됨' : '없음');
      return true;
    }

    console.error('   ❌ CREATE 실패: 사용자 데이터가 없습니다.');
    return false;
  } catch (error) {
    console.error('   ❌ CREATE 오류:', error.message);
    return false;
  }
}

/**
 * 2. READ 테스트
 */
async function testRead() {
  console.log('\n📖 [2/5] READ 테스트');
  console.log('   → 프로필 데이터 조회 시도...');

  try {
    // 세션이 있으면 사용, 없으면 로그인
    if (!testSession) {
      const { data: sessionData, error: signInError } = await supabase.auth.signInWithPassword({
        email: testEmail,
        password: testPassword,
      });

      if (signInError) {
        console.error('   ❌ 로그인 실패:', signInError.message);
        return false;
      }
      
      testSession = sessionData.session;
    }

    // 프로필 조회
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', testUserId)
      .single();

    if (error) {
      console.error('   ❌ READ 실패:', error.message);
      return false;
    }

    if (data) {
      console.log('   ✅ READ 성공');
      console.log('   - ID:', data.id);
      console.log('   - Name:', data.name);
      console.log('   - Phone:', data.phone || '(없음)');
      console.log('   - Created:', new Date(data.created_at).toLocaleString('ko-KR'));
      return true;
    }

    console.error('   ❌ READ 실패: 프로필 데이터가 없습니다.');
    return false;
  } catch (error) {
    console.error('   ❌ READ 오류:', error.message);
    return false;
  }
}

/**
 * 3. UPDATE 테스트
 */
async function testUpdate() {
  console.log('\n✏️  [3/5] UPDATE 테스트');
  console.log('   → 프로필 데이터 수정 시도...');

  const updatedPhone = '010-1234-5678';
  const updatedAddress = {
    zonecode: '12345',
    road_address: '서울시 강남구 테헤란로 123',
    jibun_address: '서울시 강남구 역삼동 123-45',
    detail_address: '테스트빌딩 101호'
  };

  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        phone: updatedPhone,
        ...updatedAddress
      })
      .eq('id', testUserId)
      .select()
      .single();

    if (error) {
      console.error('   ❌ UPDATE 실패:', error.message);
      return false;
    }

    if (data) {
      console.log('   ✅ UPDATE 성공');
      console.log('   - Phone:', data.phone);
      console.log('   - Road Address:', data.road_address);
      console.log('   - Detail:', data.detail_address);
      return true;
    }

    console.error('   ❌ UPDATE 실패: 응답 데이터가 없습니다.');
    return false;
  } catch (error) {
    console.error('   ❌ UPDATE 오류:', error.message);
    return false;
  }
}

/**
 * 4. DELETE 테스트 - 프로필 삭제
 */
async function testDelete() {
  console.log('\n🗑️  [4/5] DELETE 테스트');
  console.log('   → 프로필 삭제 시도...');

  try {
    const { error: deleteError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', testUserId);

    if (deleteError) {
      console.error('   ❌ DELETE 실패:', deleteError.message);
      return false;
    }

    // 삭제 확인
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', testUserId)
      .maybeSingle();

    if (error) {
      console.error('   ❌ DELETE 확인 실패:', error.message);
      return false;
    }

    if (data === null) {
      console.log('   ✅ DELETE 성공');
      console.log('   - 프로필이 정상적으로 삭제되었습니다.');
      return true;
    }

    console.error('   ❌ DELETE 실패: 프로필이 여전히 존재합니다.');
    return false;
  } catch (error) {
    console.error('   ❌ DELETE 오류:', error.message);
    return false;
  }
}

/**
 * 5. 정리 - Auth 사용자 삭제
 */
async function cleanup() {
  console.log('\n🧹 [5/5] 정리');
  console.log('   → 테스트 사용자 정리 중...');

  try {
    // Auth 사용자는 관리자 권한이 필요하므로 수동 정리 필요
    console.log('   ℹ️  Auth 사용자는 Supabase Dashboard에서 수동으로 삭제해야 합니다.');
    console.log('   - Email:', testEmail);
    console.log('   - User ID:', testUserId);
    return true;
  } catch (error) {
    console.error('   ❌ 정리 오류:', error.message);
    return false;
  }
}

/**
 * 결과 요약
 */
function printSummary() {
  console.log('\n' + '='.repeat(60));
  console.log('📊 테스트 결과 요약');
  console.log('='.repeat(60));
  console.log(`스키마 확인: ${results.schemaCheck ? '✅ 통과' : '❌ 실패'}`);
  console.log(`CREATE   생성: ${results.create ? '✅ 통과' : '❌ 실패'}`);
  console.log(`READ     조회: ${results.read ? '✅ 통과' : '❌ 실패'}`);
  console.log(`UPDATE   수정: ${results.update ? '✅ 통과' : '❌ 실패'}`);
  console.log(`DELETE   삭제: ${results.delete ? '✅ 통과' : '❌ 실패'}`);
  console.log('='.repeat(60));

  const passCount = Object.values(results).filter(r => r).length;
  const totalCount = Object.keys(results).length;
  
  console.log(`\n결과: ${passCount}/${totalCount} 테스트 통과`);
  
  if (passCount === totalCount) {
    console.log('\n🎉 모든 CRUD 작업이 정상적으로 작동합니다!');
  } else {
    console.log('\n⚠️  일부 CRUD 작업에 문제가 있습니다.');
  }
}

/**
 * 메인 실행
 */
async function runTests() {
  // 0. 스키마 확인
  results.schemaCheck = await checkSchema();
  if (!results.schemaCheck) {
    printSummary();
    process.exit(1);
  }

  // 1. CREATE
  results.create = await testCreate();
  if (!results.create) {
    printSummary();
    process.exit(1);
  }

  // 2. READ
  results.read = await testRead();

  // 3. UPDATE
  results.update = await testUpdate();

  // 4. DELETE
  results.delete = await testDelete();

  // 5. 정리
  await cleanup();

  // 로그아웃
  await supabase.auth.signOut();

  // 결과 출력
  printSummary();
}

// 테스트 실행
runTests().catch(error => {
  console.error('\n💥 예상치 못한 오류 발생:', error);
  process.exit(1);
});


