import { ReactNode } from 'react';
import { CategoryHoverProvider } from './_components/CategoryHoverContext';
import { CategoryTransitionLayout } from './_components/CategoryTransitionLayout';
import { getCategories } from '@/app/actions/category.actions';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'FMCG Categories | FMCG Exchange',
  description: 'Browse our extensive portfolio of FMCG categories. From premium spirits and wines to everyday groceries, find the perfect products for your global distribution.',
  keywords: ['FMCG Categories', 'Wholesale Food and Beverages', 'Premium Spirits Wholesale', 'Grocery Distribution', 'B2B FMCG Sourcing'],
  alternates: {
    canonical: '/categories',
  },
  openGraph: {
    title: 'FMCG Categories | FMCG Exchange',
    description: 'Browse our extensive portfolio of FMCG categories. From premium spirits and wines to everyday groceries, find the perfect products for your global distribution.',
    url: 'https://www.fmcg-exchange.com/categories',
    type: 'website',
  }
};

export default async function CategoriesLayout({ children }: { children: ReactNode }) {
    const res = await getCategories();
    const categories = res.success ? (res.data || []) : [];

    return (
        <CategoryHoverProvider>
            <CategoryTransitionLayout categories={categories}>
                {children}
            </CategoryTransitionLayout>
        </CategoryHoverProvider>
    );
}
