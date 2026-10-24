"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X, Download, ZoomIn, ZoomOut, RotateCcw, Maximize2, Minimize2 } from "lucide-react";
import { useLenis } from 'lenis/react';
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";

interface ImageViewerProps {
    open: boolean;
    imageSrc: string;
    onClose: () => void;
}

export default function ImageViewer({ open, imageSrc, onClose }: ImageViewerProps) {
    const lenis = useLenis();
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const constraintsRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Lock scroll when open
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

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!open) return;
            switch (e.key) {
                case "Escape": onClose(); break;
                case "+": case "=": handleZoomIn(); break;
                case "-": case "_": handleZoomOut(); break;
                case "0": handleReset(); break;
                case "ArrowLeft": setPosition(p => ({ ...p, x: p.x + 50 })); break;
                case "ArrowRight": setPosition(p => ({ ...p, x: p.x - 50 })); break;
                case "ArrowUp": setPosition(p => ({ ...p, y: p.y + 50 })); break;
                case "ArrowDown": setPosition(p => ({ ...p, y: p.y - 50 })); break;
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open, onClose, scale]);

    const handleZoomIn = () => setScale(s => Math.min(s + 0.5, 4));
    const handleZoomOut = () => setScale(s => Math.max(s - 0.5, 1));
    const handleReset = () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    const handleDownload = async () => {
        try {
            const response = await fetch(imageSrc);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = imageSrc.split('/').pop() || 'download-image';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed:", error);
        }
    };

    // Auto-fit logic could go here, but simple reset is often enough

    const content = (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 backdrop-blur-xl"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (e.target === e.currentTarget) onClose();
                    }}
                >
                    {/* Header Controls (Close & Info) */}
                    <div className="absolute top-0 left-0 right-0 p-4 z-[1000] flex justify-between items-start pointer-events-none">
                        <div className="pointer-events-auto">
                            {/* Placeholder for Title/Metadata if needed */}
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="bg-black/20 hover:bg-white/10 text-white rounded-full pointer-events-auto backdrop-blur-md"
                            onClick={(e) => {
                                e.stopPropagation();
                                onClose();
                            }}
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Main Image Stage */}
                    <div
                        ref={constraintsRef}
                        className="relative w-full h-full flex items-center justify-center overflow-hidden touch-none overscroll-none"
                        onWheel={(e) => {
                            if (e.ctrlKey || e.metaKey) {
                                e.preventDefault();
                                if (e.deltaY < 0) handleZoomIn();
                                else handleZoomOut();
                            }
                        }}
                    >
                        <motion.div
                            drag={scale > 1}
                            dragConstraints={constraintsRef}
                            dragElastic={0.1}
                            animate={{
                                scale: scale,
                                x: position.x,
                                y: position.y
                            }}
                            className="relative w-full h-full max-w-[90vw] max-h-[85vh] cursor-grab active:cursor-grabbing"
                            style={{ touchAction: "none" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={imageSrc}
                                alt="Full View"
                                fill
                                className="object-contain pointer-events-none select-none"
                                priority
                                quality={95}
                            />
                        </motion.div>
                    </div>

                    {/* Bottom Floating Control Bar */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000]">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="flex items-center gap-1 p-2 bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-full shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center gap-1 border-r border-white/10 pr-2 mr-2">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9 text-white/80 hover:text-white hover:bg-white/10 rounded-full"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleZoomOut();
                                    }}
                                    disabled={scale <= 1}
                                >
                                    <ZoomOut className="h-4 w-4" />
                                </Button>
                                <span className="text-xs font-medium text-white/60 min-w-[3ch] text-center">
                                    {Math.round(scale * 100)}%
                                </span>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9 text-white/80 hover:text-white hover:bg-white/10 rounded-full"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleZoomIn();
                                    }}
                                    disabled={scale >= 4}
                                >
                                    <ZoomIn className="h-4 w-4" />
                                </Button>
                            </div>

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 text-white/80 hover:text-white hover:bg-white/10 rounded-full"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleReset();
                                }}
                                title="Reset View"
                            >
                                <RotateCcw className="h-4 w-4" />
                            </Button>

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 text-white/80 hover:text-white hover:bg-white/10 rounded-full"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDownload();
                                }}
                                title="Download"
                            >
                                <Download className="h-4 w-4" />
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    if (!mounted) return null;

    return createPortal(content, document.body);
}
