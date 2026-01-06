import Navbar from '@/components/landing/Navbar';

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      {children}
    </div>
  );
}