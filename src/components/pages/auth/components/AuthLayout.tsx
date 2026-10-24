"use client";

import { AuthHero } from './AuthHero';
import { AuthSidebar } from './AuthSidebar';
import { motion } from 'motion/react';

interface AuthLayoutProps {
    children: React.ReactNode;
    heroTitle?: string;
    heroSubtitle?: string;
    sidebarTitle?: string;
    sidebarDescription?: string;
    sidebarFeatures?: string[];
}

export function AuthLayout({
    children,
    heroTitle,
    heroSubtitle,
    sidebarTitle,
    sidebarDescription,
    sidebarFeatures
}: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-background pb-12 md:pb-24">
            {/* Hero Section */}
            <AuthHero title={heroTitle} subtitle={heroSubtitle} />

            {/* Main Content Area - Overlapping the Hero */}
            <div className="relative z-20 -mt-20 px-3 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="max-w-[1400px] mx-auto bg-card rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden border border-border/50"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[600px] lg:min-h-[750px] items-stretch">

                        {/* Left Side - Sidebar & Branding */}
                        <AuthSidebar />

                        {/* Right Side - Form Content */}
                        <div className="col-span-1 lg:col-span-3 bg-background p-5 md:p-12 lg:p-16 flex flex-col justify-center relative">
                            {children}
                        </div>

                    </div>
                </motion.div>
            </div>
        </div>
    );
}
