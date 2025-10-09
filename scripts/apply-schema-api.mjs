#!/usr/bin/env node

/**
 * Supabase Management API를 사용하여 스키마 적용
 */

import { readFile } from 'fs/promises';
import { config } from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// .env.local 로드
config({ path: join(projectRoot, '.env.local') });

const projectRef = process.env.SUPABASE_PROJECT_REF;
const accessToken = process.env.SUPABASE_ACCESS_TOKEN;
const dbPassword = process.env.SUPABASE_DB_PASSWORD;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

if (!projectRef || !accessToken) {
  console.error('❌ 환경 변수가 설정되지 않았습니다.');
  console.error('   필요: SUPABASE_PROJECT_REF, SUPABASE_ACCESS_TOKEN');
  process.exit(1);
}

console.log('🚀 Supabase 스키마 적용 시작...\n');

try {
  // 스키마 파일 읽기
  const schemaPath = join(projectRoot, 'supabase', 'schema.sql');
  const schemaSql = await readFile(schemaPath, 'utf-8');

  console.log('📄 스키마 파일 읽기 완료');
  console.log(`   파일: ${schemaPath}`);
  console.log(`   크기: ${schemaSql.length} bytes\n`);

  // Supabase Management API 호출
  console.log('⚙️  Management API를 통해 스키마 적용 중...');
  
  const response = await fetch(
    `https://api.supabase.com/v1/projects/${projectRef}/database/query`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: schemaSql
      })
    }
  );

  const result = await response.json();

  if (!response.ok) {
    console.error('   ❌ API 호출 실패:', response.status, response.statusText);
    console.error('   응답:', JSON.stringify(result, null, 2));
    process.exit(1);
  }

  console.log('   ✅ 스키마 적용 완료!\n');
  console.log('   응답:', JSON.stringify(result, null, 2));

} catch (error) {
  console.error('❌ 오류 발생:', error.message);
  process.exit(1);
}

