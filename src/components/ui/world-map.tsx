"use client";

import { useRef, useId } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import DottedMap from "dotted-map";

interface MapProps {
    dots?: Array<{
        start: { lat: number; lng: number; label?: string };
        end: { lat: number; lng: number; label?: string };
    }>;
    lineColor?: string;
}

export function WorldMap({
    dots = [],
    lineColor = "#a3ff3e",
    className,
}: MapProps & { className?: string }) {
    const svgRef = useRef<SVGSVGElement>(null);
    const map = new DottedMap({ height: 100, grid: "diagonal" });
    const id = useId();
    const gradientId = `map-gradient-${id.replace(/:/g, "")}`;

    const svgMap = map.getSVG({
        radius: 0.22,
        color: "#94a3b8", // Slate-400 for subtle visibility
        shape: "circle",
        backgroundColor: "transparent",
    });

    const projectPoint = (lat: number, lng: number) => {
        const x = (lng + 180) * (800 / 360);
        const y = (90 - lat) * (400 / 180);
        return { x, y };
    };

    const createCurvedPath = (
        start: { x: number; y: number },
        end: { x: number; y: number }
    ) => {
        const midX = (start.x + end.x) / 2;
        const midY = Math.min(start.y, end.y) - 50;
        return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
    };

    return (
        <div className={`bg-transparent rounded-lg relative font-sans ${className || "w-full aspect-[2/1]"}`}>
            {/* Base World Map Layer */}
            <Image
                src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
                fill
                className="pointer-events-none select-none opacity-40 object-cover"
                alt="world map"
                unoptimized
            />

            <svg
                ref={svgRef}
                viewBox="0 0 800 400"
                className="w-full h-full absolute inset-0 pointer-events-none select-none"
            >
                {dots.map((dot, i) => {
                    const startPoint = projectPoint(dot.start.lat, dot.start.lng);
                    const endPoint = projectPoint(dot.end.lat, dot.end.lng);
                    return (
                        <g key={`path-group-${i}`}>
                            {/* Static path line */}
                            <path
                                d={createCurvedPath(startPoint, endPoint)}
                                fill="none"
                                stroke={lineColor}
                                strokeWidth="0.5"
                                opacity="0.2"
                            />

                            {/* Animated moving line */}
                            <motion.path
                                d={createCurvedPath(startPoint, endPoint)}
                                fill="none"
                                stroke={`url(#${gradientId})`}
                                strokeWidth="2"
                                initial={{
                                    pathLength: 0,
                                    pathOffset: 0,
                                }}
                                animate={{
                                    pathLength: [0, 0.3, 0.3, 0],
                                    pathOffset: [0, 0, 0.7, 1],
                                }}
                                transition={{
                                    duration: 3,
                                    delay: i * 0.4,
                                    repeat: Infinity,
                                    repeatDelay: 0,
                                    ease: "linear",
                                }}
                            />
                        </g>
                    );
                })}

                <defs>
                    {/* Gradient for the animated line */}
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={lineColor} stopOpacity="0" />
                        <stop offset="30%" stopColor={lineColor} stopOpacity="1" />
                        <stop offset="70%" stopColor={lineColor} stopOpacity="1" />
                        <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
                    </linearGradient>
                </defs>

                {dots.map((dot, i) => (
                    <g key={`points-group-${i}`}>
                        <g key={`start-${i}`}>
                            <circle
                                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                                r="2"
                                fill={lineColor}
                            />
                            <circle
                                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                                r="2"
                                fill={lineColor}
                                opacity="0.5"
                            >
                                <animate
                                    attributeName="r"
                                    from="2"
                                    to="8"
                                    dur="1.5s"
                                    begin="0s"
                                    repeatCount="indefinite"
                                />
                                <animate
                                    attributeName="opacity"
                                    from="0.5"
                                    to="0"
                                    dur="1.5s"
                                    begin="0s"
                                    repeatCount="indefinite"
                                />
                            </circle>
                        </g>
                        <g key={`end-${i}`}>
                            <circle
                                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                                r="2"
                                fill={lineColor}
                            />
                            <circle
                                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                                r="2"
                                fill={lineColor}
                                opacity="0.5"
                            >
                                <animate
                                    attributeName="r"
                                    from="2"
                                    to="8"
                                    dur="1.5s"
                                    begin="0s"
                                    repeatCount="indefinite"
                                />
                                <animate
                                    attributeName="opacity"
                                    from="0.5"
                                    to="0"
                                    dur="1.5s"
                                    begin="0s"
                                    repeatCount="indefinite"
                                />
                            </circle>
                        </g>
                    </g>
                ))}
            </svg>
        </div>
    );
}
