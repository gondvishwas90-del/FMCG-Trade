"use client";

import React, { useState, useMemo, useEffect } from "react";
import { GenericTable, ColumnConfig } from "../_components/data-table/GenericTable";
import { FiltersBar, FilterOption, SortOption } from "../_components/data-table/FiltersBar";
import { MetricsGrid, MetricItem } from "../_components/MetricsGrid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Tag, CheckCircle, FileText, Clock, Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useQueryStates, parseAsInteger, parseAsString, parseAsArrayOf, parseAsStringLiteral } from "nuqs";
import { deleteUKDomesticTradeOffer } from "@/app/actions/uk-domestic-trade-offers";

// Types matching the backend data
interface UKDomesticTradeOffer {
    _id: string;
    title: string;
    sizes: string[];
    market: string[];
    category: string[];
    availability: string;
    image: string;
    types: string[];
    price?: string;
    status: 'active' | 'draft';
    notes?: string[];
}

interface UKDomesticTradeOffersClientProps {
    initialData: UKDomesticTradeOffer[];
}

export default function UKDomesticTradeOffersClient({ initialData }: UKDomesticTradeOffersClientProps) {
    const [data, setData] = useState<UKDomesticTradeOffer[]>(initialData);

    // Sync with server data when revalidated
    useEffect(() => {
        setData(initialData);
    }, [initialData]);

    const router = useRouter();
    const searchParams = useSearchParams();

    const [queryParams, setQueryParams] = useQueryStates({
        page: parseAsInteger.withDefault(1),
        rowsPerPage: parseAsInteger.withDefault(10),
        search: parseAsString.withDefault(""),
        availability: parseAsArrayOf(parseAsString).withDefault([]),
        category: parseAsArrayOf(parseAsString).withDefault([]),
        sortKey: parseAsString.withDefault("title"),
        sortDirection: parseAsStringLiteral(["asc", "desc"]).withDefault("asc")
    }, {
        shallow: true
    });

    const { 
        page, 
        rowsPerPage, 
        search, 
        availability: availabilityFilter, 
        category: categoryFilter,
        sortKey,
        sortDirection
    } = queryParams;

    const setPage = (p: number) => setQueryParams({ page: p });
    const setRowsPerPage = (r: number) => setQueryParams({ rowsPerPage: r, page: 1 });
    const setSearch = (s: string) => setQueryParams({ search: s, page: 1 });
    const setSortKey = (k: string) => setQueryParams({ sortKey: k });
    const setSortDirection = (d: "asc" | "desc") => setQueryParams({ sortDirection: d });
    const updatedId = searchParams.get("updated");

    const handleDeleteOffer = async (id: string, title: string) => {
        if (!confirm(`Are you sure you want to delete offer "${title}"? This action cannot be undone.`)) return;

        try {
            const res = await deleteUKDomesticTradeOffer(id);
            if (res.success) {
                toast.success(`Offer "${title}" deleted successfully`);
                setData(prev => prev.filter(o => o._id !== id));
            } else {
                toast.error(res.error || "Failed to delete offer");
            }
        } catch (error) {
            toast.error("An error occurred while deleting");
        }
    };

    // Auto-clear the highlight after 4 seconds
    const [highlightedId, setHighlightedId] = useState<string | null>(updatedId);
    useEffect(() => {
        if (updatedId) {
            // Find the offer title for a more descriptive toast
            const offer = initialData.find(o => o._id === updatedId);
            toast.success(
                offer ? `"${offer.title}" updated successfully` : "UK Domestic Trade Offer updated successfully",
                { description: "The offer has been moved to the top of the list." }
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
        category: true,
        market: true,
        status: true,
        availability: true,
        types: true,
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
                item.category.some(c => c.toLowerCase().includes(q)) ||
                item.market.some(m => m.toLowerCase().includes(q))
            );
        }

        // Availability Filter
        if (availabilityFilter.length > 0) {
            result = result.filter(item => availabilityFilter.includes(item.availability));
        }

        // Category Filter
        if (categoryFilter.length > 0) {
            result = result.filter(item => item.category.some(c => categoryFilter.includes(c)));
        }

        // Sort
        if (sortKey) {
            result.sort((a, b) => {
                const aValue = a[sortKey as keyof UKDomesticTradeOffer];
                const bValue = b[sortKey as keyof UKDomesticTradeOffer];

                if (aValue === bValue) return 0;

                // Handle array sorting (e.g. category) by first element
                if (Array.isArray(aValue) && Array.isArray(bValue)) {
                    const aFirst = aValue[0] || "";
                    const bFirst = bValue[0] || "";
                    return sortDirection === "asc" ? aFirst.localeCompare(bFirst) : bFirst.localeCompare(aFirst);
                }

                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return sortDirection === "asc"
                        ? aValue.localeCompare(bValue)
                        : bValue.localeCompare(aValue);
                }

                return 0;
            });
        }

        return result;
    }, [data, search, availabilityFilter, categoryFilter, sortKey, sortDirection]);

    // --- PAGINATION LOGIC ---
    const paginatedData = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        let sliced = filteredData.slice(start, start + rowsPerPage);

        // Pin the recently updated offer to the top of page 1
        if (updatedId && page === 1) {
            const updatedIndex = sliced.findIndex(item => item._id === updatedId);
            if (updatedIndex > 0) {
                const [updated] = sliced.splice(updatedIndex, 1);
                sliced = [updated, ...sliced];
            } else if (updatedIndex === -1) {
                // It might be on another page — pull it from the full filteredData
                const globalIndex = filteredData.findIndex(item => item._id === updatedId);
                if (globalIndex !== -1) {
                    sliced = [filteredData[globalIndex], ...sliced.slice(0, rowsPerPage - 1)];
                }
            }
        }

        return sliced;
    }, [filteredData, page, rowsPerPage, updatedId]);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    // --- CONFIGURATION ---
    const columns: ColumnConfig<UKDomesticTradeOffer>[] = [
        { key: "image", label: "Image", type: "image" as const, sortable: false },
        {
            key: "title",
            label: "Title",
            sortable: true,
            className: "font-medium",
            render: (val: unknown, row: UKDomesticTradeOffer) => (
                <div>
                    <div className="font-semibold text-foreground">{row.title}</div>
                    <div className="text-xs text-muted-foreground">{row.sizes.join(", ")}</div>
                </div>
            )
        },
        {
            key: "category",
            label: "Category",
            sortable: true,
            render: (val: unknown) => {
                const values = Array.isArray(val) ? val : [String(val)];
                return (
                    <div className="flex flex-wrap gap-1">
                        {values.map((v, i) => (
                            <Badge key={i} variant="secondary" className="font-normal">
                                {v}
                            </Badge>
                        ))}
                    </div>
                );
            }
        },
        {
            key: "market",
            label: "Market",
            sortable: true,
            className: "hidden md:table-cell",
            render: (val: unknown) => {
                const values = Array.isArray(val) ? val : [String(val)];
                return values.join(", ");
            }
        },
        {
            key: "availability",
            label: "Availability",
            type: "badge" as const,
            sortable: true,
            render: (val: unknown) => {
                const available = val === "Ongoing" || val === "Available";
                return (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${available ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}>
                        {String(val)}
                    </span>
                )
            }
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

    // Generate dynamic options for filters based on data
    const availabilityOptions: FilterOption[] = useMemo(() => {
        const unique = Array.from(new Set(data.map(i => i.availability)));
        return unique.map(av => ({
            label: av,
            value: av,
            isActive: availabilityFilter.includes(av),
            onSelect: (val) => {
                const next = availabilityFilter.includes(val) 
                    ? availabilityFilter.filter(p => p !== val) 
                    : [...availabilityFilter, val];
                setQueryParams({ availability: next, page: 1 });
            }
        }));
    }, [data, availabilityFilter, setQueryParams]);

    const categoryOptions: FilterOption[] = useMemo(() => {
        const unique = Array.from(new Set(data.flatMap(i => i.category)));
        return unique.map(c => ({
            label: c,
            value: c,
            isActive: categoryFilter.includes(c),
            onSelect: (val) => {
                const next = categoryFilter.includes(val)
                    ? categoryFilter.filter(p => p !== val)
                    : [...categoryFilter, val];
                setQueryParams({ category: next, page: 1 });
            }
        }));
    }, [data, categoryFilter, setQueryParams]);


    const sortOptions: SortOption[] = [
        { label: "Title (A-Z)", value: "title", direction: "asc", isActive: sortKey === "title" && sortDirection === "asc", onSelect: () => { setSortKey("title"); setSortDirection("asc"); } },
        { label: "Title (Z-A)", value: "title", direction: "desc", isActive: sortKey === "title" && sortDirection === "desc", onSelect: () => { setSortKey("title"); setSortDirection("desc"); } },
        { label: "Availability", value: "availability", direction: "asc", isActive: sortKey === "availability" && sortDirection === "asc", onSelect: () => { setSortKey("availability"); setSortDirection("asc"); } },
    ];

    const actions = [
        { label: "Add New Offer", icon: <Plus className="h-4 w-4" />, onClick: () => router.push("/admin/uk-domestic-trade-offers/create") }
    ];

    // --- METRICS ---
    const metrics: MetricItem[] = useMemo(() => {
        const total = data.length;
        const active = data.filter(i => i.status === 'active').length;
        const drafts = data.filter(i => i.status === 'draft').length;
        const ongoing = data.filter(i => i.availability === 'Ongoing').length;

        return [
            {
                title: "Total Offers",
                value: total,
                icon: FileText,
                iconBg: "#EEF2FF", // Light Indigo
                iconClass: "text-[#6366F1]", // Indigo
            },
            {
                title: "Active Offers",
                value: active,
                icon: CheckCircle,
                iconBg: "#ECFDF5", // Light Emerald
                iconClass: "text-[#10B981]", // Emerald
            },
            {
                title: "Draft Offers",
                value: drafts,
                icon: Tag,
                iconBg: "#F3F4F6", // Light Gray
                iconClass: "text-[#6B7280]", // Gray
            },
            {
                title: "Ongoing Offers",
                value: ongoing,
                icon: Clock,
                iconBg: "#FFF7ED", // Light Orange
                iconClass: "text-[#F97316]", // Orange
            }
        ];
    }, [data]);

    return (
        <div className="space-y-6 max-w-[100vw] overflow-x-hidden p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">UK Domestic Trade Offers</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage UK domestic trade offers and opportunities.
                    </p>
                </div>
                <Button onClick={() => router.push("/admin/uk-domestic-trade-offers/create")}>
                    <Plus className="mr-2 h-4 w-4" /> Add Offer
                </Button>
            </div>

            <MetricsGrid metrics={metrics} />

            <FiltersBar
                search={search}
                onSearchChange={(s) => { setSearch(s); setPage(1); }}
                searchPlaceholder="Search offers..."
                filters={categoryOptions.length < 5 ? categoryOptions : []} // Show categories as flat filters if few
                filterGroups={[
                    { id: "availability", label: "Availability", options: availabilityOptions },
                    { id: "category", label: "Category", options: categoryOptions }
                ]}
                sortOptions={sortOptions}
                visibleColumns={[
                    { key: "image", label: "Image", visible: !!columnsVisibility.image },
                    { key: "title", label: "Title", visible: !!columnsVisibility.title },
                    { key: "category", label: "Category", visible: !!columnsVisibility.category },
                    { key: "market", label: "Market", visible: !!columnsVisibility.market },
                    { key: "status", label: "Status", visible: !!columnsVisibility.status },
                    { key: "availability", label: "Availability", visible: !!columnsVisibility.availability },
                ]}
                onToggleColumn={toggleColumn}
                actions={actions}
                onClearFilters={() => {
                    setQueryParams({
                        search: "",
                        availability: [],
                        category: [],
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
                getRowId={(row) => row._id}
                columns={columns}
                selectable={true}
                selectionMode="multiple"
                onSelectionChange={(selected) => console.log("Selected:", selected)}
                sortKey={sortKey}
                sortDirection={sortDirection}
                onSortChange={(key, dir) => { setSortKey(key); setSortDirection(dir); }}
                onRowClick={(row) => router.push(`/admin/uk-domestic-trade-offers/${row._id}`)}
                getRowClass={(row) =>
                    row._id === highlightedId
                        ? "bg-amber-50 dark:bg-amber-950/30 ring-1 ring-inset ring-amber-400/60 transition-all duration-1000"
                        : "transition-all duration-1000"
                }
                rowActionsBuilder={(row) => [
                    { label: "Edit", onClick: () => router.push(`/admin/uk-domestic-trade-offers/${row._id}`) },
                    { label: "Delete Offer", onClick: () => handleDeleteOffer(row._id, row.title), variant: "destructive" }
                ]}
            />
        </div>
    );
}
