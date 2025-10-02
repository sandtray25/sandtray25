"use client";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { UploadCloud, X } from "lucide-react";

type FileUploadProps = {
  className?: string;
  label?: string;
  description?: string;
  value?: File[];
  onChange?: (files: File[]) => void;
  accept?: string; // e.g. ".pdf,.doc,.docx,.hwp,.hwpx"
  multiple?: boolean;
  maxFiles?: number; // default 1 when multiple=false
  maxSizeMB?: number; // per-file limit
};

export function FileUpload({
  className,
  label,
  description,
  value,
  onChange,
  accept = ".pdf,.doc,.docx,.hwp,.hwpx,.png,.jpg,.jpeg",
  multiple = false,
  maxFiles,
  maxSizeMB = 20,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [internal, setInternal] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const files = value ?? internal;
  const limit = maxFiles ?? (multiple ? 5 : 1);

  const setFiles = useCallback(
    (next: File[]) => {
      setInternal(next);
      onChange?.(next);
    },
    [onChange]
  );

  const openDialog = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const validate = useCallback(
    (incoming: File[]) => {
      const acc = accept
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
      const allowAll = acc.length === 0;
      const tooMany = files.length + incoming.length > limit;
      if (tooMany) {
        return `첨부 파일은 최대 ${limit}개까지 가능합니다.`;
      }
      for (const f of incoming) {
        const sizeMB = f.size / (1024 * 1024);
        const ext = `.${f.name.split(".").pop()?.toLowerCase()}`;
        if (!allowAll && !acc.includes(ext)) {
          return `허용되지 않은 파일 형식입니다: ${ext}`;
        }
        if (sizeMB > maxSizeMB) {
          return `각 파일은 최대 ${maxSizeMB}MB까지 업로드 가능합니다.`;
        }
      }
      return null;
    },
    [accept, files.length, limit, maxSizeMB]
  );

  const handleFiles = useCallback(
    (selected: FileList | null) => {
      if (!selected || selected.length === 0) return;
      const incoming = Array.from(selected);
      const err = validate(incoming);
      if (err) {
        setError(err);
        return;
      }
      setError(null);
      const next = [...files, ...incoming].slice(0, limit);
      setFiles(next);
    },
    [files, limit, setFiles, validate]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragOver(false);
      handleFiles(e.dataTransfer?.files ?? null);
    },
    [handleFiles]
  );

  const onRemove = useCallback(
    (idx: number) => {
      const next = files.filter((_, i) => i !== idx);
      setFiles(next);
    },
    [files, setFiles]
  );

  const helper = useMemo(() => {
    const types = accept
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .join(", ");
    return `${multiple ? `최대 ${limit}개, ` : ""}허용형식: ${types || "제한없음"}, 파일당 ${maxSizeMB}MB 이하`;
  }, [accept, limit, maxSizeMB, multiple]);

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="mb-2 text-sm font-medium text-gray-800">{label}</div>
      )}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={openDialog}
        className={cn(
          "relative cursor-pointer rounded-2xl border border-white/40 dark:border-white/10",
          "bg-white/60 dark:bg-zinc-900/30 backdrop-blur-[10px] shadow-[0_8px_16px_rgba(0,0,0,0.06)]",
          "px-4 py-8 transition-colors",
          dragOver ? "ring-2 ring-sky-400/60" : "ring-0"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple={multiple}
          accept={accept}
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="flex flex-col items-center justify-center text-center gap-2">
          <UploadCloud className="w-8 h-8 text-gray-500" />
          <div className="text-sm text-gray-800 dark:text-gray-200">
            파일을 드래그 앤 드롭하거나 클릭하여 선택하세요
          </div>
          <div className="text-xs text-gray-500">{helper}</div>
          {description && (
            <div className="mt-1 text-xs text-gray-500">{description}</div>
          )}
        </div>
      </div>

      {!!files.length && (
        <ul className="mt-3 space-y-2">
          {files.map((f, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between rounded-xl border border-white/40 dark:border-white/10 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-[8px] px-3 py-2"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="text-sm font-medium text-gray-800 truncate max-w-[14rem] md:max-w-[28rem]">
                  {f.name}
                </div>
                <div className="text-xs text-gray-500 whitespace-nowrap">
                  {(f.size / (1024 * 1024)).toFixed(2)} MB
                </div>
              </div>
              <button
                type="button"
                aria-label="remove file"
                onClick={() => onRemove(idx)}
                className="p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && (
        <div className="mt-2 text-xs text-red-600">{error}</div>
      )}
    </div>
  );
}

