/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { flexRender } from "@tanstack/react-table"
import { Download, RotateCcw, Search, Trash2, X } from "lucide-react"
import type * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { DataTablePagination } from "./data-table-pagination"
import { TableRoot, useTableContext } from "./table-context"

// 1. DEFINE GENERIC INTERFACES
export interface StatusOption {
    label: string
    value?: string
    icon: React.ComponentType<{ className?: string }>
    color: string
}

interface SearchProps {
    columnId: string
    placeholder: string
}

interface FilterTabsProps {
    columnId: string
    options: string[]
}

interface StatusFiltersProps {
    columnId: string
    options: StatusOption[]
    title?: string
}

interface BodyProps<TData> {
    columnsCount: number
    onRowDoubleClick?: (row: Row<TData>) => void
}

import type { Row } from "@tanstack/react-table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Skeleton } from "../ui/skeleton"

interface BulkActionsProps<TData> {
    onDelete?: (rows: Row<TData>[]) => void
    onDownload?: (rows: Row<TData>[]) => void
    deleteTitle?: string
    deleteDescription?: string
}

export const Table = {
    Root: TableRoot,


    Search: ({ columnId, placeholder }: SearchProps) => {
        const { table } = useTableContext()
        const column = table.getColumn(columnId)

        return (
            <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/50" />
                <Input
                    placeholder={placeholder}
                    value={(column?.getFilterValue() as string) ?? ""}
                    onChange={(e) => column?.setFilterValue(e.target.value)}
                    className="pl-9 bg-card/40 border-border/40 rounded-2xl h-11"
                />
            </div>
        )
    },

    FilterTabs: ({ columnId, options }: FilterTabsProps) => {
        const { table } = useTableContext()
        const column = table.getColumn(columnId)
        const currentValue = (column?.getFilterValue() as string) ?? ""

        return (
            <div className="flex items-center bg-muted/30 p-1 rounded-2xl border border-border/40">
                {options.map((opt) => (
                    <Button
                        key={opt}
                        variant="ghost"
                        size="sm"
                        onClick={() => column?.setFilterValue(opt === 'All' ? "" : opt)}
                        className={cn(
                            "rounded-xl px-4 text-[11px] font-bold uppercase tracking-wider transition-all",
                            (opt === 'All' ? currentValue === "" : currentValue === opt)
                                ? "bg-background text-primary shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {opt}
                    </Button>
                ))}
            </div>
        )
    },

    StatusFilters: ({ columnId, options, title = "Status" }: StatusFiltersProps) => {
        const { table } = useTableContext()
        const column = table.getColumn(columnId)
        const currentValue = (column?.getFilterValue() as string) ?? ""

        return (
            <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mr-2">
                    {title}:
                </span>
                {options.map((s) => {
                    const filterValue = s.value ?? s.label
                    const isActive = currentValue === filterValue
                    const Icon = s.icon

                    return (
                        <Button
                            key={s.label}
                            variant="outline"
                            size="sm"
                            onClick={() => column?.setFilterValue(isActive ? "" : filterValue)}
                            className={cn(
                                "h-8 rounded-full px-3 text-[10px] font-bold border-border/40 transition-all",
                                isActive
                                    ? "bg-primary/10 border-primary/30 text-primary shadow-inner"
                                    : "bg-transparent text-muted-foreground hover:bg-muted"
                            )}
                        >
                            <Icon className={cn("mr-1.5 size-3", isActive ? "text-primary" : s.color)} />
                            {s.label}
                        </Button>
                    )
                })}

                {currentValue && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => column?.setFilterValue("")}
                        className="h-8 text-[10px] font-bold text-destructive hover:bg-destructive/10 rounded-full"
                    >
                        <RotateCcw className="mr-1.5 size-3" />
                        Reset
                    </Button>
                )}
            </div>
        )
    },

    Body: <TData,>({ columnsCount, onRowDoubleClick }: BodyProps<TData>) => {
        const { table } = useTableContext<TData>()
        const rows = table.getRowModel().rows

        return (
            <div className="relative group/container">
                {/* 1. OVERFLOW WRAPPER with Custom Scrollbar */}
                <div className="rounded-[2rem] border border-border/40 bg-card/20 backdrop-blur-2xl shadow-2xl overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-primary/30">
                    <table className="w-full text-sm min-w-[1000px]"> {/* Min-width ensures scrolling on small screens */}
                        <thead className="bg-muted/50 border-b border-border/40">
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th
                                            key={header.id}
                                            className={cn(
                                                "p-5 text-left font-black text-muted-foreground uppercase tracking-widest text-[10px]",
                                                // Sticky Header for the first column (Identity)
                                                header.column.id === "name" && "sticky left-0 z-20 "
                                            )}
                                        >
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="divide-y divide-border/10">
                            {rows.length > 0 ? (
                                rows.map(row => (
                                    <tr
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        className="hover:bg-primary/3 transition-colors group/row"
                                        onDoubleClick={() => onRowDoubleClick?.(row)}
                                        onClick={() => {
                                            row.toggleSelected(!row.getIsSelected());
                                        }}
                                    >
                                        {row.getVisibleCells().map(cell => (
                                            <td
                                                key={cell.id}
                                                className={cn(
                                                    "p-4 align-middle transition-colors",
                                                    cell.column.id === "name" && "sticky left-0 z-10  backdrop-blur-md border-r border-border/20 shadow-[4px_0_10px_-5px_rgba(0,0,0,0.1)]"
                                                )}
                                            >
                                                <div className="flex items-center">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columnsCount} className="h-48 text-center">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <div className="p-4 rounded-full bg-muted/10">
                                                <X className="h-6 w-6 text-muted-foreground/40" />
                                            </div>
                                            <span className="text-muted-foreground font-medium italic">No identities match your current filters</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* 2. VISUAL AFFORDANCE: Right-side Fade Mask */}
                <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-background/40 to-transparent pointer-events-none rounded-r-[2rem] opacity-0 group-hover/container:opacity-100 transition-opacity" />
            </div>
        )
    },

    Pagination: () => {
        const { table } = useTableContext()
        return <DataTablePagination table={table} />
    },

    BulkActions: <TData,>({
        onDelete,
        onDownload,
        deleteTitle = "Are you sure?",
        deleteDescription = "This action cannot be undone. Selected records will be permanently removed."
    }: BulkActionsProps<TData>) => {
        const { table } = useTableContext<TData>()
        const selectedRows = table.getFilteredSelectedRowModel().rows

        if (selectedRows.length === 0) return null

        return (
            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-300">
                {/* DELETE DIALOG */}
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="destructive"
                            size="sm"
                            className="h-8 rounded-lg text-[10px] font-bold uppercase shadow-lg shadow-destructive/20"
                        >
                            <Trash2 className="mr-1.5 size-3" />
                            Delete ({selectedRows.length})
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-3xl border-border/40 bg-card/95 backdrop-blur-xl">
                        <AlertDialogHeader>
                            <AlertDialogTitle>{deleteTitle}</AlertDialogTitle>
                            <AlertDialogDescription>
                                {deleteDescription}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => onDelete?.(selectedRows)}
                                className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                                Confirm Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                {/* DOWNLOAD BUTTON */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDownload?.(selectedRows)}
                    className="h-8 rounded-lg text-[10px] font-bold uppercase border-border/40 bg-card/50"
                >
                    <Download className="mr-1.5 size-3" />
                    Export CSV
                </Button>
            </div>
        )
    },
    Loading: ({ columnsCount, rowsCount = 5 }: { columnsCount: number, rowsCount?: number }) => {
        return (
            <div className="rounded-3xl border border-border/40 bg-card/20 backdrop-blur-2xl overflow-hidden shadow-2xl">
                <div className="w-full">
                    {/* Skeleton Header */}
                    <div className="flex bg-muted/50 border-b border-border/40 p-4">
                        {Array.from({ length: columnsCount }).map((_, i) => (
                            <div key={i} className="flex-1 px-2">
                                <Skeleton className="h-3 w-20 bg-muted-foreground/20" />
                            </div>
                        ))}
                    </div>
                    {/* Skeleton Body */}
                    <div className="divide-y divide-border/20">
                        {Array.from({ length: rowsCount }).map((_, rowIndex) => (
                            <div key={rowIndex} className="flex p-4">
                                {Array.from({ length: columnsCount }).map((_, colIndex) => (
                                    <div key={colIndex} className="flex-1 px-2">
                                        <Skeleton className="h-4 w-[80%] bg-muted/40" />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}