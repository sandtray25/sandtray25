"use client";
import React from "react";
import { motion } from "framer-motion";
import { Footer } from "@/components/footer";

export default function PrivacyPage() {
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
            개인정보 처리방침
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'Noto Sans KR, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            한국모래상자치료학회의 개인정보 처리에 관한 안내
          </motion.p>
        </div>
      </section>

      {/* 본문 섹션 */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200/50 overflow-hidden"
          >
            {/* 카드 헤더 */}
            <div className="p-5 md:p-6 bg-gray-50/80 border-b border-gray-200/50">
              <h2 className="text-lg md:text-xl font-medium text-gray-800" style={{ fontFamily: 'GMarketSans, sans-serif' }}>
                개인정보 처리방침 전문
              </h2>
            </div>

            {/* 카드 본문 */}
            <div className="p-6 md:p-8 text-gray-800" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
              <div className="space-y-8 leading-7 text-[15px] md:text-base">
                <section>
                  <p>
                    한국모래상자치료학회가 취급하는 모든 개인정보는 관련법령에 근거하거나 정보주체의 동의에 의하여 수집·보유 및 처리되고 있습니다.
                    「개인정보보호법」은 이러한 개인정보의 취급에 대한 일반적 규범을 제시하고 있으며, 한국모래상자치료학회는 이러한 법령의 규정에 따라 수집·보유 및 처리하는 개인정보를 공공업무의 적절한 수행과 국민의 권익을 보호하기 위해 적법하고 적정하게 취급할 것입니다.
                  </p>
                  <p className="mt-3">
                    또한, 한국모래상자치료학회는 관련 법령에서 규정한 바에 따라 한국모래상자치료학회에서 보유하고 있는 개인정보에 대한 열람 및 정정청구 등 여러분의 권익을 존중하며, 여러분은 권익 침해에 대한 구제방법으로 개인정보 민원 및 침해 신고, 분쟁조정 등을 신청하실 수 있습니다.
                  </p>
                  <p className="mt-3">
                    한국모래상자치료학회 개인정보 처리방침은 소관업무를 수행하는데 필요한 개인정보 취급에 대한 「컴퓨터에 의해 처리되는 개인정보 처리방침」과 한국모래상자치료학회에서 운영하는 여러 홈페이지에서 이용자 여러분의 개인정보를 보호하기 위한 「홈페이지 이용자의 개인정보 처리방침」으로 구성되어 있습니다. 한국모래상자치료학회에서 운영하고 있는 웹사이트는 홈페이지에 별도의 설명이 없는 한 위의 「홈페이지 이용자의 개인정보 처리방침」이 적용됨을 알려드립니다.
                  </p>
                </section>

                <section>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'GMarketSans, sans-serif' }}>한국모래상자치료학회 홈페이지에서의 개인정보 보호</h3>
                  <p>
                    한국모래상자치료학회 홈페이지 이용을 감사드리며, 홈페이지에서의 개인정보 처리방침에 대하여 설명을 드리겠습니다. 이는 현행 「개인정보 보호법」에 근거를 두고 있습니다. 홈페이지 개인정보 등 중요자료(단순자료 제외) 게시 시 게시담당자를 지정하였으며 게시 전 보안심사위원회의 심사 등 심의절차를 거치도록 하고 있습니다. 이 방침은 별도의 설명이 없는 한 한국모래상자치료학회에서 운용하는 모든 웹 사이트에 적용됨을 알려드립니다.
                  </p>
                </section>

                <section>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'GMarketSans, sans-serif' }}>개인정보의 처리목적</h3>
                  <p>한국모래상자치료학회가 취급하는 모든 개인정보는 관련법령에 근거하거나 정보주체의 동의에 의하여 수집·보유 및 처리되고 있습니다.</p>
                </section>

                <section>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'GMarketSans, sans-serif' }}>개인정보의 처리 및 보유기간</h3>
                  <p>귀하의 개인정보는 다음과 같이 수집목적 및 이용목적이 완료되는 시점과 동시에 파기됨을 원칙으로 합니다.</p>
                  <p>• 이용자가 탈퇴의사를 밝혀 탈퇴 처리될 때</p>
                  <p>• 기타 이유에 의해 강제 탈퇴 처리될 때</p>
                </section>

                <section>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'GMarketSans, sans-serif' }}>개인정보의 제3자 제공에 관한 사항</h3>
                  <p>한국모래상자치료학회는 어떠한 경우에도 고지한 수집목적 및 이용목적의 범위를 초과하여 귀하의 개인정보를 이용하지 않습니다. 다음은 예외로 합니다.</p>
                  <p>• 관계법령에 의하여 수사상의 목적으로 관계기관으로부터의 요구가 있을 경우</p>
                  <p>• 통계작성을 위하여 특정 개인을 식별할 수 없는 형태로 제공하는 경우</p>
                  <p>• 기타 관계법령에서 정한 절차에 따른 요청이 있는 경우</p>
                  <p className="mt-2">한국모래상자치료학회는 본래의 수집목적 및 이용목적에 반하여 무분별하게 정보가 제공되지 않도록 최대한 노력하겠습니다.</p>
                </section>

                <section>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'GMarketSans, sans-serif' }}>개인정보처리의 위탁에 관한 사항</h3>
                  <p>한국모래상자치료학회에서 관리하는 개인정보의 처리를 다른 공공기관 또는 다른 전문기관에 위탁하는 경우, 아래 사항을 수탁기관이 준수하도록 하고 있습니다.</p>
                  <p>• 위탁업무 수행 목적 외 개인정보의 처리 금지에 관한 사항</p>
                  <p>• 개인정보의 기술적·관리적 보호조치에 관한 사항</p>
                  <p>• 위탁업무의 목적 및 범위</p>
                  <p>• 재위탁 제한에 관한 사항</p>
                  <p>• 개인정보에 대한 접근 제한 등 안전성 확보 조치에 관한 사항</p>
                  <p>• 개인정보의 관리현황 점검 등 감독에 관한 사항</p>
                  <p>• 수탁기관에서 준수하여야 할 의무</p>
                </section>

                <section>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'GMarketSans, sans-serif' }}>정보주체의 권리·의무 및 행사방법</h3>
                  <p>「개인정보 보호법」에 의거 본인정보에 한해 열람 및 정정·삭제를 청구할 수 있습니다. 정보주체 및 법정 대리인은 언제든지 등록되어 있는 자신 혹은 당해 만 14세 미만 아동의 개인정보를 조회하거나 수정, 가입해지 요청을 할 수 있습니다.</p>
                  <p>개인정보 조회, 수정 시에는 &apos;회원정보수정&apos;을 선택하며, 가입해지를 위해서는 &apos;회원탈퇴&apos;를 선택하여 본인 확인 절차를 거치신 후 직접 열람, 정정 또는 탈퇴가 가능합니다.</p>
                  <p>여러분이 홈페이지의 공개게시판에 게재한 사항은 다른 사람들이 조회 또는 열람할 수 있습니다. 홈페이지의 보완을 위하여 관리적·기술적 노력을 하고 있으나, 만약의 노출·침해사고 시 문제가 될 수 있는 개인정보 및 민감한 정보의 기재는 피하여 주시기 바랍니다.</p>
                  <p>이용자 개인정보와 관련한 아이디(ID)의 비밀번호에 대한 보안유지 책임은 해당 이용자 자신에게 있습니다. 타인에게 비밀번호가 유출되지 않도록 각별히 주의하시며, 주기적으로 비밀번호를 변경하시기 바랍니다.</p>
                  <p>한국모래상자치료학회가 운영하는 웹 사이트에서 이메일 주소 등 식별할 수 있는 개인정보를 취득하여서는 아니 되며 기타 부정한 방법으로 이러한 개인정보를 열람 또는 제공받은 자는 개인정보 보호법 59조(금지행위)에 의하여 처벌을 받을 수 있습니다.</p>
                </section>

                <section>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'GMarketSans, sans-serif' }}>처리하는 개인정보의 항목</h3>
                  <p className="font-medium">- 자동으로 수집ㆍ저장되는 개인정보</p>
                  <p>여러분이 한국모래상자치료학회 홈페이지를 이용할 경우 다음의 정보는 자동적으로 수집·저장됩니다. 한국모래상자치료학회는 회원가입 시 이용 약관에 동의하는 절차를 마련하고 있으며 회원이 동의를 하면 개인정보 수집에 대해 동의한 것으로 봅니다.</p>
                  <p>• 이용자 여러분의 인터넷 도메인명과 IP 및 한국모래상자치료학회 홈페이지를 방문할 때 거친 웹 사이트의 주소</p>
                  <p>• 이용자의 브라우저 종류 및 OS</p>
                  <p>• 방문 일시 등</p>
                  <p>위와 같이 자동 수집·저장되는 정보는 보다 나은 서비스를 제공하기 위해 홈페이지의 개선과 보완을 위한 통계 분석, 이용자와 웹 사이트 간의 원활한 의사소통 등을 위해 이용될 것입니다. 다만, 법령의 규정에 따라 이러한 정보를 제출하게 되어 있을 경우도 있다는 것을 유념하시기 바랍니다.</p>

                  <p className="mt-3">한국모래상자치료학회은 회원가입 시 이용 약관에 동의하는 절차를 마련하고 있으며 회원이 동의를 하면 개인정보 수집에 대해 동의한 것으로 봅니다. 성명, 아이디, 비밀번호는 서비스의 건전한 이용을 유도하고 이용자 보호를 위해 실명제를 채택하고 있기 때문에 필수적인 요소이나 개인정보에 대한 사항은 생략하거나 가능한 최소한으로 수집하도록 노력하고 있습니다.</p>
                  <p>아이디와 비밀번호는 회원제 서비스 이용에 따른 본인 식별 절차에 이용되며, 성명, 이메일주소는 회원이 비밀번호 분실 시 가입정보와 대조 확인하여 알려주는 용도로 사용됩니다.</p>
                  <p>수집 항목 예: 이메일주소, 전화번호, 핸드폰번호</p>
                </section>

                <section>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'GMarketSans, sans-serif' }}>이메일 및 웹 서식 등을 통한 수집정보</h3>
                  <p>이용자 여러분은 우편, 전화 또는 온라인 전자서식 등을 통한 전자적 방법을 통해 의사를 표시할 수 있습니다. 이러한 방법의 선택에 있어 몇 가지 유의사항을 알려드립니다.</p>
                  <p>• 여러분이 홈페이지에 기재한 사항은 다른 사람들이 조회 또는 열람할 수도 있습니다.</p>
                  <p>• 여러분이 기재한 사항은 관련 법규에 근거하여 필요한 다른 사람과 공유될 수 있으며, 관련법령의 시행과 정책개발의 자료로도 사용될 수 있습니다.</p>
                  <p>• 또한, 이러한 정보는 타 부처와 공유되거나, 필요에 의하여 제공될 수도 있습니다.</p>
                </section>

                <section>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'GMarketSans, sans-serif' }}>개인정보의 파기에 관한 사항</h3>
                  <p>개인정보 삭제 또는 개인정보파일 파기 사유가 발생한 경우 지체 없이 삭제 및 파기하고 있습니다. 다만, 다른 법률에 따라 보존하여야 하는 경우에는 그러하지 아니합니다.</p>
                </section>

                <section>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'GMarketSans, sans-serif' }}>개인정보 처리방침의 변경에 관한 사항</h3>
                  <p>개인정보 처리방침을 변경하는 경우에는 변경 및 시행의 시기, 변경된 내용을 공개하고 있습니다. 또한 홈페이지에 게시되어 있는 개인정보처리방침은 한국모래상자치료학회가 운영하는 모든 웹 사이트에 적용되며 다른 웹 페이지로 옮겨갈 경우 개인정보 처리방침은 그 사이트 운영기관이 게시한 방침이 적용됨으로 새로 방문한 사이트의 개인정보 처리방침을 확인하시기 바랍니다.</p>
                </section>

                <section>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'GMarketSans, sans-serif' }}>개인정보의 안전성 확보 조치</h3>
                  <p>홈페이지의 보안 또는 지속적인 서비스를 위해, 한국모래상자치료학회는 네트워크 트래픽의 통제(Monitor)는 물론 불법적으로 정보를 변경하는 등의 시도를 탐지하기 위해 여러 가지 프로그램을 운영하고 있습니다.</p>
                  <p>한국모래상자치료학회에서는 외부 웹으로는 주민등록번호를 수집 및 관리하지 않고 있으며, 회원의 개인정보에 대한 안전성 확보를 위하여 수집된 데이터의 전송 시 암호화하여 처리하고 있으며, 수집된 개인정보는 안전한 서버에 저장하고 있습니다.</p>
                  <p>회원 아이디(ID)의 비밀번호는 암호화되어 저장 및 관리되고 있어 본인만이 알고 있으며, 개인정보의 확인 및 변경도 비밀번호를 알고 있는 본인에 의해서만 가능합니다. 개인정보처리시스템이 보관되는 전산실 등에 감시 및 출입통제장치 설치, 비인가자 출입통제, 외부인 방문 시 출입관리대장 작성 등 물리적 접근 방지를 이행하고 있습니다.</p>
                  <p>또한, 이용자 여러분이 홈페이지에 게재한 내용 중 개인정보가 포함되어 있는 경우 개인정보를 삭제 조치 후 게시하여야 하며, 이용자의 부주의로 발생한 개인정보관련 사고에 대해서는 전적으로 이용자에게 책임이 있습니다.</p>
                </section>

                <section>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'GMarketSans, sans-serif' }}>개인정보정책 및 침해사항 관련 문의</h3>
                  <p>웹 사이트 이용 중 개인정보 정책에 대한 사항이나 개인정보의 유출 가능성 등 정보주체의 권익이 침해될 우려가 있는 사실을 발견하였을 경우는 다음의 연락처로 알려주시기 바랍니다.</p>
                  <p>• 한국모래상자치료학회 개인정보보호책임자 : 송순</p>
                  <p>• 한국모래상자치료학회 홈페이지 개인정보보호담당자 : 송순</p>
                  <p>• 이 메 일 : sandtray1@naver.com</p>
                  <p>• 전화번호 : 070-7646-8356 (010-7239-8039)</p>
                  <p>• 주 소 : 전라북도 익산시 익산대로17길 16, 105동 1403호</p>
                </section>

                <section>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'GMarketSans, sans-serif' }}>권익침해 구제방법</h3>
                  <p>개인정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해센터 등에 분쟁해결이나 상담 등을 신청하실 수 있습니다.</p>
                  <p>• 개인분쟁조정위원회 : 국번없이 118 (ARS 3번)</p>
                  <p>• 대검찰청 첨단범죄수사과: 02-3480-2000</p>
                  <p>• 경찰청 사이버테러대응센터: 1566-0112</p>
                </section>

                <section>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'GMarketSans, sans-serif' }}>개인정보파일의 열람청구 접수·처리 부서</h3>
                  <p>개인정보파일의 열람청구를 접수·처리하는 부서에 관한 사항은 추후 안내에 따릅니다.</p>
                </section>

                <div className="pt-2 text-gray-600">개인정보 처리방침의 시행일자: 2011년 9월 30일</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 푸터 */}
      <Footer />
    </main>
  );
}
