import { CaseStudyCarousel } from '@/components/pages/home/components/CaseStudyCarousel';
import dynamicImport from 'next/dynamic';

const CinematicPackageShowcase = dynamicImport(() => import('@/components/pages/home/components/CinematicPackageShowcase').then(mod => mod.CinematicPackageShowcase));
const TradeOpportunities = dynamicImport(() => import('@/components/pages/home/components/TradeOpportunities').then(mod => mod.TradeOpportunities));
const StrategicImpactShowcase = dynamicImport(() => import('@/components/pages/home/components/StrategicImpactShowcase').then(mod => mod.StrategicImpactShowcase));
const ProcessWorkflow = dynamicImport(() => import('@/components/pages/home/components/ProcessWorkflow').then(mod => mod.ProcessWorkflow));
const WhoWeWorkWith = dynamicImport(() => import('@/components/pages/home/components/WhoWeWorkWith').then(mod => mod.WhoWeWorkWith));
const RelationshipsSection = dynamicImport(() => import('@/components/pages/home/components/RelationshipsSection').then(mod => mod.RelationshipsSection));
const ConversationCTA = dynamicImport(() => import('@/components/pages/home/components/ConversationCTA').then(mod => mod.ConversationCTA));
const ExpertiseAccordion = dynamicImport(() => import('@/components/pages/home/components/ExpertiseAccordion').then(mod => mod.ExpertiseAccordion));
import { getCarouselItems } from '@/app/actions/carousel';

import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: "FMCG Exchange | Global FMCG Supply. Built for Trade.",
  description: "FMCG Exchange is a commercial B2B platform for FMCG sourcing, international distribution, and trade supply. Source established brands for bulk and commercial quantities.",
  openGraph: {
    title: "FMCG Exchange | Global FMCG Supply. Built for Trade.",
    description: "Commercial B2B FMCG supply, sourcing, and international distribution partner for verified business buyers.",
    url: "https://www.fmcg-exchange.com",
    images: [
      {
        url: "/logos/fav-dark.png",
        width: 1200,
        height: 630,
        alt: "FMCG Exchange",
      },
    ],
  },
};

export default async function Home() {
  const carouselItems = await getCarouselItems();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FMCG Exchange',
    url: 'https://www.fmcg-exchange.com',
    logo: '/logos/fav-dark.png',
    sameAs: [

      'https://www.linkedin.com/company/fmcg-exchange-ltd/',

    ],
    contactPoint: {
      areaServed: 'Worldwide',
      availableLanguage: 'English'
    }
  };

  return (
    <main className="min-h-screen">
      <h1 className="sr-only">FMCG Exchange | Global FMCG Supply & Commercial Trade</h1>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <CaseStudyCarousel items={carouselItems} />
      <CinematicPackageShowcase />
      <TradeOpportunities />
      <ProcessWorkflow />
      <StrategicImpactShowcase />
      <ExpertiseAccordion />
      <WhoWeWorkWith />
      <RelationshipsSection />
      <ConversationCTA />
    </main>
  );
}
