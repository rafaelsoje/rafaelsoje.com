import React from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { RafaelProfileSection } from "@/components/RafaelProfileSection";
import { ProblemsServicesSection } from "@/components/ProblemsServicesSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { BlogSection } from "@/components/BlogSection";
import { RecommendationsSection } from "@/components/RecommendationsSection";
import { PricingSection } from "@/components/PricingSection";
import { FreeEvaluationSection } from "@/components/FreeEvaluationSection";
import { TechMatrixSection } from "@/components/TechMatrixSection";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100">
      <Header />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <RafaelProfileSection />
        <ProblemsServicesSection />
        <ProjectsSection />
        <BlogSection />
        <RecommendationsSection />
        <PricingSection />
        <FreeEvaluationSection />
        <TechMatrixSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
