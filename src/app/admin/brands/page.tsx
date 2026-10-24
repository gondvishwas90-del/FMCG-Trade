import { Suspense } from "react";
import { getAllBrands } from "@/app/actions/brand.actions";
import BrandsClient from "./client";
import { AdminTableSkeleton } from "../_components/AdminTableSkeleton";

async function BrandsContent() {
    const response = await getAllBrands();
    const brands = response.success && response.data ? response.data : [];
    return <BrandsClient initialData={brands} />;
}

export default function BrandsPage() {
    return (
        <Suspense fallback={<AdminTableSkeleton />}>
            <BrandsContent />
        </Suspense>
    );
}
