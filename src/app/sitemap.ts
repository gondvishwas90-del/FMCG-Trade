import { MetadataRoute } from 'next';
import { getBrands } from '@/app/actions/brand.actions';
import { getCategories } from '@/app/actions/category.actions';

const baseUrl = 'https://www.fmcg-exchange.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/brand-owners`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/brands`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/digital-services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-we-work`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/trade-opportunities`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/uk-domestic-trade`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Dynamic Brands Routes
  let dynamicBrands: MetadataRoute.Sitemap = [];
  try {
    const brandsRes = await getBrands();
    if (brandsRes.success && brandsRes.data) {
      dynamicBrands = brandsRes.data.map((brand: any) => ({
        url: `${baseUrl}/brands/${brand.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error("Error fetching brands for sitemap:", error);
  }

  // Dynamic Brand Owners Routes
  let dynamicBrandOwners: MetadataRoute.Sitemap = [];
  try {
    const { getBrandOwners } = await import('@/app/actions/brand-owner.actions');
    const ownersRes = await getBrandOwners();
    if (ownersRes.success && ownersRes.data) {
      dynamicBrandOwners = ownersRes.data.map((owner: any) => ({
        url: `${baseUrl}/brand-owners/${owner.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error("Error fetching brand owners for sitemap:", error);
  }

  // Dynamic Categories Routes
  let dynamicCategories: MetadataRoute.Sitemap = [];
  try {
    const categoriesRes = await getCategories();
    if (categoriesRes.success && categoriesRes.data) {
      dynamicCategories = categoriesRes.data.map((category: any) => ({
        url: `${baseUrl}/categories/${category.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error("Error fetching categories for sitemap:", error);
  }

  return [...staticRoutes, ...dynamicBrands, ...dynamicBrandOwners, ...dynamicCategories];
}
