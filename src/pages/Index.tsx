import { useRef } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Simulator from "@/components/Simulator";
import BenefitsSection from "@/components/BenefitsSection";
import ContemplatedClientsSection from "@/components/ContemplatedClientsSection";
import Footer from "@/components/Footer";

const Index = () => {
  const simulatorRef = useRef<HTMLDivElement>(null);

  const scrollToSimulator = () => {
    const element = document.getElementById("simulador");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 md:pt-20">
        <HeroSection onSimulateClick={scrollToSimulator} />
        <Simulator />
        <BenefitsSection />
        <ContemplatedClientsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
