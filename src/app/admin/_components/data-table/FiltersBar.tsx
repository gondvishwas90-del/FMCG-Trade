import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    Search,
    Filter,
    ArrowUpDown,
    Columns,
    MoreHorizontal,
    X,
    Check,
    ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export interface FilterOption {
    label: string;
    value: string;
    onSelect: (value: string) => void;
    isActive?: boolean;
    icon?: React.ReactNode;
}

export interface SortOption {
    label: string;
    value: string;
    onSelect: (value: string) => void;
    isActive?: boolean;
    direction?: "asc" | "desc";
}

interface ColumnItem {
    key: string;
    label: string;
    visible: boolean;
}

interface ActionItem {
    label: string;
    icon: React.ReactNode;
    danger?: boolean;
    disabled?: boolean;
    onClick: () => void;
}

export interface FilterGroup {
    id: string;
    label?: string;
    options: FilterOption[];
}

interface FiltersBarProps {
    search: string;
    onSearchChange: (value: string) => void;

    // Support both flat and grouped filters
    filters?: FilterOption[];
    filterGroups?: FilterGroup[];

    sortOptions: SortOption[];

    visibleColumns: ColumnItem[];
    onToggleColumn: (key: string) => void;

    actions: ActionItem[];

    onClearFilters?: () => void;

    /** Optional placeholder for search */
    searchPlaceholder?: string;

    /** Optional custom content (e.g. location selector) */
    customContent?: React.ReactNode;

    /** Optional extra content to render inside the expandable filter panel */
    extraFilterContent?: React.ReactNode;
}

