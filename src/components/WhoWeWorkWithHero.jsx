"use client";

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Plane } from 'lucide-react'; // Using Plane as airplane icon

// --- Animation Variants ---
// Using a custom easing curve for a "luxury/heavy" feel
const luxuryEase = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay between each child element animating in
      delayChildren: 0.3,   // Initial delay before starting sequence
    },
  },
};

const textVariants = {
  hidden: { y: 40, opacity: 0, filter: 'blur(10px)' },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: luxuryEase,
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: luxuryEase,
      delay: 0.6 // Extra delay so buttons appear last
    },
  },
};

const WhoWeWorkWithHero = () => {
  const router = useRouter();
  // Function to handle smooth scroll to the next section
  const scrollToContent = () => {
    const nextSection = document.getElementById('who-we-work-with-content');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-[92vh] min-h-[520px] sm:min-h-[600px] flex items-center justify-center overflow-hidden">
        
      {/* --- Background Image & Overlay --- */}
      {/* TODO: Replace 'src' with your optimized Cloudinary URL.
          Use a high-res, inspiring, but slightly muted travel image.
      */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: luxuryEase }}
        className="absolute inset-0 z-0"
      >
         {/* Placeholder gradient - swap with <img> tag below when ready */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-stone-800/80 to-stone-900"></div>

        {/* Example Image Tag (Uncomment and add URL) */}
        {/* <img 
            src="YOUR_CLOUDINARY_URL_HERE" 
            alt="Luxury travel destination" 
            className="w-full h-full object-cover opacity-50" 
        /> */}
        
        {/* Dark Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/40 mix-blend-overlay"></div>
      </motion.div>


      {/* --- Hero Content --- */}
      <motion.div 
        className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Headline */}
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-7xl font-serif tracking-tight leading-tight mb-8"
          variants={textVariants}
        >
          Travel planning looks simple — until it isn’t.
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          className="text-base sm:text-lg md:text-2xl text-stone-200/90 max-w-2xl mx-auto leading-relaxed font-light mb-12"
          variants={textVariants}
        >
          We work with travelers who want confidence, clarity, and a trip that’s thoughtfully designed from start to finish.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={buttonVariants}
        >
           {/* Primary CTA - Scrolls Down */}
           <motion.button
            onClick={scrollToContent}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            whileTap={{ scale: 0.98 }}
            className="group px-8 py-4 bg-transparent border-2 border-white/30 text-white text-lg rounded-full backdrop-blur-sm transition-all flex items-center gap-2 hover:border-white"
          >
            See If We’re a Fit
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
          </motion.button>

          {/* Secondary CTA - Goes to Inquiry Form */}
          {/* Replace with <Link href="/inquiry"> if using Next.js Link */}
          <motion.button
            onClick={() => router.push('/plan-my-trip')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group px-8 py-4 bg-white text-stone-900 text-lg rounded-full font-medium shadow-lg shadow-white/10 flex items-center gap-2"
          >
            Plan My Trip
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>

        </motion.div>
      </motion.div>
      
       {/* Optional subtle scroll indicator at very bottom */}
       <motion.div 
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 2.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
         className="absolute bottom-8 z-10 text-white/50 hidden md:block"
       >
         <p className="text-sm uppercase tracking-widest flex items-center justify-center gap-2">
          Scroll to explore
          <Plane className="w-4 h-4 opacity-90" />
         </p>
       </motion.div>

    </section>
  );
};

export default WhoWeWorkWithHero;