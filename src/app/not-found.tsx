"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { ArrowLeft, Home, Search, Package, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const cardSets = [
  [
    { title: "How We Work", description: "Our process", href: "/how-we-work" },
    { title: "Digital Services", description: "Transform digitally", href: "/digital-services" },
    { title: "UK Domestic Trade", description: "Expand into UK", href: "/uk-domestic-trade" },
    { title: "Trade Deals", description: "Global deals", href: "/trade-opportunities" },
    { title: "About Us", description: "Our story", href: "/about" },
    { title: "Contact", description: "Get in touch", href: "/contact" },
  ],
  [
    { title: "Spirits", description: "Whisky, Vodka, Rum", href: "/categories/spirits" },
    { title: "Wine & Champagne", description: "Red, White, Rosé", href: "/categories/wine" },
    { title: "Beer & Cider", description: "Craft Beer, Lager", href: "/categories/beer" },
    { title: "Cocktail & Mixers", description: "RTD, Soft Drinks", href: "/categories/cocktails" },
    { title: "Food & Grocery", description: "Confectionery, Snacks", href: "/categories/food-grocery" },
    { title: "Brands", description: "All partners", href: "/brands" },
  ],
];

export default function NotFound() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-12">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95" />

      <BackgroundGrid />

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center text-center w-full max-w-5xl"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-6 group cursor-default"
            >
              <div className="text-[8rem] md:text-[12rem] font-bold leading-none tracking-tighter select-none flex gap-0">
                {["4", "0", "4"].map((digit, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{
                      y: 0,
                      opacity: 1,
                    }}
                    transition={{
                      delay: 0.3 + i * 0.1,
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{
                      y: -8,
                    }}
                    className="text-foreground/10 group-hover:text-primary transition-colors duration-300"
                  >
                    {digit}
                  </motion.span>
                ))}
              </div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl"
              />
              <motion.div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-2 bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-full opacity-0 group-hover:opacity-100"
                animate={{
                  width: ["0%", "100%", "0%"],
                  opacity: [0, 0.5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-3"
            >
              Page Not Found
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="text-muted-foreground text-lg mb-8 max-w-md"
            >
              The page you&apos;re looking for doesn&apos;t exist.
              Explore our main sections below.
            </motion.p>

            <div className="w-full overflow-hidden py-4">
              <MarqueeCards cards={cardSets[0]} direction="left" />
            </div>

            <div className="w-full overflow-hidden py-4">
              <MarqueeCards cards={cardSets[1]} direction="right" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-wrap gap-3 justify-center mt-4"
            >
              <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-all">
                <Link href="/">
                  <Home className="w-4 h-4" />
                  Back to Home
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg">
                <Link href="/contact">
                  <Search className="w-4 h-4" />
                  Get Help
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mt-10 flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Package className="w-4 h-4" />
              <span>FMCG Exchange</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}

function MarqueeCards({
  cards,
  direction,
}: {
  cards: { title: string; description: string; href: string }[];
  direction: "left" | "right";
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isLeft = direction === "left";
  const duplicatedCards = [...cards, ...cards, ...cards];
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    if (isHovered) {
      const computedStyle = window.getComputedStyle(element);
      const currentX = parseFloat(computedStyle.getPropertyValue('transform').split(',')[4]) || 0;
      element.style.setProperty('--current-x', String(currentX));
      element.style.animationPlayState = 'paused';
    } else {
      element.style.animationPlayState = 'running';
    }
  }, [isHovered]);

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        ref={ref}
        className="flex gap-3 whitespace-nowrap"
        animate={{ x: isLeft ? ["0%", "-33.33%"] : ["-33.33%", "0%"] }}
        transition={{
          duration: isLeft ? 25 : 30,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          animationPlayState: isHovered ? 'paused' : 'running',
        }}
      >
        {duplicatedCards.map((card, i) => (
          <Link
            key={i}
            href={card.href}
            className={cn(
              "flex-shrink-0 flex items-center justify-between w-48 p-3 rounded-lg",
              "bg-muted/30 dark:bg-muted/20 border border-border/50",
              "hover:bg-muted/50 hover:border-border transition-all duration-300",
              "group"
            )}
          >
            <div className="text-left">
              <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                {card.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
          </Link>
        ))}
      </motion.div>
    </div>
  );
}

function BackgroundGrid() {
  const { scrollY } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);

  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -80]);

  const springY1 = useSpring(y1, { damping: 20, stiffness: 100 });
  const springY2 = useSpring(y2, { damping: 20, stiffness: 100 });

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size=50px_50px]" />

      <motion.div
        style={{ y: springY1 }}
        className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full"
      >
        <div className="w-full h-full rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl" />
      </motion.div>

      <motion.div
        style={{ y: springY2 }}
        className="absolute bottom-[20%] right-[10%] w-48 h-48 rounded-full"
      >
        <div className="w-full h-full rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl" />
      </motion.div>
    </div>
  );
}