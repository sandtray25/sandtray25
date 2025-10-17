#!/usr/bin/env node

/**
 * 관리자 사용자 생성 스크립트
 * Supabase에 관리자 사용자를 생성합니다.
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

async function createAdminUser() {
  const adminEmail = 'admin@sandtray.or.kr'
  const adminPassword = 'admin1234'

  console.log('🔄 관리자 사용자 생성 중...')
  console.log(`📧 이메일: ${adminEmail}`)
  console.log(`🔑 비밀번호: ${adminPassword}`)

  try {
    // 기존 사용자 확인
    const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers()
    
    if (listError) {
      console.error('❌ 사용자 목록 조회 실패:', listError.message)
      process.exit(1)
    }

    const existingUser = existingUsers.users.find(user => user.email === adminEmail)
    
    if (existingUser) {
      console.log('ℹ️  해당 이메일의 관리자가 이미 존재합니다.')
      console.log('✅ 기존 관리자 정보:')
      console.log(`   ID: ${existingUser.id}`)
      console.log(`   이메일: ${existingUser.email}`)
      console.log(`   생성일: ${existingUser.created_at}`)
      return
    }

    // 새 관리자 생성
    const { data, error } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true, // 이메일 확인 자동 처리
    })

    if (error) {
      console.error('❌ 관리자 생성 실패:', error.message)
      process.exit(1)
    }

    console.log('✅ 관리자 사용자가 생성되었습니다!')
    console.log(`   ID: ${data.user.id}`)
    console.log(`   이메일: ${data.user.email}`)
    console.log()
    console.log('🎉 이제 다음 정보로 관리자 로그인할 수 있습니다:')
    console.log(`   이메일: ${adminEmail}`)
    console.log(`   비밀번호: ${adminPassword}`)
    console.log()
    console.log('🌐 http://localhost:3000/login 에서 로그인하면')
    console.log('   Footer의 "회원서비스" 섹션에 "관리페이지" 버튼이 표시됩니다!')

  } catch (err) {
    console.error('❌ 예상치 못한 오류:', err)
    process.exit(1)
  }
}

// 실행
async function main() {
  console.log('🚀 Supabase 관리자 생성 스크립트')
  console.log('═'.repeat(60))
  
  await createAdminUser()
  
  console.log()
  console.log('✨ 완료!')
}

main()

