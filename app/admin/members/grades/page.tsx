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
  { id: "all", label: "전체", icon: IconUsers, color: "bg-gray-500" },
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

export default function MemberGradesPage() {
  const supabase = createClient();
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [searchType, setSearchType] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [members, setMembers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  // Supabase에서 회원 데이터 가져오기
  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
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

  // 등급별 회원 수 계산
  const getGradeCount = (gradeId: string) => {
    if (gradeId === "all") return members.length;
    return members.filter((m) => m.grade === gradeId).length;
  };

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
  };

  // 필터링된 회원 목록
  const filteredMembers = members.filter((member) => {
    // 등급 필터
    if (selectedGrade !== "all" && member.grade !== selectedGrade) {
      return false;
    }

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

  // 등급 레이블 가져오기
  const getGradeLabel = (gradeId: string) => {
    return MEMBER_GRADES.find((g) => g.id === gradeId)?.label || gradeId;
  };

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
          회원 등급 관리
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          회원 등급별로 관리하고 검색할 수 있습니다.
        </p>
      </div>

      {/* 상단 필터 및 검색 */}
      <div className="flex flex-col gap-4">
        {/* 등급 필터 버튼 */}
        <div className="flex flex-wrap items-center gap-3">
          {MEMBER_GRADES.map((grade) => {
            const Icon = grade.icon;
            const count = getGradeCount(grade.id);
            const isSelected = selectedGrade === grade.id;

            return (
              <button
                key={grade.id}
                onClick={() => setSelectedGrade(grade.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all",
                  isSelected
                    ? "bg-neutral-800 text-white shadow-lg dark:bg-white dark:text-black"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full",
                    isSelected ? "bg-white/20" : grade.color
                  )}
                >
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm">{grade.label}</span>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-bold",
                    isSelected
                      ? "bg-white/20"
                      : "bg-neutral-200 dark:bg-neutral-700"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
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
                  검색 결과가 없습니다.
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
                      {MEMBER_GRADES.filter((g) => g.id !== "all").map((grade) => (
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

