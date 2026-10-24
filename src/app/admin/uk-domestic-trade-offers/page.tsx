import { Suspense } from "react";
import { getUKDomesticTradeOffers } from "@/app/actions/uk-domestic-trade-offers";
import UKDomesticTradeOffersClient from "./client";
import { AdminTableSkeleton } from "../_components/AdminTableSkeleton";

async function UKDomesticTradeOffersContent() {
    const { success, data, error } = await getUKDomesticTradeOffers();

    if (!success) {
        return (
            <div className="p-4 text-red-500">
                Error loading UK domestic trade offers: {error}
            </div>
        );
    }

    // Ensure data matches the interface expected by the client component
    const tradeOffers = data ? data : [];

    return <UKDomesticTradeOffersClient initialData={tradeOffers as any} />;
}

export default function UKDomesticTradeOffersPage() {
    return (
        <Suspense fallback={<AdminTableSkeleton />}>
            <UKDomesticTradeOffersContent />
        </Suspense>
    );
}
