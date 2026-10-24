"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import Cropper from "react-easy-crop";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import getCroppedImg from "@/lib/canvasUtils";
import {
    Loader2,
    RotateCw,
    FlipHorizontal,
    FlipVertical,
    RefreshCcw,
    Image as ImageIcon,
    Crop as CropIcon,
    SlidersHorizontal,
    Eye,
    EyeOff,
    Check,
    Undo2,
    RotateCcw
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useLenis } from 'lenis/react';
import { motion, AnimatePresence } from "framer-motion";
// import { DialogDescription } from "@radix-ui/react-dialog";

interface ImageCropperProps {
    open: boolean;
    imageSrc: string;
    onClose: () => void;
    onCropComplete: (croppedImage: Blob) => void;
    aspectRatio?: number;
}

const DEFAULT_ASPECT_RATIOS = [
    { label: "2:1", value: 2 / 1 },
    { label: "16:9", value: 16 / 9 },
    { label: "9:16", value: 9 / 16 },
    { label: "4:3", value: 4 / 3 },
    { label: "4:5", value: 4 / 5 },
    { label: "1:1", value: 1 },
    { label: "Free", value: undefined },
];

function getRatioLabel(decimal: number) {
    for (let denominator = 1; denominator <= 50; denominator++) {
        const numerator = Math.round(decimal * denominator);
        if (Math.abs(decimal - numerator / denominator) < 0.001) {
            return `${numerator}:${denominator}`;
        }
    }
    return "Custom";
}

