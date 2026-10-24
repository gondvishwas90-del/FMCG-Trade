"use client";

import React, { useState, useMemo } from "react";
import { GenericTable, ColumnConfig } from "../_components/data-table/GenericTable";
import { FiltersBar, SortOption } from "../_components/data-table/FiltersBar";
import { MetricsGrid, MetricItem } from "../_components/MetricsGrid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, Building2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IBrandOwner } from "@/models/BrandOwner";
import { deleteBrandOwner } from "@/app/actions/brand-owner.actions";
import { toast } from "sonner";
import { useQueryStates, parseAsInteger, parseAsString, parseAsStringLiteral } from "nuqs";

export default function BrandOwnersClient({ initialData = [] }: { initialData: IBrandOwner[] }) {
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

    const handleDeleteOwner = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete brand owner "${name}"? This will not delete the brands themselves but will break the linkage.`)) return;

        try {
            const res = await deleteBrandOwner(id);
            if (res.success) {
                toast.success(`Brand owner "${name}" deleted successfully`);
                setData(prev => prev.filter(b => b.id !== id));
            } else {
                toast.error(res.error || "Failed to delete brand owner");
            }
        } catch (error) {
            toast.error("An error occurred while deleting");
        }
    };


    const filteredData = useMemo(() => {
        let result = [...data];
        if (search) {
            const q = search.toLowerCase();
            result = result.filter(item =>
                item.name.toLowerCase().includes(q) ||
                item.id.toLowerCase().includes(q) ||
                (item.category && item.category.toLowerCase().includes(q))
            );
        }
        if (sortKey) {
            result.sort((a, b) => {
                let aValue = a[sortKey as keyof IBrandOwner] as any;
                let bValue = b[sortKey as keyof IBrandOwner] as any;
                if (aValue === bValue) return 0;
                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
                }
                return 0;
            });
        }
        return result;
    }, [data, search, sortKey, sortDirection]);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return filteredData.slice(start, start + rowsPerPage);
    }, [filteredData, page, rowsPerPage]);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const columns: ColumnConfig<any>[] = [
        { key: "logo", label: "Logo", type: "image" as const, sortable: false },
        {
            key: "name",
            label: "Owner Name",
            sortable: true,
            className: "font-medium",
            render: (val: unknown, row: IBrandOwner) => (
                <div className="min-w-[150px]">
                    <div className="font-semibold text-foreground">{row.name}</div>
                    <div className="text-xs text-muted-foreground font-mono mt-0.5">{row.id}</div>
                </div>
            )
        },
        {
            key: "category",
            label: "Category",
            sortable: true,
            render: (val: unknown, row: IBrandOwner) => (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary/60 text-secondary-foreground">
                    {row.category || 'General'}
                </span>
            )
        },
        {
            key: "country",
            label: "HQ Location",
            sortable: true,
            render: (val: unknown, row: IBrandOwner) => (
                <div className="flex items-center gap-2">
                    {row.countryCode && (
                        <span className="relative w-5 h-5 rounded-full overflow-hidden bg-muted flex-none border shadow-sm flex items-center justify-center text-[10px]">
                             {row.countryCode.length === 2 ? (
                                <Image 
                                    src={`https://flagcdn.com/w20/${row.countryCode.toLowerCase() === 'uk' ? 'gb' : row.countryCode.toLowerCase()}.png`} 
                                    alt={row.country || "Flag"} 
                                    fill
                                    sizes="20px"
                                    className="object-cover" 
                                />
                            ) : row.countryCode}
                        </span>
                    )}
                    <span className="text-sm font-medium">{row.country || 'Global'}</span>
                </div>
            )
        },
        {
            key: "website",
            label: "Corporate Site",
            sortable: false,
            render: (val: unknown, row: IBrandOwner) => (
                row.website ? (
                    <a href={row.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">
                        Visit Site
                    </a>
                ) : <span className="text-muted-foreground text-xs">N/A</span>
            )
        },
        {
            key: "status",
            label: "Status",
            sortable: true,
            className: "text-center",
            render: (val: unknown, row: IBrandOwner) => (
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
    ];

    const sortOptions: SortOption[] = [
        { label: "Name (A-Z)", value: "name", direction: "asc", isActive: sortKey === "name" && sortDirection === "asc", onSelect: () => { setSortKey("name"); setSortDirection("asc"); } },
        { label: "Name (Z-A)", value: "name", direction: "desc", isActive: sortKey === "name" && sortDirection === "desc", onSelect: () => { setSortKey("name"); setSortDirection("desc"); } },
    ];

    const metrics: MetricItem[] = useMemo(() => {
        return [
            {
                title: "Total Brand Owners",
                value: data.length,
                icon: Building2,
                iconBg: "#EEF2FF",
                iconClass: "text-[#6366F1]",
            },
            {
                title: "Active Jurisdictions",
                value: new Set(data.map(d => d.country)).size,
                icon: Globe,
                iconBg: "#ECFDF5",
                iconClass: "text-[#10B981]",
            }
        ];
    }, [data]);

    const actions = [
        { label: "Add Brand Owner", icon: <Plus className="h-4 w-4" />, onClick: () => router.push("/admin/brand-owners/create") }
    ];

    return (
        <div className="space-y-6 w-full p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Brand Owners</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage corporate entities and parent companies in the portfolio.
                    </p>
                </div>
                <Button onClick={() => router.push("/admin/brand-owners/create")} size="lg">
                    <Plus className="mr-2 h-4 w-4" /> Add Owner
                </Button>
            </div>

            <MetricsGrid metrics={metrics} />

            <FiltersBar
                search={search}
                onSearchChange={(s) => { setSearch(s); setPage(1); }}
                searchPlaceholder="Search by corporate name..."
                sortOptions={sortOptions}
                filterGroups={[]}
                visibleColumns={[
                    { key: "logo", label: "Logo", visible: true },
                    { key: "name", label: "Name", visible: true },
                    { key: "category", label: "Category", visible: true },
                    { key: "country", label: "HQ", visible: true },
                    { key: "website", label: "Website", visible: true }
                ]}
                onToggleColumn={() => {}}
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
                onRowClick={(row) => router.push(`/admin/brand-owners/${row.id}`)}
                getRowClass={() => "transition-all duration-300 cursor-pointer"}
                rowActionsBuilder={(row) => [
                    { label: "Edit Profile", onClick: () => router.push(`/admin/brand-owners/${row.id}`) },
                    { label: "Delete Owner", onClick: () => handleDeleteOwner(row.id, row.name), variant: "destructive" }
                ]}
            />
        </div>
    );
}
