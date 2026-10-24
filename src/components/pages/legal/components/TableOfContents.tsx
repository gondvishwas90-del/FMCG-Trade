"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { LegalSection } from "../types/legal.types";

interface TableOfContentsProps {
    sections: LegalSection[];
}

export function TableOfContents({ sections }: TableOfContentsProps) {
    const [activeSection, setActiveSection] = useState<string>("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-20% 0px -50% 0px",
                threshold: 0.1,
            }
        );

        sections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [sections]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            // Offset for sticky header
            const yOffset = -120;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <nav className="hidden lg:block sticky top-32 self-start w-full max-w-[280px]">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6 px-4">
                Contents
            </h4>
            <div className="relative">
                {/* Active Indicator Line */}
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-border" />

                <ul className="space-y-1">
                    {sections.map((section) => (
                        <li key={section.id} className="relative">
                            <button
                                onClick={() => scrollToSection(section.id)}
                                className={cn(
                                    "block w-full text-left py-2 pl-4 pr-4 text-sm transition-all duration-300 border-l-2",
                                    activeSection === section.id
                                        ? "border-emerald-500 text-emerald-900 dark:text-emerald-400 font-semibold bg-emerald-50/50 dark:bg-emerald-950/20"
                                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                                )}
                            >
                                {section.title}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
