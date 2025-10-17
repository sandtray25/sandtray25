"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const noticeData: Notice[] = [
  {
    id: "1",
    title: "2024년 정기총회 안내",
    date: "2024-03-15",
    important: true,
  },
  {
    id: "2", 
    title: "자격증 시험 일정 변경",
    date: "2024-03-10",
    important: false,
  },
  {
    id: "3",
    title: "워크샵 참가 신청",
    date: "2024-03-05",
    important: false,
  },
  {
    id: "4",
    title: "신규 회원 가입 안내",
    date: "2024-03-01",
    important: false,
  },
  {
    id: "5",
    title: "연구 발표회 개최",
    date: "2024-02-28",
    important: true,
  },
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export type Notice = {
  id: string
  title: string
  date: string
  important: boolean
}

export const noticeColumns: ColumnDef<Notice>[] = [
  {
    accessorKey: "title",
    header: "제목",
    cell: ({ row }) => {
      const important = (row.original as Notice).important
      const title = row.getValue("title") as string

      return (
        <div className="flex items-center gap-2">
          {important && (
            <span className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 text-xs px-1.5 py-0.5 rounded font-medium">
              중요
            </span>
          )}
          <span className="text-sm truncate text-neutral-800 dark:text-neutral-200">{title}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "date",
    header: "날짜",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"))
      const formatted = date.toLocaleDateString("ko-KR", {
        month: "short",
        day: "numeric",
      })
      
      return <div className="text-xs text-neutral-600 dark:text-neutral-400">{formatted}</div>
    },
  },
]

interface NoticeTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

function NoticeTable<TData, TValue>({
  columns,
  data,
}: NoticeTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="h-full overflow-hidden">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="h-8 px-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows
              .sort((a, b) => new Date((b.original as Notice).date).getTime() - new Date((a.original as Notice).date).getTime())
              .map((row) => (
              <TableRow
                key={row.id}
                className="hover:bg-muted/30"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-16 text-center text-xs">
                공지사항이 없습니다.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default function NoticeTableDemo() {
  return (
    <div className="h-full flex flex-col">
      <NoticeTable columns={noticeColumns} data={noticeData} />
    </div>
  )
}
