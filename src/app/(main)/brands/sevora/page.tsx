
import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import { SevoraHero } from "@/components/pages/brands/sevora/components/SevoraHero";
import { SugarProblem } from "@/components/pages/brands/sevora/components/SugarProblem";

import { SevoraSolution } from "@/components/pages/brands/sevora/components/SevoraSolution";
import { HowItWorks } from "@/components/pages/brands/sevora/components/HowItWorks";
import { SevoraBenefits } from "@/components/pages/brands/sevora/components/SevoraBenefits";
import { ComparisonTable } from "@/components/pages/brands/sevora/components/ComparisonTable";
import { UseCases } from "@/components/pages/brands/sevora/components/UseCases";
import { ProductShowcase } from "@/components/pages/brands/sevora/components/ProductShowcase";
import { Testimonials } from "@/components/pages/brands/sevora/components/Testimonials";
import { SafetyTrust } from "@/components/pages/brands/sevora/components/SafetyTrust";
import { SevoraFAQ } from "@/components/pages/brands/sevora/components/SevoraFAQ";
import { FinalConversion } from "@/components/pages/brands/sevora/components/FinalConversion";

export const metadata: Metadata = {
  title: "Sevora Stevia | Natural Zero-Calorie Sweetener",
  description: "Experience sweetness without the sugar. Sevora Stevia is a premium, 100% natural plant-based sweetener for a healthier lifestyle.",
};

export default async function SevoraBrandPage() {
    return (
    <main className="min-h-screen bg-background">
      {/* Phase 1 Sections */}
      <SevoraHero />
      <SugarProblem />

      {/* Phase 2 Sections */}
      <SevoraSolution />
      <HowItWorks />
      <SevoraBenefits />

      {/* Phase 3 Sections */}
      <ComparisonTable />
      <UseCases />
      <ProductShowcase />

      {/* Phase 4 Sections */}
      <Testimonials />
      <SafetyTrust />
      <SevoraFAQ />
      <FinalConversion />
  
    </main>
  );
}
