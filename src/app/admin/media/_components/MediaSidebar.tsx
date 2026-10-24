"use client";

import React, { useEffect, useState } from "react";
import { Folder, FolderOpen, ChevronRight, Home, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaSidebarProps {
    currentPath: string;
    onNavigate: (path: string) => void;
    folders: string[];
}

export default function MediaSidebar({ currentPath, onNavigate, folders }: MediaSidebarProps) {
    const topLevelFolders = ["/", "/brands", "/categories", "/trade-offers", "/trade-opportunities", "/hero-banners"];
    
    // Combine hardcoded common folders with actual folders found in root
    const uniqueFolders = Array.from(new Set([...topLevelFolders, ...folders.map(f => f.startsWith('/') ? f : '/' + f)]));

    return (
        <div className="w-64 border-r border-border bg-muted/5 flex flex-col h-full overflow-hidden hidden lg:flex">
            <div className="p-4 border-b border-border/50">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-2 mb-4">Media Library</h3>
                <div className="space-y-1">
                    <SidebarItem 
                        icon={LayoutGrid} 
                        label="All Assets" 
                        isActive={currentPath === "/"} 
                        onClick={() => onNavigate("/")} 
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-2 mb-4">Folders</h3>
                <div className="space-y-1">
                    {uniqueFolders.filter(f => f !== "/").map((folder) => (
                        <SidebarItem 
                            key={folder}
                            icon={currentPath.startsWith(folder) ? FolderOpen : Folder} 
                            label={folder.replace("/", "").replace("-", " ")} 
                            isActive={currentPath === folder || currentPath.startsWith(folder + "/")} 
                            onClick={() => onNavigate(folder)}
                            className="capitalize"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function SidebarItem({ 
    icon: Icon, 
    label, 
    isActive, 
    onClick, 
    className 
}: { 
    icon: any; 
    label: string; 
    isActive?: boolean; 
    onClick: () => void;
    className?: string;
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-200 group",
                isActive 
                    ? "bg-primary/10 text-primary font-bold shadow-sm" 
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                className
            )}
        >
            <Icon className={cn(
                "w-4 h-4 transition-transform group-hover:scale-110",
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
            )} />
            <span className="truncate flex-1 text-left">{label}</span>
            {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
        </button>
    );
}
