"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/footer";
import { useEffect, useState } from "react";
import Script from "next/script";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    daum: any;
  }
}

export default function SignupPage() {
  return (
    <>
      <Script
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="lazyOnload"
      />
      <RegistrationFormWithImages />
    </>
  );
}

export function RegistrationFormWithImages() {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: `linear-gradient(135deg,
          #fafafa 0%,
          #f8f9fa 20%,
          #f1f5f9 40%,
          #e2e8f0 60%,
          #cbd5e1 80%,
          #94a3b8 100%)`
      }}
    >
      <div className="flex w-full items-center justify-center pt-20">
        <Form />
      </div>
      <Footer />
    </div>
  );
}

function Form() {
  const router = useRouter();
  const supabase = createClient();

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState({
    zonecode: "",
    roadAddress: "",
    jibunAddress: "",
    detailAddress: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const passwordConfirm = formData.get("passwordConfirm") as string;

    // 비밀번호 확인
    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      setLoading(false);
      return;
    }

    try {
      // 1. Supabase Auth로 회원가입
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (authError) throw authError;

      // 2. 회원가입 성공 시 프로필 정보 업데이트
      if (authData.user) {
        const { error: profileError } = await supabase
          .from("profiles")
          .update({
            email,
            phone,
            zonecode: address.zonecode,
            road_address: address.roadAddress,
            jibun_address: address.jibunAddress,
            detail_address: address.detailAddress,
          })
          .eq("id", authData.user.id);

        if (profileError) {
          console.error("프로필 업데이트 오류:", profileError);
        }
      }

      // 3. 성공 메시지 및 리다이렉트
      alert("회원가입을 축하합니다!\n로그인 해주세요.");
      router.push("/login");
    } catch (err: any) {
      console.error("회원가입 오류:", err);
      setError(err.message || "회원가입 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 추출
    let formattedValue = "";

    if (value.length <= 3) {
      formattedValue = value;
    } else if (value.length <= 7) {
      formattedValue = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else {
      formattedValue = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
    }

    setPhone(formattedValue);
  };

  const handleAddressSearch = () => {
    if (!window.daum) {
      alert("우편번호 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    new window.daum.Postcode({
      oncomplete: function(data: any) {
        // 도로명 주소와 지번 주소 모두 저장
        setAddress({
          zonecode: data.zonecode,
          roadAddress: data.roadAddress,
          jibunAddress: data.jibunAddress,
          detailAddress: "",
        });

        // 상세주소 입력 필드로 포커스 이동
        document.getElementById("detailAddress")?.focus();
      }
    }).open();
  };

  return (
    <form className="bg-transparent" onSubmit={onSubmit}>
      <div className="flex w-full items-center justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          <div>
            <h2 className="text-2xl font-bold leading-9 tracking-tight text-black dark:text-white">
              회원가입
            </h2>
          </div>

          {error && (
            <div className="mt-4 rounded-md bg-red-50 p-4 dark:bg-red-900/20">
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          <div className="mt-10">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-neutral-700 dark:text-neutral-400"
                >
                  이름
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="홍길동"
                    required
                    className="shadow-input block w-full rounded-md border-0 bg-white px-4 py-1.5 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 sm:text-sm sm:leading-6 dark:bg-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-neutral-700 dark:text-neutral-400"
                >
                  이메일 주소
                </label>

                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    required
                    className="shadow-input block w-full rounded-md border-0 bg-white px-4 py-1.5 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 sm:text-sm sm:leading-6 dark:bg-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-neutral-700 dark:text-neutral-400"
                >
                  비밀번호
                </label>

                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    minLength={6}
                    required
                    className="shadow-input block w-full rounded-md border-0 bg-white px-4 py-1.5 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 sm:text-sm sm:leading-6 dark:bg-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="passwordConfirm"
                  className="block text-sm font-medium leading-6 text-neutral-700 dark:text-neutral-400"
                >
                  비밀번호 확인
                </label>

                <div className="mt-2">
                  <input
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    placeholder="••••••••"
                    minLength={6}
                    required
                    className="shadow-input block w-full rounded-md border-0 bg-white px-4 py-1.5 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 sm:text-sm sm:leading-6 dark:bg-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-neutral-700 dark:text-neutral-400"
                >
                  핸드폰 번호
                </label>

                <div className="mt-2">
                  <input
                    id="phone"
                    type="tel"
                    placeholder="010-1234-5678"
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength={13}
                    required
                    className="shadow-input block w-full rounded-md border-0 bg-white px-4 py-1.5 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 sm:text-sm sm:leading-6 dark:bg-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="zonecode"
                  className="block text-sm font-medium leading-6 text-neutral-700 dark:text-neutral-400"
                >
                  주소
                </label>
                <div className="mt-2 flex gap-2">
                  <input
                    id="zonecode"
                    type="text"
                    placeholder="우편번호"
                    value={address.zonecode}
                    readOnly
                    required
                    className="shadow-input block w-32 rounded-md border-0 bg-white px-4 py-1.5 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 sm:text-sm sm:leading-6 dark:bg-neutral-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddressSearch}
                    className="rounded-md bg-neutral-600 px-4 py-1.5 text-sm font-medium text-white transition duration-200 hover:bg-neutral-700 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                  >
                    주소 검색
                  </button>
                </div>
                <div className="mt-2">
                  <input
                    id="address"
                    type="text"
                    placeholder="도로명 주소"
                    value={address.roadAddress}
                    readOnly
                    required
                    className="shadow-input block w-full rounded-md border-0 bg-white px-4 py-1.5 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 sm:text-sm sm:leading-6 dark:bg-neutral-900 dark:text-white"
                  />
                </div>
                <div className="mt-2">
                  <input
                    id="detailAddress"
                    type="text"
                    placeholder="상세주소"
                    value={address.detailAddress}
                    onChange={(e) => setAddress({ ...address, detailAddress: e.target.value })}
                    className="shadow-input block w-full rounded-md border-0 bg-white px-4 py-1.5 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 sm:text-sm sm:leading-6 dark:bg-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="relative z-10 flex w-full items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-black/90 md:text-sm dark:bg-white dark:text-black dark:hover:bg-neutral-100 dark:hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "가입 중..." : "가입하기"}
                </button>
                <p
                  className={cn(
                    "mt-4 text-center text-sm text-neutral-600 dark:text-neutral-400",
                  )}
                >
                  이미 계정이 있으신가요?{" "}
                  <Link href="/login" className="text-black dark:text-white">
                    로그인
                  </Link>
                </p>
              </div>
            </div>

            <div className="mt-10">
              <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
                가입하기를 클릭하면{" "}
                <Link
                  href="/terms"
                  className="text-neutral-500 dark:text-neutral-300"
                >
                  이용약관
                </Link>{" "}
                및{" "}
                <br />
                <Link
                  href="/privacy"
                  className="text-neutral-500 dark:text-neutral-300"
                >
                  개인정보처리방침
                </Link>
                에 동의하는 것으로 간주됩니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