export default function ImageCropper({
    open,
    imageSrc,
    onClose,
    onCropComplete,
    aspectRatio,
}: ImageCropperProps) {
    const lenis = useLenis();

    useEffect(() => {
        if (open) {
            lenis?.stop();
            document.body.style.overflow = 'hidden';
        } else {
            lenis?.start();
            document.body.style.overflow = '';
        }
        return () => {
            lenis?.start();
            document.body.style.overflow = '';
        };
    }, [open, lenis]);

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [flip, setFlip] = useState({ horizontal: false, vertical: false });
    const [aspect, setAspect] = useState<number | undefined>(aspectRatio ?? 16 / 9);
    const [isComparing, setIsComparing] = useState(false);

    const displayRatios = React.useMemo(() => {
        const ratios = [...DEFAULT_ASPECT_RATIOS];
        if (aspectRatio !== undefined) {
            const exists = ratios.some(r => r.value !== undefined && Math.abs(r.value - aspectRatio) < 0.001);
            if (!exists) {
                // Insert right after 16:9 (or at the top if preferred)
                ratios.splice(2, 0, { label: getRatioLabel(aspectRatio), value: aspectRatio });
            }
        }
        return ratios;
    }, [aspectRatio]);

    // Filter State
    const [filters, setFilters] = useState({
        brightness: 100,
        contrast: 100,
        saturation: 100,
    });

    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const onCropChange = (crop: { x: number; y: number }) => {
        setCrop(crop);
    };

    const onZoomChange = (zoom: number) => {
        setZoom(zoom);
    };

    const onCropCompleteInternal = useCallback(
        (croppedArea: any, croppedAreaPixels: any) => {
            setCroppedAreaPixels(croppedAreaPixels);
        },
        []
    );

    const handleSave = async () => {
        if (!croppedAreaPixels) return;
        setLoading(true);
        try {
            const croppedImage = await getCroppedImg(
                imageSrc,
                croppedAreaPixels,
                rotation,
                flip,
                filters
            );
            if (croppedImage) {
                onCropComplete(croppedImage);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setRotation(0);
        setFlip({ horizontal: false, vertical: false });
        setAspect(aspectRatio ?? 16 / 9);
        setFilters({ brightness: 100, contrast: 100, saturation: 100 });
    };

    // Construct filter string
    const filterString = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%)`;

    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent className="sm:max-w-xl md:max-w-3xl h-[90vh] p-0 gap-0 bg-background border-border text-foreground flex flex-col overflow-hidden shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-xl">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border bg-background/50 backdrop-blur-sm z-10 shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <ImageIcon className="w-5 h-5" />
                        </div>
                        <div>
                            <DialogTitle className="text-sm font-semibold leading-none text-foreground tracking-tight">Studio Editor</DialogTitle>
                            <DialogDescription className="text-[11px] text-muted-foreground mt-0.5">Refine your image</DialogDescription>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Compare button removed as requested */}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">

                    {/* Viewport (Image) */}
                    <div className="relative flex-1 bg-muted/30 flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-border group">
                        <div
                            className="relative w-full h-full p-6 md:p-8"
                            style={{
                                transition: "filter 0.3s ease",
                                filter: isComparing ? "none" : filterString
                            }}
                        >
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                rotation={rotation}
                                aspect={aspect}
                                onCropChange={onCropChange}
                                onCropComplete={onCropCompleteInternal}
                                onZoomChange={onZoomChange}
                                onRotationChange={setRotation}
                                transform={[
                                    `translate(${crop.x}px, ${crop.y}px)`,
                                    `rotateZ(${rotation}deg)`,
                                    `rotateY(${flip.horizontal ? 180 : 0}deg)`,
                                    `rotateX(${flip.vertical ? 180 : 0}deg)`,
                                    `scale(${zoom})`,
                                ].join(" ")}
                                classes={{
                                    containerClassName: "rounded-lg overflow-hidden shadow-2xl border border-white/10",
                                    mediaClassName: "transition-all duration-100 ease-out"
                                }}
                            />
                        </div>
                        {/* Grid Overlay for professional feel */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] bg-[linear-gradient(currentColor_1px,transparent_1px),linear-gradient(90deg,currentColor_1px,transparent_1px)] bg-[size:20px_20px]" />
                    </div>

                    {/* Controls Sidebar */}
                    <div className="w-full md:w-80 flex flex-col bg-background z-20 shrink-0">
                        <Tabs defaultValue="crop" className="flex-1 flex flex-col w-full">
                            <TabsList className="grid w-full grid-cols-2 rounded-none border-b border-border bg-transparent p-0 h-12">
                                <TabsTrigger
                                    value="crop"
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary h-full rounded-tl-none rounded-tr-none transition-none"
                                >
                                    <CropIcon className="w-4 h-4 mr-2" />
                                    Crop
                                </TabsTrigger>
                                <TabsTrigger
                                    value="adjust"
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary h-full rounded-tl-none rounded-tr-none transition-none"
                                >
                                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                                    Adjust
                                </TabsTrigger>
                            </TabsList>

                            <div className="flex-1 overflow-y-auto p-5 relative">
                                <TabsContent value="crop" className="mt-0 space-y-6 focus-visible:outline-none animate-in slide-in-from-left-4 fade-in duration-300 absolute inset-0 p-5 overflow-y-auto">
                                    {/* Aspect Ratio */}
                                    <div className="space-y-3">
                                        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                            Aspect Ratio
                                            {aspectRatio && <span className="ml-2 text-[10px] text-primary normal-case tracking-normal">(Recommended default)</span>}
                                        </Label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {displayRatios.map((ratio) => (
                                                <Button
                                                    key={ratio.label}
                                                    variant={aspect === ratio.value ? "secondary" : "outline"}
                                                    size="sm"
                                                    onClick={() => setAspect(ratio.value)}
                                                    className={cn(
                                                        "justify-start h-9",
                                                        aspect === ratio.value && "bg-primary/10 text-primary border-primary/20"
                                                    )}
                                                >
                                                    <span className={cn("w-2 h-2 rounded-full mr-2", aspect === ratio.value ? "bg-primary" : "bg-muted-foreground/30")} />
                                                    {ratio.label}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Flip */}
                                    <div className="space-y-3">
                                        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Geometry</Label>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setFlip(prev => ({ ...prev, horizontal: !prev.horizontal }))}
                                                className={cn(
                                                    "flex-1 h-9",
                                                    flip.horizontal && "bg-primary/10 border-primary/20 text-primary"
                                                )}
                                            >
                                                <FlipHorizontal className="h-4 w-4 mr-2" />
                                                Flip X
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setFlip(prev => ({ ...prev, vertical: !prev.vertical }))}
                                                className={cn(
                                                    "flex-1 h-9",
                                                    flip.vertical && "bg-primary/10 border-primary/20 text-primary"
                                                )}
                                            >
                                                <FlipVertical className="h-4 w-4 mr-2" />
                                                Flip Y
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Rotate */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Rotate</Label>
                                            <span className="text-xs text-muted-foreground font-mono">{rotation}°</span>
                                        </div>
                                        <Slider
                                            value={[rotation]}
                                            min={-180}
                                            max={180}
                                            step={1}
                                            onValueChange={(vals) => setRotation(vals[0])}
                                            className="py-1"
                                        />
                                    </div>

                                    {/* Zoom */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Zoom</Label>
                                            <span className="text-xs text-muted-foreground font-mono">{zoom.toFixed(1)}x</span>
                                        </div>
                                        <Slider
                                            value={[zoom]}
                                            min={1}
                                            max={3}
                                            step={0.1}
                                            onValueChange={(vals) => setZoom(vals[0])}
                                            className="py-1"
                                        />
                                    </div>
                                </TabsContent>

                                <TabsContent value="adjust" className="mt-0 space-y-6 focus-visible:outline-none animate-in slide-in-from-right-4 fade-in duration-300 absolute inset-0 p-5 overflow-y-auto">
                                    {Object.entries({
                                        Brightness: "brightness",
                                        Contrast: "contrast",
                                        Saturation: "saturation"
                                    }).map(([label, key]) => (
                                        <div key={key} className="space-y-3">
                                            <div className="flex justify-between">
                                                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</Label>
                                                <span className="text-xs text-muted-foreground font-mono">{filters[key as keyof typeof filters]}%</span>
                                            </div>
                                            <Slider
                                                value={[filters[key as keyof typeof filters]]}
                                                min={0}
                                                max={200}
                                                step={2}
                                                onValueChange={(vals) => setFilters(prev => ({ ...prev, [key]: vals[0] }))}
                                                className="py-1"
                                            />
                                        </div>
                                    ))}

                                    <div className="p-4 rounded-lg bg-muted/40 border border-border text-xs text-muted-foreground">
                                        <p>Adjust these settings to enhance your image. Note: Visual adjustments are applied to the final output.</p>
                                    </div>
                                </TabsContent>
                            </div>

                            {/* Actions Footer */}
                            <div className="p-4 border-t border-border bg-background/50 backdrop-blur-sm flex items-center gap-2 justify-between">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleReset}
                                    className="text-xs text-muted-foreground hover:text-foreground"
                                >
                                    <RotateCcw className="mr-2 h-3.5 w-3.5" />
                                    Reset
                                </Button>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={onClose} disabled={loading} className="text-xs">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleSave} size="sm" disabled={loading} className="text-xs min-w-[100px]">
                                        {loading ? (
                                            <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                                        ) : (
                                            <Check className="mr-2 h-3.5 w-3.5" />
                                        )}
                                        Save Changes
                                    </Button>
                                </div>
                            </div>
                        </Tabs>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
