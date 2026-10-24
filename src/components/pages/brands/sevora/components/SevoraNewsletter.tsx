"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export function SevoraNewsletter() {
  return (
    <section className="py-24 bg-[#fafdfb] dark:bg-black/40 overflow-hidden border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto rounded-[3rem] bg-white dark:bg-zinc-900 p-12 md:p-20 border border-border shadow-2xl shadow-emerald-500/5 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-4">
            <h3 className="text-3xl md:text-4xl font-serif">Join the Sevora Wellness Community</h3>
            <p className="text-muted-foreground font-light">
              Get weekly healthy recipes, wellness tips, and exclusive offers. No spam, just sweetness.
            </p>
          </div>
          <div className="w-full md:w-auto flex-1">
            <form className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-14 rounded-full px-8 bg-zinc-50 dark:bg-zinc-950 border-border focus:ring-emerald-500"
                required
              />
              <Button type="submit" className="h-14 px-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold group">
                Subscribe
                <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </form>
            <p className="mt-4 text-[10px] uppercase tracking-widest text-muted-foreground text-center md:text-left">
              By subscribing, you agree to our Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
