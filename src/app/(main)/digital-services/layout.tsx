import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Services & Market Expansion | FMCG Exchange',
  description: 'Scale your FMCG brand globally with our digital services. From E-commerce management and growth marketing to digital strategy and localized positioning.',
  keywords: [
    'Digital Services FMCG',
    'FMCG E-commerce Management',
    'Global Market Expansion',
    'FMCG Growth Marketing',
    'Brand Strategy',
    'Digital Operations',
    'B2B Platform Solutions',
  ],
  alternates: {
    canonical: '/digital-services',
  },
  openGraph: {
    title: 'Digital Services & Market Expansion | FMCG Exchange',
    description: 'Scale your FMCG brand globally with our digital services. From E-commerce management and growth marketing to digital strategy and localized positioning.',
    url: 'https://www.fmcg-exchange.com/digital-services',
    type: 'website',
  },
};

export default function DigitalServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
