"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SEVORA_DATA } from "../data/sevora.data";
import { ShieldCheck, Sparkles } from "lucide-react";
import { EnquiryModal } from "../../../home/components/EnquiryModal";

export function FinalConversion() {
  const { product } = SEVORA_DATA;
  const finalImage = product.finalImage || product.image;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const enquiryPkg = {
    id: "sevora",
    title: "Sevora Enquiry",
    templateId: "sevora-enquiry",
    image: finalImage,
    tagline: "Natural Sweetness",
    bodyText: "Get in touch with us to discuss wholesale pricing, distribution, and volume terms for Sevora.",
    showCTA: true,
    color: ""
  };

  return (
    <section className="py-24 md:py-32 bg-white dark:bg-[#020504] overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[4rem] bg-emerald-600 dark:bg-emerald-900/20 p-10 md:p-24 overflow-hidden shadow-2xl shadow-emerald-600/20 border border-white/10"
        >
          {/* Decorative Pattern & Ambient Glow */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center relative z-10">
            
            <div className="text-white space-y-10">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20">
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-emerald-100">Make the Switch</span>
              </div>

              <h2 className="text-4xl md:text-7xl font-serif font-medium leading-[1] tracking-tighter">
                Rewrite your <br /> 
                <span className="italic font-light opacity-80">Sweet Story</span>.
              </h2>

              <p className="text-xl md:text-2xl font-light italic opacity-80 max-w-lg leading-tight">
                Experience the pure, natural evolution of sweetness. Zero calories. Zero compromise.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 pt-6 items-center">
                {/* UPGRADED BUTTON (SYNCHRONIZED WITH NAVIGATION LOGIN STYLE) */}
                <NavButtonStyle onClick={() => setIsModalOpen(true)}>
                  {product.cta}
                </NavButtonStyle>

               
              </div>
            </div>

            {/* Product Image */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-[350px] md:h-[600px] flex items-center justify-center"
            >
              <div className="relative w-full h-full">
                  <Image
                    src={finalImage}
                    alt="Sevora Package"
                    fill
                    className="object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.4)]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>

      <EnquiryModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pkg={enquiryPkg as any}
        brandName="Sevora"
      />

      <style jsx global>{`
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
            className="relative group overflow-hidden px-14 h-20 rounded-full font-black text-xl uppercase tracking-[0.3em] flex items-center justify-center transition-all duration-500 bg-white text-emerald-700 outline-hidden cursor-pointer shadow-xl active:scale-95 z-30"
        >
            {/* Background Fill Animation */}
            <motion.div
                variants={{
                    initial: { y: "100%" },
                    hover: { y: "0%" }
                }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                className="absolute inset-0 z-0 bg-emerald-50 dark:bg-emerald-950/20"
            />

            {/* Shine Effect */}
            <motion.div
                variants={{
                    initial: { x: "-100%", opacity: 0 },
                    hover: { x: "100%", opacity: 0.2 }
                }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute inset-0 z-1 bg-linear-to-r from-transparent via-emerald-600/10 to-transparent skew-x-12"
            />

            <span className="relative z-10 flex items-center justify-center transition-all duration-300 group-hover:scale-[1.05]">
                {children}
            </span>
        </motion.button>
    );
}
