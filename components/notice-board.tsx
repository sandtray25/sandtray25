"use client";
import React from "react";
import Link from "next/link";
import { CalendarDays, ChevronRight } from "lucide-react";

interface NoticeItem {
  id: number;
  title: string;
  date: string;
  isImportant?: boolean;
}

export function NoticeBoard() {
  // 샘플 공지사항 데이터
  const notices: NoticeItem[] = [
    {
      id: 1,
      title: "2024년 모래상자치료 전문가 과정 1기 모집 안내",
      date: "2024-01-15",
      isImportant: true
    },
    {
      id: 2,
      title: "학회 정기총회 및 학술대회 개최 안내",
      date: "2024-01-10",
      isImportant: true
    },
    {
      id: 3,
      title: "모래상자치료 워크샵 참가자 모집",
      date: "2024-01-08"
    },
    {
      id: 4,
      title: "자격증 갱신 교육 일정 안내",
      date: "2024-01-05"
    },
    {
      id: 5,
      title: "신년 인사 및 2024년 사업계획 발표",
      date: "2024-01-01"
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}.${date.getDate()}`;
  };

  return (
    <div className="bg-white/40 hover:bg-white backdrop-blur-md border border-white/50 shadow-lg hover:shadow-xl rounded-xl transition-all duration-300 h-80 group">
      {/* 헤더 */}
      <div className="px-4 pt-4 pb-3 border-b border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50/80 rounded-lg backdrop-blur-sm">
              <CalendarDays className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
              공지사항
            </h3>
          </div>
          <Link
            href="/notice"
            className="flex items-center gap-1 text-sm text-black hover:text-gray-800 transition-colors"
            style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
          >
            더보기
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 공지사항 목록 */}
      <div className="px-4 pt-3 pb-2">
        <ul className="space-y-2">
          {notices.slice(0, 4).map((notice) => (
            <li key={notice.id} className="individual-item">
              <Link
                href={`/notice/${notice.id}`}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 hover:shadow-md transition-all duration-200 h-12"
              >
                <div className="flex-1 min-w-0">
                  <p
                    className="text-base font-medium text-gray-800 group-hover:text-gray-600 hover:text-gray-700 transition-colors line-clamp-1"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    {notice.title}
                  </p>
                </div>
                <div className="flex-shrink-0 ml-3">
                  <p className="text-xs text-gray-600" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                    {formatDate(notice.date)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}