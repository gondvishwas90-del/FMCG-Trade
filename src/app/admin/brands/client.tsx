"use client";

import React, { useState, useMemo } from "react";
import { GenericTable, ColumnConfig } from "../_components/data-table/GenericTable";
import { FiltersBar, FilterOption, SortOption } from "../_components/data-table/FiltersBar";
import { MetricsGrid, MetricItem } from "../_components/MetricsGrid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tag, Globe, Plane, PackageSearch, Trash2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IBrand } from "@/models/Brand";
import { deleteBrand } from "@/app/actions/brand.actions";
import { toast } from "sonner";
import { useQueryStates, parseAsInteger, parseAsString, parseAsArrayOf, parseAsStringLiteral } from "nuqs";

export default function BrandsClient({ initialData = [] }: { initialData: IBrand[] }) {
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
        capabilities: parseAsArrayOf(parseAsString).withDefault([]),
        country: parseAsArrayOf(parseAsString).withDefault([]),
        sortKey: parseAsString.withDefault("name"),
        sortDirection: parseAsStringLiteral(["asc", "desc"]).withDefault("asc")
    }, {
        shallow: true
    });

    const {
        page,
        rowsPerPage,
        search,
        capabilities: capabilitiesFilter,
        country: countryFilter,
        sortKey,
        sortDirection
    } = queryParams;

    const setPage = (p: number) => setQueryParams({ page: p });
    const setRowsPerPage = (r: number) => setQueryParams({ rowsPerPage: r, page: 1 });
    const setSearch = (s: string) => setQueryParams({ search: s, page: 1 });
    const setSortKey = (k: string) => setQueryParams({ sortKey: k });
    const setSortDirection = (d: "asc" | "desc") => setQueryParams({ sortDirection: d });

    const handleDeleteBrand = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete brand "${name}"? This action cannot be undone.`)) return;

        try {
            const res = await deleteBrand(id);
            if (res.success) {
                toast.success(`Brand "${name}" deleted successfully`);
                setData(prev => prev.filter(b => b.id !== id));
            } else {
                toast.error(res.error || "Failed to delete brand");
            }
        } catch (error) {
            toast.error("An error occurred while deleting");
        }
    };

    // Derived Data for Filters
    const uniqueCountries = Array.from(new Set(data.map(b => b.country).filter(Boolean)));

    // Column visibility state
    const [columnsVisibility, setColumnsVisibility] = useState<Record<string, boolean>>({
        image: true,
        name: true,
        country: true,
        skus: true,
        capabilities: true,
        status: true
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
                item.id.toLowerCase().includes(q) ||
                item.country?.toLowerCase().includes(q)
            );
        }

        // Capabilities Filter
        if (capabilitiesFilter.length > 0) {
            result = result.filter(item => {
                const caps: Record<string, boolean> = (item.tradeCapabilities as any) || {};
                // If the user selected ['exportAvailable', 'ukDistribution'],
                // we only keep the item if it satisfies ALL selected capabilities.
                return capabilitiesFilter.every(cap => caps[cap] === true);
            });
        }

        // Country Filter
        if (countryFilter.length > 0) {
            result = result.filter(item => countryFilter.includes(item.country));
        }

        // Sort
        if (sortKey) {
            result.sort((a, b) => {
                let aValue = a[sortKey as keyof IBrand] as any;
                let bValue = b[sortKey as keyof IBrand] as any;

                if (sortKey === 'skus') {
                    aValue = a.products?.length || 0;
                    bValue = b.products?.length || 0;
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
    }, [data, search, sortKey, sortDirection, capabilitiesFilter, countryFilter]);

    // --- PAGINATION LOGIC ---
    const paginatedData = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return filteredData.slice(start, start + rowsPerPage);
    }, [filteredData, page, rowsPerPage]);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    // --- CONFIGURATION ---
    const columns: ColumnConfig<any>[] = ([
        { key: "image", label: "Logo", type: "image" as const, sortable: false },
        {
            key: "name",
            label: "Brand Name",
            sortable: true,
            className: "font-medium",
            render: (val: unknown, row: IBrand) => (
                <div className="min-w-[150px]">
                    <div className="font-semibold text-foreground">{row.name}</div>
                    <div className="text-xs text-muted-foreground font-mono mt-0.5">{row.id}</div>
                </div>
            )
        },
        {
            key: "country",
            label: "Origin",
            sortable: true,
            render: (val: unknown, row: IBrand) => (
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
            key: "skus",
            label: "Registered SKUs",
            sortable: true,
            className: "text-center",
            render: (val: unknown, row: IBrand) => (
                <Badge variant="secondary" className="font-mono text-xs">
                    {row.products?.length || 0} Products
                </Badge>
            )
        },
        {
            key: "capabilities",
            label: "Trade Context",
            sortable: false,
            className: "hidden md:table-cell",
            render: (val: unknown, row: IBrand) => {
                const caps = row.tradeCapabilities;
                if (!caps) return <span className="text-muted-foreground text-xs">None mapped</span>;

                const active = [];
                if (caps.exportAvailable) active.push("Export");
                if (caps.privateLabel) active.push("Private Label");
                if (caps.ukDistribution) active.push("UK Dom.");
                if (caps.euDistribution) active.push("EU Dom.");
                if (caps.onTradeFocused) active.push("On-Trade");
                if (caps.offTradeFocused) active.push("Off-Trade");

                return (
                    <div className="flex flex-wrap gap-1.5 max-w-[180px]">
                        {active.slice(0, 3).map((lbl, i) => (
                            <span key={i} className="px-2 py-0.5 bg-muted text-muted-foreground text-[10px] uppercase font-bold tracking-widest rounded-md">
                                {lbl}
                            </span>
                        ))}
                        {active.length > 3 && (
                            <span className="px-2 py-0.5 bg-muted text-muted-foreground/60 text-[10px] uppercase font-bold tracking-widest rounded-md">
                                +{active.length - 3}
                            </span>
                        )}
                    </div>
                );
            }
        },
        {
            key: "status",
            label: "Status",
            sortable: true,
            className: "text-center",
            render: (val: unknown, row: IBrand) => (
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
    ] as ColumnConfig<any>[]).filter(col => columnsVisibility[String(col.key)] !== false);

    const sortOptions: SortOption[] = [
        { label: "Name (A-Z)", value: "name", direction: "asc", isActive: sortKey === "name" && sortDirection === "asc", onSelect: () => { setSortKey("name"); setSortDirection("asc"); } },
        { label: "Name (Z-A)", value: "name", direction: "desc", isActive: sortKey === "name" && sortDirection === "desc", onSelect: () => { setSortKey("name"); setSortDirection("desc"); } },
        { label: "Most SKUs", value: "skus", direction: "desc", isActive: sortKey === "skus", onSelect: () => { setSortKey("skus"); setSortDirection("desc"); } },
    ];

    const capabilityOptions: FilterOption[] = [
        {
            label: "Export Available",
            value: "exportAvailable",
            isActive: capabilitiesFilter.includes("exportAvailable"),
            onSelect: (v) => {
                const next = capabilitiesFilter.includes(v) ? capabilitiesFilter.filter(x => x !== v) : [...capabilitiesFilter, v];
                setQueryParams({ capabilities: next, page: 1 });
            }
        },
        {
            label: "Private Label",
            value: "privateLabel",
            isActive: capabilitiesFilter.includes("privateLabel"),
            onSelect: (v) => {
                const next = capabilitiesFilter.includes(v) ? capabilitiesFilter.filter(x => x !== v) : [...capabilitiesFilter, v];
                setQueryParams({ capabilities: next, page: 1 });
            }
        },
        {
            label: "UK Distribution",
            value: "ukDistribution",
            isActive: capabilitiesFilter.includes("ukDistribution"),
            onSelect: (v) => {
                const next = capabilitiesFilter.includes(v) ? capabilitiesFilter.filter(x => x !== v) : [...capabilitiesFilter, v];
                setQueryParams({ capabilities: next, page: 1 });
            }
        },
        {
            label: "EU Distribution",
            value: "euDistribution",
            isActive: capabilitiesFilter.includes("euDistribution"),
            onSelect: (v) => {
                const next = capabilitiesFilter.includes(v) ? capabilitiesFilter.filter(x => x !== v) : [...capabilitiesFilter, v];
                setQueryParams({ capabilities: next, page: 1 });
            }
        },
    ];

    const countryOpions: FilterOption[] = uniqueCountries.map(c => ({
        label: c,
        value: c,
        isActive: countryFilter.includes(c),
        onSelect: (v) => {
            const next = countryFilter.includes(v) ? countryFilter.filter(x => x !== v) : [...countryFilter, v];
            setQueryParams({ country: next, page: 1 });
        }
    }));

    // --- METRICS ---
    const metrics: MetricItem[] = useMemo(() => {
        const total = data.length;
        const active = data.filter(b => b.status === 'active').length;
        const drafts = data.filter(b => b.status === 'draft').length;
        const totalSkus = data.filter(b => b.status === 'active').reduce((acc, b) => acc + (b.products?.length || 0), 0);

        return [
            {
                title: "Total Brands",
                value: total,
                icon: Tag,
                iconBg: "#EEF2FF",
                iconClass: "text-[#6366F1]",
            },
            {
                title: "Active Brands",
                value: active,
                icon: PackageSearch,
                iconBg: "#ECFDF5",
                iconClass: "text-[#10B981]",
            },
            {
                title: "Draft Brands",
                value: drafts,
                icon: Tag,
                iconBg: "#F3F4F6",
                iconClass: "text-[#6B7280]",
            },
            {
                title: "Active SKUs",
                value: totalSkus,
                icon: Plane,
                iconBg: "#F0F9FF",
                iconClass: "text-[#0EA5E9]",
            }
        ];
    }, [data]);


    const actions = [
        { label: "Register New Brand", icon: <Plus className="h-4 w-4" />, onClick: () => router.push("/admin/brands/create") }
    ];

    return (
        <div className="space-y-6 w-full p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Brand Repository</h1>
                    <p className="text-muted-foreground mt-1">
                        Global portfolio mapping, trade capabilities, and SKU management.
                    </p>
                </div>
                <Button onClick={() => router.push("/admin/brands/create")} size="lg">
                    <Plus className="mr-2 h-4 w-4" /> Register Brand
                </Button>
            </div>

            <MetricsGrid metrics={metrics} />

            <FiltersBar
                search={search}
                onSearchChange={(s) => { setSearch(s); setPage(1); }}
                searchPlaceholder="Search by brand name or handle..."
                sortOptions={sortOptions}
                filterGroups={[
                    { id: "caps", label: "Trade Requirements", options: capabilityOptions },
                    { id: "countries", label: "Origin Country", options: countryOpions }
                ]}
                visibleColumns={[
                    { key: "image", label: "Logo", visible: !!columnsVisibility.image },
                    { key: "name", label: "Name & ID", visible: !!columnsVisibility.name },
                    { key: "country", label: "Origin", visible: !!columnsVisibility.country },
                    { key: "skus", label: "Products", visible: !!columnsVisibility.skus },
                    { key: "capabilities", label: "Trade Focus", visible: !!columnsVisibility.capabilities }
                ]}
                onToggleColumn={toggleColumn}
                actions={actions}
                onClearFilters={() => {
                    setQueryParams({
                        search: "",
                        capabilities: [],
                        country: [],
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
                onRowClick={(row) => router.push(`/admin/brands/${row.id}`)}
                getRowClass={() => "transition-all duration-300 cursor-pointer"}
                rowActionsBuilder={(row) => [
                    { label: "Configure Portfolio", onClick: () => router.push(`/admin/brands/${row.id}`) },
                    { label: "Delete Brand", onClick: () => handleDeleteBrand(row.id, row.name), variant: "destructive" }
                ]}
            />
        </div>
    );
}
