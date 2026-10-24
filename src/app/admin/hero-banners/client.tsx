"use client";

import React, { useState, useMemo, useEffect } from "react";
import { GenericTable, ColumnConfig } from "../_components/data-table/GenericTable";
import { FiltersBar, FilterOption, SortOption } from "../_components/data-table/FiltersBar";
import { MetricsGrid, MetricItem } from "../_components/MetricsGrid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Layout, CheckCircle, Image as ImageIcon, Tag, Hash, Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useQueryStates, parseAsInteger, parseAsString, parseAsArrayOf, parseAsStringLiteral } from "nuqs";
import { ICarousel as HeroBanner } from "@/models/Carousel";
import { deleteCarouselItem } from "@/app/actions/carousel";

interface HeroBannersClientProps {
    initialData: HeroBanner[];
}

export default function HeroBannersClient({ initialData }: HeroBannersClientProps) {
    const [data, setData] = useState<HeroBanner[]>(initialData);
    const router = useRouter();
    const searchParams = useSearchParams();

    const [queryParams, setQueryParams] = useQueryStates({
        page: parseAsInteger.withDefault(1),
        rowsPerPage: parseAsInteger.withDefault(10),
        search: parseAsString.withDefault(""),
        status: parseAsArrayOf(parseAsString).withDefault([]),
        layout: parseAsArrayOf(parseAsString).withDefault([]),
        sortKey: parseAsString.withDefault("order"),
        sortDirection: parseAsStringLiteral(["asc", "desc"]).withDefault("asc")
    }, {
        shallow: true
    });

    const { 
        page, 
        rowsPerPage, 
        search, 
        status: statusFilter, 
        layout: layoutFilter,
        sortKey,
        sortDirection
    } = queryParams;

    const setPage = (p: number) => setQueryParams({ page: p });
    const setRowsPerPage = (r: number) => setQueryParams({ rowsPerPage: r, page: 1 });
    const setSearch = (s: string) => setQueryParams({ search: s, page: 1 });
    const setSortKey = (k: string) => setQueryParams({ sortKey: k });
    const setSortDirection = (d: "asc" | "desc") => setQueryParams({ sortDirection: d });
    const updatedId = searchParams.get("updated");

    const handleDeleteBanner = async (id: string, title: string) => {
        if (!confirm(`Are you sure you want to delete banner "${title}"? This action cannot be undone.`)) return;

        try {
            const res = await deleteCarouselItem(id);
            if (res.success) {
                toast.success(`Banner "${title}" deleted successfully`);
                setData(prev => prev.filter(b => String(b._id) !== id));
            } else {
                toast.error(res.error || "Failed to delete banner");
            }
        } catch (error) {
            toast.error("An error occurred while deleting");
        }
    };

    // Auto-clear the highlight after 4 seconds + show toast
    const [highlightedId, setHighlightedId] = useState<string | null>(updatedId);
    useEffect(() => {
        if (updatedId) {
            const banner = initialData.find(b => String(b._id) === updatedId);
            toast.success(
                banner ? `"${banner.title}" updated successfully` : "Hero banner updated successfully",
                { description: "The banner has been moved to the top of the list." }
            );
            setHighlightedId(updatedId);
            const timer = setTimeout(() => setHighlightedId(null), 4000);
            return () => clearTimeout(timer);
        }
    }, [updatedId]);

    // Column visibility state
    const [columnsVisibility, setColumnsVisibility] = useState<Record<string, boolean>>({
        image: true,
        title: true,
        layout: true,
        status: true,
        order: true,
        actions: true
    });

    const toggleColumn = (key: string) => {
        setColumnsVisibility(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // --- FILTER & SORT LOGIC ---
    const filteredData = useMemo(() => {
        let result = [...data];

        // Search
        if (search) {
            const q = search.toLowerCase();
            result = result.filter(item =>
                item.title.toLowerCase().includes(q) ||
                (item.subtitle && item.subtitle.toLowerCase().includes(q))
            );
        }

        // Status Filter
        if (statusFilter.length > 0) {
            result = result.filter(item => statusFilter.includes(item.status));
        }

        // Layout Filter
        if (layoutFilter.length > 0) {
            result = result.filter(item => layoutFilter.includes(item.layout));
        }

        // Sort
        if (sortKey) {
            result.sort((a, b) => {
                const aValue = a[sortKey as keyof HeroBanner];
                const bValue = b[sortKey as keyof HeroBanner];

                if (aValue === bValue) return 0;

                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return sortDirection === "asc"
                        ? aValue.localeCompare(bValue)
                        : bValue.localeCompare(aValue);
                }

                if (typeof aValue === 'number' && typeof bValue === 'number') {
                    return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
                }

                return 0;
            });
        }

        return result;
    }, [data, search, statusFilter, layoutFilter, sortKey, sortDirection]);

    // --- PAGINATION LOGIC ---
    const paginatedData = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        let sliced = filteredData.slice(start, start + rowsPerPage);

        // Pin the recently updated banner to the top of page 1
        if (updatedId && page === 1) {
            const updatedIndex = sliced.findIndex(item => String(item._id) === updatedId);
            if (updatedIndex > 0) {
                const [updated] = sliced.splice(updatedIndex, 1);
                sliced = [updated, ...sliced];
            } else if (updatedIndex === -1) {
                const globalIndex = filteredData.findIndex(item => String(item._id) === updatedId);
                if (globalIndex !== -1) {
                    sliced = [filteredData[globalIndex], ...sliced.slice(0, rowsPerPage - 1)];
                }
            }
        }

        return sliced;
    }, [filteredData, page, rowsPerPage, updatedId]);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    // --- CONFIGURATION ---
    const columns: ColumnConfig<HeroBanner>[] = [
        { key: "image", label: "Image", type: "image" as const, sortable: false },
        {
            key: "title",
            label: "Details",
            sortable: true,
            className: "font-medium",
            render: (val: unknown, row: HeroBanner) => (
                <div>
                    <div className="font-semibold text-foreground">{row.title}</div>
                    {row.subtitle && <div className="text-xs text-muted-foreground line-clamp-1">{row.subtitle}</div>}
                </div>
            )
        },
        {
            key: "layout",
            label: "Layout",
            sortable: true,
            render: (val: unknown) => (
                <Badge variant="outline" className="capitalize">
                    {String(val)}
                </Badge>
            )
        },
        {
            key: "order",
            label: "Order",
            sortable: true,
            className: "text-center",
            render: (val: unknown) => (
                <span className="font-mono text-xs">{String(val)}</span>
            )
        },
        {
            key: "status",
            label: "Status",
            type: "badge" as const,
            sortable: true,
            render: (val: unknown) => {
                const isActive = val === "active";
                return (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}>
                        {String(val === "active" ? "Active" : "Draft")}
                    </span>
                )
            }
        }
    ].filter(col => columnsVisibility[String(col.key)] !== false);

    // Filter Options
    const statusOptions: FilterOption[] = [
        { 
            label: "Active", 
            value: "active", 
            isActive: statusFilter.includes("active"), 
            onSelect: (v) => {
                const next = statusFilter.includes(v) ? statusFilter.filter(p => p !== v) : [...statusFilter, v];
                setQueryParams({ status: next, page: 1 });
            } 
        },
        { 
            label: "Draft", 
            value: "draft", 
            isActive: statusFilter.includes("draft"), 
            onSelect: (v) => {
                const next = statusFilter.includes(v) ? statusFilter.filter(p => p !== v) : [...statusFilter, v];
                setQueryParams({ status: next, page: 1 });
            } 
        },
    ];

    const layoutOptions: FilterOption[] = ["norman", "found", "measured", "centered"].map(l => ({
        label: l.charAt(0).toUpperCase() + l.slice(1),
        value: l,
        isActive: layoutFilter.includes(l),
        onSelect: (v) => {
            const next = layoutFilter.includes(v) ? layoutFilter.filter(p => p !== v) : [...layoutFilter, v];
            setQueryParams({ layout: next, page: 1 });
        }
    }));

    const sortOptions: SortOption[] = [
        { label: "Order (Asc)", value: "order", direction: "asc", isActive: sortKey === "order" && sortDirection === "asc", onSelect: () => { setSortKey("order"); setSortDirection("asc"); } },
        { label: "Order (Desc)", value: "order", direction: "desc", isActive: sortKey === "order" && sortDirection === "desc", onSelect: () => { setSortKey("order"); setSortDirection("desc"); } },
        { label: "Title (A-Z)", value: "title", direction: "asc", isActive: sortKey === "title" && sortDirection === "asc", onSelect: () => { setSortKey("title"); setSortDirection("asc"); } },
    ];

    // --- METRICS ---
    const metrics: MetricItem[] = useMemo(() => {
        const total = data.length;
        const active = data.filter(i => i.status === 'active').length;
        const drafts = data.filter(i => i.status === 'draft').length;

        return [
            {
                title: "Total Banners",
                value: total,
                icon: ImageIcon,
                iconBg: "#EEF2FF",
                iconClass: "text-[#6366F1]",
            },
            {
                title: "Active Banners",
                value: active,
                icon: CheckCircle,
                iconBg: "#ECFDF5",
                iconClass: "text-[#10B981]",
            },
            {
                title: "Draft Banners",
                value: drafts,
                icon: Tag,
                iconBg: "#F3F4F6",
                iconClass: "text-[#6B7280]",
            },
            {
                title: "Avg Order",
                value: total > 0 ? (data.reduce((acc, curr) => acc + curr.order, 0) / total).toFixed(1) : 0,
                icon: Hash,
                iconBg: "#FFF7ED",
                iconClass: "text-[#F97316]",
            }
        ];
    }, [initialData]);

    const actions = [
        { label: "Add New Banner", icon: <Plus className="h-4 w-4" />, onClick: () => router.push("/admin/hero-banners/create") }
    ];

    return (
        <div className="space-y-6 max-w-[100vw] overflow-x-hidden p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Hero Banners</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your website's hero carousel and banners.
                    </p>
                </div>
                <Button onClick={() => router.push("/admin/hero-banners/create")}>
                    <Plus className="mr-2 h-4 w-4" /> Add Banner
                </Button>
            </div>

            <MetricsGrid metrics={metrics} />

            <FiltersBar
                search={search}
                onSearchChange={(s) => { setSearch(s); setPage(1); }}
                searchPlaceholder="Search banners..."
                filterGroups={[
                    { id: "status", label: "Status", options: statusOptions },
                    { id: "layout", label: "Layout", options: layoutOptions }
                ]}
                sortOptions={sortOptions}
                visibleColumns={[
                    { key: "image", label: "Image", visible: !!columnsVisibility.image },
                    { key: "title", label: "Title", visible: !!columnsVisibility.title },
                    { key: "layout", label: "Layout", visible: !!columnsVisibility.layout },
                    { key: "order", label: "Order", visible: !!columnsVisibility.order },
                    { key: "status", label: "Status", visible: !!columnsVisibility.status },
                ]}
                onToggleColumn={toggleColumn}
                actions={actions}
                onClearFilters={() => {
                    setQueryParams({
                        search: "",
                        status: [],
                        layout: [],
                        page: 1
                    });
                }}
            />

            <GenericTable
                data={paginatedData}
                loading={false}
                page={page as number}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                totalItems={filteredData.length}
                onPageChange={setPage}
                onRowsPerPageChange={(r) => { setRowsPerPage(r); setPage(1); }}
                getRowId={(row) => String(row._id)}
                columns={columns}
                selectable={true}
                selectionMode="multiple"
                sortKey={sortKey}
                sortDirection={sortDirection}
                onSortChange={(key, dir) => { setSortKey(key); setSortDirection(dir); }}
                onRowClick={(row) => router.push(`/admin/hero-banners/${row._id}`)}
                getRowClass={(row) =>
                    String(row._id) === highlightedId
                        ? "bg-amber-50 dark:bg-amber-950/30 ring-1 ring-inset ring-amber-400/60 transition-all duration-1000"
                        : "transition-all duration-1000"
                }
                rowActionsBuilder={(row) => [
                    { label: "Edit", onClick: () => router.push(`/admin/hero-banners/${row._id}`) },
                    { label: "Delete Banner", onClick: () => handleDeleteBanner(String(row._id), row.title), variant: "destructive" }
                ]}
            />
        </div>
    );
}
