"use client";

import React, { useEffect, useState } from "react";
import { Facebook, Instagram, Linkedin, Twitter, Leaf, Zap, ArrowRight, Globe } from "lucide-react";
import { WorldMap } from "@/components/ui/world-map";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

interface Footer7Props {
    logo?: {
        url: string;
        text: string;
    };
    sections?: Array<{
        title: string;
        links: Array<{ name: string; href: string }>;
        isDark?: boolean; // Special flag for dark styling
    }>;
    description?: string;
    socialLinks?: Array<{
        icon: React.ReactElement;
        href: string;
        label: string;
    }>;
    copyright?: string;
    legalLinks?: Array<{
        name: string;
        href: string;
    }>;
}

const defaultSections = [
    {
        title: "Navigation",
        links: [
            { name: "Home", href: "/" },
            { name: "Categories", href: "/categories" },
            { name: "Brands", href: "/brands" },
            { name: "Brand Owners", href: "/brand-owners" },
            { name: "Trade Opportunities", href: "/trade-opportunities" },
            { name: "About", href: "/about" },
            { name: "Contact", href: "/contact" },
        ],
    },
    {
        title: "POLICIES",
        links: [
            { name: "Terms & Conditions", href: "/terms" },
            { name: "Privacy Policy", href: "/privacy-policy" },
        ],
        isDark: true, // Special flag for dark styling
    },
];

const defaultSocialLinks = [
    { icon: <Linkedin className="h-8 w-8" />, href: "https://www.linkedin.com/company/fmcg-exchange-ltd/", label: "LinkedIn" },
];

const defaultLegalLinks = [
    { name: "Terms and Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy-policy" },
];

