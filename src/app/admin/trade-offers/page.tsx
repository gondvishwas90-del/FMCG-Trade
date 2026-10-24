import { Suspense } from "react";
import { getTradeOffers } from "@/app/actions/trade-offers";
import TradeOffersClient from "./client";
import { AdminTableSkeleton } from "../_components/AdminTableSkeleton";

async function TradeOffersContent() {
    const { success, data, error } = await getTradeOffers();

    if (!success) {
        return (
            <div className="p-4 text-red-500">
                Error loading trade offers: {error}
            </div>
        );
    }

    // Ensure data matches the interface expected by the client component
    // We might need to map or cast if the server action returns strict Mongoose documents
    const tradeOffers = data ? data : [];

    return <TradeOffersClient initialData={tradeOffers as any} />;
}

export default function TradeOffersPage() {
    return (
        <Suspense fallback={<AdminTableSkeleton />}>
            <TradeOffersContent />
        </Suspense>
    );
}
