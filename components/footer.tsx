"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Logo } from "./logo";
import { createClient } from "@/lib/supabase/client";
import { isAdminEmail } from "@/lib/auth/admin";

export function Footer() {
  const [isAdmin, setIsAdmin] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setIsAdmin(isAdminEmail(user.email));
      } else {
        setIsAdmin(false);
      }
    };

    checkAdmin();

    // 세션 변경 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setIsAdmin(isAdminEmail(session.user.email));
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const pages = [
    {
      title: "학회소개",
      href: "/about/greeting",
    },
    {
      title: "모래상자란",
      href: "/sandtray/introduction",
    },
    {
      title: "자격증",
      href: "/certification/process",
    },
    {
      title: "커뮤니티",
      href: "/community",
    },
  ];

  const legals = [
    {
      title: "개인정보",
      href: "/privacy",
    },
    {
      title: "이용약관",
      href: "/terms",
    },
    {
      title: "사이트맵",
      href: "/sitemap",
    },
  ];

  const signups = [
    {
      title: "회원가입",
      href: "/signup",
    },
    {
      title: "마이페이지",
      href: "/mypage",
    },
  ];
  return (
    <div className="px-8 pt-32 pb-12 bg-transparent w-full relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-sm text-neutral-500 flex sm:flex-row flex-col justify-between items-start  md:px-8">
        <div>
          <div className="mr-0 md:mr-4  md:flex mb-4">
            <Logo visible={true} />
          </div>

          <div className="mt-4 ml-2 text-xs leading-relaxed space-y-1" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
            <div>상호: 한국모래상자치료학회</div>
            <div>주소: 광주광역시 서구 풍암2로 53번길 13. 3층(풍암동)</div>
            <div>고유번호증: 250-80-00780 | 대표자: 이 복 순</div>
            <div>E-mail: sandtray1@naver.com</div>
            <div>연락처: 062)234-2986 (010-7239-8039)</div>
          </div>

          <div className="mt-4 ml-2">
            &copy; 2003 한국모래상자치료학회. All rights reserved.
          </div>
        </div>
        <div className="grid grid-cols-3 gap-10 lg:gap-24 xl:gap-32 items-start mt-10 sm:mt-0 md:mt-0">
          <div className="flex justify-center space-y-4 flex-col">
            <p className="transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 font-bold">
              페이지
            </p>
            <ul className="transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 list-none space-y-4">
              {pages.map((page, idx) => (
                <li key={"pages" + idx} className="list-none">
                  <Link
                    className="transition-colors hover:text-text-neutral-800 "
                    href={page.href}
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          <div className="flex justify-center space-y-4 flex-col">
            <p className="transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 font-bold">
              법적고지
            </p>
            <ul className="transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 list-none space-y-4">
              {legals.map((legal, idx) => (
                <li key={"legal" + idx} className="list-none">
                  <Link
                    className="transition-colors hover:text-text-neutral-800 "
                    href={legal.href}
                  >
                    {legal.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center space-y-4 flex-col">
            <p className="transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 font-bold">
              회원서비스
            </p>
            <ul className="transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 list-none space-y-4">
              {signups.map((auth, idx) => (
                <li key={"auth" + idx} className="list-none">
                  <Link
                    className="transition-colors hover:text-text-neutral-800 "
                    href={auth.href}
                  >
                    {auth.title}
                  </Link>
                </li>
              ))}
              {isAdmin && (
                <li className="list-none">
                  <Link
                    className="transition-colors hover:text-text-neutral-800 font-semibold text-orange-600 dark:text-orange-400"
                    href="/admin"
                  >
                    관리페이지
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
