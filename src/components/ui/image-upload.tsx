"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2, Trash, UploadCloud, Eye, Crop, Settings2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { TagsInput } from "@/components/ui/tags-input";
import ImageCropper from "./image-cropper";
import ImageViewer from "./image-viewer";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    disabled?: boolean;
    folder?: string;
    aspectRatio?: number; // e.g. 1 for square, 16/9 for landscape
    initialFile?: File | null;
    fileName?: string;
}

const slugify = (text: string) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w-]+/g, '')  // Remove all non-word chars
        .replace(/--+/g, '-');    // Replace multiple - with single -
};

export default function ImageUpload({ value, onChange, disabled, folder = "/uploads", aspectRatio, initialFile, fileName }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isCropping, setIsCropping] = useState(false);
    const [isViewing, setIsViewing] = useState(false);
    const [tempFile, setTempFile] = useState<string | null>(null); // For cropper
    const [isDragging, setIsDragging] = useState(false);
    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        if (initialFile) {
            processFile(initialFile);
        }
    }, [initialFile]);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const abortControllerRef = useRef<AbortController | null>(null);


    const processFile = (file: File) => {
        if (!file || !file.type.startsWith("image/")) {
            toast.error("Please upload an image file");
            return;
        }

        // Create a URL for the file to pass to the cropper
        const fileUrl = URL.createObjectURL(file);
        setTempFile(fileUrl);
        setIsCropping(true);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) processFile(file);
        // Reset input so same file can be selected again
        e.target.value = "";
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled && !uploading) {
            setIsDragging(true);
        }
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

        if (disabled || uploading) return;

        const file = e.dataTransfer.files?.[0];
        if (file) processFile(file);
    };

    const handleCropComplete = async (croppedBlob: Blob) => {
        setIsCropping(false);
        if (tempFile) {
            URL.revokeObjectURL(tempFile);
            setTempFile(null);
        }
        await handleUpload(croppedBlob);
    };

    const handleCropCancel = () => {
        setIsCropping(false);
        if (tempFile) {
            URL.revokeObjectURL(tempFile);
            setTempFile(null);
        }
    };

    const handleUpload = async (fileBlob: Blob) => {
        try {
            setUploading(true);
            setProgress(0);

            const formData = new FormData();
            
            // Generate SEO friendly filename if fileName prop is provided
            let uploadFileName = undefined;
            if (fileName) {
                const mimeType = (fileBlob.type || 'image/jpeg').toLowerCase();
                let extension = 'jpg';
                if (mimeType.includes('svg')) extension = 'svg';
                else if (mimeType.includes('png')) extension = 'png';
                else if (mimeType.includes('webp')) extension = 'webp';
                else if (mimeType.includes('gif')) extension = 'gif';
                else if (mimeType.includes('jpeg') || mimeType.includes('jpg')) extension = 'jpg';
                
                uploadFileName = `${slugify(fileName)}.${extension}`;
            }

            formData.append("file", fileBlob, uploadFileName);
            formData.append("folder", folder);

            const controller = new AbortController();
            abortControllerRef.current = controller;

            const response = await fetch("/api/media/upload", {
                method: "POST",
                body: formData,
                signal: controller.signal,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Upload failed");
            }

            interface UploadResponse {
                url?: string;
                error?: string;
            }

            const uploadResponse = (await response.json()) as UploadResponse;

            console.log("Upload success:", uploadResponse);
            if (uploadResponse.url) {
                // Append a timestamp to bust browser cache since we might be overwriting a file with the same name
                const cacheBustedUrl = `${uploadResponse.url}?t=${Date.now()}`;
                onChange(cacheBustedUrl);
                toast.success("Image uploaded successfully");
            } else {
                toast.error("Upload failed: No URL returned");
            }

        } catch (error: unknown) {
            console.error("Upload error:", error);

            if (error instanceof Error && error.name === "AbortError") {
                toast.info("Upload cancelled");
            } else {
                toast.error(error instanceof Error ? error.message : "Image upload failed. Please try again.");
            }
        } finally {
            setUploading(false);
            setProgress(0);
            abortControllerRef.current = null;
        }
    };

    const handleRemove = () => {
        onChange("");
    };

    const handleCancel = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    };

    const triggerUpload = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-4 w-full flex flex-col items-center justify-center">
            {/* Hidden Input */}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
                disabled={disabled || uploading}
            />

            {/* PREVIEW AREA */}
            {value ? (
                <div 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={cn(
                        "relative w-full h-80 rounded-2xl overflow-hidden border shadow-sm group bg-background transition-all duration-300",
                        isDragging ? "border-primary ring-4 ring-primary/10 scale-[1.02]" : "border-border"
                    )}
                >
                    <div className="relative w-full h-full transition-all duration-500 group-hover:scale-105">
                        <Image
                            fill
                            src={value}
                            alt="Upload Preview"
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </div>

                    {/* Overlay Metadata & Actions */}
                    <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-between">
                        <div className="text-white">
                            <p className="text-sm font-medium">Uploaded Image</p>
                            <p className="text-xs text-white/60">Ready for use</p>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant="secondary"
                                size="icon"
                                onClick={() => setIsViewing(true)}
                                className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white shadow-lg transition-all duration-200 hover:scale-110"
                                title="View Full Image"
                            >
                                <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={handleRemove}
                                disabled={disabled}
                                className="h-9 w-9 rounded-full bg-red-500/80 hover:bg-red-500 backdrop-blur-md text-white shadow-lg transition-all duration-200 hover:scale-110"
                                title="Remove Image"
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                /* UPLOAD AREA */
                <div className="w-full space-y-4">
                    <div
                        onClick={triggerUpload}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`
                            relative flex flex-col items-center justify-center w-full h-80 
                            rounded-2xl cursor-pointer overflow-hidden
                            border-2 border-dashed
                            ${isDragging ? "border-primary bg-primary/5 scale-[1.02]" : "border-border bg-muted/30"}
                            hover:bg-muted/50 
                            hover:border-primary/50
                            transition-all duration-300 group
                            ${disabled || uploading ? "pointer-events-none opacity-80" : ""}
                        `}
                    >
                        {/* Animated Mesh Gradient Background (Subtle) */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

                        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4 relative z-10">
                            {uploading ? (
                                <div className="flex flex-col items-center w-full max-w-[240px] gap-4">
                                    <div className="relative w-16 h-16">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle
                                                cx="32"
                                                cy="32"
                                                r="28"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                fill="transparent"
                                                className="text-muted"
                                            />
                                            <circle
                                                cx="32"
                                                cy="32"
                                                r="28"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                fill="transparent"
                                                strokeDasharray={175.93} // 2 * pi * 28
                                                strokeDashoffset={175.93 - (175.93 * progress) / 100}
                                                className="text-primary transition-all duration-300 ease-in-out"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-sm font-semibold text-primary">{progress}%</span>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-foreground">
                                            Uploading media...
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Please wait while we process your file
                                        </p>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 text-xs text-red-500 hover:text-red-600 hover:bg-red-500/10"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCancel();
                                        }}
                                    >
                                        Cancel Upload
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-4 p-4 rounded-full bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 shadow-sm border border-primary/20">
                                        <UploadCloud className="w-8 h-8" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-base font-semibold text-foreground">
                                            Click to upload or drag and drop
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            SVG, PNG, JPG or GIF (max. 5MB)
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Advanced Options Bar */}
                    {/* <div className="flex items-center justify-between px-1">
                        <span className="text-xs text-muted-foreground font-medium">Supported formats: High Quality Images</span>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 gap-2 text-xs border-dashed text-muted-foreground hover:text-foreground"
                                >
                                    <Settings2 className="h-3.5 w-3.5" />
                                    Image Settings
                                    {tags.length > 0 && (
                                        <span className="ml-1 rounded-full bg-primary w-4 h-4 text-[10px] flex items-center justify-center text-primary-foreground font-bold">
                                            {tags.length}
                                        </span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-4" align="end">
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Auto-Tags</Label>
                                        <TagsInput
                                            value={tags}
                                            onValueChange={setTags}
                                            placeholder="Add tags..."
                                            maxItems={5}
                                            className="bg-background"
                                        />
                                        <p className="text-[10px] text-muted-foreground">
                                            Tags allow you to organize and filter images later.
                                        </p>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div> */}
                </div>
            )}

            {/* Modals */}
            {tempFile && (
                <ImageCropper
                    open={isCropping}
                    imageSrc={tempFile}
                    onClose={handleCropCancel}
                    onCropComplete={handleCropComplete}
                    aspectRatio={aspectRatio}
                />
            )}

            {value && (
                <ImageViewer
                    open={isViewing}
                    imageSrc={value}
                    onClose={() => setIsViewing(false)}
                />
            )}
        </div>
    );
}

