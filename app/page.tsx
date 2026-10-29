import type { Metadata } from "next";
import HeroSlider from "@/components/home/HeroSlider";
import AboutSection from "@/components/home/AboutSection";
import WhoWeHelpSection from "@/components/home/WhoWeHelpSection";
import ServicesSection from "@/components/home/ServicesSection";
import ApprovalExpertiseSection from "@/components/home/ApprovalExpertiseSection";
import AboutFadiSection from "@/components/home/AboutFadiSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import ServiceAreasSection from "@/components/home/ServiceAreasSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQPreviewSection from "@/components/home/FAQPreviewSection";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Certify Right | NSW Approvals, Certification & Compliance",
  description:
    "More than a certifier — your approval and compliance partner. Planning advice, approval package reviews, CDC, Construction and Occupation Certificates, BCA/NCC compliance and fire safety across NSW. Fadi Habbouche — Registered Building Surveyor Class A3, BDC2868.",
  alternates: {
    canonical: "https://certifyright.com.au",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <AboutSection />
      <WhoWeHelpSection />
      <ServicesSection />
      <ApprovalExpertiseSection />
      <AboutFadiSection />
      <HowItWorksSection />
      <ServiceAreasSection />
      <TestimonialsSection />
      <CTASection />
      <FAQPreviewSection />
    </>
  );
}
