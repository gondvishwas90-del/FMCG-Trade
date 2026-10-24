import { Suspense } from "react";
import { getLeads } from "@/app/actions/leads";
import WhatsAppLeadsClient from "./client";
import { AdminTableSkeleton } from "../_components/AdminTableSkeleton";

async function WhatsAppLeadsContent() {
    const { success, data, error } = await getLeads();

    if (!success) {
        return (
            <div className="p-4 text-red-500">
                Error loading leads: {error}
            </div>
        );
    }

    const leads = data ? data : [];

    return <WhatsAppLeadsClient initialData={leads as any} />;
}

export default function WhatsAppLeadsPage() {
    return (
        <Suspense fallback={<AdminTableSkeleton />}>
            <WhatsAppLeadsContent />
        </Suspense>
    );
}
