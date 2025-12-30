import { motion } from 'framer-motion';
import { Eye, Pencil, CheckCircle, Plane } from 'lucide-react'; // Icons matching each step

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

const stepVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: luxuryEase },
  },
};

const steps = [
  {
    title: "You tell us your vision",
    description: "Share your travel dreams, preferences, and must-haves. We listen carefully to understand your goals.",
    icon: <Eye className="w-6 h-6 text-white" />,
  },
  {
    title: "We design and recommend",
    description: "We craft personalized itineraries, recommend the best flights, hotels, and activities, and optimize for value and experience.",
    icon: <Pencil className="w-6 h-6 text-white" />,
  },
  {
    title: "You review and approve",
    description: "We present your itinerary in detail. You can tweak or approve it, ensuring your trip is exactly how you want.",
    icon: <CheckCircle className="w-6 h-6 text-white" />,
  },
  {
    title: "You travel with confidence",
    description: "Enjoy your trip stress-free, knowing we’re available for support and everything is handled seamlessly.",
    icon: <Plane className="w-6 h-6 text-white" />,
  },
];

const HowWorkingWithUsFeels = () => {
  return (
    <section id="how-we-work" className="relative py-16 sm:py-24 bg-stone-900 text-white">
      <div className="max-w-6xl mx-auto px-6 text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: luxuryEase }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold mb-4"
        >
          How Working With Us Feels
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: luxuryEase }}
          className="text-stone-200/90 text-base sm:text-lg md:text-xl font-light"
        >
          Our process is designed to be simple, human-focused, and stress-free.
        </motion.p>
      </div>

      <motion.div
        className="max-w-7xl mx-auto px-6 grid gap-6 sm:gap-10 sm:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {steps.map((step, index) => (
          <motion.div
            key={index}
            variants={stepVariants}
            className="flex flex-col items-center bg-stone-800/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-white/20 transition-shadow duration-500"
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-stone-200/90 font-light text-center">{step.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <div className="mt-16 flex justify-center">
        <motion.a
          href="#inquiry"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-stone-900 font-medium rounded-full shadow-lg shadow-white/10 hover:bg-stone-100 transition-colors duration-300"
        >
          Plan My Trip
          <Plane className="w-5 h-5" />
        </motion.a>
      </div>
    </section>
  );
};

export default HowWorkingWithUsFeels;
