import React, { useState } from "react";
import Image from "next/image";
import { 
    ChevronDown, 
    MoreVertical, 
    ChevronRight
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export interface MobileRecordField {
    label: string;
    value: React.ReactNode;
}

export interface RowAction {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export interface MobileRecordCardProps {
    title: string;
    subtitle?: string;
    primaryValue?: React.ReactNode;
    imageUrl?: string | null;
    badges?: React.ReactNode;
    fields?: MobileRecordField[];
    onClick?: () => void;
    actions?: RowAction[];
}

const MobileRecordCard: React.FC<MobileRecordCardProps> = ({
    title,
    subtitle,
    primaryValue,
    imageUrl,
    badges,
    fields = [],
    onClick,
    actions = [],
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [expanded, setExpanded] = useState(false);

    // Optimize ImageKit preview
    const optimizedSrc = React.useMemo(() => {
        return imageUrl || "";
    }, [imageUrl]);

    return (
        <div
            onClick={onClick}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
            className={`
                bg-card rounded-2xl border border-border/60
                p-4 sm:p-5
                shadow-sm hover:shadow-md
                flex flex-col gap-4
                transition-all active:scale-[0.99]
                relative overflow-hidden group
                ${onClick ? 'cursor-pointer hover:bg-accent/30' : ''}
            `}
        >
            {/* Subtle Glass Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            {/* HEADER */}
            <div className="flex items-start gap-4">
                {/* IMAGE */}
                {imageUrl && (
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-muted shrink-0 border border-border/50 shadow-inner">
                        <Image
                            src={optimizedSrc}
                            alt={title}
                            fill
                            sizes="64px"
                            className={`
                                object-cover transition-all duration-700
                                ${isLoaded ? "blur-0 opacity-100 scale-100" : "blur-md opacity-0 scale-110"}
                            `}
                            onLoad={() => setIsLoaded(true)}
                        />
                    </div>
                )}

                {/* MAIN CONTENT */}
                <div className="flex-1 min-w-0 py-0.5">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <p className="text-base font-bold text-foreground leading-tight line-clamp-1 break-all tracking-tight">
                                {title}
                            </p>

                            {subtitle && (
                                <p className="mt-1.5 text-xs text-muted-foreground/80 font-medium break-all flex items-center gap-1.5">
                                    <span className="w-1 h-1 rounded-full bg-primary/40 shrink-0" />
                                    {subtitle}
                                </p>
                            )}
                        </div>

                        {/* ACTIONS & EXPAND */}
                        <div className="flex items-center gap-1 shrink-0 -mt-1 -mr-1">
                            {actions.length > 0 && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={(e) => e.stopPropagation()}
                                            className="h-9 w-9 rounded-xl hover:bg-accent/80 text-muted-foreground hover:text-foreground transition-all"
                                        >
                                            <MoreVertical size={18} />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48 bg-card border-border/60 shadow-xl rounded-xl p-1.5 backdrop-blur-xl">
                                        {actions.map((action, idx) => (
                                            <DropdownMenuItem
                                                key={idx}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    action.onClick();
                                                }}
                                                className={`
                                                    rounded-lg px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer
                                                    ${action.variant === 'destructive' 
                                                        ? 'text-red-500 focus:bg-red-500/10 focus:text-red-600' 
                                                        : 'text-muted-foreground hover:text-foreground focus:bg-accent'}
                                                `}
                                            >
                                                {action.icon && <span className="mr-2 opacity-70">{action.icon}</span>}
                                                {action.label}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}

                            {fields.length > 0 && (
                                <button
                                    type="button"
                                    aria-expanded={expanded}
                                    aria-label={expanded ? "Collapse details" : "Expand details"}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setExpanded((prev) => !prev);
                                    }}
                                    className={`
                                        p-2.5 rounded-xl
                                        text-muted-foreground hover:text-foreground
                                        hover:bg-accent/80
                                        transition-all duration-300
                                        ${expanded ? "bg-accent/50 text-primary" : ""}
                                    `}
                                >
                                    <ChevronDown
                                        size={18}
                                        className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                                    />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* PRIMARY VALUE + BADGES */}
                    {(primaryValue || badges) && (
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                            {primaryValue && (
                                <span className="text-sm font-bold text-foreground bg-muted/30 px-2.5 py-1 rounded-lg border border-border/40">
                                    {primaryValue}
                                </span>
                            )}
                            {badges}
                        </div>
                    )}
                </div>
            </div>

            {/* EXPANDED DETAILS */}
            {expanded && fields.length > 0 && (
                <div className="pt-4 border-t border-border/50 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-1 gap-2.5 bg-muted/20 rounded-xl p-3">
                        {fields.map((field) => (
                            <div
                                key={field.label}
                                className="flex items-center justify-between gap-4 py-1.5"
                            >
                                <span className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest shrink-0">
                                    {field.label}
                                </span>
                                <span className="text-xs font-semibold text-right break-words text-foreground/90">
                                    {field.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* FOOTER INDICATOR */}
            {onClick && !expanded && (
                <div className="absolute right-4 bottom-4 opacity-20 group-hover:opacity-100 transition-opacity">
                    <ChevronRight size={14} className="text-primary" />
                </div>
            )}
        </div>
    );
};

export { MobileRecordCard };
