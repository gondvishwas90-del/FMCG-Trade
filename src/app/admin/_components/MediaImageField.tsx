"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Pencil, Trash2, ExternalLink } from "lucide-react";
import MediaPicker from "@/components/ui/media-picker";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface MediaImageFieldProps {
    value: string;
    onChange: (url: string) => void;
    folder?: string;
    label?: string;
    aspectRatio?: number;
    className?: string;
    fileName?: string;
    layout?: "vertical" | "horizontal";
    description?: string;
    dimensions?: string;
    supportedFormats?: string;
    maxSize?: string;
}

export default function MediaImageField({
    value,
    onChange,
    folder,
    label,
    aspectRatio,
    className,
    fileName,
    layout = "horizontal",
    description,
    dimensions,
    supportedFormats,
    maxSize,
}: MediaImageFieldProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [droppedFile, setDroppedFile] = useState<File | null>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith("image/")) {
            setDroppedFile(file);
            setIsPickerOpen(true);
        }
    };

    const handleClosePicker = () => {
        setIsPickerOpen(false);
        setDroppedFile(null);
    };

    // Media preview source
    const optimizedSrc = useMemo(() => {
        return value;
    }, [value]);

    return (
        <div 
            className={cn(
                "space-y-3 w-full min-w-0 transition-all duration-300", 
                isDragging && "scale-[1.01]",
                className
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="flex flex-wrap items-center justify-between gap-2">
                {label && (
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest truncate max-w-full">
                        {label}
                    </span>
                )}
                {value && (
                    <a
                        href={value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-primary hover:underline flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity"
                    >
                        <ExternalLink className="w-2.5 h-2.5" />
                        View Full Size
                    </a>
                )}
            </div>

            <div className={cn(
                "flex gap-4 items-center p-4 rounded-2xl border transition-all duration-300 group relative overflow-hidden",
                layout === "vertical" ? "flex-col text-center" : "flex-col sm:flex-row sm:gap-6",
                isDragging ? "border-primary bg-primary/5 ring-4 ring-primary/5" : "border-border bg-muted/5 hover:bg-muted/10"
            )}>
                {isDragging && (
                    <div className="absolute inset-0 bg-primary/10 backdrop-blur-[2px] z-10 flex items-center justify-center border-2 border-primary border-dashed rounded-2xl animate-in fade-in zoom-in duration-300">
                        <div className="bg-background/90 p-4 rounded-2xl shadow-xl flex flex-col items-center gap-2 scale-110">
                            <ImageIcon className="w-8 h-8 text-primary animate-bounce" />
                            <span className="text-xs font-bold text-primary uppercase tracking-wider">Drop to Upload</span>
                        </div>
                    </div>
                )}
                {/* Preview Thumbnail */}
                <div
                    className={cn(
                        "relative rounded-xl border border-border overflow-hidden bg-background shadow-sm group-hover:shadow-md transition-all duration-300 flex-none",
                        layout === "vertical" ? "w-full" : "w-full sm:w-28 max-h-[220px] sm:max-h-none"
                    )}
                    style={{ aspectRatio: aspectRatio || 1 }}
                >
                    {value ? (
                        <Image
                            src={optimizedSrc}
                            alt="Media Preview"
                            fill
                            sizes="(max-width: 640px) 100vw, 112px"
                            className={cn(
                                "object-contain p-2 transition-all duration-500 group-hover:scale-105",
                                isLoaded ? "blur-0 opacity-100" : "blur-sm opacity-0"
                            )}
                            onLoad={() => setIsLoaded(true)}
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/30 bg-muted/20 p-2">
                            <ImageIcon className="w-8 h-8 mb-1 opacity-50" />
                            <span className="text-[10px] uppercase font-bold tracking-tight">No Preview</span>
                        </div>
                    )}
                </div>

                {/* Info & Actions */}
                <div className={cn(
                    "flex-1 min-w-0 w-full space-y-3",
                    layout === "vertical" ? "text-center" : "text-center sm:text-left"
                )}>
                    <div className="space-y-1 min-w-0">
                        <p className="text-sm font-semibold truncate">
                            {value ? value.split('/').pop()?.split('?')[0] : 'No media selected'}
                        </p>
                        <p className="text-[10px] text-muted-foreground font-mono truncate opacity-60">
                            {value || 'Specify an image source...'}
                        </p>
                    </div>

                    <div className={cn(
                        "flex flex-wrap gap-2",
                        layout === "vertical" ? "justify-center" : "justify-center sm:justify-start"
                    )}>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setIsPickerOpen(true)}
                            className="h-8 text-xs bg-background shadow-sm hover:border-primary/50 flex-1 sm:flex-none"
                        >
                            <Pencil className="w-3 h-3 mr-2 text-primary" />
                            {value ? 'Change' : 'Select Media'}
                        </Button>

                        {value && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => onChange("")}
                                className="h-8 text-xs text-red-500 hover:text-red-600 hover:bg-red-50 shadow-none border-0 flex-1 sm:flex-none"
                            >
                                <Trash2 className="w-3 h-3 mr-2" />
                                Clear
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Upload Guidelines & Spec Card */}
            {(dimensions || supportedFormats || maxSize || description) && (
                <div className="text-[11px] text-muted-foreground bg-muted/25 p-3 rounded-xl border border-border/50 space-y-1">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-medium">
                        {dimensions && (
                            <span className="flex items-center gap-1">
                                <span className="font-bold text-foreground">Dimensions:</span> {dimensions}
                            </span>
                        )}
                        {supportedFormats && (
                            <span className="flex items-center gap-1">
                                <span className="font-bold text-foreground">Formats:</span> {supportedFormats}
                            </span>
                        )}
                        {maxSize && (
                            <span className="flex items-center gap-1">
                                <span className="font-bold text-foreground">Max Size:</span> {maxSize}
                            </span>
                        )}
                    </div>
                    {description && (
                        <p className="text-[10px] text-muted-foreground/80 pt-0.5 leading-normal">
                            {description}
                        </p>
                    )}
                </div>
            )}

            <MediaPicker
                open={isPickerOpen}
                onClose={handleClosePicker}
                onSelect={onChange}
                folder={folder}
                currentValue={value}
                aspectRatio={aspectRatio}
                initialFile={droppedFile}
                title={label ? `Select ${label}` : undefined}
                fileName={fileName}
            />
        </div>
    );
}
