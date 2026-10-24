"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { type ReactNode } from "react";
import { ChevronLeft, ChevronRight, ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MobileRecordCard, MobileRecordCardProps } from "./MobileRecordCard";

export type ColumnAlign = "left" | "center" | "right";
export type ColumnType = "text" | "number" | "currency" | "date" | "badge" | "image";

export type SelectionMode = "none" | "single" | "multiple";

export interface ColumnVisibilityConfig {
    sm?: boolean;
    md?: boolean;
    lg?: boolean;
}

export interface ColumnConfig<T> {
    key: keyof T | string;
    label: string;
    type?: ColumnType;
    align?: ColumnAlign;
    className?: string; // Additional classes for styling
    hiddenOnMobile?: boolean;
    hiddenOn?: ColumnVisibilityConfig;
    currencySymbol?: string;
    render?: (value: unknown, row: T) => ReactNode;
    link?: (row: T) => string;
    sortable?: boolean;
    sortKey?: string;
    linkClassName?: string;
}

export interface RowAction<T> {
    label: string;
    onClick: (row: T) => void;
    icon?: ReactNode;
    danger?: boolean;
}

export interface GenericTableProps<T> {
    data: T[];
    loading: boolean;

    page: number;
    totalPages: number;
    rowsPerPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (rows: number) => void;
    rowsPerPageOptions?: number[];

    getRowId: (row: T) => string;
    columns: ColumnConfig<T>[];

    selectable?: boolean;
    selectionMode?: SelectionMode;
    onSelectionChange?: (selected: T[]) => void;

    sortKey?: string;
    sortDirection?: "asc" | "desc";
    onSortChange?: (sortKey: string, direction: "asc" | "desc") => void;

    /** Row interactions */
    onRowClick?: (row: T) => void;
    getRowClass?: (row: T) => string;
    rowActionsBuilder?: (row: T) => RowAction<T>[];

    /** Expandable rows */
    expandable?: boolean;
    renderExpandedContent?: (row: T) => ReactNode;

    /** Mobile card renderer */
    renderMobileCard?: (row: T) => MobileRecordCardProps;

    /** Custom states */
    emptyState?: ReactNode;
    loadingState?: ReactNode;
    /** Force table view on mobile */
    forceTableOnMobile?: boolean;
}

/* ======================================================
   DataTable UI helpers (same look & feel)
   ====================================================== */

function formatValue(
    value: unknown,
    type: ColumnType | undefined,
    currencySymbol = "₹"
): string {
    if (value == null) return "—";

    switch (type) {
        case "currency":
            return `${currencySymbol}${Number(value).toLocaleString()}`;
        case "number":
            return Number(value).toLocaleString();
        case "date": {
            const d = new Date(value as string | number | Date);
            if (Number.isNaN(d.getTime())) return "—";
            return d.toLocaleDateString();
        }
        case "badge":
            return String(value);
        default:
            return String(value);
    }
}

function alignClass(align?: ColumnAlign) {
    switch (align) {
        case "center":
            return "text-center justify-center";
        case "right":
            return "text-right justify-end";
        default:
            return "text-left justify-start";
    }
}

/**
 * Optimized Image Component for Table Cells
 * Handles ImageKit transformations and Next.js optimization
 */
function TableImage({ src, alt = "" }: { src: string; alt?: string }) {
    const [isLoaded, setIsLoaded] = useState(false);

    // Optimize ImageKit URLs if detected
    const optimizedSrc = useMemo(() => {
        return src;
    }, [src]);

    if (!src) return <span className="text-muted-foreground/40">—</span>;

    return (
        <div className="relative group w-12 h-12 flex-shrink-0">
            <div className={`
                relative w-full h-full rounded-lg overflow-hidden border border-border/40 bg-muted/30 transition-all duration-300
                group-hover:border-primary/40 group-hover:shadow-md group-hover:scale-105
            `}>
                <Image
                    src={optimizedSrc}
                    alt={alt}
                    fill
                    sizes="48px"
                    className={`
                        object-cover transition-all duration-500
                        ${isLoaded ? "scale-100 blur-0 opacity-100" : "scale-110 blur-sm opacity-0"}
                    `}
                    onLoad={() => setIsLoaded(true)}
                    loading="lazy"
                />
            </div>
        </div>
    );
}

