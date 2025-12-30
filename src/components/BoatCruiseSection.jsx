import Link from 'next/link';
import { motion } from 'framer-motion';

const BoatCruiseSection = ({ type = 'family' }) => {
  const options = {
    family: {
      headline: 'Enjoy a Boat Cruise with Your Family',
      subheadline: 'Relax, explore, and create lasting memories on the water — fully planned for you.',
      cta: 'Plan a Cruise Trip',
    },
    couples: {
      headline: 'Sail Away Together',
      subheadline: 'Experience a romantic boat cruise — intimate, curated, and stress-free.',
      cta: 'Plan a Couples Cruise',
    },
    custom: {
      headline: 'Your Custom Boat Adventure Awaits',
      subheadline: 'From family outings to private getaways, we design a cruise that fits your vision perfectly.',
      cta: 'Plan My Cruise',
    },
  };

  const { headline, subheadline, cta } = options[type];

  return (
    <section className="relative w-full overflow-hidden min-h-[80vh]">
      {/* Full-bleed Cloudinary background image */}
      <img
        src="https://res.cloudinary.com/dnitzkowt/image/upload/v1767084557/boatcruise_pcvd4w.webp"
        alt="Boat cruise background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />

      {/* Content container controls spacing (no outer section padding/margins) */}
      <div className="relative z-10 max-w-7xl mx-auto py-24 sm:py-28 px-6 md:py-32 lg:py-48">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif mb-4 text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {headline}
        </motion.h2>

        <motion.p
          className="mb-6 text-stone-200/90 text-base sm:text-lg md:text-xl text-center max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2 } }}
        >
          {subheadline}
        </motion.p>

        <motion.div className="flex justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.4 } }}>
          <Link
            href="/plan-my-trip"
            className="px-6 md:px-8 py-3 rounded-full bg-green-500 hover:bg-green-600 transition inline-block font-medium text-white"
          >
            {cta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BoatCruiseSection;
