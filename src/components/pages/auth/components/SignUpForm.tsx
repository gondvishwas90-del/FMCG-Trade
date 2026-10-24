"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Lock, Mail, User, Building2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, type SignUpSchema } from '../schemas/auth.schemas';
import { cn } from '@/lib/utils';

export function SignUpForm() {
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: '',
            email: '',
            company: '',
            password: '',
        },
    });

    const onSubmit = async (data: SignUpSchema) => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsLoading(false);
        console.log("Sign Up:", data);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md mx-auto"
        >
            <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">
                    Partner with <span className="text-emerald-500">Us.</span>
                </h2>
                <p className="text-muted-foreground">
                    Create an account to access our global trade network.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                <div className="group">
                    <label className="block text-sm font-medium text-muted-foreground mb-2 ml-1 transition-colors group-focus-within:text-emerald-600">
                        Full Name
                    </label>
                    <div className="relative">
                        <input
                            {...register('name')}
                            type="text"
                            className={cn(
                                "w-full pl-0 pr-10 py-3 bg-transparent border-b-2 transition-colors text-lg font-medium text-foreground placeholder:text-muted-foreground/30 focus:outline-none rounded-none",
                                errors.name
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-border focus:border-emerald-500"
                            )}
                            placeholder="John Doe"
                        />
                        <User className={cn(
                            "absolute right-2 top-3 w-5 h-5 transition-colors",
                            errors.name ? "text-red-500" : "text-muted-foreground/50 group-focus-within:text-emerald-500"
                        )} />
                    </div>
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                    )}
                </div>

                <div className="group">
                    <label className="block text-sm font-medium text-muted-foreground mb-2 ml-1 transition-colors group-focus-within:text-emerald-600">
                        Email Address
                    </label>
                    <div className="relative">
                        <input
                            {...register('email')}
                            type="email"
                            className={cn(
                                "w-full pl-0 pr-10 py-3 bg-transparent border-b-2 transition-colors text-lg font-medium text-foreground placeholder:text-muted-foreground/30 focus:outline-none rounded-none",
                                errors.email
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-border focus:border-emerald-500"
                            )}
                            placeholder="name@company.com"
                        />
                        <Mail className={cn(
                            "absolute right-2 top-3 w-5 h-5 transition-colors",
                            errors.email ? "text-red-500" : "text-muted-foreground/50 group-focus-within:text-emerald-500"
                        )} />
                    </div>
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}
                </div>

                <div className="group">
                    <label className="block text-sm font-medium text-muted-foreground mb-2 ml-1 transition-colors group-focus-within:text-emerald-600">
                        Company Name
                    </label>
                    <div className="relative">
                        <input
                            {...register('company')}
                            type="text"
                            className={cn(
                                "w-full pl-0 pr-10 py-3 bg-transparent border-b-2 transition-colors text-lg font-medium text-foreground placeholder:text-muted-foreground/30 focus:outline-none rounded-none",
                                errors.company
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-border focus:border-emerald-500"
                            )}
                            placeholder="Acme Inc."
                        />
                        <Building2 className={cn(
                            "absolute right-2 top-3 w-5 h-5 transition-colors",
                            errors.company ? "text-red-500" : "text-muted-foreground/50 group-focus-within:text-emerald-500"
                        )} />
                    </div>
                    {errors.company && (
                        <p className="mt-1 text-sm text-red-500">{errors.company.message}</p>
                    )}
                </div>

                <div className="group">
                    <label className="block text-sm font-medium text-muted-foreground mb-2 ml-1 transition-colors group-focus-within:text-emerald-600">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            {...register('password')}
                            type="password"
                            className={cn(
                                "w-full pl-0 pr-10 py-3 bg-transparent border-b-2 transition-colors text-lg font-medium text-foreground placeholder:text-muted-foreground/30 focus:outline-none rounded-none",
                                errors.password
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-border focus:border-emerald-500"
                            )}
                            placeholder="Create a password"
                        />
                        <Lock className={cn(
                            "absolute right-2 top-3 w-5 h-5 transition-colors",
                            errors.password ? "text-red-500" : "text-muted-foreground/50 group-focus-within:text-emerald-500"
                        )} />
                    </div>
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                    )}
                    <p className="mt-2 text-xs text-muted-foreground">
                        Must be at least 8 characters.
                    </p>
                </div>

                <div className="pt-6">
                    <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-emerald-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Create Account
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </motion.button>
                </div>

                <div className="text-center pt-2">
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Link href="/sign-in" className="text-foreground font-bold hover:text-emerald-500 transition-colors underline decoration-emerald-500/30 hover:decoration-emerald-500">
                            Sign In
                        </Link>
                    </p>
                </div>
            </form>
        </motion.div>
    );
}
