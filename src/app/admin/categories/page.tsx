import { Suspense } from "react";
import { getAllCategories } from "@/app/actions/category.actions";
import CategoriesClient from "./client";
import { AdminTableSkeleton } from "../_components/AdminTableSkeleton";

async function CategoriesContent() {
    const response = await getAllCategories();
    const categories = response.success && response.data ? response.data : [];
    return <CategoriesClient initialData={categories} />;
}

export default function CategoriesPage() {
    return (
        <Suspense fallback={<AdminTableSkeleton />}>
            <CategoriesContent />
        </Suspense>
    );
}
