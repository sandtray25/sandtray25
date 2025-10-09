import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './database.types'

/**
 * 클라이언트 컴포넌트용 Supabase 클라이언트
 * 브라우저에서 실행되며, 사용자 세션을 자동으로 관리합니다.
 */
export const createClient = () => {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
