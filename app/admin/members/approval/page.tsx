"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/database.types";
import {
  IconUser,
  IconUserCheck,
  IconUserStar,
  IconUsers,
  IconSearch,
  IconShieldCheck,
  IconCrown,
} from "@tabler/icons-react";

type Profile = Database['public']['Tables']['profiles']['Row'];

// 회원 등급 정의
const MEMBER_GRADES = [
  { id: "admin", label: "관리자", icon: IconShieldCheck, color: "bg-red-500" },
  { id: "expert", label: "전문가회원", icon: IconCrown, color: "bg-purple-500" },
  { id: "grade1", label: "1급회원", icon: IconUserStar, color: "bg-blue-500" },
  { id: "grade2", label: "2급회원", icon: IconUserCheck, color: "bg-green-500" },
  { id: "regular", label: "정회원", icon: IconUser, color: "bg-yellow-500" },
  { id: "associate", label: "준회원", icon: IconUser, color: "bg-orange-500" },
];

// 검색 필터 옵션
const SEARCH_OPTIONS = [
  { value: "name", label: "이름" },
  { value: "phone", label: "번호뒷자리" },
  { value: "email", label: "이메일" },
];

export default function MemberApprovalPage() {
  const supabase = createClient();
  const [searchType, setSearchType] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [members, setMembers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  // Supabase에서 대기 중인 회원 데이터 가져오기
  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('회원 데이터를 가져오는데 실패했습니다:', error);
      } else {
        setMembers(data || []);
      }
      setLoading(false);
    };

    fetchMembers();
  }, []);

  // 회원 정보 업데이트
  const updateMember = async (memberId: string, field: string, value: any) => {
    // Supabase 업데이트
    const { error } = await supabase
      .from('profiles')
      .update({ [field]: value })
      .eq('id', memberId);

    if (error) {
      console.error('회원 정보 업데이트에 실패했습니다:', error);
      alert('회원 정보 업데이트에 실패했습니다.');
      return;
    }

    // 로컬 state 업데이트
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === memberId ? { ...member, [field]: value } : member
      )
    );

    // 승인으로 변경된 경우 목록에서 제거
    if (field === 'status' && value === 'approved') {
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== memberId)
      );
    }
  };

  // 필터링된 회원 목록
  const filteredMembers = members.filter((member) => {
    // 검색 필터
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      switch (searchType) {
        case "name":
          return member.name.toLowerCase().includes(query);
        case "phone":
          return member.phone?.slice(-4).includes(query) || false;
        case "email":
          return member.email?.toLowerCase().includes(query) || false;
        default:
          return true;
      }
    }

    return true;
  });

  if (loading) {
    return (
      <div className="flex h-full w-full flex-1 items-center justify-center p-4 md:p-10">
        <p className="text-neutral-700 dark:text-neutral-300">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-6 p-4 md:p-10">
      {/* 헤더 */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
          회원 승인
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          승인 대기 중인 회원을 관리합니다.
        </p>
      </div>

      {/* 상단 통계 */}
      <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-4 dark:bg-yellow-900/20 dark:border-yellow-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500">
            <IconUsers className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              승인 대기 중
            </p>
            <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
              {members.length}명
            </p>
          </div>
        </div>
      </div>

      {/* 검색창 */}
      <div className="flex gap-2 items-center">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="px-3 py-2 rounded-lg border border-neutral-300 bg-white dark:bg-neutral-800 dark:border-neutral-600 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
        >
          {SEARCH_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="relative flex-1">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`${SEARCH_OPTIONS.find((o) => o.value === searchType)?.label}으로 검색...`}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-300 bg-white dark:bg-neutral-800 dark:border-neutral-600 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
          />
        </div>
      </div>

      {/* 회원 리스트 테이블 */}
      <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-700">
        <table className="w-full">
          <thead className="bg-neutral-50 dark:bg-neutral-800">
            <tr>
              <th className="px-4 py-3 text-left align-middle text-xs font-semibold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider">
                이메일
              </th>
              <th className="px-4 py-3 text-left align-middle text-xs font-semibold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider">
                이름
              </th>
              <th className="px-4 py-3 text-left align-middle text-xs font-semibold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider">
                번호
              </th>
              <th className="px-4 py-3 text-center align-middle text-xs font-semibold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider">
                학술지
              </th>
              <th className="px-4 py-3 text-center align-middle text-xs font-semibold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider">
                회원권한
              </th>
              <th className="px-4 py-3 text-center align-middle text-xs font-semibold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider">
                상태
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-700">
            {filteredMembers.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-sm text-neutral-500 dark:text-neutral-400"
                >
                  {searchQuery ? "검색 결과가 없습니다." : "승인 대기 중인 회원이 없습니다."}
                </td>
              </tr>
            ) : (
              filteredMembers.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                >
                  <td className="px-4 py-3 text-left align-middle text-sm text-neutral-900 dark:text-neutral-100">
                    {member.email || '-'}
                  </td>
                  <td className="px-4 py-3 text-left align-middle text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {member.name}
                  </td>
                  <td className="px-4 py-3 text-left align-middle text-sm text-neutral-700 dark:text-neutral-300">
                    {member.phone || '-'}
                  </td>
                  <td className="px-4 py-3 text-center align-middle">
                    <select
                      value={member.journal ? "allowed" : "none"}
                      onChange={(e) =>
                        updateMember(member.id, "journal", e.target.value === "allowed")
                      }
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-offset-1 cursor-pointer",
                        member.journal
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 focus:ring-green-500"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 focus:ring-gray-500"
                      )}
                    >
                      <option value="allowed">허용</option>
                      <option value="none">없음</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-center align-middle">
                    <select
                      value={member.grade}
                      onChange={(e) => updateMember(member.id, "grade", e.target.value)}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium text-white border-0 focus:ring-2 focus:ring-offset-1 cursor-pointer",
                        MEMBER_GRADES.find((g) => g.id === member.grade)?.color
                      )}
                    >
                      {MEMBER_GRADES.map((grade) => (
                        <option key={grade.id} value={grade.id}>
                          {grade.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-center align-middle">
                    <select
                      value={member.status}
                      onChange={(e) => updateMember(member.id, "status", e.target.value)}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-offset-1 cursor-pointer",
                        member.status === "approved"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 focus:ring-blue-500"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 focus:ring-yellow-500"
                      )}
                    >
                      <option value="approved">승인</option>
                      <option value="pending">대기</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 하단 통계 */}
      <div className="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400">
        <div>
          전체 <span className="font-bold text-neutral-900 dark:text-neutral-100">{members.length}</span>명 중{" "}
          <span className="font-bold text-neutral-900 dark:text-neutral-100">{filteredMembers.length}</span>명 표시
        </div>
      </div>
    </div>
  );
}

