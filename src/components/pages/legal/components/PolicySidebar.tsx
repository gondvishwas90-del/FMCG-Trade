"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { POLICY_NAV_ITEMS } from "../constants/navigation";

export function PolicySidebar() {
    const pathname = usePathname();

    return (
        <nav className="w-full lg:w-64 shrink-0 lg:py-12 px-6 lg:px-0">
            <div className="sticky top-24 space-y-1">
                <h3 className="font-semibold text-foreground px-3 mb-4 text-sm uppercase tracking-wider">
                    Legal & Policies
                </h3>
                <div className="space-y-1">
                    {POLICY_NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                    isActive
                                        ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <Icon className="w-4 h-4" />
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
