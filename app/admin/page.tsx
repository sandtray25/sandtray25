"use client";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import type { Database } from "@/lib/supabase/database.types";

type Profile = Database['public']['Tables']['profiles']['Row'];

export default function AdminPage() {
  return <Dashboard />;
}

const Dashboard = () => {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalMembers: 0,
    pendingMembers: 0,
    thisMonthMembers: 0,
  });
  const [recentMembers, setRecentMembers] = useState<Profile[]>([]);
  const [pendingMembersList, setPendingMembersList] = useState<Profile[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // 전체 회원 데이터 가져오기
      const { data: allMembers, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('데이터를 가져오는데 실패했습니다:', error);
        setLoading(false);
        return;
      }

      // 통계 계산
      const now = new Date();
      const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

      const totalMembers = allMembers?.length || 0;
      const pendingMembers = allMembers?.filter(m => m.status === 'pending').length || 0;
      const thisMonthMembers = allMembers?.filter(m => {
        const createdAt = new Date(m.created_at);
        return createdAt >= thisMonthStart;
      }).length || 0;

      setStats({
        totalMembers,
        pendingMembers,
        thisMonthMembers,
      });

      // 최근 5명의 회원
      setRecentMembers(allMembers?.slice(0, 5) || []);
      
      // 대기 중인 회원 목록 (최대 5명)
      setPendingMembersList(allMembers?.filter(m => m.status === 'pending').slice(0, 5) || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full w-full flex-1 items-center justify-center p-4 md:p-10">
        <p className="text-neutral-700 dark:text-neutral-300">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-4 p-4 md:p-10">
      <div>
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
          관리자페이지
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          한국모래상자치료학회 관리자 시스템
        </p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "전체 회원", value: stats.totalMembers.toLocaleString(), color: "bg-blue-500" },
          { label: "대기 중인 신청", value: stats.pendingMembers.toLocaleString(), color: "bg-yellow-500" },
          { label: "이번 달 가입", value: stats.thisMonthMembers.toLocaleString(), color: "bg-green-500" },
          { label: "학술지 허용", value: recentMembers.filter(m => m.journal).length.toLocaleString(), color: "bg-purple-500" },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="rounded-lg bg-neutral-50 p-6 dark:bg-neutral-800"
          >
            <div className={cn("mb-2 h-2 w-12 rounded", stat.color)} />
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {stat.label}
            </p>
            <p className="mt-1 text-3xl font-bold text-neutral-800 dark:text-neutral-100">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* 최근 활동 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-lg bg-neutral-50 p-6 dark:bg-neutral-800">
          <h2 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-100">
            최근 회원 가입
          </h2>
          <div className="space-y-3">
            {recentMembers.length === 0 ? (
              <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center py-4">
                최근 가입한 회원이 없습니다.
              </p>
            ) : (
              recentMembers.map((member) => {
                const createdAt = new Date(member.created_at);
                const now = new Date();
                const diffHours = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60));
                const diffDays = Math.floor(diffHours / 24);
                const timeAgo = diffDays > 0 ? `${diffDays}일 전` : diffHours > 0 ? `${diffHours}시간 전` : '방금 전';

                return (
                  <div
                    key={member.id}
                    className="flex items-center justify-between rounded-md bg-white p-3 dark:bg-neutral-700"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-800 dark:text-neutral-100">
                          {member.name}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          {member.email || '이메일 없음'}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {timeAgo}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="rounded-lg bg-neutral-50 p-6 dark:bg-neutral-800">
          <h2 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-100">
            승인 대기 중인 회원
          </h2>
          <div className="space-y-3">
            {pendingMembersList.length === 0 ? (
              <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center py-4">
                승인 대기 중인 회원이 없습니다.
              </p>
            ) : (
              pendingMembersList.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between rounded-md bg-white p-3 dark:bg-neutral-700"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                      {member.name}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                      {member.email || '이메일 없음'}
                    </p>
                  </div>
                  <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                    대기
                  </span>
                </div>
              ))
            )}
          </div>
          {pendingMembersList.length > 0 && (
            <div className="mt-4">
              <a 
                href="/admin/members/approval"
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                전체 보기 →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

