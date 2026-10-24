"use client";

import { motion } from "motion/react";
import { LegalSection } from "../types/legal.types";
import { TableOfContents } from "./TableOfContents";
import { PolicyNavigation } from "./PolicyNavigation";

interface LegalLayoutProps {
    title: string;
    lastUpdated: string;
    sections: LegalSection[];
    icon?: React.ReactNode;
    children?: React.ReactNode; // For intro text or content before sections
}

export function LegalLayout({ title, lastUpdated, sections, icon, children }: LegalLayoutProps) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Header / Hero */}
            <div className="bg-muted/30 border-b border-border pt-32 pb-16 md:pb-24">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            {icon && (
                                <div className="p-3 bg-card rounded-xl shadow-sm border border-border text-foreground">
                                    {icon}
                                </div>
                            )}
                            <div className="h-px bg-border flex-1 max-w-[100px]" />
                            <span className="text-sm font-medium text-muted-foreground">Legal Reference</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight leading-[0.9]">
                            {title}
                        </h1>

                        <p className="text-muted-foreground font-medium">
                            Last Updated: <span className="text-foreground">{lastUpdated}</span>
                        </p>
                    </motion.div>
                </div>
            </div>

            <PolicyNavigation />

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
                <div className="flex flex-col lg:flex-row gap-16 xl:gap-24 relative">

                    {/* Sticky Table of Contents Sidebar */}
                    <aside className="hidden lg:block w-[280px] shrink-0">
                        <TableOfContents sections={sections} />
                    </aside>

                    {/* Main Content Area */}
                    <div className="flex-1 max-w-3xl">

                        {/* Introduction Content */}
                        {children && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl md:text-2xl text-muted-foreground font-serif leading-relaxed mb-16"
                            >
                                {children}
                            </motion.div>
                        )}

                        {/* Document Sections */}
                        <div className="space-y-16 md:space-y-24">
                            {sections.map((section, idx) => (
                                <motion.section
                                    key={section.id}
                                    id={section.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="scroll-mt-32"
                                >
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="text-sm font-bold text-muted/60 font-mono mt-1.5">
                                            {(idx + 1).toString().padStart(2, '0')}
                                        </div>
                                        {section.icon && (
                                            <div className="bg-muted p-2 rounded-lg text-foreground">
                                                {section.icon}
                                            </div>
                                        )}
                                        <h2 className="text-3xl font-bold text-foreground leading-tight">
                                            {section.title}
                                        </h2>
                                    </div>

                                    <div className="pl-0 md:pl-10 text-lg text-muted-foreground leading-relaxed font-light space-y-6">
                                        {/* Render content directly if passed, or wrapper */}
                                        {section.content}
                                    </div>
                                </motion.section>
                            ))}
                        </div>

                    </div>
                </div>
            </div>


        </div>
    );
}
