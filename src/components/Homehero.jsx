'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowDown, Plane } from 'lucide-react';

const luxuryEase = [0.22, 1, 0.36, 1];

const HeroSection = () => {
  const scrollToWhoWeWorkWith = () => {
    const section = document.getElementById('who-we-work-with');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const router = useRouter();

  return (
    <section className="relative h-[90vh] md:h-[95vh] flex items-center justify-center text-center overflow-hidden ">
      
      {/* Background Image / Overlay */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: luxuryEase }}
      >
        {/* High-res background image with strong intentional blur */}
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=80"
          alt="Luxury Travel"
          className="w-full h-full object-cover opacity-60 blur-xl scale-105"
        />
        <div className="absolute inset-0 bg-black/40 mix-blend-overlay"></div>
      </motion.div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 max-w-4xl px-6 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: luxuryEase }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif mb-6 leading-tight">
          Travel smart, stress-free, and unforgettable.
        </h1>
        <p className="text-base sm:text-lg md:text-2xl text-stone-200/90 mb-12 font-light">
          Personalized trips, curated experiences, and the best deals — designed just for you.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {/* Primary CTA */}
          <Link
            href="/plan-my-trip"
            className="px-8 py-4 rounded-full bg-green-500 hover:bg-green-600 transition font-medium text-white shadow-lg"
          >
            Plan My Trip
          </Link>

          {/* Secondary CTA */}
          <button
            onClick={() => router.push('/who-we-work-with')}
            className="group px-8 py-4 rounded-full border-2 border-white/30 text-white hover:border-white backdrop-blur-sm transition flex items-center gap-2"
          >
            See if We’re a Fit
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </motion.div>

      {/* Optional Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 z-10 text-white/50 hidden md:block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
      >
        <p className="text-sm uppercase tracking-widest flex items-center justify-center gap-2">
          Scroll to explore
          <Plane className="w-4 h-4 opacity-90" />
        </p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
