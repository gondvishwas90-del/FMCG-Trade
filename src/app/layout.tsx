import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ThemeFavicon } from "@/components/providers/theme-favicon";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Toaster } from "sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import AnalyticsProvider from "@/components/analytics/AnalyticsProvider";
import { AnimationProvider } from "@/components/providers/AnimationProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteConfig = {
  name: "FMCG Exchange",
  description: "Global B2B platform transforming FMCG trade through strategic innovation, digital supply chain solutions, and direct distribution excellence.",
  url: "https://www.fmcg-exchange.com",
  ogImage: "/logos/fav-dark.png",
  // ogImage: "https://www.fmcg-exchange.com/logos/FMCG-logo(2)-dark.png",
  links: {
    linkedin: "https://www.linkedin.com/company/fmcg-exchange-ltd/",
  },
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "FMCG",
    "FMCG Exchange",
    "Global Trade",
    "B2B Marketplace",
    "Supply Chain Solutions",
    "Wholesale Distribution",
    "Import Export FMCG",
    "Brand Strategy",
    "Digital Transformation",
    "Consumer Goods Trading",
    "Innovation in FMCG",
    "Trade Opportunities",
  ],
  authors: [
    {
      name: "FMCG Exchange",
      url: siteConfig.url,
    },
  ],
  creator: "FMCG Exchange",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@fmcgexchange",
  },
  icons: {
    icon: "/logos/fav-dark.png",
    shortcut: "/logos/fav-dark.png",
    apple: "/logos/fav-dark.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  category: "Business",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AnalyticsProvider />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeFavicon />
          <NuqsAdapter>
            {/* <SmoothScroll /> */}
            <AnimationProvider>
              {children}
            </AnimationProvider>
            <Toaster
              richColors
              closeButton
              position="top-right"
              expand={true}
              visibleToasts={5}
              toastOptions={{
                style: {
                  backdropFilter: 'blur(12px)',
                },
                className: "glass-toast font-sans",
              }}
            />
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  );
}
