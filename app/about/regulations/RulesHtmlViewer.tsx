"use client";
import React, { useEffect, useRef } from "react";

type Props = {
  src: string;
  title?: string;
};

export function RulesHtmlViewer({ src, title }: Props) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const adjustHeight = () => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!doc) return;
        const h = Math.max(
          doc.body?.scrollHeight || 0,
          doc.documentElement?.scrollHeight || 0
        );
        if (h) iframe.style.height = `${h}px`;
      } catch (_) {
        // same-origin; ignore if any transient access error
      }
    };

    const onLoad = () => {
      // 스타일 주입 (articles 페이지와 유사한 타이포/테이블 스타일)
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (doc) {
          // MaxAI HTML 파일인지 확인 (text-content-list 클래스 존재 여부)
          const isMaxAI = doc.querySelector('.text-content-list') !== null;

          const style = doc.createElement("style");
          if (isMaxAI) {
            // MaxAI HTML: 텍스트를 보이게 하고 배경 이미지 숨김
            style.innerHTML = `
              :root { color-scheme: light; }
              html, body { margin: 0; padding: 0; background: #ffffff; }
              body {
                font-family: 'Noto Sans KR', system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
                color: #1f2937; /* gray-800 */
                font-size: 15px;
                line-height: 1.75;
              }
              @media (min-width: 768px) {
                body { font-size: 16px; }
              }

              /* 배경 캔버스 숨기기 */
              canvas {
                display: none !important;
              }

              /* 텍스트 레이어를 보이게 하고 articles 스타일 적용 */
              .text-content-list {
                position: static !important;
                opacity: 1 !important;
                line-height: 1.75 !important;
              }

              .text-content-list span {
                color: #374151 !important; /* gray-700 */
                position: static !important;
                white-space: normal !important;
                font-family: 'Noto Sans KR', system-ui, -apple-system, Segoe UI, Roboto, sans-serif !important;
                font-size: 15px !important;
                line-height: 1.625 !important; /* leading-relaxed */
                display: inline !important;
              }

              @media (min-width: 768px) {
                .text-content-list span {
                  font-size: 16px !important;
                }
              }

              /* 문단 스타일 */
              .text-content-list br {
                display: block !important;
                content: "" !important;
                margin: 0.75rem 0 !important;
              }
            `;
          } else {
            // 일반 MS Word HTML: articles 페이지와 동일한 스타일 적용
            style.innerHTML = `
              :root { color-scheme: light; }
              html, body { margin: 0; padding: 0; background: transparent; }
              body {
                font-family: 'Noto Sans KR', system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
                color: #1f2937; /* gray-800 */
                font-size: 15px;
                line-height: 1.75; /* leading-7 */
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
              @media (min-width: 768px) {
                body { font-size: 16px; } /* md:text-base */
              }
              /* MS Word HTML 인라인 스타일 무시하고 articles 페이지와 동일하게 */
              * {
                font-family: 'Noto Sans KR', system-ui, -apple-system, Segoe UI, Roboto, sans-serif !important;
                letter-spacing: normal !important;
              }
              p, div, span, li, td, th {
                font-size: inherit !important;
                line-height: inherit !important;
              }
              /* articles 페이지 스타일 */
              p {
                color: #374151; /* text-gray-700 */
                margin: 0 0 0.75rem;
                line-height: 1.625; /* leading-relaxed */
              }
              h1, h2, h3, h4, h5, h6 {
                font-family: 'GMarketSans', system-ui, -apple-system, Segoe UI, Roboto, sans-serif !important;
                color: #1f2937; /* text-gray-800 */
                font-weight: 500; /* font-medium */
              }
              h2 {
                font-size: 1.5rem; /* text-2xl */
                margin: 3rem 0 1.5rem; /* space-y-12 효과 */
              }
              h2:first-child {
                margin-top: 0;
              }
              h3 {
                font-size: 1.125rem; /* text-lg */
                margin: 1.5rem 0 0.5rem;
              }
              h4 {
                font-size: 1.0625rem;
                margin: 1rem 0 0.5rem;
              }
              ul, ol {
                padding-left: 1.25rem;
                margin: 0.5rem 0 0.75rem;
              }
              ul { list-style: disc; }
              ol { list-style: decimal; }
              li {
                margin: 0.5rem 0;
                color: #374151; /* text-gray-700 */
                line-height: 1.625; /* leading-relaxed */
              }
              ol.list-inside { list-style-position: inside; }
              /* 표 스타일 */
              table {
                margin: 1.25rem auto;
                border-collapse: collapse;
                max-width: 100%;
              }
              table, th, td {
                border: 1px solid #e5e7eb; /* border-gray-200 */
              }
              th {
                background: #f9fafb; /* bg-gray-50 */
                font-weight: 600;
                padding: 0.5rem 0.75rem;
              }
              td {
                padding: 0.5rem 0.75rem;
                color: #374151;
              }
              /* 여백 조정 */
              body > :first-child { margin-top: 0 !important; }
              .space-y-4 > * + * { margin-top: 1rem; }
              .space-y-12 > * + * { margin-top: 3rem; }
            `;
          }
          doc.head.appendChild(style);
        }
      } catch (_) {
        // 주입 실패시 무시
      }

      adjustHeight();
      // 폴링으로 초기 레이아웃 안정화까지 높이 보정
      let ticks = 0;
      const id = window.setInterval(() => {
        adjustHeight();
        ticks += 1;
        if (ticks > 12) window.clearInterval(id); // 약 3.6초
      }, 300);

      // 리사이즈 시에도 보정
      const onResize = () => adjustHeight();
      window.addEventListener("resize", onResize);

      // 정리 함수
      const cleanup = () => {
        window.clearInterval(id);
        window.removeEventListener("resize", onResize);
      };
      // load 핸들러 내에서 cleanup 반환은 의미가 없으므로, 외부 반환으로 처리
      (iframe as any)._cleanupHandler = cleanup;
    };

    iframe.addEventListener("load", onLoad);
    return () => {
      iframe.removeEventListener("load", onLoad);
      const cleanup = (iframe as any)._cleanupHandler as (() => void) | undefined;
      if (cleanup) cleanup();
    };
  }, [src]);

  return (
    <iframe
      ref={iframeRef}
      src={src}
      title={title || src}
      style={{ width: "100%", border: "none", overflow: "hidden" }}
    />
  );
}
