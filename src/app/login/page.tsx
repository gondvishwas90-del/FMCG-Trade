"use client";

import { useActionState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Lock, Mail, Loader2, ShieldCheck } from "lucide-react";
import { loginAdmin, type LoginState } from "@/app/actions/auth";
import { cn } from "@/lib/utils";

const initialState: LoginState = {};

export default function AdminLoginPage() {
    const [state, formAction, isPending] = useActionState(loginAdmin, initialState);

    return (
        <div className="w-full max-w-lg mx-auto px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Branding */}
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    </div>
                    <span className="text-sm font-semibold text-muted-foreground tracking-wide uppercase">
                        Admin Portal
                    </span>
                </div>

                {/* Heading */}
                <div className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">
                        Welcome <span className="text-emerald-500">Back.</span>
                    </h1>
                    <p className="text-muted-foreground">
                        Enter your credentials to access the admin dashboard.
                    </p>
                </div>

                {/* Error alert */}
                {state?.error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium"
                    >
                        {state.error}
                    </motion.div>
                )}

                {/* Form */}
                <form action={formAction} className="space-y-8">
                    <div className="space-y-6">
                        {/* Email */}
                        <div className="group">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-muted-foreground mb-2 ml-1 transition-colors group-focus-within:text-emerald-600"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className={cn(
                                        "w-full pl-0 pr-10 py-3 bg-transparent border-b-2 transition-colors text-lg font-medium text-foreground placeholder:text-muted-foreground/30 focus:outline-none rounded-none",
                                        "border-border focus:border-emerald-500"
                                    )}
                                    placeholder="admin@company.com"
                                />
                                <Mail className="absolute right-2 top-3 w-5 h-5 text-muted-foreground/50 group-focus-within:text-emerald-500 transition-colors" />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="group">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-muted-foreground mb-2 ml-1 transition-colors group-focus-within:text-emerald-600"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className={cn(
                                        "w-full pl-0 pr-10 py-3 bg-transparent border-b-2 transition-colors text-lg font-medium text-foreground placeholder:text-muted-foreground/30 focus:outline-none rounded-none",
                                        "border-border focus:border-emerald-500"
                                    )}
                                    placeholder="••••••••"
                                />
                                <Lock className="absolute right-2 top-3 w-5 h-5 text-muted-foreground/50 group-focus-within:text-emerald-500 transition-colors" />
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-4">
                        <motion.button
                            type="submit"
                            disabled={isPending}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-foreground text-background px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-600 hover:text-white transition-all shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isPending ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </motion.button>
                    </div>
                </form>

                {/* Footer */}
                <div className="mt-10 text-center">
                    <p className="text-xs text-muted-foreground/60">
                        Protected area. Unauthorized access is prohibited.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
