// src/app/page.tsx
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="bg-white dark:bg-dark-bg">
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
    </div>
  );
}