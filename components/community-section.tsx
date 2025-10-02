"use client";
import React from "react";
import { motion } from "framer-motion";
import { NoticeBoard } from "./notice-board";
import { QnaBoard } from "./qna-board";
import { LogoClouds } from "./logo-clouds";

export function CommunitySection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 섹션 제목 */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2
            className="text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-600 bg-opacity-50 mb-4"
            style={{ fontFamily: 'GMarketSans, sans-serif', fontWeight: 500 }}
          >
            소통과 나눔의 공간
          </h2>
          <p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
          >
            학회의 최신 소식을 확인하고, 궁금한 점을 자유롭게 질문하세요
          </p>
        </motion.div>

        {/* 2-Column 게시판 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 공지사항 게시판 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <NoticeBoard />
          </motion.div>

          {/* Q&A 게시판 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <QnaBoard />
          </motion.div>
        </div>

        {/* Logo Clouds */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <LogoClouds />
        </motion.div>

      </div>
    </section>
  );
}