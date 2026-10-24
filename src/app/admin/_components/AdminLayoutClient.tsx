"use client";
import { useState } from "react";
import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface AdminLayoutClientProps {
    children: ReactNode;
    email: string;
    role: 'admin' | 'super-admin';
}

export function AdminLayoutClient({ children, email, role }: AdminLayoutClientProps) {
    const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-muted/40">

            {/* MOBILE BACKDROP */}
            {mobileSidebarOpen && (
                <div
                    onClick={() => setMobileSidebarOpen(false)}
                    className="fixed inset-0 bg-black/50 z-30 sm:hidden"
                />
            )}

            {/* SIDEBAR */}
            <div
                className={`
                    fixed top-0 left-0 h-screen z-40
                    sm:translate-x-0
                    ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
                    transition-transform duration-300
                `}
            >
                <Sidebar
                    role={role}
                    expandedMenus={expandedMenus}
                    setExpandedMenus={setExpandedMenus}
                    isCollapsed={isCollapsed}
                />
            </div>

            {/* MAIN CONTENT */}
            <div
                className={`
                    flex flex-col flex-1 min-h-screen min-w-0 transition-all duration-300
                    ${isCollapsed ? "sm:ml-[86px]" : "sm:ml-[286px]"}
                `}
            >
                {/* HEADER — FULL WIDTH */}
                <div className={`
                        fixed top-0 z-30
                        ${isCollapsed ? "sm:left-[86px]" : "sm:left-[286px]"}
                        left-0 right-0
                        transition-all duration-300
                    `}>
                    <Header
                        email={email}
                        role={role}
                        isDarkMode={isDarkMode}
                        setIsDarkMode={setIsDarkMode}
                        isCollapsed={isCollapsed}
                        setIsCollapsed={setIsCollapsed}
                        mobileSidebarOpen={mobileSidebarOpen}
                        setMobileSidebarOpen={setMobileSidebarOpen}
                    />
                </div>

                {/* PAGE CONTENT */}
                <main className="flex-1 pt-[80px] p-4 min-w-0 pb-10">
                    {children}
                </main>
            </div>

        </div>
    );
}
