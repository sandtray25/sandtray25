#!/usr/bin/env node

/**
 * Supabase Migration 적용 스크립트
 * 
 * 사용법: node scripts/apply-migration.mjs [migration_file_name]
 * 예: node scripts/apply-migration.mjs 20241009000001_create_team_table.sql
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { readFile, readdir } from 'fs/promises';
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
  console.error('\n💡 .env.local 파일에 다음을 추가하세요:');
  console.error('   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url');
  console.error('   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key');
  console.error('\n📍 Supabase Dashboard > Settings > API에서 키를 확인할 수 있습니다.');
  process.exit(1);
}

// Service Role Key로 Supabase 클라이언트 생성
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function applyMigration(migrationFile) {
  console.log('🚀 Migration 적용 시작...\n');

  try {
    const migrationsDir = join(projectRoot, 'supabase', 'migrations');
    const migrationPath = join(migrationsDir, migrationFile);

    // Migration 파일 읽기
    const migrationSql = await readFile(migrationPath, 'utf-8');

    console.log('📄 Migration 파일 읽기 완료');
    console.log(`   파일: ${migrationFile}`);
    console.log(`   크기: ${migrationSql.length} bytes\n`);

    // SQL을 세미콜론으로 분리하여 여러 쿼리로 실행
    console.log('⚙️  Migration 적용 중...\n');
    
    const statements = migrationSql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (!statement) continue;

      console.log(`   [${i + 1}/${statements.length}] 실행 중...`);
      
      const { error } = await supabase.rpc('exec_sql', {
        sql_query: statement
      });

      if (error) {
        console.error(`   ❌ 오류 발생:`, error.message);
        throw error;
      }
    }

    console.log('\n✅ Migration 적용 완료!\n');

    // team 테이블 확인
    console.log('🔍 생성된 데이터 확인 중...');
    const { data: teams, error: teamError } = await supabase
      .from('team')
      .select('*');

    if (teamError) {
      console.log('   ⚠️  team 테이블 확인 중 오류:', teamError.message);
    } else {
      console.log('   ✅ team 테이블이 정상적으로 생성되었습니다.');
      console.log(`   📊 총 ${teams.length}개의 레코드:`);
      teams.forEach(team => {
        console.log(`      - ${team.name}: all=${team.all}, fee=${team.fee}`);
      });
    }

  } catch (error) {
    console.error('\n❌ Migration 적용 중 오류 발생:', error.message);
    console.log('\n📋 수동으로 Migration을 적용하세요:');
    console.log('   1. Supabase Dashboard (https://supabase.com/dashboard) 접속');
    console.log('   2. 프로젝트 선택 → SQL Editor');
    console.log('   3. supabase/migrations/' + migrationFile + ' 파일 내용을 복사하여 실행');
    process.exit(1);
  }
}

// 실행
const migrationFile = process.argv[2] || '20241009000001_create_team_table.sql';
applyMigration(migrationFile);

