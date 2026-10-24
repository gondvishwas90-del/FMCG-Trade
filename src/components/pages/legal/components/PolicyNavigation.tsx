"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { POLICY_NAV_ITEMS } from "../constants/navigation";

export function PolicyNavigation() {
    const pathname = usePathname();
    const [activeTabLeft, setActiveTabLeft] = useState(0);
    const [activeTabWidth, setActiveTabWidth] = useState(0);
    const tabsRef = useRef<(HTMLAnchorElement | null)[]>([]);

    useEffect(() => {
        const activeIndex = POLICY_NAV_ITEMS.findIndex(p => p.href === pathname);
        if (activeIndex !== -1 && tabsRef.current[activeIndex]) {
            const tab = tabsRef.current[activeIndex];
            setActiveTabLeft(tab?.offsetLeft || 0);
            setActiveTabWidth(tab?.offsetWidth || 0);
        }
    }, [pathname]);

    return (
        <div className="w-full border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40">
            <div className="max-w-[1400px] mx-auto">
                <nav className="flex items-center overflow-x-auto no-scrollbar relative px-6 md:px-12">
                    {POLICY_NAV_ITEMS.map((policy, idx) => {
                        const isActive = pathname === policy.href;
                        return (
                            <Link
                                key={policy.href}
                                href={policy.href}
                                ref={el => { tabsRef.current[idx] = el }}
                                className={cn(
                                    "relative py-5 px-1 mr-8 text-sm font-medium transition-colors whitespace-nowrap",
                                    isActive
                                        ? "text-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {policy.name}
                            </Link>
                        );
                    })}

                    {/* Animated Underline */}
                    <motion.div
                        className="absolute bottom-0 h-0.5 bg-emerald-500"
                        animate={{
                            left: activeTabLeft,
                            width: activeTabWidth
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30
                        }}
                    />
                </nav>
            </div>
        </div>
    );
}
