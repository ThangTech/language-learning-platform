import CTASection from "../components/home/CTASection";
import FeaturesSection from "../components/home/FeaturesSection";
import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";


const HomePage = () => {
  return (
    <main className="pt-20 overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
    </main>
  );
};

export default HomePage;