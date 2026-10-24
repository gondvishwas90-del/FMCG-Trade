"use client";
import React, { useState, memo, useCallback } from 'react';
import { motion, Variants } from 'framer-motion';
import { Send, CheckCircle2, Loader2, ArrowUpRight, ShieldCheck, Zap, Globe, BarChart3, Handshake } from 'lucide-react';

const REASONS = [
    {
        title: "Exclusive Pipeline",
        description: "Zero ghost stock. Only verified, physical inventory.",
        icon: Zap
    },
    {
        title: "AWRS Compliant",
        description: "Full regulatory transparency for all trade partners.",
        icon: ShieldCheck
    },
    {
        title: "Market Intelligence",
        description: "Data-driven insights to protect your trade margins.",
        icon: BarChart3
    },
    {
        title: "Reliable Logistics",
        description: "Fast, nationwide delivery from our UK hubs.",
        icon: Globe
    },
    {
        title: "Long-term Partnership",
        description: "Dedicated support for wholesalers and retailers.",
        icon: Handshake
    }
];

// --- Variants defined outside ---
const successVariants: Variants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
};

const reasonVariants: Variants = {
    initial: { opacity: 0, x: -20 },
    whileInView: (index: number) => ({
        opacity: 1,
        x: 0,
        transition: { delay: index * 0.1 }
    }),
};

