import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const luxuryEase = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: luxuryEase },
  },
};

const travelers = [
  {
    title: "Busy Professionals & Entrepreneurs",
    painPoints: [
      "No time to compare flights, hotels, and itineraries",
      "Travel planning feels like work",
      "Decision fatigue slows everything down"
    ],
    benefit: "We handle all logistics and options, letting you focus on decisions that matter.",
    cta: "Plan a Trip Without the Hassle",
    ctaLink: "/plan-my-trip"
  },
  {
    title: "First-Time or Infrequent Travelers",
    painPoints: [
      "Visa requirements and airport transfers are confusing",
      "Overwhelmed by options",
      "Fear of making costly mistakes"
    ],
    benefit: "Step-by-step guidance ensures nothing is left to chance.",
    cta: "Get Guided Planning Support",
    ctaLink: "/plan-my-trip"
  },
  {
    title: "Honeymoons & Special Occasions",
    painPoints: [
      "High emotional stakes",
      "No room for errors",
      "Hard to create meaningful experiences"
    ],
    benefit: "We design seamless, memorable trips tailored to your special moments.",
    cta: "Design a Special Trip",
    ctaLink: "/plan-my-trip"
  },
  {
    title: "Families & Group Travel",
    painPoints: [
      "Different age groups with unique needs",
      "Schedule and budget conflicts",
      "Stress of coordinating multiple bookings"
    ],
    benefit: "One coordinated plan, designed for everyone.",
    cta: "Plan a Group Trip",
    ctaLink: "/plan-my-trip"
  },
  {
    title: "Travelers Who Want Value, Not Guesswork",
    painPoints: [
      "Too many confusing options online",
      "Hidden costs and fake deals",
      "Difficulty knowing which option is actually best"
    ],
    benefit: "We optimize your trip for value, perks, and real quality.",
    cta: "Get Smart Travel Options",
    ctaLink: "/plan-my-trip"
  }
];

const WhoWeWorkWithContent = () => {
  return (
    <section id="who-we-work-with-content" className="relative py-16 sm:py-24 bg-stone-900 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center pb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold mb-2">Who we work with</h2>
        <p className="text-lg text-stone-300 max-w-2xl mx-auto">We design thoughtful, tailored trips for travelers who want confidence, clarity, and exceptional experiences.</p>
      </div>

      <motion.div
        className="max-w-7xl mx-auto px-6 grid gap-6 sm:gap-10 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {travelers.map((traveler, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="bg-stone-800/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-lg hover:shadow-white/20 transition-shadow duration-500"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-serif font-semibold mb-4">{traveler.title}</h3>
              <ul className="list-disc list-inside space-y-2 text-stone-200/90 mb-4">
                {traveler.painPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
              <p className="text-stone-100/90 font-light">{traveler.benefit}</p>
            </div>
            <a
              href={traveler.ctaLink}
              className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-stone-900 font-medium rounded-full shadow-lg shadow-white/10 hover:bg-stone-100 transition-colors duration-300"
            >
              {traveler.cta}
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default WhoWeWorkWithContent;
