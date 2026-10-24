"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "next-themes";
import Image from "next/image";

const navLinks = [
    { title: "How We Work", href: "/how-we-work" },
    { title: "Sevora", href: "/brands/sevora" },
    { title: "UK Domestic Trade ", href: "/uk-domestic-trade" },
    { title: "Categories", href: "/categories" },
    { title: "Brands", href: "/brands" },
    { title: "Brand Owners", href: "/brand-owners" },
    { title: "Trade Opportunities", href: "/trade-opportunities" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
];

export function Navigation() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false); // controls when width should collapse
    const [hidden, setHidden] = useState(false);
    const { scrollY } = useScroll();
    const navRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const pathname = usePathname();
    const customEasing = [0.22, 1, 0.36, 1] as const;

    const isFilterStructurePage =
        pathname?.startsWith("/categories") ||
        pathname === "/brands" ||
        pathname?.startsWith("/brand-owners");

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (isFilterStructurePage) {
            // For categories, brands, and brand-owners pages with sticky filters:
            // Keep navbar at the top of the page. Once scrolled past the hero (> 120px),
            // hide navbar and keep it hidden on scroll-up so only filters stick.
            // Only reveal navbar when scrolled all the way back to the top (<= 120px).
            if (latest > 120) {
                setHidden(true);
            } else {
                setHidden(false);
            }
        } else {
            // Default behavior on other pages: show on scroll-up, hide on scroll-down
            if (latest > previous && latest > 150) {
                setHidden(true);
            } else {
                setHidden(false);
            }
        }
    });

    // Reset visibility on route change
    useEffect(() => {
        setHidden(false);
        setIsOpen(false);
    }, [pathname]);

    // Handle hydration
    useEffect(() => {
        setMounted(true);
    }, []);

    // Open: set both true. Close: set isOpen false, then after height anim, set menuVisible false
    useEffect(() => {
        if (isOpen) {
            setMenuVisible(true);
            document.body.style.overflow = "hidden"; // Lock scroll
        } else if (menuVisible) {
            document.body.style.overflow = ""; // Unlock scroll
            // Wait for height animation to finish before collapsing width
            const timeout = setTimeout(() => setMenuVisible(false), 700); // match height anim duration
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [isOpen, menuVisible]);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                (isOpen || menuVisible) &&
                navRef.current &&
                !navRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, menuVisible]);

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    // Only hide if NOT open. If open, always show.
    // We defer the "isMobile" check for hiding logic to avoiding hydration mismatch is tricky,
    // but for "hidden" state it's less visually jarring than initial width.
    //Ideally we rely on CSS media queries for hiding or accept a small hydration shift for scroll behavior only.
    // For now, let's keep the scroll hidden behavior simple: if hidden matches, we hide.
    // Only hide if NOT open. If open, always show.
    // We defer the "isMobile" check for hiding logic to avoiding hydration mismatch is tricky,
    // but for "hidden" state it's less visually jarring than initial width.
    //Ideally we rely on CSS media queries for hiding or accept a small hydration shift for scroll behavior only.
    // For now, let's keep the scroll hidden behavior simple: if hidden matches, we hide.
    const isNavHidden = hidden && !isOpen && !menuVisible;

    // Inverted theme logic: 
    // We always use the "opposite" variables to achieve inversion.
    // bg-foreground is light in dark mode, and dark in light mode.
    // text-background is dark in dark mode, and light in light mode.
    const navClasses = "bg-foreground/95 text-background border-background/10";
    const itemMutedClasses = "text-background/60";
    const itemHoverClasses = "hover:text-emerald-400";

    return (
        <motion.div
            ref={navRef}
            className={`fixed left-1/2 backdrop-blur-xl rounded-[2rem] overflow-hidden z-200 border [--nav-width:92vw] md:[--nav-width:34vw] max-h-[calc(100vh-32px)] transition-colors duration-500 ${navClasses}`}
            style={{
                top: "16px",
                width: "var(--nav-width)",
                x: "-50%"
            }}
            initial={{
                width: "var(--nav-width)",
                y: 0,
                x: "-50%"
            }}
            animate={{
                width: menuVisible ? "95vw" : "var(--nav-width)",
                maxWidth: "95vw", // Always allow up to max width
                y: isNavHidden ? -120 : 0,
                x: "-50%"
            }}
            transition={{
                width: {
                    duration: 0.5,
                    ease: customEasing,
                    delay: menuVisible ? 0 : 0.7, // On close, width animates after height
                },
                y: { duration: 0.3 },
                x: { duration: 0 } // Don't animate X, keep it pinned
            }}
        >
            {/* Navbar Header */}
            <div className="flex items-center justify-between px-3 md:px-8 lg:py-5 py-2 h-[72px] md:h-[80px] flex-shrink-0">
                {/* Left: Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="group flex items-center gap-2 md:gap-3 transition-colors cursor-pointer outline-hidden"
                >
                    <div className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full bg-background/10 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 group-active:scale-95 text-background">
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </div>
                    <span className="font-bold tracking-widest uppercase text-[10px] hidden md:block opacity-60 group-hover:opacity-100 transition-opacity text-background">
                        {isOpen ? "Close" : "Menu"}
                    </span>
                </button>

                {/* Center: Logo */}
                <Link
                    href="/"
                    onClick={handleLinkClick}
                    className="absolute left-1/2 -translate-x-1/2 transition-all duration-500 hover:scale-105"
                >
                    <div className="h-10 md:h-14 lg:h-16 w-40 md:w-56 lg:w-64 relative">
                        {/* Dark Mode Logo */}
                        <Image
                            src="/logos/FMCG-logo(2)-dark.png"
                            alt="FMCG Exchange Logo"
                            fill
                            className="object-contain hidden dark:block"
                            priority
                        />
                        {/* Light Mode Logo */}
                        <Image
                            src="/logos/FMCG-logo(2)-white.png"
                            alt="FMCG Exchange Logo"
                            fill
                            className="object-contain block dark:hidden"
                            priority
                        />
                    </div>
                </Link>

                {/* Right: Theme Toggle */}
                <div className="flex items-center gap-2 md:gap-3">
                    <ThemeToggle />
                </div>
            </div>

            {/* Menu Content */}
            {menuVisible && (
                <motion.div
                    className="overflow-y-auto custom-scrollbar max-h-[calc(100vh-120px)]"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{
                        height: {
                            duration: 0.7,
                            ease: customEasing,
                            delay: isOpen ? 0.5 : 0,
                        },
                        opacity: {
                            duration: isOpen ? 0.4 : 0.2,
                            delay: isOpen ? 0.7 : 0,
                        },
                    }}
                >
                    <div className="px-4 md:px-12 pb-8 md:pb-12 pt-4 md:pt-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24">


                            {/* Right: Navigation Links */}
                            <nav className="lg:col-span-8 flex flex-col">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                                    {navLinks.map((link, index) => (
                                        <motion.div
                                            key={link.title}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={isOpen ? { opacity: 1, x: 0 } : {}}
                                            transition={{ delay: 0.7 + index * 0.05, duration: 0.5 }}
                                            className="group relative flex items-baseline gap-4 cursor-pointer py-1 border-b border-background/10 hover:border-emerald-500/30 transition-colors"
                                        >
                                            <span className="text-[10px] font-mono transition-colors text-background/50 group-hover:text-emerald-500">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                            <Link
                                                href={link.href}
                                                onClick={handleLinkClick}
                                                className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tighter transition-all duration-500 group-hover:translate-x-2 text-background hover:text-emerald-500"
                                            >
                                                {link.title}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Basement Section */}
                                <div className="mt-auto pt-12 flex flex-col md:flex-row gap-8 justify-between text-[10px] uppercase tracking-widest font-bold text-background/60">
                                    <div className="flex flex-col gap-4">
                                        <div>
                                            <p className="mb-2 opacity-50">Commercial Inquiries</p>
                                            <a
                                                href="mailto:Enquiry@fmcg-exchange.com"
                                                className="transition-colors text-xs lowercase text-background hover:text-emerald-500"
                                            >
                                                Enquiry@fmcg-exchange.com
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex gap-8 items-end">
                                        <div className="flex gap-6">
                                            <a href="https://www.linkedin.com/company/fmcg-exchange-ltd/" target="_blank" rel="noopener noreferrer" className="transition-colors group hover:text-background">
                                                LinkedIn
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </nav>


                            {/* Left: Marketing Banner (Desktop Only or Top on Mobile) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={isOpen ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.8, duration: 0.6 }}
                                className="lg:col-span-4 flex flex-col "
                            >
                                <div className="group relative aspect-auto lg:aspect-auto lg:h-full rounded-3xl overflow-hidden bg-background/10 border border-background/20 p-6 md:p-8 flex flex-col justify-end shadow-2xl ">
                                    {/* Mesh Gradient Background */}
                                    <div className="absolute inset-0 z-0 opacity-40">
                                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,#10b981_0%,transparent_50%)]" />
                                        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,#6366f1_0%,transparent_50%)]" />
                                    </div>

                                    <div className="relative z-10">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-700/10 border border-emerald-500/20 dark:border-emerald-700/20 text-emerald-400 dark:text-emerald-700 text-[10px] font-bold uppercase tracking-widest mb-4 md:mb-6">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-600 animate-pulse" />
                                            Commercial Trade Only
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-bold tracking-tighter mb-2 md:mb-4 leading-tight text-background">
                                            Global FMCG <br />Sourcing & Supply
                                        </h3>
                                        <p className="text-background/60 text-xs md:text-sm leading-relaxed mb-4 md:mb-8 max-w-[240px]">
                                            Dedicated to commercial buyers, distributors, and importers for pallet and container loads. We do not sell retail.
                                        </p>
                                        <Link
                                            href="/how-we-work"
                                            onClick={handleLinkClick}
                                            className="group/btn flex items-center gap-3 text-background font-bold text-xs uppercase tracking-widest"
                                        >
                                            Explore Trade Capabilities
                                            <div className="w-8 h-8 rounded-full bg-background/10 flex items-center justify-center group-hover/btn:bg-background group-hover/btn:text-foreground transition-all duration-500">
                                                <ArrowUpRight className="w-4 h-4" />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>


                        </div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}

function NavButton({ children, onClick, isDarkNav }: { children: React.ReactNode; onClick?: () => void; isDarkNav?: boolean }) {
    return (
        <motion.button
            onClick={onClick}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="relative group overflow-hidden px-8 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center transition-all duration-500 outline-hidden cursor-pointer bg-background text-foreground hover:text-white"
        >
            {/* Background Fill Animation */}
            <motion.div
                variants={{
                    initial: { y: "100%" },
                    hover: { y: "0%" }
                }}
                transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                className="absolute inset-0 z-0 bg-emerald-400"
            />

            {/* Shine Effect */}
            <motion.div
                variants={{
                    initial: { x: "-100%", opacity: 0 },
                    hover: { x: "100%", opacity: 0.3 }
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 z-1 bg-linear-to-r from-transparent via-white to-transparent skew-x-12"
            />

            <span className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.02]">
                {children}
            </span>
        </motion.button>
    );
}