"use client";
import React from "react";
import { motion } from "framer-motion";
import { BackgroundGradient } from "./ui/background-gradient";
import { IconAppWindow, IconHeart, IconUsers, IconBook, IconRobot, IconMapPin, IconFolder } from "@tabler/icons-react";
import { Button } from "@/components/button";

export function BackgroundGradientDemo() {
  const cards = [
    {
      icon: <img src="/images/c1.png" alt="교육" className="w-20 h-20 opacity-80" />,
      title: "교육 신청하기",
      description: "개인 맞춤형 모래상자치료 교육 프로그램",
      button: "신청하기",
      buttonColor: "bg-slate-600 hover:bg-slate-700"
    },
    {
      icon: <img src="/images/c2.png" alt="상담사" className="w-20 h-20 opacity-80" />,
      title: "상담사 찾아보기",
      description: "지역별 전문 상담사 검색 및 연결",
      button: "지역별 검색",
      buttonColor: "bg-slate-600 hover:bg-slate-700"
    },
    {
      icon: <img src="/images/ja.png" alt="자료실" className="w-20 h-20" />,
      title: "자료실 둘러보기",
      description: "전문가 엄선 교육 및 상담 자료 제공",
      button: "자료 둘러보기",
      buttonColor: "bg-slate-600 hover:bg-slate-700"
    }
  ];

  return (
    <section className="px-4 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <BackgroundGradient className="rounded-[22px] max-w-sm p-6 bg-white/50 backdrop-blur-md border border-white/60 shadow-lg h-70 flex flex-col hover:bg-white transition-all duration-300">
                <motion.div
                  className="flex justify-center mb-4"
                  style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.20))' }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                >
                  {card.icon}
                </motion.div>
                <motion.h3
                  className="text-xl font-bold text-gray-800 mb-3 text-center"
                  style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                  viewport={{ once: true }}
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  className="text-sm text-gray-700 mb-4 text-center leading-relaxed flex-grow"
                  style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                  viewport={{ once: true }}
                >
                  {card.description}
                </motion.p>
                <motion.div
                  className="mt-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.6 }}
                  viewport={{ once: true }}
                >
                  <Button
                    variant="primary"
                    className={`w-full ${card.buttonColor} text-white text-sm font-bold hover:shadow-lg`}
                    style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
                  >
                    {card.button}
                  </Button>
                </motion.div>
              </BackgroundGradient>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
