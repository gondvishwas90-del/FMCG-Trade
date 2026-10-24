"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SEVORA_DATA } from "../data/sevora.data";
import { CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";
import { EnquiryModal } from "../../../home/components/EnquiryModal";

export function ProductShowcase() {
  const { product } = SEVORA_DATA;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const enquiryPkg = {
    id: "sevora",
    title: "Sevora Enquiry",
    templateId: "sevora-enquiry",
    image: product.image,
    tagline: "Natural Sweetness",
    bodyText: "Get in touch with us to discuss wholesale pricing, distribution, and volume terms for Sevora.",
    showCTA: true,
    color: ""
  };

  return (
    <section id="product" className="py-24 md:py-48 bg-white dark:bg-[#020504] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="bg-emerald-50/30 dark:bg-emerald-950/20 rounded-[4rem] p-12 md:p-32 border border-emerald-500/10 overflow-hidden relative group/section shadow-4xl shadow-emerald-500/0 hover:shadow-emerald-500/5 transition-all duration-1000">
          
          {/* Volumetric BG Glow */}
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none group-hover/section:bg-emerald-500/10 transition-colors duration-1000" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-32 items-center relative z-10">
            
            {/* Image Stage */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative h-[450px] md:h-[750px] flex items-center justify-center p-10"
            >
              <div className="relative w-full h-full group">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain drop-shadow-[0_50px_100px_rgba(16,185,129,0.2)] group-hover:-translate-y-8 group-hover:rotate-2 transition-all duration-1000 scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Floating Particle Decor */}
                  <div className="absolute top-1/4 -right-4 animate-float-slow">
                       <Sparkles className="w-8 h-8 text-emerald-500/20" />
                  </div>
              </div>
            </motion.div>

            {/* Scientific Content Block */}
            <div className="flex flex-col space-y-12">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-emerald-600">Premium Formula</span>
                </div>
                
                <h3 className="text-4xl md:text-7xl font-serif font-medium leading-[0.9] text-foreground tracking-tighter mb-10">
                  {product.title}
                </h3>
                
                <div className="flex items-center gap-6 mb-12">
                     <p className="text-2xl md:text-4xl font-serif font-bold text-foreground opacity-90 italic">
                       {product.name}
                     </p>
                     <div className="h-px flex-1 bg-emerald-500/10" />
                </div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                {product.details.map((detail, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col gap-3 group"
                  >
                    <div className="flex items-center gap-3">
                         <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 group-hover:scale-125 transition-transform" />
                         <span className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-600/60">Verified</span>
                    </div>
                    <span className="text-xl md:text-2xl font-serif italic text-foreground/80 leading-none">{detail}</span>
                  </motion.div>
                ))}
              </div>

              {/* UPGRADED BUTTON (SYNCHRONIZED WITH NAVIGATION LOGIN STYLE) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="pt-12"
              >
                <NavButtonStyle onClick={() => setIsModalOpen(true)}>
                  {product.cta}
                </NavButtonStyle>
                
                <div className="mt-10 flex items-center gap-4 text-xs font-bold text-muted-foreground tracking-tight opacity-60">
                     <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                     Limited launch offer. 100% Satisfaction Guarantee.
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <EnquiryModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pkg={enquiryPkg as any}
        brandName="Sevora"
      />

      <style jsx global>{`
        .shadow-4xl { box-shadow: 0 100px 200px -50px rgba(16, 185, 129, 0.1); }
        @keyframes float-slow {
            0%, 100% { transform: translateY(0) rotate(0); opacity: 0.2; }
            50% { transform: translateY(-30px) rotate(15deg); opacity: 0.4; }
        }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        ::selection {
            background: rgba(16, 185, 129, 0.4);
            color: white;
        }
      `}</style>
    </section>
  );
}

// --- Navigation-Style Button (Synchronized Animation) ---
function NavButtonStyle({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) {
    return (
        <motion.button
            onClick={onClick}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="relative group overflow-hidden px-14 h-20 rounded-full font-black text-xl uppercase tracking-[0.3em] flex items-center justify-center transition-all duration-500 bg-emerald-600 text-white outline-hidden cursor-pointer shadow-2xl active:scale-95 z-30"
        >
            {/* Background Fill Animation */}
            <motion.div
                variants={{
                    initial: { y: "100%" },
                    hover: { y: "0%" }
                }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                className="absolute inset-0 z-0 bg-emerald-400 dark:bg-emerald-500"
            />

            {/* Shine Effect */}
            <motion.div
                variants={{
                    initial: { x: "-100%", opacity: 0 },
                    hover: { x: "100%", opacity: 0.3 }
                }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute inset-0 z-1 bg-linear-to-r from-transparent via-white to-transparent skew-x-12"
            />

            <span className="relative z-10 flex items-center justify-center transition-all duration-300 group-hover:scale-[1.05]">
                {children}
            </span>
        </motion.button>
    );
}
