"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
    Search, 
    Plus, 
    Grid, 
    List as ListIcon, 
    ChevronRight, 
    FolderPlus, 
    Upload, 
    RefreshCw,
    MoreVertical,
    Download,
    Copy,
    Trash2,
    Info,
    ExternalLink,
    Check
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Image from "next/image";
import MediaPicker from "@/components/ui/media-picker";
import { toast } from "sonner";
import MediaSidebar from "./MediaSidebar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface MediaAsset {
    name: string;
    url: string;
    thumbnailUrl: string;
    size: number;
    filePath: string;
    tags: string[];
    createdAt: string;
    type: "file" | "folder";
}

export default function MediaManager() {
    const [currentPath, setCurrentPath] = useState("/");
    const [assets, setAssets] = useState<MediaAsset[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [isNewFolderOpen, setIsNewFolderOpen] = useState(false);
    const [isRenameOpen, setIsRenameOpen] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");
    const [renameName, setRenameName] = useState("");
    const [isCreatingFolder, setIsCreatingFolder] = useState(false);
    const [isManaging, setIsManaging] = useState(false);

    const fetchMinIOAssets = useCallback(async (path: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/media/list?path=${encodeURIComponent(path)}&type=all&t=${Date.now()}`);
            if (!response.ok) throw new Error("Failed to fetch assets");
            const data = await response.json();
            setAssets(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load MinIO library");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMinIOAssets(currentPath);
    }, [currentPath, fetchMinIOAssets]);

    const navigateTo = (path: string) => {
        setCurrentPath(path);
        setSelectedAsset(null);
    };

    const handleCreateFolder = async () => {
        if (!newFolderName.trim()) return;
        setIsCreatingFolder(true);
        try {
            const response = await fetch("/api/media/folder", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    folderName: newFolderName,
                    parentFolderPath: currentPath,
                }),
            });
            if (!response.ok) throw new Error("Failed to create folder");
            toast.success(`Folder "${newFolderName}" created`);
            setNewFolderName("");
            setIsNewFolderOpen(false);
            fetchMinIOAssets(currentPath);
        } catch (error) {
            console.error(error);
            toast.error("Failed to create folder");
        } finally {
            setIsCreatingFolder(false);
        }
    };

    const handleDelete = async (asset: MediaAsset) => {
        if (!confirm(`Are you sure you want to delete this ${asset.type}?`)) return;
        setIsManaging(true);
        try {
            const response = await fetch(`/api/media/delete?filePath=${encodeURIComponent(asset.filePath)}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Failed to delete");
            toast.success(`${asset.type} deleted successfully`);
            if (selectedAsset?.filePath === asset.filePath) setSelectedAsset(null);
            fetchMinIOAssets(currentPath);
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete");
        } finally {
            setIsManaging(false);
        }
    };

    const handleRename = async () => {
        if (!selectedAsset || !renameName.trim()) return;
        setIsManaging(true);
        try {
            const response = await fetch("/api/media/rename", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: selectedAsset.type,
                    filePath: selectedAsset.filePath,
                    newName: renameName,
                }),
            });
            if (!response.ok) throw new Error("Failed to rename");
            toast.success(`${selectedAsset.type} renamed successfully`);
            setIsRenameOpen(false);
            setRenameName("");
            fetchMinIOAssets(currentPath);
        } catch (error) {
            console.error(error);
            toast.error("Failed to rename");
        } finally {
            setIsManaging(false);
        }
    };

    const breadcrumbs = (currentPath || "/").split("/").filter(Boolean);
    const breadcrumbItems = ["Root", ...breadcrumbs];

    const filteredAssets = assets.filter(asset => 
        asset.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedAssets = [...filteredAssets].sort((a, b) => {
        if (a.type === "folder" && b.type !== "folder") return -1;
        if (a.type !== "folder" && b.type === "folder") return 1;
        return 0;
    });

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("URL copied to clipboard");
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return "0 B";
        const k = 1024;
        const sizes = ["B", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    return (
        <div className="flex h-full flex-col bg-background overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center justify-between border-b border-border p-4 bg-muted/5 backdrop-blur-md sticky top-0 z-30">
                <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-1 text-sm font-medium">
                        {currentPath !== "/" && (
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 mr-2 hover:bg-primary/10 hover:text-primary"
                                onClick={() => {
                                    const parts = currentPath.split("/").filter(Boolean);
                                    parts.pop();
                                    navigateTo("/" + parts.join("/"));
                                }}
                            >
                                <ChevronRight className="w-4 h-4 rotate-180" />
                            </Button>
                        )}
                        {breadcrumbItems.map((crumb, i) => (
                            <React.Fragment key={`${crumb}-${i}`}>
                                {i > 0 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                                <button 
                                    onClick={() => {
                                        const path = i === 0 ? "/" : "/" + breadcrumbItems.slice(1, i + 1).join("/");
                                        navigateTo(path);
                                    }}
                                    className={cn(
                                        "hover:text-primary transition-colors",
                                        i === breadcrumbItems.length - 1 ? "text-foreground font-bold" : "text-muted-foreground"
                                    )}
                                >
                                    {crumb}
                                </button>
                            </React.Fragment>
                        ))}
                    </div>
                    
                    <div className="relative max-w-xs w-full ml-4 hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                            placeholder="Search assets..." 
                            className="pl-10 h-9 bg-muted/20 border-border/50 focus:bg-background transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => fetchMinIOAssets(currentPath)}
                        className="hidden sm:flex"
                    >
                        <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
                    </Button>

                    <Dialog open={isNewFolderOpen} onOpenChange={setIsNewFolderOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-2">
                                <FolderPlus className="w-4 h-4" />
                                <span className="hidden sm:inline">New Folder</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New Folder</DialogTitle>
                                <DialogDescription>
                                    Enter a name for your new folder in {currentPath}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                                <Input 
                                    placeholder="Folder name" 
                                    value={newFolderName}
                                    onChange={(e) => setNewFolderName(e.target.value)}
                                    autoFocus
                                />
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsNewFolderOpen(false)}>Cancel</Button>
                                <Button onClick={handleCreateFolder} disabled={isCreatingFolder || !newFolderName.trim()}>
                                    {isCreatingFolder ? "Creating..." : "Create Folder"}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <div className="flex items-center border border-border rounded-md p-1 bg-muted/30">
                        <Button 
                            variant={viewMode === "grid" ? "secondary" : "ghost"} 
                            size="icon" 
                            className="h-7 w-7"
                            onClick={() => setViewMode("grid")}
                        >
                            <Grid className="w-4 h-4" />
                        </Button>
                        <Button 
                            variant={viewMode === "list" ? "secondary" : "ghost"} 
                            size="icon" 
                            className="h-7 w-7"
                            onClick={() => setViewMode("list")}
                        >
                            <ListIcon className="w-4 h-4" />
                        </Button>
                    </div>
                    <Button size="sm" onClick={() => setIsUploadOpen(true)} className="gap-2 shadow-lg shadow-primary/20">
                        <Upload className="w-4 h-4" />
                        Upload
                    </Button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                <MediaSidebar 
                    currentPath={currentPath} 
                    onNavigate={navigateTo} 
                    folders={assets.filter(a => a.type === "folder").map(a => a.filePath)}
                />

                {/* Main Grid */}
                <div className={cn(
                    "flex-1 overflow-y-auto p-6 custom-scrollbar transition-all duration-300",
                    selectedAsset ? "mr-80" : ""
                )}>
                    {isLoading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <Skeleton className="aspect-square rounded-xl" />
                                    <Skeleton className="h-4 w-3/4" />
                                </div>
                            ))}
                        </div>
                    ) : filteredAssets.length > 0 ? (
                        <div className={cn(
                            viewMode === "grid" 
                                ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
                                : "flex flex-col gap-2"
                        )}>
                            {sortedAssets.map((asset) => (
                                <div 
                                    key={asset.filePath}
                                    onClick={() => {
                                        if (asset.type === "folder") {
                                            navigateTo(asset.filePath);
                                        } else {
                                            setSelectedAsset(asset);
                                        }
                                    }}
                                    className={cn(
                                        "group relative cursor-pointer transition-all duration-200",
                                        viewMode === "grid" 
                                            ? "aspect-square rounded-xl border p-2 flex flex-col items-center justify-center bg-muted/10 hover:bg-muted/20 border-transparent hover:border-primary/30"
                                            : "flex items-center gap-4 p-3 rounded-lg hover:bg-muted/30 border border-transparent hover:border-border",
                                        selectedAsset?.filePath === asset.filePath && "bg-primary/5 border-primary/50 ring-1 ring-primary/20 shadow-md shadow-primary/10"
                                    )}
                                >
                                    <div className={cn(
                                        "relative flex items-center justify-center",
                                        viewMode === "grid" ? "w-full h-full mb-2" : "w-10 h-10 shrink-0"
                                    )}>
                                        {asset.type === "folder" ? (
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <div className="p-4 bg-primary/5 rounded-2xl text-primary/80 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300">
                                                    <FolderPlus className="w-12 h-12" />
                                                </div>
                                            </div>
                                        ) : (
                                            <Image 
                                                src={asset.thumbnailUrl || asset.url} 
                                                alt={asset.name}
                                                fill
                                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
                                                className="object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                                            />
                                        )}
                                        
                                        {selectedAsset?.filePath === asset.filePath && (
                                            <div className="absolute top-1 right-1 bg-primary text-white p-1 rounded-full">
                                                <Check className="w-3 h-3" />
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className={cn(
                                        "w-full overflow-hidden",
                                        viewMode === "grid" ? "text-center" : "flex-1"
                                    )}>
                                        <p className="text-[11px] font-bold truncate text-foreground/80 group-hover:text-primary transition-colors">
                                            {asset.name}
                                        </p>
                                        <p className="text-[9px] text-muted-foreground uppercase tracking-tighter">
                                            {asset.type === "folder" ? "Directory" : formatSize(asset.size)}
                                        </p>
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="secondary" size="icon" className="h-6 w-6 rounded-full bg-background/80 backdrop-blur shadow-sm">
                                                    <MoreVertical className="w-3 h-3" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-40">
                                                <DropdownMenuItem onClick={(e) => {
                                                    e.stopPropagation();
                                                    copyToClipboard(asset.url);
                                                }}>
                                                    <Copy className="w-4 h-4 mr-2" />
                                                    Copy URL
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={(e) => {
                                                    e.stopPropagation();
                                                    window.open(asset.url, '_blank');
                                                }}>
                                                    <ExternalLink className="w-4 h-4 mr-2" />
                                                    Preview
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedAsset(asset);
                                                    setRenameName(asset.name);
                                                    setIsRenameOpen(true);
                                                }}>
                                                    <Plus className="w-4 h-4 mr-2" />
                                                    Rename
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem 
                                                    className="text-destructive focus:text-destructive focus:bg-destructive/10" 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(asset);
                                                    }}
                                                >
                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-center">
                            <div className="p-8 rounded-full bg-muted/20 mb-6">
                                <Plus className="w-16 h-16 opacity-10" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground/70">No assets here</h3>
                            <p className="text-sm max-w-[250px] mt-2 leading-relaxed">
                                This folder is currently empty. Upload your first image to get started.
                            </p>
                            <Button className="mt-8" onClick={() => setIsUploadOpen(true)}>
                                <Upload className="w-4 h-4 mr-2" />
                                Upload First Image
                            </Button>
                        </div>
                    )}
                </div>

                {/* Sidebar Detail */}
                <div className={cn(
                    "fixed right-0 top-[73px] bottom-0 w-80 border-l border-border bg-muted/5 backdrop-blur-xl transition-transform duration-300 z-20 p-6 overflow-y-auto custom-scrollbar",
                    selectedAsset ? "translate-x-0" : "translate-x-full"
                )}>
                    {selectedAsset && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <Info className="w-5 h-5 text-primary" />
                                    Asset Details
                                </h3>
                                <Button variant="ghost" size="icon" onClick={() => setSelectedAsset(null)}>
                                    <ChevronRight className="w-5 h-5" />
                                </Button>
                            </div>

                            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-muted/20 border border-border/50 flex items-center justify-center p-4 relative group">
                                <Image 
                                    src={selectedAsset.url} 
                                    alt={selectedAsset.name}
                                    fill
                                    sizes="320px"
                                    className="object-contain drop-shadow-xl p-4"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <Button size="sm" variant="secondary" onClick={() => window.open(selectedAsset.url, '_blank')}>
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        Full View
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">File Name</label>
                                    <p className="text-sm font-medium break-all bg-muted/30 p-3 rounded-xl border border-border/50">{selectedAsset.name}</p>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Size</label>
                                        <p className="text-sm font-medium">{formatSize(selectedAsset.size)}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Created</label>
                                        <p className="text-sm font-medium">{new Date(selectedAsset.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-border/50">
                                    <Button className="w-full justify-start gap-3 h-11 px-4" variant="outline" onClick={() => copyToClipboard(selectedAsset.url)}>
                                        <Copy className="w-4 h-4" />
                                        Copy Permanent URL
                                    </Button>
                                    <Button className="w-full justify-start gap-3 h-11 px-4" variant="outline" onClick={() => window.open(selectedAsset.url, '_blank')}>
                                        <Download className="w-4 h-4" />
                                        Download Asset
                                    </Button>
                                    <Button 
                                        variant="destructive" 
                                        className="w-full justify-start gap-2 h-10 bg-destructive/10 text-destructive hover:bg-destructive hover:text-white border-destructive/20"
                                        disabled={isManaging}
                                        onClick={() => handleDelete(selectedAsset)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        {isManaging ? "Deleting..." : "Delete Asset"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Rename Dialog */}
            <Dialog open={isRenameOpen} onOpenChange={setIsRenameOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Rename {selectedAsset?.type}</DialogTitle>
                        <DialogDescription>
                            Enter a new name for {selectedAsset?.name}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Input 
                            placeholder="New name" 
                            value={renameName}
                            onChange={(e) => setRenameName(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsRenameOpen(false)}>Cancel</Button>
                        <Button onClick={handleRename} disabled={isManaging || !renameName.trim()}>
                            {isManaging ? "Renaming..." : "Rename"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Upload Modal (Reusing existing MediaPicker logic) */}
            <MediaPicker 
                open={isUploadOpen}
                onClose={() => setIsUploadOpen(false)}
                onSelect={() => {
                    fetchMinIOAssets(currentPath);
                    setIsUploadOpen(false);
                }}
                folder={currentPath}
                title="Upload New Asset"
            />
        </div>
    );
}
