"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';
import posthog from 'posthog-js';

const flightSectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};

const BookFlightsSection = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
    fetch(`${base}/api/trips`)
      .then((res) => res.json())
      .then((json) => {
        // backend returns { success, data }
        const data = json?.data || json;
        setTrips(Array.isArray(data) ? data : []);
      })
      .catch((err) => setError(err.message || 'Failed to load trips'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.section
      className="py-16 sm:py-24 px-6 text-center max-w-4xl mx-auto relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={flightSectionVariants}
    >
      <div className="absolute inset-0 bg-stone-900/20 pointer-events-none rounded-xl"></div>

      <div className="relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-4 text-white">Book Your Flight Now</h2>
        <p className="mb-8 text-stone-200/90 text-base sm:text-lg md:text-xl">
          We find the best and cheapest flights for your destinations — so you can focus on enjoying your trip.
        </p>

        <Link
          href="/plan-my-trip?focus=flights"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-green-500 text-white font-medium shadow-lg hover:bg-green-600 transition"
          onClick={() => {
            // PostHog: Track search flights CTA click
            posthog.capture('search_flights_clicked', {
              source: 'homepage_book_flights_section',
            });
          }}
        >
          Search Flights
          <Plane className="w-5 h-5 rotate-45" />
        </Link>

        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          {loading && (
            <div className="col-span-full text-stone-300">Loading trips…</div>
          )}

          {error && (
            <div className="col-span-full text-red-400">{error}</div>
          )}

          {!loading && !error && trips.length === 0 && (
            <div className="col-span-full text-stone-300">No trips available right now.</div>
          )}

          {!loading && trips.slice(0, 2).map((t) => (
            <div key={t._id} className="bg-stone-800 p-4 sm:p-6 rounded-xl shadow-md flex items-center justify-between gap-4">
              <div className="text-left">
                <p className="text-stone-300">{t.name}</p>
                <p className="text-green-400 font-semibold">${t.dailyCost ?? '—'}</p>
              </div>
              <Plane className="w-6 h-6 text-white rotate-45" />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BookFlightsSection;
