import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
// import CTA from '@/components/landing/CTA';
import Footer from '@/components/landing/Footer'; 

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      {/* <CTA /> */}
      <Footer />
    </main>
  );
}