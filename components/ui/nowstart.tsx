"use client";
import React from "react";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight-new";

export function NowStartPreview() {
  return (
    <motion.div
      className="h-[12rem] md:h-[20rem] w-full rounded-md flex md:items-center md:justify-center antialiased relative overflow-hidden mt-10 mb-1"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut"
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Spotlight />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full">
        <motion.h1
          className="text-4xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-600 bg-opacity-50"
          style={{ fontFamily: 'GMarketSans, sans-serif', fontWeight: 500 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
        지금 시작해보세요
        </motion.h1>
        <motion.p
          className="mt-4 text-lg md:text-xl text-center text-gray-600 max-w-2xl mx-auto"
          style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
        당신에게 맞는 교육과 상담을 손쉽게 찾아보실 수 있습니다
        </motion.p>
      </div>
    </motion.div>
  );
}