export const Footer = ({
    logo = {
        url: "/",
        text: "FMCG Exchange",
    },
    sections = defaultSections,
    description = "FMCG Exchange is a B2B platform specializing in commercial FMCG supply, international distribution, and trade sourcing for verified buyers worldwide. We do not operate as a retail store.",
    socialLinks = defaultSocialLinks,
    copyright = "© 2025 FMCG Exchange. All rights reserved.",
    legalLinks = defaultLegalLinks,
}: Footer7Props) => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <footer id="footer" className="bg-background pt-16 md:pt-24 min-h-screen flex flex-col relative z-50">
            <div className="container mx-auto px-4 mb-12 md:mb-20 text-center">
                <h2 className="text-4xl md:text-7xl font-bold text-foreground tracking-tighter mb-4 md:mb-6">
                    Global <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-500">Connectivity.</span>
                </h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Connecting commercial trade partners across continents. Facilitating reliable, compliant B2B FMCG wholesale distribution, pallet supply, and bulk sourcing.
                </p>
                <div className="w-16 md:w-24 h-1 bg-emerald-500 mx-auto mt-6 md:mt-8 rounded-full" />
            </div>

            {/* Mobile World Map - In between sections */}
            <div className="block md:hidden w-full h-[250px] relative opacity-50 mb-8 overflow-hidden">
                <WorldMap
                    className="h-full w-full aspect-auto scale-110"
                    dots={[
                        {
                            start: { lat: 40.7128, lng: -74.006 },
                            end: { lat: 51.5074, lng: -0.1278 },
                        },
                        {
                            start: { lat: 51.5074, lng: -0.1278 },
                            end: { lat: 28.6139, lng: 77.209 },
                        },
                        {
                            start: { lat: 28.6139, lng: 77.209 },
                            end: { lat: 35.6762, lng: 139.6503 },
                        },
                        {
                            start: { lat: 35.6762, lng: 139.6503 },
                            end: { lat: -33.8688, lng: 151.2093 },
                        },
                        {
                            start: { lat: -23.5505, lng: -46.6333 },
                            end: { lat: 40.7128, lng: -74.006 },
                        },
                        {
                            start: { lat: 1.3521, lng: 103.8198 },
                            end: { lat: 22.3193, lng: 114.1694 },
                        },
                    ]}
                    lineColor="#10b981"
                />
            </div>

            <div className="relative pb-8 md:pb-12 overflow-hidden flex-1 flex flex-col justify-end">
                {/* Desktop World Map Background Layer */}
                {/* Desktop World Map Background Layer */}
                <div className="absolute inset-0 z-0 pointer-events-none hidden md:flex items-center justify-center opacity-30 md:opacity-100">
                    <div className="w-full max-w-[1600px] 3xl:max-w-[2400px] aspect-2/1 flex items-center justify-center">
                        <WorldMap
                            className="w-full h-full"
                            dots={[
                                {
                                    start: { lat: 40.7128, lng: -74.006 }, // New York
                                    end: { lat: 51.5074, lng: -0.1278 }, // London
                                },
                                {
                                    start: { lat: 51.5074, lng: -0.1278 }, // London
                                    end: { lat: 28.6139, lng: 77.209 }, // New Delhi
                                },
                                {
                                    start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                                    end: { lat: 35.6762, lng: 139.6503 }, // Tokyo
                                },
                                {
                                    start: { lat: 35.6762, lng: 139.6503 }, // Tokyo
                                    end: { lat: -33.8688, lng: 151.2093 }, // Sydney
                                },
                                {
                                    start: { lat: -23.5505, lng: -46.6333 }, // São Paulo
                                    end: { lat: 40.7128, lng: -74.006 }, // New York
                                },
                                {
                                    start: { lat: 1.3521, lng: 103.8198 }, // Singapore
                                    end: { lat: 22.3193, lng: 114.1694 }, // Hong Kong
                                },
                            ]}
                            lineColor="#10b981" // Emerald green for the flights
                        />
                    </div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    {/* Footer Links & Content */}
                    <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 py-8 px-4 md:px-8">
                        <div className="absolute inset-0 bg-background/60 backdrop-blur-[0.5px] border border-white/10 dark:border-white/5 -z-10 rounded-3xl shadow-lg" />

                        {/* Brand Column */}
                        <div className="col-span-1 lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left gap-8 pr-0 lg:pr-12">
                            <Link href={logo.url} className="flex items-center group">
                                <div className="h-20 md:h-24 lg:h-28 w-24 md:w-32 lg:w-36 relative">
                                    {mounted ? (
                                        <Image
                                            src={resolvedTheme === "dark" ? "/logos/FMCG-logo(1)-white.png" : "/logos/FMCG-logo(1)-dark.png"}
                                            alt="FMCG Logo"
                                            fill
                                            className="object-contain transition-transform duration-300 group-hover:scale-105"
                                            priority
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-transparent" />
                                    )}
                                </div>
                            </Link>

                            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                                {description}
                            </p>

                            <div className="flex items-center justify-center lg:justify-start gap-3">
                                <div className="h-px w-8 bg-emerald-500/30 hidden lg:block" />
                                <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                                    Commercial Trade Only | AWRS Registered | Fully Compliant UK Supplier
                                </span>
                            </div>

                            <ul className="flex items-center justify-center lg:justify-start gap-4">
                                {socialLinks.map((social, idx) => (
                                    <li key={idx}>
                                        <a
                                            href={social.href}
                                            aria-label={social.label}
                                            className="w-14 h-14 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:bg-emerald-50 dark:hover:bg-emerald-900/10 hover:text-emerald-600 hover:scale-110 transition-all duration-300 border border-border"
                                        >
                                            {social.icon}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Links & Cards Columns */}
                        <div className="col-span-1 lg:col-span-8">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
                                {sections.map((section, sectionIdx) => (
                                    <div key={sectionIdx}>
                                        <h3 className="mb-6 font-bold text-foreground tracking-wide text-sm uppercase">
                                            {section.title}
                                        </h3>
                                        <ul className="space-y-4 text-sm">
                                            {section.links.map((link, linkIdx) => (
                                                <li key={linkIdx}>
                                                    {link.href.startsWith('/') ? (
                                                        <Link
                                                            href={link.href}
                                                            className="text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 flex items-center gap-2 group"
                                                        >
                                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 scale-0 group-hover:scale-100 transition-transform duration-200" />
                                                            <span className="group-hover:translate-x-1 transition-transform duration-200">{link.name}</span>
                                                        </Link>
                                                    ) : (
                                                        <a
                                                            href={link.href}
                                                            className="text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 flex items-center gap-2 group"
                                                        >
                                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 scale-0 group-hover:scale-100 transition-transform duration-200" />
                                                            <span className="group-hover:translate-x-1 transition-transform duration-200">{link.name}</span>
                                                        </a>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}

                                {/* Sevora Brand Card */}
                                <div className="col-span-2 md:col-span-1 flex flex-col">
                                    <Link
                                        href="/brands/sevora"
                                        className="group relative flex flex-col h-full min-h-[160px] rounded-2xl overflow-hidden border border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-500 shadow-sm hover:shadow-emerald-500/10"
                                    >
                                        <div className="absolute inset-0 bg-emerald-50/50 dark:bg-emerald-950/20 group-hover:bg-emerald-50/80 dark:group-hover:bg-emerald-950/40 transition-colors" />
                                        <div className="relative p-5 flex flex-col h-full">
                                            <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-emerald-500/20 flex items-center justify-center text-emerald-600 shadow-sm mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                                                <Leaf className="w-5 h-5 fill-emerald-500/10" />
                                            </div>
                                            <h4 className="text-sm font-bold text-foreground mb-1">Sevora Brand</h4>
                                            <p className="text-[10px] text-muted-foreground leading-relaxed flex-1">
                                                Premium 100% natural plant-based zero-calorie sweeteners.
                                            </p>
                                            <div className="mt-4 flex items-center text-[10px] font-bold text-emerald-600 uppercase tracking-widest gap-2 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500">
                                                Explore <ArrowRight className="w-3 h-3" />
                                            </div>
                                        </div>
                                        {/* Decorative element */}
                                        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-emerald-500/10 blur-2xl group-hover:bg-emerald-500/20 transition-all duration-700" />
                                    </Link>
                                </div>

                                {/* Digital Services Card */}
                                <div className="col-span-2 md:col-span-1 flex flex-col">
                                    <Link
                                        href="/digital-services"
                                        className="group relative flex flex-col h-full min-h-[160px] rounded-2xl overflow-hidden border border-blue-500/10 hover:border-blue-500/30 transition-all duration-500 shadow-sm hover:shadow-blue-500/10"
                                    >
                                        <div className="absolute inset-0 bg-blue-50/50 dark:bg-blue-950/20 group-hover:bg-blue-50/80 dark:group-hover:bg-blue-950/40 transition-colors" />
                                        <div className="relative p-5 flex flex-col h-full">
                                            <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-blue-500/20 flex items-center justify-center text-blue-600 shadow-sm mb-4 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
                                                <Zap className="w-5 h-5 fill-blue-500/10" />
                                            </div>
                                            <h4 className="text-sm font-bold text-foreground mb-1">Digital Services</h4>
                                            <p className="text-[10px] text-muted-foreground leading-relaxed flex-1">
                                                Integrated ecosystems for multi-region brand expansion.
                                            </p>
                                            <div className="mt-4 flex items-center text-[10px] font-bold text-blue-600 uppercase tracking-widest gap-2 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500">
                                                View Services <ArrowRight className="w-3 h-3" />
                                            </div>
                                        </div>
                                        {/* Decorative element */}
                                        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-500/10 blur-2xl group-hover:bg-blue-500/20 transition-all duration-700" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Copyright & Legal */}
                        <div className="col-span-1 lg:col-span-12 mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
                            <p className="text-muted-foreground text-sm font-medium">{copyright}</p>
                            <ul className="flex flex-wrap justify-center gap-8">
                                {legalLinks.map((link, idx) => (
                                    <li key={idx}>
                                        <Link href={link.href} className="text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 text-sm font-medium transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
