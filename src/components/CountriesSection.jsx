"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import posthog from 'posthog-js';

const luxuryEase = [0.22, 1, 0.36, 1];

const staticCountries = [
  { name: 'Maldives', cost: '$400', image: 'https://source.unsplash.com/800x600/?Maldives' },
  { name: 'Dubai', cost: '$250', image: 'https://source.unsplash.com/800x600/?Dubai' },
  { name: 'Paris', cost: '$300', image: 'https://source.unsplash.com/800x600/?Paris' },
  { name: 'Bali', cost: '$150', image: 'https://source.unsplash.com/800x600/?Bali' },
  { name: 'New York', cost: '$350', image: 'https://source.unsplash.com/800x600/?New%20York' },
  { name: 'Santorini', cost: '$280', image: 'https://source.unsplash.com/800x600/?Santorini' },
  { name: 'Tokyo', cost: '$220', image: 'https://source.unsplash.com/800x600/?Tokyo' },
  { name: 'Rome', cost: '$200', image: 'https://source.unsplash.com/800x600/?Rome' },
  { name: 'Iceland', cost: '$320', image: 'https://source.unsplash.com/800x600/?Iceland' },
  { name: 'Cape Town', cost: '$180', image: 'https://source.unsplash.com/800x600/?Cape%20Town' },
];

const formatCost = (v) => (v == null ? '—' : `$${Math.round(v)}`);

const CountriesSection = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noListings, setNoListings] = useState(false);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
    // Try listings endpoint first, fall back to trips
    fetch(`${base}/api/listings`)
      .then((res) => res.json())
      .then((json) => {
        const data = json?.data || json || [];
        if (!Array.isArray(data) || data.length === 0) throw new Error('No listings');
        const mapped = data.map((it) => {
          const min = it.accommodationEstimate?.minPerDay ?? null;
          const max = it.accommodationEstimate?.maxPerDay ?? null;
          const cost = (min != null && max != null) ? `${formatCost(min)} - ${formatCost(max)}` : (it.dailyCost ? formatCost(it.dailyCost) : '—');
          return {
            name: it.title || it.name,
            min,
            max,
            cost,
            description: it.description || '',
            image: (it.images && it.images[0]?.url) || it.image || `https://source.unsplash.com/800x600/?${encodeURIComponent(it.title || it.name)}`,
          };
        }).filter(c => c.name);

        // Include items whose range overlaps the $100-$500 window
        const inRange = mapped.filter((c) => {
          if (c.min == null || c.max == null) return false;
          return c.max >= 100 && c.min <= 500;
        });
        const final = inRange.length ? inRange : mapped;
        setCountries(final.slice(0, 10));
        if (!final.length) setNoListings(true);
      })
      .catch(() => {
        // fallback to /api/trips
        fetch(`${base}/api/trips`)
          .then((res) => res.json())
          .then((json) => {
            const data = json?.data || json || [];
            const mapped = data.map((t) => ({
              name: t.name,
              min: t.dailyCost ?? null,
              max: t.dailyCost ?? null,
              cost: t.dailyCost ? formatCost(t.dailyCost) : '—',
              image: t.image || `https://source.unsplash.com/800x600/?${encodeURIComponent(t.name)}`,
            }));
            const inRange = mapped.filter((c) => c.max != null && c.max >= 100 && c.min != null && c.min <= 500);
            const final = inRange.length ? inRange : mapped;
            setCountries(final.slice(0, 10));
            if (!final.length) setNoListings(true);
          })
          .catch((err) => {
            setError(err.message || 'Failed to load countries');
            setCountries([]);
          })
          .finally(() => setLoading(false));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16 sm:py-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-serif mb-12 text-center text-white">Countries You Can Visit Now</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        {loading && (
          <div className="col-span-full text-center text-stone-400">Loading countries…</div>
        )}

        {error && (
          <div className="col-span-full text-center text-red-400">{error}</div>
        )}

        {!loading && countries.length === 0 && !error && noListings && (
          <div className="col-span-full text-center text-stone-400">No listings yet.</div>
        )}

        {!loading && countries.map((country) => (
          <motion.div
            key={country.name}
            className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer group bg-stone-800"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, ease: luxuryEase }}
          >
            {/* Country Image */}
            <img
              src={country.image}
              alt={country.name}
              className="w-full h-48 object-cover group-hover:brightness-110 transition-all duration-500"
            />

            <div className="p-4 bg-black/40 text-white">
              <h3 className="text-xl font-semibold">{country.name}</h3>
              <p className="text-sm text-gray-200 mt-2">{country.description || ''}</p>
              <p className="text-green-400 mt-2">Est. Accommodation: {country.cost}/day</p>
              <Link
                href="/plan-my-trip"
                className="mt-3 inline-block px-4 py-2 bg-green-500 rounded-full text-white font-medium text-sm hover:bg-green-600 transition-colors"
                onClick={() => {
                  // PostHog: Track plan trip click from country card
                  posthog.capture('plan_trip_from_country_clicked', {
                    country_name: country.name,
                    country_cost: country.cost,
                    source: 'homepage_countries_section',
                  });
                }}
              >
                Plan Your Trip
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CountriesSection;
