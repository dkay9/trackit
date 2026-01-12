import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import Footer from '@/components/landing/Footer';
import Navbar from '@/components/landing/Navbar';

export default function Home() {
  return (
    <div className="bg-white dark:bg-dark-bg">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
    </div>
  );
}