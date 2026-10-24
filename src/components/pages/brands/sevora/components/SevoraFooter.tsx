"use client";

import React from "react";
import Link from "next/link";
import { SEVORA_DATA } from "../data/sevora.data";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function SevoraFooter() {
  const { footer } = SEVORA_DATA;

  return (
    <footer className="py-20 bg-white dark:bg-[#050a08] border-t border-border overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/brands/sevora" className="text-3xl font-serif font-bold text-emerald-600">
              Sevora
            </Link>
            <p className="text-muted-foreground font-light leading-relaxed">
              Nature’s finest sweetener, crafted for health-conscious lives. Zero calories, 100% natural, pure sweetness.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-border flex items-center justify-center text-muted-foreground hover:bg-emerald-500 hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-border flex items-center justify-center text-muted-foreground hover:bg-emerald-500 hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-border flex items-center justify-center text-muted-foreground hover:bg-emerald-500 hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
            <ul className="space-y-4">
              {footer.links.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-muted-foreground hover:text-emerald-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6 uppercase tracking-widest text-xs">Legal</h4>
            <ul className="space-y-4">
              {footer.legal.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-muted-foreground hover:text-emerald-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 rounded-[2rem] bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/20">
            <h4 className="font-bold text-emerald-600 mb-4 uppercase tracking-widest text-xs">Sustainability</h4>
            <p className="text-sm text-muted-foreground italic mb-4">
              "Every bottle of Sevora supports sustainable stevia farming and reduces plastic waste."
            </p>
            <div className="w-12 h-1 bg-emerald-500 rounded-full" />
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
            © 2026 Sevora Stevia. A brand under FMCG Group.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Certified Premium Quality</span>
            <div className="w-1 h-1 bg-emerald-500 rounded-full" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Global Distribution</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
