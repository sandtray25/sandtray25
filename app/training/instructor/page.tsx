"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Footer } from "@/components/footer";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { FileUpload } from "@/components/ui/file-upload";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/button";

export default function InstructorRegisterPage() {
  const [accept, setAccept] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as any;

    const v = (name: string) => (form[name]?.value || "").trim();
    const isNum = (s: string) => /^\d+$/.test(s);

    if (!accept) {
      alert("개인정보 처리방침에 동의하셔야 등록이 가능합니다.");
      return;
    }

    if (!v("names") || v("names").includes(" ")) {
      alert("이름이 공백이 있거나 비어있을 수 없습니다.");
      form["names"].focus();
      return;
    }

    if (!v("bdays1") || !isNum(v("bdays1")) || !v("bdays2") || !isNum(v("bdays2")) || !v("bdays3") || !isNum(v("bdays3"))) {
      alert("생년월일을 정확히 입력해 주세요.");
      form["bdays1"].focus();
      return;
    }

    if (!v("handnos1") || !isNum(v("handnos1")) || !v("handnos2") || !isNum(v("handnos2")) || !v("handnos3") || !isNum(v("handnos3"))) {
      alert("핸드폰번호를 정확히 입력해 주세요.");
      form["handnos1"].focus();
      return;
    }

    if (!v("emails")) {
      alert("전자메일을 입력해 주세요.");
      form["emails"].focus();
      return;
    }

    if (!v("postnos")) {
      alert("우편번호를 입력해 주세요.");
      form["postnos"].focus();
      return;
    }

    if (!v("addrs")) {
      alert("주소를 입력해 주세요.");
      form["addrs"].focus();
      return;
    }

    if (files.length === 0) {
      alert("첨부파일(연수신청서양식)을 등록해 주세요.");
      return;
    }

    alert("제출 준비가 완료되었습니다. 제출 기능은 추후 연동 예정입니다.");
  };

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
      {/* 헤더 */}
      <section className="relative pt-42 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-600 mb-4"
            style={{ fontFamily: 'GMarketSans, sans-serif', fontWeight: 500 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            강사등록
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            강사신청서 작성하기
          </motion.p>
        </div>
      </section>

      {/* 본문 */}
      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <BackgroundGradient className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="names">이름</Label>
                  <Input id="names" name="names" placeholder="홍길동" />
                </div>
                <div>
                  <Label>생년월일</Label>
                  <div className="flex items-center gap-2">
                    <Input id="bdays1" name="bdays1" placeholder="YYYY" className="w-24" />
                    <span>년</span>
                    <Input id="bdays2" name="bdays2" placeholder="MM" className="w-16" />
                    <span>월</span>
                    <Input id="bdays3" name="bdays3" placeholder="DD" className="w-16" />
                    <span>일</span>
                  </div>
                </div>
                <div>
                  <Label>핸드폰</Label>
                  <div className="flex items-center gap-2">
                    <Input id="handnos1" name="handnos1" className="w-16" />
                    <span>-</span>
                    <Input id="handnos2" name="handnos2" className="w-20" />
                    <span>-</span>
                    <Input id="handnos3" name="handnos3" className="w-20" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="comnames">직장명</Label>
                  <Input id="comnames" name="comnames" placeholder="소속 기관/회사" />
                </div>
                <div>
                  <Label htmlFor="emails">전자메일</Label>
                  <Input id="emails" name="emails" type="email" placeholder="email@example.com" />
                </div>
                <div>
                  <Label htmlFor="postnos">우편번호</Label>
                  <Input id="postnos" name="postnos" placeholder="12345-678" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="addrs">주소</Label>
                  <Input id="addrs" name="addrs" placeholder="도로명 주소" />
                </div>
                <div className="md:col-span-2">
                  <FileUpload
                    label="첨부파일 (연수신청서양식)"
                    description="PDF, DOC(X), HWP, HWPX 등 파일당 20MB 이하"
                    multiple={false}
                    maxFiles={1}
                    maxSizeMB={20}
                    accept=".pdf,.doc,.docx,.hwp,.hwpx"
                    value={files}
                    onChange={setFiles}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input id="chk_accept" name="chk_accept" type="checkbox" checked={accept} onChange={(e) => setAccept(e.target.checked)} />
                <Label htmlFor="chk_accept">개인정보 처리방침에 동의합니다.</Label>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <Button variant="primary" className="px-6 py-2 text-white bg-slate-700 hover:bg-slate-800">강사신청합니다</Button>
                <Button variant="secondary" type="button" className="px-6 py-2" onClick={() => history.back()}>취소</Button>
              </div>
            </form>
          </BackgroundGradient>
        </div>
      </section>

      <Footer />
    </main>
  );
}