// --- Memoized ReasonItem ---
const ReasonItem = memo(function ReasonItem({ reason, index }: { reason: typeof REASONS[0]; index: number }) {
    return (
        <motion.div 
            custom={index}
            variants={reasonVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="flex gap-5"
        >
            <div className="shrink-0 w-12 h-12 rounded-xl bg-background border border-border/50 flex items-center justify-center text-indigo-600 shadow-sm">
                <reason.icon className="w-6 h-6" />
            </div>
            <div>
                <h4 className="font-bold text-foreground mb-1 uppercase tracking-tight">{reason.title}</h4>
                <p className="text-sm text-muted-foreground leading-snug">{reason.description}</p>
            </div>
        </motion.div>
    );
});

export default function UKEnquiryForm({ id }: { id?: string }) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        companyName: "",
        email: "",
        phone: "",
        requirementType: "",
        volume: "",
        notes: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch("/api/enquire", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    templateId: "uk-trade-enquiry",
                    contactPerson: formData.name // Mapping for schema compatibility
                }),
            });

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                console.error("Failed to send enquiry");
                alert("Failed to send enquiry. Please try again later.");
            }
        } catch (error) {
            console.error("Enquiry error:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = useCallback((field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }, []);

    if (isSubmitted) {
        return (
            <section id={id} className="relative py-24 bg-background">
                <div className="container px-4">
                    <motion.div
                        variants={successVariants}
                        initial="initial"
                        animate="animate"
                        className="max-w-4xl mx-auto flex flex-col items-center justify-center p-20 text-center space-y-8 bg-card border border-indigo-500/20 rounded-[3rem] shadow-2xl shadow-indigo-500/5"
                    >
                        <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-[0_0_50px_rgba(79,70,229,0.3)]">
                            <CheckCircle2 className="w-12 h-12" />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-4xl font-bold tracking-tight uppercase">Enquiry Received</h3>
                            <p className="text-xl text-muted-foreground max-w-lg mx-auto">
                                Our UK trade desk has been notified. A specialist will review your requirements and provide the private price list within 12-24 hours.
                            </p>
                        </div>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="text-lg font-bold text-indigo-500 hover:text-indigo-400 transition-colors flex items-center gap-2 group"
                        >
                            Submit another enquiry
                            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section id={id} className="relative py-24 bg-background px-4">
            <div className="max-w-[1800px] mx-auto bg-card rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden border border-border/50">
                <div className="grid lg:grid-cols-5 min-h-[800px]">
                    {/* Left Side - Info Side */}
                    <div className="lg:col-span-2 bg-indigo-50/30 p-8 md:p-12 lg:p-16 flex flex-col relative overflow-hidden group">
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                        <div className="relative z-10 h-full flex flex-col">
                            <div className="mb-12">
                                <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold text-foreground tracking-tight mb-6">
                                    Secure Your <br /><span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-blue-500">Allocation</span>
                                </h2>
                                <p className="text-xl text-muted-foreground leading-relaxed italic">
                                    Request access to the private UK domestic trade pipeline.
                                </p>
                            </div>

                            <div className="space-y-8 grow">
                                {REASONS.map((reason, index) => (
                                    <ReasonItem key={index} reason={reason} index={index} />
                                ))}
                            </div>

                            <div className="mt-12 pt-12 border-t border-border/50">
                                <p className="text-sm text-muted-foreground">
                                    Trusted by <span className="text-foreground font-bold italic lowercase">established UK Trade Partners</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form Side */}
                    <div className="lg:col-span-3 bg-background p-8 md:p-12 lg:p-20 relative">
                        <form onSubmit={handleSubmit} className="space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
                                <div className="group">
                                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1 ml-1 transition-colors group-focus-within:text-indigo-600">
                                        Full Name
                                    </label>
                                    <input 
                                        required 
                                        type="text" 
                                        value={formData.name}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                        placeholder="Your Name" 
                                        className="w-full px-0 py-4 bg-transparent border-b-2 border-border transition-colors text-xl font-medium text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-indigo-500 rounded-none" 
                                    />
                                </div>
                                <div className="group">
                                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1 ml-1 transition-colors group-focus-within:text-indigo-600">
                                        Company Name
                                    </label>
                                    <input 
                                        required 
                                        type="text" 
                                        value={formData.companyName}
                                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                                        placeholder="Business Entity" 
                                        className="w-full px-0 py-4 bg-transparent border-b-2 border-border transition-colors text-xl font-medium text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-indigo-500 rounded-none" 
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
                                <div className="group">
                                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1 ml-1 transition-colors group-focus-within:text-indigo-600">
                                        Email Address
                                    </label>
                                    <input 
                                        required 
                                        type="email" 
                                        value={formData.email}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                        placeholder="name@company.co.uk" 
                                        className="w-full px-0 py-4 bg-transparent border-b-2 border-border transition-colors text-xl font-medium text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-indigo-500 rounded-none" 
                                    />
                                </div>
                                <div className="group">
                                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1 ml-1 transition-colors group-focus-within:text-indigo-600">
                                        Phone Number
                                    </label>
                                    <input 
                                        required 
                                        type="tel" 
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange("phone", e.target.value)}
                                        placeholder="+44 ..." 
                                        className="w-full px-0 py-4 bg-transparent border-b-2 border-border transition-colors text-xl font-medium text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-indigo-500 rounded-none" 
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
                                <div className="group">
                                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1 ml-1 transition-colors group-focus-within:text-indigo-600">
                                        Requirement Type
                                    </label>
                                    <input 
                                        required 
                                        type="text" 
                                        value={formData.requirementType}
                                        onChange={(e) => handleInputChange("requirementType", e.target.value)}
                                        placeholder="e.g. Rare Malts, House Spirits" 
                                        className="w-full px-0 py-4 bg-transparent border-b-2 border-border transition-colors text-xl font-medium text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-indigo-500 rounded-none" 
                                    />
                                </div>
                                <div className="group">
                                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1 ml-1 transition-colors group-focus-within:text-indigo-600">
                                        Estimated Monthly Volume
                                    </label>
                                    <input 
                                        required 
                                        type="text" 
                                        value={formData.volume}
                                        onChange={(e) => handleInputChange("volume", e.target.value)}
                                        placeholder="e.g. 500+ Cases" 
                                        className="w-full px-0 py-4 bg-transparent border-b-2 border-border transition-colors text-xl font-medium text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-indigo-500 rounded-none" 
                                    />
                                </div>
                            </div>

                            <div className="group pt-4">
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1 ml-1 transition-colors group-focus-within:text-indigo-600">
                                    Additional Notes
                                </label>
                                <textarea 
                                    rows={4} 
                                    value={formData.notes}
                                    onChange={(e) => handleInputChange("notes", e.target.value)}
                                    placeholder="Specific brands or logistical requirements..." 
                                    className="w-full px-0 py-4 bg-transparent border-b-2 border-border transition-colors text-xl leading-relaxed font-medium text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-indigo-500 rounded-none resize-none"
                                ></textarea>
                            </div>

                            <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-8">
                                <p className="text-xs text-muted-foreground max-w-sm">
                                    By submitting this enquiry, you confirm your status as a registered business entity in the UK drinks trade.
                                </p>
                                <motion.button
                                    disabled={isLoading}
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full md:w-auto py-5 px-12 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 transition-all shadow-xl shadow-indigo-500/20 disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            Request Trade Pipeline
                                            <Send className="w-4 h-4" />
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
