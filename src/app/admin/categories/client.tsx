"use client";

import React, { useState, useMemo } from "react";
import { GenericTable, ColumnConfig } from "../_components/data-table/GenericTable";
import { FiltersBar, FilterOption, SortOption } from "../_components/data-table/FiltersBar";
import { MetricsGrid, MetricItem } from "../_components/MetricsGrid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Layers, Grid2X2, Grid3X3, Hash, Trash2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteCategory } from "@/app/actions/category.actions";
import { toast } from "sonner";
import { useQueryStates, parseAsInteger, parseAsString, parseAsStringLiteral } from "nuqs";

export default function CategoriesClient({ initialData = [] }: { initialData: any[] }) {
    const [data, setData] = useState(initialData || []);
    
    // Sync with server data when revalidated
    React.useEffect(() => {
        setData(initialData);
    }, [initialData]);

    const router = useRouter();

    const [queryParams, setQueryParams] = useQueryStates({
        page: parseAsInteger.withDefault(1),
        rowsPerPage: parseAsInteger.withDefault(10),
        search: parseAsString.withDefault(""),
        sortKey: parseAsString.withDefault("name"),
        sortDirection: parseAsStringLiteral(["asc", "desc"]).withDefault("asc")
    }, {
        shallow: true
    });

    const { 
        page, 
        rowsPerPage, 
        search, 
        sortKey,
        sortDirection
    } = queryParams;

    const setPage = (p: number) => setQueryParams({ page: p });
    const setRowsPerPage = (r: number) => setQueryParams({ rowsPerPage: r, page: 1 });
    const setSearch = (s: string) => setQueryParams({ search: s, page: 1 });
    const setSortKey = (k: string) => setQueryParams({ sortKey: k });
    const setSortDirection = (d: "asc" | "desc") => setQueryParams({ sortDirection: d });

    const handleDeleteCategory = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete category "${name}"? This will remove all associated tier hierarchies. This action cannot be undone.`)) return;

        try {
            const res = await deleteCategory(id);
            if (res.success) {
                toast.success(`Category "${name}" deleted successfully`);
                setData(prev => prev.filter(c => c.id !== id));
            } else {
                toast.error(res.error || "Failed to delete category");
            }
        } catch (error) {
            toast.error("An error occurred while deleting");
        }
    };

    // Column visibility state
    const [columnsVisibility, setColumnsVisibility] = useState<Record<string, boolean>>({
        image: true,
        name: true,
        tier2Count: true,
        tier3Count: true,
        status: true,
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
                item.name.toLowerCase().includes(q) ||
                item.id.toLowerCase().includes(q)
            );
        }

        // Sort
        if (sortKey) {
            result.sort((a, b) => {
                let aValue = a[sortKey];
                let bValue = b[sortKey];

                // Compute counts dynamically if sorted by them
                if (sortKey === 'tier2Count') {
                    aValue = a.tier2?.length || 0;
                    bValue = b.tier2?.length || 0;
                }
                if (sortKey === 'tier3Count') {
                    aValue = a.tier2?.reduce((acc: number, t: any) => acc + (t.tier3?.length || 0), 0) || 0;
                    bValue = b.tier2?.reduce((acc: number, t: any) => acc + (t.tier3?.length || 0), 0) || 0;
                }

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
    }, [data, search, sortKey, sortDirection]);

    // --- PAGINATION LOGIC ---
    const paginatedData = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return filteredData.slice(start, start + rowsPerPage);
    }, [filteredData, page, rowsPerPage]);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    // --- CONFIGURATION ---
    const columns: ColumnConfig<any>[] = [
        { key: "image", label: "Image", type: "image" as const, sortable: false },
        {
            key: "name",
            label: "Category Name",
            sortable: true,
            className: "font-medium",
            render: (val: unknown, row: any) => (
                <div>
                    <div className="font-semibold text-foreground">{row.name}</div>
                    <div className="text-xs text-muted-foreground font-mono mt-0.5">{row.id}</div>
                </div>
            )
        },
        {
            key: "tier2Count",
            label: "Tier 2 Subcategories",
            sortable: true,
            className: "text-center",
            render: (val: unknown, row: any) => (
                <Badge variant="secondary" className="font-mono text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    {row.tier2?.length || 0} items
                </Badge>
            )
        },
        {
            key: "tier3Count",
            label: "Tier 3 Entities",
            sortable: true,
            className: "text-center",
            render: (val: unknown, row: any) => {
                const count = row.tier2?.reduce((acc: number, t: any) => acc + (t.tier3?.length || 0), 0) || 0;
                return (
                    <Badge variant="outline" className="font-mono text-xs">
                        {count} items
                    </Badge>
                );
            }
        },
        {
            key: "status",
            label: "Status",
            sortable: true,
            className: "text-center",
            render: (val: unknown, row: any) => (
                <Badge 
                    variant={row.status === 'active' ? 'outline' : 'secondary'}
                    className={row.status === 'active' 
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                        : "bg-slate-50 text-slate-500 border-slate-200"}
                >
                    {row.status === 'active' ? 'Active' : 'Draft'}
                </Badge>
            )
        }
    ].filter(col => columnsVisibility[String(col.key)] !== false);

    const sortOptions: SortOption[] = [
        { label: "Name (A-Z)", value: "name", direction: "asc", isActive: sortKey === "name" && sortDirection === "asc", onSelect: () => { setSortKey("name"); setSortDirection("asc"); } },
        { label: "Name (Z-A)", value: "name", direction: "desc", isActive: sortKey === "name" && sortDirection === "desc", onSelect: () => { setSortKey("name"); setSortDirection("desc"); } },
        { label: "Most Tiers 2", value: "tier2Count", direction: "desc", isActive: sortKey === "tier2Count", onSelect: () => { setSortKey("tier2Count"); setSortDirection("desc"); } },
    ];

    // --- METRICS ---
    const metrics: MetricItem[] = useMemo(() => {
        const total = data.length;
        const active = data.filter(c => c.status === 'active').length;
        const drafts = data.filter(c => c.status === 'draft').length;
        const totalItems = data.reduce((acc, row) => acc + (row.tier2?.reduce((a: number, t: any) => a + (t.tier3?.length || 0), 0) || 0), 0);

        return [
            {
                title: "Total Categories",
                value: total,
                icon: Layers,
                iconBg: "#EEF2FF",
                iconClass: "text-[#6366F1]",
            },
            {
                title: "Active Categories",
                value: active,
                icon: Grid3X3,
                iconBg: "#ECFDF5",
                iconClass: "text-[#10B981]",
            },
            {
                title: "Draft Categories",
                value: drafts,
                icon: Layers,
                iconBg: "#F3F4F6",
                iconClass: "text-[#6B7280]",
            },
            {
                title: "Total Child Nodes",
                value: totalItems,
                icon: Hash,
                iconBg: "#FFF7ED",
                iconClass: "text-[#F97316]",
            }
        ];
    }, [data]);


    const actions = [
        { label: "Add Category", icon: <Plus className="h-4 w-4" />, onClick: () => router.push("/admin/categories/create") }
    ];

    return (
        <div className="space-y-6 max-w-[100vw] overflow-x-hidden p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Categories & Hierarchy</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your Tier 1, 2, and 3 category ecosystem.
                    </p>
                </div>
                <Button onClick={() => router.push("/admin/categories/create")}>
                    <Plus className="mr-2 h-4 w-4" /> Add Category
                </Button>
            </div>

            <MetricsGrid metrics={metrics} />

            <FiltersBar
                search={search}
                onSearchChange={(s) => { setSearch(s); setPage(1); }}
                searchPlaceholder="Search category name or slug..."
                sortOptions={sortOptions}
                visibleColumns={[
                    { key: "image", label: "Image", visible: !!columnsVisibility.image },
                    { key: "name", label: "Name & ID", visible: !!columnsVisibility.name },
                    { key: "tier2Count", label: "Tier 2 Subcategories", visible: !!columnsVisibility.tier2Count },
                    { key: "tier3Count", label: "Tier 3 Subcategories", visible: !!columnsVisibility.tier3Count }
                ]}
                onToggleColumn={toggleColumn}
                actions={actions}
                onClearFilters={() => {
                    setQueryParams({
                        search: "",
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
                getRowId={(row) => String(row.id)}
                columns={columns}
                selectable={false}
                sortKey={sortKey}
                sortDirection={sortDirection}
                onSortChange={(key, dir) => { setSortKey(key); setSortDirection(dir); }}
                onRowClick={(row) => router.push(`/admin/categories/${row.id}`)}
                getRowClass={(row) => "transition-all duration-300 cursor-pointer"}
                rowActionsBuilder={(row) => [
                    { label: "Configure Hierarchy", onClick: () => router.push(`/admin/categories/${row.id}`) },
                    { label: "Delete Category", onClick: () => handleDeleteCategory(row.id, row.name), variant: "destructive" }
                ]}
            />
        </div>
    );
}
