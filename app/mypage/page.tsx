"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";
import { Footer } from "@/components/footer";

export default function MyPage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);

      // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
      if (!user) {
        router.push("/login");
      }
    };

    getUser();
  }, [router, supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  if (loading) {
    return (
      <main className="min-h-screen px-6 py-24">
        <p className="text-neutral-700 dark:text-neutral-300">로딩 중...</p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <main className="min-h-screen px-6 py-24">
        <h1 className="text-2xl font-semibold mb-4">마이페이지</h1>
        <div className="space-y-4">
          <p className="text-neutral-700 dark:text-neutral-300">환영합니다, {user.email}님!</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">마이페이지 내용은 준비 중입니다.</p>
          <Button 
            as="button"
            variant="dark"
            onClick={handleLogout}
            className="mt-4"
          >
            로그아웃
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}

