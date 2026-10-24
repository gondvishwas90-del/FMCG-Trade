import { TradeOffersPage } from "@/components/pages/trade-opportunities/components/TradeOffersPage";
import { getTradeOffers } from "@/app/actions/trade-offers";
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Global Trade Opportunities | FMCG Exchange',
  description: 'Explore live, high-value FMCG trade opportunities. Connect directly with global suppliers and buyers for premium consumer goods wholesale trading.',
  keywords: ['FMCG Trade Opportunities', 'Global Wholesale', 'FMCG Importers', 'FMCG Exporters', 'B2B Trade Offers', 'Bulk FMCG Trading'],
  alternates: {
    canonical: '/trade-opportunities',
  },
  openGraph: {
    title: 'Global Trade Opportunities | FMCG Exchange',
    description: 'Explore live, high-value FMCG trade opportunities. Connect directly with global suppliers and buyers for premium consumer goods wholesale trading.',
    url: 'https://www.fmcg-exchange.com/trade-opportunities',
    type: 'website',
  }
};

export default async function TradeOpportunitiesPage() {
    const { success, data: offers = [] } = await getTradeOffers(true); // activeOnly: true

    return <TradeOffersPage initialOffers={offers} />;
}
