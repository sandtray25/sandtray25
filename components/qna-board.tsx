"use client";
import React from "react";
import Link from "next/link";
import { MessageCircleQuestion, ChevronRight, MessageSquare } from "lucide-react";

interface QnaItem {
  id: number;
  title: string;
  date: string;
  answerCount: number;
  isAnswered: boolean;
  author: string;
}

export function QnaBoard() {
  // 샘플 Q&A 데이터
  const qnaItems: QnaItem[] = [
    {
      id: 1,
      title: "모래상자치료 자격증 취득 조건이 궁금합니다.",
      date: "2024-01-14",
      answerCount: 2,
      isAnswered: true,
      author: "김**"
    },
    {
      id: 2,
      title: "초급 과정과 중급 과정의 차이점은 무엇인가요?",
      date: "2024-01-12",
      answerCount: 1,
      isAnswered: true,
      author: "이**"
    },
    {
      id: 3,
      title: "온라인 강의도 진행하시나요?",
      date: "2024-01-10",
      answerCount: 0,
      isAnswered: false,
      author: "박**"
    },
    {
      id: 4,
      title: "모래상자치료 교육비용은 얼마인가요?",
      date: "2024-01-08",
      answerCount: 3,
      isAnswered: true,
      author: "최**"
    },
    {
      id: 5,
      title: "실습 과정에서 개인 준비물이 있나요?",
      date: "2024-01-06",
      answerCount: 1,
      isAnswered: true,
      author: "정**"
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
            <div className="p-2 bg-green-50/80 rounded-lg backdrop-blur-sm">
              <MessageCircleQuestion className="w-4 h-4 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
              Q&A
            </h3>
          </div>
          <Link
            href="/qna"
            className="flex items-center gap-1 text-sm text-black hover:text-gray-800 transition-colors"
            style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
          >
            더보기
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Q&A 목록 */}
      <div className="px-4 pt-3 pb-2">
        <ul className="space-y-2">
          {qnaItems.slice(0, 4).map((item) => (
            <li key={item.id} className="individual-item">
              <Link
                href={`/qna/${item.id}`}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 hover:shadow-md transition-all duration-200 h-12"
              >
                <div className="flex-1 min-w-0">
                  <p
                    className="text-base font-medium text-gray-800 group-hover:text-gray-600 hover:text-gray-700 transition-colors line-clamp-1"
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    {item.title}
                  </p>
                </div>
                <div className="flex-shrink-0 ml-3">
                  <p className="text-xs text-gray-600" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                    {formatDate(item.date)}
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