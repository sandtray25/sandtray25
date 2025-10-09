#!/usr/bin/env node

/**
 * hoam 테이블 데이터 조회
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

let mcpProcess;
let messageId = 0;
let responses = [];

function startMCP() {
  return new Promise((resolve) => {
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
        clientInfo: { name: 'view-hoam', version: '1.0.0' }
      }
    };

    responses = [];
    mcpProcess.stdin.write(JSON.stringify(request) + '\n');
    setTimeout(resolve, 1500);
  });
}

function executeSQL(sql) {
  return new Promise((resolve) => {
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
    setTimeout(() => resolve(responses[responses.length - 1]), 2500);
  });
}

async function viewData() {
  try {
    console.log('🔍 hoam 테이블 데이터 조회\n');
    console.log('='.repeat(60));

    await startMCP();
    await initialize();

    const selectSQL = `SELECT id, name, team, goal, created_at FROM hoam ORDER BY id;`;
    const res = await executeSQL(selectSQL);
    
    if (res?.result?.content?.[0]?.text) {
      const text = res.result.content[0].text;
      
      // JSON 배열 직접 추출 (이스케이프된 따옴표 포함)
      const jsonMatch = text.match(/\[\\?"?\{[^\]]+\]/);
      
      if (jsonMatch) {
        // 이스케이프 문자 제거하고 깨끗하게 정리
        let jsonStr = jsonMatch[0]
          .replace(/\\"/g, '"')
          .replace(/\\n/g, '')
          .replace(/^"/, '')
          .replace(/"$/, '')
          .replace(/\\/g, '')
          .trim();
        
        try {
          const data = JSON.parse(jsonStr);
          
          if (Array.isArray(data) && data.length > 0) {
            console.log(`📊 총 ${data.length}개의 데이터\n`);
            
            data.forEach((row, idx) => {
              console.log(`${idx + 1}. 🆔 ID: ${row.id}`);
              console.log(`   👤 이름: ${row.name}`);
              console.log(`   👥 팀: ${row.team}`);
              console.log(`   🎯 목표: ${row.goal}`);
              console.log(`   📅 생성일: ${new Date(row.created_at).toLocaleString('ko-KR')}`);
              console.log('');
            });
            
            console.log('='.repeat(60));
            console.log('✨ 조회 완료!\n');
          } else {
            console.log('⚠️  데이터가 없습니다.\n');
          }
        } catch (e) {
          console.log('⚠️  파싱 오류:', e.message);
          console.log('📄 추출된 JSON:\n', jsonStr.substring(0, 500));
          console.log('');
        }
      } else {
        console.log('📄 전체 응답:\n');
        console.log(text.substring(0, 500));
        console.log('');
      }
    }

    mcpProcess.kill();
    process.exit(0);

  } catch (error) {
    console.error('💥 오류:', error.message);
    if (mcpProcess) mcpProcess.kill();
    process.exit(1);
  }
}

viewData();

