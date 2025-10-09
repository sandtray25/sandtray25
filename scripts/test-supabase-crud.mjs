#!/usr/bin/env node

/**
 * Supabase CRUD 테스트 스크립트
 * - Create (생성)
 * - Read (조회)
 * - Update (수정)
 * - Delete (삭제)
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// .env.local 파일 로드
config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ 환경 변수가 설정되지 않았습니다.');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl);
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '설정됨' : '없음');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('🧪 Supabase CRUD 테스트 시작...\n');

// 테스트용 임시 사용자 데이터
const timestamp = Date.now();
const testEmail = `test.user.${timestamp}@testdomain.com`;
const testPassword = 'TestPassword123!';
const testName = 'CRUD 테스트 사용자';

let testUserId = null;

/**
 * 1. CREATE 테스트 - 사용자 생성
 */
async function testCreate() {
  console.log('📝 [1/4] CREATE 테스트');
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

    if (data.user) {
      testUserId = data.user.id;
      console.log('   ✅ CREATE 성공');
      console.log('   - User ID:', testUserId);
      console.log('   - Email:', data.user.email);
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
 * 2. READ 테스트 - 데이터 조회
 */
async function testRead() {
  console.log('\n📖 [2/4] READ 테스트');
  console.log('   → 프로필 데이터 조회 시도...');

  try {
    // 로그인 먼저 수행
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: testEmail,
      password: testPassword,
    });

    if (signInError) {
      console.error('   ❌ 로그인 실패:', signInError.message);
      return false;
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
 * 3. UPDATE 테스트 - 데이터 수정
 */
async function testUpdate() {
  console.log('\n✏️  [3/4] UPDATE 테스트');
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
 * 4. DELETE 테스트 - 데이터 삭제
 */
async function testDelete() {
  console.log('\n🗑️  [4/4] DELETE 테스트');
  console.log('   → 테스트 사용자 삭제 시도...');

  try {
    // Supabase Auth는 클라이언트에서 직접 사용자 삭제가 제한됩니다.
    // 대신 프로필 삭제로 테스트 (CASCADE로 설정되어 있으면 자동 삭제됨)
    const { error: profileError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', testUserId);

    if (profileError) {
      console.error('   ❌ DELETE 실패:', profileError.message);
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
 * 테스트 실행
 */
async function runTests() {
  const results = {
    create: false,
    read: false,
    update: false,
    delete: false
  };

  // CREATE 테스트
  results.create = await testCreate();
  
  // CREATE 실패 시 나머지 테스트 중단
  if (!results.create) {
    console.log('\n❌ CREATE 테스트 실패로 인해 나머지 테스트를 중단합니다.');
    printSummary(results);
    return;
  }

  // READ 테스트
  results.read = await testRead();

  // UPDATE 테스트
  results.update = await testUpdate();

  // DELETE 테스트
  results.delete = await testDelete();

  // 로그아웃
  await supabase.auth.signOut();

  // 결과 요약
  printSummary(results);
}

/**
 * 테스트 결과 요약 출력
 */
function printSummary(results) {
  console.log('\n' + '='.repeat(50));
  console.log('📊 테스트 결과 요약');
  console.log('='.repeat(50));
  console.log(`CREATE (생성): ${results.create ? '✅ 통과' : '❌ 실패'}`);
  console.log(`READ   (조회): ${results.read ? '✅ 통과' : '❌ 실패'}`);
  console.log(`UPDATE (수정): ${results.update ? '✅ 통과' : '❌ 실패'}`);
  console.log(`DELETE (삭제): ${results.delete ? '✅ 통과' : '❌ 실패'}`);
  console.log('='.repeat(50));

  const passCount = Object.values(results).filter(r => r).length;
  const totalCount = Object.keys(results).length;
  
  console.log(`\n결과: ${passCount}/${totalCount} 테스트 통과`);
  
  if (passCount === totalCount) {
    console.log('🎉 모든 CRUD 작업이 정상적으로 작동합니다!');
  } else {
    console.log('⚠️  일부 CRUD 작업에 문제가 있습니다.');
  }
}

// 테스트 실행
runTests().catch(error => {
  console.error('\n💥 예상치 못한 오류 발생:', error);
  process.exit(1);
});

