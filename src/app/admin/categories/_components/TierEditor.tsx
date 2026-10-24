"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
    ChevronRight, 
    ChevronDown, 
    Plus, 
    MoreVertical, 
    Layers, 
    Save, 
    ArrowLeft, 
    Trash2, 
    FolderTree, 
    FileSymlink, 
    ImageIcon,
    Menu,
    RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createCategory, updateCategory, deleteCategory } from "@/app/actions/category.actions";
import MediaImageField from "@/app/admin/_components/MediaImageField";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const tier3Schema = z.object({
    id: z.string().min(1, "ID is required"),
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    image: z.string().optional(),
    mobileImage: z.string().optional(),
    mobileBackgroundImage: z.string().optional(),
});

const tier2Schema = z.object({
    id: z.string().min(1, "ID is required"),
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    image: z.string().optional(),
    mobileImage: z.string().optional(),
    mobileBackgroundImage: z.string().optional(),
    tier3: z.array(tier3Schema).default([]),
});

const categorySchema = z.object({
    id: z.string().min(1, "ID is required"),
    name: z.string().min(1, "Name is required"),
    tradeGuidance: z.string().optional(),
    image: z.string().optional(),
    mobileImage: z.string().optional(),
    mobileBackgroundImage: z.string().optional(),
    isTrending: z.boolean().default(false),
    gridArea: z.string().optional(),
    status: z.enum(['active', 'draft']).default('active'),
    tier2: z.array(tier2Schema).default([]),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface TreeNodeProps {
    level: number;
    id: string;
    name: string;
    isSelected: boolean;
    isExpanded: boolean;
    hasChildren: boolean;
    onToggle: () => void;
    onSelect: () => void;
    childCount: number;
}

export default function TierEditor({ initialData, isNew }: { initialData: CategoryFormValues, isNew: boolean }) {
    const router = useRouter();
    const [selectedPath, setSelectedPath] = useState<string[]>(['root']);
    const [isSaving, setIsSaving] = useState(false);
    const [isMobileTreeOpen, setIsMobileTreeOpen] = useState(false);
    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root']));

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema) as any,
        defaultValues: initialData,
    });

    const { isDirty } = form.formState;
    const data = form.watch();

    const toggleExpand = (id: string) => {
        setExpandedNodes(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const selectedLevel = selectedPath.length; // 1 = T1, 2 = T2, 3 = T3

    const getActiveNode = () => {
        if (selectedLevel === 1) return data;
        const t2 = data.tier2?.find((t) => t.id === selectedPath[1]);
        if (selectedLevel === 2) return t2;
        return t2?.tier3?.find((t) => t.id === selectedPath[2]);
    };

    const activeNode = getActiveNode();

    const updateActiveNode = (key: string, value: any) => {
        if (selectedLevel === 1) {
            form.setValue(key as any, value, { shouldDirty: true });
            return;
        }

        const t2Index = data.tier2?.findIndex((t) => t.id === selectedPath[1]);
        if (t2Index === -1 || t2Index === undefined) return;

        if (selectedLevel === 2) {
            form.setValue(`tier2.${t2Index}.${key}` as any, value, { shouldDirty: true });
            return;
        }

        const t3Index = data.tier2[t2Index].tier3?.findIndex((t) => t.id === selectedPath[2]);
        if (t3Index === -1 || t3Index === undefined) return;

        form.setValue(`tier2.${t2Index}.tier3.${t3Index}.${key}` as any, value, { shouldDirty: true });
    };

    const addSubTier = () => {
        const id = `new-tier-${Date.now()}`;
        if (selectedLevel === 1) {
            const currentTier2 = form.getValues("tier2") || [];
            form.setValue("tier2", [...currentTier2, { id, name: "New Sub-Tier", description: "", image: "", tier3: [] }], { shouldDirty: true });
            if (!expandedNodes.has('root')) toggleExpand('root');
            setSelectedPath(['root', id]);
        } else if (selectedLevel === 2) {
            const t2Index = data.tier2?.findIndex((t) => t.id === selectedPath[1]);
            if (t2Index !== undefined && t2Index > -1) {
                const currentTier3 = form.getValues(`tier2.${t2Index}.tier3`) || [];
                form.setValue(`tier2.${t2Index}.tier3`, [...currentTier3, { id, name: "New Sub-Tier", description: "", image: "" }], { shouldDirty: true });
            }
            if (!expandedNodes.has(selectedPath[1])) toggleExpand(selectedPath[1]);
            setSelectedPath(['root', selectedPath[1], id]);
        }
    };

    const handleDeleteNode = () => {
        if (selectedLevel === 1) {
            toast.error("Cannot delete root tier here. Use the main list.");
            return;
        }

        const t2Index = data.tier2?.findIndex((t) => t.id === selectedPath[1]);
        if (t2Index === undefined || t2Index === -1) return;

        if (selectedLevel === 2) {
            const currentTier2 = [...form.getValues("tier2")];
            currentTier2.splice(t2Index, 1);
            form.setValue("tier2", currentTier2, { shouldDirty: true });
            setSelectedPath(['root']);
        } else if (selectedLevel === 3) {
            const t3Index = data.tier2[t2Index].tier3?.findIndex((t) => t.id === selectedPath[2]);
            if (t3Index !== undefined && t3Index !== -1) {
                const currentTier3 = [...form.getValues(`tier2.${t2Index}.tier3`)];
                currentTier3.splice(t3Index, 1);
                form.setValue(`tier2.${t2Index}.tier3`, currentTier3, { shouldDirty: true });
                setSelectedPath(['root', selectedPath[1]]);
            }
        }
    };

    const onSubmit = async (values: CategoryFormValues) => {
        setIsSaving(true);
        try {
            const res = isNew
                ? await createCategory(values)
                : await updateCategory(values.id, values);

            if (res.success) {
                toast.success(isNew ? "Category created!" : "Category saved successfully!");
                form.reset(values);
                router.push(`/admin/categories`);
            } else {
                toast.error(res.error || "Failed to save category");
            }
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            setIsSaving(false);
        }
    };

    // Helper for rendering Tree Node
    const TreeNode = ({ level, id, name, isSelected, isExpanded, hasChildren, onToggle, onSelect, childCount }: TreeNodeProps) => {
        return (
            <div
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer border hover:bg-muted/50 transition-colors ${isSelected ? 'bg-primary/5 border-primary/20 text-primary font-medium shadow-sm' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                onClick={() => {
                    onSelect();
                    if (window.innerWidth < 1024) setIsMobileTreeOpen(false);
                }}
                style={{ marginLeft: `${(level - 1) * 1.5}rem` }}
            >
                <div onClick={(e) => { e.stopPropagation(); onToggle(); }} className={`w-5 h-5 flex items-center justify-center rounded hover:bg-muted ${!hasChildren && 'opacity-0 cursor-default'}`}>
                    {hasChildren && (isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />)}
                </div>

                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider ${level === 1 ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' : level === 2 ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'}`}>
                    T{level}
                </span>

                <span className="flex-1 truncate text-sm">{name || 'Unnamed Tier'}</span>

                <span className="text-[10px] opacity-60">({childCount})</span>

                {isSelected && level < 3 && (
                    <Button variant="ghost" size="icon" className="w-6 h-6 ml-auto hover:bg-primary/10 hover:text-primary" onClick={(e) => { e.stopPropagation(); addSubTier(); }}>
                        <Plus className="w-3.5 h-3.5" />
                    </Button>
                )}
            </div>
        );
    };

    const renderTree = () => (
        <div className="space-y-1">
            <TreeNode
                level={1}
                id="root"
                name={data.name || "Root Name"}
                isSelected={selectedPath.length === 1}
                isExpanded={expandedNodes.has('root')}
                hasChildren={data.tier2?.length > 0}
                onToggle={() => toggleExpand('root')}
                onSelect={() => setSelectedPath(['root'])}
                childCount={data.tier2?.length || 0}
            />

            {expandedNodes.has('root') && data.tier2?.map((t2: any) => (
                <React.Fragment key={`t2-${t2.id}`}>
                    <TreeNode
                        level={2}
                        id={t2.id}
                        name={t2.name}
                        isSelected={selectedPath.length === 2 && selectedPath[1] === t2.id}
                        isExpanded={expandedNodes.has(t2.id)}
                        hasChildren={t2.tier3?.length > 0}
                        onToggle={() => toggleExpand(t2.id)}
                        onSelect={() => setSelectedPath(['root', t2.id])}
                        childCount={t2.tier3?.length || 0}
                    />
                    {expandedNodes.has(t2.id) && t2.tier3?.map((t3: any) => (
                        <TreeNode
                            key={`t3-${t3.id}`}
                            level={3}
                            id={t3.id}
                            name={t3.name}
                            isSelected={selectedPath.length === 3 && selectedPath[2] === t3.id}
                            isExpanded={false}
                            hasChildren={false}
                            onToggle={() => { }}
                            onSelect={() => setSelectedPath(['root', t2.id, t3.id])}
                            childCount={0}
                        />
                    ))}
                </React.Fragment>
            ))}
        </div>
    );

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full bg-muted/10 w-full overflow-hidden">
                {/* Header */}
                <header className="flex-none min-h-16 border-b bg-card flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20 shadow-sm">
                    <div className="flex items-center gap-2 sm:gap-4">
                        <Button variant="ghost" size="icon" onClick={() => router.push('/admin/categories')} className="rounded-full shrink-0" type="button">
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                        <div className="min-w-0">
                            <h1 className="font-bold text-base sm:text-lg leading-tight truncate">{data.name || 'New Category'}</h1>
                            <p className="text-[10px] sm:text-xs text-muted-foreground truncate">"{data.id || 'unassigned'}"</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                        {isDirty && (
                            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-4 duration-300">
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => form.reset()} 
                                    className="hidden sm:inline-flex"
                                    type="button"
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => form.reset()} 
                                    className="sm:hidden rounded-full"
                                    type="button"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                </Button>
                                <Button size="sm" type="submit" disabled={isSaving} className="px-4 shadow-md bg-primary hover:bg-primary/90">
                                    {isSaving ? "Saving..." : <><Save className="w-4 h-4 mr-2 hidden sm:inline-block" /> Save Changes</>}
                                </Button>
                            </div>
                        )}
                        
                        {/* Mobile Menu Trigger */}
                        <Sheet open={isMobileTreeOpen} onOpenChange={setIsMobileTreeOpen}>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon" className="lg:hidden rounded-full shrink-0" type="button">
                                    <Menu className="w-4 h-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="p-0 w-[280px] sm:w-80">
                                <SheetHeader className="p-4 border-b">
                                    <SheetTitle className="text-sm font-bold flex items-center gap-2">
                                        <FolderTree className="w-4 h-4 text-primary" />
                                        Category Hierarchy
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex-1 overflow-y-auto p-3 h-[calc(100vh-60px)] custom-scrollbar">
                                    {renderTree()}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </header>

                {/* Split Pane */}
                <div className="flex flex-1 overflow-hidden p-4 lg:p-6 gap-6 lg:gap-8 w-full flex-col lg:flex-row">

                {/* Left: Tree View (Desktop Only) */}
                <aside className="w-80 flex-none hidden lg:flex flex-col bg-card rounded-2xl border border-border shadow-sm overflow-hidden h-full">
                    <div className="p-4 border-b">
                        <h2 className="font-semibold text-sm">Tier Hierarchy</h2>
                        <p className="text-xs text-muted-foreground mt-0.5">Click to expand and view sub-tiers</p>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
                        {renderTree()}
                    </div>
                </aside>

                {/* Right: Detail View */}
                <main className="flex-1 overflow-y-auto h-full flex flex-col gap-6 lg:gap-8 custom-scrollbar rounded-2xl pb-10">

                    {activeNode ? (
                        <>
                            {/* Properties Form */}
                            <div className="bg-card rounded-2xl border border-border shadow-sm p-8 relative">
                                {selectedLevel > 1 && (
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="absolute top-8 right-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 border-red-100 dark:border-red-900"
                                        onClick={handleDeleteNode}
                                        title="Delete Sub-Tier"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                )}

                                <div className="mb-8">
                                    <h2 className="text-xl font-bold tracking-tight">Tier Details</h2>
                                    <p className="text-sm text-muted-foreground mt-1">Configure tier information and display settings.</p>
                                </div>

                                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                    <div className="space-y-2 col-span-2 sm:col-span-1">
                                        <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Tier Name <span className="text-red-500">*</span></Label>
                                        <Input
                                            value={(activeNode as any).name || ''}
                                            onChange={(e) => updateActiveNode('name', e.target.value)}
                                            placeholder="e.g. Test Electronics"
                                            className="h-11 bg-background"
                                        />
                                    </div>
                                    <div className="space-y-2 col-span-2 sm:col-span-1">
                                        <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Tier Handle (Slug) <span className="text-red-500">*</span></Label>
                                        <Input
                                            value={(activeNode as any).id || ''}
                                            onChange={(e) => updateActiveNode('id', e.target.value)}
                                            placeholder="e.g. test-electronics"
                                            className="h-11 font-mono text-sm bg-muted/40"
                                            readOnly={!isNew && selectedLevel === 1} // Disallow changing root ID if not new because of associations
                                        />
                                    </div>

                                    <div className="space-y-2 col-span-2">
                                        <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Description / Trade Guidance</Label>
                                        <Textarea
                                            value={(activeNode as any).description || (activeNode as any).tradeGuidance || ''}
                                            onChange={(e) => updateActiveNode(selectedLevel === 1 ? 'tradeGuidance' : 'description', e.target.value)}
                                            placeholder="Enter detailed description here..."
                                            rows={4}
                                            className="bg-background resize-y min-h-[100px]"
                                        />
                                    </div>

                                        <div className="col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6 p-4 rounded-xl border bg-muted/10 items-start">
                                            <div className="col-span-1">
                                                <MediaImageField
                                                    label="Desktop Background"
                                                    value={(activeNode as any).image || ""}
                                                    onChange={(url) => updateActiveNode("image", url)}
                                                    folder="/categories"
                                                    aspectRatio={16 / 9}
                                                    fileName={(activeNode as any).name}
                                                    layout="vertical"
                                                />
                                                <p className="text-[10px] text-muted-foreground mt-1">
                                                    Recommended: 1920x1080 (16:9)
                                                </p>
                                            </div>
                                            <div className="col-span-1">
                                                <MediaImageField
                                                    label="Card / Hover Image"
                                                    value={(activeNode as any).mobileImage || ""}
                                                    onChange={(url) => updateActiveNode("mobileImage", url)}
                                                    folder="/categories"
                                                    aspectRatio={3 / 4}
                                                    fileName={`${(activeNode as any).name}-mobile`}
                                                    layout="vertical"
                                                />
                                                <p className="text-[10px] text-muted-foreground mt-1">Recommended: 600x800 (3:4)</p>
                                            </div>
                                            <div className="col-span-1">
                                                <MediaImageField
                                                    label="Mobile Background"
                                                    value={(activeNode as any).mobileBackgroundImage || ""}
                                                    onChange={(url) => updateActiveNode("mobileBackgroundImage", url)}
                                                    folder="/categories"
                                                    aspectRatio={9 / 16}
                                                    fileName={`${(activeNode as any).name}-mobile-bg`}
                                                    layout="vertical"
                                                />
                                                <p className="text-[10px] text-muted-foreground mt-1">Recommended: 1080x1920 (9:16)</p>
                                            </div>
                                        </div>

                                    <div className="space-y-4 col-span-2 sm:col-span-1 border border-dashed rounded-xl p-5 bg-muted/5">
                                        <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Tier Level</Label>
                                        <div className="flex items-center gap-3">
                                            <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${selectedLevel === 1 ? 'bg-purple-100 text-purple-700' : selectedLevel === 2 ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                                T{selectedLevel}
                                            </span>
                                            <span className="text-xs font-medium text-muted-foreground">Hierarchical Depth Level {selectedLevel}</span>
                                        </div>
                                    </div>

                                    {/* Additional Root Props */}
                                    {selectedLevel === 1 && (
                                        <div className="col-span-2 grid grid-cols-2 gap-6 pt-4 border-t border-border/50">
                                            <div className="space-y-4 border rounded-xl p-5 bg-card shadow-sm border-primary/10">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <Label className="text-sm font-bold">Publication Status</Label>
                                                        <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider font-bold">
                                                            {(activeNode as any).status === 'active' ? '● Publicly Visible' : '○ Private Draft'}
                                                        </p>
                                                    </div>
                                                    <Switch
                                                        checked={(activeNode as any).status === 'active'}
                                                        onCheckedChange={(v) => updateActiveNode('status', v ? 'active' : 'draft')}
                                                        className="data-[state=checked]:bg-emerald-500"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-4 border rounded-xl p-5 bg-muted/10">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <Label className="text-sm font-bold">Trending Status</Label>
                                                        <p className="text-xs text-muted-foreground mt-1">Feature category prominently</p>
                                                    </div>
                                                    <Switch
                                                        checked={!!(activeNode as any).isTrending}
                                                        onCheckedChange={(v) => updateActiveNode('isTrending', v)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-4 border rounded-xl p-5 bg-muted/10">
                                                <div className="flex items-center justify-between h-full">
                                                    <div>
                                                        <Label className="text-sm font-bold">Grid Area Strategy</Label>
                                                        <p className="text-xs text-muted-foreground mt-1">CSS Grid span alignment</p>
                                                    </div>
                                                    <Input
                                                        value={(activeNode as any).gridArea || ''}
                                                        onChange={(e) => updateActiveNode('gridArea', e.target.value)}
                                                        placeholder="e.g. area-1"
                                                        className="w-24 h-9 text-xs"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* SubTiers list view (Only for T1 and T2) */}
                            {selectedLevel < 3 && (
                                <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden mb-12">
                                    <div className="px-8 py-5 border-b border-border/50 flex justify-between items-center bg-muted/10">
                                        <h3 className="font-bold text-xs uppercase text-muted-foreground tracking-widest">
                                            Sub-Tiers ({selectedLevel === 1 ? (Math.max((activeNode as any).tier2?.length || 0, 0)) : (Math.max((activeNode as any).tier3?.length || 0, 0))})
                                        </h3>
                                        <Button variant="outline" size="sm" onClick={addSubTier} className="h-9 shadow-sm rounded-full px-4">
                                            <Plus className="w-4 h-4 mr-1.5" /> Add Sub-Tier
                                        </Button>
                                    </div>
                                    <div className="divide-y divide-border/50">
                                        {((selectedLevel === 1 ? (activeNode as any).tier2 : (activeNode as any).tier3) || []).map((child: any, idx: number) => (
                                            <div
                                                key={child.id ? `${child.id}-${idx}` : `sub-tier-${idx}`}
                                                className="px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between hover:bg-muted/40 cursor-pointer group transition-colors"
                                                onClick={() => {
                                                    if (selectedLevel === 1) {
                                                        if (!expandedNodes.has('root')) toggleExpand('root');
                                                        setSelectedPath(['root', child.id]);
                                                    } else {
                                                        if (!expandedNodes.has(selectedPath[1])) toggleExpand(selectedPath[1]);
                                                        setSelectedPath(['root', selectedPath[1], child.id]);
                                                    }
                                                }}
                                            >
                                                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                                                    <div className="relative w-10 h-10 rounded-lg bg-background flex items-center justify-center overflow-hidden border shadow-sm flex-none">
                                                        {child.image ? (
                                                            <Image 
                                                                 src={child.image} 
                                                                alt={child.name}
                                                                fill
                                                                sizes="40px"
                                                                className="object-cover"
                                                            />
                                                        ) : (
                                                            <FolderTree className="w-4 h-4 text-muted-foreground/50" />
                                                        )}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className="font-semibold text-sm sm:text-base truncate">{child.name || 'Unnamed Tier'}</div>
                                                        <div className="text-[10px] text-muted-foreground font-mono mt-0.5 opacity-70 truncate">{child.id}</div>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="icon" className="shrink-0 group-hover:bg-background shadow-sm border border-transparent group-hover:border-border opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all rounded-full w-8 h-8">
                                                    <ChevronRight className="w-4 h-4 text-primary" />
                                                </Button>
                                            </div>
                                        ))}
                                        {((selectedLevel === 1 ? (activeNode as any).tier2 : (activeNode as any).tier3) || []).length === 0 && (
                                            <div className="px-8 py-12 text-center text-muted-foreground flex flex-col items-center justify-center gap-3 bg-muted/5">
                                                <FileSymlink className="w-10 h-10 opacity-20 mb-2 text-primary" />
                                                <p className="font-medium text-foreground">No sub-tiers configured yet.</p>
                                                <p className="text-sm">Add a sub-tier to organize your portfolio deeper.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center border border-dashed rounded-2xl border-border/60 bg-muted/5 min-h-[500px]">
                            <Layers className="w-16 h-16 text-muted-foreground/20 mb-4" />
                            <h3 className="text-lg font-semibold text-foreground">No Tier Selected</h3>
                            <p className="text-muted-foreground text-sm max-w-sm text-center mt-2">Select a tier from the hierarchy on the left to view and edit its details.</p>
                        </div>
                    )}
                </main>
                </div>
            </form>
        </Form>
    );
}
