"use client";
import React from "react";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight-new";

export function SpotlightPreview() {
  return (
    <motion.div
      id="about-section"
      className="h-[12rem] md:h-[20rem] w-full rounded-md flex md:items-center md:justify-center antialiased relative overflow-hidden mt-10 mb-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut"
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Spotlight />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pb-8">
        <motion.h1
          className="text-3xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-600 bg-opacity-50"
          style={{ fontFamily: 'GMarketSans, sans-serif', fontWeight: 500 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          치유와 성장의 여정을 <br /> 함께하세요
        </motion.h1>
        <motion.p
          className="mt-4 text-base md:text-xl text-center text-gray-600 max-w-2xl mx-auto pb-4"
          style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          마음의 치유와 성장을 위한<br className="md:hidden" /> 전문 치료학회입니다
        </motion.p>
      </div>
    </motion.div>
  );
}
