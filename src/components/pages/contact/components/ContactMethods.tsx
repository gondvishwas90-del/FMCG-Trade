"use client";

import { motion } from 'motion/react';
import { MessageSquare, Phone, Mail, Calendar } from 'lucide-react';
import { contactMethods } from '../data/contact-methods.data';

// Icon map for dynamic rendering
const iconMap = {
    MessageSquare,
    Phone,
    Mail,
    Calendar
};

export function ContactMethods() {
    return (
        <div className="space-y-6">
            {contactMethods.map((method, index) => {
                const IconComponent = iconMap[method.icon];

                return (
                    <motion.a
                        key={index}
                        href="#"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-6 p-4 rounded-2xl bg-background/50 border border-border/50 hover:border-emerald-500/50 hover:bg-background transition-all duration-300 group/item cursor-pointer"
                    >
                        <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-foreground shadow-sm group-hover/item:text-emerald-600 group-hover/item:scale-110 transition-all duration-300">
                            <IconComponent className="w-8 h-8" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground text-lg">{method.title}</h4>
                            <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                    </motion.a>
                );
            })}
        </div>
    );
}
