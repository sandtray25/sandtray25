#!/usr/bin/env node

/**
 * 테스트 사용자 생성 스크립트
 * Supabase에 테스트 사용자를 생성합니다.
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { resolve } from 'path'

// .env.local 파일 로드
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Supabase 환경 변수가 설정되지 않았습니다.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createTestUser() {
  const testEmail = 'test@example.com'
  const testPassword = 'test1234'

  console.log('🔄 테스트 사용자 생성 중...')
  console.log(`📧 이메일: ${testEmail}`)
  console.log(`🔑 비밀번호: ${testPassword}`)

  try {
    // 기존 사용자 확인
    const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers()
    
    if (listError) {
      console.error('❌ 사용자 목록 조회 실패:', listError.message)
      process.exit(1)
    }

    const existingUser = existingUsers.users.find(user => user.email === testEmail)
    
    if (existingUser) {
      console.log('ℹ️  해당 이메일의 사용자가 이미 존재합니다.')
      console.log('✅ 기존 사용자 정보:')
      console.log(`   ID: ${existingUser.id}`)
      console.log(`   이메일: ${existingUser.email}`)
      console.log(`   생성일: ${existingUser.created_at}`)
      return
    }

    // 새 사용자 생성
    const { data, error } = await supabase.auth.admin.createUser({
      email: testEmail,
      password: testPassword,
      email_confirm: true, // 이메일 확인 자동 처리
    })

    if (error) {
      console.error('❌ 사용자 생성 실패:', error.message)
      process.exit(1)
    }

    console.log('✅ 테스트 사용자가 생성되었습니다!')
    console.log(`   ID: ${data.user.id}`)
    console.log(`   이메일: ${data.user.email}`)
    console.log()
    console.log('🎉 이제 다음 정보로 로그인할 수 있습니다:')
    console.log(`   이메일: ${testEmail}`)
    console.log(`   비밀번호: ${testPassword}`)
    console.log()
    console.log('🌐 http://localhost:3000/login 에서 테스트하세요!')

  } catch (err) {
    console.error('❌ 예상치 못한 오류:', err)
    process.exit(1)
  }
}

// 기존 사용자 목록 조회
async function listUsers() {
  console.log('\n📋 등록된 사용자 목록:')
  console.log('─'.repeat(60))
  
  try {
    const { data, error } = await supabase.auth.admin.listUsers()
    
    if (error) {
      console.error('❌ 사용자 목록 조회 실패:', error.message)
      return
    }

    if (data.users.length === 0) {
      console.log('등록된 사용자가 없습니다.')
    } else {
      data.users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.email}`)
        console.log(`   ID: ${user.id}`)
        console.log(`   생성일: ${new Date(user.created_at).toLocaleString('ko-KR')}`)
        console.log(`   마지막 로그인: ${user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString('ko-KR') : '없음'}`)
        console.log()
      })
    }
  } catch (err) {
    console.error('❌ 예상치 못한 오류:', err)
  }
}

// 실행
async function main() {
  console.log('🚀 Supabase 테스트 사용자 생성 스크립트')
  console.log('═'.repeat(60))
  
  await listUsers()
  await createTestUser()
  
  console.log()
  console.log('✨ 완료!')
}

main()

