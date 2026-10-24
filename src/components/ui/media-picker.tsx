"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Globe, UploadCloud, Link as LinkIcon, ImageIcon, Check, X, Library, Search, Loader2 } from "lucide-react";
import ImageUpload from "@/components/ui/image-upload";
import Image from "next/image";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
} from "@/components/ui/sheet";
import { ChevronLeft } from "lucide-react";

interface MediaPickerProps {
    open: boolean;
    onClose: () => void;
    onSelect: (url: string) => void;
    folder?: string;
    title?: string;
    currentValue?: string;
    aspectRatio?: number;
    initialFile?: File | null;
    fileName?: string;
}

export default function MediaPicker({
    open,
    onClose,
    onSelect,
    folder = "/uploads",
    title = "Select Media",
    currentValue = "",
    aspectRatio,
    initialFile = null,
    fileName,
}: MediaPickerProps) {
    const [urlValue, setUrlValue] = useState(currentValue);
    const [activeTab, setActiveTab] = useState("upload");
    
    // Library State
    const [libraryImages, setLibraryImages] = useState<any[]>([]);
    const [isLoadingLibrary, setIsLoadingLibrary] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Local Assets State
    const [localAssets, setLocalAssets] = useState<string[]>([]);
    const [isLoadingLocal, setIsLoadingLocal] = useState(false);
    const [localSearchQuery, setLocalSearchQuery] = useState("");

    useEffect(() => {
        if (open) {
            if (activeTab === "library") fetchLibrary();
            if (activeTab === "url") fetchLocalAssets();
        }
    }, [open, activeTab]);


    const fetchLocalAssets = async () => {
        if (localAssets.length > 0) return; // Only fetch once
        try {
            setIsLoadingLocal(true);
            const response = await fetch("/api/local-assets");
            if (!response.ok) throw new Error("Failed to fetch local assets");
            const data = await response.json();
            setLocalAssets(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoadingLocal(false);
        }
    };

    const filteredLocalAssets = localAssets.filter(path => 
        path.toLowerCase().includes(localSearchQuery.toLowerCase())
    );

    const fetchLibrary = async () => {
        try {
            setIsLoadingLibrary(true);
            // Fetch ALL images from the library instead of just the specific folder
            // This allows picking existing images from any folder
            const response = await fetch(`/api/media/list?t=${Date.now()}`);
            if (!response.ok) throw new Error("Failed to fetch library");
            const data = await response.json();
            setLibraryImages(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoadingLibrary(false);
        }
    };

    const filteredImages = libraryImages.filter(img => 
        img.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.tags?.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleUrlSelect = () => {
        if (urlValue.trim()) {
            onSelect(urlValue.trim());
            onClose();
        }
    };

    const handleUploadComplete = (url: string) => {
        onSelect(url);
        onClose();
    };

    const isMobile = useMobile();

    const renderContent = () => (
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col h-full">
            <div className={cn(
                "p-4 pt-0 sm:p-6 sm:pt-0 flex-1 flex flex-col",
                isMobile && "px-3"
            )}>
                <Tabs defaultValue="upload" className="w-full mt-2 sm:mt-4 flex flex-col flex-1" onValueChange={setActiveTab}>
                    <TabsList className="flex w-full bg-muted/50 p-1 sticky top-0 z-30 shadow-sm sm:shadow-none h-auto">
                        <TabsTrigger value="upload" className="flex-1 data-[state=active]:bg-background data-[state=active]:shadow-sm text-[10px] sm:text-sm py-2">
                            <UploadCloud className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                            Upload
                        </TabsTrigger>
                        <TabsTrigger value="library" className="flex-1 data-[state=active]:bg-background data-[state=active]:shadow-sm text-[10px] sm:text-sm py-2">
                            <Library className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                            Library
                        </TabsTrigger>
                        <TabsTrigger value="url" className="flex-1 data-[state=active]:bg-background data-[state=active]:shadow-sm text-[10px] sm:text-sm py-2">
                            <LinkIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                            By URL
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="library" className="flex-1 mt-4 sm:mt-6 animate-in fade-in duration-300 space-y-4">
                        <div className="sticky top-[40px] sm:top-[48px] z-20 bg-background pb-3 pt-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input 
                                    placeholder="Search library..." 
                                    className="pl-10 bg-muted/20 h-9 sm:h-10 text-sm"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {isLoadingLibrary ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground">
                                <Loader2 className="w-8 h-8 animate-spin text-primary/40" />
                                <p className="text-sm font-medium">Scanning assets...</p>
                            </div>
                        ) : filteredImages.length > 0 ? (
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3 p-0.5">
                                {filteredImages.map((img) => (
                                    <div 
                                        key={img.filePath}
                                        onClick={() => handleUploadComplete(img.url)}
                                        className="group relative aspect-square rounded-xl border border-border overflow-hidden cursor-pointer hover:border-primary transition-all bg-muted/5 shadow-sm active:scale-95 touch-manipulation"
                                    >
                                        <Image 
                                            src={img.thumbnailUrl || img.url} 
                                            alt={img.name}
                                            fill
                                            sizes="(max-width: 768px) 33vw, 120px"
                                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <p className="text-[10px] text-white truncate font-medium leading-tight">{img.name}</p>
                                        </div>
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Check className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground text-center px-6">
                                <div className="p-4 rounded-full bg-muted/20 mb-4">
                                    <ImageIcon className="w-10 h-10 opacity-20" />
                                </div>
                                <p className="text-sm font-semibold">No assets found</p>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="mt-4"
                                    onClick={() => setActiveTab("upload")}
                                >
                                    Go to Upload
                                </Button>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="upload" className="flex-1 mt-4 sm:mt-6 animate-in fade-in duration-300">
                        <ImageUpload 
                            value="" 
                            onChange={handleUploadComplete} 
                            folder={folder} 
                            aspectRatio={aspectRatio}
                            initialFile={initialFile}
                            fileName={fileName}
                        />
                    </TabsContent>

                    <TabsContent value="url" className="flex-1 mt-4 sm:mt-6 animate-in fade-in duration-300 space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                    Direct Image URL
                                </Label>
                                <div className="flex flex-col gap-2">
                                    <Input
                                        placeholder="https://example.com/image.jpg"
                                        value={urlValue}
                                        onChange={(e) => setUrlValue(e.target.value)}
                                        className="bg-muted/30 focus:bg-background transition-all"
                                    />
                                    <Button 
                                        onClick={handleUrlSelect}
                                        disabled={!urlValue.trim()}
                                        className="w-full"
                                    >
                                        <Check className="w-4 h-4 mr-2" />
                                        Confirm Selection
                                    </Button>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-border">
                                <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-4">
                                    Local public/ assets
                                </Label>

                                {isLoadingLocal ? (
                                    <div className="flex items-center justify-center py-10 text-muted-foreground">
                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                        <span className="text-xs italic">Indexing...</span>
                                    </div>
                                ) : filteredLocalAssets.length > 0 ? (
                                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                                        {filteredLocalAssets.map((asset) => (
                                            <div 
                                                key={asset}
                                                onClick={() => setUrlValue(asset)}
                                                className={`group relative aspect-square rounded-lg border overflow-hidden cursor-pointer transition-all flex items-center justify-center p-1 ${urlValue === asset ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'border-border hover:border-primary/50 bg-background'}`}
                                            >
                                                <Image 
                                                    src={asset} 
                                                    alt={asset}
                                                    fill
                                                    sizes="80px"
                                                    className="object-contain"
                                                />
                                                {urlValue === asset && (
                                                    <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
                                                        <Check className="w-4 h-4 text-primary" />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-[10px] text-muted-foreground italic text-center py-4">No local assets found</p>
                                )}
                            </div>
                        </div>
                    </TabsContent>

                </Tabs>
            </div>
        </div>
    );

    if (isMobile) {
        return (
            <Sheet open={open} onOpenChange={(val) => !val && onClose()}>
                <SheetContent side="bottom" className="p-0 h-[92vh] rounded-t-[2rem] border-none shadow-2xl flex flex-col outline-none overflow-hidden bg-background" showCloseButton={false}>
                    <SheetHeader className="p-4 border-b flex-none flex flex-row items-center gap-3 bg-background/80 backdrop-blur-md sticky top-0 z-40">
                        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full -ml-1 h-9 w-9">
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <div className="flex-1 min-w-0">
                            <SheetTitle className="text-base font-bold truncate leading-none">{title}</SheetTitle>
                            <SheetDescription className="text-[10px] mt-1 truncate">Pick from library, upload, or URL</SheetDescription>
                        </div>
                        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full text-muted-foreground h-9 w-9">
                            <X className="w-4 h-4" />
                        </Button>
                    </SheetHeader>
                    <div className="flex-1 overflow-hidden flex flex-col">
                        {renderContent()}
                    </div>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent className="sm:max-w-xl md:max-w-2xl bg-background border-border p-0 overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[90vh]">
                <DialogHeader className="p-6 pb-4 flex-none border-b bg-muted/5">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-primary/10 rounded-xl text-primary shadow-sm">
                            <ImageIcon className="w-5 h-5" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl font-bold tracking-tight">{title}</DialogTitle>
                            <DialogDescription className="text-sm text-muted-foreground mt-0.5">
                                Choose an image source to update your media.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                {renderContent()}

                <DialogFooter className="border-t border-border p-4 bg-muted/5 flex-none sm:justify-start">
                    <Button variant="outline" onClick={onClose} size="sm" className="w-full sm:w-auto rounded-lg">
                        <X className="w-4 h-4 mr-2" />
                        Cancel Selection
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