function visibilityClasses(col: ColumnConfig<any>) {
    const classes: string[] = [];

    // Legacy support
    if (col.hiddenOnMobile) {
        classes.push("hidden md:table-cell");
    }

    if (col.hiddenOn?.sm) {
        classes.push("hidden sm:table-cell");
    }
    if (col.hiddenOn?.md) {
        classes.push("sm:hidden md:table-cell");
    }
    if (col.hiddenOn?.lg) {
        classes.push("md:hidden lg:table-cell");
    }

    return classes.join(" ");
}

function GenericTable<T extends Record<string, any>>({
    data,
    loading,
    page,
    totalPages,
    rowsPerPage,
    totalItems,
    onPageChange,
    onRowsPerPageChange,
    rowsPerPageOptions = [10, 25, 50],
    getRowId,
    columns,
    selectable = true,
    selectionMode = "multiple",
    onSelectionChange,
    sortKey,
    sortDirection,
    onSortChange,
    onRowClick,
    getRowClass,
    rowActionsBuilder,
    expandable = false,
    renderExpandedContent,
    renderMobileCard,
    emptyState,
    loadingState,
    forceTableOnMobile,
}: GenericTableProps<T>) {
    const router = useRouter();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [expandedIds, setExpandedIds] = useState<string[]>([]);

    const isSelectionEnabled = selectable && selectionMode !== "none";
    const showSkeleton = loading && data.length === 0;

    const allSelected = useMemo(
        () => data.length > 0 && selectedIds.length === data.length,
        [data, selectedIds]
    );

    const toggleSelectAll = () => {
        if (!isSelectionEnabled || selectionMode !== "multiple") return;

        if (allSelected) {
            setSelectedIds([]);
            onSelectionChange?.([]);
        } else {
            const all = data.map((row) => getRowId(row));
            setSelectedIds(all);
            onSelectionChange?.(data);
        }
    };

    const toggleSelectOne = (row: T) => {
        if (!isSelectionEnabled) return;
        const id = getRowId(row);

        setSelectedIds((prev) => {
            let next: string[] = [];

            if (selectionMode === "single") {
                next = prev.includes(id) ? [] : [id];
            } else {
                const exists = prev.includes(id);
                next = exists ? prev.filter((pid) => pid !== id) : [...prev, id];
            }

            if (onSelectionChange) {
                const selectedRows = data.filter((r) => next.includes(getRowId(r)));
                onSelectionChange(selectedRows);
            }

            return next;
        });
    };

    const toggleExpand = (row: T) => {
        const id = getRowId(row);
        setExpandedIds((prev) =>
            prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
        );
    };

    const goPrev = () => {
        if (page > 1) onPageChange(page - 1);
    };

    const goNext = () => {
        if (page < totalPages) onPageChange(page + 1);
    };

    const handleHeaderSortClick = (col: ColumnConfig<T>) => {
        if (!col.sortable || !onSortChange) return;

        const key = col.sortKey || String(col.key);
        const isActive = sortKey === key;
        const nextDirection: "asc" | "desc" =
            isActive && sortDirection === "asc" ? "desc" : "asc";

        onSortChange(key, nextDirection);
    };

    const renderSortIcon = (col: ColumnConfig<T>) => {
        if (!col.sortable) return null;

        const key = col.sortKey || String(col.key);
        const isActive = sortKey === key;

        return (
            <ArrowUpDown
                size={14}
                className={
                    "shrink-0 transition-opacity ml-1 " +
                    (isActive ? "opacity-100 text-primary" : "opacity-40 group-hover:opacity-80")
                }
            />
        );
    };

    function renderBadge(value: any) {
        if (value === null || value === undefined || value === "") return "—";

        const val = String(value).toLowerCase();
        let variant: "default" | "secondary" | "destructive" | "outline" = "outline";

        if (val === "active" || val === "true") variant = "default"; // green-ish usually default in shadcn? or secondary? we'll stick to default for now
        else if (val === "inactive" || val === "false") variant = "secondary";
        else if (val === "draft") variant = "secondary";

        // Custom styling can be applied via className if basic variants aren't enough
        return <Badge variant={variant}>{String(value)}</Badge>;
    }

    const renderDefaultCellContent = (col: ColumnConfig<T>, row: T) => {
        const rawValue = row[col.key as keyof T];

        let content: ReactNode;

        if (col.render) {
            content = col.render(rawValue, row);
        } else if (col.type === "image") {
            content = <TableImage src={String(rawValue || "")} alt={String(row.title || "")} />;
        } else if (col.type === "badge") {
            content = renderBadge(rawValue);
        } else {
            content = formatValue(rawValue, col.type, col.currencySymbol);
        }

        if (col.link) {
            content = (
                <Link
                    href={col.link(row)}
                    className={col.linkClassName || "font-medium hover:underline"}
                    onClick={(e) => e.stopPropagation()}
                >
                    {content}
                </Link>
            );
        }

        return content;
    };

    const handleRowClick = (row: T, e: React.MouseEvent) => {
        // Don't navigate if clicking on interactive elements
        const target = e.target as HTMLElement;
        if (
            target.closest('input') ||
            target.closest('button') ||
            target.closest('a') ||
            target.closest('[role="checkbox"]')
        ) {
            return;
        }

        // First check if onRowClick is provided
        if (onRowClick) {
            onRowClick(row);
            return;
        }

        // Otherwise, find the first column with a link and navigate to it
        const linkColumn = columns.find(col => col.link);
        if (linkColumn && linkColumn.link) {
            const url = linkColumn.link(row);
            router.push(url);
        }
    };

    const renderDesktopBodyContent = () => {
        if (showSkeleton && !loadingState) {
            // Skeleton rows
            const skeletonRows = Array.from({ length: 5 });
            const colsCount =
                columns.length +
                (isSelectionEnabled ? 1 : 0) +
                (expandable ? 1 : 0) +
                (rowActionsBuilder ? 1 : 0);

            return skeletonRows.map((_, idx) => (
                <TableRow key={`skeleton-${idx}`}>
                    {Array.from({ length: colsCount }).map((__, cIdx) => (
                        <TableCell key={cIdx}>
                            <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
                        </TableCell>
                    ))}
                </TableRow>
            ));
        }

        if (loading && loadingState) {
            return (
                <TableRow>
                    <TableCell
                        colSpan={
                            columns.length +
                            (isSelectionEnabled ? 1 : 0) +
                            (expandable ? 1 : 0) +
                            (rowActionsBuilder ? 1 : 0)
                        }
                        className="h-24 text-center"
                    >
                        {loadingState}
                    </TableCell>
                </TableRow>
            );
        }

        if (!loading && data.length === 0) {
            return (
                <TableRow>
                    <TableCell
                        colSpan={
                            columns.length +
                            (isSelectionEnabled ? 1 : 0) +
                            (expandable ? 1 : 0) +
                            (rowActionsBuilder ? 1 : 0)
                        }
                        className="h-24 text-center text-muted-foreground"
                    >
                        {emptyState ?? "No records found."}
                    </TableCell>
                </TableRow>
            );
        }

        return data.map((row) => {
            const id = getRowId(row);
            const isExpanded = expandedIds.includes(id);
            const rowClass = getRowClass?.(row) ?? "";
            const rowActions = rowActionsBuilder?.(row) ?? [];
            const isSelected = selectedIds.includes(id);

            return (
                <React.Fragment key={id}>
                    <TableRow
                        className={`cursor-pointer ${rowClass} ${isSelected ? "bg-muted/50" : ""}`}
                        onClick={(e) => handleRowClick(row, e)}
                        data-state={isSelected ? "selected" : undefined}
                    >
                        {isSelectionEnabled && (
                            <TableCell className="w-[48px]">
                                {selectionMode === "multiple" ? (
                                    <Checkbox
                                        checked={isSelected}
                                        onCheckedChange={() => toggleSelectOne(row)}
                                    />
                                ) : (
                                    <input
                                        type="radio"
                                        className="h-4 w-4 border-primary text-primary shadow focus:ring-primary"
                                        checked={isSelected}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            toggleSelectOne(row);
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                )}
                            </TableCell>
                        )}

                        {expandable && (
                            <TableCell className="w-12">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleExpand(row);
                                    }}
                                >
                                    {isExpanded ? "−" : "+"}
                                </Button>
                            </TableCell>
                        )}

                        {columns.map((col) => (
                            <TableCell
                                key={String(col.key)}
                                className={`
                                    ${alignClass(col.align)}
                                    ${visibilityClasses(col)}
                                    ${col.className || ""}
                                `}
                            >
                                {renderDefaultCellContent(col, row)}
                            </TableCell>
                        ))}

                        {rowActions.length > 0 && (
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    {rowActions.map((action, idx) => (
                                        <Button
                                            key={idx}
                                            variant={action.danger ? "destructive" : "secondary"}
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                action.onClick(row);
                                            }}
                                            className="h-7 px-2 text-xs"
                                        >
                                            {action.icon && <span className="mr-1">{action.icon}</span>}
                                            {action.label}
                                        </Button>
                                    ))}
                                </div>
                            </TableCell>
                        )}
                    </TableRow>

                    {expandable && isExpanded && renderExpandedContent && (
                        <TableRow className="bg-muted/30">
                            <TableCell
                                colSpan={
                                    columns.length +
                                    (isSelectionEnabled ? 1 : 0) +
                                    1 + // expand column
                                    (rowActionsBuilder ? 1 : 0)
                                }
                            >
                                {renderExpandedContent(row)}
                            </TableCell>
                        </TableRow>
                    )}
                </React.Fragment>
            );
        });
    };

    return (
        <div className="space-y-4">
            {/* Bulk selection bar */}
            {isSelectionEnabled && selectedIds.length > 0 && (
                <div className="bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-lg flex items-center justify-between">
                    <span className="text-sm font-medium">
                        {selectedIds.length} record{selectedIds.length > 1 ? "s" : ""} selected
                    </span>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            setSelectedIds([]);
                            onSelectionChange?.([]);
                        }}
                        className="h-8 text-primary hover:text-primary hover:bg-primary/10"
                    >
                        Clear selection
                    </Button>
                </div>
            )}

            {/* Desktop table */}
            <div className={`rounded-md border ${forceTableOnMobile ? "block" : "hidden md:block"}`}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {isSelectionEnabled && (
                                <TableHead className="w-[48px]">
                                    {selectionMode === "multiple" ? (
                                        <Checkbox
                                            checked={allSelected}
                                            onCheckedChange={toggleSelectAll}
                                        />
                                    ) : (
                                        <span className="text-xs">Sel.</span>
                                    )}
                                </TableHead>
                            )}
                            {expandable && <TableHead className="w-12" />}

                            {columns.map((col) => (
                                <TableHead
                                    key={String(col.key)}
                                    className={`
                                        ${alignClass(col.align)}
                                        ${visibilityClasses(col)}
                                        ${col.sortable ? "cursor-pointer select-none group" : ""}
                                    `}
                                    onClick={() => handleHeaderSortClick(col)}
                                >
                                    <div className={`flex items-center ${alignClass(col.align)}`}>
                                        {col.label}
                                        {renderSortIcon(col)}
                                    </div>
                                </TableHead>
                            ))}

                            {rowActionsBuilder && <TableHead className="text-right">Actions</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>{renderDesktopBodyContent()}</TableBody>
                </Table>
            </div>

            {/* Mobile cards */}
            <div className={`space-y-4 ${forceTableOnMobile ? "hidden" : "md:hidden"}`}>
                {showSkeleton && !loadingState && (
                    Array.from({ length: 4 }).map((_, idx) => (
                        <div key={`mobile-skeleton-${idx}`} className="p-4 border rounded-xl bg-card shadow-sm space-y-3">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-lg bg-muted animate-pulse" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                                    <div className="h-3 w-1/2 bg-muted rounded animate-pulse" />
                                </div>
                            </div>
                        </div>
                    ))
                )}

                {loading && loadingState && !showSkeleton && (
                    <div className="text-center py-8 text-muted-foreground">{loadingState}</div>
                )}

                {!loading && data.length === 0 && !showSkeleton && (
                    <div className="text-center py-8 text-muted-foreground">
                        {emptyState ?? "No records found."}
                    </div>
                )}

                {!loading && data.map((row) => {
                    const id = getRowId(row);

                    // Intelligent Mobile Mapping
                    const findField = (keys: string[]) => {
                        const col = columns.find(c => keys.includes(String(c.key).toLowerCase()));
                        return col ? String(row[col.key as keyof T] ?? "") : null;
                    };

                    const imageCol = columns.find(c => c.type === "image");
                    const title = findField(['name', 'title', 'label', 'fullname', 'displayname']) || String(row[columns[0]?.key as keyof T] ?? "Record");
                    const subtitle = findField(['id', 'sku', 'slug', 'code', 'email']);
                    const imageUrl = imageCol ? (row[imageCol.key as keyof T] as string) : null;

                    const cardProps: MobileRecordCardProps | null = renderMobileCard
                        ? renderMobileCard(row)
                        : {
                            title,
                            subtitle: subtitle || undefined,
                            imageUrl,
                            fields: columns
                                .filter(col => col.type !== 'image' && String(col.key).toLowerCase() !== 'name')
                                .slice(0, 5)
                                .map((col) => ({
                                    label: col.label,
                                    value: col.render
                                        ? col.render(row[col.key as keyof T], row)
                                        : formatValue(
                                            row[col.key as keyof T],
                                            col.type,
                                            col.currencySymbol
                                        ),
                                })),
                            actions: rowActionsBuilder ? rowActionsBuilder(row).map(a => ({
                                label: a.label,
                                onClick: () => a.onClick(row),
                                icon: a.icon,
                                variant: a.danger ? 'destructive' : 'default'
                            })) : undefined
                        };

                    if (!cardProps) return null;

                    return (
                        <MobileRecordCard
                            key={id}
                            {...cardProps}
                            onClick={onRowClick ? () => onRowClick(row) : undefined}
                        />
                    );
                })}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span className="hidden sm:inline">Rows per page</span>
                    <Select
                        value={String(rowsPerPage)}
                        onValueChange={(value) => {
                            onRowsPerPageChange(Number(value));
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={rowsPerPage} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {rowsPerPageOptions.map((opt) => (
                                <SelectItem key={opt} value={String(opt)}>
                                    {opt}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <span className="hidden md:inline ml-2">
                        {data.length > 0
                            ? `Showing ${(page - 1) * rowsPerPage + 1}-${Math.min(
                                page * rowsPerPage,
                                totalItems
                            )} of ${totalItems}`
                            : "Showing 0 of 0"}
                    </span>
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={goPrev}
                        disabled={page <= 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="text-sm font-medium">
                        Page {page} of {Math.max(totalPages, 1)}
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={goNext}
                        disabled={page >= totalPages}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export { GenericTable };
