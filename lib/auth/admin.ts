/**
 * 관리자 권한 확인 유틸리티
 */

// 관리자 이메일 목록
const ADMIN_EMAILS = [
  'admin@sandtray.or.kr',
  'hoambaek@gmail.com',
];

/**
 * 이메일이 관리자 권한을 가지고 있는지 확인
 * @param email 사용자 이메일
 * @returns 관리자 여부
 */
export function isAdminEmail(email: string | undefined): boolean {
  if (!email) return false;
  
  const normalizedEmail = email.toLowerCase().trim();
  
  // 정확한 이메일 매치
  if (ADMIN_EMAILS.includes(normalizedEmail)) {
    return true;
  }
  
  // 이메일이 admin으로 시작하는 경우도 관리자로 인정
  const emailPrefix = normalizedEmail.split('@')[0];
  if (emailPrefix === 'admin') {
    return true;
  }
  
  return false;
}

/**
 * 관리자 이메일 목록 가져오기
 * @returns 관리자 이메일 배열
 */
export function getAdminEmails(): string[] {
  return [...ADMIN_EMAILS];
}

