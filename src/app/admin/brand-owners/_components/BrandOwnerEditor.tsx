"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, ArrowLeft, Building2, Globe, Link as LinkIcon, Info, Loader2, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { createBrandOwner, updateBrandOwner } from "@/app/actions/brand-owner.actions";
import MediaImageField from "@/app/admin/_components/MediaImageField";
import { IBrandOwner } from "@/models/BrandOwner";
import { brandOwnerSchema, BrandOwnerFormValues } from "./schema";

interface BrandOwnerEditorProps {
    initialData: IBrandOwner;
    isNew: boolean;
}

export default function BrandOwnerEditor({ initialData, isNew }: BrandOwnerEditorProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<BrandOwnerFormValues>({
        resolver: zodResolver(brandOwnerSchema) as any,
        defaultValues: {
            id: initialData.id || "",
            name: initialData.name || "",
            logo: initialData.logo || "",
            logoDark: initialData.logoDark || "",
            logoLight: initialData.logoLight || "",
            category: initialData.category || "",
            description: initialData.description || "",
            website: initialData.website || "",
            country: initialData.country || "",
            countryCode: initialData.countryCode || "",
            status: (initialData as any).status || "active",
        },
    });

    const { formState: { isDirty } } = form;

    const onSubmit = async (data: BrandOwnerFormValues) => {
        try {
            setLoading(true);

            let result;
            if (isNew) {
                result = await createBrandOwner(data as IBrandOwner);
            } else {
                result = await updateBrandOwner(initialData.id, data as IBrandOwner);
            }

            if (result.success) {
                toast.success(isNew ? "Brand Owner created!" : "Owner details saved!");
                router.push(`/admin/brand-owners`);
                router.refresh();
            } else {
                toast.error(result.error || "Failed to save");
            }
        } catch (e: any) {
            toast.error(e.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-5xl mx-auto pb-24">
                {/* Header with Title and Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-6">
                    <div className="flex items-center gap-4">
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => router.back()}
                            className="h-10 w-10 text-muted-foreground hover:text-foreground"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                                <Building2 className="w-6 h-6 text-primary" />
                                {isNew ? "New Brand Owner" : `Edit: ${initialData.name}`}
                            </h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                {isNew ? "Add a new parent company or brand owner" : "Manage corporate profile, logos and contact details"}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.back()}
                            className="flex-1 sm:flex-none"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading || (!isDirty && !isNew)}
                            className="flex-1 sm:flex-none gap-2"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            {isNew ? "Create Owner" : "Save Changes"}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column: Form Details (2 cols) */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Basic Information */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 text-primary border-b pb-2">
                                <Info className="w-4 h-4" />
                                <h2 className="text-sm font-bold uppercase tracking-wider">Corporate Identity</h2>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="col-span-2 sm:col-span-1">
                                            <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Corporate Name <span className="text-red-500">*</span></FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. Diageo PLC" className="h-11" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="id"
                                    render={({ field }) => (
                                        <FormItem className="col-span-2 sm:col-span-1">
                                            <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Global ID (Slug) <span className="text-red-500">*</span></FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="e.g. diageo" 
                                                    className="h-11 font-mono" 
                                                    {...field}
                                                    onChange={(e) => field.onChange(e.target.value.toLowerCase().replace(/ /g, '-'))}
                                                    readOnly={!isNew}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem className="col-span-2 sm:col-span-1">
                                            <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Category</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. Spirits, Beverages, FMCG" className="h-11" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Branding Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 text-primary border-b pb-2">
                                <Info className="w-4 h-4" />
                                <h2 className="text-sm font-bold uppercase tracking-wider">Branding & Logos</h2>
                            </div>
                            
                            <div className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="logo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <MediaImageField
                                                    label="Default Corporate Logo"
                                                    value={field.value || ""}
                                                    onChange={(url) => field.onChange(url)}
                                                    folder="/brand-owners/logos"
                                                    aspectRatio={1}
                                                    fileName={form.watch("name") ? `${form.watch("name")}` : undefined}
                                                    dimensions="400 × 400 px (1:1 Square Ratio)"
                                                    supportedFormats="PNG, SVG, WebP, JPG"
                                                    maxSize="5 MB"
                                                    description="Primary logo used across the platform and fallback for all themes."
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-dashed">
                                    <FormField
                                        control={form.control}
                                        name="logoDark"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <MediaImageField
                                                        label="Dark Theme Logo (Optional)"
                                                        value={field.value || ""}
                                                        onChange={(url) => field.onChange(url)}
                                                        folder="/brand-owners/logos/dark"
                                                        aspectRatio={1}
                                                        fileName={form.watch("name") ? `${form.watch("name")}-dark` : undefined}
                                                        dimensions="400 × 400 px"
                                                        supportedFormats="PNG, SVG, WebP"
                                                        maxSize="5 MB"
                                                        description="Light/white logo variant for dark backgrounds."
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="logoLight"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <MediaImageField
                                                        label="Light Theme Logo (Optional)"
                                                        value={field.value || ""}
                                                        onChange={(url) => field.onChange(url)}
                                                        folder="/brand-owners/logos/light"
                                                        aspectRatio={1}
                                                        fileName={form.watch("name") ? `${form.watch("name")}-light` : undefined}
                                                        dimensions="400 × 400 px"
                                                        supportedFormats="PNG, SVG, WebP"
                                                        maxSize="5 MB"
                                                        description="Dark/colored logo variant for light backgrounds."
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Location & Links */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 text-primary border-b pb-2">
                                <Globe className="w-4 h-4" />
                                <h2 className="text-sm font-bold uppercase tracking-wider">Headquarters & Web</h2>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="country"
                                    render={({ field }) => (
                                        <FormItem className="col-span-2 sm:col-span-1">
                                            <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                                <Globe className="w-3 h-3" /> Headquarters Country
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. United Kingdom" className="h-11" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="countryCode"
                                    render={({ field }) => (
                                        <FormItem className="col-span-2 sm:col-span-1">
                                            <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Alpha-2 Code</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="e.g. GB" 
                                                    maxLength={2}
                                                    className="h-11 font-mono tracking-widest text-center w-24 uppercase" 
                                                    {...field}
                                                    onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="website"
                                    render={({ field }) => (
                                        <FormItem className="col-span-2">
                                            <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                                <LinkIcon className="w-3 h-3" /> Website URL
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://www.diageo.com" className="h-11" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Description Section */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Corporate Description</FormLabel>
                                    <FormControl>
                                        <Textarea 
                                            placeholder="Brief history and corporate mission..." 
                                            rows={4}
                                            className="min-h-[100px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Status Section */}
                        <div className="space-y-6 pt-4 border-t border-border/50">
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem className="border rounded-xl p-5 bg-card shadow-sm border-primary/10">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <FormLabel className="text-sm font-bold">Publication Status</FormLabel>
                                                <FormDescription className="text-xs">
                                                    {field.value === 'active' 
                                                        ? 'Visible on public website' 
                                                        : 'Hidden from public website'}
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <div className="flex items-center gap-3">
                                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${field.value === 'active' ? 'text-emerald-600' : 'text-muted-foreground'}`}>
                                                        {field.value}
                                                    </span>
                                                    <Switch
                                                        checked={field.value === 'active'}
                                                        onCheckedChange={(v: boolean) => field.onChange(v ? 'active' : 'draft')}
                                                        className="data-[state=checked]:bg-emerald-500"
                                                    />
                                                </div>
                                            </FormControl>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>

                    </div>
                </div>
            </form>
        </Form>
    );
}
