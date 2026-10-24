import { Suspense } from "react";
import { getAllBrandOwners } from "@/app/actions/brand-owner.actions";
import BrandOwnersClient from "./client";
import { AdminTableSkeleton } from "../_components/AdminTableSkeleton";

async function BrandOwnersContent() {
    const response = await getAllBrandOwners();
    const owners = response.success && response.data ? response.data : [];
    return <BrandOwnersClient initialData={owners} />;
}

export default function BrandOwnersPage() {
    return (
        <Suspense fallback={<AdminTableSkeleton />}>
            <BrandOwnersContent />
        </Suspense>
    );
}
