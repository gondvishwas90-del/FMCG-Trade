import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function AdminTableSkeleton() {
    return (
        <div className="space-y-6 w-full p-6 animate-in fade-in duration-500">
            {/* Header Skeleton */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-2">
                    <Skeleton className="h-9 w-48" /> {/* Title */}
                    <Skeleton className="h-4 w-72" /> {/* Subtitle */}
                </div>
                <Skeleton className="h-11 w-32 rounded-md" /> {/* Action Button */}
            </div>

            {/* Metrics Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="border-none shadow-sm bg-card/50">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-12 w-12 rounded-xl" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-6 w-12" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Filters Bar Skeleton */}
            <Card className="border-none shadow-sm bg-card/30">
                <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex flex-1 items-center gap-2 w-full">
                            <Skeleton className="h-10 w-full max-w-sm" />
                            <Skeleton className="h-10 w-24" />
                            <Skeleton className="h-10 w-24" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-10 w-10 rounded-md" />
                            <Skeleton className="h-10 w-10 rounded-md" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Table Skeleton */}
            <div className="rounded-xl border border-border/50 bg-card/30 overflow-hidden">
                <div className="h-12 bg-muted/50 border-b border-border/50 flex items-center px-4 gap-4">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-10 ml-auto" />
                </div>
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-16 border-b border-border/40 flex items-center px-4 gap-4">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-10 w-10 rounded-lg" />
                        <div className="space-y-1">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-3 w-24 opacity-60" />
                        </div>
                        <Skeleton className="h-6 w-24 rounded-full ml-12" />
                        <Skeleton className="h-6 w-16 rounded-full" />
                        <Skeleton className="h-8 w-8 rounded-md ml-auto" />
                    </div>
                ))}
            </div>
        </div>
    );
}
