import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function FieldSkeleton({ labelWidth = "w-20" }: { labelWidth?: string }) {
    return (
        <div className="space-y-2">
            <Skeleton className={`h-4 ${labelWidth}`} />
            <Skeleton className="h-10 w-full" />
        </div>
    );
}

function TagsFieldSkeleton({ labelWidth = "w-20" }: { labelWidth?: string }) {
    return (
        <div className="space-y-2">
            <Skeleton className={`h-4 ${labelWidth}`} />
            {/* Fake tags */}
            <div className="flex flex-wrap gap-2 mb-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <div className="flex gap-2">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-14" />
            </div>
            <Skeleton className="h-3 w-36" />
        </div>
    );
}

function SelectFieldSkeleton({ labelWidth = "w-16" }: { labelWidth?: string }) {
    return (
        <div className="space-y-2">
            <Skeleton className={`h-4 ${labelWidth}`} />
            <Skeleton className="h-10 w-full" />
        </div>
    );
}

export function TradeOfferFormSkeleton() {
    return (
        <div className="space-y-8">
            {/* ── PAGE HEADER SKELETON ── */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 pt-6">
                <div className="space-y-2">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-3 w-10" />
                        <Skeleton className="h-3 w-2" />
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-3 w-2" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                    {/* Title */}
                    <Skeleton className="h-8 w-56" />
                    {/* Subtitle */}
                    <Skeleton className="h-4 w-72" />
                </div>
                {/* Action buttons */}
                <div className="flex gap-3">
                    <Skeleton className="h-10 w-24 rounded-md" />
                    <Skeleton className="h-10 w-20 rounded-md" />
                </div>
            </div>

            {/* ── FORM BODY ── */}
            <div className="px-6 pb-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT COLUMN (2/3) */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Card 1 — Product Details */}
                        <Card>
                            <CardHeader>
                                <Skeleton className="h-5 w-36" />
                            </CardHeader>
                            <CardContent className="space-y-5">
                                {/* Title field */}
                                <FieldSkeleton labelWidth="w-8" />

                                {/* Image upload skeleton */}
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-12" />
                                    <Skeleton className="h-80 w-full rounded-2xl" />
                                    <Skeleton className="h-3 w-52" />
                                </div>

                                {/* Notes tags */}
                                <TagsFieldSkeleton labelWidth="w-12" />
                            </CardContent>
                        </Card>

                        {/* Card 2 — Classification & Specs */}
                        <Card>
                            <CardHeader>
                                <Skeleton className="h-5 w-44" />
                            </CardHeader>
                            <CardContent className="space-y-5">
                                {/* Categories + Types (2-col grid) */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <TagsFieldSkeleton labelWidth="w-20" />
                                    <TagsFieldSkeleton labelWidth="w-12" />
                                </div>
                                {/* Sizes */}
                                <TagsFieldSkeleton labelWidth="w-10" />
                            </CardContent>
                        </Card>
                    </div>

                    {/* RIGHT COLUMN (1/3) */}
                    <div className="space-y-6">

                        {/* Card 3 — Status & Availability */}
                        <Card>
                            <CardHeader>
                                <Skeleton className="h-5 w-40" />
                            </CardHeader>
                            <CardContent className="space-y-5">
                                <SelectFieldSkeleton labelWidth="w-12" />
                                <SelectFieldSkeleton labelWidth="w-24" />
                            </CardContent>
                        </Card>

                        {/* Card 4 — Market & Pricing */}
                        <Card>
                            <CardHeader>
                                <Skeleton className="h-5 w-36" />
                            </CardHeader>
                            <CardContent className="space-y-5">
                                <TagsFieldSkeleton labelWidth="w-16" />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
