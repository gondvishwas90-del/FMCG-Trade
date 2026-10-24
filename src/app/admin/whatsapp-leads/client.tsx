"use client";

import React, { useState, useMemo, useEffect } from "react";
import { GenericTable, ColumnConfig } from "../_components/data-table/GenericTable";
import { FiltersBar, FilterOption, SortOption } from "../_components/data-table/FiltersBar";
import { MetricsGrid, MetricItem } from "../_components/MetricsGrid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    MessageSquare,
    Phone,
    Mail,
    User,
    CheckCircle,
    Clock,
    AlertTriangle,
    Trash2,
    ExternalLink,
    Eye,
    XCircle,
    Send,
} from "lucide-react";
import { toast } from "sonner";
import { useQueryStates, parseAsInteger, parseAsString, parseAsArrayOf, parseAsStringLiteral } from "nuqs";
import { deleteLead, deleteLeads } from "@/app/actions/leads";

// Types matching the Lead model
interface Lead {
    _id: string;
    name: string;
    phone?: string;
    email?: string;
    message: string;
    source: string;
    whatsappStatus: 'pending' | 'sent' | 'template_sent' | 'delivered' | 'read' | 'failed';
    whatsappMessageId?: string;
    whatsappError?: string;
    createdAt: string;
    updatedAt: string;
}

interface WhatsAppLeadsClientProps {
    initialData: Lead[];
}

// Status config for consistent colors and icons
const STATUS_CONFIG: Record<string, { label: string; color: string; bgColor: string; icon: React.ElementType }> = {
    pending:       { label: "Pending",       color: "text-yellow-700", bgColor: "bg-yellow-100", icon: Clock },
    sent:          { label: "Sent",          color: "text-blue-700",   bgColor: "bg-blue-100",   icon: Send },
    template_sent: { label: "Template Sent", color: "text-indigo-700", bgColor: "bg-indigo-100", icon: Send },
    delivered:     { label: "Delivered",     color: "text-emerald-700",bgColor: "bg-emerald-100",icon: CheckCircle },
    read:          { label: "Read",          color: "text-green-700",  bgColor: "bg-green-100",  icon: Eye },
    failed:        { label: "Failed",        color: "text-red-700",    bgColor: "bg-red-100",    icon: XCircle },
};

