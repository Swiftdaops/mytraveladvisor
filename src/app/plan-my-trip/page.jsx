"use client";
import Link from 'next/link';
import HowWorkingWithUsFeels from '@/components/WorkingWithUs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Mail, User, Phone, MapPin, Calendar, Users, Plane, Star } from 'lucide-react';
import CalendlyInline from '@/components/CalendlyInline';
import posthog from 'posthog-js';

const luxuryEase = [0.22, 1, 0.36, 1];

export default function PlanMyTripPage() {
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      name: '',
      phone: '',
      destination: '',
      transportation: '',
      tripType: '',
      travelers: { adults: 1, children: 0, seniors: 0 },
      accommodation: '',
      budget: '',
      travelersInfo: '',
      activities: [],
      travelDates: { start: '', end: '' },
    },
  });

  const [step, setStep] = useState(0);
  const [showInline, setShowInline] = useState(false);

  const onSubmit = (data) => {
    (async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/inquiries` : 'http://localhost:4000/api/inquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error('Failed to submit inquiry');
        const json = await res.json();
        console.log('Trip Inquiry Submitted:', json);

        // PostHog: Track successful trip inquiry submission
        posthog.capture('trip_inquiry_submitted', {
          destination: data.destination,
          trip_type: data.tripType,
          transportation: data.transportation,
          budget: data.budget,
          accommodation: data.accommodation,
          travelers_adults: data.travelers?.adults,
          travelers_children: data.travelers?.children,
          travelers_seniors: data.travelers?.seniors,
          activities: data.activities,
          travel_dates_start: data.travelDates?.start,
          travel_dates_end: data.travelDates?.end,
        });

        alert('Thanks — your inquiry was submitted. We will contact you soon.');
      } catch (err) {
        console.error(err);

        // PostHog: Track trip inquiry error
        posthog.capture('trip_inquiry_error', {
          error_message: err?.message || 'Unknown error',
        });

        alert('There was a problem submitting your inquiry. Please try again.');
      }
    })();
  };

  const steps = [
    {
      title: 'Basic Info',
      content: (
        <>
          <label className="block mb-4">
            <span className="flex items-center gap-2">Name * <User className="w-4 h-4 inline" /></span>
            <input
              type="text"
              {...register('name', { required: true })}
              className="mt-1 w-full p-3 rounded-lg bg-stone-800 text-white"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">This is a required question</p>}
          </label>
          <label className="block mb-4">
            <span className="flex items-center gap-2">Email * <Mail className="w-4 h-4 inline" /></span>
            <input
              type="email"
              {...register('email', { required: true })}
              className="mt-1 w-full p-3 rounded-lg bg-stone-800 text-white"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">This is a required question</p>}
          </label>
          <label className="block mb-4">
            <span className="flex items-center gap-2">Phone Number * <Phone className="w-4 h-4 inline" /></span>
            <input
              type="tel"
              {...register('phone', { required: true })}
              className="mt-1 w-full p-3 rounded-lg bg-stone-800 text-white"
            />
            {errors.phone && <p className="text-red-400 text-sm mt-1">This is a required question</p>}
          </label>
        </>
      ),
    },
    {
      title: 'Trip Details',
      content: (
        <>
          <label className="block mb-4">
            <span className="flex items-center gap-2">Preferred Destination * <MapPin className="w-4 h-4 inline" /></span>
            <input
              type="text"
              {...register('destination', { required: true })}
              className="mt-1 w-full p-3 rounded-lg bg-stone-800 text-white"
            />
            {errors.destination && <p className="text-red-400 text-sm mt-1">This is a required question</p>}
          </label>
          <label className="block mb-4">
            <span className="flex items-center gap-2">Travel Dates (Departure & Return) * <Calendar className="w-4 h-4 inline" /></span>
            <div className="flex gap-2">
              <input
                type="date"
                {...register('travelDates.start', { required: true })}
                className="w-1/2 p-3 rounded-lg bg-stone-800 text-white"
              />
              <input
                type="date"
                {...register('travelDates.end', { required: true })}
                className="w-1/2 p-3 rounded-lg bg-stone-800 text-white"
              />
            </div>
            {(errors.travelDates?.start || errors.travelDates?.end) && <p className="text-red-400 text-sm mt-1">This is a required question</p>}
          </label>
          <label className="block mb-4">
            <span className="flex items-center gap-2">Type of trip * <Users className="w-4 h-4 inline" /></span>
            <select
              {...register('tripType', { required: true })}
              className="mt-1 w-full p-3 rounded-lg bg-stone-800 text-white"
            >
              <option value="">Select type</option>
              <option value="Vacation">Vacation</option>
              <option value="Honeymoon">Honeymoon</option>
              <option value="Family trip">Family trip</option>
              <option value="Group trip">Group trip</option>
              <option value="Business">Business</option>
              <option value="Other">Other</option>
            </select>
            {errors.tripType && <p className="text-red-400 text-sm mt-1">This is a required question</p>}
          </label>
          <label className="block mb-4">
            <span className="flex items-center gap-2">Transportation * <Plane className="w-4 h-4 inline" /></span>
            <select
              {...register('transportation', { required: true })}
              className="mt-1 w-full p-3 rounded-lg bg-stone-800 text-white"
            >
              <option value="">Select option</option>
              <option value="All-Inclusive">All-Inclusive Vacation Package (flights, hotel, transfers)</option>
              <option value="Flights">Flights</option>
              <option value="Rental car/Transportation only">Rental car/Transportation only</option>
              <option value="Other">Other</option>
            </select>
            {errors.transportation && <p className="text-red-400 text-sm mt-1">This is a required question</p>}
          </label>
        </>
      ),
    },
    {
      title: 'Travelers & Accommodation',
      content: (
        <>
          <label className="block mb-4">
            Adults *
            <input
              type="number"
              min={1}
              {...register('travelers.adults', { required: true })}
              className="mt-1 w-full p-3 rounded-lg bg-stone-800 text-white"
            />
          </label>
          <label className="block mb-4">
            Children
            <input
              type="number"
              min={0}
              {...register('travelers.children')}
              className="mt-1 w-full p-3 rounded-lg bg-stone-800 text-white"
            />
          </label>
          <label className="block mb-4">
            Seniors
            <input
              type="number"
              min={0}
              {...register('travelers.seniors')}
              className="mt-1 w-full p-3 rounded-lg bg-stone-800 text-white"
            />
          </label>
          <label className="block mb-4">
            Accommodation Preference *
            <select
              {...register('accommodation', { required: true })}
              className="mt-1 w-full p-3 rounded-lg bg-stone-800 text-white"
            >
              <option value="">Select option</option>
              <option value="Hotel">Hotel</option>
              <option value="Airbnb">Airbnb</option>
              <option value="Resort">Resort</option>
              <option value="Other">Other</option>
            </select>
          </label>
        </>
      ),
    },
    {
      title: 'Budget & Activities',
      content: (
        <>
          <label className="block mb-4">
            Estimated Budget *
            <select
              {...register('budget', { required: true })}
              className="mt-1 w-full p-3 rounded-lg bg-stone-800 text-green-400 font-semibold"
            >
              <option value="">Select budget</option>
              <option value="<1000">Under $1,000</option>
              <option value="1000-2500">$1,000–$2,500</option>
              <option value="2500-5000">$2,500–$5,000</option>
              <option value="5000+">$5,000+</option>
              <option value="Other">Other</option>
            </select>
            {errors.budget && <p className="text-red-400 text-sm mt-1">This is a required question</p>}
          </label>
          <label className="block mb-4">
            <span className="flex items-center gap-2">Activities * <Star className="w-4 h-4 inline text-white" /></span>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <label className="inline-flex items-center gap-3">
                <input type="checkbox" {...register('activities')} value="Sightseeing & Culture" className="h-4 w-4" />
                <span>Sightseeing & Culture</span>
              </label>
              <label className="inline-flex items-center gap-3">
                <input type="checkbox" {...register('activities')} value="Adventure & Outdoor Activities" className="h-4 w-4" />
                <span>Adventure & Outdoor Activities</span>
              </label>
              <label className="inline-flex items-center gap-3">
                <input type="checkbox" {...register('activities')} value="Shopping" className="h-4 w-4" />
                <span>Shopping</span>
              </label>
              <label className="inline-flex items-center gap-3">
                <input type="checkbox" {...register('activities')} value="Nightlife / Entertainment" className="h-4 w-4" />
                <span>Nightlife / Entertainment</span>
              </label>
              <label className="inline-flex items-center gap-3">
                <input type="checkbox" {...register('activities')} value="Relaxation / Beach" className="h-4 w-4" />
                <span>Relaxation / Beach</span>
              </label>
              <label className="inline-flex items-center gap-3">
                <input type="checkbox" {...register('activities')} value="Food & Wine" className="h-4 w-4" />
                <span>Food & Wine</span>
              </label>
              <label className="inline-flex items-center gap-3">
                <input type="checkbox" {...register('activities')} value="Other" className="h-4 w-4" />
                <span>Other</span>
              </label>
            </div>

            { (watch('activities') || []).includes('Other') && (
              <input
                type="text"
                {...register('activitiesOther')}
                placeholder="Please specify"
                className="mt-3 w-full p-3 rounded-lg bg-stone-800 text-white"
              />
            )}

            {errors.activities && <p className="text-red-400 text-sm mt-1">This is a required question</p>}
          </label>
        </>
      ),
    },
  ];

  const watchActivities = watch('activities') || [];

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <header className="max-w-7xl mx-auto p-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-sm font-medium text-stone-700 dark:text-stone-200">Home</Link>
          <h1 className="text-lg font-semibold">Plan My Trip</h1>
        </nav>
      </header>

      <main>
        <div className="max-w-4xl mx-auto px-6 text-center py-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-3">Plan My Trip</h2>
          <p className="text-lg text-stone-600 dark:text-stone-400">Start your travel planning — tell us your trip vision and we’ll take care of the rest.</p>
        </div>

        <div className="relative bg-stone-900 pb-24 text-white">
          <motion.div
            id="inquiry"
            className="max-w-4xl mx-auto px-6 py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: luxuryEase }}
          >
            <h1 className="text-4xl md:text-5xl font-serif mb-6 text-center flex items-center justify-center gap-3">
              Travel Inquiries
              <Globe className="w-6 h-6 text-white" />
            </h1>
            <p className="text-stone-200/90 text-center mb-6 text-lg md:text-xl">
              Let’s plan your perfect trip! Fill out this quick form, and we’ll send you personalized travel options and recommendations.
            </p>
            <p className="text-stone-400 text-center mb-12">All fields marked with * are required.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.8, ease: luxuryEase }}
              >
                {steps[step].content}
              </motion.div>

              <div className="flex justify-between mt-8">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 rounded-full border border-white/30 text-white hover:border-white transition-all"
                  >
                    Back
                  </button>
                ) : <div />}

                {step < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 rounded-full bg-white text-stone-900 font-medium shadow-lg hover:bg-stone-100 transition-colors"
                  >
                    Next <ArrowRight className="inline w-4 h-4 ml-1" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-full bg-green-500 text-white font-medium shadow-lg hover:bg-green-600 transition-colors"
                  >
                    Submit My Trip
                  </button>
                )}
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-stone-200 mb-3">Schedule a call instead — let&apos;s talk</p>
              <div className="mt-3">
                <a
                  href="https://calendly.com/mytraveladvisorlite/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-white text-stone-900 font-medium shadow-lg hover:bg-stone-100 transition-colors inline-block"
                >
                  Open Calendly in new tab
                </a>
              </div>
              {showInline && (
                <div id="calendly-inline">
                  <CalendlyInline url="https://calendly.com/mytraveladvisorlite/30min?hide_event_type_details=1&hide_gdpr_banner=1" height={700} />
                </div>
              )}
            </div>
          </motion.div>

          <div className="fixed bottom-0 left-0 right-0 bg-stone-900/90 backdrop-blur-md p-4 flex justify-center items-center md:hidden">
            <button
                type="button"
                onClick={() => {
                  // PostHog: Track Calendly schedule click
                  posthog.capture('calendly_schedule_clicked', {
                    source: 'mobile_bottom_bar',
                  });
                  setShowInline(true);
                  setTimeout(() => {
                    const el = typeof document !== 'undefined' ? document.getElementById('calendly-inline') : null;
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }, 150);
                }}
                className="px-6 py-3 rounded-full bg-green-500 text-white font-medium shadow-lg hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                I want to talk about my trip first
                <ArrowRight className="w-4 h-4" />
              </button>
          </div>
        </div>

        {/* Keep HowWorkingWithUsFeels component at the end of the page */}
        <HowWorkingWithUsFeels />
      </main>
    </div>
  );
}
