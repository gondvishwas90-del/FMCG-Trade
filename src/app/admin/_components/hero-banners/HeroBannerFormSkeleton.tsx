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

function SelectFieldSkeleton({ labelWidth = "w-16" }: { labelWidth?: string }) {
    return (
        <div className="space-y-2">
            <Skeleton className={`h-4 ${labelWidth}`} />
            <Skeleton className="h-10 w-full" />
        </div>
    );
}

export function HeroBannerFormSkeleton() {
    return (
        <div className="space-y-8">
            {/* ── PAGE HEADER SKELETON ── */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 pt-6">
                <div className="space-y-2">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-3 w-10" />
                        <Skeleton className="h-3 w-2" />
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-3 w-2" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                    {/* Title */}
                    <Skeleton className="h-8 w-56" />
                    {/* Subtitle */}
                    <Skeleton className="h-4 w-80" />
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

                    {/* LEFT COLUMN (2/3) — Banner Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <Skeleton className="h-5 w-36" />
                            </CardHeader>
                            <CardContent className="space-y-5">
                                {/* Title */}
                                <FieldSkeleton labelWidth="w-8" />

                                {/* Subtitle */}
                                <FieldSkeleton labelWidth="w-28" />

                                {/* CTA */}
                                <FieldSkeleton labelWidth="w-40" />

                                {/* Background Image upload */}
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-36" />
                                    <Skeleton className="h-80 w-full rounded-2xl" />
                                    <Skeleton className="h-3 w-56" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* RIGHT COLUMN (1/3) — Layout & Status */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <Skeleton className="h-5 w-36" />
                            </CardHeader>
                            <CardContent className="space-y-5">
                                {/* Status select */}
                                <SelectFieldSkeleton labelWidth="w-12" />

                                {/* Layout Design select */}
                                <SelectFieldSkeleton labelWidth="w-28" />

                                {/* Display Order input */}
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-28" />
                                    <Skeleton className="h-10 w-full" />
                                    <Skeleton className="h-3 w-40" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    );
}