const FiltersBar: React.FC<FiltersBarProps> = ({
    search,
    onSearchChange,
    filters = [],
    filterGroups = [],
    sortOptions,
    visibleColumns,
    onToggleColumn,
    actions,
    onClearFilters,
    searchPlaceholder = "Search",
    customContent,
    extraFilterContent,
}) => {
    const [showFilters, setShowFilters] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dragY, setDragY] = useState(0);
    const startY = useRef(0);
    const isDragging = useRef(false);

    // Debounced search state
    const [localSearch, setLocalSearch] = useState(search);

    useEffect(() => {
        setLocalSearch(search);
    }, [search]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (localSearch !== search) onSearchChange(localSearch);
        }, 300);

        return () => clearTimeout(timeout);
    }, [localSearch, search, onSearchChange]);

    const activeFiltersCount = useMemo(() => {
        let count = filters.filter((f) => f.isActive).length;
        filterGroups.forEach((group) => {
            count += group.options.filter((f) => f.isActive).length;
        });
        return count;
    }, [filters, filterGroups]);

    const activeSort = useMemo(
        () => sortOptions.find((s) => s.isActive),
        [sortOptions]
    );

    // TOUCH HANDLERS FOR MOBILE DRAWER
    const handleTouchStart = (e: React.TouchEvent) => {
        startY.current = e.touches[0].clientY;
        isDragging.current = true;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging.current) return;
        const currentY = e.touches[0].clientY;
        const diff = currentY - startY.current;
        if (diff > 0) setDragY(diff * 0.6);
    };

    const handleTouchEnd = () => {
        isDragging.current = false;
        if (dragY > 120) setMobileOpen(false);
        setDragY(0);
    };

    const handleShowAllColumns = () => {
        const hiddenCols = visibleColumns.filter((c) => !c.visible);
        hiddenCols.forEach((c) => onToggleColumn(c.key));
    };

    const handleHideAllColumns = () => {
        const visible = visibleColumns.filter((c) => c.visible);
        visible.forEach((c) => onToggleColumn(c.key));
    };

    return (
        <>
            {/* TOP BAR */}
            <div className="mb-4 flex items-center justify-between gap-4 flex-nowrap">
                {/* SEARCH */}
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            value={localSearch}
                            onChange={(e) => setLocalSearch(e.target.value)}
                            placeholder={searchPlaceholder}
                            className="pl-9 pr-9 bg-background"
                        />
                        {localSearch && (
                            <button
                                type="button"
                                onClick={() => {
                                    setLocalSearch("");
                                    onSearchChange("");
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* CUSTOM CONTENT (e.g. Location Selector) */}
                {customContent && (
                    <div className="hidden md:block">
                        {customContent}
                    </div>
                )}

                {/* DESKTOP BUTTONS */}
                <div className="hidden md:flex items-center gap-2">
                    {/* FILTER TOGGLE */}
                    <Button
                        variant={showFilters || activeFiltersCount > 0 ? "secondary" : "outline"}
                        size="icon"
                        onClick={() => setShowFilters(!showFilters)}
                        className="relative"
                        title="Toggle Filters"
                    >
                        <Filter className="h-4 w-4" />
                        {activeFiltersCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center border border-background">
                                {activeFiltersCount}
                            </span>
                        )}
                    </Button>

                    {/* SORT */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" title="Sort">
                                <ArrowUpDown className={`h-4 w-4 ${activeSort ? "text-primary" : ""}`} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px]">
                            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {sortOptions.map((item) => (
                                <DropdownMenuItem
                                    key={item.label}
                                    onClick={() => item.onSelect(item.value)}
                                    className="justify-between"
                                >
                                    <span className={item.isActive ? "font-medium" : ""}>{item.label}</span>
                                    {item.isActive && (
                                        <div className="flex items-center text-xs text-muted-foreground">
                                            {item.direction && (
                                                <span className="uppercase mr-1">{item.direction}</span>
                                            )}
                                            <ArrowUpDown className="h-3 w-3" />
                                        </div>
                                    )}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* COLUMNS */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" title="Visible Columns">
                                <Columns className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px]">
                            <div className="flex items-center justify-between px-2 py-1.5">
                                <span className="text-sm font-semibold">Columns</span>
                                <div className="flex gap-1">
                                    <button onClick={handleShowAllColumns} className="text-[10px] text-muted-foreground hover:text-foreground">Show all</button>
                                    <button onClick={handleHideAllColumns} className="text-[10px] text-muted-foreground hover:text-foreground">Hide all</button>
                                </div>
                            </div>
                            <DropdownMenuSeparator />
                            <div className="max-h-[300px] overflow-y-auto">
                                {visibleColumns.map((col) => (
                                    <DropdownMenuCheckboxItem
                                        key={col.key}
                                        checked={col.visible}
                                        onCheckedChange={() => onToggleColumn(col.key)}
                                    >
                                        {col.label}
                                    </DropdownMenuCheckboxItem>
                                ))}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* ACTIONS */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" title="More actions">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {actions.map((item) => (
                                <DropdownMenuItem
                                    key={item.label}
                                    onClick={item.onClick}
                                    disabled={item.disabled}
                                    className={item.danger ? "text-destructive" : ""}
                                >
                                    <span className="mr-2">{item.icon}</span>
                                    {item.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* MOBILE 3 DOT BUTTON */}
                <Button
                    variant="outline"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setMobileOpen(true)}
                >
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </div>

            {/* EXPANDABLE FILTER PANEL */}
            {showFilters && (
                <div className="mb-4 p-4 bg-background rounded-xl border shadow-sm animate-in slide-in-from-top-2 duration-200">
                    <div className="flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
                        <div className="flex flex-wrap gap-2 w-full">
                            {/* Filter Groups */}
                            {filterGroups.map(group => {
                                const activeCount = group.options.filter(o => o.isActive).length;
                                return (
                                    <Popover key={group.id}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className={`h-9 border-dashed ${activeCount > 0 ? "bg-secondary" : ""}`}
                                            >
                                                {group.label}
                                                {activeCount > 0 && (
                                                    <Badge variant="secondary" className="ml-2 h-5 rounded-sm px-1 font-normal lg:hidden">
                                                        {activeCount}
                                                    </Badge>
                                                )}
                                                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0" align="start">
                                            <div className="p-2">
                                                {group.options.map(option => (
                                                    <div key={option.value} className="flex items-center space-x-2 p-2 hover:bg-accent rounded-sm cursor-pointer" onClick={() => option.onSelect(option.value)}>
                                                        <div className={`
                                                            flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-primary
                                                            ${option.isActive ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible"}
                                                        `}>
                                                            <Check className="h-4 w-4" />
                                                        </div>
                                                        <span className="text-sm">{option.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                );
                            })}

                            {/* Extra Filter Content */}
                            {extraFilterContent}

                            {/* Flat Filters */}
                            {filters.length > 0 && (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className={`h-9 border-dashed ${filters.filter(f => f.isActive).length > 0 ? "bg-secondary" : ""}`}
                                        >
                                            General
                                            <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0" align="start">
                                        <div className="p-2">
                                            {filters.map(option => (
                                                <div key={option.value} className="flex items-center space-x-2 p-2 hover:bg-accent rounded-sm cursor-pointer" onClick={() => option.onSelect(option.value)}>
                                                    <div className={`
                                                            flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-primary
                                                            ${option.isActive ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible"}
                                                        `}>
                                                        <Check className="h-4 w-4" />
                                                    </div>
                                                    <span className="text-sm">{option.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )}
                        </div>

                        {onClearFilters && (activeFiltersCount > 0 || (search && search.length > 0)) && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onClearFilters}
                                className="h-8 px-2 lg:px-3 text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                                Reset
                                <X className="ml-2 h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
            )}

            {/* MOBILE BOTTOM SHEET */}
            {mobileOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:hidden animate-in fade-in">
                    <div
                        className="w-full bg-background rounded-t-xl p-6 h-[85vh] overflow-y-auto shadow-xl animate-in slide-in-from-bottom"
                        style={{
                            transform: `translateY(${dragY}px)`,
                            transition: dragY === 0 ? "transform 0.25s ease" : "none",
                        }}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        {/* DRAG HANDLE */}
                        <div className="flex justify-center mb-4">
                            <div className="w-12 h-1.5 bg-muted rounded-full" />
                        </div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold">Options</h2>
                            <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* CONTENT - Simplified for now, reusing state */}
                        <div className="space-y-6">
                            {/* Sort */}
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-3">Sort By</h3>
                                <div className="space-y-2">
                                    {sortOptions.map(opt => (
                                        <div
                                            key={opt.label}
                                            onClick={() => opt.onSelect(opt.value)}
                                            className={`flex items-center justify-between p-3 rounded-lg border ${opt.isActive ? "bg-secondary border-primary/20" : "bg-card"}`}
                                        >
                                            <span className="text-sm font-medium">{opt.label}</span>
                                            {opt.isActive && <Check className="h-4 w-4 text-primary" />}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            {/* Actions */}
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-3">Actions</h3>
                                <div className="space-y-2">
                                    {actions.map(action => (
                                        <Button
                                            key={action.label}
                                            variant={action.danger ? "destructive" : "outline"}
                                            className="w-full justify-start"
                                            onClick={action.onClick}
                                            disabled={action.disabled}
                                        >
                                            <span className="mr-2">{action.icon}</span>
                                            {action.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export { FiltersBar };
