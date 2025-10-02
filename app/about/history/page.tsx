"use client";
import React from "react";
import { motion } from "framer-motion";
import { Footer } from "@/components/footer";
import { Timeline } from "@/components/ui/timeline";

export default function HistoryPage() {
  const historyData = [
    {
      title: "2025",
      content: (
        <div className="space-y-2">
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
            <span className="text-gray-400 text-xs mt-1.5">●</span>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
              <strong className="font-semibold text-gray-800 dark:text-gray-200">하계 상담사 교육연수</strong> : 상징으로 보는 치유와 통합의 여정
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">[줌 온라인 강의 실시]</span>
            </p>
          </div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
            <span className="text-gray-400 text-xs mt-1.5">●</span>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
              <strong className="font-semibold text-gray-800 dark:text-gray-200">20주년 기념 학술대회</strong> : 모래상자치료 20년의 신화 "치유와 통합의 새로운 비전"
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">(예정)</span>
            </p>
          </div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
            <span className="text-gray-400 text-xs mt-1.5">●</span>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
              <strong className="font-semibold text-gray-800 dark:text-gray-200">한국모래상자치료학회 전문가 수퍼바이저 탄생</strong> : 김재옥, 이복순, 정경숙
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">(예정)</span>
            </p>
          </div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
            <span className="text-gray-400 text-xs mt-1.5">●</span>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
              <strong className="font-semibold text-gray-800 dark:text-gray-200">학회지 15권 발간</strong>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">(예정)</span>
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div className="space-y-2">
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>학회지 14권 발간</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>하계 상담사 교육연수 : 모래, 꿈, 사상과 문학을 통해서 본 분석심리학적 인간이해 [줌 온라인 강의 실시]</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>학술대회 : 모래상자치료와 정신건강의 패러다임</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>모래상자상담사 자격갱신 보수교육 규정 변경</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>25년 학회장 선출 : 김재옥 회장 추대</span></div>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div className="space-y-2">
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>학회지(KCI 등재후보지) 13권 발간</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>하계 상담사 교육연수 : 모래상자를 통한 자살예방 및 생명존중 [줌 온라인 강의 실시]</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>학술대회 : 모래상자치료에서 생명의 신비</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>한국모래상자치료학회 교육분석가 탄생 : 조미영</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>24년 학회장 선출 : 김재옥 부회장 추대</span></div>
        </div>
      ),
    },
    {
      title: "2022",
      content: (
        <div className="space-y-2">
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>학회지(KCI 등재후보지) 12권 발간</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>하계 상담사 교육연수 : 정신건강 [줌 온라인 강의 실시]</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>전문가 교육연수 : 민담 [줌 온라인 강의 실시]</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>학술대회 : 모래상자 속에 나타난 원형 [줌 온-오프라인 병행 실시]</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>한국모래상자치료학회 1급 수퍼바이저 탄생 : 박소현</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>23년 학회장 선출 : 정경숙 부회장 추대</span></div>
        </div>
      ),
    },
    {
      title: "2021",
      content: (
        <div className="space-y-2">
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>학회지 11권 발간</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>1급 수퍼바이저 자격과정 개설 및 실시</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>전문가 수퍼바이저 자격과정 개설 및 실시</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>하계 상담사 교육연수 : 사례연구들의 모래상자 이야기 [줌 온라인 강의 실시]</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>전문가 교육연수 : Jung 의 Tavistock Lectures [줌 온라인 강의 실시]</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>한국연구재단 등재후보지 선정</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>학술대회 : 연금술과 신성한 아이 [줌 온-오프라인 병행 실시]</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>한국모래상자치료학회 1급 수퍼바이저 탄생 : 우주영, 정영선, 정민, 조정진</span></div>
        </div>
      ),
    },
    {
      title: "2020",
      content: (
        <div className="space-y-2">
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>하계교육연수 - 모래상자치료와 상징(줌 온라인 강의 실시)</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>학술지 10권 발간</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>학술대회 - untact시대와 모래상자치료(줌 온라인 강의 실시)</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>2021년 학회장 선출 - 이복순 부회장 추대</span></div>
        </div>
      ),
    },
    {
      title: "2019",
      content: (
        <div className="space-y-2">
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>홈페이지 자동화 시스템을 구축하기 위한 개편 - 회비납부 및 수료증, 자격증 다운 기능 탑재</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>모래상자치료 전문가연수(화순 한천휴양림)</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>학술지 9권 발간</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>학술대회 - 융과 상징</span></div>
        </div>
      ),
    },
    {
      title: "2018",
      content: (
        <div className="space-y-2">
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>모래상자 상담사 자격 직업능력개발원에 민간자격 승인</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>모래상자치료 입문 저서 발간 - 김경희, 김수경, 김재옥, 송순, 오지아, 윤행란, 이미나, 이복순, 정경숙, 조미영, 주현주, 감수 이희자</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>민간자격취득을 교육연수 3차 실시 - 서울, 익산, 목포</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>학술지 8권 발간</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>학술대회 - 모래상자치료와 이야기</span></div>
        </div>
      ),
    },
    {
      title: "2017",
      content: (
        <div className="space-y-2">
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>모래상자치료전문가 도쿄 국제학술대회 발표- 이희자, 김경희, 송순, 오지아</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>학술지 7권 발간</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>학술대회 - 모래상자치료와 영웅신화</span></div>
        </div>
      ),
    },
    {
      title: "2016",
      content: (
        <div className="space-y-2">
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>한국모래상자치료학회 김경희 학회장 융학파 아동성인 정신분석가 자격취득</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>융분석가 기념 특강 - 모래상자치료와 연금술</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>모래상자치료전문가 도쿄 국제학술대회 발표 - 김경희, 송순, 조미영, 윤행란, 이리다</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>학술행사 - 모래상자치료에 나타난 상징</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>한국모래상자치료학회 교육분석가 탄생 - 이복순, 정경숙, 김재옥</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>2017년 학회장 선출 - 송순 교수 추대</span></div>
        </div>
      ),
    },
    {
      title: "2015",
      content: (
        <div className="space-y-2">
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>한국모래상자치료학회 김경희 학회장 국무총리표창</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>모래상자치료전문가 북경 국제 학술대회 발표 - 김경희, 송순, 조미영, 한재금, 박소현</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>김경희 학회장 우수논문상</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>10주년 기념 학술대회 - 모래상자치료의 나눔, 공감과 비젼</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>모래상자치료전문가 제주 워크샵 - 보수교육</span></div>
        </div>
      ),
    },
    {
      title: "2014",
      content: (
        <div className="space-y-2">
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>학술대회 - 모래상자치료의 연금술</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>모래상자치료연구 연 1회 발행</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>스위스 퀴스나흐트 융연구원 연수참가 - 김경희, 이복순, 김재옥, 조미영, 주현주</span></div>
        </div>
      ),
    },
    {
      title: "2013",
      content: (
        <div className="space-y-2">
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>학술대회 - 모래상자치료와 상징</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>공개사례발표 개최장소의 확대 - 서울지부, 광주지부, 목포지부</span></div>
        </div>
      ),
    },
    {
      title: "2012",
      content: (
        <div className="space-y-2">
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>모래상자상담사 자격갱신 보수교육 개최</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>모래상자상담사 및 전문가 자격취득 규정 변경</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>학술대회 개최 - 개성화의 신비</span></div>
        </div>
      ),
    },
    {
      title: "2011",
      content: (
        <div className="space-y-2">
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>모래상자상담사 강사 및 슈퍼바이져 수련과정 개설</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>한국아동권리학회 협회 학술대회 개최</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>목포대학교, 원광대학교, 전남 도립대학교 모래상자상담사 2급 배출</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>한국모래상자치료학회 서울지부, 광주지부, 목포지부 개설</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>모래상자치료전문가 국제 Case Conference - 슈퍼바이져 AJIMA TOMOKO, Prof</span></div>
          <div className="flex items-start gap-2.5 mb-3 ml-4 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">-</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>김경희, 송순, 이복순, 김재옥, 선애순, 조미영, 이미나</span></div>
        </div>
      ),
    },
    {
      title: "2010",
      content: (
        <div className="space-y-2">
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>스위스 취리히 융연구원 Intensive Week 참가 - 김경희, 홍기영, 안영임, 조미영</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>광주 전남 아동청소년 심리지원센터 모래상자치료 특강</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>광주 상담학회 모래상자치료 특강</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>모래상자치료연구 발간</span></div>
        </div>
      ),
    },
    {
      title: "2009",
      content: (
        <div className="space-y-2">
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>학술대회 - 모래상자치료에 나타난 ego와 Self</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>히로나카 교수 초청 사례 지도 및 연수</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>모래상자상담사 과정 제주 개최</span></div>
        </div>
      ),
    },
    {
      title: "2008",
      content: (
        <div className="space-y-2">
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>취리히 융연구원 심포지움 참가 - 김경희, 이선경, 홍은주, 채혜정, 오광열, 오정심</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>모래상자상담사 4단계 수련과정 실시</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>모래상자치료 학술대회 - 모래상자치료와 신화</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>니시무라스에이오 초청 전문가 연수 춘계, 추계 실시</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>일본모래놀이치료학회 참석 - 김경희, 정경숙, 이영희, 송지영, 오정심, 채혜정</span></div>
        </div>
      ),
    },
    {
      title: "2007",
      content: (
        <div className="space-y-2">
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>1월 ~ 3월 모래상자상담사 과정 워크샵</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>학회창립 3주년 기념 학술대회</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>모래상자치료 전문가 과정 개설 및 실시</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>2기회장 김경희 회장 추대</span></div>
        </div>
      ),
    },
    {
      title: "2006",
      content: (
        <div className="space-y-2">
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>1월 ~ 3월 모래상자상담사 과정 워크샵</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>4월 창립학술대회 및 자격증 수여</span></div>
          <div className="flex items-start gap-2.5 mb-3 ml-4 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">-</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>모래상자상담사(13인), 모래상자치료전문가(2인), 모래상자치료교육전문가(2인)</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>10월 모래상자치료 문화체험 전라남도 개최</span></div>
        </div>
      ),
    },
    {
      title: "2005",
      content: (
        <div className="space-y-2">
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>목포대학교 P.T.C동아리 한국자원봉사협의회 프로그램 교육실시</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>목포대학교 P.T.C동아리 한국대학사회봉사협의회 프로그램 교육실시</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>3월 국제모래상자 놀이치료학술대회 워크샵 개최</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>모래상자치료 피겨 개발 워크샵</span></div>
        </div>
      ),
    },
    {
      title: "2004",
      content: (
        <div className="space-y-2">
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>현재 목포지역 어린이집 부모교육 무료강좌</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>일본 동해모래놀이치료 연구회와 교류협약</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>명지대학교 모래상자치료 사례전시회 및 실연</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>명지대학교 모래상자치료 학술대회</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>한,일 모래놀이치료 사례 발표</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>목포대학교 P.T.C동아리 협동 여대생 자원봉사 프로그램 교육실시</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-blue-400 text-xs mt-1.5">●</span><span className="font-medium text-blue-600 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>한국모래상자치료학회 창립</span></div>
        </div>
      ),
    },
    {
      title: "2003",
      content: (
        <div className="space-y-2">
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>모래상자치료 연구회 모임, 명지대학교 이희자교수 회장추대</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>보호관찰소 청소년 집단상담 실시</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>3월부터~현재 성학대 피해 아동 상담중</span></div>
          <div className="flex items-start gap-2.5 mb-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"><span className="text-gray-400 text-xs mt-1.5">●</span><span className="text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>현재 아동권리캠페인 실시</span></div>
        </div>
      ),
    },
  ];

  return (
    <main
      className="min-h-screen"
      style={{
        background: `linear-gradient(135deg,
          #e2e8f0 0%,
          #f1f5f9 15%,
          #f8f9fa 30%,
          #fafafa 45%,
          #f8f9fa 60%,
          #f1f5f9 75%,
          #cbd5e1 90%,
          #94a3b8 100%)`
      }}
    >
      {/* 헤더 섹션 */}
      <section className="relative pt-42 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-600 mb-4"
            style={{ fontFamily: 'GMarketSans, sans-serif', fontWeight: 500 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            연혁
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            한국모래상자치료학회의 발전 과정과 주요 성과
          </motion.p>
        </div>
      </section>

      {/* Timeline 섹션 */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Timeline data={historyData} />
      </motion.section>

      {/* 푸터 */}
      <Footer />
    </main>
  );
}