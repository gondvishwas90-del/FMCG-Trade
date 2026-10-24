"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutGrid,
    PanelLeftClose,
    ChevronDown,
    Slash,
    LogOut
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { logoutAdmin } from "@/app/actions/auth";

interface HeaderProps {
    email: string;
    role: string;
    isDarkMode: boolean;
    setIsDarkMode: (v: boolean) => void;
    isCollapsed: boolean;
    setIsCollapsed: (v: boolean) => void;
    mobileSidebarOpen: boolean;
    setMobileSidebarOpen: (v: boolean) => void;
}

export function Header({
    email,
    role,
    isCollapsed,
    setIsCollapsed,
    mobileSidebarOpen,
    setMobileSidebarOpen
}: HeaderProps) {
    const pathname = usePathname();
    const router = useRouter();

    // Generate Breadcrumbs
    const breadcrumbs = React.useMemo(() => {
        const paths = pathname.split('/').filter(Boolean);
        return paths.map((path, index) => {
            const href = `/${paths.slice(0, index + 1).join('/')}`;
            const label = path.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
            const isLast = index === paths.length - 1;
            return { href, label, isLast };
        });
    }, [pathname]);

    return (
        <header
            className={cn(
                "rounded-2xl mx-2 mt-2 px-6 py-3",
                "bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] shadow-sm",
                "backdrop-blur-xl flex items-center justify-between gap-4 transition-all duration-300"
            )}
        >
            {/* LEFT: Toggle & Breadcrumbs */}
            <div className="flex items-center gap-4 flex-1">
                {/* Mobile Toggle */}
                <button
                    onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                    className="sm:hidden p-2 text-[var(--sidebar-text)] hover:text-[var(--text-white)] hover:bg-[var(--sidebar-hover)] rounded-lg transition-colors"
                >
                    <LayoutGrid className="w-5 h-5" />
                </button>

                {/* Desktop Toggle */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="hidden sm:flex text-[var(--sidebar-text)] hover:text-[var(--text-white)] transition-colors"
                >
                    {isCollapsed ? (
                        <PanelLeftClose className="w-5 h-5" />
                    ) : (
                        <LayoutGrid className="w-5 h-5" />
                    )}
                </button>

                {/* Divider */}
                <div className="h-4 w-px bg-[var(--sidebar-border)] hidden sm:block" />

                {/* Breadcrumbs */}
                <nav className="flex items-center text-sm font-medium text-[var(--sidebar-text)]">
                    {breadcrumbs.map((item, index) => (
                        <React.Fragment key={item.href}>
                            {index > 0 && (
                                <Slash className="w-3 h-3 mx-2 text-[var(--sidebar-text)] opacity-40 -rotate-12" />
                            )}
                            <span
                                className={cn(
                                    "transition-colors duration-200",
                                    item.isLast
                                        ? "text-[var(--text-white)] font-semibold"
                                        : "hover:text-[var(--text-white)]/80 cursor-pointer"
                                )}
                                onClick={() => !item.isLast && router.push(item.href)}
                            >
                                {item.label === "Admin" ? "Overview" : item.label}
                            </span>
                        </React.Fragment>
                    ))}
                </nav>
            </div>


            {/* RIGHT: Actions & User */}
            <div className="flex items-center gap-3">



                <ThemeToggle />

                {/* User Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-xl hover:bg-[var(--sidebar-hover)] transition-all group outline-none">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary-light)] to-[var(--primary-purple)] flex items-center justify-center text-white font-bold text-xs ring-2 ring-[var(--sidebar-bg)] group-hover:ring-[var(--sidebar-border)] transition-all">
                                A
                            </div>
                            <div className="hidden lg:flex flex-col items-start text-[10px]">
                                <span className="font-semibold text-[var(--text-white)] truncate max-w-[150px]">{email}</span>
                                <span className="text-[var(--sidebar-text)]/80 uppercase tracking-tighter">{role.replace('-', ' ')}</span>
                            </div>
                            <ChevronDown className="w-4 h-4 text-[var(--sidebar-text)] group-hover:text-[var(--text-white)] transition-colors hidden lg:block" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-[var(--sidebar-bg)] border-[var(--sidebar-border)] text-[var(--sidebar-text)]">
                        <DropdownMenuLabel className="text-[var(--text-white)]">My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-[var(--sidebar-border)]" />
                        <DropdownMenuItem className="text-red-500 focus:bg-red-500/10 focus:text-red-600 cursor-pointer" onClick={() => logoutAdmin()}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
