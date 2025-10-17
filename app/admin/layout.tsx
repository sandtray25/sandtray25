"use client";
import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody } from "@/components/ui/sidebar";
import {
  IconUsers,
  IconMessage,
  IconFileText,
  IconCertificate,
  IconCreditCard,
  IconCalendarEvent,
  IconLogout,
  IconChevronRight,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { isAdminEmail } from "@/lib/auth/admin";

interface SubMenuItem {
  label: string;
  href: string;
}

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  subItems: SubMenuItem[];
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (!user) {
        alert("로그인이 필요합니다.");
        router.replace("/login");
        return;
      }

      if (!isAdminEmail(user.email)) {
        alert("관리자만 접근할 수 있습니다.");
        router.replace("/");
        return;
      }

      // profiles 테이블에서 name 가져오기
      const { data: profileData } = await supabase
        .from('profiles')
        .select('name')
        .eq('id', user.id)
        .single();

      setProfile(profileData);
      setLoading(false);
    };

    checkAdmin();
  }, [router, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const toggleMenu = (label: string) => {
    const newExpanded = new Set(expandedMenus);
    if (newExpanded.has(label)) {
      newExpanded.delete(label);
    } else {
      newExpanded.add(label);
    }
    setExpandedMenus(newExpanded);
  };

  const menuItems: MenuItem[] = [
    {
      label: "회원관리",
      icon: <IconUsers className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
      subItems: [
        { label: "회원 등급 관리", href: "/admin/members/grades" },
        { label: "회원 승인", href: "/admin/members/approval" },
      ],
    },
    {
      label: "커뮤니티",
      icon: <IconMessage className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
      subItems: [
        { label: "공지사항 관리", href: "/admin/community/notice" },
        { label: "게시글 관리", href: "/admin/community/posts" },
        { label: "댓글 관리", href: "/admin/community/comments" },
      ],
    },
    {
      label: "논문관리",
      icon: <IconFileText className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
      subItems: [
        { label: "논문 목록", href: "/admin/papers/list" },
        { label: "논문 심사", href: "/admin/papers/review" },
        { label: "논문 통계", href: "/admin/papers/stats" },
      ],
    },
    {
      label: "자격신청 관리",
      icon: <IconCertificate className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
      subItems: [
        { label: "신청 목록", href: "/admin/certification/list" },
        { label: "자격증 발급", href: "/admin/certification/issue" },
        { label: "자격 심사", href: "/admin/certification/review" },
      ],
    },
    {
      label: "회비납부관리",
      icon: <IconCreditCard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
      subItems: [
        { label: "납부 내역", href: "/admin/payment/history" },
        { label: "미납 회원", href: "/admin/payment/unpaid" },
        { label: "납부 통계", href: "/admin/payment/stats" },
      ],
    },
    {
      label: "학술대회 관리",
      icon: <IconCalendarEvent className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
      subItems: [
        { label: "학술대회 등록", href: "/admin/conference/register" },
        { label: "참가자 관리", href: "/admin/conference/participants" },
        { label: "발표자 관리", href: "/admin/conference/presenters" },
      ],
    },
  ];

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-neutral-700 dark:text-neutral-300">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-gray-100 dark:bg-neutral-900">
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <div className="w-full">
              {open ? <Logo user={user} profile={profile} open={open} /> : <LogoIcon />}
            </div>
            <div className="mt-8 flex flex-col gap-1 w-full">
              {menuItems.map((item, idx) => (
                <MenuItemWithSub
                  key={idx}
                  item={item}
                  isExpanded={expandedMenus.has(item.label)}
                  onToggle={() => toggleMenu(item.label)}
                  open={open}
                />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <button
              onClick={handleLogout}
              className="group/sidebar flex w-full items-center justify-start gap-2 py-2 text-left"
            >
              <IconLogout className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
              <motion.span
                animate={{
                  display: open ? "inline-block" : "none",
                  opacity: open ? 1 : 0,
                }}
                className="!m-0 inline-block whitespace-pre !p-0 text-sm text-neutral-700 transition duration-150 group-hover/sidebar:translate-x-1 dark:text-neutral-200"
              >
                로그아웃
              </motion.span>
            </button>
            <div className="group/sidebar flex items-center justify-start gap-2 py-2">
              <div className="h-7 w-7 shrink-0 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-bold">
                {user.email?.[0]?.toUpperCase()}
              </div>
              <motion.div
                animate={{
                  display: open ? "block" : "none",
                  opacity: open ? 1 : 0,
                }}
                className="flex flex-col"
              >
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                  관리자
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  {user.email}
                </span>
              </motion.div>
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1 overflow-auto md:rounded-tl-2xl">
        <div className="flex h-full w-full flex-1 flex-col md:border md:border-neutral-200 bg-white dark:md:border-neutral-700 dark:bg-neutral-900 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

function MenuItemWithSub({
  item,
  isExpanded,
  onToggle,
  open,
}: {
  item: MenuItem;
  isExpanded: boolean;
  onToggle: () => void;
  open: boolean;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="group/sidebar flex w-full items-center justify-between py-2 text-left hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-md px-2 transition-colors"
      >
        <div className="flex items-center gap-2">
          {item.icon}
          <motion.span
            animate={{
              display: open ? "inline-block" : "none",
              opacity: open ? 1 : 0,
            }}
            className="!m-0 inline-block whitespace-pre !p-0 text-sm text-neutral-700 transition duration-150 dark:text-neutral-200"
          >
            {item.label}
          </motion.span>
        </div>
        <motion.div
          animate={{
            display: open ? "block" : "none",
            opacity: open ? 1 : 0,
            rotate: isExpanded ? 90 : 0,
          }}
        >
          <IconChevronRight className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isExpanded && open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="ml-7 mt-1 space-y-1 border-l border-neutral-300 pl-4 dark:border-neutral-600">
              {item.subItems.map((subItem, idx) => (
                <a
                  key={idx}
                  href={subItem.href}
                  className="block py-1.5 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
                >
                  {subItem.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const Logo = ({ user, profile, open }: { user: any; profile: any; open: boolean }) => {
  // profiles 테이블의 name 사용, 없으면 이메일의 @ 앞부분 사용
  const userName = profile?.name || user?.email?.split('@')[0] || '관리자';
  
  return (
    <a href="/admin" className="relative z-20 flex items-center justify-start space-x-2 py-1 text-sm font-normal pl-1 pr-2">
      <div className="h-6 w-6 shrink-0 rounded-md bg-gradient-to-br from-orange-400 to-orange-600" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        className="font-bold whitespace-nowrap text-black dark:text-white text-sm"
      >
        {userName} 님
      </motion.span>
    </a>
  );
};

const LogoIcon = () => {
  return (
    <a href="/admin" className="relative z-20 flex items-center justify-start py-1 pl-1 pr-2">
      <div className="h-6 w-6 shrink-0 rounded-md bg-gradient-to-br from-orange-400 to-orange-600" />
    </a>
  );
};

