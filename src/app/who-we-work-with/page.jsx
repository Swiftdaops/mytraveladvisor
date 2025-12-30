"use client";
import Link from 'next/link';
import WhoWeWorkWithHero from '@/components/WhoWeWorkWithHero';
import WhoWeWorkWithContent from '@/components/WhoWeWorkWith';
import WhyClientsChooseUs from '@/components/WhyClientsChooseUs';
import HowWorkingWithUsFeels from '@/components/WorkingWithUs';

export default function WhoWeWorkWithPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <header className="max-w-7xl mx-auto p-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-sm font-medium text-stone-700 dark:text-stone-200">Home</Link>
          <h1 className="text-lg font-semibold">Who We Work With</h1>
        </nav>
      </header>

      <main>
    

        <WhoWeWorkWithHero />

        <WhoWeWorkWithContent />

        <WhyClientsChooseUs />

        <HowWorkingWithUsFeels />
      </main>
    </div>
  );
}
