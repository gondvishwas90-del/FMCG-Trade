"use client";

import { m } from "motion/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function ConversationCTA() {
  return (
    <section className="relative py-20 md:py-32 bg-background max-md:overflow-x-hidden">

      {/* Background Ambience */}
      <div className="absolute inset-0  pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-linear-to-b from-background to-transparent opacity-80" />
        <m.div
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-emerald-100/30 dark:bg-emerald-500/10 rounded-full blur-[60px] md:blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">

          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-card rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 shadow-2xl shadow-emerald-500/5 border border-border overflow-hidden text-center"
          >
            {/* Decorative Gradient Border Effect via pseudo-element simulation or inner shadow */}
            <div className="absolute inset-0 border-4 md:border-[6px] border-muted rounded-[2rem] md:rounded-[3rem] pointer-events-none" />

            <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tighter mb-6 md:mb-8 leading-[0.95]">
              Let’s Start a <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600">Conversation.</span>
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed font-light">
              Trade partnerships begin with direct dialogue. Reach out to discuss your requirements, portfolio needs, or market access objectives.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full sm:w-auto">
              <CTAButton href="/contact" primary>
                Contact Sales
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </CTAButton>

              <CTAButton href="/categories">
                View Portfolio
              </CTAButton>
            </div>

          </m.div>

        </div>
      </div>
    </section>
  );
}

function CTAButton({ children, href, primary = false }: { children: React.ReactNode; href: string; primary?: boolean }) {
  return (
    <Link
      href={href}
      className={`relative group overflow-hidden px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-500 min-w-[200px] hover:scale-[1.02] active:scale-[0.98] ${primary ? 'bg-foreground text-background dark:bg-emerald-600 dark:text-white' : 'bg-muted/50 text-foreground border border-border/50 hover:border-emerald-500/30'}`}
    >
      {/* Background Fill Animation */}
      <span className={`absolute inset-0 z-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${primary ? 'bg-emerald-400 dark:bg-emerald-500' : 'bg-emerald-500/10 dark:bg-emerald-500/10'}`} />

      <span className="relative z-10 flex items-center justify-center transition-colors duration-300 group-hover:scale-[1.02]">
        {children}
      </span>
    </Link>
  );
}