"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronRight, Settings, Plus, Save, ArrowLeft, Trash2, Tag, Truck, Package, Image as ImageIcon, Menu, History, X, Loader2 } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import { createBrand, updateBrand } from "@/app/actions/brand.actions";
import MediaImageField from "@/app/admin/_components/MediaImageField";
import { Brand, Product } from "@/components/pages/brands/types/brand.types";
import { ICategory, ICategoryTier2, ICategoryTier3 } from "@/models/Category";
import { IBrandOwner } from "@/models/BrandOwner";
import { brandSchema, BrandFormValues } from "./schema";

interface BrandEditorProps {
    initialData: Brand;
    categories: ICategory[];
    owners: IBrandOwner[];
    isNew: boolean;
}

export default function BrandEditor({ initialData, categories = [], owners = [], isNew }: BrandEditorProps) {
    
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<string>("general");
    const [loading, setLoading] = useState(false);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    const form = useForm<BrandFormValues>({
        resolver: zodResolver(brandSchema) as any,
        defaultValues: {
            id: initialData.id || "",
            name: initialData.name || "",
            country: initialData.country || "",
            countryCode: initialData.countryCode || "",
            positioning: initialData.positioning || "",
            description: initialData.description || "",
            tier1Ids: initialData.tier1Ids || [],
            tier2Ids: initialData.tier2Ids || [],
            tier3Ids: initialData.tier3Ids || [],
            tradeCapabilities: {
                exportAvailable: initialData.tradeCapabilities?.exportAvailable || false,
                privateLabel: initialData.tradeCapabilities?.privateLabel || false,
                ukDistribution: initialData.tradeCapabilities?.ukDistribution || false,
                euDistribution: initialData.tradeCapabilities?.euDistribution || false,
                onTradeFocused: initialData.tradeCapabilities?.onTradeFocused || false,
                offTradeFocused: initialData.tradeCapabilities?.offTradeFocused || false,
            },
            image: initialData.image || "",
            backgroundImage: initialData.backgroundImage || "",
            mobileBackgroundImage: initialData.mobileBackgroundImage || "",
            tagline: initialData.tagline || "",
            storyTitle: initialData.storyTitle || "",
            storyHeadline: initialData.storyHeadline || "",
            storyDescription: initialData.storyDescription || "",
            tradeAnalystVerdict: initialData.tradeAnalystVerdict || "",
            products: initialData.products || [],
            portfolioRanges: initialData.portfolioRanges || [],
            marketConsiderations: initialData.marketConsiderations || [],
            tradeIntents: initialData.tradeIntents || [],
            brandOwnerId: initialData.brandOwnerId || "",
            status: (initialData as any).status || "active",
        },
    });

    const { formState: { isDirty } } = form;

    const { fields: productFields, append: appendProduct, remove: removeProduct } = useFieldArray({
        control: form.control,
        name: "products",
    });

    const onSubmit = async (data: BrandFormValues) => {
        try {
            setLoading(true);

            let result;
            if (isNew) {
                result = await createBrand(data);
            } else {
                result = await updateBrand(initialData.id, data);
            }

            if (result.success) {
                toast.success(isNew ? "Brand created successfully!" : "Brand settings saved!");
                router.push(`/admin/brands`);
                router.refresh();
            } else {
                toast.error(result.error || "Failed to save brand");
            }
        } catch (e: unknown) {
            toast.error(e instanceof Error ? e.message : "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    // Category Hierarchy resolution logic
    const tier1Ids = form.watch("tier1Ids");
    const tier2Ids = form.watch("tier2Ids");
    const tier3Ids = form.watch("tier3Ids");

    const selectedT1s = categories.filter((c: ICategory) => tier1Ids?.includes(c.id));
    const allAvailableT2s = selectedT1s.flatMap((c: ICategory) => c.tier2 || []);
    const selectedT2s = allAvailableT2s.filter((t2: ICategoryTier2) => tier2Ids?.includes(t2.id));
    const allAvailableT3s = selectedT2s.flatMap((t2: ICategoryTier2) => t2.tier3 || []);

    const toggleTier1Selection = (t1Id: string) => {
        const currentIds = tier1Ids || [];
        const isSelected = currentIds.includes(t1Id);
        
        if (isSelected) {
            const newT1Ids = currentIds.filter((id: string) => id !== t1Id);
            // Also need to clean up child tiers
            const t1ToRemove = categories.find((c: ICategory) => c.id === t1Id);
            const t2IdsToRemove = t1ToRemove?.tier2?.map((t2: ICategoryTier2) => t2.id) || [];
            const newT2Ids = (tier2Ids || []).filter((id: string) => !t2IdsToRemove.includes(id));
            
            // Further clean up T3
            const t3IdsToRemove = t1ToRemove?.tier2?.flatMap((t2: ICategoryTier2) => t2.tier3?.map((t3: ICategoryTier3) => t3.id) || []) || [];
            const newT3Ids = (tier3Ids || []).filter((id: string) => !t3IdsToRemove.includes(id));
            
            form.setValue("tier1Ids", newT1Ids, { shouldDirty: true });
            form.setValue("tier2Ids", newT2Ids, { shouldDirty: true });
            form.setValue("tier3Ids", newT3Ids, { shouldDirty: true });
        } else {
            form.setValue("tier1Ids", [...currentIds, t1Id], { shouldDirty: true });
        }
    };

    const toggleTier2Selection = (t2Id: string) => {
        const currentIds = tier2Ids || [];
        const isSelected = currentIds.includes(t2Id);
        
        if (isSelected) {
            const newT2Ids = currentIds.filter((id: string) => id !== t2Id);
            // Clean up child T3s
            const t2ToRemove = allAvailableT2s.find((t2: ICategoryTier2) => t2.id === t2Id);
            const t3IdsToRemove = t2ToRemove?.tier3?.map((t3: ICategoryTier3) => t3.id) || [];
            const newT3Ids = (tier3Ids || []).filter((id: string) => !t3IdsToRemove.includes(id));
            
            form.setValue("tier2Ids", newT2Ids, { shouldDirty: true });
            form.setValue("tier3Ids", newT3Ids, { shouldDirty: true });
        } else {
            form.setValue("tier2Ids", [...currentIds, t2Id], { shouldDirty: true });
        }
    };

    const toggleTier3Selection = (t3Id: string) => {
        const currentIds = tier3Ids || [];
        const newIds = currentIds.includes(t3Id)
            ? currentIds.filter((id: string) => id !== t3Id)
            : [...currentIds, t3Id];
        form.setValue("tier3Ids", newIds, { shouldDirty: true });
    };

    const renderNavContent = () => (
        <>
            {/* Static Tabs */}
            <div
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors border ${activeTab === 'general' ? 'bg-primary/5 text-primary border-primary/20 font-medium shadow-sm' : 'border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`}
                onClick={() => { setActiveTab('general'); setIsMobileNavOpen(false); }}
            >
                <Settings className="w-4 h-4" />
                <span className="text-sm flex-1">General Settings</span>
            </div>
            <div
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors border ${activeTab === 'story' ? 'bg-primary/5 text-primary border-primary/20 font-medium shadow-sm' : 'border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`}
                onClick={() => { setActiveTab('story'); setIsMobileNavOpen(false); }}
            >
                <History className="w-4 h-4" />
                <span className="text-sm flex-1">Story & Narrative</span>
            </div>
            <div
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors border ${activeTab === 'categorization' ? 'bg-primary/5 text-primary border-primary/20 font-medium shadow-sm' : 'border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`}
                onClick={() => { setActiveTab('categorization'); setIsMobileNavOpen(false); }}
            >
                <Tag className="w-4 h-4" />
                <span className="text-sm flex-1">Categorization Mapping</span>
            </div>
            <div
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors border ${activeTab === 'trade' ? 'bg-primary/5 text-primary border-primary/20 font-medium shadow-sm' : 'border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`}
                onClick={() => { setActiveTab('trade'); setIsMobileNavOpen(false); }}
            >
                <Truck className="w-4 h-4" />
                <span className="text-sm flex-1">Trade Capabilities</span>
            </div>

            {/* Dynamics SKUs list */}
            <div className="mt-6 mb-2 px-3 text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-between">
                <span>Product SKUs ({productFields.length})</span>
                <Button variant="ghost" size="icon" className="h-5 w-5" onClick={(e) => { 
                    e.stopPropagation(); 
                    appendProduct({ name: "New SKU Component", image: "", abv: "", size: "", description: "" });
                    setActiveTab(`product-${productFields.length}`);
                }}>
                    <Plus className="w-3.5 h-3.5" />
                </Button>
            </div>

            {productFields.map((field: any, idx: number) => (
                <div
                    key={field.id}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors border ${activeTab === `product-${idx}` ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200/50 shadow-sm' : 'border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`}
                    onClick={() => { setActiveTab(`product-${idx}`); setIsMobileNavOpen(false); }}
                >
                    <Package className="w-3.5 h-3.5 opacity-70" />
                    <span className="text-sm truncate flex-1">{form.watch(`products.${idx}.name`) || 'Unnamed Product'}</span>
                    <ChevronRight className="w-3 h-3 opacity-30" />
                </div>
            ))}
        </>
    );

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col bg-muted/10 w-full h-full overflow-hidden">
                {/* Header */}
                <header className="flex-none min-h-16 border-b bg-card flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20 shadow-sm">
                    <div className="flex items-center gap-2 sm:gap-4">
                        <Button variant="ghost" size="icon" onClick={() => router.push('/admin/brands')} className="rounded-full shrink-0" type="button">
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                        <div className="min-w-0">
                            <h1 className="font-bold text-base sm:text-lg leading-tight truncate">{form.watch("name") || 'New Brand Record'}</h1>
                            <p className="text-[10px] sm:text-xs text-muted-foreground truncate">"{form.watch("id") || 'unassigned'}"</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                        {isDirty && (
                            <>
                                <Button variant="outline" size="sm" onClick={() => router.push('/admin/brands')} className="hidden sm:inline-flex" type="button">
                                    <X className="w-4 h-4 mr-2" /> Cancel
                                </Button>
                                <Button size="sm" type="submit" disabled={loading} className="px-4">
                                    {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2 hidden sm:inline-block" />}
                                    Save
                                </Button>
                            </>
                        )}
                        
                        {/* Mobile Nav Trigger */}
                        <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon" className="lg:hidden rounded-full shrink-0">
                                    <Menu className="w-4 h-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="p-0 w-[280px] sm:w-80">
                                <SheetHeader className="p-4 border-b">
                                    <SheetTitle className="text-sm font-bold flex items-center gap-2">
                                        <Settings className="w-4 h-4 text-primary" />
                                        Brand Configuration
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex-1 overflow-y-auto p-3 space-y-1 h-[calc(100vh-60px)] custom-scrollbar">
                                    {renderNavContent()}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </header>

            {/* Split Pane Container */}
            <div className="flex flex-1 overflow-hidden p-4 lg:p-6 gap-6 lg:gap-8 w-full flex-col lg:flex-row">

                {/* Left Pane: Config Navigation (Desktop Only) */}
                <aside className="w-80 flex-none hidden lg:flex flex-col bg-card rounded-2xl border border-border shadow-sm overflow-hidden h-full">
                    <div className="p-4 border-b">
                        <h2 className="font-semibold text-sm">Configuration Profile</h2>
                        <p className="text-xs text-muted-foreground mt-0.5">Select a module to edit settings</p>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
                        {renderNavContent()}
                    </div>
                </aside>

                {/* Right Pane: Dynamic Component Forms */}
                <main className="flex-1 overflow-y-auto h-full flex flex-col gap-6 lg:gap-8 custom-scrollbar rounded-2xl pb-10">
                    <div className="bg-card rounded-2xl border border-border shadow-sm p-4 sm:p-8 relative min-h-full">

                        {activeTab === 'general' && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="mb-8">
                                    <h2 className="text-xl font-bold tracking-tight">General Settings</h2>
                                    <p className="text-sm text-muted-foreground mt-1">Core structural data and visible portfolio branding.</p>
                                </div>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className="col-span-2 sm:col-span-1">
                                                <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Brand Alias <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g. Absolut Vodka" className="h-11 bg-background" {...field} />
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
                                                <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Global Brand ID (Slug) <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g. absolut" className="h-11 font-mono text-sm bg-muted/40" {...field} readOnly={!isNew} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="space-y-6 col-span-2 sm:col-span-1 border rounded-xl p-5 bg-muted/10 h-max">
                                        <FormField
                                            control={form.control}
                                            name="country"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex justify-between">Origin Country <span>(Optional)</span></FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="e.g. Sweden" className="h-11" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="countryCode"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Alpha-2 Format (For Flags)</FormLabel>
                                                    <FormControl>
                                                        <Input 
                                                            placeholder="e.g. SE" 
                                                            maxLength={2} 
                                                            className="h-11 font-mono tracking-[0.2em] text-center w-24 uppercase" 
                                                            {...field}
                                                            onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="space-y-2 col-span-2 sm:col-span-1 border rounded-xl p-5 bg-blue-50/20 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30 h-max">
                                        <FormField
                                            control={form.control}
                                            name="brandOwnerId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest flex justify-between">Parent Brand Owner <span>(Optional)</span></FormLabel>
                                                    <Select 
                                                        value={field.value || "none"} 
                                                        onValueChange={(val) => field.onChange(val === "none" ? "" : val)}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger className="h-11 bg-background">
                                                                <SelectValue placeholder="Select Parent Owner" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="none">Independent / No Parent</SelectItem>
                                                            {owners.map(owner => (
                                                                <SelectItem key={owner.id} value={owner.id}>
                                                                    <div className="flex items-center gap-2">
                                                                        {owner.logo && (
                                                                            <div className="relative w-4 h-4 rounded-sm overflow-hidden border">
                                                                                <Image src={owner.logo} alt={owner.name} fill className="object-contain" />
                                                                            </div>
                                                                        )}
                                                                        {owner.name}
                                                                    </div>
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormDescription className="text-[10px] italic">Select the corporate entity that owns this brand.</FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="col-span-2 sm:col-span-1 h-max space-y-6">


                                        <FormField
                                            control={form.control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem className="border rounded-xl p-5 bg-card shadow-sm">
                                                    <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Publication Status</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="h-11 bg-background mt-2">
                                                                <SelectValue placeholder="Select status" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="active">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                                                    <span>Active (Visible on site)</span>
                                                                </div>
                                                            </SelectItem>
                                                            <SelectItem value="draft">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-2 h-2 rounded-full bg-slate-400" />
                                                                    <span>Draft (Hidden from site)</span>
                                                                </div>
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormDescription className="text-[10px] mt-2">
                                                        Draft items are only visible to administrators.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6 p-4 rounded-xl border bg-muted/10 items-start">
                                        <FormField
                                            control={form.control}
                                            name="image"
                                            render={({ field }) => (
                                                <FormItem className="col-span-1">
                                                    <FormControl>
                                                        <MediaImageField
                                                            label="Card Image"
                                                            value={field.value || ""}
                                                            onChange={(url) => field.onChange(url)}
                                                            folder="/brands/images"
                                                            aspectRatio={16 / 9}
                                                            fileName={`${form.watch("name")}-card`}
                                                            layout="vertical"
                                                        />
                                                    </FormControl>
                                                    <p className="text-[10px] text-muted-foreground mt-1 text-center">Recommended: 16:9 ratio</p>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="backgroundImage"
                                            render={({ field }) => (
                                                <FormItem className="col-span-1">
                                                    <FormControl>
                                                        <MediaImageField
                                                            label="Desktop Background"
                                                            value={field.value || ""}
                                                            onChange={(url) => field.onChange(url)}
                                                            folder="/brands/backgrounds"
                                                            aspectRatio={16 / 9}
                                                            fileName={`${form.watch("name")}-desktop-bg`}
                                                            layout="vertical"
                                                        />
                                                    </FormControl>
                                                    <p className="text-[10px] text-muted-foreground mt-1 text-center">Recommended: 1920x1080 (16:9)</p>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="mobileBackgroundImage"
                                            render={({ field }) => (
                                                <FormItem className="col-span-1">
                                                    <FormControl>
                                                        <MediaImageField
                                                            label="Mobile Background"
                                                            value={field.value || ""}
                                                            onChange={(url) => field.onChange(url)}
                                                            folder="/brands/backgrounds"
                                                            aspectRatio={9 / 16}
                                                            fileName={`${form.watch("name")}-mobile-bg`}
                                                            layout="vertical"
                                                        />
                                                    </FormControl>
                                                    <p className="text-[10px] text-muted-foreground mt-1 text-center">Recommended: 1080x1920 (9:16)</p>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="space-y-6 col-span-2">
                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Description (Legacy)</FormLabel>
                                                    <FormControl>
                                                        <Textarea placeholder="Provide historical brand context..." rows={2} className="bg-background min-h-[60px]" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="tagline"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex justify-between">Primary Tagline <span>(Optional)</span></FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="e.g. Keep Walking" className="h-11 text-sm bg-muted/40 italic" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="positioning"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex justify-between">Positioning / Slogans <span>(Optional)</span></FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Premium Handcrafted Spirits..." className="h-11 text-sm bg-muted/40 italic" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'story' && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="mb-8">
                                    <h2 className="text-xl font-bold tracking-tight">Story & Narrative</h2>
                                    <p className="text-sm text-muted-foreground mt-1">Detailed brand storytelling and trade analyst insights.</p>
                                </div>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                    <FormField
                                        control={form.control}
                                        name="storyTitle"
                                        render={({ field }) => (
                                            <FormItem className="col-span-2 sm:col-span-1">
                                                <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Story Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g. The Story" className="h-11 bg-background" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="storyHeadline"
                                        render={({ field }) => (
                                            <FormItem className="col-span-2">
                                                <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Story Headline</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="A compelling summary of the brand's legacy..." className="h-11 bg-background" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="storyDescription"
                                        render={({ field }) => (
                                            <FormItem className="col-span-2">
                                                <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Story Description</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Full narrative text..." rows={6} className="bg-background min-h-[150px]" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="tradeAnalystVerdict"
                                        render={({ field }) => (
                                            <FormItem className="col-span-2">
                                                <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Trade Analyst Verdict</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Professional assessment for distributors..." rows={4} className="bg-emerald-50/10 border-emerald-100 dark:border-emerald-900/30 min-h-[100px]" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'categorization' && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="mb-8">
                                    <h2 className="text-xl font-bold tracking-tight">Categorization Mapping</h2>
                                    <p className="text-sm text-muted-foreground mt-1">Associate this brand to an existing Sector, Group, and Specific Category node.</p>
                                </div>
                                <div className="space-y-8">

                                    <div className="space-y-3 bg-muted/20 border border-border p-6 rounded-xl">
                                        <Label className="font-bold text-lg text-primary flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs">1</span> Top Level Sector (Tier 1)</Label>
                                        <p className="text-xs text-muted-foreground ml-8 mb-4">Required mapping</p>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 ml-8">
                                            {categories.map((c: ICategory) => (
                                                <div
                                                    key={c.id}
                                                    onClick={() => toggleTier1Selection(c.id)}
                                                    className={`px-4 py-3 rounded-md border cursor-pointer transition-colors font-medium text-sm text-center ${tier1Ids?.includes(c.id) ? 'bg-primary border-primary text-primary-foreground shadow-md' : 'bg-background hover:bg-muted'}`}
                                                >
                                                    {c.name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={`space-y-3 bg-muted/20 border p-6 rounded-xl transition-all ${(!tier1Ids || tier1Ids.length === 0) && 'opacity-30 pointer-events-none'}`}>
                                        <Label className="font-bold text-lg text-blue-600 dark:text-blue-400 flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-xs">2</span> Nested Group (Tier 2)</Label>
                                        <p className="text-xs text-muted-foreground ml-8 mb-4">Select the specific tier 2 structure.</p>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 ml-8">
                                            {allAvailableT2s.map((t2: ICategoryTier2) => (
                                                <div
                                                    key={t2.id}
                                                    onClick={() => toggleTier2Selection(t2.id)}
                                                    className={`px-4 py-3 rounded-md border cursor-pointer transition-colors font-medium text-sm text-center ${tier2Ids?.includes(t2.id) ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-background hover:bg-blue-50 dark:hover:bg-blue-950/20'}`}
                                                >
                                                    {t2.name}
                                                </div>
                                            ))}
                                            {allAvailableT2s.length === 0 && (
                                                <div className="col-span-full py-4 text-sm text-muted-foreground italic text-center opacity-50 border border-dashed rounded-md">Must select a Tier 1 item with children first.</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className={`space-y-3 bg-muted/20 border p-6 rounded-xl transition-all ${(!tier2Ids || tier2Ids.length === 0) && 'opacity-30 pointer-events-none'}`}>
                                        <Label className="font-bold text-lg text-emerald-600 dark:text-emerald-400 flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-xs">3</span> Variant Bindings (Tier 3)</Label>
                                        <p className="text-xs text-muted-foreground ml-8 mb-4">Brands can map to multiple Tier 3 parameters.</p>
                                        <div className="flex flex-wrap gap-3 ml-8">
                                            {allAvailableT3s.map((t3: ICategoryTier3) => (
                                                <div
                                                    key={t3.id}
                                                    onClick={() => toggleTier3Selection(t3.id)}
                                                    className={`px-4 py-2.5 rounded-full border cursor-pointer transition-colors font-medium text-sm flex items-center gap-2 ${tier3Ids?.includes(t3.id) ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm' : 'bg-background hover:bg-emerald-50 dark:hover:bg-emerald-950/20 text-muted-foreground'}`}
                                                >
                                                    <div className={`w-3 h-3 rounded-full border border-white/50 ${tier3Ids?.includes(t3.id) ? 'bg-white' : 'bg-transparent'}`} />
                                                    {t3.name}
                                                </div>
                                            ))}
                                            {allAvailableT3s.length === 0 && (
                                                <div className="py-4 w-full text-sm text-muted-foreground italic text-center opacity-50 border border-dashed rounded-md">No Tier 3 items configured in this node.</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'trade' && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="mb-8">
                                    <h2 className="text-xl font-bold tracking-tight">B2B Trade Capabilities</h2>
                                    <p className="text-sm text-muted-foreground mt-1">Configure global supply chain markers used across B2B filters.</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {[
                                        { id: 'exportAvailable', label: 'Export Available', desc: 'Capable of fulfilling international container shipments.' },
                                        { id: 'privateLabel', label: 'Private Label', desc: 'Accepts white-labeling requests for third party bottlers.' },
                                        { id: 'ukDistribution', label: 'UK Distribution', desc: 'Stock flows freely through United Kingdom depots.' },
                                        { id: 'euDistribution', label: 'EU Distribution', desc: 'Stock flows freely through continental Europe.' },
                                        { id: 'onTradeFocused', label: 'On-Trade Focus', desc: 'Bars, restaurants, and hospitality fulfillment ready.' },
                                        { id: 'offTradeFocused', label: 'Off-Trade Focus', desc: 'Retailers, supermarkets, and B2C shelf ready.' }
                                    ].map((cap) => (
                                        <FormField
                                            key={cap.id}
                                            control={form.control}
                                            name={`tradeCapabilities.${cap.id}` as any}
                                            render={({ field }) => (
                                                <FormItem className="p-5 rounded-xl border flex justify-between items-center bg-card hover:border-primary/50 transition-colors shadow-sm">
                                                    <div>
                                                        <FormLabel className="text-base font-bold">{cap.label}</FormLabel>
                                                        <FormDescription className="text-xs leading-snug max-w-[200px] mt-1">{cap.desc}</FormDescription>
                                                    </div>
                                                    <FormControl>
                                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab.startsWith('product-') && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                {(() => {
                                    const pIdx = parseInt(activeTab.split('-')[1]);
                                    const field = productFields[pIdx];
                                    if (!field) return <div>Product Not Found</div>;

                                    return (
                                        <>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="absolute top-8 right-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 border-red-100 dark:border-red-900"
                                                onClick={() => {
                                                    removeProduct(pIdx);
                                                    setActiveTab('general');
                                                }}
                                                title="Delete Product"
                                                type="button"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>

                                            <div className="mb-8">
                                                <h2 className="text-xl font-bold tracking-tight">Product Spec: {form.watch(`products.${pIdx}.name`)}</h2>
                                                <p className="text-sm text-muted-foreground mt-1">Configure individual item metadata attached to this brand array.</p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                                <FormField
                                                    control={form.control}
                                                    name={`products.${pIdx}.name`}
                                                    render={({ field }) => (
                                                        <FormItem className="col-span-2">
                                                            <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Component Name <span className="text-red-500">*</span></FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="e.g. Absolut Citron 70cl" className="h-11 bg-background" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <div className="col-span-2">
                                                    <FormField
                                                        control={form.control}
                                                        name={`products.${pIdx}.image`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <MediaImageField
                                                                        label="Product Image"
                                                                        value={field.value || ""}
                                                                        onChange={(url) => field.onChange(url)}
                                                                        folder="/brands/products"
                                                                        aspectRatio={3 / 4}
                                                                        fileName={form.watch(`products.${pIdx}.name`)}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <FormField
                                                    control={form.control}
                                                    name={`products.${pIdx}.abv`}
                                                    render={({ field }) => (
                                                        <FormItem className="col-span-2 sm:col-span-1">
                                                            <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-widest">ABV % / Volume</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="e.g. 40%" className="h-11 font-mono text-sm bg-muted/40" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name={`products.${pIdx}.size`}
                                                    render={({ field }) => (
                                                        <FormItem className="col-span-2 sm:col-span-1">
                                                            <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Pack Size</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="e.g. 700ml / 24x330ml" className="h-11 font-mono text-sm bg-muted/40" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name={`products.${pIdx}.description`}
                                                    render={({ field }) => (
                                                        <FormItem className="col-span-2">
                                                            <FormLabel className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Description details</FormLabel>
                                                            <FormControl>
                                                                <Textarea placeholder="Specific product tasting notes or components..." rows={4} className="bg-background min-h-[100px]" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>
                        )}

                    </div>
                </main>
            </div>
        </form>
    </Form>
    );
}
