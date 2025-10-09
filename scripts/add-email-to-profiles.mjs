#!/usr/bin/env node

/**
 * profiles 테이블에 email 컬럼 추가
 */

import { spawn } from 'child_process';
import { config } from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

config({ path: join(projectRoot, '.env.local') });

const PROJECT_REF = process.env.SUPABASE_PROJECT_REF;
const ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN?.trim();

console.log('📧 profiles 테이블에 email 컬럼 추가\n');
console.log('='.repeat(60));

if (!PROJECT_REF || !ACCESS_TOKEN) {
  console.error('❌ 환경 변수가 설정되지 않았습니다.');
  process.exit(1);
}

let mcpProcess;
let messageId = 0;
let responses = [];

function startMCP() {
  return new Promise((resolve) => {
    console.log('🔧 MCP 서버 시작 중...\n');
    
    mcpProcess = spawn('npx', [
      '-y',
      '@supabase/mcp-server-supabase@latest',
      `--project-ref=${PROJECT_REF}`,
      `--access-token=${ACCESS_TOKEN}`
    ], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    let buffer = '';
    mcpProcess.stdout.on('data', (data) => {
      buffer += data.toString();
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';
      
      lines.forEach(line => {
        if (line.trim()) {
          try {
            responses.push(JSON.parse(line));
          } catch (e) {}
        }
      });
    });

    mcpProcess.stderr.on('data', () => {});
    setTimeout(resolve, 2000);
  });
}

function initialize() {
  return new Promise((resolve) => {
    const request = {
      jsonrpc: '2.0',
      id: ++messageId,
      method: 'initialize',
      params: {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: { name: 'add-email-column', version: '1.0.0' }
      }
    };

    responses = [];
    mcpProcess.stdin.write(JSON.stringify(request) + '\n');
    setTimeout(resolve, 1500);
  });
}

function executeSQL(sql, description) {
  return new Promise((resolve) => {
    console.log(`📤 ${description}`);
    
    const request = {
      jsonrpc: '2.0',
      id: ++messageId,
      method: 'tools/call',
      params: {
        name: 'execute_sql',
        arguments: { query: sql }
      }
    };

    responses = [];
    mcpProcess.stdin.write(JSON.stringify(request) + '\n');
    
    setTimeout(() => {
      const response = responses[responses.length - 1];
      resolve(response);
    }, 2500);
  });
}

async function addEmailColumn() {
  try {
    await startMCP();
    await initialize();

    console.log('✅ MCP 준비 완료\n');

    // email 컬럼 추가
    console.log('📝 email 컬럼 추가 중...');
    console.log('-'.repeat(60));
    
    const addColumnSQL = `
      -- email 컬럼 추가
      ALTER TABLE public.profiles 
      ADD COLUMN IF NOT EXISTS email TEXT;

      -- email 컬럼에 인덱스 생성
      CREATE INDEX IF NOT EXISTS profiles_email_idx ON public.profiles(email);

      -- 주석 추가
      COMMENT ON COLUMN public.profiles.email IS '이메일 주소';
    `.trim();
    
    const res = await executeSQL(addColumnSQL, 'ALTER TABLE 실행');
    
    if (res?.error) {
      console.log('   ❌ 실패:', res.error);
      throw new Error('컬럼 추가 실패');
    } else {
      console.log('   ✅ email 컬럼 추가 완료!\n');
    }

    await new Promise(r => setTimeout(r, 1000));

    // 테이블 구조 확인
    console.log('🔍 테이블 구조 확인');
    console.log('-'.repeat(60));
    
    const checkSQL = `
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = 'profiles'
      ORDER BY ordinal_position;
    `.trim();
    
    const checkRes = await executeSQL(checkSQL, '컬럼 정보 조회');
    
    if (checkRes?.result?.content?.[0]?.text) {
      const text = checkRes.result.content[0].text;
      const jsonMatch = text.match(/\[\\?"?\{[^\]]+\]/);
      
      if (jsonMatch) {
        let jsonStr = jsonMatch[0]
          .replace(/\\"/g, '"')
          .replace(/\\n/g, '')
          .replace(/\\/g, '')
          .trim();
        
        try {
          const columns = JSON.parse(jsonStr);
          console.log('   ✅ profiles 테이블 컬럼 목록:\n');
          
          columns.forEach((col, idx) => {
            console.log(`   ${idx + 1}. ${col.column_name} (${col.data_type}) - ${col.is_nullable === 'YES' ? 'NULL 가능' : 'NOT NULL'}`);
          });
        } catch (e) {
          console.log('   컬럼 정보:', jsonStr.substring(0, 300));
        }
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('✨ email 컬럼 추가 완료!');
    console.log('='.repeat(60));
    console.log('\n💡 이제 회원가입 시 이메일이 저장됩니다.\n');

    mcpProcess.kill();
    process.exit(0);

  } catch (error) {
    console.error('\n💥 오류 발생:', error.message);
    if (mcpProcess) mcpProcess.kill();
    process.exit(1);
  }
}

addEmailColumn();

