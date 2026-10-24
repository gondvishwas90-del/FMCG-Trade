"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, CheckCircle } from 'lucide-react';

interface Option {
    value: string;
    label: string;
}

interface PremiumSelectProps {
    label: string;
    name: string;
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    className?: string;
}

export function PremiumSelect({
    label,
    name,
    options,
    value,
    onChange,
    placeholder = "Select an option",
    required = false,
    className = ""
}: PremiumSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder;
    const hasValue = !!value;

    return (
        <div
            className={`group relative ${className}`}
            ref={containerRef}
        >
            <label className="block text-sm font-medium text-muted-foreground mb-2 ml-1 transition-colors group-focus-within:text-emerald-600">
                {label}
            </label>

            <div
                className="relative"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div
                    className={`
                        w-full px-0 py-4 bg-transparent border-b-2 border-border 
                        transition-colors cursor-pointer flex items-center justify-between
                        ${isOpen ? 'border-emerald-500' : 'group-hover:border-emerald-500/50'}
                    `}
                >
                    <span className={`text-xl font-medium ${hasValue ? 'text-foreground' : 'text-muted-foreground/30'}`}>
                        {selectedLabel}
                    </span>
                    <ChevronDown
                        className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-500' : ''}`}
                    />
                </div>

                {/* Hidden select for form submission / accessibility basic support */}
                <select
                    name={name}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="hidden"
                    required={required}
                    tabIndex={-1}
                >
                    <option value="">{placeholder}</option>
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>

                {/* Custom Dropdown Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 w-full mt-2 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden max-h-[300px] overflow-y-auto"
                        >
                            {options.map((option) => (
                                <div
                                    key={option.value}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    className="px-6 py-4 hover:bg-muted/50 cursor-pointer transition-colors text-lg text-foreground font-medium flex items-center justify-between group/option"
                                >
                                    <span>{option.label}</span>
                                    {value === option.value && (
                                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                                    )}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
