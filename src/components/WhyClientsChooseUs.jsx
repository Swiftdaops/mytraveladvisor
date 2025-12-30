import { motion } from 'framer-motion';
import { UserCheck, Phone, Star, Gift, Heart } from 'lucide-react'; // Icons for each value

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
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: luxuryEase },
  },
};

const reasons = [
  {
    title: "Personalized planning, not templates",
    icon: <UserCheck className="w-6 h-6 text-white" />,
  },
  {
    title: "One point of contact",
    icon: <Phone className="w-6 h-6 text-white" />,
  },
  {
    title: "Support before and during travel",
    icon: <Star className="w-6 h-6 text-white" />,
  },
  {
    title: "Curated recommendations",
    icon: <Gift className="w-6 h-6 text-white" />,
  },
  {
    title: "Honest guidance",
    icon: <Heart className="w-6 h-6 text-white" />,
  },
];

const WhyClientsChooseUs = () => {
  return (
    <section id="why-clients-choose-us" className="relative py-16 sm:py-24 bg-stone-900 text-white">
      <div className="max-w-6xl mx-auto px-6 text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: luxuryEase }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold mb-4"
        >
          Why Clients Choose to Work With Us
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: luxuryEase }}
          className="text-stone-200/90 text-base sm:text-lg md:text-xl font-light"
        >
          We focus on delivering a seamless, stress-free travel experience with care and expertise.
        </motion.p>
      </div>

      <motion.div
        className="max-w-7xl mx-auto px-6 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="flex flex-col items-center bg-stone-800/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-white/20 transition-shadow duration-500"
          >
            <div className="mb-4">{reason.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <div className="mt-16 flex justify-center">
        <motion.a
          href="/plan-my-trip"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-stone-900 font-medium rounded-full shadow-lg shadow-white/10 hover:bg-stone-100 transition-colors duration-300"
        >
          Start My Travel Plan
          <Star className="w-5 h-5" />
        </motion.a>
      </div>
    </section>
  );
};

export default WhyClientsChooseUs;