export default function WhatsAppLeadsClient({ initialData }: WhatsAppLeadsClientProps) {
    const [data, setData] = useState<Lead[]>(initialData);

    useEffect(() => {
        setData(initialData);
    }, [initialData]);

    // Expanded row state for viewing full message
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const [queryParams, setQueryParams] = useQueryStates({
        page: parseAsInteger.withDefault(1),
        rowsPerPage: parseAsInteger.withDefault(10),
        search: parseAsString.withDefault(""),
        status: parseAsArrayOf(parseAsString).withDefault([]),
        sortKey: parseAsString.withDefault("createdAt"),
        sortDirection: parseAsStringLiteral(["asc", "desc"]).withDefault("desc"),
    }, {
        shallow: true,
    });

    const {
        page,
        rowsPerPage,
        search,
        status: statusFilter,
        sortKey,
        sortDirection,
    } = queryParams;

    const setPage = (p: number) => setQueryParams({ page: p });
    const setRowsPerPage = (r: number) => setQueryParams({ rowsPerPage: r, page: 1 });
    const setSearch = (s: string) => setQueryParams({ search: s, page: 1 });
    const setSortKey = (k: string) => setQueryParams({ sortKey: k });
    const setSortDirection = (d: "asc" | "desc") => setQueryParams({ sortDirection: d });

    // --- Delete Handler ---
    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Delete the inquiry from "${name}"? This cannot be undone.`)) return;
        try {
            const res = await deleteLead(id);
            if (res.success) {
                toast.success(`Lead from "${name}" deleted`);
                setData(prev => prev.filter(l => l._id !== id));
            } else {
                toast.error(res.error || "Failed to delete lead");
            }
        } catch {
            toast.error("An error occurred while deleting");
        }
    };

    // --- FILTER & SORT ---
    const filteredData = useMemo(() => {
        let result = [...data];

        if (search) {
            const q = search.toLowerCase();
            result = result.filter(item =>
                item.name.toLowerCase().includes(q) ||
                (item.phone || '').toLowerCase().includes(q) ||
                (item.email || '').toLowerCase().includes(q) ||
                item.message.toLowerCase().includes(q)
            );
        }

        if (statusFilter.length > 0) {
            result = result.filter(item => statusFilter.includes(item.whatsappStatus));
        }

        if (sortKey) {
            result.sort((a, b) => {
                const aVal = a[sortKey as keyof Lead] ?? '';
                const bVal = b[sortKey as keyof Lead] ?? '';

                if (sortKey === 'createdAt' || sortKey === 'updatedAt') {
                    const timeA = aVal ? new Date(aVal as string).getTime() : 0;
                    const timeB = bVal ? new Date(bVal as string).getTime() : 0;
                    const validA = isNaN(timeA) ? 0 : timeA;
                    const validB = isNaN(timeB) ? 0 : timeB;
                    
                    return sortDirection === "asc"
                        ? validA - validB
                        : validB - validA;
                }

                if (typeof aVal === 'string' && typeof bVal === 'string') {
                    return sortDirection === "asc"
                        ? aVal.localeCompare(bVal)
                        : bVal.localeCompare(aVal);
                }
                return 0;
            });
        }

        return result;
    }, [data, search, statusFilter, sortKey, sortDirection]);

    // --- PAGINATION ---
    const paginatedData = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return filteredData.slice(start, start + rowsPerPage);
    }, [filteredData, page, rowsPerPage]);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    // --- COLUMNS ---
    const columns: ColumnConfig<Lead>[] = [
        {
            key: "name",
            label: "Contact",
            sortable: true,
            render: (_val: unknown, row: Lead) => (
                <div className="min-w-[140px]">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-muted-foreground" />
                        {row.name || "Unknown"}
                    </div>
                    {row.phone && (
                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3" />
                            {row.phone}
                        </div>
                    )}
                    {row.email && (
                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Mail className="w-3 h-3" />
                            {row.email}
                        </div>
                    )}
                </div>
            ),
        },
        {
            key: "message",
            label: "Message",
            sortable: false,
            render: (_val: unknown, row: Lead) => (
                <div className="max-w-[300px]">
                    <p className="text-sm text-foreground/80 truncate">{row.message || "No message"}</p>
                </div>
            ),
        },
        {
            key: "whatsappStatus",
            label: "Status",
            sortable: true,
            render: (val: unknown) => {
                const status = STATUS_CONFIG[val as string] || STATUS_CONFIG.pending;
                const Icon = status.icon;
                return (
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.color}`}>
                        <Icon className="w-3.5 h-3.5" />
                        {status.label}
                    </span>
                );
            },
        },
        {
            key: "createdAt",
            label: "Received",
            sortable: true,
            className: "hidden md:table-cell",
            render: (val: unknown) => {
                if (!val) return <span className="text-muted-foreground">-</span>;
                const date = new Date(val as string);
                if (isNaN(date.getTime())) return <span className="text-muted-foreground">-</span>;

                const now = new Date();
                const diffMs = now.getTime() - date.getTime();
                const diffMins = Math.floor(diffMs / 60000);
                const diffHours = Math.floor(diffMs / 3600000);
                const diffDays = Math.floor(diffMs / 86400000);

                let relative = '';
                if (diffMins < 1) relative = 'Just now';
                else if (diffMins < 60) relative = `${diffMins}m ago`;
                else if (diffHours < 24) relative = `${diffHours}h ago`;
                else if (diffDays < 7) relative = `${diffDays}d ago`;
                else relative = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

                return (
                    <div>
                        <div className="text-sm text-foreground">{relative}</div>
                        <div className="text-xs text-muted-foreground">
                            {date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                );
            },
        },
    ];

    // --- FILTER OPTIONS ---
    const statusOptions: FilterOption[] = useMemo(() => {
        const statuses = ['pending', 'sent', 'template_sent', 'delivered', 'read', 'failed'];
        return statuses
            .filter(s => data.some(d => d.whatsappStatus === s))
            .map(s => ({
                label: STATUS_CONFIG[s]?.label || s,
                value: s,
                isActive: statusFilter.includes(s),
                onSelect: (val: string) => {
                    const next = statusFilter.includes(val)
                        ? statusFilter.filter(p => p !== val)
                        : [...statusFilter, val];
                    setQueryParams({ status: next, page: 1 });
                },
            }));
    }, [data, statusFilter, setQueryParams]);

    const sortOptions: SortOption[] = [
        { label: "Newest First", value: "createdAt", direction: "desc", isActive: sortKey === "createdAt" && sortDirection === "desc", onSelect: () => { setSortKey("createdAt"); setSortDirection("desc"); } },
        { label: "Oldest First", value: "createdAt", direction: "asc", isActive: sortKey === "createdAt" && sortDirection === "asc", onSelect: () => { setSortKey("createdAt"); setSortDirection("asc"); } },
        { label: "Name (A-Z)", value: "name", direction: "asc", isActive: sortKey === "name" && sortDirection === "asc", onSelect: () => { setSortKey("name"); setSortDirection("asc"); } },
        { label: "Name (Z-A)", value: "name", direction: "desc", isActive: sortKey === "name" && sortDirection === "desc", onSelect: () => { setSortKey("name"); setSortDirection("desc"); } },
    ];

    // --- METRICS ---
    const metrics: MetricItem[] = useMemo(() => {
        const total = data.length;
        const delivered = data.filter(l => l.whatsappStatus === 'delivered' || l.whatsappStatus === 'read').length;
        const pending = data.filter(l => l.whatsappStatus === 'pending').length;
        const failed = data.filter(l => l.whatsappStatus === 'failed').length;

        return [
            {
                title: "Total Leads",
                value: total,
                icon: MessageSquare,
                iconBg: "#EEF2FF",
                iconClass: "text-[#6366F1]",
            },
            {
                title: "Delivered",
                value: delivered,
                icon: CheckCircle,
                iconBg: "#ECFDF5",
                iconClass: "text-[#10B981]",
            },
            {
                title: "Pending",
                value: pending,
                icon: Clock,
                iconBg: "#FFF7ED",
                iconClass: "text-[#F97316]",
            },
            {
                title: "Failed",
                value: failed,
                icon: AlertTriangle,
                iconBg: "#FEF2F2",
                iconClass: "text-[#EF4444]",
            },
        ];
    }, [data]);

    return (
        <div className="space-y-6 max-w-[100vw] overflow-x-hidden p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">WhatsApp Leads</h1>
                    <p className="text-muted-foreground mt-1">
                        All inquiries received through the WhatsApp chat widget.
                    </p>
                </div>
            </div>

            <MetricsGrid metrics={metrics} />

            <FiltersBar
                search={search}
                onSearchChange={(s) => { setSearch(s); setPage(1); }}
                searchPlaceholder="Search by name, phone, email, or message..."
                filters={[]}
                filterGroups={[
                    { id: "status", label: "Status", options: statusOptions },
                ]}
                sortOptions={sortOptions}
                visibleColumns={[
                    { key: "name", label: "Contact", visible: true },
                    { key: "message", label: "Message", visible: true },
                    { key: "whatsappStatus", label: "Status", visible: true },
                    { key: "createdAt", label: "Received", visible: true },
                ]}
                onToggleColumn={() => {}}
                actions={[]}
                onClearFilters={() => {
                    setQueryParams({
                        search: "",
                        status: [],
                        page: 1,
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
                expandable={true}
                renderExpandedContent={(row) => (
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Full Message */}
                            <div className="space-y-2">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Message</h4>
                                <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
                                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{row.message || "No message"}</p>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Details</h4>
                                <div className="space-y-2 text-sm">
                                    {row.phone && (
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Phone</span>
                                            <a
                                                href={`https://wa.me/${row.phone.replace(/[^0-9]/g, '')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-emerald-600 hover:underline flex items-center gap-1 font-medium"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {row.phone}
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </div>
                                    )}
                                    {row.email && (
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Email</span>
                                            <a
                                                href={`mailto:${row.email}`}
                                                className="text-blue-600 hover:underline flex items-center gap-1 font-medium"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {row.email}
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </div>
                                    )}
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Status</span>
                                        <span>{STATUS_CONFIG[row.whatsappStatus]?.label || row.whatsappStatus}</span>
                                    </div>
                                    {row.whatsappMessageId && (
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Message ID</span>
                                            <span className="text-xs font-mono truncate max-w-[200px]">{row.whatsappMessageId}</span>
                                        </div>
                                    )}
                                    {row.whatsappError && (
                                        <div className="mt-2 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                                            <p className="text-xs text-red-700 dark:text-red-400 font-medium">Error: {row.whatsappError}</p>
                                        </div>
                                    )}
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Received</span>
                                        <span>{row.createdAt && !isNaN(new Date(row.createdAt).getTime()) ? new Date(row.createdAt).toLocaleString('en-GB') : '-'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                rowActionsBuilder={(row) => {
                    const actions = [];
                    if (row.phone) {
                        actions.push({
                            label: "WhatsApp",
                            onClick: () => {
                                const cleanPhone = row.phone!.replace(/[^0-9]/g, '');
                                window.open(`https://wa.me/${cleanPhone}`, '_blank');
                            },
                            icon: <ExternalLink className="w-3 h-3" />,
                        });
                    }
                    if (row.email) {
                        actions.push({
                            label: "Email",
                            onClick: () => {
                                window.open(`mailto:${row.email}`, '_blank');
                            },
                            icon: <Mail className="w-3 h-3" />,
                        });
                    }
                    actions.push({
                        label: "Delete",
                        onClick: () => handleDelete(row._id, row.name),
                        danger: true,
                        icon: <Trash2 className="w-3 h-3" />,
                    });
                    return actions;
                }}
            />
        </div>
    );
}
